# 05 · Qubix — Dark Gallery

**Use when:** portfolio-forward work needs to look expensive. Photography, video, motion, 3D — anything where the work itself is the hero.

| | |
|---|---|
| Canvas | `#000000` |
| Elevation ladder | `#0f0f0f` → `#1c1c1c` → `#1d1d1d` → `#222222` |
| Ink | `#fdfcfc` (**not** `#ffffff`) / `#a1a1a1` |
| Accent | `#fe6512` vivid orange (~1% of pixels) |
| Type | InterDisplay, **weight 500** at all sizes |
| Base duration | `500ms`, enter `600` / exit `400` |
| Easing | `outQuad` / `power3.out` / `outBack` |

## Signatures

1. **Five-near-black elevation ladder** — on dark you cannot use shadow for depth, so depth is built from a ladder of almost-identical blacks. This is *the* correct way to do dark UI.
2. **`#fdfcfc` not `#ffffff` for body text** — pure white on pure black causes halation. One character, real comfort gain.
3. **26% white frost (`#ffffff42`)** as a single surface token driving glass cards, hairlines, and overlays.
4. **`blur()` + `grayscale()` for depth** (`.ds-depth-group` / `.ds-depth`) — unfocused items recede, hovered item resolves.
5. **Medium (500) weight at 128px** — confident, not shouting. Also optically correct: light type on dark reads heavier than it is.
6. **Asymmetric hover timing** — in `600ms / power3.out`, out `400ms / power2.out`. Arrivals savoured, departures quick.
7. **Live scroll-% in the nav.**
8. **Cursor-parallax scattered card hero.**

## Usage

```html
<div class="c-scatter" data-anim="scatter">
  <div class="c-ring"></div>
  <div class="c-scatter__card" data-depth="0.8" style="top:14%;left:40%"><img …></div>
  <div class="c-scatter__core"><h1>Qubix</h1></div>
</div>

<ul data-anim="exclusive">…</ul>
<span class="c-nav__progress" data-anim="scroll-percent">0%</span>
```

## Contrast (WCAG AA verified)

| Pair | Ratio | |
|---|---|---|
| text on canvas | 20.51 | AAA |
| body on surface | 7.42 | AAA |
| accent-ink on accent | 6.47 | AA |

## Deviations from the source

- **`--c-accent-ink` changed white → near-black.** The source puts white on `#fe6512` = **2.96:1**, a real WCAG failure. Corrected to 6.47:1.
- Hand-rolled wheel-lerp smooth scroll → **Lenis**. Kept Qubix's four guard clauses (reduced-motion → library-present → mobile → modifier-key), which are genuinely exemplary and worth shipping everywhere.
- `gsap.to({duration:0.2, onUpdate})` abused as a scroll throttle → `requestAnimationFrame`.
- Fixed `128px` h1 → `clamp()`.
