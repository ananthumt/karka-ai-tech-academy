"use client";

import React from "react";

interface TabsProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  className?: string;
  sticky?: boolean;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onTabChange,
  className = "",
  sticky = false,
}) => {
  return (
    <div
      className={`w-full z-30 transition-all ${
        sticky
          ? "sticky top-20 bg-white/80 dark:bg-[#0C1230]/80 backdrop-blur-md py-4 border-b border-slate-200/60 dark:border-white/10 shadow-sm"
          : ""
      } ${className}`}
    >
      <div className="container mx-auto px-4 max-w-7xl flex items-center justify-start sm:justify-center overflow-x-auto no-scrollbar gap-2 p-1.5 rounded-full bg-slate-100/80 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 w-max mx-auto">
        {tabs.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className={`px-6 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-200 focus:outline-none ${
                isActive
                  ? "bg-ultramarine text-white shadow-md shadow-ultramarine/30 scale-100"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/5"
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>
    </div>
  );
};
