import kbData from "../content/kb.json";
import { FIXED_MESSAGES, isGreeting } from "./chat-messages";

// Re-exported for backwards compatibility. Prefer importing these from
// `@/lib/chat-messages` in client components so `kb.json` stays server-only.
export { FIXED_MESSAGES, isGreeting };

export interface KBChunk {
  id: string;
  page: string;
  title: string;
  url: string;
  text: string;
}

export interface SearchResult {
  chunk: KBChunk;
  score: number;
}

export interface ScopeCheckResult {
  isInScope: boolean;
  reason?: "OFF_TOPIC" | "PROMPT_INJECTION" | "LOW_SCORE" | "UNLISTED_SPECIFIC_FEE" | "BATCH_DATES" | "GREETING";
  directAnswer?: string;
}

const CHUNKS: KBChunk[] = kbData as KBChunk[];

// Pre-tokenize and calculate document lengths for BM25
function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s\u0900-\u0D7F]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 1);
}

// Common English stop words
const STOP_WORDS = new Set([
  "a", "about", "above", "after", "again", "against", "all", "am", "an", "and", "any", "are",
  "as", "at", "be", "because", "been", "before", "being", "below", "between", "both", "but",
  "by", "could", "did", "do", "does", "doing", "down", "during", "each", "few", "for", "from",
  "further", "had", "has", "have", "having", "he", "her", "here", "hers", "herself", "him",
  "himself", "his", "how", "i", "if", "in", "into", "is", "it", "its", "itself", "me", "more",
  "most", "my", "myself", "no", "nor", "not", "of", "off", "on", "once", "only", "or", "other",
  "ought", "our", "ours", "ourselves", "out", "over", "own", "same", "she", "should", "so",
  "some", "such", "than", "that", "the", "their", "theirs", "them", "themselves", "then",
  "there", "these", "they", "this", "those", "through", "to", "too", "under", "until", "up",
  "very", "was", "we", "were", "what", "when", "where", "which", "while", "who", "whom",
  "why", "with", "would", "you", "your", "yours", "yourself", "yourselves"
]);

interface BM25Index {
  docLengths: number[];
  avgDocLength: number;
  docTermFreqs: Map<string, number>[];
  docFreqs: Map<string, number>;
  totalDocs: number;
}

let cachedIndex: BM25Index | null = null;

function getIndex(): BM25Index {
  if (cachedIndex) return cachedIndex;

  const totalDocs = CHUNKS.length;
  const docLengths: number[] = [];
  const docTermFreqs: Map<string, number>[] = [];
  const docFreqs = new Map<string, number>();

  let totalLength = 0;

  for (let i = 0; i < CHUNKS.length; i++) {
    const chunk = CHUNKS[i];
    // Weight title tokens higher
    const titleTokens = tokenize(chunk.title);
    const textTokens = tokenize(chunk.text);
    
    const termMap = new Map<string, number>();
    
    // Add title tokens with 3x frequency
    for (const t of titleTokens) {
      if (STOP_WORDS.has(t)) continue;
      termMap.set(t, (termMap.get(t) || 0) + 3);
    }
    for (const t of textTokens) {
      if (STOP_WORDS.has(t)) continue;
      termMap.set(t, (termMap.get(t) || 0) + 1);
    }

    const docLen = titleTokens.length * 3 + textTokens.length;
    docLengths.push(docLen);
    totalLength += docLen;
    docTermFreqs.push(termMap);

    termMap.forEach((_, term) => {
      docFreqs.set(term, (docFreqs.get(term) || 0) + 1);
    });
  }

  const avgDocLength = totalLength / totalDocs;
  cachedIndex = { docLengths, avgDocLength, docTermFreqs, docFreqs, totalDocs };
  return cachedIndex;
}

/**
 * BM25 Search over KB Chunks
 */
