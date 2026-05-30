# Hero Redesign — Design Spec

Date: 2026-05-30
Status: Approved (brainstorm)

## Goal

Rebuild the Solve Trend hero by fusing three references into one "funky but
professional" section:

- **Bungee** — centered giant wordmark + an infinite marquee of media tiles.
- **Arounda** — colored words in a line that, on hover, bloom floating tag-icons.
- **Avoora** — service-led tiles.

The hero must feel dynamic (subtle GL shader, interactive background, liquid
glass, neomorphism) while staying clean and on-brand.

## Brand system (authoritative)

- Main red: `#F03223` (logo mark uses `#EE3124`)
- Black: `#050005`
- White: `#E1E1E1`
- Warm supporting tones: amber `#F7A23B`, coral `#F26B3A`, and existing
  `--red-light #FF8A6E` / `--red-mid #FF6B4A`.
- Theme: dark (cohesive with the existing dark sections lower on the page).
- Logo assets: `Logos copy/Logos-02.svg` (white wordmark for dark backgrounds).

## Layout — Centered Monument, dark glass

Top to bottom:

1. **Glass nav pill** — reuse existing `Nav` component markup and links; restyle
   to liquid glass (translucent, blurred, subtle inner highlight). No new links,
   no renamed handlers.
2. **Wordmark** — giant centered `Solve®Trend`; the `®` is brand red `#F03223`;
   soft red glow bloom behind the text.
3. **Hover-pill subtitle** — "We unite `brand`, `websites`, `ui/ux` into one
   product." (copy confirmed, unchanged)
   - Pills are liquid glass with a colored glow:
     - `brand` → red `#F03223`
     - `websites` → amber `#F7A23B`
     - `ui/ux` → coral `#F26B3A`
   - On hover: pill color intensifies, glow blooms, and three small floating
     tag-icons fade in + nudge around the pill (Arounda effect).
4. **Neomorphic CTA** — "Start a project ↗" (soft dual-shadow raised button).
5. **Marquee service strips** — infinite auto-scrolling horizontal row at the
   bottom (Bungee-style), one tile per service.

## Component breakdown

| Component | Responsibility | Depends on |
|-----------|----------------|------------|
| `Hero.tsx` | Compose hero: background, wordmark, subtitle, CTA, marquee | shader, headline, marquee |
| `HeroHeadline.tsx` | Wordmark + hover-pill subtitle + floating icons | CSS `:has()` / hover state |
| `HeroShader.tsx` (new) | Full-bleed animated brand-tinted flow shader + subtle floating glass prisms | three.js |
| `HeroMarquee.tsx` (new) | Infinite scrolling service tiles w/ video/image + hover pause + frosted reveal | — |

Keep each file focused. The existing `HeroCanvas.tsx` (chromatic glass prisms)
is the basis for the prisms in `HeroShader.tsx`; reuse its patterns rather than
duplicating logic where practical.

### HeroShader (background)

- A single full-bleed `three.js` plane with a custom fragment shader: animated
  red/amber flow / mesh-gradient over near-black `#050005`, drifting slowly and
  reacting subtly to the mouse (lerped uniform).
- Plus a couple of subtle floating chromatic glass prisms (from existing
  `HeroCanvas` material/approach), low opacity, slow rotation.
- `prefers-reduced-motion`: freeze animation (static frame). Mobile: reduce or
  drop prisms for performance. `pointer-events: none`.

### HeroMarquee (service strips)

- Services: UI/UX, Web Development, Brand, Growth, Content.
- Tiles duplicated (2x track) for a seamless infinite horizontal loop (CSS
  transform animation).
- Each tile shows muted, looping, autoplaying media — **tasteful placeholder
  videos/images for now**, structured so real assets swap in later.
- Hover behavior:
  - Pause the marquee animation (pause on container hover).
  - Pause that tile's `<video>` (`.pause()` via React hover state).
  - Apply a frosted-glass overlay (`backdrop-filter: blur`) over the tile.
  - Reveal service number + name on the glass.
  - Brand-red glow lifts off the hovered tile (`box-shadow`).
- `prefers-reduced-motion`: no auto-scroll; static row.

## Interaction summary

- Pills: CSS-driven hover (color, glow, floating icons). Mirrors Arounda's
  `:has(.link:hover)` pattern adapted to React.
- Marquee: CSS keyframe scroll, paused on hover; per-tile video pause via JS.
- Background: rAF shader loop with mouse-lerp; cleaned up on unmount.

## Scope & constraints

- All changes confined to the hero: `Hero.tsx`, `HeroHeadline.tsx`, new
  `HeroShader.tsx`, new `HeroMarquee.tsx`, and hero-scoped additions in
  `app/globals.css`.
- Do NOT modify other page sections, rename existing variables/functions, or
  change existing functionality.
- Reuse existing tokens (`--red`, `--bg-dark`, fonts) and add new ones only as
  needed for the warm supporting tones.

## Out of scope

- Real production video/image assets (placeholders now; swap later).
- Changes to sections below the hero.
- Copywriting beyond the confirmed subtitle.

## Open questions / future

- Final service media assets and their aspect ratios.
- Whether prisms stay long-term (kept for now per request).
