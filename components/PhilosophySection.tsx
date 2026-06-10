"use client";

import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const BLOCKS = [
  {
    id: "think",
    eyebrow: "How We Think",
    headline: "Solve Problems, Not Just Projects.",
    body: "We believe great work starts with understanding. Every brand, experience and system we create is built with purpose and long-term impact in mind.",
  },
  {
    id: "dna",
    eyebrow: "Our DNA",
    headline: "Strategy × Creativity × Technology",
    body: "At Solve Trend, we combine human insight, creative thinking and intelligent systems to help businesses adapt and grow.",
  },
  {
    id: "inside",
    eyebrow: "Inside Solve Trend",
    headline: "More Than An Agency.",
    body: "A creative, digital and AI innovation studio. Branding, Experiences, Commerce, Automation, Intelligence.",
  },
  {
    id: "believe",
    eyebrow: "What We Believe",
    headline: "Creativity Should Create Value.",
    body: "Beautiful work means nothing without impact. Strategy, Experiences, Systems, Growth, Innovation.",
  },
  {
    id: "drives",
    eyebrow: "What Drives Us",
    headline: "Building What's Next.",
    body: "From brand identities to AI-powered systems, we help ambitious businesses create meaningful impact and sustainable growth.",
  },
];

export default function PhilosophySection() {
  const root = React.useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".philosophy-card", { opacity: 1, y: 0 });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>(".philosophy-card").forEach((card, i) => {
          gsap.from(card, {
            y: 48 + i * 8,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              once: true,
            },
          });

          gsap.to(card.querySelector(".philosophy-card__bg"), {
            yPercent: -12 * (i + 1) * 0.15,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
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
      className="philosophy-section"
      id="philosophy"
      aria-label="Our philosophy"
    >
      <div className="container">
        <div className="philosophy-section__head">
          <span className="eyebrow">Our Philosophy</span>
          <h2>What guides every Solve Trend engagement.</h2>
        </div>
        <div className="philosophy-grid">
          {BLOCKS.map((block) => (
            <article key={block.id} className="philosophy-card">
              <div className="philosophy-card__bg" aria-hidden="true" />
              <span className="philosophy-card__eyebrow">{block.eyebrow}</span>
              <h3 className="philosophy-card__headline">{block.headline}</h3>
              <p className="philosophy-card__body">{block.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
