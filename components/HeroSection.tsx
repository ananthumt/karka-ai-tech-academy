"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Compass,
  MapPin,
  ShieldCheck,
  Star,
  Sparkles,
  Play,
  ChevronDown,
} from "lucide-react";
import { LogoMarquee } from "@/components/LogoMarquee";
import { TextReveal } from "@/components/motion/TextReveal";
import { Counter } from "@/components/motion/Counter";
import { useEnrollModal } from "@/components/EnrollContext";

/**
 * Home hero — light theme.
 *
 * Layout deliberately differs from the original 7/5 text-beside-image split:
 * the headline is centred and given the full measure, then a single wide
 * cinematic band carries the campus photography with glass cards overlapping
 * its edges. Centring the type lets the headline run much larger without
 * crowding the image, and the full-width band reads as a product shot rather
 * than a thumbnail.
 *
 * Depth on a white canvas has to come from layered shadow, a hairline rim and
 * very soft colour wash rather than from contrast, so this leans on the
 * `surface` / `elev-*` / `mesh-light` tokens in globals.css. The only dark
 * elements are the overlay chips, which sit on photography and need the
 * contrast to stay legible.
 */

const METRICS = [
  { value: "800+", label: "Learners trained", accent: false },
  { value: "650+", label: "Placed in tech", accent: false },
  { value: "50+", label: "Hiring partners", accent: false },
  { value: "24 LPA", label: "Highest package", accent: true },
];

const AVATARS = [
  { src: "/assets/prabin-avatar.webp", name: "Prabin" },
  { src: "/assets/sridevi-avatar.webp", name: "Sridevi" },
  { src: "/assets/kishore-avatar.webp", name: "Kishore" },
  { src: "/assets/shiju-avatar.webp", name: "Shiju" },
];

