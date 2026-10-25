"use client";

import React from "react";
import { Sparkles, Compass } from "lucide-react";

interface SuggestionChipsProps {
  onSelect: (question: string) => void;
  onLaunchWizard?: () => void;
  disabled?: boolean;
}

export const SUGGESTIONS = [
  "What is Pay After Placement?",
  "How much do I pay after placement?",
  "Is placement guaranteed?",
  "Which courses do you offer?",
  "Do I need a coding background?",
  "Where is Karka campus located?",
];

export const SuggestionChips: React.FC<SuggestionChipsProps> = ({
  onSelect,
  onLaunchWizard,
  disabled,
}) => {
  return (
    <div className="space-y-2 py-1 font-heading">
      <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-1">
        <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
        <span>Quick Questions &amp; Discovery</span>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {/* Prominent Smart Recommendation Wizard Button */}
        {onLaunchWizard && (
          <button
            type="button"
            disabled={disabled}
            onClick={onLaunchWizard}
            className="text-left px-3 py-1.5 rounded-full text-xs font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 border border-indigo-200/60 dark:border-indigo-800/50 transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer active:scale-95"
          >
            <Compass className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>Course Recommendation Wizard</span>
          </button>
        )}

        {SUGGESTIONS.map((item, idx) => (
          <button
            key={idx}
            type="button"
            disabled={disabled}
            onClick={() => onSelect(item)}
            className="text-left px-3 py-1.5 rounded-full text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-white/5 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-white/10 dark:hover:text-indigo-300 border border-slate-200/80 dark:border-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};
