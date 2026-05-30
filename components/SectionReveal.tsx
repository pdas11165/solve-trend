"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

type SectionRevealProps = {
  children: React.ReactNode;
  index?: number;
  onMount?: boolean;
  className?: string;
};

export default function SectionReveal({
  children,
  index = 0,
  onMount = false,
  className,
}: SectionRevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const transition = {
    duration: 0.7,
    ease: [0.22, 1, 0.36, 1] as const,
    delay: index * 0.08,
  };

  const hidden = { opacity: 0, y: 32 };
  const shown = { opacity: 1, y: 0 };

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
