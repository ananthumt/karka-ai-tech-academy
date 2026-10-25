"use client";

import React from "react";
import { TrendingUp, Trophy, Building2, Briefcase } from "lucide-react";
import { Counter } from "@/components/motion/Counter";

interface StatCardProps {
  number: string;
  suffix?: string;
  label: string;
  icon?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  number,
  suffix = "",
  label,
  icon,
}) => {
  const fullValue = `${number}${suffix}`;

  const renderIcon = () => {
    switch (label.toLowerCase()) {
      case "highest package":
        return <TrendingUp className="w-6 h-6 text-lime" />;
      case "placement rate":
        return <Trophy className="w-6 h-6 text-amber-400" />;
      case "hiring partners":
        return <Building2 className="w-6 h-6 text-slate-700 dark:text-slate-300" />;
      case "average hike":
        return <Briefcase className="w-6 h-6 text-emerald-500" />;
      default:
        return <TrendingUp className="w-6 h-6 text-lime" />;
    }
  };

  return (
    <div className="flex flex-col items-center text-center p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-white/10 shadow-sm hover:shadow-xl hover:shadow-lime/5 hover:-translate-y-1.5 hover:border-lime/40 dark:hover:border-lime/30 transition-all duration-300">
      <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200/50 dark:border-white/5 flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
        {renderIcon()}
      </div>

      <div className="heading-section text-slate-900 dark:text-white font-heading tracking-tight mb-2">
        <Counter value={fullValue} />
      </div>

      <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-heading">
        {label}
      </p>
    </div>
  );
};
