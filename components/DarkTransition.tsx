"use client";

import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { asset } from "@/lib/asset";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/**
 * The "Creative [reel] Studio" runway: a small pill card holding the looping
 * showreel un-crops into a full-bleed reel as the section scrubs, flipping the
 * page into dark mode at the end of the expand.
 *
 * (The flight-path "How We Work" phase that used to follow the expand was
 * retired 2026-08-10 — the Benefits bento section replaced it.)
 */
export default function DarkTransition() {
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const expandRef = React.useRef<HTMLDivElement>(null);
  const cardRef = React.useRef<HTMLDivElement>(null);
  const reelRef = React.useRef<HTMLVideoElement>(null);
  const wordLeftRef = React.useRef<HTMLSpanElement>(null);
  const wordRightRef = React.useRef<HTMLSpanElement>(null);
  const vignetteRef = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const expand = expandRef.current;
      const card = cardRef.current;
      const vignette = vignetteRef.current;
      if (!expand || !card) return;

      const wordLeft = wordLeftRef.current;
      const wordRight = wordRightRef.current;

      const getSmallCardSize = () => {
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        return {
          w: Math.min(Math.max(vw * 0.18, 140), 280),
          h: Math.min(Math.max(vh * 0.07, 56), 96),
        };
      };

      const applyExpandProgress = (p: number) => {
        const { w: startW, h: startH } = getSmallCardSize();

        gsap.set(card, {
          width: lerp(startW, window.innerWidth, p),
          height: lerp(startH, window.innerHeight, p),
          borderRadius: `${lerp(14, 0, p)}px`,
        });

        // Fade spread over p 0.10–0.45 so the words stay readable through the
        // first stretch of the runway instead of vanishing immediately.
        const wordFade = gsap.utils.clamp(0, 1, (p - 0.1) / 0.35);
        if (wordLeft) gsap.set(wordLeft, { opacity: 1 - wordFade });
        if (wordRight) gsap.set(wordRight, { opacity: 1 - wordFade });

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

        document.documentElement.classList.toggle("dark-mode-active", p >= 0.95);
      };

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        document.body.style.backgroundColor = "#080808";

        gsap.set(card, {
          width: window.innerWidth,
          height: window.innerHeight,
          borderRadius: 0,
        });
        if (wordLeft) gsap.set(wordLeft, { opacity: 0 });
        if (wordRight) gsap.set(wordRight, { opacity: 0 });
        if (vignette) gsap.set(vignette, { opacity: 0 });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // The reel only spends battery while the expand runway is anywhere
        // near the viewport. Under reduced motion it never plays — the poster
        // frame stands in.
        const reel = reelRef.current;
        if (reel) {
          ScrollTrigger.create({
            trigger: expand,
            start: "top bottom",
            end: "bottom top",
            onToggle: (self) => {
              if (self.isActive) {
                reel.play().catch(() => {});
              } else {
                reel.pause();
              }
            },
          });
        }

        ScrollTrigger.create({
          trigger: expand,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          onUpdate: (self) => applyExpandProgress(self.progress),
          onRefresh: (self) => applyExpandProgress(self.progress),
        });
      });

      return () => mm.revert();
    },
    { scope: wrapperRef }
  );

  return (
    <section
      ref={wrapperRef}
      className="dark-transition-wrapper"
      id="featured-work"
      aria-label="Showreel"
    >
      <div ref={vignetteRef} className="dark-transition-vignette" aria-hidden="true" />

      <div ref={expandRef} className="dark-transition-expand">
        <div className="dark-transition-sticky">
          <div className="dark-transition-row">
            <span
              ref={wordLeftRef}
              className="dark-transition-word dark-transition-word--left"
            >
              Creative
            </span>
            {/* The card is no longer an empty black slab: the showreel loops
                inside it, so the pill "Creative [reel] Studio" un-crops into
                a full-bleed reel as the runway scrubs. object-fit: cover does
                the reframing at every size between pill and viewport. */}
            <div ref={cardRef} className="dark-card" aria-hidden="true">
              <video
                ref={reelRef}
                className="dark-card__reel"
                src={asset("/showreel/showreel.mp4")}
                poster={asset("/showreel/showreel-poster.jpg")}
                muted
                loop
                playsInline
                preload="metadata"
              />
            </div>
            <span
              ref={wordRightRef}
              className="dark-transition-word dark-transition-word--right"
            >
              Studio
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
