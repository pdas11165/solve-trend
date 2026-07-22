"use client";

import * as React from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Lenis smooth-scroll wired into GSAP so every pinned / scrubbed ScrollTrigger
 * (the hero orbit-morph, the dark cinematic sequence, all the parallax) stays
 * locked to the smoothed scroll position:
 *   - lenis.raf is driven by gsap.ticker (single rAF loop, no drift)
 *   - ScrollTrigger.update fires on every lenis scroll
 *   - lagSmoothing(0) so GSAP never fast-forwards past a stutter
 *
 * Touch devices and prefers-reduced-motion fall back to native scrolling.
 */
export default function SmoothScroll() {
  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      lerp: 0.11,
      smoothWheel: true,
      syncTouch: false, // touch = native scroll (avoids mobile pin jank)
    });

    lenis.on("scroll", ScrollTrigger.update);

    if (process.env.NODE_ENV !== "production") {
      (window as unknown as Record<string, unknown>).__lenis = lenis;
    }

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Route in-page anchor links (nav, CTAs) through Lenis for a smooth glide
    // instead of a native jump; offset clears the fixed nav.
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey) return;
      const anchor = (e.target as HTMLElement | null)?.closest(
        'a[href*="#"]'
      ) as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute("href") || "";
      const hashIndex = href.indexOf("#");
      if (hashIndex === -1) return;
      const hash = href.slice(hashIndex);
      if (hash.length < 2) return;
      const dest = document.querySelector(hash);
      if (!dest) return;
      e.preventDefault();
      lenis.scrollTo(dest as HTMLElement, { offset: -80 });
      window.history.pushState(null, "", hash);
    };
    document.addEventListener("click", onClick);

    // Recalculate trigger positions once fonts/images have settled.
    ScrollTrigger.refresh();

    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(raf);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
    };
  }, []);

  return null;
}