export const HeroSection: React.FC = () => {
  const { openEnroll } = useEnrollModal();

  return (
    <section
      id="hero"
      className="grain mesh-light dark:mesh-dark relative overflow-hidden border-b border-slate-200/80 bg-white text-slate-900 transition-colors dark:border-white/[0.08] dark:bg-[#070B14] dark:text-white"
    >
      {/* ---- Ambient layers (all decorative, none interactive) ---- */}
      {/* Soft wash from the top so the white canvas isn't flat */}
      <div
        className="absolute inset-x-0 top-0 h-[520px] bg-gradient-to-b from-indigo-50/80 via-white/0 to-transparent dark:from-indigo-950/30 deco"
        aria-hidden="true"
      />
      {/* Fine dot matrix, faded toward the fold */}
      <div
        className="absolute inset-0 bg-dot-grid opacity-70 [mask-image:radial-gradient(ellipse_75%_55%_at_50%_0%,#000_40%,transparent_100%)] deco"
        aria-hidden="true"
      />
      <div
        className="absolute -top-48 left-1/2 h-[520px] w-[900px] -translate-x-1/2 animate-blob-drift rounded-full bg-indigo-400/15 blur-[160px] dark:bg-indigo-600/25 deco"
        aria-hidden="true"
      />
      <div
        className="absolute -right-40 top-32 h-[420px] w-[520px] animate-blob-drift rounded-full bg-cyan-300/15 blur-[150px] dark:bg-cyan-400/10 deco"
        style={{ animationDelay: "-9s" }}
        aria-hidden="true"
      />

      <div className="container relative z-10 mx-auto max-w-7xl px-4 pb-10 pt-14 sm:px-6 sm:pb-12 sm:pt-20 lg:px-8 lg:pt-24">
        {/* ================= CENTRED EDITORIAL BLOCK ================= */}
        <div className="mx-auto max-w-4xl text-center">
          {/* Live status pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/90 bg-white/80 px-4 py-1.5 shadow-xs backdrop-blur-xl dark:border-white/15 dark:bg-white/[0.06]">
            <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="font-heading text-[10px] font-bold uppercase tracking-[0.16em] text-slate-700 dark:text-slate-200 sm:text-[11px]">
              Admissions open · Nagercoil, Tamil Nadu
            </span>
          </div>

          {/* Headline. Larger than the original because the centred measure allows it. */}
          <h1 className="mt-7 font-heading text-[2.6rem] font-extrabold leading-[1.04] tracking-[-0.04em] text-slate-900 dark:text-white sm:text-6xl lg:text-[4.75rem]">
            <TextReveal as="span" text="Become an industry-ready" className="block" />
            <span className="mt-1.5 block text-gradient-brand">
              <TextReveal as="span" text="AI software developer" delay={0.14} />
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl font-body text-base leading-relaxed text-slate-600 dark:text-slate-300/90 sm:text-lg">
            Train on modern fullstack and GenAI engineering with daily on-campus
            mentorship, ship production software during a real internship, and pay{" "}
            <span className="font-semibold text-slate-900 dark:text-white">₹0 upfront</span> —
            the{" "}
            <span className="font-semibold text-slate-900 dark:text-white">₹40,000</span> fee
            is only due once you land a tech job.
          </p>

          {/* Primary actions */}
          <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={() => openEnroll("Hero — Apply Free")}
              className="shine group inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-indigo-500 to-indigo-600 px-8 py-4 font-heading text-base font-bold text-white ring-1 ring-inset ring-white/20 shadow-[0_12px_34px_-10px_rgba(79,70,229,0.55)] transition-all hover:from-indigo-400 hover:to-indigo-600 active:scale-[0.99]"
            >
              <span>Apply free — no upfront fee</span>
              <ArrowRight className="h-5 w-5 stroke-[2.5] arrow-nudge" aria-hidden="true" />
            </button>

            <Link
              href="/course-finder"
              className="group inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-7 py-4 font-heading text-base font-semibold text-slate-800 shadow-xs transition-all hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-sm dark:border-white/15 dark:bg-white/[0.06] dark:text-white dark:hover:bg-white/[0.12]"
            >
              <Compass className="h-4 w-4 text-indigo-600 dark:text-indigo-300" aria-hidden="true" />
              <span>Find my course in 60s</span>
            </Link>
          </div>

          {/* Social proof micro-row */}
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2.5">
                {AVATARS.map((a) => (
                  <span
                    key={a.src}
                    className="relative inline-block h-9 w-9 overflow-hidden rounded-full ring-2 ring-white dark:ring-[#070B14]"
                  >
                    <Image
                      src={a.src}
                      alt={`${a.name} — Karka graduate`}
                      fill
                      sizes="36px"
                      className="object-cover"
                    />
                  </span>
                ))}
              </div>
              <div className="text-left">
                <span className="flex items-center gap-0.5 text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
                  ))}
                  <span className="ml-1.5 font-heading text-xs font-bold text-slate-900 dark:text-white">
                    4.9/5
                  </span>
                </span>
                <p className="font-body text-[11px] text-slate-500 dark:text-slate-400">
                  200+ learner reviews
                </p>
              </div>
            </div>

            <span
              className="hidden h-8 w-px bg-slate-200 dark:bg-white/10 sm:block"
              aria-hidden="true"
            />

            <p className="flex items-center gap-2 font-body text-[13px] text-slate-500 dark:text-slate-400">
              <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
              <span>
                Learn till placed ·{" "}
                <span className="text-slate-800 dark:text-slate-200">lifetime support</span>
              </span>
            </p>
          </div>
        </div>

        {/* ================= CINEMATIC SHOWCASE BAND ================= */}
        <div className="relative mx-auto mt-14 max-w-6xl sm:mt-20">
          {/* Colour pooled under the frame so it reads as lit from behind */}
          <div
            className="absolute -inset-x-10 -top-6 bottom-10 rounded-[3rem] bg-gradient-to-tr from-indigo-400/20 via-violet-400/10 to-cyan-300/15 blur-3xl dark:from-indigo-600/25 dark:via-violet-600/10 dark:to-cyan-400/15 deco"
            aria-hidden="true"
          />

          <div className="ring-gradient relative rounded-[1.75rem] p-2 elev-4 sm:rounded-[2rem] sm:p-2.5">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[1.4rem] bg-slate-900 sm:aspect-[21/9]">
              <Image
                src="/assets/hero-realistic-studio.webp"
                alt="Students and mentors collaborating in the Karka AI & Tech Academy studio lab in Nagercoil"
                fill
                priority
                // The LCP image. Explicit sizes keeps Next from assuming 100vw
                // and serving a needlessly large candidate on desktop.
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 92vw, 1150px"
                className="object-cover object-center"
              />

              {/* Grade only the edges, so the photograph itself stays bright on
                  a light page while the overlay chips keep their contrast. */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-950/25"
                aria-hidden="true"
              />

              {/* Top-left: live lab status */}
              <div className="absolute left-3 top-3 flex items-center gap-2 rounded-xl border border-white/20 bg-black/40 px-3 py-1.5 backdrop-blur-xl sm:left-5 sm:top-5">
                <span className="h-2 w-2 animate-pulse rounded-full bg-indigo-300" aria-hidden="true" />
                <span className="font-heading text-[11px] font-bold text-white">
                  In-person &amp; hybrid lab
                </span>
              </div>

              {/* Top-right: the offer, stated plainly */}
              <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3 py-1.5 ring-1 ring-inset ring-white/25 sm:right-5 sm:top-5">
                <Sparkles className="h-3.5 w-3.5 text-indigo-100" aria-hidden="true" />
                <span className="font-heading text-[11px] font-extrabold uppercase tracking-wider text-white">
                  ₹0 upfront
                </span>
              </div>

              {/* Bottom: campus provenance + video entry point */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-3 sm:bottom-5 sm:left-5 sm:right-5">
                <div className="flex min-w-0 items-center gap-2.5 rounded-xl border border-white/20 bg-black/40 p-2.5 pr-4 backdrop-blur-xl">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-indigo-400/30 bg-indigo-500/25">
                    <MapPin className="h-4 w-4 text-indigo-200" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate font-heading text-xs font-bold text-white">
                      Karka Learning Campus
                    </span>
                    <span className="block truncate font-body text-[11px] text-slate-200">
                      Nagercoil, Kanyakumari · daily mentorship
                    </span>
                  </span>
                </div>

                <Link
                  href="#placements"
                  className="group hidden shrink-0 items-center gap-2 rounded-xl border border-white/20 bg-black/40 px-3.5 py-2.5 font-heading text-xs font-bold text-white backdrop-blur-xl transition-colors hover:bg-black/60 sm:inline-flex"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
                    <ArrowRight className="h-3 w-3" aria-hidden="true" />
                  </span>
                  <span>View alumni outcomes</span>
                </Link>
              </div>
            </div>
          </div>

          {/*
            Metrics strip, overlapping the frame's lower edge.
            `gap-px` over a tinted parent draws the dividing hairlines, which
            stays correct at both 2-up and 4-up without per-cell edge rules.
          */}
          <dl className="tnum relative z-10 mx-auto -mt-7 grid max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-200/70 elev-3 dark:border-white/10 dark:bg-white/10 sm:-mt-9 sm:grid-cols-4">
            {METRICS.map((m) => (
              <div
                key={m.label}
                className="bg-white px-4 py-4 text-center dark:bg-[#111A2E] sm:px-5 sm:py-5"
              >
                <dd
                  className={`font-heading text-xl font-extrabold sm:text-2xl ${
                    m.accent
                      ? "text-indigo-600 dark:text-indigo-300"
                      : "text-slate-900 dark:text-white"
                  }`}
                >
                  <Counter value={m.value} />
                </dd>
                <dt className="mt-1 font-body text-[11px] text-slate-500 dark:text-slate-400 sm:text-xs">
                  {m.label}
                </dt>
              </div>
            ))}
          </dl>
        </div>

        {/* ================= HIRING PARTNERS ================= */}
        <div className="mt-14 border-t border-slate-200/80 pt-9 dark:border-white/10 sm:mt-16">
          <p className="mb-4 text-center font-heading text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
            Where our graduates build their careers
          </p>
          <LogoMarquee title="" twoRows={false} />
        </div>

        {/* Scroll cue */}
        <div className="mt-10 flex justify-center">
          <a
            href="#career-tracks"
            className="group inline-flex flex-col items-center gap-1.5 font-body text-[11px] text-slate-400 transition-colors hover:text-slate-700 dark:text-slate-500 dark:hover:text-slate-300"
          >
            <span>Explore 26 career tracks</span>
            <ChevronDown
              className="h-4 w-4 animate-bounce-subtle text-indigo-500 dark:text-indigo-400"
              aria-hidden="true"
            />
          </a>
        </div>
      </div>
    </section>
  );
};
