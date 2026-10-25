"use client";

import React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Instagram, ArrowUpRight, Heart, MessageCircle, Play, Users } from "lucide-react";
import { SITE_CONFIG } from "@/content/site";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { Marquee } from "@/components/motion/Marquee";
import { cn } from "@/lib/utils";

/**
 * Campus-life highlight reel.
 *
 * These tiles mirror the kind of content posted on @karka.ai and reuse real
 * campus photography already in /public/assets. They are presented as a
 * curated highlight grid rather than a live feed: there is no Instagram Graph
 * API token in this project, so fabricating live post counts or captions would
 * be dishonest. Each tile links out to the real profile.
 */
interface Highlight {
  image: string;
  alt: string;
  caption: string;
  tag: string;
  kind: "photo" | "reel";
  /** Aspect treatment so the grid reads like a real feed rather than a table. */
  span?: string;
}

const HIGHLIGHTS: Highlight[] = [
  {
    image: "/assets/hero-realistic-studio.webp",
    alt: "Students and mentors collaborating in the Karka studio lab in Nagercoil",
    caption: "Daily sprint stand-up in the Nagercoil studio lab",
    tag: "#CampusLife",
    kind: "photo",
    span: "sm:col-span-2 sm:row-span-2",
  },
  {
    image: "/assets/alumni-celebration.webp",
    alt: "Karka alumni celebrating their placement offers",
    caption: "Offer letter day — another cohort placed",
    tag: "#PlacedAtKarka",
    kind: "photo",
  },
  {
    image: "/assets/project-infini-arena.webp",
    alt: "Teams competing at the Karka Infini AI inter-college arena",
    caption: "Infini AI arena · ₹1,00,000 total prize pool",
    tag: "#KarkaInfini",
    kind: "reel",
  },
  {
    image: "/assets/intern.webp",
    alt: "Interns working on live client software at Agile Tribers",
    caption: "Agile Tribers interns shipping to production",
    tag: "#RealProjects",
    kind: "photo",
  },
  {
    image: "/assets/stem-kids.webp",
    alt: "School students building games in the Python for Kids programme",
    caption: "Python for Kids — first game, first bug, first fix",
    tag: "#FutureCoders",
    kind: "photo",
  },
  {
    image: "/assets/student-collage.webp",
    alt: "Collage of Karka students across cohorts",
    caption: "800+ learners trained and counting",
    tag: "#KarkaCommunity",
    kind: "reel",
  },
];

const HASHTAGS = [
  "#KarkaAcademy",
  "#PayAfterPlacement",
  "#Nagercoil",
  "#AIFirst",
  "#PlacedAtKarka",
  "#AgileTribers",
  "#KarkaInfini",
  "#FullstackDeveloper",
  "#GenAI",
  "#FutureCoders",
];

