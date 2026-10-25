"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowLeft,
  Search,
  X,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Globe,
  Layers,
  ChevronRight,
  MessageCircle,
  Code,
  Database,
  Palette,
  Film,
  TrendingUp,
  Server,
  Briefcase,
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
// Shared slug → category table. This file used to keep a private duplicate.
import { COURSE_CATEGORY_MAP } from "@/lib/recommendation";

// Official category icon mapping
const CATEGORY_ICON_MAP: Record<string, React.ReactNode> = {
  coding: <Code className="w-5 h-5" />,
  "gen-ai": <Sparkles className="w-5 h-5" />,
  data: <Database className="w-5 h-5" />,
  design: <Palette className="w-5 h-5" />,
  "digital-media": <Film className="w-5 h-5" />,
  "content-marketing": <TrendingUp className="w-5 h-5" />,
  "other-tech": <Server className="w-5 h-5" />,
  business: <Briefcase className="w-5 h-5" />,
};

interface CategoryCoursesViewProps {
  /** Validated by the server page before this component renders. */
  categorySlug: string;
}

/**
 * Interactive category listing body.
 *
 * Split out of `app/courses/category/[category]/page.tsx` so that route can be
 * a server component with `generateMetadata` / `generateStaticParams`. The 8
 * category pages were previously rendered on demand with no metadata.
 */
export default function CategoryCoursesView({ categorySlug }: CategoryCoursesViewProps) {
  const { openEnroll } = useEnrollModal();

  const [searchQuery, setSearchQuery] = useState("");

  const catMeta = CATEGORIES_CONFIG.find((c) => c.slug === categorySlug);

  const categoryName = catMeta?.name || categorySlug.replace("-", " ").toUpperCase();
  const categoryDesc = catMeta?.desc || "Specialized professional training pathways designed to launch your career.";

  // Filter courses for this category
  const allCourses = useMemo(() => Object.values(COURSES), []);

  const categoryCourses = useMemo(() => {
    return allCourses.filter((c) => {
      const cat = COURSE_CATEGORY_MAP[c.slug] || "coding";
      if (cat !== categorySlug) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const titleMatch = c.title.toLowerCase().includes(q);
        const descMatch = (c.heroDesc || c.overview || "").toLowerCase().includes(q);
        return titleMatch || descMatch;
      }

      return true;
    });
  }, [allCourses, categorySlug, searchQuery]);

  return (
    <div className="w-full flex flex-col min-h-screen">
      {/* 1. HERO HEADER */}
      <section className="relative pt-12 pb-14 sm:pt-16 sm:pb-18 bg-slate-50/80 dark:bg-[#070B14] text-slate-900 dark:text-white border-b border-slate-200/80 dark:border-white/10 transition-colors overflow-hidden">
        {/* Ambient Glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 45% at 50% -10%, rgba(99, 102, 241, 0.08), transparent 70%), radial-gradient(ellipse 40% 35% at 85% 20%, rgba(139, 92, 246, 0.05), transparent 70%)",
          }}
          aria-hidden="true"
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-heading font-semibold text-slate-500 dark:text-slate-400 mb-6">
            <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link href="/courses" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Courses
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-900 dark:text-white font-bold">{categoryName}</span>
          </nav>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-200/80 dark:border-white/10">
            <div className="space-y-3 max-w-3xl">
              {/* Category Pill with Icon */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider border border-indigo-200/60 dark:border-indigo-800/50 font-heading">
                {CATEGORY_ICON_MAP[categorySlug] || <Sparkles className="w-4 h-4 text-indigo-600" />}
                <span>Domain Track</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold font-heading tracking-tight text-slate-900 dark:text-white">
                {categoryName}
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-body">
                {categoryDesc}
              </p>
            </div>

            <div className="shrink-0">
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-white/10 hover:bg-slate-100 text-slate-800 dark:text-white text-xs font-bold font-heading border border-slate-200 dark:border-white/10 transition-all shadow-xs"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Browse All 26 Courses</span>
              </Link>
            </div>
          </div>

          {/* Sibling Category Quick Links */}
          <div className="pt-4 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none font-heading">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1">
              Explore Tracks:
            </span>
            {CATEGORIES_CONFIG.map((cat) => {
              const isCurrent = cat.slug === categorySlug;
              return (
                <Link
                  key={cat.slug}
                  href={`/courses/category/${cat.slug}`}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 ${
                    isCurrent
                      ? "bg-indigo-600 text-white shadow-sm shadow-indigo-600/30"
                      : "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10"
                  }`}
                >
                  {cat.name}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. CATEGORY COURSES CATALOG */}
      <section className="py-12 sm:py-16 bg-white dark:bg-[#0B1120] transition-colors flex-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* Header Bar with Search */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-200/80 dark:border-white/10">
            <div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white font-heading">
                Showing {categoryCourses.length} {categoryCourses.length === 1 ? "Program" : "Programs"} in {categoryName}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-body">
                Structured with live production sprints, zero upfront tuition, and 1-on-1 mentor guidance.
              </p>
            </div>

            {/* Quick search within category */}
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search in ${categoryName}...`}
                className="w-full pl-9 pr-8 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white text-xs font-body focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Grid */}
          {categoryCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {categoryCourses.map((c) => (
                <CourseCard
                  key={c.slug}
                  slug={c.slug}
                  title={c.title}
                  tag={categoryName}
                  duration={c.details?.duration || "6 Months"}
                  mode={c.details?.mode || "Offline / Online"}
                  desc={c.heroDesc}
                  image={getCourseImage(c.slug)}
                  showEnrollBtn={true}
                  onEnroll={(title) => openEnroll(title)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 px-4 rounded-3xl bg-slate-50 dark:bg-white/[0.02] border border-dashed border-slate-300 dark:border-white/15 max-w-md mx-auto space-y-3">
              <p className="text-base font-bold text-slate-900 dark:text-white font-heading">
                No courses matched &ldquo;{searchQuery}&rdquo; in this track
              </p>
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
              >
                Clear search query
              </button>
            </div>
          )}

          {/* Track Counseling Strip */}
          <div className="mt-16 p-8 rounded-2xl bg-[#0B1120] text-white border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-1">
              <h3 className="text-xl font-bold font-heading text-white">
                Interested in mastering {categoryName}?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-body">
                Connect with our academic counselors in Nagercoil to check batch schedules and ₹0 upfront tuition eligibility.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0 font-heading">
              <button
                type="button"
                onClick={() => openEnroll(`Inquiry for ${categoryName}`)}
                className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-extrabold uppercase tracking-wider shadow-md transition-all cursor-pointer"
              >
                Apply for Next Batch
              </button>
              <a
                href={SITE_CONFIG.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-white/10 hover:bg-white/15 text-white transition-all"
                title="Ask via WhatsApp"
              >
                <MessageCircle className="w-4 h-4 text-indigo-400" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. GLOBAL CTA BAND */}
      <CtaBand />
    </div>
  );
}
