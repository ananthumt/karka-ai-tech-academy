"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Briefcase,
  TrendingUp,
  Search,
  CheckCircle2,
  Filter,
  Layers,
  GraduationCap,
  ExternalLink,
} from "lucide-react";
import { HOME_CONTENT } from "@/content/site";
import { useEnrollModal } from "@/components/EnrollContext";

const COURSE_SLUG_MAP: Record<string, string> = {
  "MERN Fullstack": "mern-fullstack",
  "React + Java Fullstack": "react-java-fullstack",
  "React + Python Fullstack": "react-python-fullstack",
  "Generative AI Foundations": "genai-foundations",
  "Generative AI Mastery": "genai-mastery",
  "Gen AI (LLM) Developer": "genai-llm-developer",
  "AI & Data Science": "ai-data-science",
  "Data Analytics with AI": "data-analytics-ai",
  "Data Engineering": "data-engineering",
  "UI/UX Design": "ui-ux-design",
  "Web Designing": "web-designing",
  "Graphic Designing": "graphic-designing",
  "Cloud & DevOps": "cloud-devops",
  "Video Editing": "video-editing",
  "Multimedia & Animation": "multimedia-animation",
  "Digital Marketing": "digital-marketing",
  "SEO Analyst": "seo-analyst",
  "Storytelling & Content Writing": "storytelling-content-writing",
  "HR & Finance": "hr-finance",
  "Tally": "tally",
  "Business Analyst": "business-analyst",
  "Python for Kids": "python-for-kids",
  "Fullstack Internship": "fullstack-internship",
  "Automation Testing": "automation-testing",
  "Mobile App Development": "mobile-app-development",
};

const CATEGORIES = [
  "All Tracks",
  "Fullstack & Coding",
  "AI & Data Science",
  "Design & Media",
  "Cloud & DevOps",
  "Business & Marketing",
];

