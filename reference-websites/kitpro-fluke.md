# Fluke (KitPro) — Design Teardown

> `https://kitpro-fluke.webflow.io/` · Webflow + heavy custom GSAP · Creative-studio positioning
> Source in `reference-websites/kitpro-fluke/`

---

## 1. Design language in one line

**Swiss editorial brutalism, executed with restraint.** Pure monochrome, one violent red, one typeface at enormous sizes, near-zero decoration — all the personality comes from *scale contrast* and *motion*, not from colour or ornament.

This is the most **technically sophisticated** of the five and the closest to a real award-winning studio site. It is also the hardest to reproduce, because its quality lives almost entirely in timing.

---

## 2. Design tokens

### Colour

| Token | Value | Role |
|---|---|---|
| `--almost-black` | `#111111` | Primary text, dark surfaces |
| `--black` | `#000000` | Absolute contrast, rare |
| `--white` | `#ffffff` | Canvas |
| `--whitesmoke` | `#f5f5f5` | Alternating section surface |
| `--red` | `#c82a2a` | **Full-bleed section takeover** |
| `--dark-grey` | `#5d5d5d` | Secondary copy |
| `--grey` | `#9f9f9f` | Tertiary / disabled |
| `--light-grey` | `#d1d1d1` | Hairlines, ghosted display type |
| `--transparent` | `#3330` | — |

The red is not an *accent* — it is a **mode**. An entire viewport-height section flips to `#c82a2a` with white type. That's the whole colour strategy: 95% greyscale, 5% total immersion.

### Typography

Family: **Inter Tight** — one family, 34 declarations, zero pairing.

The scale is almost entirely **viewport-relative**, which is what makes the layout feel like a poster at every window size:

| Value | Uses | Role |
|---|---|---|
| `8vw` | 3 | Hero display |
| `3.5vw` | 4 | Section headline |
| `2.5vw` | 4 | Sub-headline |
| `2vw` | 12 | Large body / list items |
| `1.5vw` | 9 | Body |
| `1.4 / 1.3 / 1.2 / 1.15vw` | 14 | Meta, captions, nav |
| `1rem / 1.2rem / .9rem` | 23 | Fixed-size UI fallbacks |

Note the **hybrid strategy**: display and layout type is `vw`, interface type is `rem`. Headlines scale infinitely; buttons and labels stay legible.

### Spacing — the interesting part

Fluke defines its spacing tokens in **`vw`, not `px`**:

```
--gap-1x: 1vw
--padding-pop-first-vertical: .65vw
--padding-pop-first-horizontal: 1.2vw
--text-contact-size: 1.15vw
--text-contact-height: 1.75vw
```

It also parameterises component geometry as **runtime-tweakable variables**:

```
--block-image-radius: 0vw
--work-padding: 0vw
--work-padding-2: 0vw
--work-image-radius-2: 0vw
--work-padding-3: 0vw
--work-image-radius-3: 0vw
--single-slider-padding: 0vw
```

These are all `0vw` at rest and are **animated by IX2 via `PLUGIN_VARIABLE` (12 uses)** — i.e. scroll position drives a CSS variable, and the variable drives padding and corner radius simultaneously across many elements. That's the trick behind the "image un-crops itself as you scroll" effect. It's the single cleverest technique in the whole reference set.

### Radii

`1vw` (7), `.5vw` (5), `1.4vw` (4), `999px` (5), `50%` (3), `0` (4). Viewport-relative radii again — corners get rounder on bigger screens.

---

## 3. Section-by-section anatomy

Section classes are explicit and clean: `header-section var-1`, `main-section hero`, `main-section about`, `main-section initial-work`, `section-spacer`, `main-section work`, `main-section why-us`, `main-section testimonial`, `main-section footer`.

1. **Header** — logo left, four flat text links spread across the full width (no pill, no box). Maximum airiness.
2. **Hero** — the signature. `Design ✳ that` where `Design` is solid `#111`, `that` is ghosted `#d1d1d1`, and between them sits a **pill-shaped inline container holding a rotating asterisk glyph**. Right-aligned two-line studio descriptor at ~1.2vw. Words are on separate lines at 8vw.
3. **About** — full-bleed `#c82a2a` red takeover. White 3.5vw statement with an inline red arrow glyph mid-sentence. A stack of `.project-card`s animates in a **diagonal loop**.
4. **Initial work / Work** — image blocks whose padding and radius are scroll-driven via CSS variables.
5. **Why us** — `.why-us-card` grid with GSAP number counters.
6. **Testimonial** → **Footer**.

---

## 4. Animation inventory

**Engine: GSAP 3.15 + Lenis 1.3.1 + Webflow IX2 running together.** This is the full professional stack.

### Libraries loaded

```
gsap.min.js          ScrollTrigger.min.js    SplitText.min.js
Flip.min.js          CustomEase.min.js       CustomWiggle.min.js
CustomBounce.min.js  EasePack.min.js
lenis@1.3.1
```

`gsap.registerPlugin(Flip, ScrollTrigger, SplitText, CustomEase, CustomWiggle, CustomBounce, EasePack)`

### The initialisation pattern — copy this exactly

