"use client";

import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { PHILOSOPHY_BLOCKS } from "@/lib/philosophy";
import { GlassStackSection } from "@/components/ui/glass-cards";
import { ScrollCharacterText } from "@/components/ui/text-scroll-animation";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function PhilosophySection() {
  const root = React.useRef<HTMLElement>(null);
  const introRef = React.useRef<HTMLDivElement>(null);
  const eyebrowRef = React.useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const intro = introRef.current;
      const eyebrow = eyebrowRef.current;
      if (!intro || !eyebrow) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(eyebrow, { opacity: 1, y: 0 });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(eyebrow, { opacity: 0, y: 16 });

        gsap.to(eyebrow, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: intro,
            start: "top 80%",
            once: true,
          },
        });

        // The grid texture drifts against the scroll direction; the pattern
        // repeats every 54px so no edges are ever exposed.
        gsap.fromTo(
          ".philosophy-section__intro-grid",
          { backgroundPosition: "0px 0px, 0px 0px" },
          {
            backgroundPosition: "0px -108px, 0px -108px",
            ease: "none",
            scrollTrigger: {
              trigger: intro,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
      });

      ScrollTrigger.refresh();

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="philosophy-section philosophy-section--dark"
      id="philosophy"
      aria-label="Our philosophy"
    >
      <div ref={introRef} className="philosophy-section__intro">
        <div className="philosophy-section__intro-grid" aria-hidden="true" />
        <div className="philosophy-section__intro-content">
          <span ref={eyebrowRef} className="eyebrow">
            Our Philosophy
          </span>
          <h2 style={{ perspective: "500px" }}>
            <ScrollCharacterText
              text="What guides every Solve Trend engagement."
              scrollTargetRef={introRef}
              scrollOffset={["start 0.9", "start 0.5"]}
            />
          </h2>
        </div>
      </div>
      <GlassStackSection blocks={PHILOSOPHY_BLOCKS} />
    </section>
  );
}