export const InstagramFeedSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="community"
      className="relative py-20 lg:py-28 bg-white dark:bg-[#0B1120] border-b border-slate-200/60 dark:border-white/5 transition-colors overflow-hidden"
    >
      {/* Instagram-flavoured ambient wash: warm amber → rose → violet */}
      <div
        className="absolute -top-32 -right-24 w-[520px] h-[520px] rounded-full blur-[150px] deco bg-gradient-to-br from-amber-400/20 via-rose-500/20 to-purple-600/20 animate-blob-drift"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-40 -left-24 w-[460px] h-[460px] rounded-full blur-[140px] deco bg-gradient-to-tr from-indigo-500/15 via-fuchsia-500/15 to-transparent animate-blob-drift"
        style={{ animationDelay: "-6s" }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <Reveal>
          <SectionHeader
            eyebrow="Life at Karka"
            title="The campus you'll actually walk into"
            subtitle="Hackathon nights, offer-letter mornings, Infini finals and a lot of debugging. Follow @karka.ai for the unfiltered version."
          />
        </Reveal>

        {/* Profile bar */}
        <Reveal>
          <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 p-5 rounded-3xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-white/10 shadow-sm">
            <div className="flex items-center gap-4">
              {/* Gradient avatar ring, the Instagram visual signature */}
              <div className="p-[2.5px] rounded-2xl bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600 shrink-0">
                <div className="w-14 h-14 rounded-[13px] bg-white dark:bg-[#111A2E] flex items-center justify-center overflow-hidden relative">
                  <Image
                    src="/assets/logo.webp"
                    alt="Karka AI & Tech Academy logo"
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-heading font-extrabold text-slate-900 dark:text-white">
                    @karka.ai
                  </span>
                  <Instagram
                    className="w-4 h-4 text-rose-500 dark:text-rose-400"
                    aria-hidden="true"
                  />
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 font-body">
                  Official campus community · Nagercoil, Tamil Nadu
                </p>
                <p className="mt-1 flex items-center gap-1.5 text-xs font-heading font-bold text-slate-500 dark:text-slate-400">
                  <Users className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Join 500+ innovators</span>
                </p>
              </div>
            </div>

            <a
              href={SITE_CONFIG.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white font-heading font-bold text-sm shadow-lg shadow-rose-500/25 transition-all duration-300 shrink-0 cursor-pointer overflow-hidden"
            >
              <span
                className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-[900ms] deco"
                aria-hidden="true"
              />
              <Instagram className="w-4 h-4 relative" aria-hidden="true" />
              <span className="relative">Follow @karka.ai</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.5] relative" aria-hidden="true" />
            </a>
          </div>
        </Reveal>

        {/* Highlight grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 auto-rows-[150px] sm:auto-rows-[180px]">
          {HIGHLIGHTS.map((item, i) => (
            <motion.a
              key={item.image}
              href={SITE_CONFIG.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              initial={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.94 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                "group relative rounded-2xl overflow-hidden border border-slate-200/80 dark:border-white/10 bg-slate-100 dark:bg-slate-900 shadow-sm focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2",
                item.span
              )}
              aria-label={`${item.caption} — opens the Karka Instagram profile`}
            >
              <TiltCard maxTilt={4} lift={0} glare={false} className="w-full h-full">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Legibility scrim */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent opacity-80 group-hover:opacity-95 transition-opacity"
                  aria-hidden="true"
                />

                {item.kind === "reel" && (
                  <span
                    className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/55 backdrop-blur-sm flex items-center justify-center text-white"
                    aria-hidden="true"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                  </span>
                )}

                <div className="absolute bottom-0 left-0 right-0 p-3 space-y-1">
                  <span className="block text-[10px] font-mono font-bold uppercase tracking-wider text-rose-300">
                    {item.tag}
                  </span>
                  <p className="text-[11px] sm:text-xs font-heading font-bold text-white leading-snug line-clamp-2">
                    {item.caption}
                  </p>
                </div>

                {/* Engagement affordance on hover — decorative, no fabricated counts */}
                <div
                  className="absolute inset-0 hidden sm:flex items-center justify-center gap-4 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-hidden="true"
                >
                  <span className="flex items-center gap-1 text-white text-xs font-heading font-bold">
                    <Heart className="w-4 h-4 fill-current" />
                  </span>
                  <span className="flex items-center gap-1 text-white text-xs font-heading font-bold">
                    <MessageCircle className="w-4 h-4" />
                  </span>
                </div>
              </TiltCard>
            </motion.a>
          ))}
        </div>

        {/* Hashtag ticker */}
        <div className="mt-10 pt-8 border-t border-slate-200/80 dark:border-white/10">
          <Marquee speed={38} pauseOnHover>
            {HASHTAGS.map((tag) => (
              <span
                key={tag}
                className="text-sm sm:text-base font-heading font-extrabold text-slate-400 dark:text-slate-600 whitespace-nowrap select-none"
              >
                {tag}
              </span>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
};