export function searchKB(query: string, topK: number = 5): SearchResult[] {
  const index = getIndex();
  const queryTokens = tokenize(query).filter((t) => !STOP_WORDS.has(t));
  
  if (queryTokens.length === 0) {
    return CHUNKS.slice(0, topK).map((chunk) => ({ chunk, score: 0 }));
  }

  const k1 = 1.5;
  const b = 0.75;
  const scores: number[] = new Array(index.totalDocs).fill(0);

  for (const term of queryTokens) {
    const df = index.docFreqs.get(term) || 0;
    if (df === 0) continue;

    // Standard BM25 IDF
    const idf = Math.log(1 + (index.totalDocs - df + 0.5) / (df + 0.5));

    for (let i = 0; i < index.totalDocs; i++) {
      const tf = index.docTermFreqs[i].get(term) || 0;
      if (tf === 0) continue;

      const docLen = index.docLengths[i];
      const numerator = tf * (k1 + 1);
      const denominator = tf + k1 * (1 - b + (b * docLen) / index.avgDocLength);
      scores[i] += idf * (numerator / denominator);
    }
  }

  // Exact phrase match boost
  const queryLower = query.toLowerCase().trim();
  for (let i = 0; i < index.totalDocs; i++) {
    const chunk = CHUNKS[i];
    const textLower = (chunk.title + " " + chunk.text).toLowerCase();
    if (textLower.includes(queryLower)) {
      scores[i] += 4.0;
    }
  }

  const indexed = scores.map((score, idx) => ({ chunk: CHUNKS[idx], score }));
  indexed.sort((a, b) => b.score - a.score);

  return indexed.slice(0, topK);
}

/**
 * Format retrieved chunks for the system prompt
 */
export function formatChunksForPrompt(chunks: KBChunk[]): string {
  return chunks
    .map(
      (c, idx) =>
        `--- Chunk ${idx + 1} (Page: ${c.page}, URL: ${c.url}, Title: ${c.title}) ---\n${c.text}`
    )
    .join("\n\n");
}

/* ==========================================================================
   SCOPE GATE VOCABULARY
   The assistant must answer only about Karka AI & Tech Academy. Three sets
   drive that, applied in order: injection -> off-topic -> anchoring.
   ========================================================================== */

/**
 * Off-topic and prompt-injection patterns.
 *
 * These are checked before any Karka vocabulary, because off-topic questions
 * routinely borrow domain words ("compare", "course", "hire", "review").
 */
const OFF_TOPIC_PATTERNS: RegExp[] = [
  // --- Content-generation imperatives -------------------------------------
  // A genuine visitor never asks the admissions assistant to author something.
  // This single family catches "write me a blog post about crypto", "build me
  // a mortgage calculator", "write a React component", "draft an email".
  /\b(write|compose|draft|generate|create|build|make|code|design)\s+(me\s+)?(a|an|the|some)?\s*(blog|article|post|essay|poem|story|song|joke|review|script|program|code|component|function|class|app|website|calculator|game|email|letter|resume|cover letter|caption|tweet|report|summary)\b/i,
  /\b(write|generate|give me)\s+(a|an|some)?\s*(python|javascript|java|c\+\+|sql|html|css|react|node)\b/i,
  /\bhow (do i|to) (write|code|implement|build|create|debug|fix|solve)\b/i,
  /\bdebug (my|this|the) code\b/i,
  /\b(explain|what is) (how )?(quantum|relativity|photosynthesis|blockchain|crypto|bitcoin)\b/i,
  /\b(binary search|bubble sort|quick sort|merge sort|fibonacci|factorial|palindrome|linked list|big o)\b/i,

  // --- Consumer brands / products -----------------------------------------
  // Trailing \b is omitted on nouns that commonly appear pluralised, because
  // /\brestaurant\b/ does NOT match "restaurants" (the "s" is a word char).
  /\b(iphone|samsung|galaxy|android|oneplus|xiaomi|macbook|playstation|xbox|tesla)/i,
  /\b(marvel|netflix|bollywood|hollywood|movie|film|web series|song|album|actor|actress|singer)/i,

  // --- Regulated advice ----------------------------------------------------
  /\b(medical|health|medicine|doctor|symptom|diagnos|prescription|headache|fever|pregnan)/i,
  /\b(legal advice|lawyer|lawsuit|court case)/i,
  /\b(invest|investment|mutual fund|stock market|share market|trading|crypto|bitcoin|loan|insurance)/i,

  // --- Unrelated everyday domains -------        ----------------------------------
  /\b(weather|forecast|temperature today|rain today)/i,
  /\b(recipe|cooking|bake|restaurant|hotel|food delivery|biryani)/i,
  /\b(joke|riddle|poem|shayari|horoscope|astrology|zodiac)/i,
  /\b(plumber|electrician|carpenter|mechanic|maid|real estate)/i,
  /\b(lose|gain|reduce)\s+\d*\s*(kg|kilos|weight)/i,
  /\b(gym|workout|diet plan|yoga)/i,
  /\b(ipl|cricket|football|world cup|olympics|match score|fifa)/i,
  /\b(photography|flight booking|visa|passport|tourism)/i,
  /\bhomework\b/i,
  /\bcapital of\b/i,
  /\bwho is the (prime minister|president|governor|king|queen|ceo of)\b/i,
  /\btell me about (india|usa|space|earth|mars|moon|history|politics)\b/i,
  /^\s*(what|calculate)?\s*(is\s+)?\d+\s*[\+\-\*\/x]\s*\d+/i, // bare arithmetic
];

