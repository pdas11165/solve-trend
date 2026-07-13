"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function MagneticButtons() {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: reduce)", () => {});

    mm.add("(max-width: 768px)", () => {});

    mm.add("(prefers-reduced-motion: no-preference) and (min-width: 769px)", () => {
      const selectors = ".btn--primary, .pill-cta, .hero-cta-neo, .magnetic-cta";
      const buttons = gsap.utils.toArray<HTMLElement>(selectors);
      const cleanups: Array<() => void> = [];

      buttons.forEach((btn) => {
        const xTo = gsap.quickTo(btn, "x", { duration: 0.4, ease: "power3.out" });
        const yTo = gsap.quickTo(btn, "y", { duration: 0.4, ease: "power3.out" });

        const onMove = (e: MouseEvent) => {
          const rect = btn.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const dx = (e.clientX - cx) / rect.width;
          const dy = (e.clientY - cy) / rect.height;
          xTo(dx * 6);
          yTo(dy * 6);
        };

        const onLeave = () => {
          xTo(0);
          yTo(0);
        };

        btn.addEventListener("mousemove", onMove);
        btn.addEventListener("mouseleave", onLeave);
        cleanups.push(() => {
          btn.removeEventListener("mousemove", onMove);
          btn.removeEventListener("mouseleave", onLeave);
          gsap.set(btn, { x: 0, y: 0 });
        });
      });

      return () => cleanups.forEach((fn) => fn());
    });

    return () => mm.revert();
  });

  return null;
}
