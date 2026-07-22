"use client";

import * as React from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Site-wide parallax tokens: one drift intensity and one overscan so every
 * piece of media shares the same depth. The overscan keeps the frame edges
 * covered at both extremes of the drift.
 */
const DRIFT_PERCENT = 7;
const OVERSCAN = 1.15;

/**
 * Wraps media inside an overflow-hidden frame and drifts it slightly slower
 * than the page while the frame crosses the viewport — the arounda-style
 * depth cue. Transforms live on this wrapper (never on the media itself),
 * so CSS hover effects on the media stay independent.
 */
export function ParallaxMedia({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`-${DRIFT_PERCENT}%`, `${DRIFT_PERCENT}%`]
  );

  return (
    <div ref={ref} className={cn("h-full w-full", className)}>
      <motion.div
        className="h-full w-full will-change-transform"
        style={reduce ? undefined : { y, scale: OVERSCAN }}
      >
        {children}
      </motion.div>
    </div>
  );
}
