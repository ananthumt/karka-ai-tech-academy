"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  X,
  Minus,
  Send,
  Loader2,
  Sparkles,
  Maximize2,
  Minimize2,
  RotateCcw,
  Compass,
  Phone,
  MessageCircle,
  Mic,
  MicOff,
  AlertCircle,
} from "lucide-react";
import { MessageBubble, ChatMessage } from "./MessageBubble";
import { SuggestionChips } from "./SuggestionChips";
import { LeadCaptureCard } from "./LeadCaptureCard";
import { CourseRecommendationWizard } from "./CourseRecommendationWizard";
// Imported from the dependency-free copy module, not `@/lib/kb`, so the
// 92 KB `content/kb.json` BM25 corpus is never pulled into the client bundle.
import { FIXED_MESSAGES } from "@/lib/chat-messages";

interface ChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onMinimize: () => void;
}

const MAX_INPUT_CHARS = 500;
const TRANSCRIPT_STORAGE_KEY = "karka_chat_transcript";
/** Transcripts older than this are discarded on restore. */
const TRANSCRIPT_TTL_MS = 2 * 60 * 60 * 1000; // 2 hours

const GREETING_MESSAGE: ChatMessage = {
  id: "greeting",
  role: "assistant",
  content: FIXED_MESSAGES.GREETING,
};

/** Minimal shape of the vendor-prefixed SpeechRecognition constructor. */
type SpeechRecognitionCtor = new () => {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  start: () => void;
  stop: () => void;
  onresult: ((e: any) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
};

function getSpeechRecognition(): SpeechRecognitionCtor | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as {
    SpeechRecognition?: SpeechRecognitionCtor;
    webkitSpeechRecognition?: SpeechRecognitionCtor;
  };
  return w.SpeechRecognition || w.webkitSpeechRecognition || null;
}

const QUICK_NAV_TOPICS = [
  { label: "🎓 Course Finder Wizard", isWizard: true, query: "Course Recommendation Wizard" },
  { label: "Pay After Placement", isWizard: false, query: "What is Pay After Placement?" },
  { label: "All 26 Courses", isWizard: false, query: "What courses do you offer?" },
  { label: "100% Placement Support", isWizard: false, query: "Is placement guaranteed?" },
  { label: "Compare Programs", isWizard: false, query: "Can I compare courses side by side?" },
  { label: "24 LPA Package", isWizard: false, query: "What is the highest package?" },
  { label: "Eligibility", isWizard: false, query: "Who can join Karka?" },
  { label: "Infini AI Prize", isWizard: false, query: "What is the Infini prize pool?" },
  { label: "Spike AI Platform", isWizard: false, query: "What is Spike AI?" },
  { label: "Founder & Mentors", isWizard: false, query: "Who is the founder?" },
  {
    label: "Agile Tribers Internship",
    isWizard: false,
    query: "What is the Agile Tribers internship?",
  },
  { label: "Campus Location", isWizard: false, query: "Where is Karka located?" },
  { label: "Upcoming Batches", isWizard: false, query: "What are the batch dates?" },
];

