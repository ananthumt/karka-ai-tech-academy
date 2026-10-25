"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Sparkles,
  Search,
  X,
  Filter,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Globe,
  RotateCcw,
  BookOpen,
  MessageCircle,
  HelpCircle,
  Layers,
  GraduationCap,
} from "lucide-react";
import {
  COURSES,
  CATEGORIES_CONFIG,
  SITE_CONFIG,
  getCourseImage,
} from "@/content/site";
import { CourseCard } from "@/components/CourseCard";
import { CtaBand } from "@/components/CtaBand";
import { useEnrollModal } from "@/components/EnrollContext";

// Official course to category slug mapping
const COURSE_CATEGORY_MAP: Record<string, string> = {
  // Coding & Development
  "mern-fullstack": "coding",
  "react-java-fullstack": "coding",
  "react-python-fullstack": "coding",

  // Generative AI
  "genai-foundations": "gen-ai",
  "genai-mastery": "gen-ai",
  "genai-llm-developer": "gen-ai",

  // Data, ML & AI
  "ai-data-science": "data",
  "data-analytics-ai": "data",
  "data-engineering": "data",

  // Design & Creatives
  "ui-ux-design": "design",
  "web-designing": "design",
  "graphic-designing": "design",

  // Digital Media & Animation
  "video-editing": "digital-media",
  "graphic-designing-dm": "digital-media",
  "multimedia-animation": "digital-media",

  // Content & Digital Marketing
  "digital-marketing": "content-marketing",
  "seo-analyst": "content-marketing",
  "storytelling-content-writing": "content-marketing",

  // Advanced Tech & DevOps
  "cloud-devops": "other-tech",
  "automation-testing": "other-tech",
  "mobile-app-development": "other-tech",
  "fullstack-internship": "other-tech",
  "python-for-kids": "other-tech",

  // Business & Management
  "hr-finance": "business",
  "tally": "business",
  "business-analyst": "business",
};

