"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Copy,
  Check,
  Sparkles,
  Volume2,
  VolumeX,
  ThumbsUp,
  ThumbsDown,
  RotateCcw,
} from "lucide-react";
import { HandoffButtons } from "./HandoffButtons";
import { HANDOFF_TRIGGER_PHRASES, ERROR_TRIGGER_PHRASES } from "@/lib/chat-messages";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  isError?: boolean;
}

interface MessageBubbleProps {
  message: ChatMessage;
  onRetry?: (text: string) => void;
}

/**
 * Custom lightweight Markdown parser for:
 * 1. Bold (**text**)
 * 2. Markdown Links ([label](url))
 * 3. Raw paths (/courses/..., /placement, etc.) and URLs (https://...)
 * 4. Bullet lists (- item)
 */
function renderFormattedContent(content: string) {
  const lines = content.split("\n");

  return (
    <div className="space-y-1 text-xs sm:text-sm leading-relaxed break-words font-body">
      {lines.map((line, lineIdx) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={lineIdx} className="h-0.5" />;

        // Bullet point check
        const isBullet = trimmed.startsWith("- ") || trimmed.startsWith("* ");
        const textToParse = isBullet ? trimmed.slice(2).trim() : line;

        // Tokenize by markdown link [label](url), bold **bold**, or raw URLs/paths.
        // The path alternative must cover every route the KB and the canned
        // fallbacks can emit — anything missing here renders as dead plain text.
        const parts: React.ReactNode[] = [];
        const tokenRegex =
          /(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|https?:\/\/[^\s)]+|\/(?:courses|placement|about-us|roadmap|contact|blog|compare|course-finder|hire-from-us|privacy-policy|terms-of-service|for-[a-z-]+)(?:\/[a-z0-9-]+)*(?:#[a-z0-9-]+)?|\/#[a-z0-9-]+)/g;

        let lastIndex = 0;
        let match: RegExpExecArray | null;

        while ((match = tokenRegex.exec(textToParse)) !== null) {
          if (match.index > lastIndex) {
            parts.push(textToParse.slice(lastIndex, match.index));
          }

          const matchedStr = match[0];

          if (matchedStr.startsWith("[") && matchedStr.includes("](") && matchedStr.endsWith(")")) {
            // Markdown link [label](url)
            const split = matchedStr.slice(1, -1).split("](");
            const label = split[0];
            const href = split[1];
            if (href.startsWith("/")) {
              parts.push(
                <Link
                  key={`${lineIdx}-${match.index}`}
                  href={href}
                  className="font-semibold text-indigo-600 dark:text-indigo-400 underline underline-offset-2 hover:opacity-80 transition-opacity inline-flex items-center"
                >
                  {label}
                </Link>
              );
            } else {
              parts.push(
                <a
                  key={`${lineIdx}-${match.index}`}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-indigo-600 dark:text-indigo-400 underline underline-offset-2 hover:opacity-80 transition-opacity inline-flex items-center"
                >
                  {label}
                </a>
              );
            }
          } else if (matchedStr.startsWith("**") && matchedStr.endsWith("**")) {
            // Bold
            parts.push(
              <strong key={`${lineIdx}-${match.index}`} className="font-bold text-slate-900 dark:text-white font-heading">
                {matchedStr.slice(2, -2)}
              </strong>
            );
          } else if (matchedStr.startsWith("http")) {
            // External URL
            parts.push(
              <a
                key={`${lineIdx}-${match.index}`}
                href={matchedStr}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-indigo-600 dark:text-indigo-400 underline underline-offset-2 hover:opacity-80 transition-opacity"
              >
                {matchedStr}
              </a>
            );
          } else if (matchedStr.startsWith("/")) {
            // Internal path
            parts.push(
              <Link
                key={`${lineIdx}-${match.index}`}
                href={matchedStr}
                className="font-semibold text-indigo-600 dark:text-indigo-400 underline underline-offset-2 hover:opacity-80 transition-opacity"
              >
                {matchedStr}
              </Link>
            );
          }

          lastIndex = match.index + matchedStr.length;
        }

        if (lastIndex < textToParse.length) {
          parts.push(textToParse.slice(lastIndex));
        }

        if (isBullet) {
          return (
            <div key={lineIdx} className="flex items-start gap-2 pl-1">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:text-indigo-400 mt-1.5 flex-shrink-0" />
              <div>{parts}</div>
            </div>
          );
        }

        return <div key={lineIdx}>{parts}</div>;
      })}
    </div>
  );
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message, onRetry }) => {
  const [copied, setCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [feedback, setFeedback] = useState<"helpful" | "unhelpful" | null>(null);
  const isAssistant = message.role === "assistant";

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSpeak = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    window.speechSynthesis.cancel();
    const cleanText = message.content
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/[*_#`]/g, "")
      .replace(/https?:\/\/\S+/g, "");
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleFeedback = (type: "helpful" | "unhelpful") => {
    const next = feedback === type ? null : type;
    setFeedback(next);
    if (!next) return;

    // Fire-and-forget: the rating is a UX nicety, so a failed POST must never
    // interrupt the conversation. Previously this state was purely local and
    // no signal ever left the browser.
    void fetch("/api/chat-feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      body: JSON.stringify({
        rating: next,
        messageId: message.id,
        answer: message.content.slice(0, 500),
      }),
    }).catch(() => {
      /* ignore */
    });
  };

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Handoff + retry affordances are keyed off the canned copy. The phrase lists
  // live beside the messages themselves in lib/chat-messages so rewording a
  // message can't silently remove the buttons.
  const contentLower = message.content.toLowerCase();
  const shouldShowHandoff =
    isAssistant && HANDOFF_TRIGGER_PHRASES.some((phrase) => contentLower.includes(phrase));

  const isErrorMessage =
    message.isError || ERROR_TRIGGER_PHRASES.some((phrase) => contentLower.includes(phrase));

  return (
    <div className={`flex w-full ${isAssistant ? "justify-start" : "justify-end"} group py-0.5`}>
      <div className={`flex items-start gap-2.5 max-w-[88%] sm:max-w-[85%] ${isAssistant ? "flex-row" : "flex-row-reverse"}`}>
        {isAssistant && (
          <div className="w-7 h-7 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm border border-indigo-200/60 dark:border-indigo-800/50">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
        )}

        <div className="relative">
          <div
            className={`px-4 py-3 rounded-2xl shadow-sm ${
              isAssistant
                ? "bg-white dark:bg-[#111A2E] text-slate-800 dark:text-slate-100 border border-slate-200/80 dark:border-white/10 rounded-tl-xs"
                : "bg-indigo-600 text-white rounded-tr-xs shadow-indigo-600/10"
            }`}
          >
            {renderFormattedContent(message.content)}
            {shouldShowHandoff && <HandoffButtons />}

            {/* In-bubble Retry Button if error */}
            {isErrorMessage && onRetry && (
              <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-white/10 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onRetry(message.content)}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-bold hover:bg-indigo-100 font-heading cursor-pointer transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Retry Question</span>
                </button>
              </div>
            )}
          </div>

          {/* Action buttons (Copy + Speak + Feedback Thumbs) on assistant messages */}
          {isAssistant && message.content.trim() && (
            <div className="flex items-center gap-1.5 mt-1 px-1">
              {/* Feedback: Thumbs Up */}
              <button
                type="button"
                onClick={() => handleFeedback("helpful")}
                className={`p-1 rounded-md text-xs transition-colors cursor-pointer ${
                  feedback === "helpful"
                    ? "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50"
                    : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                }`}
                aria-label="Mark answer as helpful"
                title="Helpful"
              >
                <ThumbsUp className="w-3 h-3" />
              </button>

              {/* Feedback: Thumbs Down */}
              <button
                type="button"
                onClick={() => handleFeedback("unhelpful")}
                className={`p-1 rounded-md text-xs transition-colors cursor-pointer ${
                  feedback === "unhelpful"
                    ? "text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/50"
                    : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                }`}
                aria-label="Mark answer as not helpful"
                title="Not helpful"
              >
                <ThumbsDown className="w-3 h-3" />
              </button>

              {feedback && (
                <span className="text-[10px] text-slate-400 font-heading">
                  Thanks for your feedback!
                </span>
              )}

              <div className="ml-auto flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {/* Text to Speech */}
                <button
                  type="button"
                  onClick={handleSpeak}
                  className="p-1 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-slate-400 hover:text-slate-700 dark:hover:text-white shadow-xs cursor-pointer"
                  aria-label={isSpeaking ? "Stop speech" : "Read message aloud"}
                  title={isSpeaking ? "Stop audio" : "Read aloud"}
                >
                  {isSpeaking ? (
                    <VolumeX className="w-3 h-3 text-amber-500 animate-pulse" />
                  ) : (
                    <Volume2 className="w-3 h-3" />
                  )}
                </button>

                {/* Copy to Clipboard */}
                <button
                  type="button"
                  onClick={handleCopy}
                  className="p-1 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-slate-400 hover:text-slate-700 dark:hover:text-white shadow-xs cursor-pointer"
                  aria-label="Copy message text"
                  title={copied ? "Copied!" : "Copy message"}
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
