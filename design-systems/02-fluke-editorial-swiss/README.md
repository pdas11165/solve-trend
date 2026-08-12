# 02 · Fluke — Editorial Swiss

**Use when:** the client is a design-literate brand that wants to look like an award-winning studio. Portfolio-led, monochrome, poster-scale.

| | |
|---|---|
| Canvas | `#ffffff` |
| Surface | `#f5f5f5` |
| Ink | `#111111` / `#5d5d5d` |
| Accent | `#c82a2a` red — used as a **full-bleed section takeover**, not a sprinkle |
| Type | Inter Tight — `vw`-native |
| Base duration | `500ms` |
| Easing | `outQuint` / `inOutQuint` |

## Signatures

1. **`vw`-based type AND spacing AND radii** — the layout is a poster at every width.
2. **Ghosted/solid two-tone headline** — `Design` solid, `that` at `--c-text-ghost`.
3. **Inline pill inside a headline** — break a sentence with a pill holding a glyph or rotating word.
4. **Full-bleed accent takeover** (`.ds-takeover`) — commit to one immersive band rather than dotting colour around.
5. **Scroll-driven CSS variables** — animate `--sv-media-radius` / `--sv-media-pad` once, cascade to many elements.

## Usage

```html
<h1>Design <span class="ds-ghost">that</span> works</h1>

<section class="ds-takeover ds-section">…</section>

<div data-anim="media-scroll">
  <figure class="c-media-scroll"><img src="work.jpg" alt=""></figure>
</div>
```

## Contrast (WCAG AA verified)

| Pair | Ratio | |
|---|---|---|
| text on canvas | 18.88 | AAA |
| body on surface | 6.04 | AA |
| accent-ink on accent | 5.50 | AA |
| ghost on canvas (display only) | 3.23 | AA-large |

## Deviations from the source

- `--c-text-ghost` darkened `#d1d1d1` → `#8f8f8f`. The source's value is **1.53:1**, unreadable even at display size.
- Card loop should be a GSAP timeline with `repeat: -1`, not `setInterval` — it pauses correctly off-screen.
- Dropped CustomWiggle / CustomBounce / Flip (loaded but barely used at source).
