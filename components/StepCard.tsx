import React from "react";

interface StepCardProps {
  step: number | string;
  title: string;
  description: string;
  badge?: string;
  icon?: React.ReactNode;
}

export const StepCard: React.FC<StepCardProps> = ({
  step,
  title,
  description,
  badge,
  icon,
}) => {
  return (
    <div className="surface surface-hover group relative h-full flex flex-col p-6 sm:p-8 rounded-3xl overflow-hidden">
      {/* Oversized ghost numeral. Gives the card a visual anchor and a sense
          of editorial hierarchy instead of a uniform block of text. */}
      <span
        className="pointer-events-none absolute -top-4 -right-1 font-heading font-black text-[7rem] leading-none text-slate-900/[0.035] dark:text-white/[0.04] select-none transition-transform duration-500 group-hover:scale-110 group-hover:text-indigo-600/[0.07] dark:group-hover:text-indigo-400/[0.08]"
        aria-hidden="true"
      >
        {step}
      </span>

      <div className="relative flex items-center justify-between mb-5">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white flex items-center justify-center font-extrabold text-lg font-heading shadow-[0_6px_18px_-6px_rgba(79,70,229,0.7)] ring-1 ring-inset ring-white/25 transition-transform duration-500 group-hover:scale-105">
          {step}
        </div>
        {badge && <span className="badge-neutral">{badge}</span>}
        {icon && <div className="text-indigo-600 dark:text-indigo-400">{icon}</div>}
      </div>

      <h3 className="relative text-xl font-bold text-slate-900 dark:text-white font-heading mb-2.5 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors">
        {title}
      </h3>

      <p className="relative text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-body">
        {description}
      </p>
    </div>
  );
};
