# 03 · Unusually — Condensed Frame

**Use when:** branding studio, creative agency, or any client who wants maximum typographic presence. The most systematic of the five — best one to clone wholesale.

| | |
|---|---|
| Gutter | `#f4f4f4` |
| Frame interior | `#0e0e0e` |
| Ink | `#ffffff` / `#acacac` / `#8d8d8d` |
| Accent | none — fully achromatic |
| Type | Mona Sans Narrow (display) + Mona Sans (body) + DM Mono (meta) |
| Base duration | `500ms` |
| Easing | `outCubic` / `inOutQuint` / `back.out` |

## Signatures

1. **The floating rounded frame** (`.ds-frame`) — the page sits inside a rounded container with a visible gutter. Highest-leverage structural idea in the whole reference set.
2. **Three-voice type** — narrow + normal cuts of one superfamily, plus a mono counter-voice.
3. **`line-height: 100%` with POSITIVE tracking** on display. The pairing is the trick — do both or neither. Only safe with an ultra-condensed face.
4. **Alpha tokens as first-class citizens** — `--p-white-10`, `--p-scrim-25`.
5. **Word-by-word grey→ink scroll reveal.**
6. **Individually-pilled nav items.**

## Usage

```html
<body>
  <div class="ds-frame">
    <nav class="c-nav">…</nav>
    <h2 data-anim="words">We design digital experiences that empower brands</h2>
  </div>
</body>
```

## Contrast (WCAG AA verified)

| Pair | Ratio | |
|---|---|---|
| text on frame | 19.30 | AAA |
| body on frame | 8.50 | AAA |
| meta on frame | 5.82 | AA |
| mute on frame (display only) | 3.26 | AA-large |

`--c-text-mute` clears only the 3:1 large-text floor. **Never apply it to body copy.**

## Deviations from the source

- Source loads **GSAP twice** (Webflow CDN 3.15.0 + jsDelivr 3.12.5). Fixed.
- Fixed `12rem` h1 → `clamp()`.
- Added `prefers-reduced-motion`.
- Kept the achromatic discipline but exposed `--c-accent` so a client accent can be dropped in.
