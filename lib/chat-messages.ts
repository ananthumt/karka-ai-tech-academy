/**
 * Shared chat copy + greeting detection.
 *
 * This module is deliberately dependency-free so that client components
 * (ChatPanel, MessageBubble) can import these constants without pulling
 * `content/kb.json` (~92 KB) into the browser bundle via `lib/kb.ts`.
 */

export const FIXED_MESSAGES = {
  OUT_OF_SCOPE:
    "I can only help with questions about Karka AI & Tech Academy: courses, Pay After Placement, placements, internship, admissions and contact details. For anything else, please ask our team on +91 9487530243 or WhatsApp.",
  NO_ANSWER:
    "I don't have that detail on the website. Our team can help: call +91 9487530243, chat on WhatsApp, or use the contact page.",
  RATE_LIMITED_OR_ERROR:
    "I'm busy right now. Please try again in a minute or contact the team on +91 9487530243.",
  GREETING:
    "Hi! I'm Karka Assistant. Ask me about our courses, Pay After Placement, placements or admissions.",
  TOO_LONG:
    "Your message is too long (maximum 500 characters). Please shorten your question.",
  WELCOME_REPLY:
    "Hello! Welcome to Karka AI & Tech Academy. I'm here to help you explore our courses, Pay After Placement, admissions, or placements. How can I help you today?",
} as const;

/** Phrases that should surface the WhatsApp / phone handoff buttons in a bubble. */
export const HANDOFF_TRIGGER_PHRASES = [
  "only help with questions about karka",
  "don't have that detail on the website",
  "call +91 9487530243",
  "our team can help",
  "please connect with our admissions team",
  "batches start soon",
] as const;

/** Phrases that mean the turn failed and should offer a retry affordance. */
export const ERROR_TRIGGER_PHRASES = [
  "i'm busy right now",
  "please try again in a minute",
] as const;

/**
 * Detect greetings such as "hello", "hi", "hey", "helloooo", "heyyy",
 * "good morning", "namaskaram", "vanakkam".
 */
export function isGreeting(text: string): boolean {
  const clean = text.toLowerCase().trim().replace(/[!.,?]/g, "");
  // Direct greetings (supports elongated words like "helloooo", "heyyyy", "hiiii")
  const directGreeting =
    /^(h+i+|h+e+y+|h+e+l+o+|good\s*(morning|afternoon|evening)|namaskar(am)?|vanakkam|namaste|hola|sup|yo)$/i;
  // Conversational openers like "hello karka", "hi there", "hey assistant"
  const conversationalGreeting =
    /^(h+i+|h+e+y+|h+e+l+o+|namaskar(am)?|vanakkam)\s+(there|team|karka|assistant|sir|maam|friend|all)?$/i;
  return directGreeting.test(clean) || conversationalGreeting.test(clean);
}
