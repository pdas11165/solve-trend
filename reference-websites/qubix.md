# Qubix Studio — Design Teardown

> `https://qubix-flowdevz.webflow.io/` · Webflow + custom GSAP · Dark creative-studio positioning
> Source in `reference-websites/qubix/`

---

## 1. Design language in one line

**Pure-black gallery studio.** True `#000` canvas, scattered floating image cards that parallax and rotate under the cursor, a vivid orange used almost homeopathically, a floating pill nav carrying a live scroll-percentage readout, and enormous 128px display type.

The most **portfolio-forward** of the five — built to make the work look expensive. This is the closest reference to what a premium Solve Trend site should feel like.

---

## 2. Design tokens

189 custom properties — the most thoroughly tokenised site in the set, with a proper three-layer architecture (primitive → semantic → component).

### Colour — primitives

| Token | Value |
|---|---|
| `--_color---normal-color--black` | `black` |
| `--_color---normal-color--deep-charcoal` | `#0f0f0f` |
| `--_color---normal-color--soft-black` | `#1c1c1c` |
| `--_color---normal-color--gunmetal` | `#1d1d1d` |
| `--_color---normal-color--near-black` | `#222222` |
| `--_color---normal-color--medium-gray` | `#a1a1a1` |
| `--_color---normal-color--snow-white` | `#fdfcfc` |
| `--_color---normal-color--white` | `white` |
| `--_color---normal-color--vivid-orange` | `#fe6512` |
| `--_color---normal-color--transparent-white` | `#ffffff42` (26%) |
| `--_color---normal-color--frosted-white` | `#ffffff42` |
| `--_color---normal-color--soft-white-layer` | `#ffffff42` |

### Colour — semantic layer

```css
--_color---text-color--text-color:       var(--_color---normal-color--snow-white);
--_color---text-color--paragraph-color:  var(--_color---normal-color--medium-gray);
--_color---accent-color--accent-one:     var(--_color---normal-color--black);
```

**Five near-blacks** (`#000`, `#0f0f0f`, `#1c1c1c`, `#1d1d1d`, `#222`) is the defining move. On a dark site you cannot use shadows for elevation, so **depth is built from a ladder of almost-identical blacks** plus a 26% white frost layer for glass surfaces. This is the correct way to do dark UI and the single most transferable idea here.

Note also that body text is `#fdfcfc`, **not** `#ffffff` — pure white on pure black causes halation. Snow-white is measurably more comfortable.

Orange `#fe6512` appears on perhaps 1% of pixels. Restraint is the strategy.

### Typography

Family: **Interdisplay** (`--_base---font-family--your-font: Interdisplay, Arial, sans-serif`) — a display-optimised Inter cut with tighter spacing and refined large-size shapes. One family, 55 declarations.

Component-level type tokens (family / size / line-height / weight / tracking per level):

| Level | Size | Line height | Tracking |
|---|---|---|---|
| h1 | `128px` | `154%` | tightest |
| h2 | `58px` | `154%` | ultra |
| h3 | `44px` | `154%` | tighter (−.02em) |
| h4 | `32px` | `122%` | none |
| h5 | `24px` | `154%` | tighter |
| h6 | `20px` | `134%` | ultra |
| text-regular | `18px` | `154%` | ultra |
| text-extra-small | `16px` | `lg` | tighter |

All weight `500` (medium) — **not bold**. A 128px medium-weight display face reads as confident; the same thing at 700 reads as shouting. On dark backgrounds lighter weights are also optically correct, since light type on dark appears heavier than it is.

Line heights are unusually generous (`154%` on headings). Combined with medium weight and near-black surfaces, it produces the "gallery wall label" feel.

### Spacing

```
extra-tiny 0 · extra-small 6 · small 8 · medium 10 · 2xl 16
6xl 24 · 9xl 32 · 33xl 110                                  (px)

--_ui---container--padding: 40px
```

### Radii

A full `r-m → r-6xl` scale plus `round`. Most-used: `r-3xl` (8), `r-xl` (5), `round` (5), `r-m` (5), `r-4xl` (4), plus a literal `70px` on the largest cards.

---

## 3. Section-by-section anatomy

