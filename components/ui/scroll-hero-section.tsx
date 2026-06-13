"use client";

import { useEffect, useRef } from "react";

type Theme = "system" | "light" | "dark";

export type ShipStickyHeaderProps = {
  /** Words that cycle under the prefix */
  items?: string[];
  /** Prefix text before cycling words. Default "you can" or "We" when embedded. */
  prefix?: string;
  /** Optional per-step descriptions shown below the word list when embedded */
  descriptions?: string[];
  /** Sets CSS var --count automatically from items length */
  showFooter?: boolean;
  /** UI theme (affects color-scheme + switch color) */
  theme?: Theme;
  /** Enable view-timeline animations if supported */
  animate?: boolean;
  /** Accent hue (0–359) */
  hue?: number;
  /** Where the highlight band starts (vh) */
  startVh?: number;
  /** Space (vh) below the sticky header block */
  spaceVh?: number;
  /** Debug outline (for dev) */
  debug?: boolean;
  /** Optional custom intro text under the header (full-page mode only) */
  taglineHTML?: string;
  /** Section-safe mode — scoped styles, no global body/html side effects */
  embedded?: boolean;
};

function WordHeroPage({
  items = [
    "design.",
    "prototype.",
    "solve.",
    "build.",
    "develop.",
    "cook.",
    "ship.",
  ],
  prefix,
  descriptions,
  showFooter = true,
  theme = "system",
  animate = true,
  hue = 280,
  startVh = 50,
  spaceVh = 50,
  debug = false,
  taglineHTML = `and i&apos;ll show you how.<br /><a href="https://rahil.pro">rahil.pro</a>.`,
  embedded = false,
}: ShipStickyHeaderProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const resolvedPrefix = prefix ?? (embedded ? "We" : "you can");

  useEffect(() => {
    const root = embedded ? rootRef.current : document.documentElement;
    if (!root) return;

    root.dataset.theme = theme;
    root.dataset.animate = String(animate);
    root.dataset.debug = String(debug);
    root.style.setProperty("--hue", String(hue));
    root.style.setProperty("--start", `${startVh}vh`);
    root.style.setProperty("--space", `${spaceVh}vh`);

    return () => {
      if (!embedded) return;
      delete root.dataset.theme;
      delete root.dataset.animate;
      delete root.dataset.debug;
      root.style.removeProperty("--hue");
      root.style.removeProperty("--start");
      root.style.removeProperty("--space");
    };
  }, [theme, animate, debug, hue, startVh, spaceVh, embedded]);

  const wrapperClass = embedded
    ? "word-hero-scroller word-hero-scroller--embedded"
    : "min-h-screen w-screen";

  return (
    <div
      ref={rootRef}
      className={wrapperClass}
      data-embedded={embedded ? "true" : undefined}
      style={
        {
          ["--count" as string]: items.length,
        } as React.CSSProperties
      }
    >
      <header className="content fluid">
        <section className="content">
          <h1 className="sr-only sm:not-sr-only">
            <span aria-hidden="true">{resolvedPrefix}&nbsp;</span>
            <span className="sr-only">
              {resolvedPrefix} {items.join(" ")}
            </span>
          </h1>

          <ul aria-hidden="true">
            {items.map((word, i) => (
              <li key={i} style={{ ["--i" as string]: i } as React.CSSProperties}>
                {word}
              </li>
            ))}
          </ul>
        </section>
      </header>

      {embedded ? (
        descriptions && descriptions.length > 0 ? (
          <div className="word-hero-scroller__descriptions" aria-hidden="true">
            {descriptions.map((desc, i) => (
              <p
                key={i}
                className="word-hero-scroller__description"
                style={{ ["--i" as string]: i } as React.CSSProperties}
              >
                {desc}
              </p>
            ))}
          </div>
        ) : null
      ) : (
        <main>
          <section>
            <p
              className="fluid"
              dangerouslySetInnerHTML={{ __html: taglineHTML }}
            />
            <a
              className="bear-link"
              href="https://twitter.com/"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Follow on X"
            >
              <BearSVG />
            </a>
            <a
              className="bear-link"
              href="https://twitter.com/"
              target="_blank"
              rel="noreferrer noopener"
              style={{ left: "4.5rem" }}
              aria-label="Follow on X (secondary)"
            >
              <BearSVG />
            </a>
          </section>
        </main>
      )}

      {showFooter && !embedded ? (
        <footer>ʕ⊙ᴥ⊙ʔ Rahil Vahora &copy; 2025</footer>
      ) : null}

      <style jsx global>{`
        @layer base, stick, demo, debug;

        :root {
          --start: 50vh;
          --space: 50vh;
          --hue: 280;
          --accent: light-dark(
            hsl(var(--hue) 100% 50%),
            hsl(var(--hue) 90% 75%)
          );
          --switch: canvas;
          --font-size-min: 14;
          --font-size-max: 20;
          --font-ratio-min: 1.1;
          --font-ratio-max: 1.33;
          --font-width-min: 375;
          --font-width-max: 1500;
        }

        .word-hero-scroller--embedded {
          --accent: var(--red, #e8341a);
          --switch: #fff;
          width: 100%;
          min-height: auto;
          color: var(--text-light, #1a1a1a);
          background: transparent;
        }

        .word-hero-scroller--embedded[data-theme="light"] {
          --switch: #fff;
          color-scheme: light only;
        }

        [data-theme="dark"] {
          --switch: #000;
          color-scheme: dark only;
        }
        [data-theme="light"] {
          --switch: #fff;
          color-scheme: light only;
        }

        .word-hero-scroller:not(.word-hero-scroller--embedded) ~ *,
        html:has(.word-hero-scroller:not(.word-hero-scroller--embedded)) {
          color-scheme: light dark;
        }

        .word-hero-scroller:not(.word-hero-scroller--embedded) {
          scrollbar-color: var(--accent) #0000;
        }

        .word-hero-scroller:not(.word-hero-scroller--embedded) {
          font-family:
            ui-sans-serif,
            system-ui,
            -apple-system,
            Segoe UI,
            Roboto,
            Helvetica Neue,
            Arial,
            Noto Sans,
            Apple Color Emoji,
            Segoe UI Emoji;
          background: light-dark(white, black);
        }

        .word-hero-scroller:not(.word-hero-scroller--embedded)::before {
          --size: 45px;
          --line: color-mix(in hsl, canvasText, transparent 80%);
          content: "";
          position: fixed;
          inset: 0;
          z-index: -1;
          background:
            linear-gradient(90deg, var(--line) 1px, transparent 1px var(--size))
              calc(var(--size) * 0.36) 50% / var(--size) var(--size),
            linear-gradient(var(--line) 1px, transparent 1px var(--size)) 0%
              calc(var(--size) * 0.32) / var(--size) var(--size);
          mask: linear-gradient(-20deg, transparent 50%, white);
          pointer-events: none;
        }

        .word-hero-scroller .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }

        .word-hero-scroller .fluid {
          --fluid-min: calc(
            var(--font-size-min) * pow(var(--font-ratio-min), var(--font-level, 0))
          );
          --fluid-max: calc(
            var(--font-size-max) * pow(var(--font-ratio-max), var(--font-level, 0))
          );
          --fluid-preferred: calc(
            (var(--fluid-max) - var(--fluid-min)) /
              (var(--font-width-max) - var(--font-width-min))
          );
          --fluid-type: clamp(
            (var(--fluid-min) / 16) * 1rem,
            ((var(--fluid-min) / 16) * 1rem) -
              (((var(--fluid-preferred) * var(--font-width-min)) / 16) * 1rem) +
              (var(--fluid-preferred) * var(--variable-unit, 100vi)),
            (var(--fluid-max) / 16) * 1rem
          );
          font-size: var(--fluid-type);
        }

        .word-hero-scroller header {
          --font-level: 4;
          --font-size-min: 24;
          position: sticky;
          top: calc((var(--count) - 1) * -1lh);
          line-height: 1.2;
          display: flex;
          align-items: start;
          width: 100%;
          margin-bottom: var(--space);
        }

        .word-hero-scroller--embedded header {
          --font-size-min: 20;
          --font-level: 3;
        }

        .word-hero-scroller header section:first-of-type {
          display: flex;
          width: 100%;
          align-items: start;
          justify-content: center;
          padding-top: calc(var(--start) - 0.5lh);
        }

        .word-hero-scroller--embedded header section:first-of-type {
          justify-content: flex-start;
        }

        .word-hero-scroller header section:first-of-type h1 {
          position: sticky;
          top: calc(var(--start) - 0.5lh);
          margin: 0;
          font-weight: 600;
          font-family: var(--font-display, ui-sans-serif, system-ui, sans-serif);
        }

        .word-hero-scroller ul {
          font-weight: 600;
          list-style: none;
          padding: 0;
          margin: 0;
          font-family: var(--font-display, ui-sans-serif, system-ui, sans-serif);
        }

        .word-hero-scroller li {
          --dimmed: color-mix(in oklch, canvasText, #0000 80%);
          background: linear-gradient(
            180deg,
            var(--dimmed) 0 calc(var(--start) - 0.5lh),
            var(--accent) calc(var(--start) - 0.55lh) calc(var(--start) + 0.55lh),
            var(--dimmed) calc(var(--start) + 0.5lh)
          );
          background-attachment: fixed;
          color: #0000;
          background-clip: text;
        }

        .word-hero-scroller--embedded li {
          --dimmed: color-mix(in oklch, var(--text-light, #1a1a1a), #0000 75%);
        }

        .word-hero-scroller main {
          width: 100%;
          height: 100vh;
          position: relative;
          z-index: 2;
          color: canvas;
        }

        .word-hero-scroller main::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: -1;
          background: light-dark(#000, #fff);
          border-radius: 1rem 1rem 0 0;
        }

        .word-hero-scroller main section {
          --font-level: 4;
          --font-size-min: 20;
          height: 100%;
          width: 100%;
          display: flex;
          place-items: center;
        }

        .word-hero-scroller main section p {
          margin: 0;
          font-weight: 600;
          white-space: nowrap;
        }

        .word-hero-scroller main section a:not(.bear-link) {
          color: var(--accent);
          text-decoration: none;
          text-underline-offset: 0.1lh;
        }

        .word-hero-scroller main section a:not(.bear-link):is(:hover, :focus-visible) {
          text-decoration: underline;
        }

        .word-hero-scroller .bear-link {
          color: canvasText;
          position: fixed;
          top: 1rem;
          left: 1rem;
          width: 48px;
          aspect-ratio: 1;
          display: grid;
          place-items: center;
          opacity: 0.8;
        }

        .word-hero-scroller .bear-link:is(:hover, :focus-visible) {
          opacity: 1;
        }

        .word-hero-scroller .bear-link svg {
          width: 75%;
        }

        .word-hero-scroller footer {
          padding-block: 2rem;
          font-size: 0.875rem;
          font-weight: 300;
          color: color-mix(in hsl, canvas, #0000 35%);
          text-align: center;
          width: 100%;
          background: light-dark(#000, #fff);
        }

        .word-hero-scroller__descriptions {
          position: relative;
          width: 100%;
        }

        .word-hero-scroller__description {
          --dimmed: color-mix(in oklch, var(--text-light, #1a1a1a), #0000 70%);
          margin: 0;
          padding: 0.5rem 0;
          font-family: var(--font-body, ui-sans-serif, system-ui, sans-serif);
          font-size: clamp(0.875rem, 2vw, 1rem);
          font-weight: 400;
          line-height: 1.5;
          max-width: 28rem;
          background: linear-gradient(
            180deg,
            transparent 0 calc(var(--start) - 0.5lh),
            var(--text-light, #1a1a1a) calc(var(--start) - 0.55lh)
              calc(var(--start) + 0.55lh),
            transparent calc(var(--start) + 0.5lh)
          );
          background-attachment: fixed;
          color: #0000;
          background-clip: text;
        }

        @supports (animation-timeline: view()) {
          .word-hero-scroller[data-animate="true"]:not(
              .word-hero-scroller--embedded
            )
            main {
            view-timeline: --section;
          }
          .word-hero-scroller[data-animate="true"]:not(
              .word-hero-scroller--embedded
            )
            main::before {
            transform-origin: 50% 100%;
            scale: 0.9;
            animation: grow both ease-in-out;
            animation-timeline: --section;
            animation-range: entry 50%;
          }
          .word-hero-scroller[data-animate="true"]:not(
              .word-hero-scroller--embedded
            )
            main
            section
            p {
            position: fixed;
            top: 50%;
            left: 50%;
            translate: -50% -50%;
            animation: reveal both ease-in-out;
            animation-timeline: --section;
            animation-range: entry 50%;
          }
          .word-hero-scroller[data-animate="true"]:not(
              .word-hero-scroller--embedded
            )
            main
            .bear-link {
            animation: switch both ease-in-out;
            animation-timeline: --section;
            animation-range: entry 50%;
          }
          @keyframes switch {
            to {
              color: var(--switch);
            }
          }
          @keyframes reveal {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          @keyframes grow {
            to {
              scale: 1;
              border-radius: 0;
            }
          }
        }

        .word-hero-scroller[data-debug="true"] li {
          outline: 0.05em dashed currentColor;
        }
        .word-hero-scroller[data-debug="true"] :is(h2, li:last-of-type) {
          outline: 0.05em dashed canvasText;
        }
      `}</style>
    </div>
  );
}

