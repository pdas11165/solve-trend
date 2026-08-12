# Ritovex — Design Teardown

> `https://ritovex.webflow.io/` · Webflow Ecommerce template · Creative-agency positioning
> Source in `reference-websites/ritovex/` (index.html, `ritovex.webflow.shared.84db156a8.css`, Webflow runtime chunks)

---

## 1. Design language in one line

**Bright, high-trust corporate agency.** Near-black on off-white, one warm coral accent used sparingly, generous white space, soft-cornered light-grey cards, and *square* primary buttons. It reads "safe, professional, converts" rather than "avant-garde".

This is the most **commercially conservative** of the five references, and the most directly reusable for a client who sells services to non-designers.

---

## 2. Design tokens (extracted verbatim from CSS custom properties)

### Colour

| Token | Value | Role |
|---|---|---|
| `--_colors-plates---primary` | `#141414` | Text, primary button fill, footer bg |
| `--_colors-plates---secondary` | `#ff7a52` | Coral accent — icons, underlines, hovers |
| `--_colors-plates---gray` | `#494852` | Body copy |
| `--_colors-plates---light-gray` | `#f6f6f9` | Card / section surfaces |
| `--_colors-plates---white` | `#ffffff` | Page canvas |
| `--_colors-plates---transparent` | `transparent` | — |

Six colours total. **The entire site runs on a 2-neutral + 1-accent system.** Coral appears on maybe 4% of pixels — that restraint is what makes it feel expensive rather than cheap.

### Typography

Family: **Satoshi** (`--_fonts---font-family--primary-font: Satoshi, Arial, sans-serif`) — single family, no pairing. Geometric grotesque with a slightly quirky `a`/`g`; feels modern without being trendy.

| Token | Value |
|---|---|
| `--_typography---titles--display-title` | `120px` |
| `--_typography---title-xl` | `60px` |
| `--_typography---titles--h1` | `48px` |
| `--_typography---titles--h2` | `40px` |
| `--_typography---titles--h3` | `33px` |
| `--_typography---titles--h4` | `28px` |
| `--_typography---titles--h5` | `24px` |
| `--_typography---titles--h6` | `20px` |
| `--_typography---paragraphs--lg-body` | `18px` |
| `--_typography---paragraphs--md-body` | `16px` |
| `--_typography---paragraphs--sm-body` | `14px` |
| `--_typography---paragraphs--buttons` | `18px` |

Ratio between steps is ~1.18–1.25 — a **tight minor-third-ish scale**, not a dramatic one. Headings stay readable at small sizes; the drama comes from the 120px display token used once or twice.

Line heights are stored as their own tokens (`100 / 120 / 130 / 150`%) and composed with sizes. Weights: `300 / 400 / 500 / 700 / 900`.

### Spacing

Vertical rhythm is driven by three section tokens, not a full scale:

| Token | Value |
|---|---|
| `--section-gap` | `110px` |
| `--section-gap-medium` | `80px` |
| `--section-gap-small` | `60px` |

### Radii

`10px` (31 uses) and `12px` (27) dominate, then `20px` (25), `16px` (12), `100%` for avatars, `100px` for pills. **Primary buttons are `0` radius** — that square-button-in-a-rounded-world tension is a deliberate signature.

---

## 3. Section-by-section anatomy

1. **Utility bar + navbar** — split navbar with vertical hairline dividers, cart count, "Call Any Time" phone block right-aligned. Dropdowns on Company/Pages.
2. **Hero** — asymmetric 50/50. Left: pill eyebrow badge (light-grey fill, ~13px) → 48–60px H1 → 18px lede → dual CTA (solid black square button + ghost "▶ Watch Demo"). Right: portrait image with one large asymmetric corner radius.
3. **Logo marquee** — 9 partner logos, tripled in markup, infinite horizontal scroll (`duration: 30000/40000/60000ms`).
4. **About + odometer stats** — 2×2 stat cards on `#f6f6f9`. Each number is a **vertical digit reel**: a stack of `<h3>0..9</h3>` elements translated on the Y axis so the correct digit lands in a clipped window. This is why the raw HTML shows runs of `0 1 2 3 4 5 6 2 8 9`.
5. **Services accordion** — numbered `01–04` rows that expand on hover to reveal copy + a thumbnail.
6. **Portfolio grid** — category + date meta line, title, one-line outcome ("Boosted online sales 200%"). Outcome-led copy, not feature-led.
7. **3-step process** — icon, big step number, title, one-line description.
8. **Skills marquee** — second marquee, this one text + arrow + star glyphs, opposite direction to the logo row.
9. **Testimonials** — dual-row marquee of review cards (5 star icons, quote, avatar, name, role).
10. **CTA band** — dark, short, single button.
11. **Blog 3-up** → **newsletter** → **fat footer** (4 columns + contact icons + social).

