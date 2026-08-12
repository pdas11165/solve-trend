# Reference Websites — Cross-Site Research Synthesis

Five Webflow agency/studio templates, torn down to tokens, section anatomy, animation inventory, and tech stack. Raw source (HTML + compiled CSS + Webflow runtime chunks) sits in the per-site folders; the analysis is in the five `.md` files beside this one.

| Site | Archetype | Canvas | Accent | Type | Motion engine |
|---|---|---|---|---|---|
| [Ritovex](ritovex.md) | Corporate agency | `#ffffff` | `#ff7a52` coral | Satoshi | IX2 only |
| [Fluke](kitpro-fluke.md) | Swiss editorial | `#ffffff` | `#c82a2a` red (full-bleed) | Inter Tight | GSAP + Lenis + IX2 |
| [Unusually](unusually.md) | Condensed brutalist | `#f4f4f4` / `#0e0e0e` | none | Mona Sans Narrow + Mona Sans + DM Mono | IX2 + GSAP |
| [Stuxen](stuxen.md) | Violet SaaS | `#f5f5f5` | `#5235f6` indigo | Poppins | IX2 only |
| [Qubix](qubix.md) | Dark gallery studio | `#000000` | `#fe6512` orange | Interdisplay | GSAP + custom scroll + IX2 |

---

## The seven patterns that appear across all five

### 1. One typeface, many weights — never a pairing

Four of five use a **single family**. Unusually uses three, but two are cuts of the same superfamily (Mona Sans / Mona Sans Narrow) and the third is a mono restricted to eyebrows and labels.

Nobody pairs a serif with a sans. Nobody uses a "display font" plus a "body font". **Contrast comes from size, weight, case, and tracking — not from mixing families.**

### 2. Two neutrals + one accent, and the accent is nearly invisible

