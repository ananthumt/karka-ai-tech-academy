"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, X, ArrowRight, BookOpen, Clock } from "lucide-react";
import { COURSES, CATEGORIES_CONFIG } from "@/content/site";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const allCourses = Object.values(COURSES);

  const filteredCourses = query.trim()
    ? allCourses.filter((course) => {
        const q = query.toLowerCase();
        const titleMatch = course.title.toLowerCase().includes(q);
        const descMatch = course.heroDesc?.toLowerCase().includes(q);
        const slugMatch = course.slug.toLowerCase().includes(q);
        const curriculumMatch = course.curriculum?.some(
          (m) =>
            m.module.toLowerCase().includes(q) ||
            m.topics.some((t) => t.toLowerCase().includes(q))
        );
        return titleMatch || descMatch || slugMatch || curriculumMatch;
      })
    : allCourses.slice(0, 8); // show top 8 by default

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
      try {
        const params = new URLSearchParams(window.location.search);
        const initialQ = params.get("q") || params.get("search");
        if (initialQ) setQuery(initialQ);
      } catch {}
    } else {
      document.body.style.overflow = "";
      setQuery("");
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Keyboard shortcut Esc to close & Focus trap
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key === "Tab" && containerRef.current) {
        const focusable = containerRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          last.focus();
          e.preventDefault();
        } else if (!e.shiftKey && document.activeElement === last) {
          first.focus();
          e.preventDefault();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Course Search"
      className="fixed inset-0 z-[60] flex items-start justify-center pt-16 sm:pt-24 px-4 bg-navy-950/80 dark:bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={containerRef}
        className="w-full max-w-3xl rounded-3xl bg-white dark:bg-[#0B1120] border border-slate-200/80 dark:border-white/10 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-100 dark:border-white/10">
          <Search className="w-5 h-5 text-lime flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search 26 courses, curriculums, and skills…"
            className="flex-1 text-base sm:text-lg bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none font-body"
            aria-label="Search courses"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              aria-label="Clear search input"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/20 transition-colors"
          >
            ESC
          </button>
        </div>

        {/* Results Counter & Filter Strip */}
        <div className="px-6 py-2.5 bg-slate-50 dark:bg-white/5 border-b border-slate-100 dark:border-white/10 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-body">
          <span aria-live="polite" className="font-semibold text-slate-700 dark:text-slate-300">
            {filteredCourses.length} results found
          </span>
          <span className="hidden sm:inline">Press ESC to dismiss</span>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6 space-y-2.5">
          {filteredCourses.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <BookOpen className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p className="text-sm font-semibold">0 results found for &quot;{query}&quot;</p>
              <p className="text-xs text-slate-500 mt-1">
                Try searching for MERN, Python, GenAI, DevOps, or UI/UX.
              </p>
            </div>
          ) : (
            filteredCourses.map((course) => (
              <Link
                key={course.slug}
                href={`/courses/${course.slug}`}
                onClick={onClose}
                className="group flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-[#111A2E] hover:bg-slate-50 dark:hover:bg-white/5 border border-slate-200/70 dark:border-white/10 hover:border-lime/40 dark:hover:border-lime/30 transition-all shadow-xs"
              >
                <div className="space-y-1 pr-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-lime transition-colors font-heading">
                      {course.title}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                      <Clock className="w-3 h-3" />
                      <span>{course.details?.duration || "6 Months"}</span>
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-1 font-sans">
                    {course.heroDesc}
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/10 group-hover:bg-ultramarine group-hover:text-white dark:group-hover:bg-mint dark:group-hover:text-navy-950 flex items-center justify-center text-slate-500 dark:text-slate-400 transition-colors flex-shrink-0">
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
