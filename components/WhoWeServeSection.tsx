"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  GraduationCap,
  School,
  BookOpen,
  Briefcase,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { AUDIENCE_DATA } from "@/content/site";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal, RevealItem } from "@/components/motion/Reveal";

export const WhoWeServeSection: React.FC = () => {
  const audienceCards = [
    {
      key: "graduates",
      data: AUDIENCE_DATA.graduates,
      href: "/for-graduates",
      icon: GraduationCap,
      label: "Graduates",
      summary:
        "Fast-track your transition into a high-paying software developer job with ₹0 upfront fees and dedicated placement drives.",
      accent: "from-indigo-600 to-violet-600",
    },
    {
      key: "college",
      data: AUDIENCE_DATA.college,
      href: "/for-college-students",
      icon: BookOpen,
      label: "College Students",
      summary:
        "Build a production portfolio, master modern AI-infused stacks, and complete verified internships before your final year.",
      accent: "from-violet-600 to-indigo-600",
    },
    {
      key: "professionals",
      data: AUDIENCE_DATA.professionals,
      href: "/for-professionals",
      icon: Briefcase,
      label: "Professionals",
      summary:
        "Switch from non-tech or legacy roles into modern fullstack, GenAI, and cloud engineering with flexible weekend and evening cohorts.",
      accent: "from-blue-600 to-indigo-600",
    },
    {
      key: "school",
      data: AUDIENCE_DATA.school,
      href: "/for-school-students",
      icon: School,
      label: "School Students",
      summary:
        "Spark creativity and computational logic early through Python game creation, animation, and foundational programming concepts.",
      accent: "from-indigo-500 to-cyan-600",
    },
  ];

  return (
    <section
      id="who-we-serve"
      className="py-18 sm:py-22 lg:py-26 bg-slate-50/70 dark:bg-[#070B14] border-b border-slate-200/80 dark:border-white/[0.08] transition-colors relative overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <Reveal>
          <SectionHeader
            eyebrow="Targeted Pathways"
            title={
              <>
                Programs Built for{" "}
                <span className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 dark:from-indigo-400 dark:via-indigo-300 dark:to-violet-400 bg-clip-text text-transparent">
                  Every Career Stage
                </span>
              </>
            }
            subtitle="Whether you are starting from zero or switching fields, our curriculum is precision-calibrated for your background."
          />
        </Reveal>

        <Reveal staggerChildren={0.08}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {audienceCards.map((card) => {
              const Icon = card.icon;
              return (
                <RevealItem key={card.key} className="h-full">
                  <div className="group relative flex flex-col justify-between h-full rounded-2xl bg-white dark:bg-[#0B1120] border border-slate-200/90 dark:border-white/10 overflow-hidden shadow-sm hover:shadow-xl hover:border-indigo-500/40 dark:hover:border-indigo-500/40 hover:-translate-y-1 transition-all duration-300">
                    {/* Top image banner with natural vignette */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 dark:bg-slate-900">
                      <Image
                        src={card.data.image}
                        alt={card.data.title}
                        fill
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 320px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                      {/* Floating Badge */}
                      <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0B1120]/85 backdrop-blur-md border border-white/15 text-indigo-300 text-[11px] font-heading font-bold shadow-md">
                        <Icon className="w-3.5 h-3.5" />
                        <span>{card.data.eyebrow}</span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-3">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          {card.data.title}
                        </h3>

                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-body">
                          {card.summary}
                        </p>

                        {/* Verified Feature Chips */}
                        <div className="space-y-1.5 pt-1">
                          {card.data.badges.map((badge, bi) => (
                            <div
                              key={bi}
                              className="flex items-center gap-2 text-[11px] text-slate-700 dark:text-slate-300 font-medium font-body"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                              <span className="truncate">{badge}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Direct Navigation Action */}
                      <div className="pt-4 border-t border-slate-100 dark:border-white/[0.08]">
                        <Link
                          href={card.href}
                          className="w-full inline-flex items-center justify-between px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-slate-800 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-300 border border-slate-200/70 dark:border-white/[0.08] hover:border-indigo-300 dark:hover:border-indigo-700 text-xs font-heading font-bold transition-all group/link"
                        >
                          <span>Explore Pathway</span>
                          <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </RevealItem>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
};
