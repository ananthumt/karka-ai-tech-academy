"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ChevronRight,
  CheckCircle2,
  Clock,
  Globe,
  BookOpen,
  Award,
  Users,
  Sparkles,
  PhoneCall,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  Check,
  ChevronDown,
  Layers,
  MapPin,
  Laptop,
  GraduationCap,
  Briefcase,
  Code,
  FolderGit2,
  Calendar,
} from "lucide-react";
import {
  COURSES,
  CATEGORIES_CONFIG,
  SITE_CONFIG,
  getCourseImage,
} from "@/content/site";
import { ComparisonTable, ComparisonRow } from "@/components/ComparisonTable";
import { FaqAccordion } from "@/components/FaqAccordion";
import { CourseCard } from "@/components/CourseCard";
import { CtaBand } from "@/components/CtaBand";
import { useEnrollModal } from "@/components/EnrollContext";
// Previously this file declared its own private copy of the slug → category
// map, a fourth duplicate of the same table. It now shares the one in
// lib/recommendation so the wizard, compare tool and this page cannot drift.
import { COURSE_CATEGORY_MAP } from "@/lib/recommendation";

interface CourseDetailViewProps {
  /** Validated by the server page before this component renders. */
  slug: string;
}

/**
 * Interactive course detail body.
 *
 * Split out of `app/courses/[slug]/page.tsx` so that route can be a server
 * component and export `generateMetadata` / `generateStaticParams`. All 26
 * course pages previously shipped with no title, description or OG tags.
 */
