# Stuxen — Design Teardown

> `https://stuxen.webflow.io/` · Webflow Ecommerce template · Digital-agency / SaaS positioning
> Source in `reference-websites/stuxen/`

---

## 1. Design language in one line

**Modern violet SaaS-agency.** Electric indigo on whitesmoke, condensed uppercase Poppins headlines with aggressive negative tracking, pill buttons with a circular arrow badge welded into them, and a faint architectural grid running behind the hero.

The most **conversion-oriented** of the five. If a client says "make it look like a modern startup", this is the reference.

---

## 2. Design tokens

### Colour

| Token | Value | Role |
|---|---|---|
| `--primary-clr` | `#5235f6` | Electric indigo — buttons, badges, links, dots |
| `--secondary-clr` | `#212121` | Headline + body text |
| `--white-smoke` | `whitesmoke` (`#f5f5f5`) | Page canvas |
| `--white` | `white` | Cards, elevated surfaces |
| `--black` | `black` | Rare maximum contrast |
| `--gray-light` | `#e4e4e4` | Hairlines, grid lines |
| `--dark-70` | `#212121b3` | 70% text — body copy |
| `--dark-16` | `#21212129` | 16% — borders |
| `--dark-12` | `#2121211f` | 12% — subtle dividers |
| `--transparent` | `transparent` | — |

The `--dark-70 / -16 / -12` alpha ladder is the important bit: **one ink colour at three opacities** instead of three separate greys. Everything stays harmonious automatically, and it works on any background.

### Typography

Family: **Poppins** — single family. Geometric, friendly, extremely legible; the safe modern choice.

Headings are `uppercase`, weight `600`, with **large negative tracking** — verified from the live DOM: h1 is `56px / 65.52px / 600 / -2.24px / uppercase`.

| Token | Value | Tracking token | Value |
|---|---|---|---|
| `--_font-sizing---heading--heading-xxl` | `56px` | `--_letter-spacing---ls-xxl` | `-2.24px` |
| `--_font-sizing---heading--heading-xl` | `52px` | `--_letter-spacing---ls-xl` | `-1.92px` |
| `--_font-sizing---heading--heading-lg` | `48px` | `--_letter-spacing---ls-wider` | `-1.44px` |
| `--_font-sizing---heading--heading-md` | `36px` | `--_letter-spacing---ls-wide` | `-1.28px` |
| `--_font-sizing---heading--heading-sm` | `32px` | `--_letter-spacing---ls-md-wide` | `-1.12px` |
| `--_font-sizing---heading--heading-xs` | `28px` | `--_letter-spacing---ls-md` | `-.96px` |
| `--_font-sizing---heading--heading-xxs` | `22px` | `--_letter-spacing---ls-md-tight` | `-.88px` |
| `--_font-sizing---body--display-sm` | `40px` | `--_letter-spacing---ls-compact` | `-.8px` |
| `--_font-sizing---body--text-xl` | `24px` | `--_letter-spacing---ls-tighter` | `-.32px` |
| `--_font-sizing---body--text-lg` | `20px` | `--_letter-spacing---ls-tightest` | `-.28px` |
| `--_font-sizing---body--text-sm` | `16px` | | |
| `--_font-sizing---body--text-xs` | `14px` | | |

**Tracking is ≈ −4% of font size at every step** (56 → −2.24, 52 → −1.92, 48 → −1.44). That's a rule, not a guess — implement it as `letter-spacing: -0.04em` and you reproduce the whole ladder with one declaration.

Line heights are stored as **precise percentages** rather than round numbers — `117.857%`, `120.833%`, `127.778%`, `131.25%`, `135.714%`, `145.455%`, `157.143%`, `171.429%`. These are px-ratios back-computed into percentages (e.g. 66/56 = 117.857%). Designed in px, exported as %.

### Spacing

```
xxs 8 · xs 12 · md 20 · md-alt 22 · md-lg 24 · lg 30 · lg-alt 32
lg-md 36 · xl 40 · xl-alt 45 · 3xl 60 · 4xl 80              (px)

padding: tiny 12 · md 48 · lg 60 · xl 92 · xxl 96 · section-lg 100
```

### Radii

| Token | Value | Uses |
|---|---|---|
| `--_radius---radius-xs` | `12px` | 3 |
| `--_radius---radius-sm` | `16px` | 10 |
| `--_radius---radius-md` | `20px` | **39 — the house radius** |
| `--_radius---radius-xl` | `62px` | 4 |
| — | `50%` | 20 (circular badges) |

`20px` on cards, `62px` on pill CTAs, `50%` on the arrow badges. Three radii, three meanings.

---

## 3. Section-by-section anatomy

1. **Navbar** — logo + wordmark left, four centred links, and a **pill CTA with a white circular arrow badge inset on its right end**. That button is the site's signature component.
2. **Hero** — centred, with a **faint vertical grid** (`#e4e4e4` 1px rules at ~4 column positions) running the full height behind the content. Stack: pill eyebrow badge with a violet dot (`• WEBFLOW TEMPLATE`, uppercase, tracked) → 56px uppercase H1 where the **final word is set in italic** (`WEBFLOW *TEMPLATE.*`) → 16px `--dark-70` lede → two pill buttons, one violet-filled and one white-outlined, both carrying the circular arrow badge.
3. **Demo/preview grid** — browser-chrome mockup cards (three dots top-left) on white with `20px` radius.
4. **Feature sections**, **slider**, **tabs**, **footer**.

