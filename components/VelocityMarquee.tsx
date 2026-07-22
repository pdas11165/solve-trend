"use client";

import * as React from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";

const PHRASE = "Brand · Web · Motion · AI · eCommerce · Strategy · ";
/** Base drift in percent of one phrase-copy per second. */
const BASE_SPEED = 4.5;

const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return min + (((v - min) % range) + range) % range;
};

/**
 * Awwwards-staple divider: a strip of outlined display type that drifts
 * sideways on its own and leans into your scroll velocity (faster scroll =
 * faster drift + a subtle skew). Static strip under reduced motion.
 */
export default function VelocityMarquee() {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(velocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1200], [0, 4], {
    clamp: false,
  });
  const skewX = useTransform(smoothVelocity, [-1200, 1200], [-3, 3]);

  // Four copies render side by side; x wraps every -25% for a seamless loop.
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    let moveBy = -BASE_SPEED * (delta / 1000) * 0.25;
    moveBy += moveBy * Math.abs(velocityFactor.get());
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div
      className="overflow-hidden bg-[var(--bg-dark)] py-6 md:py-10"
      aria-hidden="true"
    >
      <motion.div
        className="flex w-max whitespace-nowrap will-change-transform"
        style={reduce ? undefined : { x, skewX }}
      >
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className="velocity-marquee-text">
            {PHRASE}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
