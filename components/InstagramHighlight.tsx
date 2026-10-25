"use client";

import React from "react";
import Image from "next/image";
import { Instagram, ArrowUpRight, Heart, Sparkles, Users } from "lucide-react";
import { SITE_CONFIG } from "@/content/site";

export const InstagramHighlight: React.FC = () => {
  return (
    <div className="mt-8 p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#111A2E] text-slate-900 dark:text-white border border-slate-200/80 dark:border-white/10 shadow-lg dark:shadow-xl relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-start sm:items-center gap-4 text-left">
          <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-rose-500/20">
            <Instagram className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-rose-500 dark:text-rose-400">
                Official Campus Community
              </span>
              <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-white/10">
                @karka.ai
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black font-heading text-slate-900 dark:text-white mt-1">
              Join 500+ Innovators on Instagram
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-xl font-body leading-relaxed">
              Catch daily campus moments, live hackathons, Infini tournament updates, and student project showcases directly from our Nagercoil center.
            </p>
          </div>
        </div>

        <a
          href={SITE_CONFIG.socials.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white font-heading font-bold text-sm shadow-lg shadow-rose-500/25 transition-all duration-300 shrink-0 hover:scale-105 active:scale-95 cursor-pointer"
        >
          <span>Follow @karka.ai</span>
          <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
        </a>
      </div>
    </div>
  );
};