### The signature component — pill + badge button

```
┌──────────────────────────────────┐
│  More Templates            ( › ) │   fill #5235f6, radius 62px
└──────────────────────────────────┘   badge: 50%, white on violet

┌──────────────────────────────────┐
│  This Is The Default Value ( › ) │   fill white, border --dark-16
└──────────────────────────────────┘   badge: 50%, violet on white
```

On hover the badge translates right and the fill inverts. Present on nav CTA, hero CTAs, and cards — used consistently enough to become the brand.

---

## 4. Animation inventory

**Engine: 100% Webflow IX2.** No GSAP, no Lenis, no smooth scroll. jQuery + Webflow runtime + Lottie only. Just 673 bytes of inline JS.

| Metric | Value |
|---|---|
| Elements with `data-w-id` | 37 |

**Event triggers**

| Trigger | Count |
|---|---|
| `SCROLL_INTO_VIEW` | 100 |
| `MOUSE_OVER` | 47 |
| `MOUSE_OUT` | 42 |
| `PAGE_SCROLL` | 23 |
| `DROPDOWN_OPEN` / `DROPDOWN_CLOSE` | 21 / 21 |
| `SLIDER_ACTIVE` / `TAB_ACTIVE` / `TAB_INACTIVE` | 7 / 7 / 7 |
| `SCROLLING_IN_VIEW` | 4 |
| `NAVBAR_OPEN` / `NAVBAR_CLOSE` | 2 / 2 |
| `SLIDER_INACTIVE` / `PAGE_START` | 1 / 1 |

**Action types**

| Action | Count |
|---|---|
| `STYLE_OPACITY` | 104 |
| `TRANSFORM_MOVE` | 89 |
| `STYLE_TEXT_COLOR` | 39 |
| `STYLE_BACKGROUND_COLOR` | 33 |
| `STYLE_SIZE` | 27 |
| `TRANSFORM_SCALE` | 17 |
| `STYLE_BORDER` | 12 |
| `GENERAL_DISPLAY` | 6 |
| `PLUGIN_LOTTIE` | 3 |

**Easings** — `ease` (217), `outQuart` (2), one custom cubic-bézier `0.702, 0.311, 0.292, 0.983`.
**Durations (ms)** — **`400` (217 — the house default)**, `500` (95), `0` (10), `1000` (3), `2500` (2), `30000` (3, marquees).

### The three moves

1. **Fade-up on scroll** — `opacity + translateY`, `400ms`. 100 scroll triggers means essentially *every* element animates in.
2. **Four-property hover** — `STYLE_TEXT_COLOR` (39) + `STYLE_BACKGROUND_COLOR` (33) + `STYLE_BORDER` (12) + `TRANSFORM_MOVE`, all in the same `400ms` beat. That's the pill-button inversion.
3. **UI-state choreography** — dropdowns (42), tabs (14), slider (8), navbar (4) all have hand-authored transitions rather than defaults. That's ~68 interactions spent purely on *interface polish*, and it's why the site feels finished.

**Stuxen is the fastest-feeling site of the five at 400ms**, versus 500ms everywhere else.

---

## 5. Tech stack

| Layer | Tech |
|---|---|
| Platform | Webflow (Ecommerce) |
| CSS | 191 KB, 97 custom properties |
| Motion | Webflow IX2 only |
| Extras | Lottie ×3, Google WebFont Loader |
| Fonts | Poppins |
| Custom JS | 673 bytes |

---

## 6. What to steal for Solve Trend

| Steal | Why |
|---|---|
| **Alpha ladder for text (`--dark-70 / -16 / -12`)** | One ink at N opacities beats N greys. Works on any background, always harmonious. |
| **Tracking as a fixed −4% of size** | `letter-spacing: -0.04em` on all display type. Single declaration, reproduces the entire ladder. |
| **Pill button with inset circular arrow badge** | Best single reusable component in the reference set. Make it your house CTA. |
| **Faint vertical grid behind the hero** | 4 hairlines at `#e4e4e4`. Costs nothing, adds architectural credibility. |
| **Italic final word in a uppercase headline** | `PREMIUM DIGITAL AGENCY WEBFLOW *TEMPLATE.*` — one-word emphasis with no colour change. |
| **400ms house duration** | Snappier than the 500ms default. Noticeably more responsive. |
| **Spending interactions on UI state** | Dropdowns/tabs/sliders with authored transitions are what separate "finished" from "assembled". |
| **Three-radius system (20 / 62 / 50%)** | Cards / pills / badges. Unambiguous, easy to apply. |

### Skip

- `ease` on 217 of 219 interactions. Replace with `outQuart` or the site's own custom bézier `cubic-bezier(0.702, 0.311, 0.292, 0.983)`, which is already defined and much better.
- 100 `SCROLL_INTO_VIEW` triggers is over-animation — everything moving means nothing stands out. Reserve entrance motion for section heads and cards, let body copy just appear.
