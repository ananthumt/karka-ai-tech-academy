import React from "react";
import { Sparkles, CheckCircle2 } from "lucide-react";

interface PillarCardProps {
  number: string;
  title: string;
  tag?: string;
  skills: string[];
  desc: string;
}

export const PillarCard: React.FC<PillarCardProps> = ({
  number,
  title,
  tag,
  skills,
  desc,
}) => {
  const isCore = !!tag;

  return (
    <div
      className={`relative flex flex-col justify-between p-8 rounded-3xl border transition-all duration-300 card-hover ${
        isCore
          ? "bg-gradient-to-b from-lime/10 to-transparent dark:from-lime/15 dark:to-transparent border-lime/40 dark:border-lime/30 shadow-lg shadow-lime/5"
          : "bg-white dark:bg-[#111A2E] border-slate-200/80 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 shadow-sm"
      }`}
    >
      <div>
        <div className="flex items-center justify-between mb-6">
          <span
            className={`text-4xl sm:text-5xl font-extrabold font-heading tracking-tight ${
              isCore
                ? "text-emerald-700 dark:text-lime"
                : "text-slate-300 dark:text-slate-700"
            }`}
          >
            {number}
          </span>

          {tag && (
            <span className="badge-lime shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{tag}</span>
            </span>
          )}
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-heading mb-3">
          {title}
        </h3>

        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-body mb-6">
          {desc}
        </p>
      </div>

      <div className="pt-4 border-t border-slate-100 dark:border-white/10">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3 font-heading">
          Key Focus Areas:
        </p>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 text-xs font-semibold text-slate-700 dark:text-slate-300"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-lime" />
              <span>{skill}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