export default function CourseDetailView({ slug }: CourseDetailViewProps) {
  const { openEnroll } = useEnrollModal();
  const course = COURSES[slug];

  // Accordion state
  const [openModule, setOpenModule] = useState<number | null>(0);
  const [allExpanded, setAllExpanded] = useState<boolean>(false);

  // The server page already called notFound() for unknown slugs; this is a
  // type guard so the rest of the component can treat `course` as defined.
  if (!course) return null;

  const categorySlug = COURSE_CATEGORY_MAP[slug] || "coding";
  const categoryMeta = CATEGORIES_CONFIG.find((cat) => cat.slug === categorySlug);
  const categoryName = categoryMeta?.name || "Professional Bootcamp";

  // Related courses (3 other courses from the same category or overall catalog)
  const relatedCourses = useMemo(() => {
    const sameCategory = Object.values(COURSES).filter(
      (c) => c.slug !== slug && (COURSE_CATEGORY_MAP[c.slug] === categorySlug)
    );
    if (sameCategory.length >= 3) {
      return sameCategory.slice(0, 3);
    }
    const others = Object.values(COURSES).filter(
      (c) => c.slug !== slug && !sameCategory.some((sc) => sc.slug === c.slug)
    );
    return [...sameCategory, ...others].slice(0, 3);
  }, [slug, categorySlug]);

  // Verified Admission steps
  const admissionSteps = [
    {
      step: "01",
      title: "Free Profile & Skill Evaluation",
      desc: "Submit your basic profile and take our foundational aptitude check. No prior programming background required.",
    },
    {
      step: "02",
      title: "1-on-1 Academic Counseling",
      desc: "Discuss career ambitions, batch timings, and in-person lab access with an academic advisor at our Nagercoil center.",
    },
    {
      step: "03",
      title: "₹0 Upfront Onboarding",
      desc: "Begin your rigorous bootcamp training with zero tuition down. The flat ₹40,000 fee applies strictly under Step 8 after placement.",
    },
  ];

  // Comparison Rows
  const comparisonRows: ComparisonRow[] = [
    {
      feature: "Upfront Tuition",
      karka: "₹0 Upfront (Pay After Placement)",
      others: "₹50,000 – ₹1,50,000 upfront",
    },
    {
      feature: "Curriculum Standard",
      karka: "AI-Native & Industry CTO-Curated",
      others: "Outdated slide decks & syntax",
    },
    {
      feature: "Mentorship",
      karka: "Daily 1-on-1 In-Person Guidance",
      others: "Crowded generic webinars",
    },
    {
      feature: "Hands-on Incubation",
      karka: "Live Client Projects at Agile Tribers",
      others: "Toy sandbox examples only",
    },
    {
      feature: "Placement Commitment",
      karka: "100% Lifetime Learn Till Placed Support",
      others: "Self-serve links / Limited calls",
    },
    {
      feature: "Campus Facilities",
      karka: "High-Speed Tech Lab Studio in Nagercoil",
      others: "Remote-only with zero lab access",
    },
  ];

  const toggleAllModules = () => {
    setAllExpanded(!allExpanded);
  };

  return (
    <div className="w-full flex flex-col min-h-screen">
      {/* 1. HERO SECTION (Editorial Authority & Plus Jakarta Sans) */}
      <section className="relative pt-10 pb-14 sm:pt-14 sm:pb-18 lg:pt-16 lg:pb-20 bg-slate-50/80 dark:bg-[#070B14] text-slate-900 dark:text-white border-b border-slate-200/80 dark:border-white/10 transition-colors overflow-hidden">
        {/* Ambient Gradient Glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 45% at 50% -10%, rgba(99, 102, 241, 0.08), transparent 70%), radial-gradient(ellipse 45% 35% at 85% 15%, rgba(139, 92, 246, 0.06), transparent 70%)",
          }}
          aria-hidden="true"
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          {/* Breadcrumb Bar */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-heading font-semibold text-slate-500 dark:text-slate-400 mb-6 flex-wrap">
            <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link href="/courses" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Courses
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link
              href={`/courses/category/${categorySlug}`}
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              {categoryName}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-900 dark:text-white font-bold truncate max-w-xs">
              {course.title}
            </span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Header Column (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Category & Status Pills */}
              <div className="flex flex-wrap items-center gap-2.5">
                <Link
                  href={`/courses/category/${categorySlug}`}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider border border-indigo-200/60 dark:border-indigo-800/50 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition-colors font-heading"
                >
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                  <span>{categoryName}</span>
                </Link>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 text-xs font-bold border border-emerald-200/60 dark:border-emerald-800/50 font-heading">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Admissions Open · Nagercoil Studio</span>
                </div>
              </div>

              {/* Course Title */}
              <h1 className="text-3xl sm:text-5xl lg:text-[3.2rem] font-extrabold font-heading tracking-tight text-slate-900 dark:text-white leading-[1.12]">
                {course.title}
              </h1>

              {/* Subtitle / Hero Desc */}
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-body">
                {course.heroDesc}
              </p>

              {/* Key Trust Highlights Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-white dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10 shadow-xs">
                  <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase font-heading">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Tuition Model</span>
                  </div>
                  <p className="text-sm font-extrabold text-slate-900 dark:text-white font-heading mt-1">
                    ₹0 Upfront
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-body">
                    Flat ₹40k fee only after job
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10 shadow-xs">
                  <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase font-heading">
                    <FolderGit2 className="w-4 h-4" />
                    <span>Live Incubation</span>
                  </div>
                  <p className="text-sm font-extrabold text-slate-900 dark:text-white font-heading mt-1">
                    Agile Tribers
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-body">
                    Real client code &amp; GitHub
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10 shadow-xs">
                  <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase font-heading">
                    <GraduationCap className="w-4 h-4" />
                    <span>Placement</span>
                  </div>
                  <p className="text-sm font-extrabold text-slate-900 dark:text-white font-heading mt-1">
                    100% Support
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-body">
                    Learn Till Job Placement
                  </p>
                </div>
              </div>

              {/* Dual Action CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 font-heading">
                <button
                  type="button"
                  onClick={() => openEnroll(course.title)}
                  className="px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-base shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.99]"
                >
                  <span>Apply with ₹0 Upfront Tuition</span>
                  <ArrowRight className="w-5 h-5 stroke-[2.5]" />
                </button>

                <a
                  href="#curriculum"
                  className="px-6 py-4 rounded-xl bg-white hover:bg-slate-50 dark:bg-white/10 dark:hover:bg-white/15 text-slate-800 dark:text-white font-bold text-base border border-slate-200 dark:border-white/15 flex items-center justify-center gap-2 transition-all shadow-xs"
                >
                  <span>View Detailed Syllabus</span>
                </a>
              </div>
            </div>

            {/* Right Column: Course Specifications Quick Card (5 cols) */}
            <div className="lg:col-span-5 w-full">
              <div className="rounded-2xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-white/10 shadow-xl p-6 sm:p-8 space-y-6">
                {/* Course Thumbnail Image */}
                <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-slate-900 border border-slate-200/80 dark:border-white/10">
                  <Image
                    src={getCourseImage(slug)}
                    alt={`${course.title} curriculum at Karka Academy`}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 500px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-heading font-bold">
                    <span className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md">
                      {course.details?.duration || "6 Months"}
                    </span>
                    <span className="bg-indigo-600 px-2.5 py-1 rounded-md">
                      ₹0 Upfront
                    </span>
                  </div>
                </div>

                {/* Key Spec Grid */}
                <div className="grid grid-cols-2 gap-4 pb-2 border-b border-slate-100 dark:border-white/10 font-heading">
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                      Duration
                    </span>
                    <span className="text-base font-extrabold text-slate-900 dark:text-white">
                      {course.details?.duration || "6 Months"}
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block flex items-center gap-1">
                      <Globe className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                      Delivery Mode
                    </span>
                    <span className="text-base font-extrabold text-slate-900 dark:text-white">
                      {course.details?.mode || "Offline / Online"}
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block flex items-center gap-1">
                      <Layers className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                      Skill Level
                    </span>
                    <span className="text-base font-extrabold text-slate-900 dark:text-white">
                      {course.details?.level || "Beginner to Advanced"}
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                      Curriculum
                    </span>
                    <span className="text-base font-extrabold text-slate-900 dark:text-white">
                      {course.details?.lessons || "48 Lessons"}
                    </span>
                  </div>
                </div>

                {/* Studio Location & Guarantee Notice */}
                <div className="space-y-2 text-xs font-body text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-white/[0.02] p-3.5 rounded-xl border border-slate-200/60 dark:border-white/10">
                  <div className="flex items-center gap-2 font-heading font-bold text-slate-900 dark:text-white">
                    <MapPin className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                    <span>Karka Tech Studio · Nagercoil Campus</span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                    Daily in-person mentoring, high-speed workstations, collaborative coding spaces, and hybrid online options.
                  </p>
                </div>

                {/* Direct Action Buttons */}
                <div className="space-y-2.5 font-heading">
                  <button
                    type="button"
                    onClick={() => openEnroll(course.title)}
                    className="w-full py-3.5 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm uppercase tracking-wider shadow-md shadow-indigo-600/25 transition-all cursor-pointer"
                  >
                    Apply for Zero Upfront Seat
                  </button>

                  <a
                    href={SITE_CONFIG.whatsappCourseLink(course.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-6 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-800 dark:text-white font-bold text-xs flex items-center justify-center gap-2 border border-slate-200 dark:border-white/10 transition-all"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>Inquire via WhatsApp (+91 9487530243)</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PROGRAM OVERVIEW & VERIFIED LEARNING OUTCOMES */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-[#0B1120] transition-colors border-b border-slate-200/80 dark:border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl space-y-12">
          {/* Section Header */}
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="inline-block px-3.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider border border-indigo-200/60 dark:border-indigo-800/50 font-heading">
              In-Depth Overview
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-white">
              What You Will Master in This Program
            </h2>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-body">
              {course.overview}
            </p>
          </div>

          {/* 4 Why Learn Outcome Cards */}
          {course.whyLearn && course.whyLearn.length > 0 && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white">
                  Core Career Advantages
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {course.whyLearn.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-slate-50/70 dark:bg-[#111A2E] border border-slate-200/80 dark:border-white/10 shadow-xs space-y-3"
                  >
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/50 flex items-center justify-center font-black text-sm font-mono">
                      0{idx + 1}
                    </div>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white font-heading">
                      {item.title}
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-body">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 3. INTERACTIVE CURRICULUM SYLLABUS */}
      <section id="curriculum" className="py-16 sm:py-20 lg:py-24 bg-slate-50/70 dark:bg-[#070B14] transition-colors scroll-mt-20 border-b border-slate-200/80 dark:border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl space-y-10">
          {/* Header & Expand All Toggle */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200/80 dark:border-white/10 pb-6">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider border border-indigo-200/60 dark:border-indigo-800/50 font-heading mb-2">
                Detailed Syllabus
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-white">
                {course.title} Modules
              </h2>
            </div>

            <button
              type="button"
              onClick={toggleAllModules}
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline font-heading cursor-pointer shrink-0"
            >
              {allExpanded ? "Collapse All Modules" : "Expand All Modules"}
            </button>
          </div>

          {/* Module Accordion Items */}
          <div className="space-y-4">
            {course.curriculum &&
              course.curriculum.map((mod, idx) => {
                const isOpen = allExpanded || openModule === idx;
                return (
                  <div
                    key={idx}
                    className={`rounded-2xl border transition-all overflow-hidden ${
                      isOpen
                        ? "bg-white dark:bg-[#111A2E] border-indigo-500/40 shadow-md"
                        : "bg-white/80 dark:bg-white/5 border-slate-200/80 dark:border-white/10 hover:border-slate-300"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenModule(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between p-5 sm:p-6 text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                      aria-expanded={isOpen}
                    >
                      <div className="flex items-center gap-3.5 pr-4">
                        <span className={`w-8 h-8 rounded-xl text-xs font-mono font-bold flex items-center justify-center shrink-0 ${
                          isOpen
                            ? "bg-indigo-600 text-white"
                            : "bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300"
                        }`}>
                          {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                        </span>
                        <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white font-heading">
                          {mod.module}
                        </h3>
                      </div>

                      <ChevronDown
                        className={`w-5 h-5 text-slate-400 transition-transform duration-200 shrink-0 ${
                          isOpen ? "rotate-180 text-indigo-600 dark:text-indigo-400" : ""
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="px-5 sm:px-6 pb-6 pt-1 border-t border-slate-100 dark:border-white/10 font-body">
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 font-heading pl-11">
                          Core Concepts &amp; Practical Exercises:
                        </p>
                        <div className="flex flex-wrap gap-2 pl-11">
                          {mod.topics && mod.topics.length > 0 ? (
                            mod.topics.map((t, ti) => (
                              <span
                                key={ti}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200/70 dark:border-white/10 text-xs font-medium text-slate-800 dark:text-slate-200"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                                <span>{t}</span>
                              </span>
                            ))
                          ) : (
                            <span className="text-xs text-slate-500">
                              Comprehensive project modules, daily code reviews, and live sprint deployments.
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
          </div>

          {/* Syllabus Inquiry CTA */}
          <div className="p-6 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200/60 dark:border-indigo-800/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-white font-heading">
                Want a personalized breakdown of this curriculum?
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-body">
                Our mentors will walk you through daily schedules, milestone assignments, and project deliverables.
              </p>
            </div>
            <button
              type="button"
              onClick={() => openEnroll(`Syllabus Review: ${course.title}`)}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold font-heading shrink-0 cursor-pointer shadow-sm"
            >
              Request Syllabus Walkthrough
            </button>
          </div>
        </div>
      </section>

      {/* 4. REAL INCUBATION PROJECTS AT AGILE TRIBERS */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-[#0B1120] transition-colors border-b border-slate-200/80 dark:border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="p-8 sm:p-12 rounded-3xl bg-[#0B1120] text-white border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-8 space-y-4">
                <span className="inline-block px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold uppercase tracking-wider font-heading">
                  Real Production Experience
                </span>
                <h3 className="text-2xl sm:text-4xl font-extrabold font-heading leading-tight text-white">
                  Live Incubation at Agile Tribers
                </h3>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-body">
                  During this program, you will not build isolated toy projects. You will be incubated at our software development partner Agile Tribers, deploying live client code, contributing to code reviews, and creating a verified GitHub track record.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 font-heading text-xs font-bold">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span>Real-world client software deliverables</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span>Pull requests reviewed by senior tech leads</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span>Verified internship completion certificate</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span>Production deployment on modern clouds</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 p-6 rounded-2xl bg-white/5 border border-white/10 text-center space-y-2">
                <p className="text-3xl sm:text-4xl font-black text-indigo-400 font-heading">
                  100%
                </p>
                <p className="text-sm font-bold text-white font-heading">
                  Hands-On Project Work
                </p>
                <p className="text-xs text-slate-400 font-body">
                  Graduate with a production portfolio that stands out to recruiters
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE KARKA FOR THIS PROGRAM */}
      <section className="py-16 sm:py-20 lg:py-24 bg-slate-50/70 dark:bg-[#070B14] transition-colors border-b border-slate-200/80 dark:border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl space-y-12">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="inline-block px-3.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider border border-indigo-200/60 dark:border-indigo-800/50 font-heading">
              Institutional Commitment
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-white">
              Why Choose Karka for Your {course.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {course.whyChoose && course.whyChoose.length > 0 ? (
              course.whyChoose.map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-white/10 shadow-xs space-y-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/50 flex items-center justify-center font-black text-sm">
                    ✓
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white font-heading">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-body">
                    {item.desc}
                  </p>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center text-slate-400">
                100% Placement Assurance, Live Internships, and Industry CTO Mentorship.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 6. TRANSPARENT 3-STEP ADMISSION PROCESS */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-[#0B1120] transition-colors border-b border-slate-200/80 dark:border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl space-y-12">
          <div className="text-center space-y-3">
            <span className="inline-block px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider border border-indigo-200/60 dark:border-indigo-800/50 font-heading">
              Admissions Pathway
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-white">
              How to Enroll in {course.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {admissionSteps.map((st) => (
              <div
                key={st.step}
                className="p-8 rounded-2xl bg-slate-50 dark:bg-[#111A2E] border border-slate-200/80 dark:border-white/10 text-center space-y-3 shadow-xs"
              >
                <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white mx-auto flex items-center justify-center font-black font-mono text-base shadow-sm">
                  {st.step}
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading">
                  {st.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-body">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. COMPARISON TABLE */}
      <section className="py-16 sm:py-20 lg:py-24 bg-slate-50/70 dark:bg-[#070B14] transition-colors border-b border-slate-200/80 dark:border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <ComparisonTable
            title={`How Our ${course.title} Compares`}
            subtitle="Compare why students choose Karka's project-driven, Pay After Placement training over traditional institutes."
            colKarkaTitle="Karka AI & Tech Academy"
            colOthersTitle="Traditional Institutes"
            rows={comparisonRows}
          />
        </div>
      </section>

      {/* 8. ACADEMIC MENTORSHIP & FACULTY */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-[#0B1120] transition-colors border-b border-slate-200/80 dark:border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center space-y-8">
          <div className="space-y-3">
            <span className="inline-block px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider border border-indigo-200/60 dark:border-indigo-800/50 font-heading">
              Leadership &amp; Faculty
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-white">
              Learn Directly Under Proven Tech Leaders
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl mx-auto font-body">
              Every curriculum is curated and personally reviewed by senior software architects with global engineering backgrounds.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-slate-50 dark:bg-[#111A2E] border border-slate-200/80 dark:border-white/10 shadow-lg max-w-lg mx-auto flex flex-col items-center text-center">
            <div className="relative w-28 h-28 rounded-2xl overflow-hidden border-2 border-indigo-500/30 mb-4 bg-slate-900">
              <Image
                src="/assets/owner.webp"
                alt="Sateesh Kumar, Founder and Ex-CTO of Karka Academy"
                fill
                sizes="(max-width: 768px) 100vw, 320px"
                className="object-cover"
              />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white font-heading">
              Sateesh Kumar
            </h3>
            <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mt-1 font-heading">
              Founder &amp; Ex-CTO · 18+ Years Global Tech Experience
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 font-body max-w-sm leading-relaxed">
              Ex-CTO of Flow Global (UK Fintech), worked with Wipro &amp; Yatra.com. Personally mentors engineering cohorts in Nagercoil.
            </p>
          </div>
        </div>
      </section>

      {/* 9. CURATED RELATED COURSES */}
      {relatedCourses.length > 0 && (
        <section className="py-16 sm:py-20 lg:py-24 bg-slate-50/70 dark:bg-[#070B14] transition-colors border-b border-slate-200/80 dark:border-white/10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider font-heading">
                  Explore Related Pathways
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 dark:text-white mt-1">
                  Similar Programs in {categoryName}
                </h2>
              </div>

              <Link
                href="/courses"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline font-heading"
              >
                <span>View All 26 Programs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {relatedCourses.map((c) => {
                const catSlug = COURSE_CATEGORY_MAP[c.slug] || "coding";
                const cat = CATEGORIES_CONFIG.find((x) => x.slug === catSlug);
                return (
                  <CourseCard
                    key={c.slug}
                    slug={c.slug}
                    title={c.title}
                    tag={cat?.name}
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
          </div>
        </section>
      )}

      {/* 10. COURSE-SPECIFIC FAQS */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-[#0B1120] transition-colors border-b border-slate-200/80 dark:border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl space-y-10">
          <div className="text-center space-y-3">
            <span className="inline-block px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider border border-indigo-200/60 dark:border-indigo-800/50 font-heading">
              Frequently Asked Questions
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-white">
              Questions About {course.title}
            </h2>
          </div>

          <FaqAccordion
            items={course.faqs || []}
            showContactBox={false}
          />

          {/* Quick Support Callout */}
          <div className="p-8 rounded-2xl bg-slate-50 dark:bg-[#111A2E] border border-slate-200/80 dark:border-white/10 text-center space-y-4">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white font-heading">
              Have specific questions about this track?
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-body max-w-md mx-auto">
              Our academic counselors in Nagercoil are ready to answer any questions regarding batch timing, syllabus prerequisites, and contract terms.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2 font-heading">
              <button
                type="button"
                onClick={() => openEnroll(course.title)}
                className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer"
              >
                Request a Callback
              </button>

              <a
                href={SITE_CONFIG.whatsappCourseLink(course.title)}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 text-slate-800 dark:text-white font-bold text-xs flex items-center gap-2 border border-slate-200 dark:border-white/10 transition-all"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Chat on WhatsApp (+91 9487530243)</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 11. GLOBAL CTA BAND */}
      <CtaBand />
    </div>
  );
}
