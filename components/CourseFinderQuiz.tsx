"use client";

import React, { useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import {
  ArrowRight,
  Baby,
  Briefcase,
  Check,
  ChevronLeft,
  Clock,
  Code,
  Columns,
  Database,
  Film,
  Globe,
  GraduationCap,
  Layers,
  MapPin,
  MessageCircle,
  Palette,
  Rocket,
  RotateCcw,
  School,
  Server,
  Shuffle,
  Sparkles,
  Target,
  TrendingUp,
  Trophy,
  Video,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import {
  rankCourses,
  type RecommendationCriteria,
  type RecommendedCourse,
} from "@/lib/recommendation";
import { getCourseImage, SITE_CONFIG } from "@/content/site";
import { useEnrollModal } from "@/components/EnrollContext";
import { SectionHeader } from "@/components/SectionHeader";
import { cn } from "@/lib/utils";

/* ---------------------------------------------------------------------------
   Question data — mirrors `RecommendationCriteria` from lib/recommendation.ts.
   The copy decisions follow the in-chat wizard
   (components/ChatWidget/CourseRecommendationWizard.tsx) so both surfaces
   stay consistent.
   --------------------------------------------------------------------------- */

interface QuizOption<TValue extends string> {
  value: TValue;
  title: string;
  desc: string;
  icon: LucideIcon;
  badge?: string;
}

const EDUCATION_OPTIONS: QuizOption<
  RecommendationCriteria["educationLevel"]
>[] = [
  {
    value: "graduate",
    title: "College Graduate / Final Year",
    desc: "B.E, B.Tech, BCA, B.Sc or Arts, looking for a ₹0 upfront placement bootcamp.",
    icon: GraduationCap,
  },
  {
    value: "student",
    title: "College Student (1st–3rd Year)",
    desc: "Want verified internships and weekend sprints that fit your semester.",
    icon: School,
  },
  {
    value: "professional",
    title: "Working / Career Switcher",
    desc: "Moving in from non-IT or support, or upgrading to fullstack and GenAI roles.",
    icon: Briefcase,
  },
  {
    value: "school",
    title: "School Student / Kid",
    desc: "Interactive programming, animation and logic games built for young minds.",
    icon: Baby,
  },
];

const INTEREST_OPTIONS: QuizOption<RecommendationCriteria["interest"]>[] = [
  {
    value: "web",
    title: "Web & Fullstack",
    desc: "React, Node.js, Python, MERN",
    icon: Code,
  },
  {
    value: "ai",
    title: "Generative AI & LLMs",
    desc: "Prompt engineering, LLMs, LangChain",
    icon: Sparkles,
  },
  {
    value: "data",
    title: "Data Science & ML",
    desc: "Analytics, Power BI, Python",
    icon: Database,
  },
  {
    value: "design",
    title: "UI/UX & Web Design",
    desc: "Figma, design systems, HTML",
    icon: Palette,
  },
  {
    value: "media",
    title: "Video & Animation",
    desc: "Premiere, After Effects, 3D",
    icon: Film,
  },
  {
    value: "marketing",
    title: "Digital Marketing & SEO",
    desc: "Performance ads, content, SEO",
    icon: TrendingUp,
  },
  {
    value: "devops",
    title: "DevOps, Cloud & QA",
    desc: "AWS, CI/CD, test automation",
    icon: Server,
  },
  {
    value: "business",
    title: "Business & Finance",
    desc: "Business analytics, Tally, HR",
    icon: Briefcase,
  },
];

const GOAL_OPTIONS: QuizOption<RecommendationCriteria["careerGoal"]>[] = [
  {
    value: "job",
    title: "Land a full-time software job",
    desc: "Zero fees during training. Flat ₹40,000 strictly after you secure a tech offer.",
    icon: Target,
    badge: "₹0 Upfront",
  },
  {
    value: "switch",
    title: "Switch careers from non-IT into tech",
    desc: "Structured from fundamentals with 1-on-1 daily mentorship in Nagercoil.",
    icon: Shuffle,
  },
  {
    value: "upskill",
    title: "Upskill with Generative AI",
    desc: "Master production GenAI agents and modern engineering workflows.",
    icon: Rocket,
  },
  {
    value: "freelance",
    title: "Freelance & remote agency work",
    desc: "Build an international portfolio through real Agile Tribers client projects.",
    icon: Globe,
  },
];

const MODE_OPTIONS: QuizOption<RecommendationCriteria["preferredMode"]>[] = [
  {
    value: "offline",
    title: "In-person studio lab",
    desc: "Nagercoil campus. Workstations, collaborative sprints and daily mentor feedback.",
    icon: MapPin,
    badge: "Most placed",
  },
  {
    value: "online",
    title: "Live interactive online",
    desc: "Live classes, remote code pairing, recorded archive and virtual mentoring.",
    icon: Video,
  },
  {
    value: "any",
    title: "Flexible / either mode",
    desc: "Show the strongest matches regardless of how they are delivered.",
    icon: Shuffle,
  },
];

interface StepCopy {
  eyebrow: string;
  title: string;
  helper: string;
}

const STEP_COPY: Record<1 | 2 | 3 | 4, StepCopy> = {
  1: {
    eyebrow: "Step 01",
    title: "Where are you right now?",
    helper: "Your stage decides the prerequisites and the pace we recommend.",
  },
  2: {
    eyebrow: "Step 02",
    title: "Which domain excites you most?",
    helper: "Pick the technical or creative track you actually want to work in.",
  },
  3: {
    eyebrow: "Step 03",
    title: "What is your main career goal?",
    helper: "We use this to align hiring partner criteria and fee terms.",
  },
  4: {
    eyebrow: "Step 04",
    title: "How do you want to learn?",
    helper: "On-campus lab immersion or live interactive hybrid tracks.",
  },
};

const TOTAL_STEPS = 4;
const RESULTS_STEP = 5;

/** The visible question heading names each radiogroup. */
const QUESTION_TITLE_ID = "course-finder-question-title";

const DEFAULT_CRITERIA: RecommendationCriteria = {
  educationLevel: "graduate",
  interest: "web",
  careerGoal: "job",
  preferredMode: "any",
};

const KIDS_CRITERIA: RecommendationCriteria = {
  educationLevel: "school",
  interest: "web",
  careerGoal: "kids",
  preferredMode: "any",
};

/* ---------------------------------------------------------------------------
   Option grid — a keyboard-operable radiogroup of big, tappable cards.
   --------------------------------------------------------------------------- */

interface OptionGridProps<TValue extends string> {
  /** Id of the visible question heading that names this group. */
  labelledBy: string;
  options: QuizOption<TValue>[];
  selected?: TValue;
  onSelect: (value: TValue) => void;
  className?: string;
}

function OptionGrid<TValue extends string>({
  labelledBy,
  options,
  selected,
  onSelect,
  className,
}: OptionGridProps<TValue>) {
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const forward = event.key === "ArrowRight" || event.key === "ArrowDown";
    const backward = event.key === "ArrowLeft" || event.key === "ArrowUp";
    if (!forward && !backward) return;

    const items = itemRefs.current.slice(0, options.length);
    const currentIndex = items.findIndex(
      (el) => el !== null && el === document.activeElement
    );
    if (currentIndex === -1) return;

    event.preventDefault();
    const nextIndex =
      (currentIndex + (forward ? 1 : -1) + options.length) % options.length;
    items[nextIndex]?.focus();
  };

  return (
    <div
      role="radiogroup"
      aria-labelledby={labelledBy}
      onKeyDown={handleKeyDown}
      className={cn("grid gap-3", className)}
    >
      {options.map((option, index) => {
        const Icon = option.icon;
        const isSelected = selected === option.value;

        return (
          <button
            key={option.value}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => onSelect(option.value)}
            className={cn(
              "group relative flex h-full flex-col gap-2.5 rounded-2xl border p-4 text-left font-heading transition-all cursor-pointer",
              "bg-white dark:bg-[#111A2E] shadow-xs hover:-translate-y-0.5 hover:shadow-sm",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F8FAFC] dark:focus-visible:ring-offset-[#080C17]",
              isSelected
                ? "border-indigo-500 ring-2 ring-indigo-500/25"
                : "border-slate-200/80 dark:border-white/10 hover:border-indigo-500/60 dark:hover:border-indigo-500/60"
            )}
          >
            <span className="flex items-start justify-between gap-2">
              <span
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-transform group-hover:scale-105",
                  isSelected
                    ? "bg-indigo-600 border-indigo-600 text-white"
                    : "bg-indigo-50 dark:bg-indigo-950/60 border-indigo-200/60 dark:border-indigo-800/50 text-indigo-600 dark:text-indigo-400"
                )}
                aria-hidden="true"
              >
                <Icon className="h-5 w-5" />
              </span>

              <span className="flex items-center gap-1.5">
                {option.badge && (
                  <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
                    {option.badge}
                  </span>
                )}
                {isSelected && (
                  <span
                    className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-white"
                    aria-hidden="true"
                  >
                    <Check className="h-3 w-3 stroke-[3]" />
                  </span>
                )}
              </span>
            </span>

            <span className="block text-sm font-bold leading-snug text-slate-900 dark:text-white sm:text-[15px]">
              {option.title}
            </span>

            <span className="block text-xs leading-relaxed font-body text-slate-500 dark:text-slate-400">
              {option.desc}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Quiz
   --------------------------------------------------------------------------- */

const stepVariants: Variants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction >= 0 ? 32 : -32,
  }),
  center: { opacity: 1, x: 0 },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction >= 0 ? -32 : 32,
  }),
};

