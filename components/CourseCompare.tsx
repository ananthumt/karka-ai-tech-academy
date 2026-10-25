"use client";

import React, { Suspense, useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Search,
  X,
  Plus,
  Check,
  Layers,
  Clock,
  GraduationCap,
  BookOpen,
  Globe,
  Wallet,
  UserRound,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Info,
  RotateCcw,
  Scale,
} from "lucide-react";
import { COURSES, CATEGORIES_CONFIG, CourseDetail } from "@/content/site";
import { COURSE_CATEGORY_MAP } from "@/lib/recommendation";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import { useEnrollModal } from "@/components/EnrollContext";

/** Verified Pay After Placement tuition line — single source of truth. */
const TUITION_LINE = "₹0 Upfront · ₹40,000 after placement";

const MAX_COMPARE = 3;

const ALL_COURSES: CourseDetail[] = Object.values(COURSES);

/** Resolve a course slug to its human-readable category name. */
function categoryNameFor(slug: string): string {
  const catSlug = COURSE_CATEGORY_MAP[slug];
  return CATEGORIES_CONFIG.find((c) => c.slug === catSlug)?.name ?? "Professional Track";
}

interface Preset {
  label: string;
  hint: string;
  slugs: string[];
}

/** Every slug below is verified against the COURSES keys in content/site.ts. */
const PRESETS: Preset[] = [
  {
    label: "Fullstack Showdown",
    hint: "MERN vs Java vs Python stacks",
    slugs: ["mern-fullstack", "react-java-fullstack", "react-python-fullstack"],
  },
  {
    label: "Data & AI Tracks",
    hint: "Science vs Analytics vs Engineering",
    slugs: ["ai-data-science", "data-analytics-ai", "data-engineering"],
  },
  {
    label: "Design Careers",
    hint: "UI/UX vs Web vs Graphic design",
    slugs: ["ui-ux-design", "web-designing", "graphic-designing"],
  },
];

interface RowConfig {
  key: string;
  label: string;
  icon: React.ElementType;
  render: (course: CourseDetail) => React.ReactNode;
}

const CELL_TEXT = "text-sm text-slate-700 dark:text-slate-300 font-body";

const COMPARE_ROWS: RowConfig[] = [
  {
    key: "category",
    label: "Category",
    icon: Layers,
    render: (course) => (
      <span className="inline-flex items-center rounded-full border border-indigo-200/80 bg-indigo-50 px-2.5 py-1 text-xs font-heading font-semibold text-indigo-700 dark:border-indigo-800/60 dark:bg-indigo-950/60 dark:text-indigo-300">
        {categoryNameFor(course.slug)}
      </span>
    ),
  },
  {
    key: "duration",
    label: "Duration",
    icon: Clock,
    render: (course) => <span className={CELL_TEXT}>{course.details.duration}</span>,
  },
  {
    key: "level",
    label: "Level",
    icon: GraduationCap,
    render: (course) => <span className={CELL_TEXT}>{course.details.level}</span>,
  },
  {
    key: "lessons",
    label: "Lessons",
    icon: BookOpen,
    render: (course) => <span className={CELL_TEXT}>{course.details.lessons}</span>,
  },
  {
    key: "mode",
    label: "Mode",
    icon: Globe,
    render: (course) => <span className={CELL_TEXT}>{course.details.mode}</span>,
  },
  {
    key: "tuition",
    label: "Tuition",
    icon: Wallet,
    render: () => (
      <span className="inline-flex items-start gap-1.5 text-sm font-heading font-semibold text-slate-900 dark:text-white">
        <ShieldCheck
          className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400"
          aria-hidden="true"
        />
        <span>{TUITION_LINE}</span>
      </span>
    ),
  },
  {
    key: "curriculum",
    label: "Curriculum Modules",
    icon: Layers,
    render: (course) => (
      <div className="space-y-2">
        <span className="font-mono text-xs uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
          {course.curriculum.length} Modules
        </span>
        <ul className="space-y-1.5">
          {course.curriculum.map((mod) => (
            <li key={mod.module} className="flex items-start gap-1.5">
              <Check
                className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600 dark:text-emerald-400"
                aria-hidden="true"
              />
              <span className="text-xs leading-relaxed text-slate-600 dark:text-slate-400 font-body">
                {mod.module}
              </span>
            </li>
          ))}
        </ul>
      </div>
    ),
  },
  {
    key: "mentor",
    label: "Mentor",
    icon: UserRound,
    render: (course) => (
      <div className="space-y-0.5">
        <p className="text-sm font-heading font-semibold text-slate-900 dark:text-white">
          {course.instructor.name}
        </p>
        <p className="text-xs text-slate-600 dark:text-slate-400 font-body">
          {course.instructor.role}
        </p>
      </div>
    ),
  },
];