| Site | Accent | Approx. pixel share |
|---|---|---|
| Ritovex | `#ff7a52` | ~4% |
| Fluke | `#c82a2a` | one full-bleed section |
| Stuxen | `#5235f6` | ~8% (highest — it's a SaaS look) |
| Qubix | `#fe6512` | ~1% |
| Unusually | — | 0% |

The pattern is **restraint**, and the highest-craft sites (Fluke, Qubix, Unusually) use the least colour. Colour is spent on the single thing you want clicked.

### 3. Alpha ladders instead of grey palettes

Three of five define opacity steps of one ink rather than separate greys:

```css
/* Stuxen */  --dark-70: #212121b3;  --dark-16: #21212129;  --dark-12: #2121211f;
/* Unusually */ --background-25: #70707040;  --light-10: #ffffff1a;
/* Qubix */   --transparent-white: #ffffff42;   /* 26% */
```

One hue, N opacities. Automatically harmonious, works on any background, survives a theme flip.

### 4. Negative tracking on display type — as a ratio

Stuxen: `-2.24px @ 56px`, `-1.92px @ 52px`, `-1.44px @ 48px` → a consistent **≈ −4%**.
Qubix, Unusually, Fluke all do the same by eye.

Implement once as `letter-spacing: -0.04em` on display type and you reproduce the entire ladder.

**Exception worth understanding:** Unusually uses *positive* tracking (`+.1rem`) with `line-height: 100%`. That inverse only works because the face is ultra-condensed. Don't half-copy it.

### 5. Tight leading on headlines, generous on body

| Site | Heading LH | Body LH |
|---|---|---|
| Unusually | `100%` | ~150% |
| Ritovex | `100–120%` | `150%` |
| Stuxen | `117–120%` | `145–171%` |
| Qubix | `122–154%` | `154%` |

Headlines become typographic blocks; body stays readable.

### 6. `500ms` is the house default, `400ms` feels premium

| Site | Dominant duration | Count |
|---|---|---|
| Ritovex | 500ms | 197 |
| **Stuxen** | **400ms** | **217** |
| Unusually | 500ms | 102 |
| Qubix | 500ms | 236 |
| Fluke | 500ms | 76 |

Stuxen is the outlier and is noticeably snappier. **Recommendation: 400ms base, 600ms for large entrances, 200ms for micro-interactions.**

### 7. Easing separates the professionals from the templates

| Site | Dominant easing | Craft signal |
|---|---|---|
| Stuxen | `ease` ×217 | ✗ default |
| Ritovex | `ease` ×144 | ✗ default |
| Qubix | `outQuad` ×81 | ✓ deliberate |
| Unusually | `inOutQuint` ×28, `outCubic` ×27, `swingTo` ×16 | ✓✓ crafted |
| Fluke | `outQuint` ×34, `inOutQuint` ×18 | ✓✓ crafted |

The two sites that feel most expensive (Fluke, Unusually) never use `ease`. **Quint easings are the single cheapest upgrade available** — same code, different string.

---

## Motion philosophy splits into two camps

| | **Scroll-driven** | **Hover-driven** |
|---|---|---|
| Sites | Ritovex, Stuxen | Unusually, Fluke, Qubix |
| Signature | `SCROLL_INTO_VIEW` 72–100 | `MOUSE_OVER`/`OUT` 29–164 |
| Feels like | A presentation unfolding | A space to explore |
| Suits | Services, lead-gen, SaaS | Portfolio, brand, studio |

Unusually is the extreme case: **164 hover events vs 5 scroll events.** Ritovex is the mirror image.

**For Solve Trend:** you sell services *and* show craft. Use scroll-driven motion on the services/process/pricing path, hover-driven motion on portfolio and case studies.

---

## Techniques ranked by effort-to-impact

### Tier 1 — take these first

1. **Floating rounded frame** (Unusually) — one wrapper, one radius, one gutter colour. Biggest perceived-quality jump available.
2. **Quint/expo easings replacing `ease`** — a find-and-replace.
3. **Alpha ladder tokens** — delete your grey palette, keep one ink.
4. **`letter-spacing: -0.04em` on display type** — one line.
5. **Pill CTA with inset circular arrow badge** (Stuxen) — best reusable component in the set.
6. **Ghosted/solid two-tone headline** (Fluke) — one span, one colour token.
7. **`#fdfcfc` not `#ffffff` on dark** (Qubix) — one character.

### Tier 2 — a day each, strong payoff

8. **GSAP + Lenis init block** (Fluke) — solved once, reused forever.
9. **Word-by-word grey→black scroll reveal** (Unusually) — SplitText + scrubbed ScrollTrigger.
10. **Five-near-black elevation ladder** (Qubix) — the correct dark-mode foundation.
11. **Odometer stat counter** (Ritovex) — high perceived effort, trivial build.
12. **Counter-rotating marquee pair** (Ritovex).
13. **CSS-variable scroll animation** (Fluke `PLUGIN_VARIABLE`) — animate one custom property, cascade to many elements.
14. **`STYLE_FILTER` depth** (Qubix) — blur + grayscale unfocused, restore on hover.

### Tier 3 — signature pieces, build when the project earns it

15. **Cursor-trailing image trail** (Unusually).
16. **Cursor-parallax scattered card hero** (Qubix).
17. **Diagonal card loop** (Fluke).
18. **Scroll-driven un-cropping images** (Fluke).

---

## Mistakes present in the references — don't inherit them

| Site | Problem |
|---|---|
| Ritovex, Stuxen | `ease` on 90%+ of interactions |
| Stuxen | 100 `SCROLL_INTO_VIEW` triggers — when everything moves, nothing reads as important |
| Unusually | **GSAP loaded twice** (Webflow CDN 3.15.0 + jsDelivr 3.12.5) |
| Unusually, Qubix | Fixed `12rem` / `128px` h1 with no `clamp()` — overflows on tablet |
| Fluke | Ships CustomWiggle, CustomBounce, and Flip while barely using them |
| Fluke | `setInterval` card loop instead of a GSAP timeline — doesn't pause off-screen |
| Qubix | Hand-rolled smooth scroll where Lenis handles far more edge cases |
| Qubix | `gsap.to({duration: 0.2, onUpdate})` abused as a scroll throttle |
| All except Qubix | **No `prefers-reduced-motion` handling.** Qubix is the only one that gets this right. |

That last row matters. Four of five reference sites are inaccessible to users with vestibular disorders. Every design system in `design-systems/` ships a reduced-motion block by default.

---

## Where this goes next

The six systems in [`../design-systems/`](../design-systems/) turn the above into working code:

| System | Derived from |
|---|---|
| `01-ritovex-corporate-light` | Ritovex |
| `02-fluke-editorial-swiss` | Fluke |
| `03-unusually-condensed-frame` | Unusually |
| `04-stuxen-violet-saas` | Stuxen |
| `05-qubix-dark-gallery` | Qubix |
| `06-solvetrend-signature` | Synthesis — Tier 1 + Tier 2 patterns, tuned for premium agency positioning |

Each ships `tokens.css` (shared token layer), `components.html` (vanilla + GSAP), and `components.tsx` (React + Tailwind 4 + Framer Motion), so the same system drops into a Webflow embed or into the Next.js app in this repo.
