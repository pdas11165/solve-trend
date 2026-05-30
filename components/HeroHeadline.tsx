"use client";

import { TextRotate } from "@/components/ui/text-rotate";

const ROTATING_SERVICES = [
  "UI/UX",
  "BRANDING",
  "WEBSITES",
  "DIGITAL MARKETING",
  "SEO",
  "DATA & AI",
];

export default function HeroHeadline() {
  return (
    <h1 className="hero-headline">
      <span className="hero-word-gradient">SOLVE</span>{" "}
      <span>TREND</span>
      <span className="hero-headline-sep" aria-hidden="true">
        {" "}
        ·{" "}
      </span>
      <TextRotate
        texts={ROTATING_SERVICES}
        mainClassName="hero-word-gradient overflow-hidden pr-1"
        staggerDuration={0.03}
        staggerFrom="last"
        rotationInterval={3000}
        transition={{ type: "spring", damping: 30, stiffness: 400 }}
      />
    </h1>
  );
}
