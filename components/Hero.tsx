"use client";

import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { DotGridArrow } from "./Icons";
import HeroHeadline from "./HeroHeadline";
import HeroMarquee from "./HeroMarquee";
import { BackgroundGradientGlow } from "./ui/background-gradient-glow";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/** Wave: tile scale as a bell curve of distance from the viewport center. */
const WAVE_EDGE = 0.6;
const WAVE_PEAK = 1.15;
const WAVE_SIGMA = 0.38;
/** Seconds for the marquee to travel one full loop. */
const MARQUEE_DURATION = 45;
/** Radians per second the orbit ring spins once formed. */
const ORBIT_SPEED = 0.22;
/** Scroll distance (in viewport heights) the pinned morph occupies. */
const MORPH_SCROLL = 1.4;
/** Desktop only: how far the headline block settles down as the ring forms. */
const BOUNCE_DROP = 22;

export default function Hero() {
  const root = React.useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = root.current;
      if (!section) return;

      const monument = section.querySelector<HTMLElement>(".hero-monument-wrap");
      const strips = section.querySelector<HTMLElement>(".hero-strips");
      const track = section.querySelector<HTMLElement>(".hero-strips-track");

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
        tl.from(".hero-wordmark", {
          clipPath: "inset(0 0 100% 0)",
          filter: "blur(24px)",
          y: 80,
          scale: 1.08,
          opacity: 0,
          duration: 1.1,
        })
          .from(
            ".hero-subtitle",
            { y: 28, opacity: 0, filter: "blur(8px)", duration: 0.7 },
            "-=0.5"
          )
          .from(
            ".hero-cta-neo",
            { y: 20, scale: 0.96, opacity: 0, duration: 0.5 },
            "-=0.4"
          )
          .from(".hero-strips", { y: 80, opacity: 0, duration: 0.8 }, "-=0.5")
          .from(
            ".hero-strip",
            { opacity: 0, stagger: 0.06, duration: 0.5 },
            "-=0.6"
          );
      });

      // Mobile keeps the original farewell tilt; desktop replaces it with the
      // pinned wave→orbit morph below.
      mm.add(
        "(prefers-reduced-motion: no-preference) and (max-width: 768px)",
        () => {
          if (monument) {
            gsap.to(monument, {
              yPercent: -18,
              opacity: 0.25,
              filter: "blur(4px)",
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top top",
                end: "bottom top",
                scrub: true,
              },
            });
          }

        }
      );

      // ── Wave marquee + desktop orbit morph ──────────────────────────────
      mm.add(
        {
          waveDesktop:
            "(prefers-reduced-motion: no-preference) and (min-width: 769px)",
          waveMobile:
            "(prefers-reduced-motion: no-preference) and (max-width: 768px)",
        },
        (ctx) => {
        if (!strips || !track) return;
        const tiles = gsap.utils.toArray<HTMLElement>(".hero-strip", track);
        if (tiles.length === 0) return;

        // Transforms are written as plain style strings each frame; GSAP
        // never tweens these elements' transforms, so there is no cache to
        // fight. The bottom-center origin is set inline as well — dev-server
        // CSS caching has served stale styles for this rule before.
        tiles.forEach((t) => {
          t.style.transformOrigin = "50% 100%";
        });
        const setTile = (t: HTMLElement, x: number, y: number, s: number) => {
          t.style.transform = `translate(${x}px, ${y}px) scale(${s})`;
        };

        const isDesktop = Boolean(ctx.conditions?.waveDesktop);
        const morphEase = gsap.parseEase("power2.inOut");
        // Overshoots past 1 then settles — gives the headline block a
        // gentle bounce as it drops into place while the ring forms.
        const bounceEase = gsap.parseEase("elastic.out(1, 0.3)");

        let halfTrack = 1;
        let sectionW = 1;
        let ringCX = 0;
        let ringCY = 0;
        let ringRX = 1; // the orbit is an ellipse: wide enough to wrap the
        let ringRY = 1; // headline, short enough to stay inside the viewport
        let ringScale = 0.3;
        // Natural (untransformed) tile geometry relative to the section.
        let layout: { cx: number; bottomY: number; w: number; h: number }[] = [];

        // offsetTop/offsetLeft ignore transforms, so measuring is safe even
        // while entrance tweens or wave scaling are mid-flight.
        const offsetIn = (el: HTMLElement, ancestor: HTMLElement) => {
          let x = 0;
          let y = 0;
          let node: HTMLElement | null = el;
          while (node && node !== ancestor) {
            x += node.offsetLeft;
            y += node.offsetTop;
            node = node.offsetParent as HTMLElement | null;
          }
          return { x, y };
        };

        let marqueeProgress = 0;
        let morph = 0;
        let exit = 0; // post-pin handoff to the next section
        let orbitAngle = 0; // extra spin on top of each tile's strip phase
        let wasFading = false;
        let effPeak = WAVE_PEAK; // peak capped so the CTA never gets covered
        const speed = { value: 1 }; // hover pause (tweened)
        const exitEase = gsap.parseEase("power1.in");

        const measure = () => {
          const sectionH = section.offsetHeight;
          sectionW = section.offsetWidth;
          halfTrack = track.scrollWidth / 2;
          layout = tiles.map((t) => {
            const o = offsetIn(t, section);
            return {
              cx: o.x + t.offsetWidth / 2,
              bottomY: o.y + t.offsetHeight,
              w: t.offsetWidth,
              h: t.offsetHeight,
            };
          });

          const cardH = layout[0]?.h ?? 560;
          const cardW = layout[0]?.w ?? 280;
          ringScale = gsap.utils.clamp(0.2, 0.32, sectionW / 4500);
          const halfCardH = (cardH * ringScale) / 2;
          const halfCardW = (cardW * ringScale) / 2;

          ringCX = sectionW / 2;
          let monCY = sectionH / 2;
          let monHalfW = sectionW * 0.3;
          let monHalfH = sectionH * 0.18;
          let monBottom = sectionH * 0.55;
          if (monument) {
            const o = offsetIn(monument, section);
            monCY = o.y + monument.offsetHeight / 2;
            monHalfW = monument.offsetWidth / 2;
            monHalfH = monument.offsetHeight / 2;
            monBottom = o.y + monument.offsetHeight;
          }
          // The tallest wave card must stop short of the headline block —
          // its CTA sits at the block's bottom edge and must stay visible.
          const tileBottom = layout[0]?.bottomY ?? sectionH;
          effPeak = gsap.utils.clamp(
            WAVE_EDGE + 0.1,
            WAVE_PEAK,
            (tileBottom - monBottom - 24) / cardH
          );
          // Wide enough to wrap the headline, clamped to the viewport.
          ringRX = Math.min(
            monHalfW + halfCardW + 32,
            sectionW / 2 - halfCardW - 16
          );
          ringRY = monHalfH + halfCardH + 32;
          // Drop the center just enough that the top card stays on screen.
          ringCY = Math.max(monCY, ringRY + halfCardH + 16);
          ringRY = Math.min(ringRY, sectionH - ringCY - halfCardH - 16);

          if (process.env.NODE_ENV !== "production") {
            (window as unknown as Record<string, unknown>).__heroDebug = {
              sectionW,
              sectionH,
              ringCX,
              ringCY,
              ringRX,
              ringRY,
              ringScale,
              tile0: layout[0],
            };
          }
        };

        const waveCxs = new Array<number>(tiles.length);
        const waveScales = new Array<number>(tiles.length);

        const render = () => {
          const e = morphEase(morph);
          const ex = isDesktop ? exitEase(exit) : 0;
          const trackX = -marqueeProgress * halfTrack;
          const fullTrack = halfTrack * 2;
          track.style.transform = `translateX(${trackX}px)`;

          if (isDesktop && monument) {
            const bounceY = BOUNCE_DROP * bounceEase(e) * (1 - ex);
            monument.style.transform = `translateY(${bounceY.toFixed(2)}px)`;
          }

          // Pass 1 — wave state: bell-curve scale by distance from center.
          for (let i = 0; i < tiles.length; i++) {
            const lay = layout[i];
            if (!lay) continue;
            const waveCx = lay.cx + trackX;
            const d = Math.min(Math.abs(waveCx - sectionW / 2) / (sectionW / 2), 1);
            waveCxs[i] = waveCx;
            waveScales[i] =
              WAVE_EDGE +
              (effPeak - WAVE_EDGE) *
                Math.exp(-(d * d) / (2 * WAVE_SIGMA * WAVE_SIGMA));
          }

          // Pass 2 — enlarged cards shoulder their neighbours aside so the
          // gap between the two tallest center cards stays open.
          const fading = ex > 0.001;
          for (let i = 0; i < tiles.length; i++) {
            const lay = layout[i];
            if (!lay) continue;

            let spread = 0;
            for (let j = 0; j < tiles.length; j++) {
              if (j === i) continue;
              const extra = Math.max(waveScales[j] - 1, 0) * layout[j].w * 0.7;
              if (extra > 0) {
                spread += waveCxs[i] > waveCxs[j] ? extra : -extra;
              }
            }

            const waveScale = waveScales[i];

            if (fading) {
              tiles[i].style.opacity = (1 - ex).toFixed(3);
            } else if (wasFading) {
              tiles[i].style.opacity = "";
            }

            if (e === 0 || !isDesktop) {
              setTile(tiles[i], spread, 0, waveScale);
              tiles[i].style.setProperty("--glass-t", "0");
              tiles[i].style.setProperty("--cap-t", "1");
              continue;
            }

            // Orbit: each card's ring slot comes from its own position in
            // the strip, so the leftmost visible card curls up the left
            // side and nothing crosses over. As the hero scrolls out the
            // ring recedes toward the headline and fades.
            const angle =
              Math.PI / 2 -
              ((waveCxs[i] - sectionW / 2) / fullTrack) * Math.PI * 2 +
              orbitAngle;
            const recede = 1 - 0.3 * ex;
            const scale = waveScale + (ringScale - waveScale) * e;
            const targetCx = ringCX + Math.cos(angle) * ringRX * recede;
            const targetBottomY =
              ringCY +
              Math.sin(angle) * ringRY * recede +
              (lay.h * scale) / 2 -
              60 * ex;

            // Glass Morphism 2.0 sweep: the ring travels top → right →
            // bottom → left as it spins (see angle above), and only the
            // upper arc (sin < 0, i.e. left-through-top-through-right)
            // carries the frosted treatment. Within that arc it reads
            // clear near the right ("intelligent system") and thickens to
            // full frost by the time it reaches the left ("We build").
            const upperArc = Math.sin(angle) < 0 ? 1 : 0;
            const sweep = (1 - Math.cos(angle)) / 2;
            const glassT = upperArc * sweep * e * (1 - ex);
            tiles[i].style.setProperty("--glass-t", glassT.toFixed(3));
            // The caption is ~4px tall at ring scale — fade it out rather
            // than leave sub-pixel noise sitting on the glass.
            tiles[i].style.setProperty("--cap-t", (1 - e).toFixed(3));

            setTile(
              tiles[i],
              spread * (1 - e) + (targetCx - waveCxs[i]) * e,
              (targetBottomY - lay.bottomY) * e,
              scale * (1 - 0.2 * ex)
            );
          }
          wasFading = fading;
        };

        const tick = (_time: number, deltaMS: number) => {
          const dt = deltaMS / 1000;
          const e = morphEase(morph);
          // The strip drifts while in wave form and freezes as the ring forms.
          marqueeProgress =
            (marqueeProgress +
              (dt / MARQUEE_DURATION) * speed.value * (1 - e) +
              1) %
            1;
          orbitAngle += dt * ORBIT_SPEED * e;
          render();
        };

        measure();
        gsap.ticker.add(tick);

        const onEnter = () => gsap.to(speed, { value: 0, duration: 0.4 });
        const onLeave = () => gsap.to(speed, { value: 1, duration: 0.4 });
        strips.addEventListener("mouseenter", onEnter);
        strips.addEventListener("mouseleave", onLeave);

        if (isDesktop) {
          const pinSt = ScrollTrigger.create({
            trigger: section,
            start: "top top",
            end: `+=${Math.round(MORPH_SCROLL * 100)}%`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            onUpdate: (self) => {
              morph = self.progress;
              strips.classList.toggle(
                "hero-strips--morphing",
                self.progress > 0.001
              );
            },
            onRefresh: measure,
          });

          // Hand-off: as the released hero scrolls away, the ring recedes
          // toward the headline and fades into the next section.
          ScrollTrigger.create({
            trigger: section,
            start: () => pinSt.end,
            end: () => pinSt.end + window.innerHeight * 0.65,
            scrub: true,
            onUpdate: (self) => {
              exit = self.progress;
            },
          });
        } else {
          window.addEventListener("resize", measure);
        }

        return () => {
          gsap.ticker.remove(tick);
          strips.removeEventListener("mouseenter", onEnter);
          strips.removeEventListener("mouseleave", onLeave);
          window.removeEventListener("resize", measure);
          strips.classList.remove("hero-strips--morphing");
          if (monument) monument.style.transform = "";
          track.style.transform = "";
          tiles.forEach((t) => {
            t.style.transform = "";
            t.style.opacity = "";
            t.style.removeProperty("--glass-t");
            t.style.removeProperty("--cap-t");
          });
        };
        }
      );

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="hero hero--monument"
      id="top"
      aria-label="Hero"
    >
      <BackgroundGradientGlow />
      <div className="hero-monument-wrap">
        <HeroHeadline />
        <a className="hero-cta-neo" href="#contact">
          Start a project
          <DotGridArrow />
        </a>
      </div>
      <HeroMarquee />
    </section>
  );
}
