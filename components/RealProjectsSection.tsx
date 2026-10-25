"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ExternalLink,
  Code2,
  CheckCircle2,
  Layers,
  ArrowRight,
  Sparkles,
  Cpu,
  Trophy,
  Globe,
  Database,
} from "lucide-react";
import { HOME_CONTENT } from "@/content/site";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal, RevealItem } from "@/components/motion/Reveal";

export const RealProjectsSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = React.useState("All");
  const allProjects = HOME_CONTENT.realProjects || [];

  const filteredProjects = React.useMemo(() => {
    if (activeFilter === "All") return allProjects;
    if (activeFilter === "AI & Tools") {
      return allProjects.filter((p) => p.category.includes("AI") || p.title.includes("Spike") || p.title.includes("Infini"));
    }
    if (activeFilter === "Fintech & Enterprise") {
      return allProjects.filter((p) => p.category.includes("Fintech") || p.title.includes("Flow"));
    }
    if (activeFilter === "ATS & Platform") {
      return allProjects.filter((p) => p.category.includes("ATS") || p.title.includes("Talent"));
    }
    return allProjects;
  }, [activeFilter, allProjects]);

  const FILTERS = ["All", "AI & Tools", "Fintech & Enterprise", "ATS & Platform"];

  return (
    <section
      id="internship-projects"
      className="py-20 lg:py-28 bg-[#F8FAFC] dark:bg-[#080C17] text-slate-900 dark:text-white transition-colors relative overflow-hidden border-y border-slate-200/80 dark:border-white/[0.06]"
    >
      {/* Subtle architectural grid texture */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#00000006_1px,transparent_1px),linear-gradient(to_bottom,#00000006_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"
        aria-hidden="true"
      />

      {/* Ambient background glow */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-lime/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <Reveal>
          <SectionHeader
            eyebrow="Agile Tribers Incubation"
            title={
              <>
                Real Internship <span className="text-emerald-700 dark:text-lime">Projects</span>
              </>
            }
            subtitle="Stop building toy todo-apps. Every Karka learner spends 2 months shipping production software, commercial APIs, and AI portals for real client deployments."
          />
        </Reveal>

        {/* Project Filter Pills */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none font-heading">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-lime cursor-pointer ${
                activeFilter === f
                  ? "bg-lime text-[#071A10] shadow-md shadow-lime/20"
                  : "bg-white dark:bg-[#111A2E] text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200/80 dark:border-white/10"
              }`}
            >
              {f === "All" ? "All Projects (4)" : f}
            </button>
          ))}
        </div>

        <Reveal staggerChildren={0.08}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredProjects.map((proj) => (
              <RevealItem key={proj.id} className="h-full">
                <div className="h-full flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-white/10 shadow-md dark:shadow-xl hover:border-lime/40 dark:hover:border-lime/30 hover:-translate-y-1 transition-all duration-300 group">
                  <div>
                    {/* Header: Tag + Category */}
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-lime/10 text-emerald-800 dark:text-lime border border-lime/25">
                        {proj.tag}
                      </span>
                      <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 font-heading">
                        {proj.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-black font-heading text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-lime transition-colors mb-3">
                      {proj.title}
                    </h3>

                    {/* Problem Statement Box */}
                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#0B1120] border border-slate-200/80 dark:border-white/5 mb-3 text-xs leading-relaxed text-slate-700 dark:text-slate-300 font-body">
                      <span className="font-bold text-slate-900 dark:text-white block mb-0.5 font-heading">
                        Problem Statement:
                      </span>
                      {proj.problem}
                    </div>

                    {/* Solution & Impact Box */}
                    <div className="p-3.5 rounded-xl bg-lime/10 dark:bg-lime/5 border border-lime/30 dark:border-lime/20 mb-5 text-xs leading-relaxed text-slate-800 dark:text-slate-200 font-body">
                      <span className="font-bold text-emerald-800 dark:text-lime block mb-0.5 font-heading">
                        Intern Solution &amp; Impact:
                      </span>
                      {proj.solution}
                    </div>

                    {/* Tech Stack Pills */}
                    <div className="mb-6 font-body">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 font-heading">
                        Technologies Used:
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {proj.techStack.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-white/10"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Footer Action */}
                  <div className="pt-4 border-t border-slate-200/80 dark:border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 dark:text-lime" />
                      <span className="truncate max-w-[220px] sm:max-w-xs">{proj.outcome}</span>
                    </div>

                    {proj.demoUrl && (
                      <a
                        href={proj.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-lime hover:underline shrink-0 font-heading focus:outline-none focus-visible:ring-2 focus-visible:ring-lime rounded-md px-1.5 py-0.5"
                      >
                        <span>View Project</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </RevealItem>
            ))}
          </div>
        </Reveal>

        {/* Live Agile Tribers Incubation Callout Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-white/10 shadow-lg dark:shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-lime/15 text-emerald-800 dark:text-lime flex items-center justify-center shrink-0 border border-lime/25 shadow-md">
              <Layers className="w-6 h-6 text-emerald-800 dark:text-lime" />
            </div>
            <div>
              <h4 className="text-lg font-bold font-heading text-slate-900 dark:text-white">
                Graduate With a Live Production Portfolio, Not Just a Certificate
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-2xl font-body">
                Every line of code you write during your 2-month Agile Tribers internship goes into a public Git portfolio with live deployed demo URLs that recruiters can test immediately.
              </p>
            </div>
          </div>

          <Link
            href="/placement"
            className="btn-lime px-6 py-3 rounded-xl text-sm font-heading font-extrabold shrink-0 flex items-center gap-2 cursor-pointer"
          >
            <span>Explore Placement Stories</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
