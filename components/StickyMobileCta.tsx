"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Phone, Compass, Sparkles } from "lucide-react";
import { SITE_CONFIG } from "@/content/site";
import { useEnrollModal } from "@/components/EnrollContext";
import { useScrollPast } from "@/lib/scroll-store";

/**
 * Mobile-only conversion bar.
 *
 * Appears after the user has scrolled past the hero so it never covers the
 * primary above-the-fold CTA. Sits above the chat launcher's safe area and is
 * hidden on legal pages and while the enrol modal would be the better surface.
 */
const HIDDEN_ROUTES = new Set(["/privacy-policy", "/terms-of-service"]);

export const StickyMobileCta: React.FC = () => {
  const pathname = usePathname();
  const { openEnroll } = useEnrollModal();
  const shouldReduceMotion = useReducedMotion();
  // Shared scroll driver: flips once at 600px rather than running its own
  // listener and rAF loop.
  const isVisible = useScrollPast(600);

  if (HIDDEN_ROUTES.has(pathname)) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={shouldReduceMotion ? undefined : { y: "110%" }}
          animate={shouldReduceMotion ? undefined : { y: 0 }}
          exit={shouldReduceMotion ? undefined : { y: "110%" }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          // `pr-24` keeps clear of the floating chat launcher at bottom-right.
          className="fixed bottom-0 left-0 right-0 z-30 sm:hidden print:hidden pb-[env(safe-area-inset-bottom)]"
        >
          <div className="m-3 mr-20 p-2 rounded-2xl bg-white/95 dark:bg-[#0B1120]/95 backdrop-blur-xl border border-slate-200 dark:border-white/10 shadow-2xl flex items-center gap-2">
            <button
              type="button"
              onClick={() => openEnroll()}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white font-heading font-bold text-xs shadow-md shadow-indigo-600/25 transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Apply Free</span>
            </button>

            <Link
              href="/course-finder"
              className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-slate-100 dark:bg-white/5 text-indigo-600 dark:text-indigo-400 border border-slate-200 dark:border-white/10 transition-colors cursor-pointer"
              aria-label="Find the right course with our 60-second quiz"
            >
              <Compass className="w-4 h-4" aria-hidden="true" />
            </Link>

            <a
              href={SITE_CONFIG.phoneTel}
              className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-slate-100 dark:bg-white/5 text-emerald-600 dark:text-emerald-400 border border-slate-200 dark:border-white/10 transition-colors cursor-pointer"
              aria-label={`Call Karka Academy on ${SITE_CONFIG.phone}`}
            >
              <Phone className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