/* ========================================================================== */
/* Picker                                                                      */
/* ========================================================================== */

interface PickerProps {
  selected: string[];
  onToggle: (slug: string) => void;
  isFull: boolean;
}

const CoursePicker: React.FC<PickerProps> = ({ selected, onToggle, isFull }) => {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ALL_COURSES.filter((course) => {
      const matchesQuery = q.length === 0 || course.title.toLowerCase().includes(q);
      const matchesCategory =
        activeCategory === "all" || COURSE_CATEGORY_MAP[course.slug] === activeCategory;
      return matchesQuery && matchesCategory;
    });
  }, [query, activeCategory]);

  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-white/10 dark:bg-[#111A2E] sm:p-6">
      <div className="space-y-2">
        <label
          htmlFor="course-compare-search"
          className="block text-xs font-heading font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400"
        >
          Search courses
        </label>
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          />
          <input
            id="course-compare-search"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try MERN, Data Analytics, UI/UX…"
            autoComplete="off"
            className="w-full rounded-xl border border-slate-200/80 bg-[#F8FAFC] py-3 pl-10 pr-10 text-sm text-slate-900 font-body outline-none transition-colors placeholder:text-slate-400 focus-visible:border-indigo-600 focus-visible:ring-2 focus-visible:ring-indigo-600/30 dark:border-white/10 dark:bg-[#0B1120] dark:text-white"
          />
          {query.length > 0 && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 cursor-pointer rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600/40 dark:hover:bg-white/10 dark:hover:text-white"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      <div
        className="mt-4 flex flex-wrap gap-2"
        role="group"
        aria-label="Filter courses by category"
      >
        <button
          type="button"
          onClick={() => setActiveCategory("all")}
          aria-pressed={activeCategory === "all"}
          className={cn(
            "cursor-pointer rounded-full border px-3 py-1.5 text-xs font-heading font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600/40",
            activeCategory === "all"
              ? "border-indigo-600 bg-indigo-600 text-white"
              : "border-slate-200/80 bg-white text-slate-600 hover:border-indigo-300 hover:text-indigo-700 dark:border-white/10 dark:bg-[#0B1120] dark:text-slate-400 dark:hover:text-indigo-400"
          )}
        >
          All Categories
        </button>
        {CATEGORIES_CONFIG.map((cat) => (
          <button
            key={cat.slug}
            type="button"
            onClick={() => setActiveCategory(cat.slug)}
            aria-pressed={activeCategory === cat.slug}
            className={cn(
              "cursor-pointer rounded-full border px-3 py-1.5 text-xs font-heading font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600/40",
              activeCategory === cat.slug
                ? "border-indigo-600 bg-indigo-600 text-white"
                : "border-slate-200/80 bg-white text-slate-600 hover:border-indigo-300 hover:text-indigo-700 dark:border-white/10 dark:bg-[#0B1120] dark:text-slate-400 dark:hover:text-indigo-400"
            )}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {isFull && (
        <p className="mt-4 flex items-start gap-2 rounded-xl border border-amber-200/80 bg-amber-50 px-3.5 py-2.5 text-xs text-amber-800 font-body dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-300">
          <Info className="mt-px h-4 w-4 shrink-0" aria-hidden="true" />
          <span>
            You can compare {MAX_COMPARE} courses at a time. Remove one to add another.
          </span>
        </p>
      )}

      <div className="mt-4 max-h-72 overflow-y-auto pr-1">
        {results.length === 0 ? (
          <p className="py-8 text-center text-sm text-slate-600 dark:text-slate-400 font-body">
            No courses match that search. Try a different keyword or category.
          </p>
        ) : (
          <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {results.map((course) => {
              const isSelected = selected.includes(course.slug);
              const isDisabled = !isSelected && isFull;
              return (
                <li key={course.slug}>
                  <button
                    type="button"
                    onClick={() => onToggle(course.slug)}
                    disabled={isDisabled}
                    aria-pressed={isSelected}
                    className={cn(
                      "flex w-full items-center justify-between gap-3 rounded-xl border px-3.5 py-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600/40",
                      isSelected
                        ? "border-indigo-600 bg-indigo-50 dark:border-indigo-500/60 dark:bg-indigo-950/40"
                        : "border-slate-200/80 bg-white hover:border-indigo-300 dark:border-white/10 dark:bg-[#0B1120] dark:hover:border-indigo-500/40",
                      isDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
                    )}
                  >
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-heading font-semibold text-slate-900 dark:text-white">
                        {course.title}
                      </span>
                      <span className="block truncate text-xs text-slate-600 dark:text-slate-400 font-body">
                        {categoryNameFor(course.slug)} · {course.details.duration}
                      </span>
                    </span>
                    <span
                      className={cn(
                        "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg",
                        isSelected
                          ? "bg-indigo-600 text-white"
                          : "bg-slate-100 text-slate-500 dark:bg-white/10 dark:text-slate-400"
                      )}
                      aria-hidden="true"
                    >
                      {isSelected ? (
                        <Check className="h-4 w-4 stroke-[2.5]" />
                      ) : (
                        <Plus className="h-4 w-4 stroke-[2.5]" />
                      )}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

/* ========================================================================== */
/* Empty state                                                                 */
/* ========================================================================== */

const EmptyState: React.FC<{ onApplyPreset: (slugs: string[]) => void }> = ({
  onApplyPreset,
}) => (
  <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center shadow-xs dark:border-white/15 dark:bg-[#111A2E] sm:p-12">
    <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
      <Scale className="h-7 w-7" aria-hidden="true" />
    </span>

    <h3 className="mt-5 text-xl font-heading font-bold text-slate-900 dark:text-white">
      Pick up to {MAX_COMPARE} courses to compare
    </h3>
    <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-600 dark:text-slate-400 font-body">
      Search above, or start with one of these popular comparisons. Every program runs on
      the same Pay After Placement model.
    </p>

    <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-3">
      {PRESETS.map((preset) => (
        <button
          key={preset.label}
          type="button"
          onClick={() => onApplyPreset(preset.slugs)}
          className="group cursor-pointer rounded-2xl border border-slate-200/80 bg-[#F8FAFC] p-4 text-left transition-colors hover:border-indigo-300 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600/40 dark:border-white/10 dark:bg-[#0B1120] dark:hover:border-indigo-500/40"
        >
          <span className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            Popular
          </span>
          <span className="mt-2 block text-sm font-heading font-bold text-slate-900 dark:text-white">
            {preset.label}
          </span>
          <span className="mt-1 block text-xs text-slate-600 dark:text-slate-400 font-body">
            {preset.hint}
          </span>
          <span className="mt-3 inline-flex items-center gap-1 text-xs font-heading font-semibold text-indigo-600 dark:text-indigo-400">
            Compare now
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </span>
        </button>
      ))}
    </div>
  </div>
);

/* ========================================================================== */
/* Comparison table                                                            */
/* ========================================================================== */

interface TableProps {
  courses: CourseDetail[];
  onRemove: (slug: string) => void;
  onApply: (title: string) => void;
}

const LABEL_CELL =
  "sticky left-0 z-10 w-40 min-w-40 border-r border-slate-200/80 bg-[#F8FAFC] px-4 py-4 text-left align-top dark:border-white/10 dark:bg-[#0B1120] sm:w-48 sm:min-w-48";

const ComparisonGrid: React.FC<TableProps> = ({ courses, onRemove, onApply }) => (
  <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm dark:border-white/10 dark:bg-[#111A2E]">
    <div className="no-scrollbar overflow-x-auto">
      <table className="w-full min-w-[640px] border-collapse text-left">
        <caption className="sr-only">
          Side-by-side comparison of the selected Karka AI &amp; Tech Academy courses,
          covering category, duration, level, lessons, mode, tuition, curriculum modules
          and mentor.
        </caption>

        <thead>
          <tr className="border-b border-slate-200/80 dark:border-white/10">
            <th scope="col" className={cn(LABEL_CELL, "align-bottom")}>
              <span className="font-mono text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Compare
              </span>
            </th>
            {courses.map((course) => (
              <th
                key={course.slug}
                scope="col"
                className="min-w-[220px] border-r border-slate-200/80 px-4 py-4 align-top last:border-r-0 dark:border-white/10"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-base font-heading font-bold leading-snug text-slate-900 dark:text-white">
                    {course.title}
                  </span>
                  <button
                    type="button"
                    onClick={() => onRemove(course.slug)}
                    aria-label={`Remove ${course.title} from comparison`}
                    className="shrink-0 cursor-pointer rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600/40 dark:hover:bg-white/10 dark:hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {COMPARE_ROWS.map((row) => {
            const RowIcon = row.icon;
            return (
              <tr
                key={row.key}
                className="border-b border-slate-200/80 dark:border-white/10"
              >
                <th scope="row" className={LABEL_CELL}>
                  <span className="flex items-center gap-2 text-xs font-heading font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                    <RowIcon
                      className="h-4 w-4 shrink-0 text-indigo-600 dark:text-indigo-400"
                      aria-hidden="true"
                    />
                    {row.label}
                  </span>
                </th>
                {courses.map((course) => (
                  <td
                    key={course.slug}
                    className="min-w-[220px] border-r border-slate-200/80 px-4 py-4 align-top last:border-r-0 dark:border-white/10"
                  >
                    {row.render(course)}
                  </td>
                ))}
              </tr>
            );
          })}

          <tr>
            <th scope="row" className={LABEL_CELL}>
              <span className="flex items-center gap-2 text-xs font-heading font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                <ArrowRight
                  className="h-4 w-4 shrink-0 text-indigo-600 dark:text-indigo-400"
                  aria-hidden="true"
                />
                Next Step
              </span>
            </th>
            {courses.map((course) => (
              <td
                key={course.slug}
                className="min-w-[220px] border-r border-slate-200/80 px-4 py-4 align-top last:border-r-0 dark:border-white/10"
              >
                <div className="flex flex-col gap-2">
                  <Link
                    href={`/courses/${course.slug}`}
                    className="inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-slate-200/80 bg-white px-3.5 py-2.5 text-xs font-heading font-semibold text-slate-900 transition-colors hover:border-indigo-300 hover:text-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600/40 dark:border-white/10 dark:bg-[#0B1120] dark:text-white dark:hover:border-indigo-500/40 dark:hover:text-indigo-400"
                  >
                    <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
                    View Syllabus
                  </Link>
                  <button
                    type="button"
                    onClick={() => onApply(course.title)}
                    className="inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-2.5 text-xs font-heading font-bold text-white shadow-sm shadow-indigo-600/25 transition-all hover:bg-indigo-700 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600/40"
                  >
                    Quick Apply
                    <ArrowRight className="h-3.5 w-3.5 stroke-[2.5]" aria-hidden="true" />
                  </button>
                </div>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

/* ========================================================================== */
/* Inner component (reads search params)                                       */
/* ========================================================================== */

const CourseCompareInner: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { openEnroll } = useEnrollModal();
  const shouldReduceMotion = useReducedMotion();

  const initialSelection = useMemo(() => {
    const raw = searchParams.get("courses");
    if (!raw) return [];
    const seen = new Set<string>();
    const valid: string[] = [];
    for (const part of raw.split(",")) {
      const slug = part.trim();
      if (slug && slug in COURSES && !seen.has(slug)) {
        seen.add(slug);
        valid.push(slug);
      }
      if (valid.length === MAX_COMPARE) break;
    }
    return valid;
  }, [searchParams]);

  const [selected, setSelected] = useState<string[]>(initialSelection);

  const syncUrl = useCallback(
    (slugs: string[]) => {
      const query = slugs.length > 0 ? `?courses=${slugs.join(",")}` : "";
      router.replace(`/compare${query}`, { scroll: false });
    },
    [router]
  );

  const commit = useCallback(
    (next: string[]) => {
      setSelected(next);
      syncUrl(next);
    },
    [syncUrl]
  );

  const toggleCourse = useCallback(
    (slug: string) => {
      if (selected.includes(slug)) {
        commit(selected.filter((s) => s !== slug));
        return;
      }
      if (selected.length >= MAX_COMPARE) return;
      commit([...selected, slug]);
    },
    [selected, commit]
  );

  const removeCourse = useCallback(
    (slug: string) => commit(selected.filter((s) => s !== slug)),
    [selected, commit]
  );

  const applyPreset = useCallback(
    (slugs: string[]) => commit(slugs.filter((s) => s in COURSES).slice(0, MAX_COMPARE)),
    [commit]
  );

  const selectedCourses = useMemo(
    () =>
      selected
        .map((slug) => COURSES[slug])
        .filter((course): course is CourseDetail => Boolean(course)),
    [selected]
  );

  const isFull = selected.length >= MAX_COMPARE;

  const chipMotion = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, scale: 0.92 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.92 },
        transition: { duration: 0.18, ease: [0.16, 1, 0.3, 1] as const },
      };

  return (
    <section className="w-full bg-[#F8FAFC] py-16 transition-colors dark:bg-[#080C17] lg:py-24">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeader
            eyebrow="Side-by-side"
            title="Compare up to 3 programs"
            subtitle="Line up duration, level, mode, curriculum depth and mentors so you can commit with confidence. Tuition is identical across every track: zero upfront, pay after placement."
          />
        </Reveal>

        <Reveal delay={0.05}>
          <CoursePicker selected={selected} onToggle={toggleCourse} isFull={isFull} />
        </Reveal>

        {/* Selected chips */}
        <div className="mt-6 flex flex-wrap items-center gap-2" aria-live="polite">
          <AnimatePresence initial={false}>
            {selectedCourses.map((course) => (
              <motion.span
                key={course.slug}
                layout={!shouldReduceMotion}
                {...chipMotion}
                className="inline-flex items-center gap-2 rounded-full border border-indigo-200/80 bg-white py-1.5 pl-3.5 pr-1.5 text-xs font-heading font-semibold text-slate-900 shadow-xs dark:border-indigo-500/40 dark:bg-[#111A2E] dark:text-white"
              >
                {course.title}
                <button
                  type="button"
                  onClick={() => removeCourse(course.slug)}
                  aria-label={`Remove ${course.title} from comparison`}
                  className="cursor-pointer rounded-full p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600/40 dark:hover:bg-white/10 dark:hover:text-white"
                >
                  <X className="h-3 w-3 stroke-[2.5]" />
                </button>
              </motion.span>
            ))}
          </AnimatePresence>

          {selectedCourses.length > 0 && (
            <>
              <span className="font-mono text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {selectedCourses.length}/{MAX_COMPARE} selected
              </span>
              <button
                type="button"
                onClick={() => commit([])}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-heading font-semibold text-slate-600 transition-colors hover:text-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600/40 dark:text-slate-400 dark:hover:text-indigo-400"
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                Clear all
              </button>
            </>
          )}
        </div>

        <div className="mt-8">
          {selectedCourses.length === 0 ? (
            <EmptyState onApplyPreset={applyPreset} />
          ) : (
            <motion.div
              key={selected.join("-")}
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 10 }}
              animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <ComparisonGrid
                courses={selectedCourses}
                onRemove={removeCourse}
                onApply={openEnroll}
              />
              <p className="mt-4 flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400 font-body">
                <Info className="mt-px h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span>
                  Scroll the table sideways on smaller screens. Share this comparison by
                  copying the page URL.
                </span>
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

/* ========================================================================== */
/* Suspense wrapper (useSearchParams needs a boundary during prerender)        */
/* ========================================================================== */

const CompareFallback: React.FC = () => (
  <section className="w-full bg-[#F8FAFC] py-16 transition-colors dark:bg-[#080C17] lg:py-24">
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="h-10 w-2/3 animate-pulse rounded-xl bg-slate-200/80 dark:bg-white/10" />
      <div className="mt-6 h-64 animate-pulse rounded-3xl border border-slate-200/80 bg-white dark:border-white/10 dark:bg-[#111A2E]" />
      <p className="mt-4 text-sm text-slate-600 dark:text-slate-400 font-body">
        Loading the course comparison tool…
      </p>
    </div>
  </section>
);

export const CourseCompare: React.FC = () => (
  <Suspense fallback={<CompareFallback />}>
    <CourseCompareInner />
  </Suspense>
);

export default CourseCompare;