Section classes: `hero-section`, `home-services-section`, `home-banner-section`, `home-marquee-section`, `home-service-two`, `home-project-section`, `home-blog-section`, `form-section`.

1. **Floating pill nav** — a dark rounded bar containing a hamburger, the word `Menu`, and a **live scroll-percentage pill (`0%`)**. To the right, a `Get started` pill plus a separate circular arrow button. Detached from the top edge.
2. **Hero** — the standout. Pure `#000`. Centred `Qubix` wordmark with `Studio` beneath it in `--medium-gray`, ringed by a **dotted circle**. Around it, **five image cards scattered at different depths**, each with `r-3xl`-ish radius, that translate and rotate on mouse move. Left edge: three circular social buttons in a vertical stack. Right edge: a vertical list of service tags (`Development / Web Design / UI Design / Graphic Design / UX Design`) in pill outlines with **opacity falloff from the centre outward**, so the middle item reads as active.
3. **Services** → **Banner** → **Marquee** → **Services two** → **Projects** → **Blog** → **Form.**

---

## 4. Animation inventory

**Engine: GSAP 3.15 + ScrollTrigger + SplitText, plus a hand-rolled smooth-scroll, plus Webflow IX2.**

### Custom spring smooth-scroll (no Lenis)

```js
window.Webflow.push(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;   // a11y first
  if (typeof gsap === "undefined" || !gsap.to) return;                          // fail safe
  if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) return;            // native on mobile

  let current = window.scrollY, target = current;
  const friction = 0.08, springVibe = 0.12;

  window.addEventListener("wheel", (e) => {
    if (e.ctrlKey || e.metaKey) return;        // don't break zoom
    e.preventDefault();
    target += e.deltaY * 1.5;
    target = Math.max(0, Math.min(target, document.documentElement.scrollHeight - innerHeight));
    if (!isAnimating) update();
  }, { passive: false });

  function update() {
    const delta = target - current;
    if (Math.abs(delta) < 0.2) { current = target; scrollTo(0, current); return; }
    // lerp + a sine term — the "spring vibe"
    current += delta * friction + Math.sin(delta * 0.015) * springVibe;
    scrollTo(0, current);
    requestAnimationFrame(update);
  }
});
```

The `Math.sin(delta * 0.015) * springVibe` term adds a subtle oscillation on top of a standard lerp. It's a nice touch, but **Lenis does this better and handles far more edge cases** (touch, keyboard, anchor links, nested scroll containers). Steal the *guard clauses*, not the implementation.

The four guards at the top — reduced-motion, library-present, mobile, and modifier-key — are genuinely exemplary. Most sites ship none of them.

### Live scroll percentage

```js
const percentEl = document.querySelector(".scroll-percent");
function updateScrollPercent() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  percentEl.textContent = (scrollTop <= 0 ? 0 : Math.round((scrollTop / docHeight) * 100)) + "%";
}
window.addEventListener("scroll", () => gsap.to(percentEl, { duration: 0.2, onUpdate: updateScrollPercent }));
```

### Hover-exclusive award list

```js
gsap.set(banner, { opacity: 0, visibility: "hidden", scale: 0.9, y: 40 });

item.addEventListener("mouseenter", () => {
  items.forEach((other) => {
    if (other !== item) {
      gsap.killTweensOf(otherBanner);                    // ← prevents queue pile-up
      gsap.to(otherBanner, {
        opacity: 0, scale: 0.9, y: -30, duration: 0.4, ease: "power2.out",
        onComplete: () => { if (!other.classList.contains("active"))
                              gsap.set(otherBanner, { visibility: "hidden" }); }
      });
      gsap.to(otherTitles, { color: "#a1a1a1", duration: 0.3 });
    }
  });
  gsap.to(banner, { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: "power3.out" });
  gsap.to(titles, { color: "#FDFCFC", duration: 0.3 });
});
```

`gsap.killTweensOf()` before each new tween is the detail that keeps rapid mouse movement from producing a stuttering queue. Also note **enter and exit are asymmetric** — in at `0.6s / power3.out`, out at `0.4s / power2.out`. Arrivals are savoured, departures are quick. That asymmetry is a hallmark of good motion design.

### IX2 layer

