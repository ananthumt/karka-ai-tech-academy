"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Code,
  Sparkles,
  Database,
  Palette,
  Film,
  TrendingUp,
  Server,
  Briefcase,
  ArrowRight,
  Phone,
  Mail,
  Linkedin,
  Search,
  X,
} from "lucide-react";
import { CATEGORIES_CONFIG, COURSES, SITE_CONFIG } from "@/content/site";

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenEnroll?: () => void;
  onOpenSearch?: () => void;
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  coding: <Code className="w-4 h-4" />,
  "gen-ai": <Sparkles className="w-4 h-4" />,
  data: <Database className="w-4 h-4" />,
  design: <Palette className="w-4 h-4" />,
  "digital-media": <Film className="w-4 h-4" />,
  "content-marketing": <TrendingUp className="w-4 h-4" />,
  "other-tech": <Server className="w-4 h-4" />,
  business: <Briefcase className="w-4 h-4" />,
};

const COURSE_CATEGORY_MAP: Record<string, string> = {
  // Coding & Development (3)
  "mern-fullstack": "coding",
  "react-java-fullstack": "coding",
  "react-python-fullstack": "coding",

  // Generative AI (3)
  "genai-foundations": "gen-ai",
  "genai-mastery": "gen-ai",
  "genai-llm-developer": "gen-ai",

  // Data, ML & AI (3)
  "ai-data-science": "data",
  "data-analytics-ai": "data",
  "data-engineering": "data",

  // Design & Creatives (3)
  "ui-ux-design": "design",
  "web-designing": "design",
  "graphic-designing": "design",

  // Digital Media & Animation (3)
  "video-editing": "digital-media",
  "graphic-designing-dm": "digital-media",
  "multimedia-animation": "digital-media",

  // Content & Digital Marketing (3)
  "digital-marketing": "content-marketing",
  "seo-analyst": "content-marketing",
  "storytelling-content-writing": "content-marketing",

  // Advanced Tech & DevOps (5)
  "cloud-devops": "other-tech",
  "automation-testing": "other-tech",
  "mobile-app-development": "other-tech",
  "fullstack-internship": "other-tech",
  "python-for-kids": "other-tech",

  // Business & Management (3)
  "hr-finance": "business",
  "tally": "business",
  "business-analyst": "business",
};