export const ChatPanel: React.FC<ChatPanelProps> = ({ isOpen, onClose, onMinimize }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING_MESSAGE]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showLeadCapture, setShowLeadCapture] = useState(false);
  const [leadCaptureDismissed, setLeadCaptureDismissed] = useState(false);
  const [isWizardMode, setIsWizardMode] = useState(false);
  const [inputError, setInputError] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [hasRestored, setHasRestored] = useState(false);

  const panelRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<InstanceType<SpeechRecognitionCtor> | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  /**
   * Count of genuinely answered turns. The streaming placeholder is pushed with
   * empty content before the fetch resolves, so filtering on non-empty content
   * stops the lead card firing one exchange early.
   */
  const answeredCount = messages.filter(
    (m) => m.role === "assistant" && m.id !== "greeting" && m.content.trim().length > 0
  ).length;

  useEffect(() => {
    if (answeredCount >= 3 && !showLeadCapture && !leadCaptureDismissed) {
      setShowLeadCapture(true);
    }
  }, [answeredCount, showLeadCapture, leadCaptureDismissed]);

  /**
   * Restore the transcript for this browser session so minimising the panel or
   * navigating between pages no longer wipes the conversation.
   * Runs before the URL-param seeding effect below, which takes precedence.
   */
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(TRANSCRIPT_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { at: number; messages: ChatMessage[] };
        const isFresh = Date.now() - parsed.at < TRANSCRIPT_TTL_MS;
        if (isFresh && Array.isArray(parsed.messages) && parsed.messages.length > 1) {
          setMessages(parsed.messages);
        } else {
          sessionStorage.removeItem(TRANSCRIPT_STORAGE_KEY);
        }
      }
    } catch {
      // Storage unavailable (private mode / quota) — start fresh.
    } finally {
      setHasRestored(true);
    }
  }, []);

  // Persist the transcript on every change once the restore pass has settled.
  useEffect(() => {
    if (!hasRestored) return;
    try {
      if (messages.length <= 1) {
        sessionStorage.removeItem(TRANSCRIPT_STORAGE_KEY);
        return;
      }
      sessionStorage.setItem(
        TRANSCRIPT_STORAGE_KEY,
        JSON.stringify({ at: Date.now(), messages: messages.slice(-30) })
      );
    } catch {
      // Ignore storage failures; persistence is a convenience, not a requirement.
    }
  }, [messages, hasRestored]);

  // Abort any in-flight request and stop speech recognition on unmount.
  useEffect(() => {
    return () => {
      abortRef.current?.abort();
      try {
        recognitionRef.current?.stop();
      } catch {
        // pass
      }
    };
  }, []);

  // URL param initialization
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        const chatParam = params.get("chat");
        if (chatParam === "answered") {
          setMessages([
            { id: "greeting", role: "assistant", content: FIXED_MESSAGES.GREETING },
            { id: "user-1", role: "user", content: "What is Pay After Placement?" },
            {
              id: "assistant-1",
              role: "assistant",
              content:
                "Under Karka's Pay After Placement (PAP) model, you learn with ₹0 upfront tuition fees. We carry the financial risk so you don't pay until you successfully secure a tech job. Learn more at /roadmap.",
            },
          ]);
        } else if (chatParam === "declined") {
          setMessages([
            { id: "greeting", role: "assistant", content: FIXED_MESSAGES.GREETING },
            { id: "user-1", role: "user", content: "Who won the IPL?" },
            {
              id: "assistant-1",
              role: "assistant",
              content: FIXED_MESSAGES.OUT_OF_SCOPE,
            },
          ]);
        } else if (chatParam === "expanded") {
          setIsExpanded(true);
          setMessages([
            { id: "greeting", role: "assistant", content: FIXED_MESSAGES.GREETING },
            { id: "user-1", role: "user", content: "What is Pay After Placement?" },
            {
              id: "assistant-1",
              role: "assistant",
              content:
                "Under Karka's Pay After Placement (PAP) model, you learn with ₹0 upfront tuition fees. We carry the financial risk so you don't pay until you successfully secure a tech job. Learn more at /roadmap.",
            },
          ]);
        } else if (chatParam === "wizard") {
          setIsWizardMode(true);
        }
      }
    } catch {
      // pass
    }
  }, []);

  // Auto-scroll when messages update
  useEffect(() => {
    if (isOpen && !isWizardMode) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading, isOpen, isWizardMode]);

  // Focus input and escape key trap
  useEffect(() => {
    if (!isOpen) return;

    if (!isWizardMode) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key === "Tab" && panelRef.current) {
        const focusableElements = panelRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, isWizardMode]);

  const handleResetChat = () => {
    abortRef.current?.abort();
    setMessages([GREETING_MESSAGE]);
    setShowLeadCapture(false);
    setLeadCaptureDismissed(false);
    setIsWizardMode(false);
    setInputError(null);
    setIsLoading(false);
    try {
      sessionStorage.removeItem(TRANSCRIPT_STORAGE_KEY);
    } catch {
      // pass
    }
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const handleSendMessage = useCallback(
    async (textToSend?: string) => {
      const text = (textToSend ?? inputValue).trim();
      if (!text || isLoading) return;

      setInputError(null);

      // Intercept explicit wizard requests and open the guided flow instead of
      // round-tripping to the API for a generic recommendation answer.
      const lower = text.toLowerCase();
      if (
        lower.includes("course finder") ||
        lower.includes("recommendation wizard") ||
        (lower.includes("recommend") && lower.includes("course")) ||
        (lower.includes("suggest") && lower.includes("course")) ||
        (lower.includes("help me choose") && lower.includes("course"))
      ) {
        setIsWizardMode(true);
        setInputValue("");
        return;
      }

      if (text.length > MAX_INPUT_CHARS) {
        // Previously an `alert()`, which is jarring and untestable.
        setInputError(`Please shorten your question to ${MAX_INPUT_CHARS} characters or fewer.`);
        return;
      }

      const userMessage: ChatMessage = {
        id: `user-${Date.now()}`,
        role: "user",
        content: text,
      };

      const newMessages = [...messages, userMessage];
      const assistantMsgId = `assistant-${Date.now()}`;

      setMessages([...newMessages, { id: assistantMsgId, role: "assistant", content: "" }]);
      setInputValue("");
      setIsLoading(true);

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: controller.signal,
          body: JSON.stringify({
            messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
          }),
        });

        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        if (!res.body) throw new Error("No response body");

        const reader = res.body.getReader();
        const decoder = new TextDecoder("utf-8");
        let accumulated = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          accumulated += decoder.decode(value, { stream: true });
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMsgId ? { ...msg, content: accumulated } : msg
            )
          );
        }

        // An empty body would otherwise leave a blank bubble on screen.
        if (!accumulated.trim()) {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMsgId
                ? { ...msg, content: FIXED_MESSAGES.RATE_LIMITED_OR_ERROR, isError: true }
                : msg
            )
          );
        }
      } catch (err) {
        // A deliberate abort (reset / unmount) is not an error worth surfacing.
        if ((err as Error)?.name === "AbortError") return;
        console.error("[Chat Error]", err);
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMsgId
              ? { ...msg, content: FIXED_MESSAGES.RATE_LIMITED_OR_ERROR, isError: true }
              : msg
          )
        );
      } finally {
        if (abortRef.current === controller) abortRef.current = null;
        setIsLoading(false);
      }
    },
    [inputValue, isLoading, messages]
  );

  const handleRetryMessage = useCallback(() => {
    const lastUser = [...messages].reverse().find((m) => m.role === "user");
    if (lastUser) {
      // Drop the failed assistant turn so the retry does not stack bubbles.
      setMessages((prev) => {
        const lastUserIdx = prev.map((m) => m.role).lastIndexOf("user");
        return lastUserIdx >= 0 ? prev.slice(0, lastUserIdx) : prev;
      });
      setTimeout(() => handleSendMessage(lastUser.content), 0);
    }
  }, [messages, handleSendMessage]);

  /** Dictate a question using the Web Speech API where the browser supports it. */
  const handleToggleVoice = useCallback(() => {
    const Recognition = getSpeechRecognition();
    if (!Recognition) {
      setInputError("Voice input isn't supported in this browser. Please type your question.");
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    try {
      const recognition = new Recognition();
      recognition.lang = "en-IN";
      recognition.interimResults = true;
      recognition.continuous = false;

      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results as ArrayLike<any>)
          .map((r: any) => r[0]?.transcript ?? "")
          .join("")
          .trim();
        if (transcript) setInputValue(transcript.slice(0, MAX_INPUT_CHARS));
      };
      recognition.onerror = () => {
        setIsListening(false);
        setInputError("Couldn't hear that. Check microphone permissions and try again.");
      };
      recognition.onend = () => {
        setIsListening(false);
        inputRef.current?.focus();
      };

      recognitionRef.current = recognition;
      recognition.start();
      setIsListening(true);
      setInputError(null);
    } catch {
      setIsListening(false);
      setInputError("Voice input couldn't start. Please type your question instead.");
    }
  }, [isListening]);

  return (
    <motion.div
      ref={panelRef}
      role="dialog"
      aria-label="Karka Assistant Chat Window"
      aria-modal="true"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed z-50 flex flex-col bg-white dark:bg-[#070B14] border border-slate-200/80 dark:border-white/10 elev-4 overflow-hidden transition-[width,height] duration-300 ${
        isExpanded
          ? "inset-0 sm:inset-auto sm:bottom-6 sm:right-6 w-full sm:w-[760px] h-full sm:h-[720px] sm:max-h-[calc(100vh-3rem)] rounded-none sm:rounded-3xl"
          : "inset-0 sm:inset-auto sm:bottom-6 sm:right-6 w-full sm:w-[420px] h-full sm:h-[620px] sm:max-h-[calc(100vh-3rem)] rounded-none sm:rounded-3xl"
      }`}
    >
      {/* 1. Header with Mode Switcher & Controls */}
      <div className="mesh-dark relative flex items-center justify-between px-4 py-3 bg-[#0B1120] text-white border-b border-white/10 flex-shrink-0">
        <span
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-400/40 to-transparent"
          aria-hidden="true"
        />
        <div className="flex items-center gap-2.5">
          <div className="relative w-8 h-8 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center flex-shrink-0 text-indigo-400 shadow-sm">
            <Sparkles className="w-4 h-4" />
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-[#0B1120]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 font-heading">
              <span className="text-sm font-bold text-white">
                Karka Assistant
              </span>
              <span className="px-1.5 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Official
              </span>
            </div>
            <p className="text-[10px] text-slate-300 flex items-center gap-1 font-body">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
              Online · Verified from karka.academy
            </p>
          </div>
        </div>

        {/* Header Action Buttons */}
        <div className="flex items-center gap-1 font-heading">
          {/* Mode Switcher Pill */}
          <button
            type="button"
            onClick={() => setIsWizardMode(!isWizardMode)}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer mr-1 ${
              isWizardMode
                ? "bg-indigo-600 text-white shadow-xs"
                : "bg-white/10 hover:bg-white/15 text-slate-200"
            }`}
            title={isWizardMode ? "Switch to Assistant Chat" : "Launch Course Recommendation Wizard"}
          >
            <Compass className="w-3.5 h-3.5 text-indigo-300" />
            <span className="hidden sm:inline">{isWizardMode ? "Chat" : "Find Course"}</span>
          </button>

          {/* Reset Conversation */}
          <button
            type="button"
            onClick={handleResetChat}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Clear chat conversation"
            title="Reset conversation"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Expand / Minimize Toggle (Desktop) */}
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors hidden sm:flex items-center justify-center cursor-pointer"
            aria-label={isExpanded ? "Collapse chat window" : "Expand chat window"}
            title={isExpanded ? "Restore compact size" : "Expand chat window"}
          >
            {isExpanded ? (
              <Minimize2 className="w-4 h-4 text-indigo-300" />
            ) : (
              <Maximize2 className="w-4 h-4" />
            )}
          </button>

          {/* Minimize */}
          <button
            type="button"
            onClick={onMinimize}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Minimize Chat Window"
            title="Minimize"
          >
            <Minus className="w-4 h-4" />
          </button>

          {/* Close */}
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close Chat Window"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Body: Either Course Recommendation Wizard or Chat Messages */}
      {isWizardMode ? (
        <CourseRecommendationWizard
          onCloseWizard={() => setIsWizardMode(false)}
          onSendToChat={(q) => {
            setIsWizardMode(false);
            handleSendMessage(q);
          }}
        />
      ) : (
        <>
          {/* 2. Quick Navigation Chips Carousel */}
          <div className="px-4 py-2 bg-slate-50 dark:bg-[#0B1120]/90 border-b border-slate-200/60 dark:border-white/10 flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth flex-shrink-0 font-heading">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 pl-0.5 shrink-0 flex items-center gap-1">
              <Compass className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
              Topics:
            </span>
            {QUICK_NAV_TOPICS.map((topic, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  if (topic.isWizard) {
                    setIsWizardMode(true);
                  } else {
                    handleSendMessage(topic.query);
                  }
                }}
                disabled={isLoading}
                className={`px-2.5 py-1 rounded-full text-[11px] font-bold whitespace-nowrap border transition-all shrink-0 active:scale-95 disabled:opacity-50 cursor-pointer ${
                  topic.isWizard
                    ? "bg-indigo-50 dark:bg-indigo-950/60 border-indigo-200/60 dark:border-indigo-800/50 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100"
                    : "bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-indigo-500/50 hover:text-indigo-600 dark:hover:text-indigo-300"
                }`}
              >
                {topic.label}
              </button>
            ))}
          </div>

          {/* 3. Message Area */}
          <div
            className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#F8FAFC] dark:bg-[#070B14] scroll-smooth"
            aria-live="polite"
            id="karka-chat-messages"
          >
            {messages.map((m) => (
              <MessageBubble
                key={m.id}
                message={m}
                onRetry={handleRetryMessage}
              />
            ))}

            {/* Suggestion chips (only show if 1 assistant message is in history) */}
            {messages.length === 1 && (
              <SuggestionChips
                onSelect={(q) => handleSendMessage(q)}
                onLaunchWizard={() => setIsWizardMode(true)}
                disabled={isLoading}
              />
            )}

            {/* Lead capture card after 3 answered questions */}
            {showLeadCapture && (
              <LeadCaptureCard
                onDismiss={() => {
                  setShowLeadCapture(false);
                  setLeadCaptureDismissed(true);
                }}
                onSubmitSuccess={() => {
                  setShowLeadCapture(false);
                  setLeadCaptureDismissed(true);
                  setMessages((prev) => [
                    ...prev,
                    {
                      id: `lead-ack-${Date.now()}`,
                      role: "assistant",
                      content:
                        "Thank you! Our academic mentor will review your profile and call you shortly.",
                    },
                  ]);
                }}
              />
            )}

            {/* Typing indicator */}
            {isLoading && (
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 pl-2 py-1 font-body">
                <span className="flex gap-1 items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-bounce" />
                </span>
                <span>Karka Assistant is thinking…</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* 4. Live Support Action Bar */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-slate-50 dark:bg-[#0B1120] border-t border-slate-200/80 dark:border-white/10 text-[11px] text-slate-500 dark:text-slate-400 flex-shrink-0 font-body">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Need 1:1 counselor advice?</span>
            </span>
            <div className="flex items-center gap-2.5 font-heading font-bold">
              <a
                href="https://wa.me/919487530243?text=Hi%20Karka%20Admissions,%20I%20have%20questions%20about%20your%20courses"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
              <span>·</span>
              <a
                href="tel:+919487530243"
                className="inline-flex items-center gap-1 text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>+91 9487530243</span>
              </a>
            </div>
          </div>

          {/* 5. Input Area */}
          <div className="px-4 py-3 sm:py-3.5 bg-white dark:bg-[#0B1120] border-t border-slate-200/80 dark:border-white/10 flex-shrink-0 space-y-2">
            {inputError && (
              <p
                role="alert"
                className="flex items-start gap-1.5 text-[11px] text-rose-600 dark:text-rose-400 font-body"
              >
                <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-px" />
                <span>{inputError}</span>
              </p>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <div className="relative flex-1">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => {
                    setInputValue(e.target.value);
                    if (inputError) setInputError(null);
                  }}
                  placeholder={
                    isListening ? "Listening…" : "Ask about courses, fees, placements, Nagercoil lab…"
                  }
                  maxLength={MAX_INPUT_CHARS}
                  disabled={isLoading}
                  className="w-full pl-3.5 pr-10 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-body transition-all"
                  aria-label="Your question for Karka Assistant"
                  aria-invalid={Boolean(inputError)}
                />
                {inputValue.length > 400 && (
                  <span className="absolute right-2 top-2.5 text-[10px] text-amber-500 font-mono">
                    {MAX_INPUT_CHARS - inputValue.length}
                  </span>
                )}
              </div>

              {/* Voice dictation (Web Speech API, where available) */}
              <button
                type="button"
                onClick={handleToggleVoice}
                disabled={isLoading}
                className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0 cursor-pointer ${
                  isListening
                    ? "bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-600 dark:text-rose-400"
                    : "bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-300 hover:border-indigo-300"
                }`}
                aria-label={isListening ? "Stop voice input" : "Ask using your voice"}
                aria-pressed={isListening}
                title={isListening ? "Stop listening" : "Ask by voice"}
              >
                {isListening ? (
                  <MicOff className="w-4 h-4 animate-pulse" />
                ) : (
                  <Mic className="w-4 h-4" />
                )}
              </button>

              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className="w-10 h-10 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center shadow-md shadow-indigo-600/25 transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0 cursor-pointer"
                aria-label="Send message"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </button>
            </form>
          </div>
        </>
      )}
    </motion.div>
  );
};
