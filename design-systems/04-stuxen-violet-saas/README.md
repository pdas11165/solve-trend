# 04 · Stuxen — Violet SaaS

**Use when:** the client wants to look like a funded modern startup. Highest conversion orientation of the five.

| | |
|---|---|
| Canvas | `#f5f5f5` |
| Surface | `#ffffff` |
| Ink | `#212121` at 100 / 70 / 16 / 12% |
| Accent | `#5235f6` electric indigo |
| Type | Poppins, uppercase headings |
| Base duration | **`400ms`** — the snappiest of the five |
| Easing | `cubic-bezier(0.702, 0.311, 0.292, 0.983)` |

## Signatures

1. **Pill CTA with an inset circular arrow badge** — the single best reusable component in the reference set. Nav CTA, hero CTAs, cards all use it.
2. **Tracking as a fixed −4% of size** — `letter-spacing: -0.04em` reproduces the source's entire hand-tuned ladder in one declaration.
3. **Alpha ladder** — `--dark-70 / -16 / -12`: one ink at three opacities, never three greys.
4. **Faint vertical grid behind the hero** (`.ds-grid-bg`) — four hairlines, architectural credibility for free.
5. **Italic final word** in an uppercase headline (`.ds-em`).
6. **Three radii, three meanings** — `20px` cards / `62px` pills / `50%` badges.

## Usage

```html
<section class="ds-grid-bg ds-section">
  <span class="c-pill"><i class="c-pill__dot"></i>Webflow Template</span>
  <h1>Premium digital agency <span class="ds-em">template.</span></h1>
  <a class="c-btn c-btn--accent" href="#">
    More Templates
    <span class="c-btn__badge"><svg …/></span>
  </a>
</section>
```

## Contrast (WCAG AA verified)

| Pair | Ratio | |
|---|---|---|
| text on canvas | 14.77 | AAA |
| accent on surface | 6.57 | AA |
| accent-ink on accent | 6.57 | AA |

## Deviations from the source

- `ease` on **217 of 219** interactions → replaced with the site's own custom bézier, which was already defined and unused on most elements.
- Source fires 100 `SCROLL_INTO_VIEW` triggers. Over-animation: when everything moves, nothing reads as important. Reserve `data-anim="in"` for section heads and cards.
- Added `prefers-reduced-motion`.