| Trigger | Count | | Action | Count |
|---|---|---|---|---|
| `SCROLL_INTO_VIEW` | 82 | | `TRANSFORM_MOVE` | 105 |
| `MOUSE_CLICK` | 35 | | `STYLE_OPACITY` | 84 |
| `MOUSE_SECOND_CLICK` | 35 | | `TRANSFORM_ROTATE` | 45 |
| `MOUSE_OVER` | 34 | | **`STYLE_FILTER`** | **44** |
| `MOUSE_OUT` | 34 | | `TRANSFORM_SCALE` | 33 |
| `SCROLLING_IN_VIEW` | 19 | | `STYLE_BACKGROUND_COLOR` | 12 |
| `PAGE_START` | 11 | | `STYLE_TEXT_COLOR` | 9 |
| `MOUSE_MOVE` | 3 | | `GENERAL_DISPLAY` | 3 |

Two things stand out:

- **`STYLE_FILTER` × 44** — the only site making heavy use of `blur()` / `grayscale()`. Unfocused cards are blurred and desaturated; hovering restores them. That's how depth is created without shadows.
- **35 `MOUSE_CLICK` + 35 `MOUSE_SECOND_CLICK`** — 35 toggle interactions (accordions/filters), each with authored open *and* close states.
- **`SCROLLING_IN_VIEW` × 19** — the most scrubbed/parallax-linked animation of the five. Motion is tied to scroll *position*, not just crossings.

**Easings** — `outQuad` (81 — house default), `ease` (21), `outQuart` (7), `outBack` (4), `inQuad` (2), `outCirc` (1), `outBounce` (1).
**Durations (ms)** — `500` (236), `800` (41), `700` (16), `300` (14), `0` (12), `1000` (7), `150` (4), `200` (4), `250`, `1500`, `2000`, `30000`.

Custom GSAP durations run faster: `0.2` (3), `0.3` (2), `0.4`, `0.6` (2), with `power2.out` (3) and `power3.out` (2).

---

## 5. Tech stack

| Layer | Tech |
|---|---|
| Platform | Webflow |
| CSS | 182 KB, **189 custom properties** (3-layer token architecture) |
| Motion | GSAP 3.15 + ScrollTrigger + SplitText + Webflow IX2 |
| Smooth scroll | Custom wheel-lerp with spring term (desktop only) |
| Fonts | Interdisplay |
| A11y | `prefers-reduced-motion` respected; mobile opts out of custom scroll |

---

## 6. What to steal for Solve Trend

| Steal | Why |
|---|---|
| **The five-near-black elevation ladder** | `#000 / #0f0f0f / #1c1c1c / #1d1d1d / #222`. This is *the* correct way to do dark UI. Depth without shadows. |
| **`#fdfcfc` not `#ffffff` for body text on dark** | Eliminates halation. One-character change, real comfort gain. |
| **26% white frost (`#ffffff42`) as a surface token** | Glass cards, hairlines, and overlays all derive from one token. |
| **3-layer token architecture** | primitive → semantic → component. Re-theming becomes a one-file change. This is how you make a system reusable across clients. |
| **`STYLE_FILTER` for depth** | `blur()` + `grayscale()` on unfocused items, restored on hover. Best depth cue available on black. |
| **Medium (500) weight at 128px** | Confident, not shouty. Correct optical weight on dark. |
| **Asymmetric hover timing** | In `0.6s / power3.out`, out `0.4s / power2.out`. |
| **`gsap.killTweensOf()` before every hover tween** | Prevents queue pile-up on fast cursor movement. Non-obvious, essential. |
| **The four guard clauses** | reduced-motion → library-present → mobile → modifier-key. Ship these on every site you build. |
| **Live scroll-% in the nav** | Tiny detail, disproportionate "someone built this" signal. |
| **Cursor-parallax scattered card hero** | Directly applicable to a Solve Trend portfolio hero. |

### Skip

- The hand-rolled smooth-scroll. Use **Lenis** — you already have it installed. Keep Qubix's guard clauses, discard its scroll maths.
- `gsap.to(el, { duration: 0.2, onUpdate })` as a throttle for the scroll-% readout is a misuse of tweening. Use `requestAnimationFrame` or ScrollTrigger's `onUpdate`.
- 128px h1 needs `clamp()`; as a fixed px value it will overflow on tablets.
