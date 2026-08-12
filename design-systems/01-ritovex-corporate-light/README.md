# 01 · Ritovex — Corporate Light

**Use when:** the client sells services to non-designers and needs trust + conversion more than edge. Local businesses, consultancies, B2B services, professional firms.

| | |
|---|---|
| Canvas | `#ffffff` |
| Surface | `#f6f6f9` |
| Ink | `#141414` / `#494852` |
| Accent | `#ff7a52` coral (~4% of pixels) |
| Type | Satoshi — single family |
| Base duration | `500ms` |
| Easing | `outQuart` (upgraded from source's `ease`) |

## Signatures

1. **Square primary button in a rounded UI** — `--btn-radius: 0` while cards sit at `12px`. One line, instantly distinctive.
2. **Odometer stat counters** — digit reels, high perceived effort, trivial build.
3. **Counter-rotating marquee pair** — logos left, skills right.
4. **Tight 1.18–1.25 type scale** — drama comes from the single `--fs-d1` moment, not from every heading.

## Usage

```html
<link rel="stylesheet" href="design-systems/01-ritovex-corporate-light/tokens.css">
<link rel="stylesheet" href="design-systems/_shared/components.css">
<script src="design-systems/_shared/motion.js" defer></script>
```

```html
<a class="c-btn c-btn--square" href="#">Get Started</a>
<span class="c-odometer" data-anim="count" data-to="250" data-suffix="+"></span>
```

## Contrast (WCAG AA verified)

| Pair | Ratio | |
|---|---|---|
| text on canvas | 18.42 | AAA |
| body on surface | 8.35 | AAA |
| accent-ink on accent | 7.16 | AAA |

## Deviations from the source

- `ease` → `outQuart` on all motion.
- Fixed px type → `clamp()` throughout.
- Added `prefers-reduced-motion` (source has none).
