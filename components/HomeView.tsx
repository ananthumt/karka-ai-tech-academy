"use client";

import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
// Only the icons actually rendered here. The hero's own icons, image,
// Counter, TextReveal and Parallax moved to components/HeroSection.
import { ArrowRight, Compass, Scale } from "lucide-react";
import { HOME_CONTENT } from "@/content/site";
import { SectionHeader } from "@/components/SectionHeader";
import { CourseCard } from "@/components/CourseCard";
import { StepCard } from "@/components/StepCard";
import { LogoMarquee } from "@/components/LogoMarquee";
import { FaqAccordion } from "@/components/FaqAccordion";
import { LeadForm } from "@/components/LeadForm";
import { CtaBand } from "@/components/CtaBand";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { StickyStory } from "@/components/motion/StickyStory";
import { HeroSection } from "@/components/HeroSection";
import { ExplorePlatformsSection } from "@/components/ExplorePlatformsSection";
import { WhoWeServeSection } from "@/components/WhoWeServeSection";
import { LearningJourneySection } from "@/components/LearningJourneySection";

/**
 * Below-the-fold sections are code-split.
 *
 * These are the heaviest components on the page — an interactive career-track
 * explorer, a comparison/eligibility experience, a video testimonial player
 * and an image-grid community section. Importing them eagerly put all of that
 * JavaScript in the home page's first load even though none of it is visible
 * until the user scrolls. `ssr: true` is kept so the HTML (and therefore the
 * SEO content and the no-JS experience) is unchanged — only the hydration
 * payload is deferred.
 */
const PayAfterPlacementExperience = dynamic(
  () =>
    import("@/components/PayAfterPlacementExperience").then(
      (m) => m.PayAfterPlacementExperience
    ),
  { ssr: true, loading: () => <SectionSkeleton /> }
);
const RealProjectsSection = dynamic(
  () => import("@/components/RealProjectsSection").then((m) => m.RealProjectsSection),
  { ssr: true, loading: () => <SectionSkeleton /> }
);
const CareerTrackExplorer = dynamic(
  () => import("@/components/CareerTrackExplorer").then((m) => m.CareerTrackExplorer),
  { ssr: true, loading: () => <SectionSkeleton /> }
);
const AlumniOutcomesGrid = dynamic(
  () => import("@/components/AlumniOutcomesGrid").then((m) => m.AlumniOutcomesGrid),
  { ssr: true, loading: () => <SectionSkeleton /> }
);
const InstagramFeedSection = dynamic(
  () => import("@/components/InstagramFeedSection").then((m) => m.InstagramFeedSection),
  { ssr: true, loading: () => <SectionSkeleton /> }
);

/** Neutral placeholder sized to avoid a layout jump while a chunk resolves. */
function SectionSkeleton() {
  return (
    <div className="min-h-[420px] w-full animate-pulse rounded-3xl bg-slate-100/60 dark:bg-white/[0.03]" />
  );
}

import { useEnrollModal } from "@/components/EnrollContext";

/**
 * Interactive home page body.
 *
 * Split out of `app/page.tsx` so the route itself can be a server component
 * and export `metadata` plus Organization / WebSite / FAQPage structured data.
 */
