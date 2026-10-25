import React from "react";
import { Check, X, Sparkles } from "lucide-react";

export interface ComparisonRow {
  feature: string;
  karka: string;
  others: string;
}

interface ComparisonTableProps {
  title?: string;
  subtitle?: string;
  colKarkaTitle?: string;
  colOthersTitle?: string;
  rows: ComparisonRow[];
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({
  title,
  subtitle,
  colKarkaTitle = "Karka AI",
  colOthersTitle = "Standard Courses",
  rows,
}) => {
  return (
    <div className="w-full max-w-5xl mx-auto overflow-hidden">
      {title && (
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider mb-3 border border-indigo-200/60 dark:border-indigo-800/50">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>The Advantage</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-heading">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-3 text-slate-600 dark:text-slate-400 text-base max-w-2xl mx-auto font-body">
              {subtitle}
            </p>
          )}
        </div>
      )}

      <div className="overflow-x-auto rounded-2xl border border-slate-200/80 dark:border-white/10 shadow-xl bg-white dark:bg-[#111A2E]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200/80 dark:border-white/10 bg-slate-50/80 dark:bg-white/5">
              <th className="py-4 sm:py-5 px-5 sm:px-8 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 font-heading">
                Key Dimension
              </th>
              <th className="py-4 sm:py-5 px-5 sm:px-8 text-xs font-black uppercase tracking-wider text-indigo-700 dark:text-indigo-300 bg-indigo-50/60 dark:bg-indigo-950/40 border-x border-slate-200/60 dark:border-white/10 font-heading">
                {colKarkaTitle}
              </th>
              <th className="py-4 sm:py-5 px-5 sm:px-8 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 font-heading">
                {colOthersTitle}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-white/5 text-sm font-body">
            {rows.map((row, idx) => {
              const isHighlight = idx % 2 === 0;
              return (
                <tr
                  key={idx}
                  className={`transition-colors hover:bg-slate-50/60 dark:hover:bg-white/5 ${
                    isHighlight ? "bg-white dark:bg-[#111A2E]" : "bg-slate-50/40 dark:bg-[#0E1528]"
                  }`}
                >
                  <td className="py-4 px-5 sm:px-8 font-bold text-slate-900 dark:text-white">
                    {row.feature}
                  </td>
                  <td className="py-4 px-5 sm:px-8 font-bold text-slate-900 dark:text-white bg-indigo-50/30 dark:bg-indigo-950/20 border-x border-slate-200/60 dark:border-white/10">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      </div>
                      <span>{row.karka}</span>
                    </div>
                  </td>
                  <td className="py-4 px-5 sm:px-8 text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-slate-100 dark:bg-white/10 text-slate-400 flex items-center justify-center shrink-0">
                        <X className="w-3.5 h-3.5" />
                      </div>
                      <span>{row.others}</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
