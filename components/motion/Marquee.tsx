"use client";

import React, { useState } from "react";
import { useReducedMotion } from "framer-motion";

interface MarqueeProps {
  children: React.ReactNode;
  direction?: "left" | "right";
  speed?: number; // duration in seconds
  pauseOnHover?: boolean;
  className?: string;
}

export const Marquee: React.FC<MarqueeProps> = ({
  children,
  direction = "left",
  speed = 28,
  pauseOnHover = true,
  className = "",
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const isLeft = direction === "left";

  if (shouldReduceMotion) {
    return (
      <div className={`w-full overflow-x-auto scrollbar-none py-2 ${className}`}>
        <div className="flex items-center justify-center gap-6 sm:gap-8 flex-wrap">{children}</div>
      </div>
    );
  }

  return (
    <div
      className={`relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] ${className}`}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      {/*
        Marquee track driven by a CSS animation rather than framer-motion's
        `animate` prop, so hover can freeze the track in place via
        `animation-play-state`. The previous framer implementation swapped
        `animate` to `{}` on hover, which snapped the track back to x=0
        instead of pausing it.
      */}
      <div
        className="flex w-max items-center gap-6 sm:gap-8 py-2"
        style={{
          animation: `karka-marquee-${isLeft ? "left" : "right"} ${speed}s linear infinite`,
          animationPlayState: isPaused ? "paused" : "running",
          willChange: "transform",
        }}
      >
        <div className="flex items-center gap-6 sm:gap-8 flex-shrink-0">{children}</div>
        <div className="flex items-center gap-6 sm:gap-8 flex-shrink-0" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
};
