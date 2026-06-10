"use client";

import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/**
 * Sticky-card scroll zoom that flips the page from light to dark.
 *
 *   wrapper: 200vh
 *   inner sticky card: scale 0.85 -> 1.0, radius 24 -> 0, opacity 0.6 -> 1.0
 *   body bg lerps from #F7F6F2 -> #080808
 *
 * At progress >= 0.95 we add `dark-mode-active` on <html>.
 * Below that threshold we remove it again so reverse scroll restores the page.
 */
export default function DarkTransition() {
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const cardRef = React.useRef<HTMLDivElement>(null);
  const vignetteRef = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const wrapper = wrapperRef.current;
      const card = cardRef.current;
      const vignette = vignetteRef.current;
      if (!wrapper || !card) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        document.documentElement.classList.add("dark-mode-active");
        gsap.set(card, {
          scale: 1,
          borderRadius: 0,
          opacity: 1,
          clearProps: "transform",
        });
        if (vignette) gsap.set(vignette, { opacity: 0 });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const applyProgress = (p: number) => {
          const scale = 0.85 + p * 0.15;
          const radius = 24 - p * 24;
          const opacity = 0.6 + p * 0.4;

          gsap.set(card, {
            scale,
            borderRadius: `${radius}px`,
            opacity,
          });

          const r = Math.round(lerp(247, 8, p));
          const g = Math.round(lerp(246, 8, p));
          const b = Math.round(lerp(242, 8, p));
          document.body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;

          if (vignette) {
            let vignetteOpacity = 0;
            if (p >= 0.7 && p < 0.85) {
              vignetteOpacity = gsap.utils.mapRange(0.7, 0.85, 0, 0.12, p);
            } else if (p >= 0.85 && p < 0.95) {
              vignetteOpacity = gsap.utils.mapRange(0.85, 0.95, 0.12, 0, p);
            }
            gsap.set(vignette, { opacity: vignetteOpacity });
          }

          if (p >= 0.95) {
            document.documentElement.classList.add("dark-mode-active");
          } else {
            document.documentElement.classList.remove("dark-mode-active");
          }
        };

        ScrollTrigger.create({
          trigger: wrapper,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          onUpdate: (self) => applyProgress(self.progress),
          onRefresh: (self) => applyProgress(self.progress),
        });
      });

      return () => mm.revert();
    },
    { scope: wrapperRef }
  );

  return (
    <div ref={wrapperRef} className="dark-transition-wrapper" aria-hidden="true">
      <div ref={vignetteRef} className="dark-transition-vignette" aria-hidden="true" />
      <div ref={cardRef} className="dark-card">
        <div className="dark-card-content">
          <span className="eyebrow">A new chapter</span>
          <h2>Built for scale. Tuned for performance.</h2>
          <p>
            From here on, you&apos;re inside the work — projects, process, and
            the team behind every Solve Trend launch.
          </p>
        </div>
      </div>
    </div>
  );
}
