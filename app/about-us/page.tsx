"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  Target,
  Compass,
  Linkedin,
  ExternalLink,
  Laptop,
  Users2,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import {
  ABOUT_PAGE_CONTENT,
  HOME_CONTENT,
} from "@/content/site";
import { PillarCard } from "@/components/PillarCard";
import { ComparisonTable } from "@/components/ComparisonTable";
import { CtaBand } from "@/components/CtaBand";

export default function AboutPage() {
  const data = ABOUT_PAGE_CONTENT;
  const pillars = HOME_CONTENT.pillars;

  return (
    <div className="w-full flex flex-col">
      {/* 1. HERO SECTION */}
      <section className="pt-20 pb-20 bg-[#F8FAFC] dark:bg-[#0C1230] text-slate-900 dark:text-white border-b border-slate-200/80 dark:border-white/5 transition-colors relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-ultramarine/10 dark:bg-ultramarine/25 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-mint/10 dark:bg-mint/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-white/10 text-emerald-700 dark:text-mint text-xs font-bold uppercase tracking-wider border border-slate-200 dark:border-white/15">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{data.eyebrow}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black font-heading tracking-tight text-slate-900 dark:text-white">
            {data.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl mx-auto">
            {data.intro}
          </p>
        </div>
      </section>

      {/* 2. OUR STORY, MISSION & VISION */}
      <section className="py-20 lg:py-28 bg-[#F5F6FB] dark:bg-[#090D1A] transition-colors">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Story (7 cols) */}
            <div className="lg:col-span-7 space-y-5">
              <span className="inline-block px-3 py-1 rounded-full bg-ultramarine/10 text-ultramarine dark:text-mint text-xs font-bold uppercase tracking-wider">
                Origin &amp; Purpose
              </span>

              <h2 className="text-3xl sm:text-4xl font-black font-heading text-slate-900 dark:text-white">
                Our Story
              </h2>

              {data.story.map((p, i) => (
                <p key={i} className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                  {p}
                </p>
              ))}
            </div>

            {/* Mission & Vision Cards (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Mission */}
              <div className="p-8 rounded-3xl bg-white dark:bg-[#12193E] border border-slate-200/80 dark:border-white/10 shadow-lg space-y-3 card-hover">
                <div className="w-12 h-12 rounded-2xl bg-ultramarine/10 text-ultramarine dark:bg-mint/10 dark:text-mint flex items-center justify-center">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold font-heading text-slate-900 dark:text-white">
                  Our Mission
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {data.mission}
                </p>
              </div>

              {/* Vision */}
              <div className="p-8 rounded-3xl bg-white dark:bg-[#12193E] border border-slate-200/80 dark:border-white/10 shadow-lg space-y-3 card-hover">
                <div className="w-12 h-12 rounded-2xl bg-mint/20 text-mint flex items-center justify-center">
                  <Compass className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold font-heading text-slate-900 dark:text-white">
                  Our Vision
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {data.vision}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 4 PILLARS OF A JOB-READY TECH CAREER */}
      <section className="py-20 lg:py-28 bg-white dark:bg-[#0C1230] transition-colors border-y border-slate-200/60 dark:border-white/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-14 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-heading">
              {pillars.title}
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400 text-base">
              {pillars.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {pillars.items.map((item) => (
              <PillarCard
                key={item.number}
                number={item.number}
                title={item.title}
                tag={item.tag}
                skills={item.skills}
                desc={item.desc}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. THE KARKA ADVANTAGE COMPARISON TABLE */}
      <section className="py-20 lg:py-28 bg-[#F5F6FB] dark:bg-[#090D1A] transition-colors">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <ComparisonTable
            title={data.advantage.title}
            subtitle={data.advantage.subtitle}
            colKarkaTitle="Karka AI"
            colOthersTitle="Others"
            rows={data.advantage.features}
          />
        </div>
      </section>

      {/* 5. MEET THE MENTOR (id="mentor") */}
      <section id="mentor" className="py-20 lg:py-28 bg-white dark:bg-[#0C1230] transition-colors scroll-mt-20 border-y border-slate-200/60 dark:border-white/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Mentor Photo (5 cols) */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm rounded-[2.5rem] overflow-hidden border border-slate-200/80 dark:border-white/10 shadow-2xl aspect-[4/5] group">
                <Image
                  src={data.mentor.photo}
                  alt={data.mentor.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 480px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white text-left">
                  <p className="text-xl font-bold font-heading">{data.mentor.name}</p>
                  <p className="text-xs text-mint font-semibold mt-0.5">{data.mentor.role}</p>
                </div>
              </div>
            </div>

            {/* Mentor Details (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-ultramarine/10 text-ultramarine dark:text-mint text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{data.mentor.eyebrow}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-slate-900 dark:text-white">
                {data.mentor.headline}
              </h2>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                {data.mentor.bio}
              </p>

              {/* Achievements Bullets */}
              <div className="space-y-3 pt-2">
                {data.mentor.bullets.map((b, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm font-semibold text-slate-800 dark:text-slate-200">
                    <div className="w-5 h-5 rounded-full bg-mint/20 text-mint flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                    </div>
                    <span>{b}</span>
                  </div>
                ))}
              </div>

              {/* Connect on LinkedIn */}
              <div className="pt-4">
                <a
                  href={data.mentor.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#0077B5] hover:bg-[#005E93] text-white font-bold text-sm shadow-md transition-all hover:scale-105"
                >
                  <Linkedin className="w-4 h-4 fill-current" />
                  <span>Connect on LinkedIn</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. OUR INFRASTRUCTURE */}
      <section className="py-20 lg:py-28 bg-[#F5F6FB] dark:bg-[#090D1A] transition-colors">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center mb-14 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-heading">
              {data.infrastructure.title}
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400 text-base">
              {data.infrastructure.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-3xl bg-white dark:bg-[#12193E] border border-slate-200/80 dark:border-white/10 shadow-lg space-y-4 card-hover">
              <div className="w-12 h-12 rounded-2xl bg-ultramarine/10 text-ultramarine dark:bg-mint/10 dark:text-mint flex items-center justify-center">
                <Laptop className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold font-heading text-slate-900 dark:text-white">
                {data.infrastructure.blocks[0].title}
              </h3>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                {data.infrastructure.blocks[0].desc}
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white dark:bg-[#12193E] border border-slate-200/80 dark:border-white/10 shadow-lg space-y-4 card-hover">
              <div className="w-12 h-12 rounded-2xl bg-mint/20 text-mint flex items-center justify-center">
                <Users2 className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold font-heading text-slate-900 dark:text-white">
                {data.infrastructure.blocks[1].title}
              </h3>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                {data.infrastructure.blocks[1].desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Global CTA Band */}
      <CtaBand />
    </div>
  );
}
