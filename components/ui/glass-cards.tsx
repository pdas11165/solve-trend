"use client";

import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { PhilosophyBlock } from "@/lib/philosophy";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type GlassStackCardProps = {
  block: PhilosophyBlock;
  index: number;
  totalCards: number;
};

function borderGradient(color: string) {
  const mid = color.replace("0.8", "0.6").replace("0.75", "0.55").replace("0.7", "0.5").replace("0.65", "0.45").replace("0.6", "0.4");
  const low = color.replace("0.8", "0.4").replace("0.75", "0.35").replace("0.7", "0.3").replace("0.65", "0.28").replace("0.6", "0.25");
  return `conic-gradient(from 0deg, transparent 0deg, ${color} 60deg, ${mid} 120deg, transparent 180deg, ${low} 240deg, transparent 360deg)`;
}

export function GlassStackCard({ block, index, totalCards }: GlassStackCardProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const cardRef = React.useRef<HTMLDivElement>(null);
  const eyebrowRef = React.useRef<HTMLSpanElement>(null);
  const headlineRef = React.useRef<HTMLHeadingElement>(null);
  const bodyRef = React.useRef<HTMLParagraphElement>(null);

  const targetScale = 1 - (totalCards - index) * 0.05;

  useGSAP(
    () => {
      const container = containerRef.current;
      const card = cardRef.current;
      const eyebrow = eyebrowRef.current;
      const headline = headlineRef.current;
      const body = bodyRef.current;
      if (!container || !card) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(card, { scale: targetScale, transformOrigin: "center top" });
        if (eyebrow && headline && body) {
          gsap.set([eyebrow, headline, body], { opacity: 1, y: 0 });
        }
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(card, { scale: 1, transformOrigin: "center top" });
        if (eyebrow && headline && body) {
          gsap.set(eyebrow, { opacity: 0, y: 20 });
          gsap.set(headline, { opacity: 0, y: 30 });
          gsap.set(body, { opacity: 0, y: 20 });
        }

        ScrollTrigger.create({
          trigger: container,
          start: "top center",
          end: "bottom center",
          scrub: 1,
          onUpdate: (self) => {
            const scale = gsap.utils.interpolate(1, targetScale, self.progress);
            gsap.set(card, {
              scale: Math.max(scale, targetScale),
              transformOrigin: "center top",
            });

            if (eyebrow && headline && body) {
              const p = self.progress;
              gsap.set(eyebrow, {
                opacity: gsap.utils.clamp(0, 1, p * 3),
                y: gsap.utils.interpolate(20, 0, gsap.utils.clamp(0, 1, p * 3)),
              });
              gsap.set(headline, {
                opacity: gsap.utils.clamp(0, 1, (p - 0.1) * 3),
                y: gsap.utils.interpolate(30, 0, gsap.utils.clamp(0, 1, (p - 0.1) * 3)),
              });
              gsap.set(body, {
                opacity: gsap.utils.clamp(0, 1, (p - 0.2) * 3),
                y: gsap.utils.interpolate(20, 0, gsap.utils.clamp(0, 1, (p - 0.2) * 3)),
              });
            }
          },
        });
      });

      return () => mm.revert();
    },
    { scope: containerRef, dependencies: [index, totalCards, targetScale] }
  );

  return (
    <div
      ref={containerRef}
      className="philosophy-glass-card__sticky"
      style={{ "--glass-i": index } as React.CSSProperties}
    >
      <div ref={cardRef} className="philosophy-glass-card">
        <div
          className="philosophy-glass-card__border"
          style={{ background: borderGradient(block.color) }}
          aria-hidden="true"
        />
        <div className="philosophy-glass-card__surface">
          <div className="philosophy-glass-card__reflection" aria-hidden="true" />
          <div className="philosophy-glass-card__shine" aria-hidden="true" />
          <div className="philosophy-glass-card__edge" aria-hidden="true" />
          <div className="philosophy-glass-card__texture" aria-hidden="true" />
          <div className="philosophy-glass-card__content">
            <span ref={eyebrowRef} className="philosophy-glass-card__eyebrow">
              {block.eyebrow}
            </span>
            <h3 ref={headlineRef} className="philosophy-glass-card__headline">
              {block.headline}
            </h3>
            <p ref={bodyRef} className="philosophy-glass-card__body">
              {block.body}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

type GlassStackSectionProps = {
  blocks: PhilosophyBlock[];
};

export function GlassStackSection({ blocks }: GlassStackSectionProps) {
  const sectionRef = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      ScrollTrigger.refresh();
    },
    { scope: sectionRef }
  );

  return (
    <div ref={sectionRef} className="philosophy-glass-stack">
      {blocks.map((block, index) => (
        <GlassStackCard
          key={block.id}
          block={block}
          index={index}
          totalCards={blocks.length}
        />
      ))}
    </div>
  );
}