```js
let lenis;
const initScroll = () => {
  lenis = new Lenis({});
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
};

function initGsapGlobal() {
  initScroll();
  const sendGsapEvent = () => {
    window.dispatchEvent(new CustomEvent("GSAPReady", { detail: { lenis } }));
  };
  // gate every animation on fonts being ready — kills layout shift in SplitText
  if (document.fonts.status === "loaded") sendGsapEvent();
  else document.fonts.ready.then(sendGsapEvent);

  // debounced refresh, plus ResizeObserver on body for content-driven height changes
  let resizeTimeout;
  const onResize = () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => ScrollTrigger.refresh(), 50);
  };
  window.addEventListener("resize", onResize);
  new ResizeObserver(onResize).observe(document.body);

  // FOUC guard: everything marked hidden fades in once the engine is live
  queueMicrotask(() => {
    gsap.to("[data-start='hidden']", { autoAlpha: 1, duration: 0.1, delay: 0.2 });
  });
}
```

Four production details worth internalising:

- **Lenis drives ScrollTrigger, and GSAP's ticker drives Lenis.** One clock, no jitter.
- **`lagSmoothing(0)`** — never skip frames to catch up; visual consistency over wall-clock accuracy.
- **Font-gated start** — SplitText before fonts load produces broken line breaks. This eliminates it.
- **`ResizeObserver` on `document.body`**, not just `window.resize` — catches height changes from CMS/filter/grid-list toggles that `resize` misses.

### Diagonal card loop

```js
gsap.set(items, { zIndex: (i) => items.length - i, opacity: 0, scale: 0.8 });

function diagonalLoop(items) {
  let current = 0;
  const update = () => {
    for (let i = 0; i < items.length; i++) {
      const item = items[(current + i) % items.length];
      gsap.to(item, {
        x: 30 * i,
        y: -30 * i * 1.5,          // upward diagonal
        zIndex: items.length - i,
        scale: 1, opacity: 1, duration: 0.6
      });
    }
  };
  update();
  setInterval(() => { current = (current + 1) % items.length; update(); }, 2000);
}

ScrollTrigger.create({
  trigger: ".about-scroll-trigger", start: "top 80%", once: true,
  onEnter: () => window.innerWidth <= 428 ? straightLoop(items) : diagonalLoop(items)
});
```

Mobile gets a vertical-only variant. **The responsive branch happens inside `onEnter`, not in CSS.**

### Counter

```js
gsap.fromTo(counter, { innerText: 0 }, {
  innerText: finalValue, duration: 2,
  ease: "power1.out", snap: { innerText: 1 }
});
```

`snap: { innerText: 1 }` is what keeps integers integral. Triggered per-card at `top 80%`, `once: true`.

### IX2 layer (running alongside GSAP)

| Trigger | Count | | Action | Count |
|---|---|---|---|---|
| `MOUSE_OVER` | 15 | | `TRANSFORM_MOVE` | 56 |
| `MOUSE_OUT` | 14 | | `STYLE_OPACITY` | 35 |
| `MOUSE_CLICK` | 14 | | `STYLE_SIZE` | 15 |
| `SCROLL_INTO_VIEW` | 11 | | `GENERAL_DISPLAY` | 13 |
| `SCROLLING_IN_VIEW` | 8 | | **`PLUGIN_VARIABLE`** | **12** |
| `SCROLL_OUT_OF_VIEW` | 6 | | `STYLE_BACKGROUND_COLOR` | 7 |

**Easings** — `outQuint` (34), `inOutQuint` (18), `outQuad` (8), `outCubic` (2), `inCubic` (2), `bouncePast` (2).
**Durations (ms)** — `500` (76), `0` (25), `1500` (20), `1000` (17), `100` (8), `700`, `2000`, `2600`.

Note the contrast with Ritovex: Fluke reaches for **quint** easings, which are much sharper than `ease`. `outQuint` is the single biggest reason this site feels premium.

---

## 5. Tech stack

| Layer | Tech |
|---|---|
| Platform | Webflow (KitPro template system) |
| CSS | 86 KB **minified** — smallest of the five, despite most complex site |
| Smooth scroll | Lenis 1.3.1 |
| Motion | GSAP 3.15 + 7 plugins, plus IX2 |
| Fonts | Inter Tight + Material Icons, via Google WebFont Loader |
| Extras | `document.fonts.ready` gating, `ResizeObserver`, `gsap.matchMedia` (present but commented out) |

---

## 6. What to steal for Solve Trend

| Steal | Why |
|---|---|
| **The whole GSAP + Lenis init block** | This is a solved problem. Copy it once, reuse on every client site. Your stack already has `gsap`, `@gsap/react`, and `lenis` installed. |
| **`PLUGIN_VARIABLE` pattern → CSS custom property animation** | Animate `--work-padding` / `--image-radius` on scroll and let CSS cascade it to many elements. Enormous effect-to-code ratio. |
| **`vw`-based type + spacing tokens** | One breakpoint's worth of work produces a layout that's poster-perfect at every width. |
| **Ghosted / solid two-tone headline** | `Design` solid, `that` at `#d1d1d1`. Zero cost, instantly editorial. |
| **Inline pill container inside a headline** | Break a sentence with a pill holding a glyph, image, or rotating word. Signature move. |
| **Full-bleed colour takeover section** | Better than sprinkling accent colour. Commit to one immersive band. |
| **`outQuint` as house easing** | Swap `ease` for `outQuint` / `power4.out` and everything immediately feels more expensive. |
| **Font-gated animation start** | Fixes the SplitText flash-of-broken-text bug you will otherwise hit. |

### Skip

- CustomWiggle / CustomBounce / Flip are loaded but barely used — don't ship 4 plugins you don't need.
- `setInterval` for the card loop should be a GSAP timeline with `repeat: -1` so it pauses correctly when off-screen.
