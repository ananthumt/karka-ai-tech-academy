"use client";

import React from "react";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import { HOME_CONTENT } from "@/content/site";
import { Marquee } from "@/components/motion/Marquee";

interface LogoMarqueeProps {
  title?: string;
  className?: string;
  twoRows?: boolean;
}

/**
 * Tile + logo treatment.
 *
 * These were previously hard-coded for a dark backdrop
 * (`bg-white/[0.03]`, `border-white/[0.08]`, `brightness-125 contrast-125`),
 * which rendered as invisible tiles and washed-out logos once the marquee was
 * placed on a light section. Both now carry explicit light values with `dark:`
 * overrides.
 */
const TILE_CLASS =
  "group flex items-center justify-center shrink-0 h-12 sm:h-14 w-28 sm:w-36 px-4 py-2.5 rounded-xl border transition-all duration-300 " +
  "bg-white border-slate-200/80 shadow-xs hover:border-indigo-300 hover:shadow-sm " +
  "dark:bg-white/[0.03] dark:border-white/[0.08] dark:backdrop-blur-md dark:hover:border-indigo-500/40 dark:hover:bg-white/[0.06]";

// Logos are dark-ink marks on transparent backgrounds: leave them untouched on
// light surfaces, and lift them only in dark mode.
const LOGO_CLASS =
  "object-contain grayscale-[0.2] group-hover:grayscale-0 transition-[filter] duration-300 dark:brightness-0 dark:invert dark:grayscale-0";

export const LogoMarquee: React.FC<LogoMarqueeProps> = ({
  title = "Where Our Learners are Making an Impact",
  className = "",
  twoRows = false,
}) => {
  const logos = HOME_CONTENT.hero.companies;

  return (
    <div className={`w-full py-4 overflow-hidden ${className}`}>
      {title && (
        <div className="container mx-auto px-4 max-w-7xl mb-4 text-center">
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-400 uppercase tracking-widest font-heading">
            <Sparkles className="w-3.5 h-3.5 text-lime" />
            <span>{title}</span>
          </div>
        </div>
      )}

      {/* Row 1: Leftward moving marquee */}
      <Marquee direction="left" speed={24} pauseOnHover className="mb-2">
        {logos.map((item, idx) => (
          <div
            key={`r1-${item.name}-${idx}`}
            className={TILE_CLASS}
          >
            <div className="relative h-6 sm:h-7 w-20 sm:w-26 opacity-80 group-hover:opacity-100 transition-opacity">
              <Image
                src={item.logo}
                alt={`${item.name} logo`}
                fill
                // Rendered at ~104px wide. Without this, Next assumes 100vw
                // and serves a full-width candidate for every logo — and the
                // marquee duplicates the row, so that was 16 oversized
                // downloads on the home page alone.
                sizes="112px"
                className={LOGO_CLASS}
              />
            </div>
          </div>
        ))}
      </Marquee>

      {/* Row 2: Rightward moving marquee (opposite direction) - only if explicitly requested */}
      {twoRows && (
        <Marquee direction="right" speed={26} pauseOnHover>
          {[...logos].reverse().map((item, idx) => (
            <div
              key={`r2-${item.name}-${idx}`}
              className={TILE_CLASS}
            >
              <div className="relative h-6 sm:h-7 w-20 sm:w-26 opacity-80 group-hover:opacity-100 transition-opacity">
                <Image
                  src={item.logo}
                  alt={`${item.name} logo`}
                  fill
                  sizes="112px"
                  className={LOGO_CLASS}
                />
              </div>
            </div>
          ))}
        </Marquee>
      )}
    </div>
  );
};
