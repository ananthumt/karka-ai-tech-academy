"use client";

import React, { useState } from "react";
import { Plus, MessageCircle, ArrowRight, HelpCircle } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { SITE_CONFIG } from "@/content/site";

interface FaqItem {
  q: string;
  a: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
  showContactBox?: boolean;
  onOpenApply?: () => void;
}

export const FaqAccordion: React.FC<FaqAccordionProps> = ({
  items,
  showContactBox = true,
  onOpenApply,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const shouldReduceMotion = useReducedMotion();

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-3.5">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        const buttonId = `faq-btn-${idx}`;
        const panelId = `faq-panel-${idx}`;

        return (
          <div
            key={idx}
            className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
              isOpen
                ? "bg-white dark:bg-[#111A2E] border-indigo-500/40 dark:border-indigo-500/40 shadow-md shadow-indigo-500/5"
                : "bg-white/80 dark:bg-white/5 border-slate-200/80 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20"
            }`}
          >
            <button
              id={buttonId}
              onClick={() => toggle(idx)}
              className="w-full flex items-center justify-between p-5 sm:p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 cursor-pointer"
              aria-expanded={isOpen}
              aria-controls={panelId}
            >
              <div className="flex items-center gap-3.5 pr-4">
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-heading font-black transition-colors ${
                    isOpen
                      ? "bg-indigo-600 text-white"
                      : "bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-400"
                  }`}
                >
                  Q{idx + 1}
                </div>
                <span className="font-bold text-base sm:text-lg text-slate-900 dark:text-white font-heading">
                  {item.q}
                </span>
              </div>

              {/* Rotating Plus Icon */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                  isOpen
                    ? "rotate-45 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400"
                    : "bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-400"
                }`}
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
              </div>
            </button>

            {/* Smooth height animation */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    duration: shouldReduceMotion ? 0 : 0.28,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="overflow-hidden"
                >
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-white/5 font-body">
                    <p className="pl-10">{item.a}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}

      {showContactBox && (
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-[#111A2E] border border-slate-200/80 dark:border-white/10 text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 mx-auto flex items-center justify-center border border-indigo-500/30">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white font-heading">
              Still have doubts about our programs or Pay After Placement?
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mt-1.5 font-body">
              Our academic mentors in Nagercoil are available to guide you through curriculum details, eligibility, and the enrollment process.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
            <a
              href={SITE_CONFIG.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl font-heading font-extrabold text-sm flex items-center gap-2 cursor-pointer shadow-md bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/25 transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Talk to Our Team</span>
            </a>

            <button
              onClick={onOpenApply}
              className="px-6 py-3 rounded-xl bg-slate-900 dark:bg-white/10 hover:bg-slate-800 dark:hover:bg-white/20 text-white font-heading font-bold text-sm transition-all cursor-pointer flex items-center gap-2"
            >
              <span>Apply Now for Free</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
