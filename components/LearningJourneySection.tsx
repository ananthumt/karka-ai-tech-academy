"use client";

import React from "react";
import Link from "next/link";
import {
  Code,
  Layers,
  ShieldCheck,
  Briefcase,
  Award,
  CalendarCheck,
  Trophy,
  CheckCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { ROADMAP_PAGE_CONTENT } from "@/content/site";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal, RevealItem } from "@/components/motion/Reveal";

export const LearningJourneySection: React.FC = () => {
  const stepIcons = [
    Code,          // Step 1: Join Foundation
    Layers,        // Step 2: Expert Learning
    ShieldCheck,   // Step 3: Shared Success
    Briefcase,     // Step 4: Placement Training
    Award,         // Step 5: Free Internship
    CalendarCheck, // Step 6: Interview Schedule
    Trophy,        // Step 7: Success
    CheckCircle,   // Step 8: Payment
  ];

  return (
    <section
      id="learning-journey"
      className="py-18 sm:py-22 lg:py-26 bg-white dark:bg-[#080C17] border-b border-slate-200/80 dark:border-white/[0.08] transition-colors relative overflow-hidden"
    >
      {/* Subtle tech ambient background glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `radial-gradient(ellipse 70% 40% at 50% 0%, rgba(99, 102, 241, 0.08), transparent 70%)`,
        }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <Reveal>
          <SectionHeader
            eyebrow="Proven 8-Step Blueprint"
            title={
              <>
                The Transparent{" "}
                <span className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 dark:from-indigo-400 dark:via-indigo-300 dark:to-violet-400 bg-clip-text text-transparent">
                  Learning-to-Earning
                </span>{" "}
                Roadmap
              </>
            }
            subtitle={ROADMAP_PAGE_CONTENT.subtitle}
          />
        </Reveal>

        {/* 8-Step Visual Process Grid */}
        <Reveal staggerChildren={0.06}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
            {ROADMAP_PAGE_CONTENT.steps.map((item, idx) => {
              const Icon = stepIcons[idx] || CheckCircle;
              const isSpecialStep = item.step === 3 || item.step === 8;

              return (
                <RevealItem key={item.step} className="h-full">
                  <div
                    className={`group relative flex flex-col justify-between h-full p-6 rounded-2xl border transition-all duration-300 ${
                      isSpecialStep
                        ? "bg-gradient-to-b from-indigo-50/80 to-white dark:from-indigo-950/40 dark:to-[#0B1120] border-indigo-200 dark:border-indigo-800/60 shadow-md hover:border-indigo-400 dark:hover:border-indigo-600 hover:-translate-y-1"
                        : "bg-slate-50/60 dark:bg-[#0B1120] border-slate-200/80 dark:border-white/[0.08] hover:border-indigo-300 dark:hover:border-indigo-800/60 shadow-xs hover:shadow-lg hover:-translate-y-1"
                    }`}
                  >
                    <div>
                      {/* Step Header: Milestone Number + Stage Icon */}
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <span
                          className={`font-mono font-black text-xs px-2.5 py-1 rounded-lg uppercase tracking-wider ${
                            isSpecialStep
                              ? "bg-indigo-600 text-white shadow-xs"
                              : "bg-slate-200/80 dark:bg-white/10 text-slate-700 dark:text-slate-300"
                          }`}
                        >
                          Step 0{item.step}
                        </span>

                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                            isSpecialStep
                              ? "bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300"
                              : "bg-white dark:bg-white/[0.06] text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-white/[0.08] group-hover:text-indigo-600 dark:group-hover:text-indigo-400"
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading leading-snug mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-body">
                        {item.desc}
                      </p>
                    </div>

                    {/* Step Highlight Badge */}
                    <div className="pt-4 mt-4 border-t border-slate-200/60 dark:border-white/[0.06] flex items-center justify-between text-[11px]">
                      {item.step === 3 && (
                        <span className="font-semibold text-indigo-600 dark:text-indigo-400 font-heading">
                          ₹0 Upfront Tuition
                        </span>
                      )}
                      {item.step === 5 && (
                        <span className="font-semibold text-indigo-600 dark:text-indigo-400 font-heading">
                          Real Client Experience
                        </span>
                      )}
                      {item.step === 7 && (
                        <span className="font-semibold text-indigo-600 dark:text-indigo-400 font-heading">
                          Offer Letter Handed
                        </span>
                      )}
                      {item.step === 8 && (
                        <span className="font-semibold text-indigo-600 dark:text-indigo-400 font-heading">
                          Flat ₹40,000 Only
                        </span>
                      )}
                      {item.step !== 3 && item.step !== 5 && item.step !== 7 && item.step !== 8 && (
                        <span className="text-slate-400 font-body">
                          Verified Cohort Milestone
                        </span>
                      )}
                      <span className="text-slate-300 dark:text-slate-600 font-mono text-[10px]">
                        0{item.step}/08
                      </span>
                    </div>
                  </div>
                </RevealItem>
              );
            })}
          </div>
        </Reveal>

        {/* Detailed Roadmap Link CTA */}
        <div className="mt-12 flex justify-center pt-8 border-t border-slate-200/80 dark:border-white/10">
          <Link
            href="/roadmap"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-heading font-bold text-sm text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-600/20 hover:shadow-indigo-600/30 active:scale-[0.99] transition-all cursor-pointer group"
          >
            <span>Explore Full 8-Step Roadmap Details</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};