export default function CoursesPage() {
  const { openEnroll } = useEnrollModal();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDuration, setSelectedDuration] = useState("all");
  const [selectedMode, setSelectedMode] = useState("all");

  const allCoursesList = useMemo(() => Object.values(COURSES), []);

  // Compute category counts based on real course data
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: allCoursesList.length };
    CATEGORIES_CONFIG.forEach((cat) => {
      counts[cat.slug] = 0;
    });
    allCoursesList.forEach((c) => {
      const cat = COURSE_CATEGORY_MAP[c.slug] || "coding";
      if (counts[cat] !== undefined) {
        counts[cat] += 1;
      }
    });
    return counts;
  }, [allCoursesList]);

  // Filtered courses based on actual search and dropdown criteria
  const filteredCourses = useMemo(() => {
    return allCoursesList.filter((course) => {
      // 1. Category filter
      if (selectedCategory !== "all") {
        const cat = COURSE_CATEGORY_MAP[course.slug] || "coding";
        if (cat !== selectedCategory) return false;
      }

      // 2. Duration filter
      if (selectedDuration !== "all") {
        const duration = course.details?.duration?.toLowerCase() || "";
        if (selectedDuration === "3m" && !duration.includes("3 month")) return false;
        if (selectedDuration === "6m" && !duration.includes("6 month")) return false;
      }

      // 3. Mode filter
      if (selectedMode !== "all") {
        const mode = course.details?.mode?.toLowerCase() || "";
        if (selectedMode === "offline" && !mode.includes("offline")) return false;
        if (selectedMode === "online" && !mode.includes("online")) return false;
      }

      // 4. Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const titleMatch = course.title.toLowerCase().includes(q);
        const descMatch = (course.heroDesc || course.overview || "").toLowerCase().includes(q);
        const topicsMatch = course.curriculum?.some((mod) =>
          mod.module.toLowerCase().includes(q) ||
          mod.topics?.some((t) => t.toLowerCase().includes(q))
        );
        if (!titleMatch && !descMatch && !topicsMatch) return false;
      }

      return true;
    });
  }, [allCoursesList, selectedCategory, selectedDuration, selectedMode, searchQuery]);

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    selectedCategory !== "all" ||
    selectedDuration !== "all" ||
    selectedMode !== "all";

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedDuration("all");
    setSelectedMode("all");
  };

  return (
    <div className="w-full flex flex-col min-h-screen">
      {/* 1. HERO SECTION (Editorial Authority & Plus Jakarta Sans) */}
      <section className="relative pt-12 pb-14 sm:pt-16 sm:pb-18 lg:pt-20 lg:pb-22 bg-slate-50/80 dark:bg-[#070B14] text-slate-900 dark:text-white border-b border-slate-200/80 dark:border-white/10 overflow-hidden transition-colors">
        {/* Subtle Ambient Indigo/Violet Glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 65% 45% at 50% -10%, rgba(99, 102, 241, 0.08), transparent 70%), radial-gradient(ellipse 45% 35% at 85% 15%, rgba(139, 92, 246, 0.05), transparent 70%)",
          }}
          aria-hidden="true"
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10 text-center">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider mb-4 border border-indigo-200/60 dark:border-indigo-800/50">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>26 Industry-Ready Tech &amp; Creative Programs</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-heading tracking-tight text-slate-900 dark:text-white mb-4">
            Explore All <span className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 dark:from-indigo-400 dark:via-indigo-300 dark:to-violet-400 bg-clip-text text-transparent">Professional Courses</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-body">
            Master high-demand engineering, generative AI, data science, and creative disciplines. Launch your career with <span className="text-slate-900 dark:text-white font-semibold">₹0 upfront tuition</span> under Pay After Placement.
          </p>

          {/* Trust Value Badges Strip */}
          <div className="mt-8 pt-6 border-t border-slate-200/80 dark:border-white/10 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs font-semibold text-slate-600 dark:text-slate-300 font-heading">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
              <span>₹0 Upfront Tuition Model</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
              <span>Agile Tribers Live Incubation</span>
            </div>
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
              <span>100% Placement Assurance Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FILTER & SEARCH CONTROL BAR */}
      <section className="sticky top-16 z-30 bg-white/95 dark:bg-[#0B1120]/95 backdrop-blur-md border-b border-slate-200/80 dark:border-white/10 shadow-xs">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-4">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Search Input Box */}
            <div className="relative flex-1 max-w-lg">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by role, stack (React, Python, Figma, LLMs)..."
                className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-body placeholder:text-slate-400 transition-all"
                aria-label="Search courses"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                  aria-label="Clear search query"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Quick Dropdown Filters (Duration & Training Mode) */}
            <div className="flex items-center gap-2.5 overflow-x-auto pb-1 lg:pb-0">
              {/* Duration filter */}
              <div className="flex items-center gap-1.5 shrink-0">
                <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <select
                  value={selectedDuration}
                  onChange={(e) => setSelectedDuration(e.target.value)}
                  className="text-xs font-bold font-heading rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-700 dark:text-slate-200 py-2 px-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                  aria-label="Filter by duration"
                >
                  <option value="all" className="bg-slate-900 text-white">All Durations</option>
                  <option value="3m" className="bg-slate-900 text-white">3 Months Bootcamps</option>
                  <option value="6m" className="bg-slate-900 text-white">6 Months Full-Stack</option>
                </select>
              </div>

              {/* Training Mode filter */}
              <div className="flex items-center gap-1.5 shrink-0">
                <Globe className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <select
                  value={selectedMode}
                  onChange={(e) => setSelectedMode(e.target.value)}
                  className="text-xs font-bold font-heading rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-700 dark:text-slate-200 py-2 px-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                  aria-label="Filter by mode"
                >
                  <option value="all" className="bg-slate-900 text-white">All Delivery Modes</option>
                  <option value="offline" className="bg-slate-900 text-white">Offline Campus / Hybrid</option>
                  <option value="online" className="bg-slate-900 text-white">Online Interactive</option>
                </select>
              </div>

              {/* Reset button if active */}
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 text-xs font-bold border border-rose-200/60 dark:border-rose-900/40 hover:bg-rose-100 cursor-pointer transition-colors shrink-0"
                  title="Reset all filters"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>

          {/* Category Horizontal Filter Pills */}
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/5 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              type="button"
              onClick={() => setSelectedCategory("all")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 font-heading ${
                selectedCategory === "all"
                  ? "bg-indigo-600 text-white shadow-sm shadow-indigo-600/30"
                  : "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10"
              }`}
            >
              <span>All Tracks</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                selectedCategory === "all" ? "bg-white/20 text-white" : "bg-slate-200 dark:bg-white/10 text-slate-500 dark:text-slate-400"
              }`}>
                {categoryCounts.all}
              </span>
            </button>

            {CATEGORIES_CONFIG.map((cat) => {
              const isSelected = selectedCategory === cat.slug;
              const count = categoryCounts[cat.slug] || 0;
              return (
                <button
                  key={cat.slug}
                  type="button"
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 font-heading ${
                    isSelected
                      ? "bg-indigo-600 text-white shadow-sm shadow-indigo-600/30"
                      : "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10"
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSelected ? "bg-white/20 text-white" : "bg-slate-200 dark:bg-white/10 text-slate-500 dark:text-slate-400"
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. COURSE CATALOG GRID */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-[#0B1120] transition-colors flex-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* Active Results Status Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-8 pb-4 border-b border-slate-200/80 dark:border-white/10">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black text-slate-900 dark:text-white font-heading">
                Showing {filteredCourses.length} {filteredCourses.length === 1 ? "Program" : "Programs"}
              </h2>
              {hasActiveFilters && (
                <span className="text-xs text-indigo-600 dark:text-indigo-400 font-bold bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-0.5 rounded-full border border-indigo-200/60 dark:border-indigo-800/50">
                  Filtered
                </span>
              )}
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 font-body">
              All courses feature live incubation projects and dedicated 1-on-1 placement support.
            </p>
          </div>

          {/* Grid or Empty State */}
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredCourses.map((c) => {
                const categorySlug = COURSE_CATEGORY_MAP[c.slug] || "coding";
                const catInfo = CATEGORIES_CONFIG.find((cat) => cat.slug === categorySlug);
                return (
                  <CourseCard
                    key={c.slug}
                    slug={c.slug}
                    title={c.title}
                    tag={catInfo?.name}
                    duration={c.details?.duration || "6 Months"}
                    mode={c.details?.mode || "Offline / Online"}
                    desc={c.heroDesc}
                    image={getCourseImage(c.slug)}
                    showEnrollBtn={true}
                    onEnroll={(title) => openEnroll(title)}
                  />
                );
              })}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-16 px-4 rounded-3xl bg-slate-50 dark:bg-white/[0.02] border border-dashed border-slate-300 dark:border-white/15 max-w-xl mx-auto space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 mx-auto flex items-center justify-center">
                <Search className="w-6 h-6 stroke-[2]" />
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white font-heading">
                No matching courses found
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 font-body leading-relaxed">
                We couldn&apos;t find any programs matching &ldquo;{searchQuery}&rdquo;. Try adjusting your keywords or clearing the active filters.
              </p>
              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold font-heading cursor-pointer shadow-md transition-all"
                >
                  Clear All Filters
                </button>
                <button
                  type="button"
                  onClick={() => openEnroll("Course Guidance")}
                  className="px-5 py-2.5 rounded-xl bg-white dark:bg-white/10 hover:bg-slate-100 text-slate-800 dark:text-white text-xs font-bold font-heading border border-slate-200 dark:border-white/10 cursor-pointer transition-all"
                >
                  Ask an Academic Advisor
                </button>
              </div>
            </div>
          )}

          {/* 4. CAREER GUIDANCE / UNCERTAIN TRACK ADVISORY BANNER */}
          <div className="mt-16 sm:mt-20 p-8 sm:p-12 rounded-3xl bg-[#0B1120] text-white border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl space-y-4">
              <span className="inline-block px-3.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold uppercase tracking-wider font-heading">
                1-on-1 Academic Counseling
              </span>

              <h3 className="text-2xl sm:text-4xl font-black font-heading leading-tight text-white">
                Unsure which pathway fits your background?
              </h3>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-body">
                Speak directly with an Ex-CTO mentor at our Nagercoil studio. We evaluate your education, aptitude, and aspirations to chart your fastest path into tech.
              </p>

              <div className="pt-4 flex flex-wrap items-center gap-3 sm:gap-4 font-heading">
                <button
                  type="button"
                  onClick={() => openEnroll("Free Career Counseling Session")}
                  className="px-7 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm shadow-lg shadow-indigo-600/25 transition-all cursor-pointer"
                >
                  Book Free 1:1 Counseling
                </button>

                <a
                  href={SITE_CONFIG.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-sm border border-white/15 flex items-center gap-2 transition-all"
                >
                  <MessageCircle className="w-4 h-4 text-indigo-400" />
                  <span>Ask on WhatsApp (+91 9487530243)</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. GLOBAL CTA BAND */}
      <CtaBand />
    </div>
  );
}
