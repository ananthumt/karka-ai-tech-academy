"use client";

import React, { useState } from "react";
import {
  Trophy,
  Zap,
  Presentation,
  Brain,
  Bug,
  Globe,
  Palette,
  Clapperboard,
  School,
  MapPin,
  Award,
  ArrowUpRight,
  Bot,
  Code2,
  TrendingUp,
  Users2,
  Sparkles,
  ShieldCheck,
  Check,
  CornerDownLeft,
  GraduationCap,
  ChevronRight,
  Flame,
} from "lucide-react";
import { HOME_CONTENT } from "@/content/site";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";

export const ExplorePlatformsSection: React.FC = () => {
  const { platforms } = HOME_CONTENT;
  const [selectedContest, setSelectedContest] = useState<number | null>(null);
  const [promptInput, setPromptInput] = useState("");

  // Map 6 contest categories with dedicated Lucide icons
  const contestIcons = [
    Presentation, // PaperPulse (Idea Presentation)
    Brain,        // TechRush (Technical Quiz)
    Bug,          // Bug Hunt (Debugging)
    Globe,        // SiteSprint (Website Building)
    Palette,      // Graphix (Poster Design)
    Clapperboard, // VibeCut (Video Creation)
  ];

  // Map 4 Spike features with dedicated Lucide icons
  const spikeFeatureIcons = [
    Bot,         // AI-Guided
    Code2,       // Hands-On
    TrendingUp,  // Progress
    Users2,      // Mentor-Backed
  ];

  // Quick prompt suggestions for the Spike preview card
  const samplePrompts = [
    "Explain Server vs Client Components",
    "Find bugs in this SQL query",
    "How to prepare for fullstack interview",
  ];

  return (
    <section
      id="platforms"
      className="py-16 sm:py-20 lg:py-24 bg-slate-50/70 dark:bg-[#070B14] border-b border-slate-200/80 dark:border-white/[0.08] transition-colors relative overflow-hidden"
    >
      {/* Subtle tech ambient background glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-30"
        style={{
          backgroundImage: `radial-gradient(ellipse 60% 40% at 20% 20%, rgba(99, 102, 241, 0.08), transparent 70%),
                            radial-gradient(ellipse 60% 40% at 80% 80%, rgba(139, 92, 246, 0.07), transparent 70%)`,
        }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        {/* Section Header */}
        <Reveal>
          <SectionHeader
            eyebrow={platforms.eyebrow}
            title={
              <>
                Explore{" "}
                <span className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 dark:from-indigo-400 dark:via-indigo-300 dark:to-violet-400 bg-clip-text text-transparent">
                  Karka Platforms
                </span>
              </>
            }
            subtitle={platforms.subtitle}
          />
        </Reveal>

        {/* Balanced Two-Column Grid on Desktop, Clean Stacking on Mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
          {/* =========================================================================
              CARD 1: KARKA INFINI AI (Inter-College Student Competition)
             ========================================================================= */}
          <Reveal className="h-full">
            <div className="group relative flex flex-col justify-between h-full rounded-2xl bg-white dark:bg-[#0B1120] text-slate-900 dark:text-white border border-slate-200/90 dark:border-white/10 shadow-sm hover:shadow-xl hover:border-indigo-500/40 dark:hover:border-indigo-500/40 transition-all duration-300 p-6 sm:p-8 lg:p-9 overflow-hidden">
              {/* Refined top hairline accent */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600" />

              <div>
                {/* Header: Category Badge + Total Prize Pool */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-white/[0.08]">
                  <div className="space-y-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800/60 font-heading">
                      <Trophy className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                      <span>{platforms.infini.category}</span>
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight">
                      {platforms.infini.name}
                    </h3>
                  </div>

                  {/* Prize Pool Spotlight Card */}
                  <div className="bg-gradient-to-br from-indigo-50 to-violet-50/50 dark:from-indigo-950/50 dark:to-violet-950/30 border border-indigo-100 dark:border-indigo-800/50 px-4 py-2.5 rounded-xl text-right shrink-0">
                    <p className="text-[11px] uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400 font-heading">
                      {platforms.infini.prizeLabel}
                    </p>
                    <p className="text-2xl sm:text-3xl font-black text-indigo-600 dark:text-indigo-400 font-heading tracking-tight leading-none mt-0.5">
                      {platforms.infini.prizePool}
                    </p>
                  </div>
                </div>

                {/* Tagline */}
                <p className="mt-5 text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100 font-heading leading-snug">
                  {platforms.infini.tagline}
                </p>

                {/* 6 Contest Categories with Dedicated Icons */}
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-heading">
                      6 Tournament Tracks
                    </span>
                    <span className="text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold font-body">
                      Teams of 1–4
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
                    {platforms.infini.contests.map((c, i) => {
                      const IconComponent = contestIcons[i] || Trophy;
                      const isHovered = selectedContest === i;

                      return (
                        <div
                          key={i}
                          onMouseEnter={() => setSelectedContest(i)}
                          onMouseLeave={() => setSelectedContest(null)}
                          className={`p-3 rounded-xl border transition-all duration-200 cursor-default ${
                            isHovered
                              ? "bg-indigo-50/80 dark:bg-indigo-950/50 border-indigo-300 dark:border-indigo-700 shadow-sm"
                              : "bg-slate-50/70 dark:bg-white/[0.03] border-slate-200/70 dark:border-white/[0.07] hover:border-indigo-200 dark:hover:border-indigo-800/50"
                          }`}
                        >
                          <div
                            className={`w-7 h-7 rounded-lg flex items-center justify-center mb-2 transition-colors ${
                              isHovered
                                ? "bg-indigo-600 text-white"
                                : "bg-indigo-100/70 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400"
                            }`}
                          >
                            <IconComponent className="w-4 h-4" />
                          </div>
                          <p className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white font-heading truncate">
                            {c.title}
                          </p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-body truncate mt-0.5">
                            {c.desc}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Competition Stages / Rounds Breakdown */}
                <div className="mt-6 pt-5 border-t border-slate-100 dark:border-white/[0.08]">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-heading mb-3">
                    Tournament Progression
                  </p>
                  <div className="space-y-2.5">
                    {platforms.infini.rounds.map((r, i) => {
                      const StageIcons = [School, MapPin, Award];
                      const StageIcon = StageIcons[i] || Award;

                      return (
                        <div
                          key={i}
                          className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50/50 dark:bg-white/[0.02] border border-slate-200/50 dark:border-white/[0.05]"
                        >
                          <div className="w-7 h-7 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200/70 dark:border-indigo-800/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
                            <StageIcon className="w-3.5 h-3.5" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-slate-900 dark:text-white font-heading">
                              {r.title}
                            </p>
                            <p className="text-xs text-slate-600 dark:text-slate-400 font-body leading-snug">
                              {r.desc}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Card Footer: Interactive CTA + Verification Badge */}
              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-white/[0.08] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <a
                  href={platforms.infini.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-heading font-bold text-sm text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-600/20 hover:shadow-indigo-600/30 active:scale-[0.99] transition-all cursor-pointer group/btn"
                >
                  <span>{platforms.infini.buttonText}</span>
                  <ArrowUpRight className="w-4 h-4 stroke-[2.5] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </a>

                <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-body">
                  <ShieldCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                  <span>{platforms.infini.badge}</span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* =========================================================================
              CARD 2: SPIKE AI (AI-Powered Learning Platform)
             ========================================================================= */}
          <Reveal className="h-full" delay={0.12}>
            <div className="group relative flex flex-col justify-between h-full rounded-2xl bg-white dark:bg-[#0B1120] text-slate-900 dark:text-white border border-slate-200/90 dark:border-white/10 shadow-sm hover:shadow-xl hover:border-violet-500/40 dark:hover:border-violet-500/40 transition-all duration-300 p-6 sm:p-8 lg:p-9 overflow-hidden">
              {/* Refined top hairline accent */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-violet-600 via-indigo-500 to-indigo-600" />

              <div>
                {/* Header: Platform Badge + Product Identity */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-white/[0.08]">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-violet-600/25">
                      <Zap className="w-6 h-6 stroke-[2.3]" />
                    </div>
                    <div>
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-violet-50 dark:bg-violet-950/60 text-violet-700 dark:text-violet-300 border border-violet-200/80 dark:border-violet-800/60 font-heading mb-1">
                        <Sparkles className="w-3 h-3 text-violet-600 dark:text-violet-400" />
                        <span>{platforms.spike.category}</span>
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight">
                        {platforms.spike.name}
                      </h3>
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-white/[0.06] text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-white/10 font-heading">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500" />
                    </span>
                    <span>24/7 AI Companion</span>
                  </div>
                </div>

                {/* Headline */}
                <p className="mt-5 text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100 font-heading leading-snug">
                  {platforms.spike.headline}
                </p>

                {/* Interactive Spike Prompt Console Preview */}
                <div className="mt-5 p-4 rounded-xl bg-slate-50 dark:bg-[#070B14]/90 border border-slate-200/80 dark:border-white/[0.08] shadow-inner">
                  {/* Console Header */}
                  <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-slate-200/70 dark:border-white/[0.06] text-[11px]">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-400/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-indigo-400/80" />
                      <span className="ml-2 font-mono text-slate-400 dark:text-slate-500 font-medium">
                        spike.workspace/sandbox
                      </span>
                    </div>
                    <span className="font-mono text-violet-600 dark:text-violet-400 font-semibold text-[10px]">
                      Karka GenAI Tutor
                    </span>
                  </div>

                  {/* Input Simulation with Active Focus */}
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      value={promptInput}
                      onChange={(e) => setPromptInput(e.target.value)}
                      placeholder={platforms.spike.inputPlaceholder}
                      className="w-full bg-white dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 rounded-lg pl-3 pr-9 py-2 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 font-mono focus:outline-none focus:border-violet-500 dark:focus:border-violet-400 transition-colors"
                    />
                    <div className="absolute right-2.5 text-slate-400 pointer-events-none">
                      <CornerDownLeft className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Quick-Prompt Interactive Pills */}
                  <div className="mt-2.5 flex flex-wrap gap-1.5 items-center">
                    <span className="text-[10px] uppercase font-bold text-slate-400 font-mono mr-1">
                      Try:
                    </span>
                    {samplePrompts.map((p, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setPromptInput(p)}
                        className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white dark:bg-white/[0.05] border border-slate-200/80 dark:border-white/[0.08] text-slate-600 dark:text-slate-300 hover:border-violet-400 hover:text-violet-700 dark:hover:text-violet-300 transition-colors cursor-pointer"
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4 Feature Pillars with Crisp Dedicated Icons */}
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-heading">
                      Core Learning Architecture
                    </span>
                    <span className="text-[11px] text-violet-600 dark:text-violet-400 font-semibold font-body">
                      Zero Hallucination
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                    {platforms.spike.features.map((f, i) => {
                      const IconComponent = spikeFeatureIcons[i] || Bot;

                      return (
                        <div
                          key={i}
                          className="p-3 rounded-xl bg-slate-50/70 dark:bg-white/[0.03] border border-slate-200/70 dark:border-white/[0.07] hover:border-violet-300 dark:hover:border-violet-800/50 hover:bg-violet-50/40 dark:hover:bg-violet-950/30 transition-all duration-200"
                        >
                          <div className="w-7 h-7 rounded-lg bg-violet-100/70 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400 flex items-center justify-center mb-2">
                            <IconComponent className="w-4 h-4" />
                          </div>
                          <p className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white font-heading truncate">
                            {f.title}
                          </p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-body truncate mt-0.5">
                            {f.desc}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Live Mentor Connection Strip */}
                <div className="mt-6 pt-5 border-t border-slate-100 dark:border-white/[0.08]">
                  <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50/50 dark:bg-white/[0.02] border border-slate-200/50 dark:border-white/[0.05]">
                    <div className="w-7 h-7 rounded-lg bg-violet-50 dark:bg-violet-950/50 border border-violet-200/70 dark:border-violet-800/60 text-violet-600 dark:text-violet-400 flex items-center justify-center shrink-0">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-900 dark:text-white font-heading">
                        Synchronized with Nagercoil Campus Mentors
                      </p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 font-body">
                        Code reviews, doubt clearances, and real project milestones logged daily.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer: Interactive CTA */}
              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-white/[0.08] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <a
                  href={platforms.spike.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-heading font-bold text-sm text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 shadow-md shadow-violet-600/20 hover:shadow-violet-600/30 active:scale-[0.99] transition-all cursor-pointer group/btn"
                >
                  <span>{platforms.spike.buttonText}</span>
                  <ArrowUpRight className="w-4 h-4 stroke-[2.5] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </a>

                <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-body">
                  <Check className="w-4 h-4 text-violet-600 dark:text-violet-400 shrink-0" />
                  <span>Integrated with Karka Curriculum</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
