"use client";

import React, { useRef, useCallback } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  /** Maximum rotation in degrees on each axis. */
  maxTilt?: number;
  /** Lift the card toward the viewer on hover. */
  lift?: number;
  /** Render a soft glare that follows the pointer. */
  glare?: boolean;
}

/**
 * Pointer-reactive 3D tilt surface.
 *
 * Performance note: this writes transforms directly to the DOM node rather
 * than storing pointer position in React state. An earlier version called
 * `setState` on every `pointermove`, which re-rendered the card (and anything
 * below it) dozens of times per second — with six of these on the home page
 * that was a measurable hover stall. Mutating `style` keeps the work on the
 * compositor and triggers zero renders.
 *
 * Degrades to a plain <div> under `prefers-reduced-motion`, and only responds
 * to fine pointers so touch scrolling is never intercepted.
 */
export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = "",
  maxTilt = 7,
  lift = 6,
  glare = true,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const handleMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (shouldReduceMotion || e.pointerType !== "mouse") return;
      const node = ref.current;
      if (!node) return;

      const { clientX, clientY } = e;

      // Coalesce multiple pointer events into one write per frame.
      if (frameRef.current !== null) return;
      frameRef.current = requestAnimationFrame(() => {
        frameRef.current = null;
        const rect = node.getBoundingClientRect();
        const px = (clientX - rect.left) / rect.width;
        const py = (clientY - rect.top) / rect.height;
        const rotateY = (px - 0.5) * maxTilt * 2;
        const rotateX = -(py - 0.5) * maxTilt * 2;

        node.style.transform = `perspective(900px) rotateX(${rotateX.toFixed(
          2
        )}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(${lift}px)`;
        node.style.transition = "transform 80ms linear";

        if (glareRef.current) {
          glareRef.current.style.opacity = "1";
          glareRef.current.style.setProperty("--gx", `${(px * 100).toFixed(1)}%`);
          glareRef.current.style.setProperty("--gy", `${(py * 100).toFixed(1)}%`);
        }
      });
    },
    [shouldReduceMotion, maxTilt, lift]
  );

  const handleLeave = useCallback(() => {
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
    const node = ref.current;
    if (node) {
      node.style.transition = "transform 420ms cubic-bezier(0.16, 1, 0.3, 1)";
      node.style.transform = "";
    }
    if (glareRef.current) glareRef.current.style.opacity = "0";
  }, []);

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={{ transformStyle: "preserve-3d" }}
      className={cn("relative will-change-transform", className)}
    >
      {children}
      {glare && (
        <div
          ref={glareRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden opacity-0 transition-opacity duration-300"
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(420px circle at var(--gx, 50%) var(--gy, 50%), rgba(255,255,255,0.18), transparent 62%)",
            }}
          />
        </div>
      )}
    </div>
  );
};
