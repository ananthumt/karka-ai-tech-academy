"use client";

import React, { useState, useEffect, useRef } from "react";
import { CheckCircle2, Sparkles } from "lucide-react";

interface PillarData {
  number: string;
  title: string;
  description: string;
  skills: string[];
}

interface StickyStoryProps {
  badge: string;
  title: string;
  subtitle: string;
  pillars: PillarData[];
}

export const StickyStory: React.FC<StickyStoryProps> = ({
  badge,
  title,
  subtitle,
  pillars,
}) => {
  const [activePillar, setActivePillar] = useState(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  /**
   * Track which pillar is nearest the middle of the viewport.
   *
   * This previously ran a scroll listener that called
   * `getBoundingClientRect()` on every card on every animation frame — a
   * forced synchronous layout per card per frame, which is the single most
   * expensive pattern you can put in a scroll handler. An
   * IntersectionObserver with a narrow band around the viewport midpoint
   * gives the same result, computed off the main thread.
   */
  useEffect(() => {
    const cards = cardRefs.current.filter((el): el is HTMLDivElement => el !== null);
    if (cards.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Of the cards currently crossing the midline band, pick the one with
        // the largest visible ratio.
        let best: { idx: number; ratio: number } | null = null;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const idx = cards.indexOf(entry.target as HTMLDivElement);
          if (idx === -1) continue;
          if (!best || entry.intersectionRatio > best.ratio) {
            best = { idx, ratio: entry.intersectionRatio };
          }
        }
        if (best) setActivePillar(best.idx);
      },
      {
        // A horizontal band through the vertical centre of the viewport.
        rootMargin: "-45% 0px -45% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [pillars.length]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start relative">
      {/* Left: Sticky Title Column on desktop */}
      <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-6 pt-2 text-left">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/50">
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
          <span>{badge}</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white font-heading leading-[1.12]">
          {title}
        </h2>

        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-body max-w-md">
          {subtitle}
        </p>

        {/* Desktop Pillar Navigation Indicator */}
        <div className="hidden lg:flex flex-col gap-2.5 pt-6 border-t border-slate-200/80 dark:border-white/10">
          {pillars.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                const card = cardRefs.current[idx];
                if (!card) return;
                const lenis = (window as unknown as { __lenis?: { scrollTo: (target: HTMLElement, opts?: { offset?: number; duration?: number }) => void } })?.__lenis;
                if (lenis) {
                  lenis.scrollTo(card, { offset: -120, duration: 0.8 });
                } else {
                  card.scrollIntoView({ behavior: "smooth", block: "center" });
                }
              }}
              className={`text-left flex items-center gap-3 py-2.5 px-3.5 rounded-xl transition-all cursor-pointer ${
                activePillar === idx
                  ? "bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white font-bold translate-x-1 border border-slate-200/80 dark:border-white/15"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
              }`}
            >
              <span
                className={`text-xs font-mono font-bold px-2 py-0.5 rounded-md ${
                  activePillar === idx
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400"
                }`}
              >
                {p.number}
              </span>
              <span className="text-sm font-heading font-semibold truncate">{p.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Right: Scrolling Pillar Cards */}
      <div className="lg:col-span-7 space-y-6 sm:space-y-8">
        {pillars.map((pillar, idx) => {
          const isActive = activePillar === idx;
          return (
            <div
              key={idx}
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
              // `transition-all` on a card this large forces the browser to
              // interpolate every animatable property, including box-shadow
              // and background. Restricting it to the handful that actually
              // change keeps the active-card handoff cheap.
              className={`p-6 sm:p-8 rounded-3xl border text-left transition-[opacity,transform,border-color,box-shadow] duration-500 will-change-transform ${
                isActive
                  ? "bg-white dark:bg-[#111A2E] border-indigo-500/40 shadow-xl dark:shadow-2xl shadow-indigo-500/5 translate-x-1 sm:translate-x-2"
                  : "bg-white/80 dark:bg-[#0E152A]/90 border-slate-200/80 dark:border-white/10 opacity-75 hover:opacity-100"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-black uppercase tracking-wider text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/60 dark:border-indigo-800/50">
                  {pillar.number}
                </span>
                <span className="text-xs font-mono font-medium text-slate-500 dark:text-slate-400">
                  Pillar {idx + 1} of {pillars.length}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-heading mb-3">
                {pillar.title}
              </h3>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-6 font-body">
                {pillar.description}
              </p>

              <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-200/80 dark:border-white/10">
                {pillar.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-200 border border-slate-200/60 dark:border-white/10"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                    <span>{skill}</span>
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
