"use client";

import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { asset } from "@/lib/asset";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Fluke's statement, rebuilt on their actual mechanics:
 *
 * - Two identical copies of the sentence — a ghosted grey layer and a dark
 *   "shade" layer clipped by a scroll-driven left-to-right wipe (the
 *   `.hero-title-shade` width trick from Fluke's "Design * that matter"
 *   hero, done with clip-path so multi-line text needs no absolute hacks).
 * - The inline stills fly in from Fluke's exact scattered offsets and settle
 *   into the sentence while the section approaches/pins (desktop only).
 * - The white -> black takeover is a scrubbed GSAP colour tween on the
 *   background while each line card-flips (edge-on, palette swap, back) in
 *   reading order, so with Lenis feeding ScrollTrigger it glides with the
 *   scroll and the text visibly flips to light-on-dark.
 * - The CTA carries Fluke's sliding-sheen shimmer and the arrow idles with a
 *   bouncy nudge (their Lottie arrow, in CSS).
 */

const CHIP_IMAGES = [
  "/projects/brand-identity-still.jpg",
  "/projects/rosemont-app.jpg",
  "/projects/aeron-headphones.jpg",
];

/** Fluke's rest-state scatter for the three chips (pre-scroll positions). */
const CHIP_FROM = [
  { x: "-6vw", y: "-27vh", scale: 3 },
  { x: "17vw", y: "-68vh", scale: 2 },
  { x: "47vw", y: "-41vh", scale: 3 },
];

function Chips() {
  return (
    <span className="st-chips">
      {CHIP_IMAGES.map((src) => (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img key={src} className="st-chip" src={asset(src)} alt="" loading="lazy" />
      ))}
    </span>
  );
}

