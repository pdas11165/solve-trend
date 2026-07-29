"use client";

import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { useGSAP } from "@gsap/react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { PROCESS_STEPS } from "@/lib/process";

gsap.registerPlugin(useGSAP, ScrollTrigger, MotionPathPlugin, DrawSVGPlugin);

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/**
 * Flight-path geometry as *fractions* of the viewport box.
 *
 * The path used to live in a fixed 1600x520 viewBox rendered with
 * `preserveAspectRatio="none"`, which stretched it non-uniformly — so the
 * plane's position and its autoRotate angle had to be reconstructed by hand
 * from separate scaleX/scaleY factors. That reconstruction is only an
 * approximation: on wide or short viewports the nose visibly drifted off the
 * stroke it was supposed to be riding.
 *
 * Now the path is rebuilt in *pixel* space whenever the box resizes, so the
 * SVG viewBox is 1:1 with the DOM and MotionPathPlugin can align + rotate the
 * plane exactly, with no manual trigonometry.
 */
// Step cards are `translateX(-50%)` on their landing point and up to 300px
// wide, so the outer two landings have to stay at least half a card in from
// the frame or the copy is clipped (0.05/0.95 put half of step 01 off-screen).
const LANDING_FRACTIONS: { x: number; y: number }[] = [
  { x: 0.14, y: 0.86 },
  { x: 0.38, y: 0.2 },
  { x: 0.62, y: 0.86 },
  { x: 0.86, y: 0.2 },
];

/** Symmetric cubic joints give a continuous tangent through every landing. */
function buildPathD(w: number, h: number): string {
  const pts = LANDING_FRACTIONS.map((f) => ({ x: f.x * w, y: f.y * h }));
  let d = `M${pts[0].x.toFixed(2)},${pts[0].y.toFixed(2)}`;
  for (let i = 1; i < pts.length; i += 1) {
    const a = pts[i - 1];
    const b = pts[i];
    const dx = (b.x - a.x) / 2;
    d +=
      ` C${(a.x + dx).toFixed(2)},${a.y.toFixed(2)}` +
      ` ${(b.x - dx).toFixed(2)},${b.y.toFixed(2)}` +
      ` ${b.x.toFixed(2)},${b.y.toFixed(2)}`;
  }
  return d;
}

/** Progress at which each step is considered "landed on". */
const STEP_THRESHOLDS = [0, 1 / 3, 2 / 3, 1];

type StepProps = {
  step: (typeof PROCESS_STEPS)[number];
  index: number;
  /** Desktop: driven by the scrubbed flight path. */
  scrubActive: boolean;
  isDesktop: boolean;
  isLast: boolean;
};

/**
 * Framer Motion owns the step reveal — it's state-driven rather than
 * scroll-linked, so a spring reads better here than a scrubbed tween, and it
 * keeps the GSAP timeline focused purely on the flight path.
 */