export default function HomeView() {
  const { openEnroll } = useEnrollModal();
  const hero = HOME_CONTENT.hero;
  const platforms = HOME_CONTENT.platforms;
  const why = HOME_CONTENT.whyKarka;
  const programs = HOME_CONTENT.featuredPrograms;
  const pillars = HOME_CONTENT.pillars;
  const pay = HOME_CONTENT.payAfterHired;
  const internship = HOME_CONTENT.internship;
  const tracks = HOME_CONTENT.careerTracks;

  // Format pillar items for StickyStory
  const stickyPillars = pillars.items.map((item) => ({
    number: item.number,
    title: item.title,
    description: item.desc,
    skills: item.skills,
  }));

  return (
    <div className="w-full flex flex-col">
      {/* 1. HERO — centred editorial headline + cinematic showcase band */}
      <HeroSection />

      {/* 2. EXPLORE KARKA PLATFORMS (Infini AI & Spike AI) */}
      <ExplorePlatformsSection />

      {/* 3. WHO WE SERVE (Graduates, College Students, Professionals, School Students) */}
      <WhoWeServeSection />

      {/* 4. WHY KARKA? (6 Feature Cards with Hover Lift & Staggered Reveal) */}
      <section id="learning-experience" className="py-20 lg:py-28 bg-white dark:bg-[#0B1120] transition-colors border-b border-slate-200/60 dark:border-white/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <Reveal>
            <SectionHeader
              title={why.title}
              subtitle={why.subtitle}
            />
          </Reveal>

          <Reveal staggerChildren={0.08}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {why.cards.map((c) => (
                <RevealItem key={c.number}>
                  <StepCard
                    step={c.number}
                    title={c.title}
                    description={c.description}
                  />
                </RevealItem>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 5. 8-STEP PRACTICAL LEARNING ROADMAP */}
      <LearningJourneySection />

      {/* 6. EXPLORE OUR PROGRAMS (Featured Courses) */}
      <section id="programs" className="py-20 lg:py-28 bg-white dark:bg-[#080C17] transition-colors border-b border-slate-200/60 dark:border-white/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <Reveal>
            <SectionHeader
              eyebrow="Industry Bootcamps"
              title={programs.title}
              subtitle={programs.subtitle}
            />
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.courses.map((c) => (
              <CourseCard
                key={c.slug}
                slug={c.slug}
                title={c.name}
                tag={c.tag}
                enrollments={c.enrollments}
                rating={c.rating}
                ratingCount={c.ratingCount}
                desc={c.desc}
                image={c.image}
                showEnrollBtn={false}
                onEnroll={(title) => openEnroll(title)}
              />
            ))}
          </div>

          {/* Course discovery CTAs */}
          <div className="mt-14 flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-3 pt-8 border-t border-slate-200/80 dark:border-white/10">
            <Link
              href="/courses"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-heading font-extrabold text-sm bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/25 transition-all cursor-pointer"
            >
              <span>Explore All 26 Career Courses</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" aria-hidden="true" />
            </Link>

            <Link
              href="/course-finder"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-heading font-bold text-sm bg-white dark:bg-white/5 hover:bg-slate-50 dark:hover:bg-white/10 text-slate-800 dark:text-white border border-slate-200 dark:border-white/10 transition-all cursor-pointer"
            >
              <Compass className="w-4 h-4 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
              <span>Not sure? Take the 60-second quiz</span>
            </Link>

            <Link
              href="/compare"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-heading font-bold text-sm bg-white dark:bg-white/5 hover:bg-slate-50 dark:hover:bg-white/10 text-slate-800 dark:text-white border border-slate-200 dark:border-white/10 transition-all cursor-pointer"
            >
              <Scale className="w-4 h-4 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
              <span>Compare courses</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 7. 4 PILLARS OF A JOB-READY TECH CAREER (Sticky Storytelling Theme Responsive) */}
      <section id="pillars" className="py-24 lg:py-32 bg-[#F8FAFC] dark:bg-[#0B1120] text-slate-900 dark:text-white transition-colors border-b border-slate-200/80 dark:border-white/10 relative overflow-hidden">
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <StickyStory
            badge="Holistic Career Transformation"
            title={pillars.title}
            subtitle={pillars.subtitle}
            pillars={stickyPillars}
          />
        </div>
      </section>

      {/* 7. PAY AFTER YOU GET HIRED (Interactive Process Flow, Comparison Table, Eligibility Checker) */}
      <section id="pay-after-placement" className="py-20 lg:py-28 bg-[#F8FAFC] dark:bg-[#080C17] transition-colors border-b border-slate-200/60 dark:border-white/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <PayAfterPlacementExperience />
        </div>
      </section>

      {/* 8. REAL INTERNSHIP PROJECTS AT AGILE TRIBERS */}
      <RealProjectsSection />

      {/* 9. CHOOSE YOUR CAREER TRACK (Interactive Career Track Explorer with Category Filters & Search) */}
      <section id="career-tracks" className="py-20 lg:py-28 bg-[#F8FAFC] dark:bg-[#080C17] transition-colors border-b border-slate-200/60 dark:border-white/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl space-y-10">
          <Reveal>
            <SectionHeader
              eyebrow="Specialized Pathways"
              title={tracks.title}
              subtitle={tracks.subtitle}
            />
          </Reveal>

          <CareerTrackExplorer />
        </div>
      </section>

      {/* 10. WHERE OUR KARKA GRADUATES WORK & ALUMNI PLACEMENTS */}
      <section id="placements" className="py-20 lg:py-28 bg-[#F8FAFC] dark:bg-[#080C17] text-slate-900 dark:text-white border-b border-slate-200/80 dark:border-white/10 transition-colors relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <Reveal>
            <SectionHeader
              eyebrow="Proven Alumni Outcomes"
              title={HOME_CONTENT.graduatesWork.title}
              subtitle={HOME_CONTENT.graduatesWork.subtitle}
            />
          </Reveal>

          {/* Verified Alumni Outcome Cards with Real Campus Collage */}
          <Reveal delay={0.1}>
            <AlumniOutcomesGrid />
          </Reveal>

          {/* Partner Company Logos Strip */}
          <div className="mt-14 pt-10 border-t border-slate-200/80 dark:border-white/10">
            <p className="text-center text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-6">
              50+ Verified Employer Networks Hiring Karka Talent
            </p>
            <LogoMarquee title="" twoRows={false} />
          </div>
        </div>
      </section>


      {/* 10c. CAMPUS COMMUNITY / INSTAGRAM BRAND MOMENT */}
      <InstagramFeedSection />

      {/* 11. FAQ ACCORDION (With Rotating Plus Icon & Height Animation) */}
      <section id="faq" className="py-20 lg:py-28 bg-[#F8FAFC] dark:bg-[#080C17] transition-colors border-b border-slate-200/60 dark:border-white/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <Reveal>
            <SectionHeader
              eyebrow={HOME_CONTENT.faqs.eyebrow}
              title={HOME_CONTENT.faqs.title}
              subtitle={HOME_CONTENT.faqs.subtitle}
            />
          </Reveal>

          <Reveal delay={0.1}>
            <FaqAccordion
              items={HOME_CONTENT.faqs.items}
              showContactBox={true}
              onOpenApply={() => openEnroll()}
            />
          </Reveal>
        </div>
      </section>

      {/* 12. GET IN TOUCH WITH US */}
      <section id="enroll" className="py-20 lg:py-28 bg-white dark:bg-[#0B1120] transition-colors border-b border-slate-200/60 dark:border-white/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <Reveal>
            <SectionHeader
              title={HOME_CONTENT.contactSection.title}
              subtitle={HOME_CONTENT.contactSection.subtitle}
            />
          </Reveal>

          <Reveal delay={0.1}>
            <LeadForm />
          </Reveal>
        </div>
      </section>

      {/* 13. GLOBAL CTA BAND */}
      <CtaBand />
    </div>
  );
}
