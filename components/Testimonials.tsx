"use client";

import * as React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useParallaxLayer } from "@/lib/scroll-parallax";

const ROTATE_MS = 6000;

const TESTIMONIALS = [
  {
    id: "duo",
    quote:
      "Solve Trend felt like an extension of our founding team. The relaunch tripled our conversion overnight.",
    name: "Duo Nutrition",
    role: "Founding Team",
  },
  {
    id: "lesse",
    quote:
      "Every detail landed exactly where it needed to. The team thinks in systems, not in pages.",
    name: "Lesse Studio",
    role: "Creative Director",
  },
  {
    id: "aeruk",
    quote:
      "We finally know what's working. Solve Trend built the whole growth engine in eight weeks.",
    name: "AERUK Digital",
    role: "Growth Lead",
  },
];

export default function Testimonials() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const [progressKey, setProgressKey] = React.useState(0);
  const sectionRef = React.useRef<HTMLElement>(null);
  const trackRef = React.useRef<HTMLDivElement>(null);

  useParallaxLayer(trackRef, { speed: 0.45, trigger: sectionRef });

  const goTo = React.useCallback((index: number) => {
    setActive(index);
    setProgressKey((k) => k + 1);
  }, []);

  React.useEffect(() => {
    if (reduceMotion || paused) return;
    const id = setInterval(() => {
      setActive((i) => (i + 1) % TESTIMONIALS.length);
      setProgressKey((k) => k + 1);
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, [reduceMotion, paused]);

  const current = TESTIMONIALS[active];

  return (
    <section
      ref={sectionRef}
      className="testimonials"
      id="testimonials"
      aria-label="Client testimonials"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          setPaused(false);
        }
      }}
    >
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">Testimonials</span>
            <h2 style={{ marginTop: 12 }}>Trusted by ambitious brands.</h2>
          </div>
          <p className="lead">
            Real words from teams we&apos;ve partnered with — placeholder quotes
            until final client approvals are confirmed.
          </p>
        </div>

        <div className="testimonials__track" ref={trackRef}>
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={current.id}
              className="testimonials__card is-active"
              initial={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: 12, filter: "blur(4px)" }
              }
              animate={
                reduceMotion
                  ? { opacity: 1 }
                  : { opacity: 1, y: 0, filter: "blur(0px)" }
              }
              exit={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: -12, filter: "blur(4px)" }
              }
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="testimonials__quote">&ldquo;{current.quote}&rdquo;</p>
              <footer className="testimonials__meta">
                <cite className="testimonials__name">{current.name}</cite>
                <span className="testimonials__role">{current.role}</span>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <div className="testimonials__dots" role="tablist" aria-label="Testimonial slides">
          {TESTIMONIALS.map((item, index) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              className={`testimonials__dot${index === active ? " is-active" : ""}`}
              aria-selected={index === active}
              aria-label={`Show testimonial from ${item.name}`}
              onClick={() => goTo(index)}
            >
              {index === active && !reduceMotion ? (
                <span
                  key={progressKey}
                  className="testimonials__dot-progress"
                  aria-hidden="true"
                />
              ) : null}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
