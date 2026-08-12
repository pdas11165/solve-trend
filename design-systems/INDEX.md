# Design Systems — Index

Two families live in this folder. They don't overlap and don't conflict.

---

## A · Web design systems (this batch)

Six systems for **websites, landing pages, and sections**. Reverse-engineered from five Webflow agency templates; teardowns in [`../reference-websites/`](../reference-websites/).

| System | Archetype | Reach for it when |
|---|---|---|
| [`01-ritovex-corporate-light`](01-ritovex-corporate-light/) | Bright corporate agency · white + coral · square CTAs | Client sells to non-designers. Trust and conversion over edge |
| [`02-fluke-editorial-swiss`](02-fluke-editorial-swiss/) | Monochrome Swiss editorial · `vw`-native · red takeover | Design-literate brand wanting award-studio credibility |
| [`03-unusually-condensed-frame`](03-unusually-condensed-frame/) | Ultra-condensed display · floating rounded frame | Branding studio, maximum typographic presence |
| [`04-stuxen-violet-saas`](04-stuxen-violet-saas/) | Violet SaaS · pill CTAs with arrow badges | "Make it look like a funded startup" |
| [`05-qubix-dark-gallery`](05-qubix-dark-gallery/) | Pure-black gallery · blur depth · work-forward | Portfolio-led — photo, video, motion, 3D |
| [`06-solvetrend-signature`](06-solvetrend-signature/) | **House system** · lime accent · dark + light | **Default.** Solve Trend's site and any client where you set direction |

### Shared layer — `_shared/`

| File | Purpose |
|---|---|
| [`TOKEN-CONTRACT.md`](_shared/TOKEN-CONTRACT.md) | The contract all six implement. Read before writing components |
| `fonts.css` | Font loading + substitution map. Load **before** tokens |
| `components.css` | Token-driven CSS component layer — works with any system |
| `motion.js` | Vanilla GSAP + Lenis engine, driven by `data-anim` attributes |
| `components.tsx` | React 19 / Next 16 / Tailwind 4 / Framer Motion 12 layer |

**The point of the contract:** components reference token *names*, never values. Swapping one `tokens.css` import re-skins an entire site with zero component edits.

### Preview

Open [`preview.html`](preview.html) — all six systems live, with a switcher, theme toggle, and a token inspector that reads computed values off the page. Contact sheet: [`preview-contact-sheet.png`](preview-contact-sheet.png).

### Quick start

```css
/* Next.js — app/globals.css */
@import "tailwindcss";
@import "../design-systems/_shared/fonts.css";
@import "../design-systems/06-solvetrend-signature/tokens.css";
@import "../design-systems/_shared/components.css";
```

```html
<!-- Vanilla / Webflow embed -->
<link rel="stylesheet" href="design-systems/_shared/fonts.css">
<link rel="stylesheet" href="design-systems/06-solvetrend-signature/tokens.css">
<link rel="stylesheet" href="design-systems/_shared/components.css">
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/ScrollTrigger.min.js"></script>
<script src="https://unpkg.com/lenis@1.3.1/dist/lenis.min.js"></script>
<script src="design-systems/_shared/motion.js" defer></script>
```

All six verified at **WCAG AA** — ratios recorded in each system's README.

---

## B · Business-document design system (earlier work)

[`solve-trend-ds.css`](solve-trend-ds.css) + [`README.md`](README.md) — print-first system for **invoices, quotes, statements of work, proposals and client reports**. Separate scope, separate token namespace (`st-*`). Unaffected by anything above.

---

## Which do I use?

- Anything rendered in a browser for a visitor → **A**
- Anything a client receives as a document or PDF → **B**