function ProcessStep({ step, index, scrubActive, isDesktop, isLast }: StepProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  // Mobile has no scrub — each step reveals on its own as it scrolls in.
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const active = reduce || (isDesktop ? scrubActive : inView);

  const [x, y] = [LANDING_FRACTIONS[index].x, LANDING_FRACTIONS[index].y];
  const isHigh = y < 0.5;

  return (
    <div
      ref={ref}
      className={`dark-process-step ${
        isHigh ? "dark-process-step--below" : "dark-process-step--above"
      }${active ? " is-active" : ""}`}
      style={
        isHigh
          ? { left: `${x * 100}%`, top: `${y * 100}%` }
          : { left: `${x * 100}%`, bottom: `${(1 - y) * 100}%` }
      }
    >
      <div className="dark-process-step__node">
        <span className="dark-process-step__index">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      {/* Deliberately a CSS transition rather than a Framer Motion `animate`:
          FM writes inline styles, which outrank the `.is-active` rule in
          globals.css and kill it as a fallback — so any environment that
          throttles rAF (a backgrounded tab, the in-app preview pane) would
          leave this copy permanently dimmed and blurred with no way back.
          A two-state reveal doesn't need a JS animation loop to begin with.
          FM earns its place here on the plane's idle bob and on the mobile
          `useInView` activation above, both of which CSS can't express. */}
      <div className="dark-process-step__copy">
        <h3 className="dark-process-step__title">{step.title}</h3>
        <p className="dark-process-step__body">{step.body}</p>
        {isLast && (
          <div className="dark-process-chat" aria-hidden="true">
            <div className="dark-process-chat__bar">
              <span className="dark-process-chat__dot" />
              <span className="dark-process-chat__dot" />
              <span className="dark-process-chat__dot" />
              <span className="dark-process-chat__bar-label">delivery-handoff</span>
            </div>
            <div className="dark-process-chat__bubble dark-process-chat__bubble--in">
              <span className="dark-process-chat__avatar" />
              <p>When&apos;s this due?</p>
            </div>
            <div className="dark-process-chat__typing">
              <span />
              <span />
              <span />
            </div>
            <div className="dark-process-chat__bubble dark-process-chat__bubble--out">
              <p>Ready to deliver.</p>
              <span className="dark-process-chat__avatar dark-process-chat__avatar--accent" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function DarkTransition() {
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const expandRef = React.useRef<HTMLDivElement>(null);
  const cardRef = React.useRef<HTMLDivElement>(null);
  const wordLeftRef = React.useRef<HTMLSpanElement>(null);
  const wordRightRef = React.useRef<HTMLSpanElement>(null);
  const vignetteRef = React.useRef<HTMLDivElement>(null);
  const marqueeRef = React.useRef<HTMLDivElement>(null);
  const headingRef = React.useRef<HTMLHeadingElement>(null);
  const viewportRef = React.useRef<HTMLDivElement>(null);
  const pathRef = React.useRef<SVGPathElement>(null);
  const guideRef = React.useRef<SVGPathElement>(null);
  const planeRef = React.useRef<HTMLDivElement>(null);

  const reduce = useReducedMotion();
  const [dims, setDims] = React.useState({ w: 0, h: 0 });
  const [landed, setLanded] = React.useState(0);
  const [isDesktop, setIsDesktop] = React.useState(false);

  // Measure the flight box in pixels so the path can be rebuilt 1:1 with the
  // DOM.
  //
  // The first measurement is taken synchronously in a layout effect rather
  // than waiting on ResizeObserver: if RO's initial callback never lands, the
  // path never gets built and the whole section renders dead. (It genuinely
  // doesn't fire in the in-app preview pane, which suspends the rendering
  // steps RO callbacks are delivered in — but the same failure would take the
  // section out on any browser that throttles a backgrounded tab at load.)
  // RO and the resize listener are then both kept as update paths, since the
  // sticky box also changes height when a mobile URL bar collapses.
  React.useLayoutEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const read = () => {
      const { width, height } = el.getBoundingClientRect();
      if (!width || !height) return false;
      setDims((prev) =>
        Math.abs(prev.w - width) < 1 && Math.abs(prev.h - height) < 1
          ? prev
          : { w: width, h: height }
      );
      return true;
    };

    // This sticky box can still measure 0x0 at layout-effect time while the
    // (very tall) page is mid-hydration, and a zero read has to be retried —
    // if it isn't, `dims` stays at 0 forever and the section renders dead.
    // setTimeout rather than rAF for the retry, because rAF is exactly what
    // gets suspended in a throttled/backgrounded tab.
    const timers: number[] = [];
    if (!read()) {
      [0, 50, 150, 400, 1000].forEach((ms) => {
        timers.push(
          window.setTimeout(() => {
            if (read()) timers.forEach(clearTimeout);
          }, ms)
        );
      });
    }

    const ro = new ResizeObserver(read);
    ro.observe(el);
    window.addEventListener("resize", read);
    return () => {
      timers.forEach(clearTimeout);
      ro.disconnect();
      window.removeEventListener("resize", read);
    };
  }, []);

  React.useEffect(() => {
    const mq = window.matchMedia("(min-width: 992px)");
    const sync = () => setIsDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const pathD = dims.w > 0 ? buildPathD(dims.w, dims.h) : "M0,0";

  useGSAP(
    () => {
      const expand = expandRef.current;
      const card = cardRef.current;
      const vignette = vignetteRef.current;
      const marquee = marqueeRef.current;
      const heading = headingRef.current;
      const path = pathRef.current;
      const guide = guideRef.current;
      const plane = planeRef.current;
      if (!expand || !card || !marquee || !path || !guide || !plane) return;

      const wordLeft = wordLeftRef.current;
      const wordRight = wordRightRef.current;

      const getSmallCardSize = () => {
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        return {
          w: Math.min(Math.max(vw * 0.18, 140), 280),
          h: Math.min(Math.max(vh * 0.07, 56), 96),
        };
      };

      const applyExpandProgress = (p: number) => {
        const { w: startW, h: startH } = getSmallCardSize();

        gsap.set(card, {
          width: lerp(startW, window.innerWidth, p),
          height: lerp(startH, window.innerHeight, p),
          borderRadius: `${lerp(14, 0, p)}px`,
        });

        // Fade spread over p 0.10–0.45 so the words stay readable through the
        // first stretch of the runway instead of vanishing immediately.
        const wordFade = gsap.utils.clamp(0, 1, (p - 0.1) / 0.35);
        if (wordLeft) gsap.set(wordLeft, { opacity: 1 - wordFade });
        if (wordRight) gsap.set(wordRight, { opacity: 1 - wordFade });

        const r = Math.round(lerp(247, 8, p));
        const g = Math.round(lerp(246, 8, p));
        const b = Math.round(lerp(242, 8, p));
        document.body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;

        if (vignette) {
          let vignetteOpacity = 0;
          if (p >= 0.7 && p < 0.85) {
            vignetteOpacity = gsap.utils.mapRange(0.7, 0.85, 0, 0.12, p);
          } else if (p >= 0.85 && p < 0.95) {
            vignetteOpacity = gsap.utils.mapRange(0.85, 0.95, 0.12, 0, p);
          }
          gsap.set(vignette, { opacity: vignetteOpacity });
        }

        document.documentElement.classList.toggle("dark-mode-active", p >= 0.95);
      };

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        document.documentElement.classList.add("dark-mode-active");
        document.body.style.backgroundColor = "#080808";

        gsap.set(card, {
          width: window.innerWidth,
          height: window.innerHeight,
          borderRadius: 0,
        });
        if (wordLeft) gsap.set(wordLeft, { opacity: 0 });
        if (wordRight) gsap.set(wordRight, { opacity: 0 });
        if (vignette) gsap.set(vignette, { opacity: 0 });
        if (heading) gsap.set(heading, { xPercent: -50, yPercent: -50 });

        gsap.set(path, { drawSVG: "0% 100%" });
        setLanded(PROCESS_STEPS.length);
      });

      // Phase 1 (expand + dark-mode flip) runs at every width.
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        ScrollTrigger.create({
          trigger: expand,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          onUpdate: (self) => applyExpandProgress(self.progress),
          onRefresh: (self) => applyExpandProgress(self.progress),
        });
      });

      // Phase 2 (flight path) is desktop-only — mobile stacks the steps and
      // reveals each one on its own as it scrolls into view.
      mm.add(
        "(prefers-reduced-motion: no-preference) and (min-width: 992px)",
        () => {
          if (!dims.w) return;

          // One scrubbed timeline drives everything on the path. Because the
          // viewBox is now 1:1 with the DOM, MotionPathPlugin's own align +
          // autoRotate are exact — no scaleX/scaleY reconstruction, and the
          // nose stays welded to the stroke at every viewport ratio.
          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: marquee,
              start: "top top",
              end: "bottom bottom",
              // Time-based smoothing: the plane keeps gliding for ~1s after
              // the scroll stops instead of stopping dead on the last frame.
              scrub: 1,
              onUpdate: (self) => {
                const p = self.progress;
                let n = 0;
                for (let i = 0; i < STEP_THRESHOLDS.length; i += 1) {
                  if (p >= STEP_THRESHOLDS[i] - 0.03) n = i + 1;
                }
                // Only ever 4 transitions, so this is not a per-frame setState.
                setLanded((prev) => (prev === n ? prev : n));

                if (p > 0) {
                  document.documentElement.classList.add("dark-mode-active");
                  document.body.style.backgroundColor = "rgb(8, 8, 8)";
                }
              },
            },
          });

          tl.to(
            plane,
            {
              motionPath: {
                path,
                align: path,
                alignOrigin: [0.5, 0.5],
                autoRotate: true,
              },
              duration: 1,
            },
            0
          ).fromTo(
            path,
            { drawSVG: "0% 0%" },
            { drawSVG: "0% 100%", duration: 1 },
            0
          );

          if (heading) {
            // Bring the heading in over the first 15% so the section never
            // reads as an empty black screen while it waits (bug #18).
            tl.fromTo(
              heading,
              { xPercent: -200, yPercent: 200 },
              { xPercent: -50, yPercent: -50, ease: "power2.out", duration: 0.15 },
              0
            );
          }

          if (process.env.NODE_ENV !== "production") {
            (window as unknown as Record<string, unknown>).__st = ScrollTrigger;
            (window as unknown as Record<string, unknown>).__flight = tl;
          }
        }
      );

      return () => mm.revert();
    },
    // Rebuilt whenever the flight box resizes — the path string changes with
    // it, so the timeline has to be torn down and remade against the new one.
    { scope: wrapperRef, dependencies: [dims.w, dims.h], revertOnUpdate: true }
  );

  return (
    <section
      ref={wrapperRef}
      className="dark-transition-wrapper"
      id="featured-work"
      aria-label="How we work"
    >
      <div ref={vignetteRef} className="dark-transition-vignette" aria-hidden="true" />

      <div ref={expandRef} className="dark-transition-expand">
        <div className="dark-transition-sticky">
          <div className="dark-transition-row">
            <span
              ref={wordLeftRef}
              className="dark-transition-word dark-transition-word--left"
            >
              Creative
            </span>
            <div ref={cardRef} className="dark-card" aria-hidden="true" />
            <span
              ref={wordRightRef}
              className="dark-transition-word dark-transition-word--right"
            >
              Studio
            </span>
          </div>
        </div>
      </div>

      <div ref={marqueeRef} className="dark-process-marquee">
        <div className="dark-process-sticky">
          <div className="dark-process-inner">
            <div className="dark-process-bg" aria-hidden="true">
              <span className="dark-process-blob dark-process-blob--red" />
              <span className="dark-process-blob dark-process-blob--amber" />
              <span className="dark-process-dotgrid" />
            </div>

            <div className="dark-process-heading-wrap">
              <h2 ref={headingRef} className="dark-process-heading">
                How We Work
              </h2>
            </div>

            <div ref={viewportRef} className="dark-process-viewport">
              <svg
                className="dark-process-path-svg"
                viewBox={`0 0 ${Math.max(dims.w, 1)} ${Math.max(dims.h, 1)}`}
                aria-hidden="true"
              >
                <path ref={guideRef} className="dark-process-path-guide" d={pathD} />
                <path ref={pathRef} className="dark-process-path-progress" d={pathD} />
              </svg>

              {/* Outer div is MotionPathPlugin's target (position + autoRotate).
                  The inner Framer Motion div adds an idle bob on top — nesting
                  keeps the two libraries off the same transform. */}
              <div ref={planeRef} className="dark-process-plane" aria-hidden="true">
                <motion.div
                  className="dark-process-plane__inner"
                  animate={reduce ? undefined : { y: [0, -3.5, 0], rotate: [0, 2.5, 0] }}
                  transition={{
                    duration: 3.2,
                    ease: "easeInOut",
                    repeat: Infinity,
                  }}
                >
                  <svg viewBox="0 0 48 48" fill="none">
                    <path
                      d="M4 24L44 8L32 44L24 28L4 24Z"
                      fill="currentColor"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M24 28L44 8"
                      stroke="var(--bg-dark)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </motion.div>
              </div>

              <div className="dark-process-steps">
                {PROCESS_STEPS.map((step, i) => (
                  <ProcessStep
                    key={step.title}
                    step={step}
                    index={i}
                    scrubActive={i < landed}
                    isDesktop={isDesktop}
                    isLast={i === PROCESS_STEPS.length - 1}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
