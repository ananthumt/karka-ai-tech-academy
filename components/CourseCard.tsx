import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, Clock, Globe, ArrowRight, Sparkles, Users } from "lucide-react";

interface CourseCardProps {
  slug: string;
  title: string;
  duration?: string;
  mode?: string;
  image?: string;
  desc?: string;
  enrollments?: string;
  rating?: string;
  ratingCount?: string;
  tag?: string;
  onEnroll?: (courseTitle: string) => void;
  showEnrollBtn?: boolean;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  slug,
  title,
  duration = "6 Months",
  mode = "Online",
  image = "/assets/fullstack.webp",
  desc,
  enrollments,
  rating = "4.8",
  ratingCount = "200 ratings",
  tag,
  onEnroll,
  showEnrollBtn = false,
}) => {
  return (
    <div className="surface surface-hover group flex flex-col h-full rounded-3xl overflow-hidden">
      {/* Course Image & Badges */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 dark:bg-slate-900">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 400px"
          className="object-cover transition-transform duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
        />
        {/* Two-stop scrim: deeper at the base for pill legibility, with a
            faint indigo wash on hover so the card feels lit rather than dimmed. */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-tr from-indigo-600/0 via-indigo-600/0 to-violet-500/0 group-hover:from-indigo-600/20 group-hover:to-violet-500/10 transition-all duration-500"
          aria-hidden="true"
        />

        {/* Bootcamp Tag if present */}
        {tag && (
          <div className="absolute top-3 left-3 surface-glass text-indigo-700 dark:text-indigo-200 text-[10px] font-mono font-bold uppercase tracking-[0.14em] px-2.5 py-1 rounded-full">
            {tag}
          </div>
        )}

        {/* Bottom image overlay meta */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-semibold">
          <span className="flex items-center gap-1.5 bg-black/45 backdrop-blur-md ring-1 ring-white/10 px-2.5 py-1 rounded-lg">
            <Clock className="w-3.5 h-3.5 text-indigo-300" aria-hidden="true" />
            <span className="tnum">{duration}</span>
          </span>
          <span className="flex items-center gap-1.5 bg-black/45 backdrop-blur-md ring-1 ring-white/10 px-2.5 py-1 rounded-lg">
            <Globe className="w-3.5 h-3.5 text-slate-300" aria-hidden="true" />
            <span>{mode}</span>
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Rating and Avatars row if provided */}
          {enrollments && (
            <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-white/10 text-xs">
              {/* Verified Learner Cohort Pill */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-100 dark:border-indigo-800/50 text-indigo-700 dark:text-indigo-300">
                <Users className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                <span className="font-heading font-bold text-[11px]">{enrollments} Enrolled</span>
              </div>

              {/* Star rating */}
              <div className="flex items-center gap-1 text-amber-500 font-bold">
                <div className="flex items-center">
                  {[...Array(4)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                  <Star className="w-3.5 h-3.5 text-amber-400" />
                </div>
                <span className="text-slate-700 dark:text-slate-200 ml-1 font-heading">
                  {rating}
                </span>
                <span className="text-[10px] text-slate-400 hidden sm:inline">
                  ({ratingCount})
                </span>
              </div>
            </div>
          )}

          {/* Title */}
          <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors font-heading leading-snug">
            {title}
          </h3>

          {/* Description if present */}
          {desc && (
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed font-body">
              {desc}
            </p>
          )}

          {/* Batch Status */}
          <div className="mt-3 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 font-body">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
            <span>Batch Status: <strong className="text-slate-700 dark:text-slate-300">Admissions Open</strong></span>
          </div>
        </div>

        {/* Card Action */}
        <div className="pt-2">
          <Link
            href={`/courses/${slug}`}
            className="shine w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white text-sm font-heading font-bold transition-all elev-2 hover:elev-3 focus:outline-none group/btn"
          >
            <span>View Syllabus &amp; Career Path</span>
            <ArrowRight
              className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};
