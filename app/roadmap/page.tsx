"use client";

import React, { useState } from "react";
import {
  Sparkles,
  CheckCircle2,
  Calendar,
  Clock,
  ArrowRight,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { ROADMAP_PAGE_CONTENT } from "@/content/site";
import { CtaBand } from "@/components/CtaBand";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { PapSavingsCalculator } from "@/components/PapSavingsCalculator";

export default function RoadmapPage() {
  const [activeSchedule, setActiveSchedule] = useState<"full" | "part">("full");
  const data = ROADMAP_PAGE_CONTENT;

  return (
    <div className="w-full flex flex-col">
      {/* 1. HERO SECTION */}
      <section className="pt-20 pb-20 bg-[#0C1230] text-white relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-ultramarine/25 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-mint/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center relative z-10 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-mint text-xs font-bold uppercase tracking-wider border border-white/15">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Structured Career Journey</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black font-heading tracking-tight text-white">
            {data.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            {data.subtitle}
          </p>
        </div>
      </section>

      {/* 2. 8-STEP TIMELINE */}
      <section className="py-20 lg:py-28 bg-[#F5F6FB] dark:bg-[#090D1A] transition-colors">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <Reveal staggerChildren={0.07}>
            <ol className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {data.steps.map((st) => (
                <RevealItem key={st.step}>
                  <li className="h-full p-8 rounded-3xl bg-white dark:bg-[#12193E] border border-slate-200/80 dark:border-white/10 shadow-sm flex items-start gap-5 card-hover list-none">
                    <span className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-black text-lg shrink-0 shadow-md font-heading">
                      {st.step}
                    </span>
                    <span className="block">
                      <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white">
                        {st.title}
                      </h3>
                      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-body">
                        {st.desc}
                      </p>
                    </span>
                  </li>
                </RevealItem>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* 3. SCHEDULE & COMMITMENT (Interactive Toggle) */}
      <section className="py-20 lg:py-28 bg-white dark:bg-[#0C1230] transition-colors border-y border-slate-200/60 dark:border-white/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center space-y-10">
          <div>
            <h2 className="text-3xl sm:text-4xl font-black font-heading text-slate-900 dark:text-white">
              {data.schedule.title}
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-400 text-base">
              {data.schedule.subtitle}
            </p>

            {/* Toggle Switch */}
            <div className="mt-8 inline-flex p-1.5 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200/80 dark:border-white/10">
              <button
                onClick={() => setActiveSchedule("full")}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                  activeSchedule === "full"
                    ? "bg-ultramarine text-white shadow-md"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900"
                }`}
              >
                Full-Time Program
              </button>
              <button
                onClick={() => setActiveSchedule("part")}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                  activeSchedule === "part"
                    ? "bg-ultramarine text-white shadow-md"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900"
                }`}
              >
                Part-Time Program
              </button>
            </div>
          </div>

          {/* Active Schedule Display */}
          <div className="p-8 sm:p-12 rounded-[2.5rem] bg-slate-50 dark:bg-[#12193E] border border-slate-200/80 dark:border-white/10 shadow-xl text-left space-y-6">
            {activeSchedule === "full" ? (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-2xl font-bold font-heading text-slate-900 dark:text-white">
                    {data.schedule.fullTime.title}
                  </h3>
                  <span className="px-3 py-1 rounded-full bg-mint/20 text-mint text-xs font-black uppercase tracking-wider">
                    {data.schedule.fullTime.badge}
                  </span>
                </div>
                <p className="text-base text-slate-700 dark:text-slate-300 font-semibold">
                  {data.schedule.fullTime.commitment}
                </p>
                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                  <Calendar className="w-4 h-4 text-ultramarine dark:text-mint" />
                  <span>{data.schedule.fullTime.scheduleDesc}</span>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-2xl font-bold font-heading text-slate-900 dark:text-white">
                    {data.schedule.partTime.title}
                  </h3>
                  <span className="px-3 py-1 rounded-full bg-ultramarine/10 text-ultramarine dark:text-mint text-xs font-black uppercase tracking-wider">
                    {data.schedule.partTime.badge}
                  </span>
                </div>
                <p className="text-base text-slate-700 dark:text-slate-300 font-semibold">
                  {data.schedule.partTime.commitment}
                </p>
                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                  <Calendar className="w-4 h-4 text-ultramarine dark:text-mint" />
                  <span>{data.schedule.partTime.scheduleDesc}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE PAY AFTER PLACEMENT? */}
      <section className="py-20 lg:py-28 bg-[#F5F6FB] dark:bg-[#090D1A] transition-colors">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center space-y-4">
          <Reveal>
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/60 dark:border-indigo-800/50 text-indigo-600 dark:text-indigo-400 mx-auto flex items-center justify-center">
              <ShieldCheck className="w-7 h-7" aria-hidden="true" />
            </div>
            <h2 className="mt-4 text-3xl sm:text-4xl font-black font-heading text-slate-900 dark:text-white">
              {data.whyPayAfterPlacement.title}
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto font-body">
              {data.whyPayAfterPlacement.desc}
            </p>
          </Reveal>
        </div>
      </section>

      {/* 5. RUN THE NUMBERS YOURSELF */}
      <section
        id="calculator"
        className="py-20 lg:py-28 bg-white dark:bg-[#0B1120] border-t border-slate-200/80 dark:border-white/10 transition-colors scroll-mt-24"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <Reveal>
            <SectionHeader
              eyebrow="Transparency"
              title="Run the numbers yourself"
              subtitle="Rather than asking you to take our word for it, enter the quote you have been given elsewhere and your own salary expectation. The only Karka figures here are the published ones: ₹0 upfront and a flat ₹40,000 after placement."
            />
          </Reveal>

          <Reveal delay={0.1}>
            <PapSavingsCalculator />
          </Reveal>
        </div>
      </section>

      {/* Global CTA Band */}
      <CtaBand />
    </div>
  );
}
