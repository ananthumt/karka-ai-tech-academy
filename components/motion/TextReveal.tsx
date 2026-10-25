"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface TextRevealProps {
  /** Plain text. Split per word so line wrapping still works naturally. */
  text: string;
  className?: string;
  /** Delay before the first word animates in, seconds. */
  delay?: number;
  /** Gap between consecutive words, seconds. */
  stagger?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  /** Highlight these words with the brand gradient (case-insensitive). */
  highlight?: string[];
}

/**
 * Word-by-word masked reveal for headlines.
 *
 * Renders the full string as static text under `prefers-reduced-motion`, so the
 * content is always present for screen readers and crawlers either way.
 */
export const TextReveal: React.FC<TextRevealProps> = ({
  text,
  className = "",
  delay = 0,
  stagger = 0.045,
  as: Tag = "span",
  highlight = [],
}) => {
  const shouldReduceMotion = useReducedMotion();
  const words = text.split(" ");
  const highlightSet = new Set(highlight.map((w) => w.toLowerCase().replace(/[^\w]/g, "")));

  const isHighlighted = (word: string) =>
    highlightSet.has(word.toLowerCase().replace(/[^\w]/g, ""));

  if (shouldReduceMotion) {
    return (
      <Tag className={className}>
        {words.map((w, i) => (
          <React.Fragment key={i}>
            {isHighlighted(w) ? <span className="text-gradient-brand">{w}</span> : w}
            {i < words.length - 1 ? " " : ""}
          </React.Fragment>
        ))}
      </Tag>
    );
  }

  return (
    <Tag className={className}>
      <span className="sr-only">{text}</span>
      <motion.span
        aria-hidden="true"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
        }}
        className="inline"
      >
        {words.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className="inline-block overflow-hidden align-bottom"
            style={{ paddingBottom: "0.08em" }}
          >
            <motion.span
              className={`inline-block ${isHighlighted(word) ? "text-gradient-brand" : ""}`}
              variants={{
                hidden: { y: "105%", opacity: 0 },
                visible: {
                  y: "0%",
                  opacity: 1,
                  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                },
              }}
            >
              {word}
            </motion.span>
            {i < words.length - 1 && <span>&nbsp;</span>}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
};
