import React from "react";
import type { Metadata } from "next";
import { Scale, ShieldCheck } from "lucide-react";
import { CourseCompare } from "@/components/CourseCompare";
import { CtaBand } from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Compare Courses | Karka AI & Tech Academy",
  description:
    "Compare Karka AI & Tech Academy programs side by side — duration, level, mode, curriculum modules and mentors — with the same Pay After Placement tuition across every track.",
  alternates: {
    canonical: "https://www.karka.academy/compare",
  },
  openGraph: {
    title: "Compare Courses | Karka AI & Tech Academy",
    description:
      "Line up to three courses side by side and compare duration, level, mode and curriculum, all on the Pay After Placement model.",
    url: "https://www.karka.academy/compare",
    siteName: "Karka AI Academy",
    type: "website",
  },
};

export default function ComparePage() {
  return (
    <div className="w-full flex flex-col">
      {/* 1. HERO — server rendered for SEO */}
      <section className="pt-20 pb-16 bg-white dark:bg-[#0B1120] border-b border-slate-200/80 dark:border-white/10 transition-colors">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-3xl space-y-5">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-heading font-semibold uppercase tracking-wider dark:bg-indigo-950/60 dark:border-indigo-800/60 dark:text-indigo-300">
              <Scale className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>Course Comparison</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-heading tracking-tight text-slate-900 dark:text-white">
              Compare Courses
            </h1>

            <p className="text-base sm:text-lg leading-relaxed text-slate-600 dark:text-slate-400 font-body">
              Shortlist up to three programs and see how they stack up on duration, level,
              learning mode, curriculum modules and mentors. Every Karka track runs on the
              same Pay After Placement model, so you can choose on fit rather than price.
            </p>

            <p className="inline-flex items-center gap-2 text-sm font-heading font-semibold text-slate-900 dark:text-white">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>₹0 Upfront · ₹40,000 after placement</span>
            </p>
          </div>
        </div>
      </section>

      {/* 2. INTERACTIVE COMPARISON */}
      <CourseCompare />

      {/* 3. CTA */}
      <CtaBand />
    </div>
  );
}
