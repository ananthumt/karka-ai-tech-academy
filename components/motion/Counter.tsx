"use client";

import React, { useEffect, useState, useRef } from "react";
import { useInView, useReducedMotion } from "framer-motion";

interface CounterProps {
  value: string; // e.g. "800+", "24 LPA", "100%", "50+", "120%", "4.8"
  duration?: number; // seconds
  className?: string;
}

export const Counter: React.FC<CounterProps> = ({
  value,
  duration = 1.5,
  className = "",
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });
  const shouldReduceMotion = useReducedMotion();

  // Extract numeric part and suffix
  const match = value.match(/^([\d.]+)(.*)$/);
  const numericTarget = match ? parseFloat(match[1]) : null;
  const suffix = match ? match[2] : "";

  const [displayValue, setDisplayValue] = useState<number | string>(
    shouldReduceMotion || !numericTarget ? value : 0
  );

  useEffect(() => {
    if (shouldReduceMotion || !isInView || numericTarget === null) {
      setDisplayValue(value);
      return;
    }

    const isDecimal = String(numericTarget).includes(".");
    const startTime = performance.now();
    const durationMs = duration * 1000;

    let animId: number;

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      // Quintic easeOut
      const ease = 1 - Math.pow(1 - progress, 4);
      const current = numericTarget * ease;

      if (isDecimal) {
        setDisplayValue(current.toFixed(1));
      } else {
        setDisplayValue(Math.floor(current));
      }

      if (progress < 1) {
        animId = requestAnimationFrame(updateCounter);
      } else {
        setDisplayValue(isDecimal ? numericTarget.toFixed(1) : numericTarget);
      }
    };

    animId = requestAnimationFrame(updateCounter);
    return () => cancelAnimationFrame(animId);
  }, [isInView, numericTarget, shouldReduceMotion, duration, value]);

  if (numericTarget === null || shouldReduceMotion) {
    return <span className={className}>{value}</span>;
  }

  return (
    <span ref={ref} className={className}>
      {displayValue}
      {suffix}
    </span>
  );
};
