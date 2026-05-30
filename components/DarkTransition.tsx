"use client";

import * as React from "react";

/**
 * Sticky-card scroll zoom that flips the page from light to dark.
 *
 *   wrapper: 200vh
 *   inner sticky card: scale 0.85 -> 1.0, radius 24 -> 0, opacity 0.6 -> 1.0
 *   body bg lerps from #F7F6F2 -> #080808
 *
 * At progress >= 0.95 we add `dark-mode-active` on <html>.
 * Below that threshold we remove it again so reverse scroll restores the page.
 */
export default function DarkTransition() {
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const cardRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const wrapper = wrapperRef.current;
    const card = cardRef.current;
    if (!wrapper || !card) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) {
      document.documentElement.classList.add("dark-mode-active");
      card.style.transform = "scale(1)";
      card.style.borderRadius = "0";
      card.style.opacity = "1";
      return;
    }

    // From #F7F6F2 (247,246,242) to #080808 (8,8,8)
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const clamp = (v: number, lo: number, hi: number) =>
      Math.max(lo, Math.min(hi, v));

    let current = 0;
    let target = 0;
    let raf: number | null = null;

    const render = () => {
      current += (target - current) * 0.08;
      const p = current;

      const scale = 0.85 + p * 0.15;
      const radius = 24 - p * 24;
      const opacity = 0.6 + p * 0.4;

      card.style.transform = `scale(${scale})`;
      card.style.borderRadius = `${radius}px`;
      card.style.opacity = `${opacity}`;

      const r = Math.round(lerp(247, 8, p));
      const g = Math.round(lerp(246, 8, p));
      const b = Math.round(lerp(242, 8, p));
      document.body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;

      if (p >= 0.95) {
        document.documentElement.classList.add("dark-mode-active");
      } else {
        document.documentElement.classList.remove("dark-mode-active");
      }

      if (Math.abs(target - current) > 0.001) {
        raf = requestAnimationFrame(render);
      } else {
        raf = null;
      }
    };

    const computeTarget = () => {
      const rect = wrapper.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // progress goes 0 -> 1 across (wrapper.height - vh)
      const total = wrapper.offsetHeight - vh;
      const scrolled = -rect.top;
      target = clamp(scrolled / total, 0, 1);
      if (raf === null) raf = requestAnimationFrame(render);
    };

    const onScroll = () => computeTarget();
    const onResize = () => computeTarget();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    computeTarget();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="dark-transition-wrapper" aria-hidden="true">
      <div ref={cardRef} className="dark-card">
        <div className="dark-card-content">
          <span className="eyebrow">A new chapter</span>
          <h2>Built for scale. Tuned for performance.</h2>
          <p>
            From here on, you&apos;re inside the work — projects, process, and
            the team behind every Solve Trend launch.
          </p>
        </div>
      </div>
    </div>
  );
}
