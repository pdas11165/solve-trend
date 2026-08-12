# Token Contract

Every system in `design-systems/` implements **exactly these token names**. Swap one `tokens.css` for another and the same components re-skin completely — no component edits.

This is the whole point of the folder: components are written against the contract, never against a specific palette.

---

## Three layers

```
Layer 1  PRIMITIVE   raw values          --p-ink-900: #0e0e0e
Layer 2  SEMANTIC    roles               --c-text: var(--p-ink-900)
Layer 3  COMPONENT   per-component       --btn-radius: var(--r-pill)
```

Components read **layer 2 and 3 only**. Never reference a primitive directly in a component.

---

## Layer 2 — semantic (required in every system)

### Surfaces

| Token | Meaning |
|---|---|
| `--c-canvas` | Outermost page background |
| `--c-surface` | Default card/panel background |
| `--c-surface-2` | Elevated or alternating surface |
| `--c-surface-3` | Highest elevation / inset wells |
| `--c-frost` | Translucent glass layer (alpha) |

### Ink

| Token | Meaning |
|---|---|
| `--c-text` | Primary text |
| `--c-text-2` | Secondary / body |
| `--c-text-3` | Tertiary / meta / disabled |
| `--c-text-inv` | Text on inverted surfaces |

### Accent & line

| Token | Meaning |
|---|---|
| `--c-accent` | The one accent colour |
| `--c-accent-ink` | Text colour that sits on `--c-accent` |
| `--c-line` | Default hairline |
| `--c-line-soft` | Subtler hairline |

### Type

| Token | Meaning |
|---|---|
| `--f-display` | Headline family |
| `--f-body` | Body family |
| `--f-mono` | Meta / eyebrow / label family |
| `--fs-d1 … --fs-d3` | Display sizes (fluid `clamp()`) |
| `--fs-h1 … --fs-h6` | Heading sizes (fluid) |
| `--fs-lg / --fs-md / --fs-sm / --fs-xs` | Body sizes |
| `--lh-tight / --lh-head / --lh-body / --lh-loose` | Line heights |
| `--ls-display / --ls-head / --ls-body / --ls-label` | Letter spacing |
| `--fw-light … --fw-black` | Weights |

### Space

`--s-1` through `--s-16` on a consistent scale, plus `--s-section`, `--s-section-md`, `--s-section-sm`, `--s-gutter`, `--s-container`.

### Radius

`--r-xs / --r-sm / --r-md / --r-lg / --r-xl / --r-pill / --r-round`

### Motion

| Token | Meaning |
|---|---|
| `--d-micro` | Micro-interactions (~150–200ms) |
| `--d-base` | House default (~400ms) |
| `--d-slow` | Large entrances (~600–800ms) |
| `--d-marquee` | Marquee cycle |
| `--e-out` | Standard exit easing |
| `--e-in-out` | Symmetric easing |
| `--e-over` | Overshoot / spring |

---

## Layer 3 — component tokens

`--btn-radius`, `--btn-pad-y`, `--btn-pad-x`, `--btn-badge`, `--card-radius`, `--card-pad`, `--nav-radius`, `--nav-h`, `--frame-radius`, `--frame-gutter`, `--input-radius`.

---

## Non-negotiable in every `tokens.css`

1. **Fluid type.** Every display and heading size is `clamp()`. No fixed px on anything above `--fs-h4`.
2. **Reduced motion.** Every system ends with:
   ```css
   @media (prefers-reduced-motion: reduce) {
     *, *::before, *::after {
       animation-duration: .01ms !important;
       animation-iteration-count: 1 !important;
       transition-duration: .01ms !important;
       scroll-behavior: auto !important;
     }
   }
   ```
   Four of the five reference sites omit this. None of ours do.
3. **Alpha ladders, not grey palettes.** Secondary/tertiary ink is one hue at declining opacity via `color-mix()` or a hex-alpha primitive.
4. **`--c-accent-ink` always defined**, so accent-filled components never guess their text colour.

---

## Contrast floor

Every system is checked at **WCAG AA**: 4.5:1 for body text, 3:1 for large text (≥24px or ≥19px bold) and UI boundaries. Verified values are recorded in each system's `README.md`.

---

## Using a system

**Vanilla / Webflow embed**

```html
<link rel="stylesheet" href="design-systems/06-solvetrend-signature/tokens.css">
<!-- then paste any block from components.html -->
```

**Next.js (this repo)**

```css
/* app/globals.css */
@import "../design-systems/06-solvetrend-signature/tokens.css";
```

```tsx
import { PillButton, StatCounter } from "@/design-systems/06-solvetrend-signature/components";
```

**Re-skinning a client site:** change the one `@import` line. Nothing else.
