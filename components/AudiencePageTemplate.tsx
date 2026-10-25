"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import { COURSES, getCourseImage } from "@/content/site";
import { CourseCard } from "@/components/CourseCard";
import { CtaBand } from "@/components/CtaBand";
import { useEnrollModal } from "@/components/EnrollContext";

interface AudiencePageTemplateProps {
  eyebrow: string;
  title: string;
  description?: string;
  badges: string[];
  image: string;
}

export const AudiencePageTemplate: React.FC<AudiencePageTemplateProps> = ({
  eyebrow,
  title,
  description,
  badges,
  image,
}) => {
  const { openEnroll } = useEnrollModal();
  const allCourses = Object.values(COURSES);

  // Group into categories
  const categories = [
    {
      title: "Coding & Development",
      categorySlug: "coding",
      courses: allCourses.filter((c) =>
        ["mern-fullstack", "react-java-fullstack", "react-python-fullstack"].includes(c.slug)
      ),
    },
    {
      title: "Generative AI",
      categorySlug: "gen-ai",
      courses: allCourses.filter((c) =>
        ["genai-foundations", "genai-mastery", "genai-llm-developer"].includes(c.slug)
      ),
    },
    {
      title: "Data Science & AI",
      categorySlug: "data",
      courses: allCourses.filter((c) =>
        ["ai-data-science", "data-analytics-ai", "data-engineering"].includes(c.slug)
      ),
    },
    {
      title: "UI/UX & Design",
      categorySlug: "design",
      courses: allCourses.filter((c) =>
        ["ui-ux-design", "web-designing", "graphic-designing"].includes(c.slug)
      ),
    },
    {
      title: "Digital Media & Animation",
      categorySlug: "digital-media",
      courses: allCourses.filter((c) =>
        ["video-editing", "graphic-designing-dm", "multimedia-animation"].includes(c.slug)
      ),
    },
    {
      title: "Content & Digital Marketing",
      categorySlug: "content-marketing",
      courses: allCourses.filter((c) =>
        ["digital-marketing", "seo-analyst", "storytelling-content-writing"].includes(c.slug)
      ),
    },
    {
      title: "Advanced Tech & DevOps",
      categorySlug: "other-tech",
      courses: allCourses.filter((c) =>
        ["cloud-devops", "automation-testing", "mobile-app-development"].includes(c.slug)
      ),
    },
    {
      title: "Business & Management",
      categorySlug: "business",
      courses: allCourses.filter((c) =>
        ["hr-finance", "tally", "business-analyst"].includes(c.slug)
      ),
    },
  ];

  return (
    <div className="w-full flex flex-col">
      {/* Hero Section */}
      <section className="pt-20 pb-20 bg-[#F8FAFC] dark:bg-[#0C1230] text-slate-900 dark:text-white border-b border-slate-200/80 dark:border-white/5 transition-colors relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-ultramarine/10 dark:bg-ultramarine/25 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-mint/10 dark:bg-mint/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-white/10 text-emerald-700 dark:text-mint text-xs font-bold uppercase tracking-wider border border-slate-200 dark:border-white/15">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{eyebrow}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-heading tracking-tight leading-tight text-slate-900 dark:text-white">
                {title}
              </h1>

              {description && (
                <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
                  {description}
                </p>
              )}

              {/* Badges */}
              <div className="flex flex-wrap gap-2.5 pt-2">
                {badges.map((b, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white dark:bg-white/10 border border-slate-200/80 dark:border-white/15 text-xs font-semibold text-slate-700 dark:text-slate-200 shadow-sm backdrop-blur-md"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-mint" />
                    <span>{b}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Right Audience Photo (5 cols) */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md aspect-[4/3] rounded-3xl overflow-hidden border border-slate-200/80 dark:border-white/20 shadow-2xl group">
                <Image
                  src={image}
                  alt={title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 560px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl bg-white/95 dark:bg-[#0B1120]/95 backdrop-blur-md text-slate-900 dark:text-white text-xs font-bold shadow text-center border border-slate-200/60 dark:border-white/10">
                  Tailored Curricula for {eyebrow.replace("For ", "")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Course Rows */}
      <section className="py-20 lg:py-28 bg-[#F5F6FB] dark:bg-[#090D1A] transition-colors space-y-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl space-y-20">
          {categories.map((cat) => (
            <div key={cat.categorySlug} className="space-y-8">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200/60 dark:border-white/10">
                <h2 className="text-2xl sm:text-3xl font-black font-heading text-slate-900 dark:text-white">
                  {cat.title}
                </h2>
                <Link
                  href={`/courses/category/${cat.categorySlug}`}
                  className="inline-flex items-center gap-1 text-sm font-bold text-ultramarine dark:text-mint hover:underline"
                >
                  <span>View All</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {cat.courses.map((c) => (
                  <CourseCard
                    key={c.slug}
                    slug={c.slug}
                    title={c.title}
                    duration={c.details?.duration || "6 Months"}
                    mode={c.details?.mode || "Online"}
                    desc={c.heroDesc}
                    image={getCourseImage(c.slug)}
                    showEnrollBtn={true}
                    onEnroll={(t) => openEnroll(t)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Global CTA Band */}
      <CtaBand onOpenEnroll={() => openEnroll()} />
    </div>
  );
};
