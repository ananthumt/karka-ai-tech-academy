import React from "react";
import type { Metadata } from "next";
import { Sparkles, Timer, Layers, Wallet } from "lucide-react";
import { CourseFinderQuiz } from "@/components/CourseFinderQuiz";
import { CtaBand } from "@/components/CtaBand";
import { Reveal } from "@/components/motion/Reveal";

const PAGE_DESCRIPTION =
  "Take the free 60-second assessment and get matched to one of 26 career programs at Karka AI & Tech Academy, Nagercoil. Every match comes with ₹0 upfront tuition under Pay After Placement.";

export const metadata: Metadata = {
  title: "Find Your Course | Karka AI & Tech Academy",
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: "https://www.karka.academy/course-finder",
  },
  openGraph: {
    title: "Find Your Course | Karka AI & Tech Academy",
    description: PAGE_DESCRIPTION,
    url: "https://www.karka.academy/course-finder",
    siteName: "Karka AI Academy",
    type: "website",
  },
};

const TRUST_STATS = [
  {
    icon: Timer,
    value: "60 sec",
    label: "Free assessment",
    detail: "Four questions, no sign-up, no email gate.",
  },
  {
    icon: Layers,
    value: "26",
    label: "Career programs",
    detail: "Fullstack, GenAI, data, design, media, marketing and business.",
  },
  {
    icon: Wallet,
    value: "₹0",
    label: "Upfront tuition",
    detail: "Pay After Placement on every eligible program.",
  },
];

export default function CourseFinderPage() {
  return (
    <main>
      {/* Hero — server rendered for SEO */}
      <section className="relative w-full overflow-hidden border-b border-slate-200/80 bg-white py-16 dark:border-white/10 dark:bg-[#0B1120] sm:py-20 lg:py-24">
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#00000006_1px,transparent_1px),linear-gradient(to_bottom,#00000006_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] dark:bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -top-24 left-1/2 h-[320px] w-[620px] -translate-x-1/2 rounded-full bg-indigo-600/10 blur-[140px] dark:bg-indigo-600/20"
          aria-hidden="true"
        />

        <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-indigo-200/80 bg-indigo-50 px-3.5 py-1 text-xs font-heading font-semibold uppercase tracking-wider text-indigo-700 dark:border-indigo-800/60 dark:bg-indigo-950/60 dark:text-indigo-300">
              <Sparkles
                className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400"
                aria-hidden="true"
              />
              <span>Course Finder</span>
            </div>

            <h1 className="heading-hero text-slate-900 dark:text-white">
              Find the course that actually fits you
            </h1>

            <p className="mt-5 text-lead font-body text-slate-600 dark:text-slate-400">
              Answer four quick questions about your background, your interest
              and how you want to learn. We rank all 26 Karka programs against
              your answers and show your three strongest matches, with the
              syllabus, duration and ₹0 upfront fee terms for each. Free, and it
              takes about a minute.
            </p>
          </div>

          <Reveal className="mt-10 lg:mt-12" delay={0.1}>
            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {TRUST_STATS.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-white/10 dark:bg-[#111A2E]"
                  >
                    <span
                      className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-indigo-200/60 bg-indigo-50 text-indigo-600 dark:border-indigo-800/50 dark:bg-indigo-950/60 dark:text-indigo-400"
                      aria-hidden="true"
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <dt className="text-xs font-heading font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      {stat.label}
                    </dt>
                    <dd className="mt-1 font-mono text-2xl font-black text-slate-900 dark:text-white">
                      {stat.value}
                    </dd>
                    <p className="mt-2 text-xs leading-relaxed text-slate-600 font-body dark:text-slate-400">
                      {stat.detail}
                    </p>
                  </div>
                );
              })}
            </dl>
          </Reveal>
        </div>
      </section>

      <CourseFinderQuiz />

      <CtaBand />
    </main>
  );
}
