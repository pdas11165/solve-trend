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
import { SERVICES } from "@/lib/services";

// One word per offer, each carrying that offer's accent — so the strip reads
// as the same colour-coded set as the services list rather than a single
// amber→red gradient applied to everything.
//
// Plus one word that isn't an offer: "Design" in yellow. It spans brand and
// web rather than belonging to either, and it puts a warm hue back in the
// strip that the 8→5 consolidation retired.
const EXTRA_WORD = { word: "Design", accent: "var(--brand-yellow)" };

const WORDS = (() => {
  const fromServices = SERVICES.map((s) => ({
    word: s.marqueeWord,
    accent: s.accent,
  }));
  // Slotted second so the yellow lands early in each repeat rather than
  // bunching at the seam between copies.
  return [fromServices[0], EXTRA_WORD, ...fromServices.slice(1)];
})();

/** Base drift in percent of one phrase-copy per second. */
const BASE_SPEED = 4.5;

/** One phrase copy, words split out so each can carry its own radiance and hover glow. */
function PhraseCopy() {
  return (
    <span className="velocity-marquee-text">
      {WORDS.map(({ word, accent }, i) => (
        <React.Fragment key={word}>
          <span
            className="velocity-word"
            style={
              {
                "--word-delay": `${i * 0.35}s`,
                "--word-color": accent,
              } as React.CSSProperties
            }
          >
            {word}
          </span>
          <span className="velocity-dot" aria-hidden="true">
            {" · "}
          </span>
        </React.Fragment>
      ))}
    </span>
  );
}

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
          <PhraseCopy key={i} />
        ))}
      </motion.div>
    </div>
  );
}
