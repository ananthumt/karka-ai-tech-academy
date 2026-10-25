// Karka AI Academy — Editorial content
//
// Blog posts previously lived inside `app/blog/page.tsx` as a local array
// declared in a `useEffect` behind a fake 600 ms timeout, and the detail page
// rendered the same three placeholder paragraphs for every slug. Moving the
// data here makes it server-renderable, lets `generateMetadata` and
// `generateStaticParams` work per post, and puts it in the sitemap.

export interface BlogSection {
  heading?: string;
  /** Paragraphs of body copy. */
  paragraphs: string[];
  /** Optional bulleted takeaways rendered after the paragraphs. */
  bullets?: string[];
  /** Optional pull quote rendered after the bullets. */
  quote?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  snippet: string;
  /** ISO date, used for <time> and OpenGraph publishedTime. */
  date: string;
  /** Human-readable label, e.g. "October 2026". */
  dateLabel: string;
  author: string;
  authorRole: string;
  category: string;
  readMinutes: number;
  image: string;
  imageAlt: string;
  tags: string[];
  /** Short standfirst shown under the title. */
  intro: string;
  sections: BlogSection[];
  /** Related internal routes surfaced at the end of the article. */
  relatedLinks: { label: string; href: string }[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "how-to-land-first-software-job-with-genai",
    title: "How to Land Your First Tech Job in 2026 Using GenAI Workflows",
    snippet:
      "Hiring teams no longer reward syntax recall. They look for engineers who ship with AI in the loop. Here is what that actually means for a fresher portfolio.",
    date: "2026-10-02",
    dateLabel: "October 2026",
    author: "Sateesh Kumar",
    authorRole: "Founder, Karka Software Academy & Agile Tribers",
    category: "AI & Career",
    readMinutes: 7,
    image: "/assets/blog-ai-engineering.webp",
    imageAlt: "A developer pair-programming with an AI assistant on a code review",
    tags: ["Generative AI", "Fresher hiring", "Portfolio"],
    intro:
      "The bar for a first software role moved. Not higher exactly, but sideways: interviewers care less about whether you memorised a sorting algorithm and more about whether you can take an ambiguous ticket and land a working, reviewed, deployed change.",
    sections: [
      {
        heading: "What changed in the interview loop",
        paragraphs: [
          "Two years ago a fresher could clear a screening round by reciting the lifecycle of a React component. That question is now worth almost nothing, because the answer is one prompt away. What replaced it is harder to fake: a reviewer opens your repository, reads your commit history, and asks why you made a particular trade-off.",
          "That shift rewards candidates who have actually worked inside a codebase they did not write. It punishes candidates whose entire portfolio is a set of tutorial clones with a single commit labelled 'initial commit'.",
        ],
        bullets: [
          "Expect to be asked to explain a decision, not recall a definition.",
          "Expect your Git history to be read as evidence of how you work.",
          "Expect at least one question about where an AI tool got something wrong and how you caught it.",
        ],
      },
      {
        heading: "Using AI without outsourcing your judgement",
        paragraphs: [
          "The engineers who get hired are not the ones who avoid AI tooling, and they are not the ones who paste its output unread. They treat a model the way they would treat a fast but over-confident colleague: useful for a first draft, never trusted on correctness.",
          "In practice that means reading every generated diff, writing the test yourself before you accept the implementation, and being able to say out loud which part of a file you understand and which part you would want a senior to review. That habit is what we drill daily in the Karka labs, because it is the difference between a candidate who looks productive and one who is.",
        ],
        quote:
          "Employers ignore generic certificates; they hire proof. Working on real agency projects alongside seasoned mentors is what separates hireable engineers from textbook learners.",
      },
      {
        heading: "Building a portfolio a reviewer will actually open",
        paragraphs: [
          "Three strong projects beat ten weak ones. A strong project has a real user (even if that user is one small business), a deployed URL, a README that explains the problem before the stack, and a commit history that shows the thing being built rather than dumped.",
          "At Karka every learner spends two months inside Agile Tribers, our in-house studio, working on software that real clients depend on. That is deliberate: it is the only reliable way we have found to give a fresher something to talk about that a reviewer cannot dismiss as coursework.",
        ],
        bullets: [
          "One deployed application with real users, however small.",
          "One contribution to a codebase you did not start.",
          "One project that documents a failure and what you changed.",
        ],
      },
      {
        heading: "Where to start if you are starting from zero",
        paragraphs: [
          "You do not need a computer science degree. Across our cohorts the strongest performers have come from arts, commerce and science backgrounds as often as from engineering. What they shared was consistency: showing up to the lab, shipping something small every week, and asking for review early.",
          "If you want the structured version of that path, the eight-step Karka roadmap lays out exactly what happens from the first foundation module through to placement, including when and what you pay.",
        ],
      },
    ],
    relatedLinks: [
      { label: "See the 8-step roadmap", href: "/roadmap" },
      { label: "MERN Fullstack Development", href: "/courses/mern-fullstack" },
      { label: "Find the course that fits you", href: "/course-finder" },
    ],
  },
  {
    slug: "mern-vs-fullstack-python-comparison",
    title: "MERN Stack vs Python Full Stack: Which Bootcamp Fits Your Ambition?",
    snippet:
      "Both tracks lead to a fullstack role. They do not lead to the same kind of work. A practical breakdown of hiring patterns, learning curve and day-to-day reality.",
    date: "2026-09-12",
    dateLabel: "September 2026",
    author: "Karka Mentorship Team",
    authorRole: "Academic Faculty",
    category: "Tech Guide",
    readMinutes: 8,
    image: "/assets/blog-stack-comparison.webp",
    imageAlt: "Side-by-side comparison of JavaScript and Python development environments",
    tags: ["MERN", "Python", "Career choice"],
    intro:
      "This is the single most common question in our admissions calls, and the honest answer is that the stack matters less than the kind of product you want to build. Here is how to decide without guessing.",
    sections: [
      {
        heading: "The short version",
        paragraphs: [
          "Choose MERN if you want to build user-facing products and you like seeing your work on a screen the same day. Choose Python fullstack if you are drawn to data, automation or anything with a model behind it.",
          "Neither closes doors. Engineers move between them regularly, because the hard parts — HTTP, databases, state, deployment, debugging under pressure — are the same on both sides.",
        ],
      },
      {
        heading: "Learning curve",
        paragraphs: [
          "MERN has one significant advantage for a beginner: it is JavaScript end to end. You learn one language and use it for the interface, the server and the scripts. That removes a whole category of context-switching cost in the first few months.",
          "Python fullstack asks you to hold two languages at once, because the browser still runs JavaScript. The trade-off is that Python itself is gentler to read, and the ecosystem around data and AI is deeper. Learners coming from a non-technical background often find the Python syntax less intimidating in week one, then feel the two-language cost in month two.",
        ],
        bullets: [
          "MERN: one language, faster early momentum, heavier front-end concepts up front.",
          "Python fullstack: easier syntax, broader data and AI ecosystem, two languages to hold.",
        ],
      },
      {
        heading: "What the roles actually look like",
        paragraphs: [
          "A MERN developer tends to spend the day in product work: components, state, API contracts, performance on real devices. The feedback loop is fast and visible, which suits people who like shipping.",
          "A Python fullstack developer more often sits closer to the data: pipelines, services, integrations, model endpoints. The work is less visual and frequently more analytical. Both are well paid; they reward different temperaments.",
        ],
      },
      {
        heading: "How to choose in ten minutes",
        paragraphs: [
          "Open two job listings in each track from companies you would genuinely like to work at, and read the responsibilities rather than the requirements. The requirements list is usually copy-pasted; the responsibilities tell you what the day feels like. Pick the one you would rather do on a Tuesday afternoon.",
          "If you want to see the two curricula next to each other — modules, duration, level and mode — put them side by side in the comparison tool rather than taking anyone's word for it.",
        ],
      },
    ],
    relatedLinks: [
      { label: "Compare these courses side by side", href: "/compare?courses=mern-fullstack,react-python-fullstack" },
      { label: "MERN Fullstack Development", href: "/courses/mern-fullstack" },
      { label: "React + Python Fullstack", href: "/courses/react-python-fullstack" },
    ],
  },
  {
    slug: "the-real-truth-about-pay-after-placement",
    title: "The Truth Behind Pay After Placement: Why Zero Upfront Fees Align Incentives",
    snippet:
      "Pay After Placement is not a discount. It is a transfer of risk, and understanding who carries that risk tells you a lot about how a bootcamp will treat you.",
    date: "2026-08-20",
    dateLabel: "August 2026",
    author: "Academic Advisory Desk",
    authorRole: "Admissions & Placement Cell",
    category: "Career Insights",
    readMinutes: 6,
    image: "/assets/blog-pay-after-placement.webp",
    imageAlt: "A learner and mentor reviewing a placement roadmap together",
    tags: ["Pay After Placement", "Fees", "Transparency"],
    intro:
      "Ask what happens if a student does not get placed. The answer separates institutions that have skin in the game from institutions that have already been paid.",
    sections: [
      {
        heading: "What the model actually is",
        paragraphs: [
          "Under Karka's Pay After Placement model you begin with ₹0 upfront tuition and pay a flat ₹40,000 only after you have secured a tech job. That is step eight of our published roadmap, and it is the whole arrangement — there is no separate deposit and no percentage of salary.",
          "The important part is not the number. It is the ordering. Because the fee arrives after the outcome, a cohort that does not get placed is a cost we absorb, not a cost you absorb.",
        ],
      },
      {
        heading: "Why the ordering changes behaviour",
        paragraphs: [
          "When fees are collected upfront, an institute's revenue is complete on day one. Everything after that — the quality of the mentoring, the mock interviews, whether anyone chases a hiring partner on your behalf — is a cost centre. The incentive to keep investing in a struggling learner is weak.",
          "Reverse the ordering and the economics invert. Our placement cell has a direct interest in your interview on Friday. That is also why we run 'Learn Till Job Placement': if you need more time, more mock rounds or a free refresher through the course again, that is cheaper for us than you not being hired.",
        ],
        quote:
          "We do not succeed unless you do. That is not a slogan here, it is the order in which the money moves.",
      },
      {
        heading: "The questions you should ask any institute",
        paragraphs: [
          "Be sceptical, including of us. A model is only as good as the specifics behind it, so ask for those specifics in writing before you enrol anywhere.",
        ],
        bullets: [
          "What exactly is payable before training starts?",
          "What is the total amount payable, and when does the obligation begin?",
          "What counts as a placement for the purpose of triggering the fee?",
          "What happens if I am not placed? Is there any residual liability?",
          "What support continues after the scheduled course duration ends?",
        ],
      },
      {
        heading: "What it is not",
        paragraphs: [
          "Pay After Placement is not a job guarantee. No institution can honestly guarantee a job, because the final decision belongs to an employer. What it guarantees is that we have aligned our outcome with yours, and that you are not carrying a large debt while you study.",
          "If you want to model the numbers against an offer you have had from somewhere else, the roadmap page has a calculator where you enter the other quote and your own salary expectation rather than taking our framing for it.",
        ],
      },
    ],
    relatedLinks: [
      { label: "See the 8-step roadmap and calculator", href: "/roadmap" },
      { label: "Placement records and support", href: "/placement" },
      { label: "Talk to the admissions team", href: "/contact" },
    ],
  },
];

/** Look up a post by slug. */
export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

/** Posts other than `slug`, newest first, for the "keep reading" rail. */
export function getRelatedPosts(slug: string, limit = 2): BlogPost[] {
  return BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, limit);
}
