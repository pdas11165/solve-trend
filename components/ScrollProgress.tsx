"use client";

import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function ScrollProgress() {
  const barRef = React.useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const bar = barRef.current;
    if (!bar) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(bar, { scaleX: 0, display: "none" });
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.set(bar, { scaleX: 0, transformOrigin: "left center", display: "block" });

      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          gsap.set(bar, { scaleX: self.progress });
        },
      });
    });

    return () => mm.revert();
  });

  return (
    <div
      ref={barRef}
      className="scroll-progress"
      role="progressbar"
      aria-hidden="true"
      aria-valuemin={0}
      aria-valuemax={100}
    />
  );
}
