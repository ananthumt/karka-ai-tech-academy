"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion, MotionValue } from "framer-motion";

interface ParallaxProps {
  children: React.ReactNode;
  /**
   * Travel distance in px across the full scroll pass.
   * Positive values move the layer down (slower than scroll),
   * negative values move it up (faster than scroll).
   */
  distance?: number;
  /** Also scale the layer slightly as it passes through the viewport. */
  scaleRange?: [number, number];
  /** Fade the layer in/out at the viewport edges. */
  fade?: boolean;
  className?: string;
}

/**
 * Scroll-linked parallax layer. Wraps decorative media, not text content —
 * offsetting body copy hurts readability and can break scroll anchoring.
 */
export const Parallax: React.FC<ParallaxProps> = ({
  children,
  distance = 60,
  scaleRange,
  fade = false,
  className = "",
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-distance, distance]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    scaleRange ? [scaleRange[0], scaleRange[1], scaleRange[0]] : [1, 1, 1]
  );
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.4, 1, 1, 0.4]);

  if (shouldReduceMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      style={{
        y,
        ...(scaleRange ? { scale } : {}),
        ...(fade ? { opacity } : {}),
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/**
 * Read the page scroll progress (0 → 1) as a MotionValue.
 * Useful for progress bars and sticky indicators.
 */
export function usePageScrollProgress(): MotionValue<number> {
  const { scrollYProgress } = useScroll();
  return scrollYProgress;
}