function ArrowGlyph() {
  return (
    <span className="st-arrow" aria-hidden="true">
      <svg viewBox="0 0 48 24" fill="none">
        <path
          d="M2 12h40m0 0-9-9m9 9-9 9"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

/**
 * One copy of the sentence. The ghost layer's CTA is a non-interactive span
 * (the shade layer on top owns the real link).
 */
function StatementCopy({ interactive }: { interactive: boolean }) {
  // Bare hash href on purpose: the Lenis intercept + nav scroll-spy match
  // same-page hash links verbatim — do not route()-prefix.
  const cta = interactive ? (
    <a className="st-cta magnetic-cta" href="/#contact">
      <span className="st-cta__label">Work with us</span>
      <span className="st-cta__sheen" aria-hidden="true" />
    </a>
  ) : (
    <span className="st-cta" aria-hidden="true">
      <span className="st-cta__label">Work with us</span>
    </span>
  );

  return (
    <>
      <span className="st-line">
        We <Chips /> are a creative
      </span>
      <span className="st-line">
        studio <ArrowGlyph /> dedicated to
      </span>
      <span className="st-line">crafting {cta} solutions</span>
    </>
  );
}

export default function StudioStatement() {
  const wrapperRef = React.useRef<HTMLElement>(null);
  const shadeRef = React.useRef<HTMLDivElement>(null);
  const ghostRef = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const wrapper = wrapperRef.current;
      const shade = shadeRef.current;
      const ghost = ghostRef.current;
      if (!wrapper || !shade || !ghost) return;

      // Takeover palette: #080808 matches --bg-dark, so the section resolves
      // into the same surface as the dark shell that follows it. Text lands
      // on #fdfcfc (house rule: never pure white on black); the arrow and
      // CTA keep their brand red — red is the accent that pops on black.
      const BLACK = "#080808";
      const LIGHT_TEXT = "#fdfcfc";
      const GHOST_ON_DARK = "#3a3833";
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        // Final state, no motion: black takeover, sentence fully painted.
        gsap.set(wrapper, { backgroundColor: BLACK });
        gsap.set(shade, { color: LIGHT_TEXT });
        gsap.set(gsap.utils.toArray(".st-line", shade), { clipPath: "none" });
        gsap.set(ghost, { autoAlpha: 0 });
        gsap.set(".st-chip", { borderColor: BLACK });
        document.documentElement.classList.add("dark-mode-active");
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Fluke's wipe, but sequenced line-by-line so the dark copy paints
        // in READING order — a single block-wide wipe slices all three
        // lines (and the CTA) at once, which reads as a glitch. Each line's
        // clip is a plain inset() driven through a proxy and written as a
        // style string per frame — GSAP's string tween scrambles inset()
        // forms, so it never tweens the clip-path string directly. The
        // vertical -12% bleed keeps ascenders/descenders unclipped.
        //
        // Line 1 starts partially painted (Fluke's own rest state: "Design"
        // solid, "that matter" ghosted) so the section never shows an
        // all-grey sentence even before the scrub moves.
        const lines = gsap.utils.toArray<HTMLElement>(".st-line", shade);
        const wipes = lines.map((el, i) => {
          const state = { value: i === 0 ? 42 : 100 };
          const apply = () => {
            el.style.clipPath = `inset(-12% ${state.value}% -12% 0%)`;
          };
          apply();
          return { state, apply };
        });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: wrapper,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            onUpdate: (self) => {
              document.documentElement.classList.toggle(
                "dark-mode-active",
                self.progress >= 0.7
              );
            },
          },
        });

        // Beat 1 — the wipe, one line after another across the first half
        // of the pin. Durations are proportional so the paint speed feels
        // constant from line to line.
        const SLOTS = [
          { at: 0.03, duration: 0.13 },
          { at: 0.17, duration: 0.19 },
          { at: 0.37, duration: 0.19 },
        ];
        wipes.forEach(({ state, apply }, i) => {
          tl.to(
            state,
            { value: 0, duration: SLOTS[i].duration, onUpdate: apply },
            SLOTS[i].at
          );
        });

        // Beat 2 — the takeover: the background glides to black while each
        // line card-flips in reading order — rotate edge-on, swap that line
        // to the dark-mode palette while it's invisible, rotate back — so
        // the text visibly flips to light-on-dark in sync with the darkening
        // background. Ghost + shade copies of a line flip together or the
        // static ghost would show through the shade's edge-on moment.
        const BLACK_AT = 0.62;
        const BLACK_LEN = 0.3;
        // power2.out front-loads the darkening so the surface already has
        // depth by the time the first flipped line lands its light text.
        tl.to(
          wrapper,
          { backgroundColor: BLACK, duration: BLACK_LEN, ease: "power2.out" },
          BLACK_AT
        );

        const ghostLines = gsap.utils.toArray<HTMLElement>(".st-line", ghost);
        gsap.set([...lines, ...ghostLines], {
          transformPerspective: 900,
          transformOrigin: "50% 50%",
        });

        const ghostCta = ghost.querySelector<HTMLElement>(".st-cta");
        const FLIP_LEN = 0.14;
        const FLIP_STAGGER = 0.08;
        lines.forEach((shadeLine, i) => {
          const pair = [shadeLine, ghostLines[i]].filter(Boolean);
          const at = BLACK_AT + i * FLIP_STAGGER;
          const mid = at + FLIP_LEN / 2;

          tl.to(pair, { rotateX: 90, duration: FLIP_LEN / 2 }, at);
          // Palette swap happens while the line is edge-on (invisible).
          tl.set(shadeLine, { color: LIGHT_TEXT }, mid);
          if (ghostLines[i]) {
            tl.set(ghostLines[i], { color: GHOST_ON_DARK }, mid);
          }
          if (i === 0) {
            // The chips' separating border must match the new surface.
            tl.set(gsap.utils.toArray(".st-chip", wrapper), {
              borderColor: BLACK,
            }, mid);
          }
          if (i === 2 && ghostCta) {
            tl.set(ghostCta, { backgroundColor: "#262421", color: BLACK }, mid);
          }
          tl.fromTo(
            pair,
            { rotateX: -90 },
            { rotateX: 0, duration: FLIP_LEN / 2, immediateRender: false },
            mid
          );
        });
        // The shade arrow and CTA intentionally keep their brand red —
        // red-on-black is the accent, no tween needed.

        // Trailing hold: without it the takeover ends exactly at the unpin
        // (scrub normalises to total duration), so the resolved white-on-red
        // state would never be seen while pinned.
        tl.to({}, { duration: 0.22 }, ">");
      });

      mm.add(
        "(prefers-reduced-motion: no-preference) and (min-width: 768px)",
        () => {
          // Chip fly-in, Fluke's exact offsets: converges while the section
          // scrolls into place, so it's settled by the time the line is
          // front and centre. Both layers' chips get identical transforms so
          // the wipe never desyncs them.
          const ghostChips = gsap.utils.toArray<HTMLElement>(".st-chip", ghost);
          const shadeChips = gsap.utils.toArray<HTMLElement>(".st-chip", shade);

          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: wrapper,
              start: "top 95%",
              end: "top -10%",
              scrub: 1,
            },
          });
          CHIP_FROM.forEach((from, i) => {
            const pair = [ghostChips[i], shadeChips[i]].filter(Boolean);
            if (!pair.length) return;
            tl.fromTo(
              pair,
              from,
              { x: 0, y: 0, scale: 1, duration: 1 },
              i * 0.06
            );
          });
        }
      );

      return () => mm.revert();
    },
    { scope: wrapperRef }
  );

  return (
    <section
      ref={wrapperRef}
      className="statement-section"
      id="studio-statement"
      aria-label="We are a creative studio dedicated to crafting solutions"
    >
      <div className="statement-sticky">
        <div className="statement-stack">
          <div
            ref={ghostRef}
            className="statement-layer statement-layer--ghost"
            aria-hidden="true"
          >
            <StatementCopy interactive={false} />
          </div>
          <div ref={shadeRef} className="statement-layer statement-layer--shade">
            <StatementCopy interactive />
          </div>
        </div>
      </div>
    </section>
  );
}