export const CareerTrackExplorer: React.FC = () => {
  const { openEnroll } = useEnrollModal();
  const [activeCategory, setActiveCategory] = useState("All Tracks");
  const [searchQuery, setSearchQuery] = useState("");

  const allTracks = HOME_CONTENT.careerTracks.tracks;

  const filteredTracks = useMemo(() => {
    return allTracks.filter((track) => {
      // Category match
      let matchesCat = true;
      if (activeCategory === "Fullstack & Coding") {
        matchesCat = track.category.includes("Fullstack");
      } else if (activeCategory === "AI & Data Science") {
        matchesCat = track.category.includes("Gen AI") || track.category.includes("Data");
      } else if (activeCategory === "Design & Media") {
        matchesCat = track.category.includes("Design") || track.category.includes("Digital Media");
      } else if (activeCategory === "Cloud & DevOps") {
        matchesCat = track.category.includes("Cloud");
      } else if (activeCategory === "Business & Marketing") {
        matchesCat = track.category.includes("Content") || track.category.includes("Non Tech");
      }

      // Search match (search in category, sub, skills, or roles)
      let matchesSearch = true;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const inCat = track.category.toLowerCase().includes(q);
        const inSub = track.sub.toLowerCase().includes(q);
        const inRoles = (track.roles || "").toLowerCase().includes(q);
        const inSkills = (track.skills || []).some((s: string) => s.toLowerCase().includes(q));
        const inCourses = (track.courses || []).some((c: string) => c.toLowerCase().includes(q));
        matchesSearch = inCat || inSub || inRoles || inSkills || inCourses;
      }

      return matchesCat && matchesSearch;
    });
  }, [allTracks, activeCategory, searchQuery]);

  return (
    <div className="w-full space-y-8">
      {/* Interactive Controls Bar: Category Pills + Instant Skill Search */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-[#111A2E] border border-slate-200/80 dark:border-white/10 shadow-xs font-heading">
        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 cursor-pointer ${
                activeCategory === cat
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                  : "bg-white dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200/60 dark:border-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px] sm:min-w-[280px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search skills (e.g. React, Python, AWS)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs bg-white dark:bg-[#0B1120] border border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-body"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-white"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Showing count indicator */}
      <div className="flex items-center justify-between text-xs text-slate-500 font-semibold px-1 font-body">
        <span>
          Showing {filteredTracks.length} of {allTracks.length} Specialized Pathways
        </span>
        {searchQuery && (
          <span>
            Filtered by &ldquo;{searchQuery}&rdquo; ·{" "}
            <button
              onClick={() => setSearchQuery("")}
              className="text-indigo-600 dark:text-indigo-400 underline ml-1 font-bold cursor-pointer"
            >
              Clear
            </button>
          </span>
        )}
      </div>

      {/* Tracks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredTracks.map((tr: any, idx: number) => (
          <div
            key={idx}
            className="flex flex-col justify-between p-6 rounded-2xl bg-white dark:bg-[#0B1120] border border-slate-200/90 dark:border-white/10 hover:border-indigo-500/40 dark:hover:border-indigo-500/40 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-1 group"
          >
            <div>
              {/* Header: Title + Badge */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <h3 className="font-bold text-lg text-slate-900 dark:text-white font-heading group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {tr.category}
                </h3>
                {tr.badge && (
                  <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800/60 text-[10px] font-heading font-extrabold uppercase tracking-wider shrink-0 shadow-xs">
                    {tr.badge}
                  </span>
                )}
              </div>

              {/* Subtitle */}
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 font-medium line-clamp-2 leading-relaxed font-body">
                {tr.sub}
              </p>

              {/* Salary Expectation Pill */}
              {tr.salary && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-[11px] font-black font-mono mb-4 border border-indigo-200/80 dark:border-indigo-800/60">
                  <TrendingUp className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 stroke-[2.5]" />
                  <span>Avg Package: {tr.salary}</span>
                </div>
              )}

              {/* Skills Covered Pills */}
              {tr.skills && (
                <div className="mb-4 font-body">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5 font-heading">
                    Skills Covered:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {tr.skills.slice(0, 5).map((sk: string, ski: number) => (
                      <span
                        key={ski}
                        className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 text-slate-700 dark:text-slate-300"
                      >
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Career Outcome */}
              {tr.roles && (
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#070B14] border border-slate-100 dark:border-white/5 mb-4 text-[11px] font-body">
                  <div className="flex items-center gap-1.5 text-slate-400 font-semibold mb-1 font-heading">
                    <Briefcase className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                    <span className="text-[10px] uppercase tracking-wider font-bold">Target Roles:</span>
                  </div>
                  <p className="font-bold text-slate-800 dark:text-slate-200 line-clamp-2 leading-snug">
                    {tr.roles}
                  </p>
                </div>
              )}

              {/* Courses in Track with Direct Links */}
              <div className="mb-4 font-body">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5 font-heading">
                  Included Courses:
                </p>
                <div className="space-y-1">
                  {tr.courses.map((courseName: string, ci: number) => {
                    const slug = COURSE_SLUG_MAP[courseName] || "mern-fullstack";
                    return (
                      <Link
                        key={ci}
                        href={`/courses/${slug}`}
                        className="text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center justify-between group/link py-0.5 transition-colors"
                      >
                        <span className="flex items-center gap-1.5 truncate">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                          <span className="truncate">{courseName}</span>
                        </span>
                        <ArrowRight className="w-3 h-3 text-slate-400 opacity-0 group-hover/link:opacity-100 -translate-x-1 group-hover/link:translate-x-0 transition-all shrink-0" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-slate-100 dark:border-white/10 flex items-center gap-2 font-heading">
              <button
                type="button"
                onClick={() => openEnroll(tr.category)}
                className="flex-1 py-2.5 px-3 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs hover:shadow-md transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 cursor-pointer"
              >
                Enroll Track
              </button>
              <Link
                href="/courses"
                className="py-2.5 px-3.5 rounded-xl text-xs font-bold flex items-center gap-1 bg-white hover:bg-slate-50 text-slate-700 dark:bg-white/10 dark:hover:bg-white/15 dark:text-white border border-slate-200 dark:border-white/15 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 cursor-pointer"
              >
                <span>Details</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filteredTracks.length === 0 && (
        <div className="p-12 text-center rounded-2xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-white/10 space-y-3">
          <p className="text-base font-bold text-slate-700 dark:text-slate-300 font-heading">
            No career tracks matching &ldquo;{searchQuery}&rdquo;
          </p>
          <p className="text-xs text-slate-400 font-body">
            Try searching for another skill like &ldquo;React&rdquo;, &ldquo;Python&rdquo;, or &ldquo;Design&rdquo;.
          </p>
          <button
            onClick={() => {
              setActiveCategory("All Tracks");
              setSearchQuery("");
            }}
            className="px-5 py-2 rounded-xl text-xs font-heading font-bold bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Career Path Advisory Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#0B1120] border border-white/10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 text-indigo-400 text-xs font-bold uppercase tracking-wider font-heading">
            <GraduationCap className="w-4 h-4 text-indigo-400" />
            <span>Unsure Which Pathway Fits Your Degree?</span>
          </div>
          <p className="text-lg font-bold text-white font-heading">
            Schedule a free 1-on-1 career mapping session with our principal tech architect.
          </p>
          <p className="text-xs text-slate-400 font-body">
            We evaluate your college background (B.E, B.Sc, BCA, Arts) and map you to high-demand engineering roles.
          </p>
        </div>

        <button
          type="button"
          onClick={() => openEnroll("1-on-1 Career Advisory")}
          className="px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider font-heading font-extrabold shrink-0 bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/25 transition-all cursor-pointer"
        >
          Book Free Career Counseling
        </button>
      </div>
    </div>
  );
};
