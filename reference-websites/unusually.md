# Unusually — Design Teardown

> `https://unusually.webflow.io/` · Webflow + GSAP · Branding-studio positioning
> Source in `reference-websites/unusually/`

---

## 1. Design language in one line

**Ultra-condensed display brutalism inside a floating rounded frame.** Impact-scale caps, a monospace counter-voice, a fully token-driven system (129 CSS variables), and the strongest single structural idea in the reference set: **the page floats inside a rounded window with a light gutter around it.**

Of the five, this is the most **systematic** — the design system is complete and self-consistent, which makes it the best one to clone wholesale.

---

## 2. Design tokens

### Colour

| Token | Value | Role |
|---|---|---|
| `--background-color--primary-background` | `#f4f4f4` | **The gutter** — the page's outermost surface |
| `--background-color--secondary-background` | `#0e0e0e` | The floating frame's interior |
| `--primary-color--black` | `#0e0e0e` | Display type on light |
| `--primary-color--dark` | `#1d1d1d` | Elevated dark surfaces |
| `--primary-color--white` | `#ffffff` | Display type on dark |
| `--primary-color--grey` | `#646464` | De-emphasised headline words |
| `--neutral-color--primary-neutral` | `#8d8d8d` | Body |
| `--neutral-color--secondary-neutral` | `#acacac` | Meta |
| `--neutral-color--tertiary-neutral` | `#e6e6e6` | Hairlines on light |
| `--background-color--background-25` | `#70707040` | 25% scrim |
| `--background-color--background-50` | `#70707080` | 50% scrim |
| `--border-color--primary-border` | `#ffffff1a` | 10% white hairline on dark |
| `--border-color--light-10` | `#ffffff1a` | Same, aliased |
| `--border-color--transparent` | `#00000000` | — |

**Zero chromatic accent.** Pure achromatic system. The `#2d40ea` blue found in the CSS is Webflow chrome, not design. Colour discipline is total, which is exactly why the photography and video pop.

Note the **alpha-token layer** (`…-25`, `…-50`, `#ffffff1a`) — scrims and hairlines are first-class tokens, not ad-hoc rgba values. That is the mark of a mature system.

### Typography — a three-voice system

| Token | Value | Voice |
|---|---|---|
| `--_typography---font-family--primary` | `"Mona Sans Narrow", Impact, sans-serif` | **Display** — all headings |
| `--_typography---font-family--secondary` | `"Mona Sans", Arial, sans-serif` | **Body** |
| `--_typography---font-family--tertiary` | `"DM Mono", Arial, sans-serif` | **Meta / eyebrows / labels** |

The narrow/normal pairing of the *same superfamily* plus a mono counter-voice is a genuinely sophisticated choice — you get extreme display contrast without a clashing second typeface.

Heading tokens are fully decomposed (family / size / weight / line-height / letter-spacing per level):

| Level | Size | Line height | Tracking | Weight |
|---|---|---|---|---|
| h1 | `12rem` (192px) | `100%` | `.1rem` | 700 |
| h2 | `10rem` (160px) | `100%` | `.1rem` | 700 |
| h3 | `8rem` (128px) | `100%` | `.1rem` | 700 |
| h4 | `4rem` (64px) | `100%` | `.1rem` | 700 |
| h5 | `2rem` (32px) | `100%` | `.025rem` | 700 |
| h6 | `1rem` (16px) | `100%` | `.025rem` | 700 |

**Every heading is `line-height: 100%` with *positive* tracking.** That is the opposite of the usual advice, and it only works because Mona Sans Narrow is so condensed that tight leading reads as a solid typographic block while the letter-spacing keeps the caps from colliding. Steal the combination, not one half of it.

Weights run the full `100 / 200 / 300 / 400 / 500 / 600 / 700 / 800 / 900`.

### Spacing — a complete `rem` scale

```
tiny .125 · xxsmall .25 · xsmall .5 · small 1 · medium 2 · large 3
xlarge 4 · xxlarge 5 · huge 6 · xhuge 8 · xxhuge 10       (rem)
```

### Radii — a complete scale

```
tiny .125 · xxsmall .25 · small .5 · medium .75 · large 1 · xlarge 1.25
xxlarge 1.5 · huge 1.75 · xhuge 2 · xxhuge 2.5 · 100%      (rem)
```

Most-used: `xlarge` (17), `large` (12), `100%` (10), `100px` (8), `xhuge` (8).

---

## 3. Section-by-section anatomy

Section classes: `section-home-partner`, `section-home-intro`, `section-home-projects`, `section-home-why-us`, `section-home-service`, `section-home-testimonial`, `section-home-pricing`, `section-home-faq`, `call-to-action`.

1. **The frame** — `body` is `#f4f4f4`; all content sits inside a rounded dark container with a visible gutter on all sides. Everything else in the design descends from this one decision.
2. **Floating pill nav** — dark rounded bar detached from the top edge. Each nav item is its own pill; the active one is filled. Hamburger sits in a circle at the right. Logo is `UNUSUALLY®` with the ® as a superscript, followed by a vertical rule and `BRANDING STUDIO` in DM Mono at ~11px with wide tracking.
3. **Hero** — full-bleed dark video, `UNUSUALLY` set edge-to-edge in Mona Sans Narrow (effectively 12rem+), a small `®` centred above, `Designing Your Digital World` beneath in Mona Sans, and four circular social buttons pinned to the bottom corners and thirds.
4. **Partner strip** — logo marquee.
5. **Intro statement** — the standout. `WE DESIGN DIGITAL EXPERIENCES THAT EMPOWER ▮▮▮▮ BRANDS TO STAND OUT` where words transition **grey `#646464` → black `#0e0e0e` word-by-word as you scroll**, and one word is replaced by an inline **barcode/stripe texture block**. Left column carries a rotating asterisk + DM Mono ticker: `DESIGN — DRIVEN BY DES…`.
6. **Projects** — cursor-trailing image reveal (see below).
7. **Why us / Services / Testimonial / Pricing / FAQ / CTA.**

