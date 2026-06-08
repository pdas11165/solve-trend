"use client";

import * as React from "react";

/**
 * Samples the page surface behind the nav and writes `--nav-tone` (0 = light, 1 = dark)
 * on the nav shell for smooth glass + contrast transitions.
 */
export function useNavSurfaceTone(
  shellRef: React.RefObject<HTMLElement | null>
) {
  React.useEffect(() => {
    const shell = shellRef.current;
    if (!shell) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let current = 0;
    let target = 0;
    let raf: number | null = null;

    const writeTone = (value: number) => {
      shell.style.setProperty("--nav-tone", value.toFixed(3));
      const alpha = 0.14 + value * 0.18;
      shell.style.setProperty(
        "--nav-pill-fill",
        `rgba(22, 22, 24, ${alpha.toFixed(3)})`
      );
    };

    const tick = () => {
      current += (target - current) * 0.14;
      writeTone(current);

      if (Math.abs(target - current) > 0.002) {
        raf = requestAnimationFrame(tick);
      } else {
        current = target;
        writeTone(current);
        raf = null;
      }
    };

    const computeTarget = () => {
      const rect = shell.getBoundingClientRect();
      const isBottomNav = getComputedStyle(shell).top === "auto";
      const probeY = isBottomNav ? rect.top - 6 : rect.bottom + 6;
      const probeX = Math.round(window.innerWidth * 0.5);
      const clampedY = Math.min(
        Math.max(probeY, 0),
        window.innerHeight - 1
      );

      const el = document.elementFromPoint(probeX, clampedY);
      let tone = 0;

      if (el) {
        const transition = el.closest(".dark-transition-wrapper");
        if (transition) {
          const vh = window.innerHeight || 1;
          const total = Math.max(
            (transition as HTMLElement).offsetHeight - vh,
            1
          );
          const scrolled = Math.max(
            0,
            -transition.getBoundingClientRect().top
          );
          tone = Math.min(1, scrolled / total);
        } else if (el.closest(".dark-shell")) {
          tone = 1;
        }
      }

      target = tone;

      if (reduceMotion) {
        current = target;
        writeTone(current);
        return;
      }

      if (raf === null) raf = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", computeTarget, { passive: true });
    window.addEventListener("resize", computeTarget);
    computeTarget();

    return () => {
      window.removeEventListener("scroll", computeTarget);
      window.removeEventListener("resize", computeTarget);
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, [shellRef]);
}
