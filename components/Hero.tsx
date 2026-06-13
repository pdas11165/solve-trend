"use client";

import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { DotGridArrow } from "./Icons";
import HeroHeadline from "./HeroHeadline";
import HeroMarquee from "./HeroMarquee";
import PulseGrid from "./PulseGrid";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Hero() {
  const root = React.useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
        tl.from(".hero-wordmark", {
          clipPath: "inset(0 0 100% 0)",
          filter: "blur(24px)",
          y: 80,
          scale: 1.08,
          opacity: 0,
          duration: 1.1,
        })
          .from(
            ".hero-subtitle",
            { y: 28, opacity: 0, filter: "blur(8px)", duration: 0.7 },
            "-=0.5"
          )
          .from(
            ".hero-cta-neo",
            { y: 20, scale: 0.96, opacity: 0, duration: 0.5 },
            "-=0.4"
          )
          .from(".hero-strips", { y: 80, opacity: 0, duration: 0.8 }, "-=0.5")
          .from(
            ".hero-strip",
            { opacity: 0, stagger: 0.06, duration: 0.5 },
            "-=0.6"
          );

        gsap.to(".hero-monument-wrap", {
          yPercent: -18,
          opacity: 0.25,
          filter: "blur(4px)",
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        gsap.to(".hero-strips-skew", {
          rotateX: 7,
          scale: 0.94,
          y: 40,
          transformPerspective: 1000,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="hero hero--monument"
      id="top"
      aria-label="Hero"
    >
      <PulseGrid
        shieldSelectors={[".hero-wordmark", ".hero-subtitle"]}
      />
      <div className="hero-monument-wrap">
        <HeroHeadline />
        <a className="hero-cta-neo" href="#contact">
          Start a project
          <DotGridArrow />
        </a>
      </div>
      <HeroMarquee />
    </section>
  );
}
