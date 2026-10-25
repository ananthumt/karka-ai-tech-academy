"use client";

import React, { useRef, useCallback } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  /** rgba colour of the radial highlight. */
  spotlightColor?: string;
  /** Radius of the highlight in px. */
  radius?: number;
}

/**
 * Card surface with a radial highlight that tracks the cursor.
 *
 * Writes CSS custom properties rather than React state so pointer movement
 * never triggers a re-render. See `.spotlight-surface` in globals.css for the
 * pure-CSS variant.
 */
export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = "",
  spotlightColor = "rgba(99, 102, 241, 0.15)",
  radius = 360,
  ...rest
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const handleMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (shouldReduceMotion || e.pointerType !== "mouse" || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      ref.current.style.setProperty("--sx", `${e.clientX - rect.left}px`);
      ref.current.style.setProperty("--sy", `${e.clientY - rect.top}px`);
      ref.current.style.setProperty("--s-opacity", "1");
    },
    [shouldReduceMotion]
  );

  const handleLeave = useCallback(() => {
    ref.current?.style.setProperty("--s-opacity", "0");
  }, []);

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={cn("group relative overflow-hidden", className)}
      {...rest}
    >
      {!shouldReduceMotion && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{
            opacity: "var(--s-opacity, 0)",
            transition: "opacity 320ms ease",
            background: `radial-gradient(${radius}px circle at var(--sx, 50%) var(--sy, 50%), ${spotlightColor}, transparent 70%)`,
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
};