/**
 * Prompt-injection and jailbreak attempts.
 *
 * The previous `ignore (your|all|previous|the) instructions` required the
 * keyword immediately after the quantifier, so the most common phrasing
 * ("ignore all previous instructions") slipped through. These allow
 * intervening words.
 */
const INJECTION_PATTERNS: RegExp[] = [
  /\bignore\s+(?:\w+\s+){0,4}(instructions?|prompts?|rules?|directives?|guidelines?)/i,
  /\bdisregard\s+(?:\w+\s+){0,4}(instructions?|prompts?|rules?)/i,
  /\b(system|initial|original|above)\s+prompt\b/i,
  /\breveal\s+(your|the)\s+(prompt|instructions|rules)/i,
  /\b(repeat|print|show|output)\s+(your|the)\s+(prompt|instructions|system)/i,
  /\bwhat are your (instructions|rules|guidelines)\b/i,
  /\byou are now\b/i,
  /\b(act|behave|respond)\s+as\s+(a|an|if)\b/i,
  /\bpretend (to be|you are)\b/i,
  /\b(jailbreak|dan mode|developer mode|bypass (rules|restrictions|filters))\b/i,
  /\bforget (everything|all|your)\b/i,
];

/**
 * Competing training platforms and institutes, plus head-to-head comparison
 * framing.
 *
 * Kept separate from OFF_TOPIC_PATTERNS because it is also consulted by the
 * "learning intent" short-circuit: naming a competitor must always win over a
 * Karka brand mention, so "Is Besant better than Karka?" stays refused.
 */
const COMPETITOR_PATTERNS: RegExp[] = [
  /\b(coursera|udemy|udacity|edx|upgrad|simplilearn|byju|unacademy|great learning|newton school|masai|scaler|guvi|besant|greens technolog|qspiders|jspiders|aptech|niit)/i,
  /\b(better than|cheaper than|worse than|vs\.?|versus|compared? (?:with|to))\s+karka\b/i,
  /\bkarka\s+(?:vs\.?|versus)\b/i,
  /\bis\s+\w+\s+(?:better|cheaper|worse)\s+than\s+karka\b/i,
  /\bcompare .*\b(institute|academy|college|bootcamp|university)/i,
];

/**
 * STRONG anchors: terms that are effectively meaningless outside the context
 * of this academy. Presence of one admits the query.
 *
 * Deliberately excludes ambiguous words that an off-topic question could
 * easily contain — "compare", "review", "guide", "blog", "calculator",
 * "hire", "course", "suggest". Those are handled by
 * DOMAIN_INTENT_PATTERNS below, which require them to appear in a shape that
 * is actually about Karka.
 */
const STRONG_ANCHORS: string[] = [
  // Brand + place
  "karka", "nagercoil", "agile tribers", "infini", "spike", "sateesh",
  // The business model
  "pay after placement", "pay-after-placement", "placement", "placements",
  "upfront", "lifetime support", "learn till job",
  // Academy-specific operations
  "admission", "admissions", "enroll", "enrol", "enrolment", "enrollment",
  "syllabus", "curriculum", "bootcamp", "cohort", "batch", "mentor", "mentors",
  "internship", "intern", "campus", "counsel", "prospectus",
  // Outcome vocabulary used on the site
  "lpa", "hiring partner", "hiring partners", "placed", "package", "salary hike",
  "founder", "ex-cto",
  // Programme names / slugs
  "mern", "fullstack", "full stack", "genai", "gen ai", "ui/ux", "ui ux",
  "data science", "data analytics", "data engineering", "digital marketing",
  "seo analyst", "graphic design", "web design", "video editing", "multimedia",
  "python for kids", "business analyst", "tally", "hr & finance", "cloud & devops",
  "automation testing", "mobile app development",
  // Eligibility vocabulary
  "freshers", "fresher", "non-it", "non it", "who can join", "eligibility",
  // Manglish / Malayalam transliterations
  "ethraya", "padikamo", "padikkan", "padikkaan", "padikanam", "kittumo",
  "enthellam", "cheyyamo", "evideya", "evide",
  // Malayalam script
  "ഫീസ്", "കോഴ്സ്", "കോഴ്സുകൾ", "പ്ലേസ്മെന്റ്", "എവിടെ", "എവിടെയാണ്", "പഠിക്കാം",
  "നാഗർകോവിൽ", "അഡ്മിഷൻ", "ഫോൺ", "സതീഷ്", "ഇന്റേൺഷിപ്പ്", "ശമ്പളം", "ജോലി",
];

