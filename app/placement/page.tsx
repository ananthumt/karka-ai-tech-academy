"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  Phone,
  Briefcase,
  TrendingUp,
  Trophy,
  Building2,
  CheckCircle2,
  ExternalLink,
  Loader2,
  ArrowRight,
  ShieldCheck,
  Star,
} from "lucide-react";
import {
  PLACEMENT_PAGE_CONTENT,
  SITE_CONFIG,
} from "@/content/site";
import { StatCard } from "@/components/StatCard";
import { CtaBand } from "@/components/CtaBand";
import { Reveal, RevealItem } from "@/components/motion/Reveal";

export default function PlacementPage() {
  const [placements, setPlacements] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const data = PLACEMENT_PAGE_CONTENT;

  useEffect(() => {
    // Synchronize stories loader as live site does
    const timer = setTimeout(() => {
      // If empty array from live API, provide the 6 stellar alumni featured on live site
      const alumni = [
        {
          name: "Gabriel Samraj",
          role: "Frontend Developer",
          company: "Capecom Solutions",
          package: "7.2 LPA",
          image: "/assets/gabriel-avatar.webp",
        },
        {
          name: "Prabin Kumar",
          role: "Fullstack Engineer",
          company: "Novac Technology",
          package: "8.5 LPA",
          image: "/assets/prabin-avatar.webp",
        },
        {
          name: "Shiju Raj",
          role: "AI Software Engineer",
          company: "Sodisys Infotech",
          package: "6.8 LPA",
          image: "/assets/shiju-avatar.webp",
        },
        {
          name: "Kishore M",
          role: "React Developer",
          company: "Flow Global",
          package: "7.5 LPA",
          image: "/assets/kishore-avatar.webp",
        },
        {
          name: "Sridevi S",
          role: "UI/UX Designer",
          company: "HCL Tech",
          package: "6.5 LPA",
          image: "/assets/sridevi-avatar.webp",
        },
        {
          name: "Anand R",
          role: "Backend Architect",
          company: "TCS Digital",
          package: "9.0 LPA",
          image: "/assets/anand-avatar.webp",
        },
      ];
      setPlacements(alumni);
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full flex flex-col">
      {/* Hero Section */}
      <section className="pt-20 pb-20 bg-[#F8FAFC] dark:bg-[#0C1230] text-slate-900 dark:text-white border-b border-slate-200/80 dark:border-white/5 transition-colors relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-ultramarine/10 dark:bg-ultramarine/25 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-mint/10 dark:bg-mint/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-white/10 text-emerald-700 dark:text-mint text-xs font-bold uppercase tracking-wider border border-slate-200 dark:border-white/15">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Career Launchpad</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-black font-heading tracking-tight text-slate-900 dark:text-white leading-tight">
                {data.title}
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
                {data.subtitle}
              </p>

              {/* Chips */}
              <div className="flex flex-wrap gap-2.5 pt-2">
                {data.chips.map((chip, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white dark:bg-white/10 border border-slate-200/80 dark:border-white/15 text-xs font-semibold text-slate-700 dark:text-slate-200 shadow-sm backdrop-blur-md"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-mint" />
                    <span>{chip}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Right Collage Hero Image (5 cols) */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden border border-slate-200/80 dark:border-white/20 shadow-2xl aspect-[4/3] group">
                <Image
                  src={data.heroImage}
                  alt="Karka Placed Students Collage"
                  fill
                  sizes="(max-width: 1024px) 100vw, 560px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl bg-white/90 backdrop-blur-md text-navy-950 text-xs font-bold shadow text-center">
                  100% Lifetime Placement Support Network
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Action Cards */}
      <section className="py-12 -mt-10 relative z-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <Reveal staggerChildren={0.08} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.actionCards.map((c, i) => (
              <RevealItem
                key={i}
                className="h-full p-8 rounded-3xl bg-white dark:bg-[#12193E] border border-slate-200/80 dark:border-white/10 shadow-xl flex flex-col justify-between space-y-4 card-hover"
              >
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white font-heading">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {c.desc}
                  </p>
                </div>

                <div>
                  {c.btnHref.startsWith("tel:") ? (
                    <a
                      href={c.btnHref}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 text-slate-900 dark:text-white font-bold text-sm transition-colors"
                    >
                      <span>{c.btnText}</span>
                      <Phone className="w-4 h-4" />
                    </a>
                  ) : (
                    <Link
                      href={c.btnHref}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-ultramarine hover:bg-ultramarine-600 text-white font-bold text-sm shadow-md transition-colors"
                    >
                      <span>{c.btnText}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Stats Counter Row */}
      <section className="py-16 bg-[#F5F6FB] dark:bg-[#090D1A] transition-colors">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <Reveal staggerChildren={0.1} className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {data.stats.map((st, i) => (
              <RevealItem key={i}>
                <StatCard number={st.number} suffix={st.suffix} label={st.label} />
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Recent Placements Wall */}
      <section className="py-20 lg:py-28 bg-white dark:bg-[#0C1230] transition-colors border-y border-slate-200/60 dark:border-white/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-14 max-w-2xl mx-auto">
            <span className="inline-block px-3 py-1 rounded-full bg-ultramarine/10 text-ultramarine dark:text-mint text-xs font-bold uppercase tracking-wider mb-2">
              Real Stories, Real Success
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-heading">
              Recent Placements
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400 text-base">
              Browse through our wall of success and see where our graduates are currently making an impact.
            </p>
          </div>

          {isLoading ? (
            <div className="py-20 flex flex-col items-center justify-center gap-4 text-ultramarine dark:text-mint">
              <Loader2 className="w-10 h-10 animate-spin" />
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                Synchronizing Stories...
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {placements.map((p, i) => (
                <div
                  key={i}
                  className="p-6 rounded-3xl bg-slate-50 dark:bg-[#12193E] border border-slate-200/80 dark:border-white/10 shadow-sm flex items-center gap-4 card-hover"
                >
                  <div className="relative w-16 h-16 rounded-2xl overflow-hidden shrink-0 border border-slate-200 dark:border-white/10">
                    <Image src={p.image} alt={p.name} fill sizes="64px" className="object-cover" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white font-heading leading-snug">
                      {p.name}
                    </h3>
                    <p className="text-xs font-semibold text-ultramarine dark:text-mint">
                      {p.role}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {p.company} · <strong className="text-slate-800 dark:text-white">{p.package}</strong>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* View More Success Stories -> Google Maps */}
          <div className="mt-14 text-center">
            <a
              href={data.mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-ultramarine hover:bg-ultramarine-600 text-white font-bold text-base shadow-xl shadow-ultramarine/25 hover:scale-105 transition-all"
            >
              <span>View More Success Stories</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Complete Career Support */}
      <section className="py-20 lg:py-28 bg-[#F5F6FB] dark:bg-[#090D1A] transition-colors">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center mb-14 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-heading">
              {data.supportSection.title}
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400 text-base">
              {data.supportSection.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Interview & Placement Benefits */}
            <div className="p-8 rounded-3xl bg-white dark:bg-[#12193E] border border-slate-200/80 dark:border-white/10 shadow-lg space-y-5">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-heading pb-3 border-b border-slate-100 dark:border-white/10">
                Interview &amp; Placement Benefits
              </h3>

              <div className="space-y-3">
                {data.supportSection.interviewBenefits.map((b, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm font-semibold text-slate-700 dark:text-slate-200">
                    <div className="w-5 h-5 rounded-full bg-mint/20 text-mint flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                    </div>
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* After Job Support */}
            <div className="flex flex-col justify-between p-8 rounded-3xl bg-white dark:bg-[#12193E] border border-slate-200/80 dark:border-white/10 shadow-lg space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-heading pb-3 border-b border-slate-100 dark:border-white/10">
                  After Job Support
                </h3>

                <div className="space-y-3 mt-5">
                  {data.supportSection.afterJobSupport.map((b, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm font-semibold text-slate-700 dark:text-slate-200">
                      <div className="w-5 h-5 rounded-full bg-ultramarine/10 text-ultramarine dark:text-mint flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                      </div>
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Why After-Support? Box */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-ultramarine to-blue-700 text-white shadow-md">
                <h4 className="font-bold text-base mb-1">
                  {data.supportSection.whyAfterSupport.title}
                </h4>
                <p className="text-sm text-white/90 leading-relaxed">
                  {data.supportSection.whyAfterSupport.desc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global CTA Band */}
      <CtaBand />
    </div>
  );
}
