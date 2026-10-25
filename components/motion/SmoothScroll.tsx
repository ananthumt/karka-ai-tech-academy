"use client";

import React, { useEffect, useRef } from "react";
import Lenis from "lenis";
import { useScrollDriver, subscribeScrollProgress } from "@/lib/scroll-store";

/**
 * Desktop momentum scrolling (Lenis) plus the global reading-progress bar.
 *
 * Performance optimizations:
 *  - Lenis configured for fast, snappy, natural response (wheelMultiplier: 1.0, duration: 0.75).
 *  - Progress bar is updated directly on its DOM element transform using `subscribeScrollProgress`,
 *    bypassing React re-renders and avoiding global style invalidations.
 *  - Exposes `window.__lenis` for smooth, synchronized programmatic scrolling.
 */
export const SmoothScroll: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useScrollDriver();
  const progressBarRef = useRef<HTMLDivElement>(null);

  // Update progress bar on GPU compositor without React or document recalculations
  useEffect(() => {
    return subscribeScrollProgress((progress) => {
      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${progress})`;
      }
    });
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    // Never hijack touch devices: native momentum is smoother than any JS
    // emulation, and Lenis on mobile is a common source of scroll jank.
    const isTouchDevice =
      window.matchMedia("(pointer: coarse)").matches ||
      /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
      window.innerWidth < 768;

    if (isTouchDevice) return;

    const lenis = new Lenis({
      duration: 0.75,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 0,
      infinite: false,
    });

    if (typeof window !== "undefined") {
      (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    }

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      if (typeof window !== "undefined") {
        delete (window as unknown as { __lenis?: Lenis }).__lenis;
      }
      lenis.destroy();
    };
  }, []);

  return (
    <>
      {/*
        Reading progress bar. Directly driven via transform on compositor thread
      */}
      <div
        ref={progressBarRef}
        className="fixed top-0 left-0 right-0 h-[3px] z-[60] origin-left pointer-events-none bg-gradient-to-r from-indigo-600 via-violet-500 to-cyan-400"
        style={{ transform: "scaleX(0)", willChange: "transform" }}
        aria-hidden="true"
      />
      {children}
    </>
  );
};
