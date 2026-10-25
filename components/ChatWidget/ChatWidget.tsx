"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { MessageSquare, Sparkles } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { ChatPanel } from "./ChatPanel";

/**
 * `?chat=` values that should auto-open the panel.
 * "wizard" was previously missing, so deep-linking straight to the course
 * finder only worked if the panel happened to already be open.
 */
const AUTO_OPEN_PARAMS = new Set([
  "open",
  "chips",
  "answered",
  "declined",
  "expanded",
  "wizard",
]);

export const ChatWidget: React.FC = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Hidden on legal routes
  const isHiddenRoute = pathname === "/privacy-policy" || pathname === "/terms-of-service";

  // Remember open/closed state per session only or from URL params
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const chatParam = new URLSearchParams(window.location.search).get("chat");
        if (chatParam && AUTO_OPEN_PARAMS.has(chatParam)) {
          setIsOpen(true);
          return;
        }

        if (sessionStorage.getItem("karka_chat_state") === "open") {
          setIsOpen(true);
        }
      }
    } catch {
      // Ignore storage restrictions
    }
  }, []);

  const [isIdlePulse, setIsIdlePulse] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsIdlePulse(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleToggle = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);
    setIsIdlePulse(false);
    try {
      sessionStorage.setItem("karka_chat_state", nextState ? "open" : "closed");
    } catch {
      // pass
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    try {
      sessionStorage.setItem("karka_chat_state", "closed");
    } catch {
      // pass
    }
  };

  if (isHiddenRoute) {
    return null;
  }

  return (
    <>
      {/* 1. Chat Panel Dialog with AnimatePresence exit transitions */}
      <AnimatePresence>
        {isOpen && (
          <ChatPanel
            isOpen={isOpen}
            onClose={handleClose}
            onMinimize={() => handleClose()}
          />
        )}
      </AnimatePresence>

      {/* 2. Floating Round Mascot Button */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-40 print:hidden">
          <button
            type="button"
            onClick={handleToggle}
            className="group relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#0B1120] text-white shadow-2xl hover:shadow-indigo-500/25 hover:scale-105 active:scale-95 transition-all duration-300 border-2 border-indigo-500/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 cursor-pointer"
            aria-label="Open Karka Assistant AI Chat"
          >
            {/* Ambient pulse ring */}
            <span
              className={`absolute -inset-1 rounded-full bg-indigo-500/20 blur-sm transition duration-500 pointer-events-none ${
                isIdlePulse
                  ? "animate-ping opacity-60"
                  : "animate-pulse opacity-30 group-hover:opacity-75"
              }`}
            />

            {/* Sleek Modern Icon */}
            <div className="relative z-10 flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 text-indigo-400 group-hover:scale-110 transition-transform duration-300">
              <MessageSquare className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.2]" />
              <Sparkles className="w-3 h-3 text-indigo-300 absolute -top-1 -right-1" />
            </div>

            {/* Live status dot */}
            <span className="absolute top-2 right-2 z-20 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-[#0B1120]" />
            </span>

            {/* Helper tooltip on hover */}
            <div className="absolute right-full mr-3.5 px-3 py-1.5 rounded-xl bg-[#0B1120]/95 text-white text-xs font-semibold whitespace-nowrap shadow-xl border border-white/10 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 hidden sm:block font-body">
              Chat with Karka Assistant
            </div>
          </button>
        </div>
      )}
    </>
  );
};