export const MegaMenu: React.FC<MegaMenuProps> = ({
  isOpen,
  onClose,
  onOpenEnroll,
  onOpenSearch,
}) => {
  const [activeCategorySlug, setActiveCategorySlug] = useState(CATEGORIES_CONFIG[0].slug);
  const menuRef = useRef<HTMLDivElement>(null);

  // Group courses by category using robust slug mapping
  const coursesByCategory = React.useMemo(() => {
    const map: Record<string, typeof COURSES[string][]> = {};
    CATEGORIES_CONFIG.forEach((cat) => {
      map[cat.slug] = [];
    });

    Object.values(COURSES).forEach((course) => {
      const cat = course.category || COURSE_CATEGORY_MAP[course.slug] || "coding";
      if (map[cat]) {
        map[cat].push(course);
      } else {
        map["coding"].push(course);
      }
    });
    return map;
  }, []);

  const activeCategory = CATEGORIES_CONFIG.find((c) => c.slug === activeCategorySlug) || CATEGORIES_CONFIG[0];
  const activeCourses = coursesByCategory[activeCategorySlug] || [];

  // Esc key and click outside
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Dimmed backdrop to prevent underlying page elements from causing visual clutter */}
      <div
        className="fixed inset-0 top-20 bg-black/60 backdrop-blur-xs z-40 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        ref={menuRef}
        role="region"
        aria-label="Courses Mega Menu"
        className="absolute top-full left-0 right-0 z-50 bg-white dark:bg-[#0B1120] text-slate-900 dark:text-white border-b border-slate-200/80 dark:border-white/10 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200"
      >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* 1. Left: 8 Categories List (4 cols) */}
          <div className="lg:col-span-4 border-r border-slate-100 dark:border-white/10 pr-6 space-y-1">
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100 dark:border-white/10">
              <span className="text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 font-heading">
                8 Career Categories
              </span>
              <button
                type="button"
                onClick={onOpenSearch}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-lime hover:underline font-heading"
              >
                <Search className="w-3.5 h-3.5 text-lime" />
                <span>Search All</span>
              </button>
            </div>

            {CATEGORIES_CONFIG.map((cat) => {
              const isActive = cat.slug === activeCategorySlug;
              return (
                <button
                  key={cat.slug}
                  type="button"
                  onMouseEnter={() => setActiveCategorySlug(cat.slug)}
                  onClick={() => setActiveCategorySlug(cat.slug)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-2xl flex items-center justify-between transition-all ${
                    isActive
                      ? "bg-lime/15 dark:bg-lime/15 text-emerald-950 dark:text-lime font-bold translate-x-1 ring-1 ring-lime/30"
                      : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`p-1.5 rounded-lg ${
                        isActive
                          ? "bg-lime text-[#071A10]"
                          : "bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-400"
                      }`}
                    >
                      {CATEGORY_ICONS[cat.slug] || <Code className="w-4 h-4" />}
                    </span>
                    <span className="text-sm font-semibold">{cat.name}</span>
                  </div>
                  <span className="text-xs opacity-60 font-mono">
                    {coursesByCategory[cat.slug]?.length || 0}
                  </span>
                </button>
              );
            })}
          </div>

          {/* 2. Middle: Active Category's Courses (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/10">
              <div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white font-heading">
                  {activeCategory.name}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {activeCategory.desc}
                </p>
              </div>
              <Link
                href={`/courses/category/${activeCategory.slug}`}
                onClick={onClose}
                className="text-xs font-bold text-emerald-700 dark:text-lime hover:underline inline-flex items-center gap-1 font-heading"
              >
                <span>View Track</span>
                <ArrowRight className="w-3 h-3 text-lime" />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-2.5 max-h-[360px] overflow-y-auto pr-2">
              {activeCourses.map((c) => (
                <Link
                  key={c.slug}
                  href={`/courses/${c.slug}`}
                  onClick={onClose}
                  className="group p-3 rounded-2xl bg-slate-50 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 border border-slate-100 dark:border-white/5 hover:border-lime/40 dark:hover:border-lime/30 transition-all flex items-center justify-between"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-lime transition-colors font-heading">
                        {c.title}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-200/60 dark:bg-white/10 text-slate-600 dark:text-slate-300">
                        {c.details?.duration || "6 Months"}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 font-body">
                      {c.heroDesc}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-lime group-hover:translate-x-1 transition-all flex-shrink-0" />
                </Link>
              ))}
            </div>
          </div>

          {/* 3. Right: Advisory Card & Direct Contacts (3 cols) */}
          <div className="lg:col-span-3 space-y-4 bg-slate-50 dark:bg-white/5 p-6 rounded-3xl border border-slate-200/80 dark:border-white/10">
            <div>
              <span className="badge-lime mb-2">
                Admissions Open
              </span>
              <h5 className="text-base font-extrabold text-slate-900 dark:text-white font-heading">
                Book Free Strategy Call
              </h5>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed font-body">
                Speak directly with an industry architect to find the right track for your career.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                onClose();
                if (onOpenEnroll) onOpenEnroll();
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-lime hover:bg-[#05D96B] text-[#071A10] font-heading font-extrabold text-xs shadow-md shadow-lime/20 transition-all flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-lime"
            >
              <span>Book a Call</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#071A10]" />
            </button>

            <div className="pt-3 border-t border-slate-200/80 dark:border-white/10 space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <a
                href={SITE_CONFIG.phoneTel}
                className="flex items-center gap-2 hover:text-emerald-700 dark:hover:text-lime transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-lime" />
                <span>{SITE_CONFIG.phone}</span>
              </a>
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="flex items-center gap-2 hover:text-emerald-700 dark:hover:text-lime transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-lime" />
                <span>{SITE_CONFIG.email}</span>
              </a>
              <a
                href={SITE_CONFIG.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-ultramarine dark:hover:text-mint transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5 text-mint" />
                <span>Karka on LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);
};