function BearSVG() {
  return (
    <svg
      className="w-9"
      viewBox="0 0 969 955"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle
        cx="161.191"
        cy="320.191"
        r="133.191"
        stroke="currentColor"
        strokeWidth="20"
      />
      <circle
        cx="806.809"
        cy="320.191"
        r="133.191"
        stroke="currentColor"
        strokeWidth="20"
      />
      <circle cx="695.019" cy="587.733" r="31.4016" fill="currentColor" />
      <circle cx="272.981" cy="587.733" r="31.4016" fill="currentColor" />
      <path
        d="M564.388 712.083C564.388 743.994 526.035 779.911 483.372 779.911C440.709 779.911 402.356 743.994 402.356 712.083C402.356 680.173 440.709 664.353 483.372 664.353C526.035 664.353 564.388 680.173 564.388 712.083Z"
        fill="currentColor"
      />
      <rect x="310.42" y="448.31" width="343.468" height="51.4986" fill="#FF1E1E" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M745.643 288.24C815.368 344.185 854.539 432.623 854.539 511.741H614.938V454.652C614.938 433.113 597.477 415.652 575.938 415.652H388.37C366.831 415.652 349.37 433.113 349.37 454.652V511.741L110.949 511.741C110.949 432.623 150.12 344.185 219.845 288.24C289.57 232.295 384.138 200.865 482.744 200.865C581.35 200.865 675.918 232.295 745.643 288.24Z"
        fill="currentColor"
      />
    </svg>
  );
}

export { WordHeroPage };
