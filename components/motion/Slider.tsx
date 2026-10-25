"use client";

import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SliderProps {
  children: React.ReactNode[];
  itemWidthClass?: string; // e.g. "w-[280px] sm:w-[340px]"
  className?: string;
  showDots?: boolean;
}

export const Slider: React.FC<SliderProps> = ({
  children,
  itemWidthClass = "w-[300px] sm:w-[360px]",
  className = "",
  showDots = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateScrollState = () => {
    if (!containerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

    // Calculate active slide
    const slideWidth = containerRef.current.firstElementChild?.clientWidth || clientWidth;
    const currentIdx = Math.round(scrollLeft / slideWidth);
    setActiveIndex(Math.min(currentIdx, children.length - 1));
  };

  useEffect(() => {
    updateScrollState();
    const el = containerRef.current;
    if (el) {
      el.addEventListener("scroll", updateScrollState, { passive: true });
      window.addEventListener("resize", updateScrollState);
      return () => {
        el.removeEventListener("scroll", updateScrollState);
        window.removeEventListener("resize", updateScrollState);
      };
    }
  }, [children.length]);

  const scrollBySlide = (direction: "left" | "right") => {
    if (!containerRef.current) return;
    const firstChild = containerRef.current.firstElementChild as HTMLElement;
    const slideWidth = firstChild ? firstChild.offsetWidth + 24 : 360;
    containerRef.current.scrollBy({
      left: direction === "left" ? -slideWidth : slideWidth,
      behavior: "smooth",
    });
  };

  const scrollToIndex = (index: number) => {
    if (!containerRef.current) return;
    const firstChild = containerRef.current.firstElementChild as HTMLElement;
    const slideWidth = firstChild ? firstChild.offsetWidth + 24 : 360;
    containerRef.current.scrollTo({
      left: index * slideWidth,
      behavior: "smooth",
    });
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      scrollBySlide("left");
    } else if (e.key === "ArrowRight") {
      scrollBySlide("right");
    }
  };

  return (
    <div className={`relative group ${className}`} onKeyDown={handleKeyDown}>
      {/* Slider Controls Bar */}
      <div className="flex items-center justify-between mb-4 px-1">
        {/* Progress dots */}
        {showDots && (
          <div className="flex items-center gap-1.5" aria-hidden="true">
            {children.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => scrollToIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeIndex === idx
                    ? "w-6 bg-ultramarine dark:bg-mint"
                    : "w-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}

        {/* Prev / Next Arrows */}
        <div className="flex items-center gap-2 ml-auto">
          <button
            type="button"
            onClick={() => scrollBySlide("left")}
            disabled={!canScrollLeft}
            className="w-10 h-10 rounded-xl bg-white dark:bg-[#12193E] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 flex items-center justify-center hover:bg-ultramarine hover:text-white dark:hover:bg-mint dark:hover:text-navy-950 transition-colors shadow-xs disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => scrollBySlide("right")}
            disabled={!canScrollRight}
            className="w-10 h-10 rounded-xl bg-white dark:bg-[#12193E] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 flex items-center justify-center hover:bg-ultramarine hover:text-white dark:hover:bg-mint dark:hover:text-navy-950 transition-colors shadow-xs disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Scrollable Track */}
      <div
        ref={containerRef}
        tabIndex={0}
        role="region"
        aria-label="Horizontal slider carousel"
        data-lenis-prevent
        className="flex gap-6 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scroll-smooth focus:outline-none focus:ring-1 focus:ring-ultramarine rounded-2xl no-scrollbar"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {children.map((child, idx) => (
          <div
            key={idx}
            className={`flex-shrink-0 snap-start ${itemWidthClass}`}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
};
