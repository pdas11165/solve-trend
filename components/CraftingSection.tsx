"use client";

import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ResultsCards from "./ResultsCards";
import { RevealText } from "@/components/ui/reveal-text";
import { useParallaxLayers } from "@/lib/scroll-parallax";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const AWAKE_CDN =
  "https://cdn.prod.website-files.com/67a5fb8bc33c7f25ab4e52d9";

const BADGES = [
  {
    id: "strategy",
    label: "Strategy",
    icon: `${AWAKE_CDN}/67aaddc4819d3c15ab088565_Frame%20(1).svg`,
    className: "crafting-badge crafting-badge--strategy",
  },
  {
    id: "creativity",
    label: "Creativity",
    icon: `${AWAKE_CDN}/67aadb9ec80cd595bb214692_Magic%20Stick.svg`,
    className: "crafting-badge crafting-badge--creativity",
  },
  {
    id: "technology",
    label: "Technology",
    icon: `${AWAKE_CDN}/67aaddc4c79cc5141322f4db_Frame.svg`,
    className: "crafting-badge crafting-badge--technology",
  },
];

function BadgeIcons() {
  return (
    <span className="crafting-badge-icons" aria-hidden="true">
      <span className="crafting-badge-icon i1">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
          <path d="M12 2l2.4 6.9H22l-6 4.4 2.3 7-6.3-4.6L5.7 20l2.3-7-6-4.4h7.6z" />
        </svg>
      </span>
      <span className="crafting-badge-icon i2">
        <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
          <rect x="4" y="4" width="16" height="16" rx="4" />
        </svg>
      </span>
      <span className="crafting-badge-icon i3">
        <svg viewBox="0 0 24 24" width="11" height="11" fill="currentColor">
          <circle cx="12" cy="12" r="9" />
        </svg>
      </span>
    </span>
  );
}

const BRAND_LOGOS = [
  `${AWAKE_CDN}/68e4f1b2e90a76715c1a1806_brand-icon-2.svg`,
  `${AWAKE_CDN}/68e4f1b2e90a76715c1a1809_brand-icon-5.svg`,
  `${AWAKE_CDN}/68e4f1b2e90a76715c1a1808_brand-icon-3.svg`,
  `${AWAKE_CDN}/68e4f1b2e90a76715c1a1807_brand-icon-1.svg`,
  `${AWAKE_CDN}/68e4f1b2e90a76715c1a1805_brand-icon-4.svg`,
];

function LogoMarquee() {
  const rows = [BRAND_LOGOS, BRAND_LOGOS];

  return (
    <div className="crafting-marquee" aria-label="Trusted brands">
      <div className="crafting-marquee__divider">
        <span className="crafting-marquee__line" aria-hidden="true" />
        <p>Trusted by ambitious brands across North America and beyond</p>
        <span className="crafting-marquee__line" aria-hidden="true" />
      </div>
      <div className="crafting-marquee__wrap">
        <div className="crafting-marquee__track">
          {rows.map((row, rowIndex) => (
            <div key={rowIndex} className="crafting-marquee__row">
              {row.map((src, i) => (
                <img
                  key={`${rowIndex}-${i}`}
                  src={src}
                  alt=""
                  width={140}
                  height={40}
                  loading="lazy"
                />
              ))}
            </div>
          ))}
        </div>
        <div className="crafting-marquee__fade crafting-marquee__fade--left" aria-hidden="true" />
        <div className="crafting-marquee__fade crafting-marquee__fade--right" aria-hidden="true" />
      </div>
    </div>
  );
}

export default function CraftingSection() {
  const root = React.useRef<HTMLElement>(null);

  useParallaxLayers(root, ".crafting-result", [0.35, 0.55, 0.75], {
    trigger: root,
  });

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".crafting-badge", { opacity: 1, y: 0 });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // The heading now reveals via RevealText (shared word-rise grammar);
        // GSAP only staggers the badges in behind it.
        gsap.set(".crafting-badge", { opacity: 0, y: 100 });

        const slideIn = {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power4.out",
        };

        [
          ".crafting-badge--strategy",
          ".crafting-badge--creativity",
          ".crafting-badge--technology",
        ].forEach((selector, i) => {
          gsap.to(selector, {
            ...slideIn,
            delay: [0.1, 0.3, 0.5][i],
            scrollTrigger: {
              trigger: ".crafting-badges",
              start: "top 90%",
              once: true,
            },
          });
        });
      });

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="crafting-section"
      id="about"
      aria-label="About Solve Trend"
    >
      <div className="container crafting-section__inner">
        <div className="crafting-intro">
          <RevealText
            as="h2"
            className="crafting-heading"
            text="Strategy, creativity, and technology, mixed until your idea turns into something people can’t put down."
          />
          <div className="crafting-badges">
            {BADGES.map((badge) => (
              <div key={badge.id} className={badge.className} tabIndex={0}>
                <img src={badge.icon} alt="" loading="lazy" />
                <span className="crafting-badge__word">{badge.label}</span>
                <BadgeIcons />
              </div>
            ))}
          </div>
        </div>

        <ResultsCards />
        <LogoMarquee />
      </div>
    </section>
  );
}
