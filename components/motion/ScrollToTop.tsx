"use client";

import React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useScrollPast, subscribeScrollProgress } from "@/lib/scroll-store";

// r=18 circle circumference, used for the progress ring dash maths.
const CIRCUMFERENCE = 2 * Math.PI * 18;

/**
 * Floating "back to top" control with a circular read-progress ring.
 *
 * Positioned above the chat launcher so the two never overlap. The ring is
 * driven by the shared `--scroll-progress` CSS variable rather than React
 * state, so scrolling costs no renders here; only the show/hide flag is
 * stateful and that flips at most twice per page.
 */
export const ScrollToTop: React.FC = () => {
  const isVisible = useScrollPast(900);
  const shouldReduceMotion = useReducedMotion();
  const circleRef = React.useRef<SVGCircleElement>(null);

  React.useEffect(() => {
    return subscribeScrollProgress((progress) => {
      if (circleRef.current) {
        circleRef.current.style.strokeDashoffset = `${CIRCUMFERENCE * (1 - progress)}`;
      }
    });
  }, []);

  const handleClick = () => {
    if (typeof window !== "undefined" && (window as unknown as { __lenis?: { scrollTo: (target: number, opts?: { duration?: number }) => void } }).__lenis) {
      (window as unknown as { __lenis: { scrollTo: (target: number, opts?: { duration?: number }) => void } }).__lenis.scrollTo(0, {
        duration: shouldReduceMotion ? 0 : 0.75,
      });
    } else {
      window.scrollTo({ top: 0, behavior: shouldReduceMotion ? "auto" : "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          type="button"
          onClick={handleClick}
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          aria-label="Scroll back to top"
          title="Back to top"
          className="fixed bottom-24 right-6 z-40 hidden sm:flex items-center justify-center w-11 h-11 rounded-full bg-white/80 dark:bg-[#111A2E]/80 backdrop-blur-xl border border-slate-200/80 dark:border-white/10 text-slate-700 dark:text-slate-200 shadow-lg hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors cursor-pointer print:hidden"
        >
          <svg
            className="absolute inset-0 w-full h-full -rotate-90"
            viewBox="0 0 44 44"
            aria-hidden="true"
          >
            <circle
              cx="22"
              cy="22"
              r="18"
              fill="none"
              strokeWidth="2"
              className="stroke-slate-200 dark:stroke-white/10"
            />
            <circle
              ref={circleRef}
              cx="22"
              cy="22"
              r="18"
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
              className="stroke-indigo-600 dark:stroke-indigo-400"
              strokeDasharray={CIRCUMFERENCE}
              style={{
                strokeDashoffset: `${CIRCUMFERENCE}`,
                transition: "stroke-dashoffset 0.1s linear",
              }}
            />
          </svg>
          <ArrowUp className="w-4 h-4 relative z-10 stroke-[2.5]" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};