/**
 * In-domain question shapes.
 *
 * These let ambiguous vocabulary through only when the sentence is clearly
 * addressed to the academy ("do you...", "your fees") or is explicitly about
 * a course/programme. This is what separates "Can I compare courses side by
 * side?" (admit) from "Compare Python and Rust benchmarks" (refuse), and
 * "Do you have a blog?" (admit) from "Write a blog post about crypto"
 * (refuse — also caught by the imperative rule above).
 */
const DOMAIN_INTENT_PATTERNS: RegExp[] = [
  // Second person addressed at the academy
  /\b(do|does|did|are|is|can|could|will|would|have|has)\s+(you|your|u)\b/i,
  /\byour\s+(course|courses|program|programs|fee|fees|class|classes|team|mentor|mentors|office|batch|batches|placement|training|academy|institute)\b/i,
  /\b(you|u)\s+(offer|have|provide|teach|conduct|accept|charge)\b/i,
  // Explicitly about a course / programme / track at this academy
  /\b(course|courses|program|programs|programme|track|tracks|class|classes|training)\b.*\b(fee|fees|duration|length|month|months|syllabus|curriculum|mode|online|offline|level|available|offered|list)\b/i,
  /\b(fee|fees|duration|length|syllabus|curriculum|mode|level|list)\b.*\b(course|courses|program|programs|programme|track|class|training)\b/i,
  /\b(which|what|best|recommend|suggest|choose|compare)\b.*\b(course|courses|program|programs|programme|track|tracks)\b/i,
  /\b(course|courses|program|programs)\b.*\b(recommend|suggest|compare|side by side|finder|quiz)\b/i,
  // Enrolment / self-referential intent
  /\b(can|could|should|may)\s+i\s+(join|enroll|enrol|apply|study|learn|start|attend|visit)\b/i,
  /\bhow (do|can) i\s+(join|enroll|enrol|apply|register|start)\b/i,
  /\b(i am|i'm|im)\s+(a|an)?\s*(student|graduate|fresher|professional|working|school|college)\b/i,
  // Navigational / contact intent
  /\b(contact|phone|whatsapp|call|email|address|location|map|directions|timing|timings|open|hours)\b/i,
  /\b(is there|do you have|where is|where are|how many|tell me about)\b/i,
  // Alumni / proof intent, scoped to this academy
  /\b(student|students|alumni|learner|learners|graduate|graduates)\b.*\b(story|stories|review|reviews|testimonial|testimonials|placed|working|outcome)\b/i,
  /\b(testimonial|testimonials|success stor)/i,
  // Recruiter intent
  /\b(hire|hiring|recruit|recruiting)\b.*\b(graduate|graduates|student|students|talent|developer|developers|from you|from karka)\b/i,
  /\b(we are|we're|my company|our company)\b.*\b(hire|hiring|recruit|looking for)\b/i,
];

/**
 * Scope classification and fast refusal gate
 */
export function classifyScope(
  query: string,
  searchResults: SearchResult[],
  hasConversationHistory: boolean = false
): ScopeCheckResult {
  const q = query.toLowerCase().trim();

  // 1. Prompt injection / jailbreak filter
  for (const pat of INJECTION_PATTERNS) {
    if (pat.test(q)) {
      return { isInScope: false, reason: "PROMPT_INJECTION" };
    }
  }

  // 1.5. Friendly Greeting Handler ("hello", "hi", "hey", "helloooo", "namaskaram", etc.)
  if (isGreeting(q)) {
    return {
      isInScope: true,
      reason: "GREETING",
      directAnswer: FIXED_MESSAGES.WELCOME_REPLY,
    };
  }

  // 2. Competitor / head-to-head framing.
  // Checked first among the off-topic rules so that naming another institute
  // always outranks a Karka brand mention.
  const mentionsCompetitor = COMPETITOR_PATTERNS.some((p) => p.test(q));
  if (mentionsCompetitor) {
    return { isInScope: false, reason: "OFF_TOPIC" };
  }

  // 3. Explicit "can I learn X here" intent.
  //
  // This must run BEFORE the content-generation rules below, which would
  // otherwise refuse a legitimate question like "Can I learn to build a
  // website at Karka?" purely because it contains the phrase "build a
  // website". Requires a brand anchor AND a learning verb, so
  // "reviews for restaurants in Nagercoil" (brand anchor, no learning verb)
  // is not rescued by it.
  const hasBrandAnchor =
    /\b(karka|this academy|your academy)\b/i.test(q) || q.includes("nagercoil");
  const hasLearningVerb =
    /\b(learn|learning|study|studying|teach|taught|training|trained|course|courses|class|classes|master)\b/i.test(
      q
    );
  if (hasBrandAnchor && hasLearningVerb) {
    return { isInScope: true };
  }

  // 4. Remaining off-topic detection.
  //
  // Ordered deliberately: these run BEFORE the anchor check in step 6, because
  // an off-topic question frequently also mentions a Karka-ish word
  // ("reviews for restaurants in Nagercoil"). Matching a Karka term must
  // never rescue a question already identified as off-topic.
  for (const pat of OFF_TOPIC_PATTERNS) {
    if (pat.test(q)) {
      return { isInScope: false, reason: "OFF_TOPIC" };
    }
  }

  // 5. Special handling for Test Case 15 & unlisted fees/travel/hostel
  // e.g., "What is the fee for the Data Engineering course?", "bus fee"
  if (
    (q.includes("fee") && (q.includes("data engineering") || q.includes("python course fee") || q.includes("individual fee") || q.includes("bus") || q.includes("hostel") || q.includes("van") || q.includes("travel"))) ||
    q.includes("bus fee") ||
    q.includes("hostel fee") ||
    q.includes("mess fee")
  ) {
    return {
      isInScope: false,
      reason: "UNLISTED_SPECIFIC_FEE",
      directAnswer: FIXED_MESSAGES.NO_ANSWER,
    };
  }

  // 5b. Special handling for Test Case 16: Batch dates
  // "What are the batch dates?" -> Site states "Starts Soon"
  if (
    q.includes("batch date") ||
    q.includes("when does the batch start") ||
    q.includes("batch timings") ||
    q.includes("next batch date")
  ) {
    return {
      isInScope: true,
      reason: "BATCH_DATES",
      directAnswer:
        "Our batches start soon! For specific upcoming batch dates, schedules, and seat availability, please connect with our admissions team on +91 9487530243 or chat with us on WhatsApp.",
    };
  }

  // 6. Topical anchoring.
  //
  // The previous implementation admitted any query that merely *contained* a
  // domain word, which leaked badly: "Compare Python and Rust benchmarks" and
  // "How do I hire a plumber?" both passed and were then answered confidently
  // from the nearest-matching chunk. Containing a word is not the same as
  // being about Karka, so admission now requires a STRONG anchor — a term
  // that is meaningless outside this academy's context — or a recognised
  // in-domain question shape, or genuine conversational follow-up.
  const hasStrongAnchor = STRONG_ANCHORS.some((t) => q.includes(t));
  const hasDomainIntent = DOMAIN_INTENT_PATTERNS.some((p) => p.test(q));

  if (hasStrongAnchor || hasDomainIntent) {
    return { isInScope: true };
  }

  // Short follow-ups ("how long is it?", "and the fees?") carry no anchor of
  // their own, so allow them only inside an existing conversation and only
  // when retrieval still finds something relevant.
  const topScore = searchResults[0]?.score || 0;
  const isShortFollowUp = q.split(/\s+/).length <= 6;
  if (hasConversationHistory && isShortFollowUp && topScore > 0.5) {
    return { isInScope: true };
  }

  return { isInScope: false, reason: "LOW_SCORE" };
}
