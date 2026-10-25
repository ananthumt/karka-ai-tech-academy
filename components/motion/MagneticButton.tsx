"use client";

import React, { useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  shine?: boolean;
  className?: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  shine = false,
  className = "",
  ...props
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const shouldReduceMotion = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (shouldReduceMotion || !buttonRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    // Max 8px magnetic pull
    const deltaX = (clientX - centerX) * 0.15;
    const deltaY = (clientY - centerY) * 0.15;
    const clampX = Math.max(-8, Math.min(8, deltaX));
    const clampY = Math.max(-8, Math.min(8, deltaY));
    setPosition({ x: clampX, y: clampY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: position.x === 0 ? "transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)" : "none",
      }}
      // Default to "button" so dropping this inside a <form> never submits it
      // implicitly. Callers can still pass type="submit" explicitly.
      type={props.type ?? "button"}
      className={`relative overflow-hidden group active:scale-[0.98] transition-transform ${className}`}
      {...props}
    >
      {shine && (
        <span
          className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out pointer-events-none"
          aria-hidden="true"
        />
      )}
      {children}
    </button>
  );
};