---

## 4. Animation inventory

**Engine: 100% Webflow IX2. No GSAP, no Lenis, no smooth scroll.** Only jQuery + the Webflow runtime + Lottie.

| Metric | Value |
|---|---|
| Interaction events | 198 across 43 action lists |
| Elements with `data-w-id` | 73 |

**Event triggers**

| Trigger | Count |
|---|---|
| `SCROLL_INTO_VIEW` | 72 |
| `MOUSE_OVER` | 31 |
| `PAGE_START` | 30 |
| `MOUSE_OUT` | 26 |
| `PAGE_SCROLL` | 25 |
| `SCROLLING_IN_VIEW` | 6 |
| Dropdown / tab / navbar | 7 |

**Action types**

| Action | Count |
|---|---|
| `STYLE_OPACITY` | 59 |
| `STYLE_TEXT_COLOR` | 58 |
| `TRANSFORM_MOVE` | 57 |
| `STYLE_BACKGROUND_COLOR` | 29 |
| `TRANSFORM_SCALE` | 17 |
| `STYLE_SIZE` | 15 |
| `TRANSFORM_ROTATE` | 12 |
| `GENERAL_DISPLAY` | 11 |
| `PLUGIN_LOTTIE` | 3 |

**Easings** — `ease` (144), `outQuart` (21), `outCirc` (8), `inOutQuad` (3), plus one custom cubic-bézier `0.784, 0.325, 0.222, 0.98`.

**Durations (ms)** — `500` (197 — the house default), `300` (12), `400` (11), `1000` (11), `200` (6), `0` (20 = instant set), and `30000 / 40000 / 60000` for the three marquees.

### The three animation moves that carry the whole site

1. **Fade-up on scroll** — `opacity 0→1` + `translateY 20–40px→0`, `500ms`, `outQuart`, staggered across children. This is ~60% of all motion.
2. **Two-token hover swap** — on `MOUSE_OVER`, background flips `#141414 ↔ #ff7a52` *and* text colour flips in the same `200–300ms` beat. The pairing of `STYLE_BACKGROUND_COLOR` (29) with `STYLE_TEXT_COLOR` (58) at roughly 1:2 tells you every hover touches both.
3. **Odometer count-up** — digit reels driven by `TRANSFORM_MOVE` on `SCROLL_INTO_VIEW`, `1000ms`.

---

## 5. Tech stack

| Layer | Tech |
|---|---|
| Platform | Webflow (Ecommerce) |
| CSS | Single compiled sheet, 187 KB, unminified |
| JS | jQuery 3.5.1 + Webflow runtime (`webflow.104d0b61…`, two chunks) |
| Motion | Webflow IX2 only |
| Extras | Lottie (3 instances), Webflow Ecommerce cart |
| Fonts | Satoshi, self-hosted via Webflow |
| Images | `cdn.prod.website-files.com`, PNG/JPG/SVG |

No build step, no bundler, no external animation library. **Lowest-complexity site of the five.**

---

## 6. What to steal for Solve Trend

| Steal | Why |
|---|---|
| **6-colour token system** | Proves you don't need a big palette. 2 neutrals + 1 accent + surface is enough for a full agency site. |
| **Square primary button in a rounded UI** | Cheap, distinctive signature. One line of CSS. |
| **Odometer stat counter** | High perceived effort, trivial to build. Great for "50+ projects delivered". |
| **Outcome-first portfolio copy** | "Boosted online sales 200%" beats "E-commerce redesign" every time. Rewrite your case study one-liners this way. |
| **Counter-rotating marquee pair** | Logo row scrolls left, skills row scrolls right. Adds life at near-zero cost. |
| **500ms / outQuart as the house default** | A single duration + easing applied everywhere is what makes a site feel *designed* rather than assembled. |

### Skip

- Webflow Ecommerce cart chrome — irrelevant to a services business.
- The 120px display token — it only works because the rest of the scale is so restrained; on a denser page it will look shouty.
- `ease` on 144 of 198 interactions is lazy. Replace with `outQuart` / `outExpo` throughout.
