# 06 · Solve Trend — Signature

The house system. A synthesis of the best patterns from all five references, tuned for premium digital-marketing / creative-technology positioning — and the one you should reach for by default, both for solvetrend.com and for client work where you're setting the direction.

Ships **dark (default) and light themes on one token contract**. Flip with `<html data-theme="light">`.

| | Dark (default) | Light |
|---|---|---|
| Canvas / gutter | `#000000` | `#f7f7f9` |
| Frame interior | `#0b0b0c` | `#ffffff` |
| Elevation | `#131315` → `#1a1a1d` → `#232327` | `#f1f1f4` → `#e4e4e8` |
| Text | `#fdfcfc` / `#a8a8b2` / `#8a8a93` | `#0b0b0c` / 70% / `#6e6e77` |
| Accent (fill) | `#c5f24c` lime | `#a8d92e` |
| Accent (as text) | `#c5f24c` | `#587512` olive cut |
| Type | Inter Tight (display) + Inter (body) + DM Mono (meta) | same |
| Base duration | `400ms` · enter `600` · exit `380` | same |
| Easing | `outQuint` | same |

---

## What came from where

| Pattern | Source |
|---|---|
| Floating rounded frame | Unusually |
| Five-near-black elevation ladder | Qubix |
| `#fdfcfc` not `#ffffff` on dark | Qubix |
| Alpha ladders instead of grey palettes | Stuxen + Unusually |
| Tracking as a fixed −4% ratio | Stuxen |
| Pill CTA with inset arrow badge | Stuxen |
| 400ms house duration | Stuxen |
| Quint easings, never `ease` | Fluke |
| Three-voice type system | Unusually |
| Scroll-driven CSS variables | Fluke |
| Asymmetric hover timing | Qubix |
| `blur()` + `grayscale()` depth | Qubix |
| Word-by-word scroll reveal | Unusually |
| Odometer stat counter | Ritovex |
| Counter-rotating marquees | Ritovex |
| Full-bleed accent takeover | Fluke |

---

## Why lime

The reference set covers coral, red, indigo, and orange. Lime is unclaimed, reads as motion-design/creative-tech rather than SaaS, and — critically — has a **15.2:1 contrast ratio against near-black ink**, so accent-filled buttons are the most readable elements on the page rather than the least.

The one catch: lime as *text on white* is only 1.66:1. That's why there are two accent tokens.

> **Rule:** `--c-accent` for fills and surfaces. `--c-accent-text` for coloured text and icons. Never use `--c-accent` as a text colour.

---

## Setup

### Next.js (this repo)

```css
/* app/globals.css */
@import "tailwindcss";
@import "../design-systems/06-solvetrend-signature/tokens.css";
@import "../design-systems/_shared/components.css";
```

```tsx
// app/layout.tsx
import { SmoothScroll, Frame } from "@/design-systems/_shared/components";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SmoothScroll>
          <Frame>{children}</Frame>
        </SmoothScroll>
      </body>
    </html>
  );
}
```

### Vanilla / Webflow embed

```html
<link rel="stylesheet" href="design-systems/06-solvetrend-signature/tokens.css">
<link rel="stylesheet" href="design-systems/_shared/components.css">
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/ScrollTrigger.min.js"></script>
<script src="https://unpkg.com/lenis@1.3.1/dist/lenis.min.js"></script>
<script src="design-systems/_shared/motion.js" defer></script>
```

---

## Component quick reference

### React

```tsx
import {
  Frame, Section, Container, Reveal, Stagger, StaggerItem,
  PillButton, Eyebrow, Card, WordReveal, Odometer,
  ScrollPercent, Marquee, ScatterHero, DepthGroup, DepthItem,
  Accordion, SmoothScroll,
} from "@/design-systems/_shared/components";
```

```tsx
<Section>
  <Container>
    <Eyebrow dot pill>Creative Technology</Eyebrow>
    <WordReveal as="h2" className="ds-d2"
      text="We build brands that move — websites, video, motion, and the automation behind them." />
    <Reveal delay={0.1}>
      <PillButton href="/contact">Start a project</PillButton>
    </Reveal>
    <Odometer to={250} suffix="+" />
  </Container>
</Section>
```

### Vanilla — data attributes drive everything

| Attribute | Effect |
|---|---|
| `data-anim="in"` | Fade-up on scroll |
| `data-anim="stagger"` | Stagger direct children |
| `data-anim="words"` | Word-by-word grey→ink reveal |
| `data-anim="count" data-to="250" data-suffix="+"` | Odometer |
| `data-anim="scroll-percent"` | Live scroll % |
| `data-anim="scatter"` | Cursor-parallax cards |
| `data-anim="trail" data-images="a.jpg,b.jpg"` | Cursor image trail |
| `data-anim="exclusive"` | Hover-exclusive panel group |
| `data-anim="media-scroll"` | Scroll-driven radius + padding |

---

## Utility classes

| Class | Effect |
|---|---|
| `.ds-frame` | The floating rounded page frame |
| `.ds-eyebrow` | Mono third-voice label |
| `.ds-ghost` | De-emphasised headline word |
| `.ds-hl` | Accent headline word (uses the safe text cut) |
| `.ds-em` | Italic emphasis word |
| `.ds-d1/2/3` | Display sizes |
| `.ds-glass` | Frosted glass surface |
| `.ds-takeover` | Full-bleed accent section |
| `.ds-grid-bg` | Faint architectural grid |
| `.ds-invert` | Flip a section to the opposite theme |

---

## Contrast (WCAG AA verified)

### Dark

| Pair | Ratio | |
|---|---|---|
| text on canvas | 20.51 | AAA |
| body on frame | 8.35 | AAA |
| meta on frame | 5.75 | AA |
| accent-ink on accent | 15.16 | AAA |
| accent-text on frame | 15.16 | AAA |

### Light

| Pair | Ratio | |
|---|---|---|
| text on surface | 19.67 | AAA |
| meta on surface | 5.05 | AA |
| accent-text on surface | 5.29 | AA |
| accent-ink on accent | 11.83 | AAA |

`--c-text-mute` (`#949494` light / `#313137` dark) clears only the 3:1 large-text floor and is for **display type only** — never body copy.

---

## House rules

1. **Never use `ease`.** `--e-out` (outQuint) is the default; `--e-over` for hover overshoot.
2. **400ms base.** 180ms micro, 600/380 for the asymmetric enter/exit pair.
3. **Entrance motion on section heads and cards only.** Body copy just appears. When everything moves, nothing reads as important — Stuxen's 100 scroll triggers is the anti-pattern.
4. **One accent, under 5% of pixels.** The highest-craft references use the least colour.
5. **Every display size is `clamp()`.** No fixed px above `--fs-h4`.
6. **`--c-accent` fills, `--c-accent-text` writes.**
7. **`prefers-reduced-motion` is not optional.** Four of the five references omit it entirely.