export const CourseFinderQuiz: React.FC = () => {
  const { openEnroll } = useEnrollModal();
  const shouldReduceMotion = useReducedMotion();

  const [step, setStep] = useState<number>(1);
  const [direction, setDirection] = useState<number>(1);
  const [answers, setAnswers] = useState<Partial<RecommendationCriteria>>({});
  const [results, setResults] = useState<RecommendedCourse[]>([]);

  const isResults = step === RESULTS_STEP;
  const completedSteps = Math.min(step - 1, TOTAL_STEPS);
  const percent = isResults
    ? 100
    : Math.round((completedSteps / TOTAL_STEPS) * 100);

  const stepCopy = !isResults ? STEP_COPY[step as 1 | 2 | 3 | 4] : null;

  const advance = (nextStep: number) => {
    setDirection(1);
    setStep(nextStep);
  };

  const handleBack = () => {
    setDirection(-1);
    setStep((prev) => Math.max(1, prev - 1));
  };

  const handleRestart = () => {
    setDirection(-1);
    setStep(1);
    setAnswers({});
    setResults([]);
  };

  const handleEducation = (value: RecommendationCriteria["educationLevel"]) => {
    // Mirrors the in-chat wizard: kids short-circuit straight to the result.
    if (value === "school") {
      // Only the background is a real answer here, so the recap stays honest
      // while the engine still receives the full kids criteria.
      setAnswers({ educationLevel: value });
      setResults(rankCourses(KIDS_CRITERIA));
      advance(RESULTS_STEP);
      return;
    }
    setAnswers((prev) => ({ ...prev, educationLevel: value }));
    advance(2);
  };

  const handleInterest = (value: RecommendationCriteria["interest"]) => {
    setAnswers((prev) => ({ ...prev, interest: value }));
    advance(3);
  };

  const handleGoal = (value: RecommendationCriteria["careerGoal"]) => {
    setAnswers((prev) => ({ ...prev, careerGoal: value }));
    advance(4);
  };

  const handleMode = (value: RecommendationCriteria["preferredMode"]) => {
    const criteria: RecommendationCriteria = {
      educationLevel: answers.educationLevel ?? DEFAULT_CRITERIA.educationLevel,
      interest: answers.interest ?? DEFAULT_CRITERIA.interest,
      careerGoal: answers.careerGoal ?? DEFAULT_CRITERIA.careerGoal,
      preferredMode: value,
    };
    setAnswers(criteria);
    setResults(rankCourses(criteria));
    advance(RESULTS_STEP);
  };

  const recap = useMemo<string[]>(() => {
    const labels = [
      EDUCATION_OPTIONS.find((o) => o.value === answers.educationLevel)?.title,
      INTEREST_OPTIONS.find((o) => o.value === answers.interest)?.title,
      GOAL_OPTIONS.find((o) => o.value === answers.careerGoal)?.title,
      MODE_OPTIONS.find((o) => o.value === answers.preferredMode)?.title,
    ];
    return labels.filter((label): label is string => Boolean(label));
  }, [answers]);

  const compareHref = `/compare?courses=${results
    .map((item) => item.course.slug)
    .join(",")}`;
  const topCourse = results[0];

  const liveMessage = isResults
    ? `Results ready. Showing your top ${results.length} ${
        results.length === 1 ? "program" : "programs"
      }.`
    : `Step ${step} of ${TOTAL_STEPS}. ${stepCopy?.title ?? ""}`;

  /* ----------------------------- step bodies ----------------------------- */

  const renderStep = () => {
    if (step === 1) {
      return (
        <OptionGrid
          labelledBy={QUESTION_TITLE_ID}
          options={EDUCATION_OPTIONS}
          selected={answers.educationLevel}
          onSelect={handleEducation}
          className="sm:grid-cols-2"
        />
      );
    }

    if (step === 2) {
      return (
        <OptionGrid
          labelledBy={QUESTION_TITLE_ID}
          options={INTEREST_OPTIONS}
          selected={answers.interest}
          onSelect={handleInterest}
          className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        />
      );
    }

    if (step === 3) {
      return (
        <OptionGrid
          labelledBy={QUESTION_TITLE_ID}
          options={GOAL_OPTIONS}
          selected={answers.careerGoal}
          onSelect={handleGoal}
          className="sm:grid-cols-2"
        />
      );
    }

    if (step === 4) {
      return (
        <OptionGrid
          labelledBy={QUESTION_TITLE_ID}
          options={MODE_OPTIONS}
          selected={answers.preferredMode}
          onSelect={handleMode}
          className="sm:grid-cols-3"
        />
      );
    }

    return renderResults();
  };

  /* ------------------------------- results ------------------------------- */

  const renderResults = () => (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Your personalised result"
        title={
          results.length === 1
            ? "Your recommended program"
            : "Your top 3 program matches"
        }
        subtitle="Ranked from Karka's 26 verified programs using your background, interest, goal and preferred format."
        align="left"
      />

      <div className="space-y-5">
        {results.map((item, index) => {
          const isTop = index === 0;

          return (
            <article
              key={item.course.slug}
              className={cn(
                "overflow-hidden rounded-3xl border bg-white shadow-sm transition-shadow hover:shadow-lg dark:bg-[#111A2E]",
                isTop
                  ? "border-indigo-500/60 ring-2 ring-indigo-500/20 dark:border-indigo-500/60"
                  : "border-slate-200/80 dark:border-white/10"
              )}
            >
              <div className="grid sm:grid-cols-[minmax(0,15rem)_1fr]">
                {/* Course visual */}
                <div className="relative aspect-[16/10] w-full bg-slate-100 dark:bg-slate-900 sm:aspect-auto sm:min-h-[15rem]">
                  <Image
                    src={getCourseImage(item.course.slug)}
                    alt={item.course.title}
                    fill
                    sizes="(min-width: 640px) 15rem, 100vw"
                    className="object-cover"
                    priority={isTop}
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent"
                    aria-hidden="true"
                  />

                  {isTop && (
                    <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-indigo-600 px-2.5 py-1 text-[10px] font-heading font-bold uppercase tracking-wider text-white shadow-sm">
                      <Trophy className="h-3 w-3" aria-hidden="true" />
                      <span>Top recommendation</span>
                    </span>
                  )}

                  <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-lg bg-black/55 px-2.5 py-1 text-[11px] font-heading font-bold text-white backdrop-blur-md">
                    <Wallet className="h-3.5 w-3.5 text-emerald-300" aria-hidden="true" />
                    <span>₹0 Upfront</span>
                  </span>
                </div>

                {/* Course detail */}
                <div className="space-y-4 p-5 sm:p-6">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="space-y-2">
                      <span className="inline-flex items-center rounded-full border border-indigo-200/60 bg-indigo-50 px-2.5 py-0.5 text-[10px] font-heading font-bold uppercase tracking-wider text-indigo-700 dark:border-indigo-800/50 dark:bg-indigo-950/60 dark:text-indigo-300">
                        {item.categoryName}
                      </span>
                      <h3 className="text-lg font-extrabold leading-tight text-slate-900 font-heading dark:text-white sm:text-xl">
                        {item.course.title}
                      </h3>
                    </div>

                    <div className="shrink-0 text-right">
                      <p className="font-mono text-2xl font-black leading-none text-indigo-600 dark:text-indigo-400">
                        {item.matchScore}%
                      </p>
                      <p className="mt-1 text-[10px] font-heading font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Match
                      </p>
                    </div>
                  </div>

                  <div
                    className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-white/10"
                    role="presentation"
                  >
                    <div
                      className="h-full rounded-full bg-indigo-600 dark:bg-indigo-500"
                      style={{ width: `${item.matchScore}%` }}
                    />
                  </div>

                  <div className="rounded-xl border border-slate-200/60 bg-slate-50 p-3 text-xs leading-relaxed text-slate-600 font-body dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-300">
                    <strong className="mb-0.5 block font-heading text-slate-900 dark:text-white">
                      Why this fits you
                    </strong>
                    {item.matchReason}
                  </div>

                  <dl className="grid grid-cols-1 gap-2 text-xs font-heading sm:grid-cols-3">
                    <div className="flex items-center gap-1.5">
                      <Clock
                        className="h-3.5 w-3.5 shrink-0 text-indigo-600 dark:text-indigo-400"
                        aria-hidden="true"
                      />
                      <dt className="sr-only">Duration</dt>
                      <dd className="font-semibold text-slate-700 dark:text-slate-300">
                        {item.verifiedDuration}
                      </dd>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Layers
                        className="h-3.5 w-3.5 shrink-0 text-indigo-600 dark:text-indigo-400"
                        aria-hidden="true"
                      />
                      <dt className="sr-only">Level</dt>
                      <dd className="font-semibold text-slate-700 dark:text-slate-300">
                        {item.verifiedLevel}
                      </dd>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Globe
                        className="h-3.5 w-3.5 shrink-0 text-indigo-600 dark:text-indigo-400"
                        aria-hidden="true"
                      />
                      <dt className="sr-only">Mode</dt>
                      <dd className="font-semibold text-slate-700 dark:text-slate-300">
                        {item.verifiedMode}
                      </dd>
                    </div>
                  </dl>

                  <div className="flex flex-col gap-2.5 pt-1 font-heading sm:flex-row">
                    <Link
                      href={`/courses/${item.course.slug}`}
                      className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-100 px-4 py-2.5 text-sm font-bold text-slate-800 transition-colors hover:bg-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:focus-visible:ring-offset-[#111A2E]"
                    >
                      <span>View Full Syllabus</span>
                    </Link>

                    <button
                      type="button"
                      onClick={() => openEnroll(item.course.title)}
                      className="inline-flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#111A2E]"
                    >
                      <span>Apply Now</span>
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Next actions */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-white/10 dark:bg-[#111A2E] sm:p-6">
        <h3 className="text-base font-extrabold text-slate-900 font-heading dark:text-white">
          Still deciding?
        </h3>
        <p className="mt-1 text-sm text-slate-600 font-body dark:text-slate-400">
          Put your matches side by side, or get a straight answer from an
          admissions advisor.
        </p>

        <div className="mt-4 flex flex-col gap-2.5 font-heading sm:flex-row sm:flex-wrap">
          {results.length > 1 && (
            <Link
              href={compareHref}
              className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-100 px-4 py-2.5 text-sm font-bold text-slate-800 transition-colors hover:bg-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:focus-visible:ring-offset-[#111A2E]"
            >
              <Columns className="h-4 w-4" aria-hidden="true" />
              <span>Compare these {results.length} programs</span>
            </Link>
          )}

          {topCourse && (
            <a
              href={SITE_CONFIG.whatsappCourseLink(topCourse.course.title)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm font-bold text-emerald-700 transition-colors hover:bg-emerald-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-400 dark:hover:bg-emerald-950/70 dark:focus-visible:ring-offset-[#111A2E]"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              <span>Talk to an advisor on WhatsApp</span>
            </a>
          )}

          <button
            type="button"
            onClick={handleRestart}
            className="inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-500 transition-colors hover:text-indigo-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:text-slate-400 dark:hover:text-indigo-400 dark:focus-visible:ring-offset-[#111A2E]"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            <span>Start over</span>
          </button>
        </div>
      </div>
    </div>
  );

  /* -------------------------------- render ------------------------------- */

  return (
    <section className="w-full bg-[#F8FAFC] py-16 dark:bg-[#080C17] sm:py-20">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#0B1120] sm:p-7 lg:p-8">
          {/* Progress */}
          <div className="space-y-3">
            <div className="flex items-end justify-between gap-3">
              <div>
                <p className="text-[11px] font-heading font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  {isResults
                    ? "Assessment complete"
                    : `Step ${step} of ${TOTAL_STEPS}`}
                </p>
                {!isResults && (
                  <>
                    <h2
                      id={QUESTION_TITLE_ID}
                      className="mt-1 text-lg font-black leading-tight text-slate-900 font-heading dark:text-white sm:text-xl"
                    >
                      {stepCopy?.title}
                    </h2>
                    <p className="mt-1 text-sm text-slate-600 font-body dark:text-slate-400">
                      {stepCopy?.helper}
                    </p>
                  </>
                )}
              </div>

              <p className="shrink-0 font-mono text-sm font-bold text-slate-900 dark:text-white">
                {percent}%
                <span className="sr-only"> complete</span>
              </p>
            </div>

            <div
              role="progressbar"
              aria-label="Course finder progress"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={percent}
              className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-white/10"
            >
              {shouldReduceMotion ? (
                <div
                  className="h-full rounded-full bg-indigo-600 dark:bg-indigo-500"
                  style={{ width: `${Math.max(percent, 4)}%` }}
                />
              ) : (
                <motion.div
                  className="h-full rounded-full bg-indigo-600 dark:bg-indigo-500"
                  initial={false}
                  animate={{ width: `${Math.max(percent, 4)}%` }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                />
              )}
            </div>

            <ol className="flex flex-wrap items-center gap-2 font-heading">
              {([1, 2, 3, 4] as const).map((index) => {
                const done = index < step;
                const current = index === step;

                return (
                  <li
                    key={index}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-bold transition-colors",
                      done
                        ? "border-indigo-200/80 bg-indigo-50 text-indigo-700 dark:border-indigo-800/50 dark:bg-indigo-950/60 dark:text-indigo-300"
                        : current
                        ? "border-indigo-500 bg-white text-slate-900 dark:bg-[#111A2E] dark:text-white"
                        : "border-slate-200/80 bg-white text-slate-400 dark:border-white/10 dark:bg-[#111A2E] dark:text-slate-500"
                    )}
                  >
                    {done ? (
                      <Check className="h-3 w-3 stroke-[3]" aria-hidden="true" />
                    ) : (
                      <span className="font-mono">{index}</span>
                    )}
                    <span>{STEP_COPY[index].eyebrow.replace("Step 0", "Q")}</span>
                  </li>
                );
              })}
            </ol>

            {isResults && recap.length > 0 && (
              <div className="pt-1">
                <p className="text-[11px] font-heading font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Based on your answers
                </p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {recap.map((label) => (
                    <li
                      key={label}
                      className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/80 bg-white px-3 py-1 text-xs font-heading font-semibold text-slate-600 shadow-xs dark:border-white/10 dark:bg-[#111A2E] dark:text-slate-300"
                    >
                      <Check
                        className="h-3 w-3 text-indigo-600 dark:text-indigo-400"
                        aria-hidden="true"
                      />
                      <span>{label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <p aria-live="polite" className="sr-only">
            {liveMessage}
          </p>

          {/* Back control */}
          {!isResults && step > 1 && (
            <div className="mt-5">
              <button
                type="button"
                onClick={handleBack}
                aria-label="Go back to the previous question"
                className="inline-flex cursor-pointer items-center gap-1 rounded-lg px-2 py-1 text-xs font-heading font-bold text-slate-500 transition-colors hover:text-indigo-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:text-slate-400 dark:hover:text-indigo-400 dark:focus-visible:ring-offset-[#0B1120]"
              >
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                <span>Back</span>
              </button>
            </div>
          )}

          {/* Step body */}
          <div className="mt-6">
            {shouldReduceMotion ? (
              <div key={step}>{renderStep()}</div>
            ) : (
              <AnimatePresence mode="wait" initial={false} custom={direction}>
                <motion.div
                  key={step}
                  custom={direction}
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  {renderStep()}
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </div>

        {!isResults && (
          <p className="mt-4 text-center text-xs text-slate-500 font-body dark:text-slate-400">
            Four questions, about 60 seconds. Your answers stay in this browser
            tab.
          </p>
        )}
      </div>
    </section>
  );
};
