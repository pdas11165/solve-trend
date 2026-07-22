"use client";

import * as React from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

const STATEMENT =
  "We make brands people remember — and systems that keep them growing. Strategy, craft, and AI, all working the same shift.";

function Word({
  progress,
  range,
  children,
}: {
  progress: MotionValue<number>;
  range: [number, number];
  children: string;
}) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block">
      {children}
    </motion.span>
  );
}

/**
 * Scrubbed manifesto: the statement brightens word by word as it travels up
 * the viewport (lessestudio-style). Normal document flow — no pinning — so
 * it adds no extra scroll runway.
 */
export default function ManifestoSection() {
  const ref = React.useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.35"],
  });

  const words = STATEMENT.split(" ");

  return (
    <section
      ref={ref}
      className="bg-[var(--bg-light)] py-24 md:py-32"
      aria-label="Studio manifesto"
    >
      <p
        className="mx-auto max-w-4xl px-6 text-center font-[family-name:var(--font-display)] text-[clamp(1.75rem,4vw,3.25rem)] font-bold leading-[1.25] tracking-tight text-[#1A1A1A]"
        aria-label={STATEMENT}
      >
        {reduce ? (
          STATEMENT
        ) : (
          <span aria-hidden="true">
            {words.map((word, i) => {
              // Each word brightens over a window that overlaps its
              // neighbours, so the sweep reads as one continuous wave.
              const start = i / words.length;
              const end = Math.min(1, (i + 1.8) / words.length);
              return (
                <React.Fragment key={`${word}-${i}`}>
                  <Word progress={scrollYProgress} range={[start, end]}>
                    {word}
                  </Word>
                  {i < words.length - 1 ? " " : null}
                </React.Fragment>
              );
            })}
          </span>
        )}
      </p>
    </section>
  );
}
