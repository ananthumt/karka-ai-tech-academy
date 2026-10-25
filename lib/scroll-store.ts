"use client";

import { useEffect, useState } from "react";

/**
 * Single shared scroll driver.
 *
 * Before this, five components each attached their own `scroll` listener and
 * ran their own `requestAnimationFrame` loop (Navbar, SmoothScroll,
 * ScrollToTop, StickyMobileCta, StickyStory) — and Navbar's wasn't even
 * passive, so it blocked the compositor on every wheel event.
 *
 * Now there is exactly one passive listener and one rAF tick for the whole
 * app, and it publishes in two ways:
 *
 *  1. CSS custom properties `--scroll-progress` (0→1) and `--scroll-y` on
 *     <html>. Continuous values are consumed directly by CSS, so smooth
 *     indicators like the reading bar cost zero React renders per frame.
 *  2. Boolean threshold subscriptions. Components that only care about
 *     "am I past 600px?" re-render on the crossing, not on every pixel.
 */

type ThresholdListener = { threshold: number; notify: (past: boolean) => void; last: boolean };
type ProgressListener = (progress: number) => void;

const listeners = new Set<ThresholdListener>();
const progressListeners = new Set<ProgressListener>();
let rafId: number | null = null;
let isDirty = false;
let started = false;
let lastReportedProgress = -1;

export function subscribeScrollProgress(fn: ProgressListener): () => void {
  progressListeners.add(fn);
  return () => {
    progressListeners.delete(fn);
  };
}

function readAndPublish() {
  rafId = null;
  isDirty = false;

  const doc = document.documentElement;
  const y = window.scrollY || doc.scrollTop || 0;
  const max = doc.scrollHeight - window.innerHeight;
  const progress = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;

  // Direct callbacks (e.g. reading bar transform) run off compositor/RAF without style invalidation
  progressListeners.forEach((fn) => {
    try {
      fn(progress);
    } catch {
      // pass
    }
  });

  // Only write to CSS custom property if the value moved by at least 0.5% (0.005),
  // preventing continuous whole-document style recalculation on micro-scrolls.
  if (Math.abs(progress - lastReportedProgress) >= 0.005 || progress === 0 || progress === 1) {
    lastReportedProgress = progress;
    doc.style.setProperty("--scroll-progress", progress.toFixed(3));
  }

  listeners.forEach((l) => {
    const past = y > l.threshold;
    if (past !== l.last) {
      l.last = past;
      l.notify(past);
    }
  });
}

function onScroll() {
  if (isDirty) return;
  isDirty = true;
  rafId = requestAnimationFrame(readAndPublish);
}

function start() {
  if (started || typeof window === "undefined") return;
  started = true;
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  readAndPublish();
}

function stop() {
  if (!started) return;
  started = false;
  window.removeEventListener("scroll", onScroll);
  window.removeEventListener("resize", onScroll);
  if (rafId !== null) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
}

/**
 * Mount the shared driver. Call once, high in the tree (SmoothScroll does).
 * Safe to call from several places — it reference-counts.
 */
let mountCount = 0;
export function useScrollDriver(): void {
  useEffect(() => {
    mountCount++;
    start();
    return () => {
      mountCount--;
      if (mountCount <= 0) stop();
    };
  }, []);
}

/**
 * `true` once the page is scrolled past `threshold` pixels.
 * Re-renders only when the flag flips, not on every scroll frame.
 */
export function useScrollPast(threshold: number): boolean {
  const [past, setPast] = useState(false);

  useEffect(() => {
    start();
    const entry: ThresholdListener = {
      threshold,
      notify: setPast,
      last: false,
    };
    // Seed immediately so a mid-page reload renders the right state.
    const initial = (window.scrollY || 0) > threshold;
    entry.last = initial;
    setPast(initial);

    listeners.add(entry);
    return () => {
      listeners.delete(entry);
    };
  }, [threshold]);

  return past;
}
