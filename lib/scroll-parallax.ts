"use client";

import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export type ParallaxLayerOptions = {
  /** Vertical speed multiplier — lower = slower (background feel) */
  speed?: number;
  /** Scrub link to scroll (true or seconds) */
  scrub?: boolean | number;
  /** ScrollTrigger start */
  start?: string;
  /** ScrollTrigger end */
  end?: string;
  /** Optional trigger element; defaults to layer element */
  trigger?: React.RefObject<HTMLElement | null> | HTMLElement | null;
  /** Extra gsap properties to animate */
  props?: gsap.TweenVars;
};

export function useParallaxLayer(
  layerRef: React.RefObject<HTMLElement | null>,
  options: ParallaxLayerOptions = {}
) {
  const {
    speed = 0.5,
    scrub = true,
    start = "top bottom",
    end = "bottom top",
    trigger,
    props = {},
  } = options;

  useGSAP(
    () => {
      const layer = layerRef.current;
      if (!layer) return;

      const mm = gsap.matchMedia();
      const triggerEl =
        (trigger && "current" in trigger ? trigger.current : trigger) ?? layer;

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(layer, { clearProps: "transform" });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(layer, {
          yPercent: -20 * speed,
          ease: "none",
          ...props,
          scrollTrigger: {
            trigger: triggerEl,
            start,
            end,
            scrub,
          },
        });
      });

      return () => mm.revert();
    },
    { scope: layerRef, dependencies: [speed, scrub, start, end] }
  );
}

export function useParallaxLayers(
  scopeRef: React.RefObject<HTMLElement | null>,
  selector: string,
  speeds: number[],
  options: Omit<ParallaxLayerOptions, "speed"> = {}
) {
  useGSAP(
    () => {
      const scope = scopeRef.current;
      if (!scope) return;

      const mm = gsap.matchMedia();
      const layers = gsap.utils.toArray<HTMLElement>(selector, scope);

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(layers, { clearProps: "transform" });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        layers.forEach((layer, i) => {
          const speed = speeds[i] ?? speeds[speeds.length - 1] ?? 0.5;
          gsap.to(layer, {
            yPercent: -20 * speed,
            ease: "none",
            ...options.props,
            scrollTrigger: {
              trigger: options.trigger
                ? "current" in options.trigger
                  ? options.trigger.current
                  : options.trigger
                : scope,
              start: options.start ?? "top bottom",
              end: options.end ?? "bottom top",
              scrub: options.scrub ?? true,
            },
          });
        });
      });

      return () => mm.revert();
    },
    { scope: scopeRef }
  );
}

export function refreshScrollTriggers() {
  ScrollTrigger.refresh();
}
