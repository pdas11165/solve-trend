"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

type RevealVariant = "fadeUp" | "clipReveal" | "none";

type SectionRevealProps = {
  children: React.ReactNode;
  index?: number;
  onMount?: boolean;
  variant?: RevealVariant;
  className?: string;
};

export default function SectionReveal({
  children,
  index = 0,
  onMount = false,
  variant = "fadeUp",
  className,
}: SectionRevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion || variant === "none") {
    return <div className={className}>{children}</div>;
  }

  const transition = {
    duration: variant === "clipReveal" ? 0.85 : 0.7,
    ease: [0.22, 1, 0.36, 1] as const,
    delay: index * 0.08,
  };

  const variants = {
    fadeUp: {
      hidden: { opacity: 0, y: 32 },
      shown: { opacity: 1, y: 0 },
    },
    clipReveal: {
      hidden: { opacity: 0, y: 24, clipPath: "inset(0 0 100% 0)" },
      shown: { opacity: 1, y: 0, clipPath: "inset(0 0 0 0)" },
    },
  };

  const { hidden, shown } = variants[variant];

  if (onMount) {
    return (
      <motion.div
        className={className}
        initial={hidden}
        animate={shown}
        transition={transition}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={hidden}
      whileInView={shown}
      viewport={{ once: true, amount: 0.2 }}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}
