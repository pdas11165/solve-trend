"use client";

import * as React from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { PROJECTS } from "@/lib/projects";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const cardClass = (variant: (typeof PROJECTS)[number]["variant"]) => {
  if (variant === "offset") return "dark-project-card dark-project-card--offset";
  if (variant === "compact") return "dark-project-card dark-project-card--compact";
  return "dark-project-card";
};

export default function DarkTransition() {
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const expandRef = React.useRef<HTMLDivElement>(null);
  const cardRef = React.useRef<HTMLDivElement>(null);
  const wordLeftRef = React.useRef<HTMLSpanElement>(null);
  const wordRightRef = React.useRef<HTMLSpanElement>(null);
  const vignetteRef = React.useRef<HTMLDivElement>(null);
  const marqueeRef = React.useRef<HTMLDivElement>(null);
  const headingRef = React.useRef<HTMLHeadingElement>(null);
  const trackRef = React.useRef<HTMLDivElement>(null);
  const viewportRef = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const expand = expandRef.current;
      const card = cardRef.current;
      const vignette = vignetteRef.current;
      const marquee = marqueeRef.current;
      const heading = headingRef.current;
      const track = trackRef.current;
      const viewport = viewportRef.current;
      if (!expand || !card || !marquee || !track || !viewport) return;

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
        const endW = window.innerWidth;
        const endH = window.innerHeight;

        gsap.set(card, {
          width: lerp(startW, endW, p),
          height: lerp(startH, endH, p),
          borderRadius: `${lerp(14, 0, p)}px`,
        });

        const wordFade = gsap.utils.clamp(0, 1, (p - 0.08) / 0.22);
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

        if (p >= 0.95) {
          document.documentElement.classList.add("dark-mode-active");
        } else {
          document.documentElement.classList.remove("dark-mode-active");
        }
      };

      const applyMarqueeProgress = (p: number) => {
        const travel = Math.max(track.scrollWidth - viewport.clientWidth, 0);

        gsap.set(track, { x: -travel * p });

        document.documentElement.classList.add("dark-mode-active");
        document.body.style.backgroundColor = "rgb(8, 8, 8)";

        if (heading) {
          const headingP = gsap.utils.clamp(0, 1, p / 0.28);
          gsap.set(heading, {
            xPercent: lerp(-200, -50, headingP),
            yPercent: lerp(200, -50, headingP),
          });
        }

        const compactCard = track.querySelector<HTMLElement>(
          ".dark-project-card--compact"
        );
        if (compactCard) {
          const compactP = gsap.utils.clamp(0, 1, (p - 0.18) / 0.22);
          gsap.set(compactCard, { opacity: compactP });
        }
      };

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        document.documentElement.classList.add("dark-mode-active");
        document.body.style.backgroundColor = "#080808";

        gsap.set(card, {
          width: window.innerWidth,
          height: window.innerHeight,
          borderRadius: 0,
        });
        if (wordLeft) gsap.set(wordLeft, { opacity: 0 });
        if (wordRight) gsap.set(wordRight, { opacity: 0 });
        if (vignette) gsap.set(vignette, { opacity: 0 });
        if (heading) gsap.set(heading, { xPercent: -50, yPercent: -50 });
        gsap.set(track, { x: 0, clearProps: "transform" });
        gsap.set(".dark-project-card--compact", { opacity: 1 });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        if (heading) {
          gsap.set(heading, { xPercent: -200, yPercent: 200 });
        }
        gsap.set(".dark-project-card--compact", { opacity: 0 });

        const refreshAll = () => {
          ScrollTrigger.refresh();
        };

        ScrollTrigger.create({
          trigger: expand,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          onUpdate: (self) => applyExpandProgress(self.progress),
          onRefresh: (self) => applyExpandProgress(self.progress),
        });

        ScrollTrigger.create({
          trigger: marquee,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          onUpdate: (self) => applyMarqueeProgress(self.progress),
          onRefresh: (self) => applyMarqueeProgress(self.progress),
        });

        const onResize = () => refreshAll();
        window.addEventListener("resize", onResize);
        requestAnimationFrame(refreshAll);

        return () => window.removeEventListener("resize", onResize);
      });

      return () => mm.revert();
    },
    { scope: wrapperRef, dependencies: [] }
  );

  return (
    <section
      ref={wrapperRef}
      className="dark-transition-wrapper"
      id="projects"
      aria-label="Featured projects"
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
            <div ref={cardRef} className="dark-card" aria-hidden="true" />
            <span
              ref={wordRightRef}
              className="dark-transition-word dark-transition-word--right"
            >
              Studio
            </span>
          </div>
        </div>
      </div>

      <div ref={marqueeRef} className="dark-projects-marquee">
        <div className="dark-projects-sticky">
          <div className="dark-projects-inner">
            <div className="dark-projects-heading-wrap">
              <h2 ref={headingRef} className="dark-projects-heading">
                Projects
              </h2>
            </div>
            <div ref={viewportRef} className="dark-projects-viewport">
              <div ref={trackRef} className="dark-projects-track">
                {PROJECTS.map((p, i) => (
                  <article key={p.name} className={cardClass(p.variant)}>
                    <div className="dark-project-card__image">
                      <Image
                        src={p.image}
                        alt={`${p.name} project preview`}
                        width={588}
                        height={360}
                        loading="lazy"
                        className="dark-project-card__img"
                        unoptimized
                      />
                    </div>
                    <div className="dark-project-card__meta">
                      <span className="dark-project-card__index">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="dark-project-card__name">{p.name}</h3>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
