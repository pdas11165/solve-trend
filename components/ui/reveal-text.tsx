"use client";

import * as React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.055, delayChildren: 0.05 },
  },
};

const word: Variants = {
  hidden: { y: "110%", opacity: 0, filter: "blur(6px)" },
  visible: {
    y: "0%",
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
};

/**
 * Word-by-word rise reveal for headings, triggered when scrolled into view.
 * Falls back to plain text when the user prefers reduced motion.
 */
export function RevealText({
  text,
  className,
  as: Tag = "span",
}: {
  text: string;
  className?: string;
  as?: React.ElementType;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag className={className} aria-label={text}>
      <motion.span
        className="inline"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
        aria-hidden="true"
      >
        {text.split(" ").map((w, i) => (
          <span key={`${w}-${i}`} className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em] align-bottom">
            <motion.span className="inline-block will-change-transform" variants={word}>
              {w}
            </motion.span>
            {i < text.split(" ").length - 1 ? " " : null}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