---

## 4. Animation inventory

**Engine: Webflow IX2 (dominant) + GSAP 3.15 with SplitText and ScrollTrigger.** No Lenis — native scroll.

### The signature: cursor-trailing image trail

```js
$(".gsap-component").each(function () {
  let visualWrap = $(this).find(".gsap-wrapper");
  let template   = $(this).find(".gsap-image-wrap");
  let cmsItem    = $(this).find(".gsap-image-item");
  let activeItem = cmsItem.first();

  function getNextUrl() {
    activeItem = activeItem.next();
    if (activeItem.length === 0) activeItem = cmsItem.first();
    return activeItem.find("img").attr("src");
  }

  let xPosition = 0, yPosition = 0;

  $(this).on("mousemove", function (e) {
    // throttle by distance, not by time — the key idea
    if (Math.abs(xPosition - e.pageX) > 100 || Math.abs(yPosition - e.pageY) > 100) {
      xPosition = e.pageX; yPosition = e.pageY;

      let imageWrap = template.clone().appendTo(visualWrap);
      imageWrap.find("img").attr("src", getNextUrl());

      let tl = gsap.timeline({ onComplete: () => imageWrap.remove() });
      tl.set(imageWrap, { x: xPosition, y: yPosition - window.scrollY });
      tl.fromTo(imageWrap, { opacity: 0, scale: 0.5 },
                           { opacity: 1, scale: 1, ease: "power3.out" });
      tl.to(imageWrap.find("img"), { opacity: 0, y: "8rem", duration: 0.5 });
    }
  });
});
```

Three things make it good: **distance-based throttling** (100px) rather than time-based, so trail density is independent of cursor speed; **clone-animate-destroy** so the DOM never accumulates; and the **CMS list cycling** so images loop through real content.

### IX2 layer

| Trigger | Count | | Action | Count |
|---|---|---|---|---|
| `MOUSE_OVER` | 82 | | `TRANSFORM_MOVE` | 98 |
| `MOUSE_OUT` | 82 | | `TRANSFORM_ROTATE` | 36 |
| `PAGE_START` | 19 | | `TRANSFORM_SCALE` | 15 |
| `MOUSE_CLICK` | 7 | | `STYLE_TEXT_COLOR` | 12 |
| `SCROLL_INTO_VIEW` | 5 | | `STYLE_OPACITY` | 9 |
| `PAGE_SCROLL` | 5 | | `STYLE_SIZE` | 9 |
| `MOUSE_MOVE` | 4 | | `GENERAL_DISPLAY` | 6 |

**This is a hover-driven site, not a scroll-driven one.** 164 mouse enter/leave events versus 5 scroll-into-view — the exact inverse of Ritovex. Motion rewards *exploration* rather than *scrolling*.

**Easings** — `inOutQuint` (28), `outCubic` (27), **`swingTo` (16)**, `ease` (12), **`swingFromTo` (8)**, `outQuart` (5), `easeOut` (3), `inOutQuart` (2), `inOutQuad` (2).

The `swingTo` / `swingFromTo` family is a slight-overshoot easing — that tiny elastic snap on hover is a big part of the site's character.

**Durations (ms)** — `500` (102), `1000` (28), `0` (15), `600` (8), `350` (7), `800` (6), `750` (4), `1600` (4), `3000` (4), and `8000 / 20000 / 60000` for marquees.

Also present: `TRANSFORM_ROTATE` × 36 — the perpetually rotating asterisk/badge motif.

---

## 5. Tech stack

| Layer | Tech |
|---|---|
| Platform | Webflow |
| CSS | 204 KB — largest of the five (129 custom properties) |
| Motion | Webflow IX2 (primary) + GSAP 3.15 + SplitText + ScrollTrigger |
| Smooth scroll | None (native) |
| Fonts | Mona Sans, Mona Sans Narrow, DM Mono |
| Note | GSAP loaded **twice** — Webflow CDN 3.15.0 *and* jsDelivr 3.12.5. A real bug; don't copy it. |

---

## 6. What to steal for Solve Trend

| Steal | Why |
|---|---|
| **The floating rounded frame** | Single highest-leverage structural idea available. One wrapper + one radius + one gutter colour completely changes how premium a site feels. |
| **Narrow + Normal + Mono three-voice system** | Use one superfamily's narrow cut for display, regular for body, a mono for meta. Massive contrast, zero clash. |
| **`line-height: 100%` + positive tracking on display type** | The pairing is the trick. Do both or neither. |
| **Word-by-word grey→black scroll reveal** | Best "big statement" treatment in the set. Straightforward with SplitText + ScrollTrigger scrub. |
| **Alpha tokens as first-class citizens** | `--border-color--light-10: #ffffff1a` beats scattering rgba() everywhere. |
| **Distance-throttled cursor image trail** | Directly applicable to your portfolio section. |
| **Individually-pilled nav items** | Softer and more modern than underline-active nav. |
| **`swingTo` overshoot on hover** | Cheap personality. In GSAP: `back.out(1.7)`. |
| **DM Mono eyebrows with wide tracking** | Instantly signals "studio, not template". |

### Skip

- The duplicate GSAP load.
- 12rem h1 needs real responsive clamping — implement as `clamp()` rather than fixed rem.
- A fully achromatic palette is a hard sell for most clients; keep the discipline, add exactly one accent.
