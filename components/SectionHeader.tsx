import React from "react";
import { Sparkles } from "lucide-react";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string | React.ReactNode;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
  theme?: "light" | "dark" | "auto";
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className = "",
  theme = "auto",
}) => {
  const isCenter = align === "center";
  const isDark = theme === "dark";

  return (
    <div
      className={`max-w-3xl mb-12 lg:mb-16 ${
        isCenter ? "mx-auto text-center" : "text-left"
      } ${className}`}
    >
      {eyebrow && (
        <div
          className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-heading font-semibold uppercase tracking-wider mb-3.5 ${
            isDark
              ? "bg-indigo-950/60 border border-indigo-800/60 text-indigo-300"
              : "bg-indigo-50 border border-indigo-200/80 text-indigo-700 dark:bg-indigo-950/60 dark:border-indigo-800/60 dark:text-indigo-300"
          } ${isCenter ? "mx-auto" : ""}`}
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
          <span>{eyebrow}</span>
        </div>
      )}

      <h2
        className={`heading-section font-heading text-balance ${
          isDark ? "text-white" : "text-slate-900 dark:text-white"
        }`}
      >
        {title}
      </h2>

      {/* Short accent rule under the heading — a small typographic cue that
          reads as deliberate layout rather than stacked text. */}
      <div
        className={`mt-5 h-[3px] w-14 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 ${
          isCenter ? "mx-auto" : ""
        }`}
        aria-hidden="true"
      />

      {subtitle && (
        <p
          className={`mt-5 text-lead font-body ${
            isDark
              ? "text-slate-300"
              : "text-slate-600 dark:text-slate-400"
          } ${isCenter ? "mx-auto max-w-2xl" : ""}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};
