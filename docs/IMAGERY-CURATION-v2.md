# Imagery v2 — final curation and wiring spec

Supersedes the placement advice in [`IMAGERY-HANDOFF-v2.md`](./IMAGERY-HANDOFF-v2.md),
which is wrong in four places (§6 below). Every decision here was signed off by
Promit across four review rounds, 2026-07-29.

Live demo of the hero strip:
<https://claude.ai/code/artifact/72cf2f2f-2e22-429e-8132-cef85ac46258>
Full 51-image curation board:
<https://claude.ai/code/artifact/0f1a4fee-6ce5-4e9b-a503-35d5ff83cd87>

---

## 1. Hero marquee — 14 tiles, labelled by discipline

**Two structural changes**, both bigger than swapping images:

1. Tiles no longer derive from `SERVICES`. A new `lib/hero-tiles.ts` holds 14
   entries so the marquee stops repeating itself twice per loop.
2. **Tile labels are disciplines, not offers.** The strip can now name fourteen
   specific things — App Development, Packaging Design, 3D & Visualisation —
   while the five offers stay the menu. Each tile also carries the offer it
   rolls up to. Labels below are a first pass and can be reworded freely.

| # | Label | Rolls up to | Image | Accent |
|---|---|---|---|---|
| 01 | App Development | 02 Web Design & Development | `/projects/rosemont-app.jpg` | `#E8341A` |
| 02 | UI / UX Design | 02 Web Design & Development | `/hero/05-acrylic-layers.jpg` | `#5196FD` |
| 03 | Packaging Design | 01 Brand Strategy & Identity | `/projects/avelune-packaging.jpg` | `#F2A23B` |
| 04 | Web Development | 02 Web Design & Development | `/projects/web-development-hero.jpg` *(live)* | `#1A3DE8` |
| 05 | Brand Strategy | 01 Brand Strategy & Identity | `/projects/brand-strategy-loop.mp4` *(live)* | `#E8341A` |
| 06 | Motion Graphics | 03 Motion & Video | `/hero/10-motion-figure.jpg` | `#12B5C9` |
| 07 | Product Branding | 01 Brand Strategy & Identity | `/projects/aeron-headphones.jpg` | `#5196FD` |
| 08 | eCommerce | 04 eCommerce | `/projects/ecommerce-hero.jpg` *(live)* | `#0E9F6E` |
| 09 | Video Production | 03 Motion & Video | `/hero/11-liquid-drop.jpg` | `#F2A23B` |
| 10 | Creative Direction | 01 Brand Strategy & Identity | `/hero/12-portrait-red-wash.jpg` | `#E8341A` |
| 11 | AI Automation | 05 Custom Software & AI | `/services/web-design-development.jpg` | `#12B5C9` |
| 12 | 3D & Visualisation | 03 Motion & Video | `/hero/07-glass-torus.jpg` | `#0E9F6E` |
| 13 | Art Direction | 01 Brand Strategy & Identity | `/hero/06-portrait-prism.jpg` | `#1A3DE8` |
| 14 | Content Production | 03 Motion & Video | `/hero/02-portrait-slats.jpg` | `#F2A23B` |

Tile 01 takes `priority`; everything else lazy-loads. No two neighbours share an
accent, and the three reds land at 01, 05 and 10.

### Three things to get right in the code

**The video tile keeps its override, and gains a correct poster.** `HERO_VIDEO`
stays. But today the poster is `service.imageUrl` — which for
`brand-strategy-identity` is the hand-holding-a-red-card shot, an unrelated
image. `/projects/brand-strategy-poster.jpg` already exists, *is* the chess
frame, and is already 9:16. Point the tile at it. This also decouples the tile
from the service card, so the card can take the new embossed image without the
two fighting.

**Six tiles need a 9:16 crop.** Every project and service image is 4:3;
hero tiles are 9:16, so a centre crop costs 58% of the width. Verified per
image: Aeron headphones survive it (subject dead centre), Avelune packaging
loses a bottle and a carton but still reads, the glass panels survive it. The
Meridian laptop does **not** — it keeps the middle third of the screen and stops
reading as a laptop, which is why it was dropped from the hero. Tiles 04, 08 and
11 are already cropped this way on the live site.

**`08-hands-swatches` is out of the hero** but wanted for branding surfaces —
it's the one image showing craft being done. Placement still open.

---

## 2. Services — 2 swaps, 3 held

| Slug | `imageUrl` | Decision |
|---|---|---|
| `brand-strategy-identity` | → `/services/brand-strategy-identity.jpg` | **Swap.** Live one is a portrait crop in a 4:3 slot and carries an invented 'IS' mark anyway. |
| `web-design-development` | `/projects/web-development-hero.jpg` | **Hold.** The laptop mockup says web development; the glass panels don't. |
| `motion-video` | → `/services/motion-video.jpg` | **Swap.** Live file is a video poster frame — near-black with clipped type. |
| `ecommerce` | `/projects/ecommerce-hero.jpg` | **Hold.** |
| `custom-software-ai` | `/services/custom-software-ai.jpg` | **Hold.** A real product UI says "we build software" better than an abstract. |

> **Copy hazard.** `public/services/custom-software-ai.jpg` (live) and
> `website content/Services section images/custom-software-ai.jpg` (new) are
> **different images with the same filename** — md5 `7a4a4164…` vs `1e97f679…`.
> The handoff's `cp "…/Services section images/"*.jpg public/services/` would
> silently destroy the live one. Copy the services folder file-by-file, or copy
> the new one under a different name.

**No `imageWideUrl` field.** The handoff (§2) says the five 16:9 images were shot
with left-third negative space for a detail-page headline overlay. That slot
does not exist: `app/services/[slug]/page.tsx:143` renders the image in an
`aspect-[4/3]` panel *beside* the copy, not behind it. The five wide images are
parked unless that section is redesigned.

**Because `custom-software-ai` holds, no molecule ships anywhere.** All four
near-identical glass-lattice renders come out: `16-node-cluster`,
`custom-software-ai.jpg` (new), `custom-software-ai-wide.jpg`,
`capability-ai-automation.jpg`.

---

## 3. Projects

**Case studies — `lib/portfolio.ts`**

| slug | image |
|---|---|
| `brand-strategy` | `/projects/brand-strategy-still.jpg` |
| `brand-identity` | `/projects/brand-identity-hero.jpg` — the hand/red-card shot, relocated here from the service card |
| `web-development` | `/projects/capability-web-development.jpg` |
| `motion-graphics` | `/projects/motion-still.jpg` |

Page header: `capability-brand-design.jpg` — the teal ink bloom. Note it is
**teal**, not the `#ED649E` pink the handoff files it as, and it does not belong
on the amber `brand-identity` card the handoff suggests.

**Homepage capability strip — `lib/project-showcase.ts`**
Only `web-development` is settled: `/projects/web-development.png` (1.5 MB) →
`capability-web-development.jpg`. The `ecommerce` card still carries a 1.8 MB
PNG; replacement not yet chosen.

---

## 4. Cut — and why

**Hero folder (9 of 16):** `01-strategy-cards`, `03-light-ribbon`, `04-lens-glow`,
`09-chrome-mesh`, `13-paper-fold`, `14-desk-overhead`, `15-caustics`,
`16-node-cluster` cut outright; `08-hands-swatches` moved to branding surfaces.

**Device mockups:** `web-development-still`, `ai-automation-still`,
`avelune-app`, `aeron-app` — floating devices on gradients, the textbook
generated mockup. `meridian-app` and `meridian-exterior` also out
(architecture stock with no branding in frame).

**Quantiva — all three.** `imagery-manifest-v2.json` records it plainly:
*"Quantiva Consulting — real prior client"*. Three fabricated deliverables carry
that wordmark in legible gold. Same class of problem as the invented
testimonials in [`SITE-PLAN.md`](./SITE-PLAN.md) §1.1, and worse because the
name is checkable. Cut, or replace with real Quantiva work.

---

## 5. Still open

1. `08-hands-swatches` — which branding surface.
2. `ecommerce-still` (two phones on lilac) — Promit wants it used; no home yet.
3. The `ecommerce` capability-strip card still on a 1.8 MB PNG.
4. The concept-work gallery for the surviving Avelune / Aeron / Rosemont images
   not used in the hero — framing still needs sign-off. **No invented client
   outcomes or metrics for fictional brands** without explicit approval.
5. `components/VisionExpertiseSection.tsx` — built, never imported, and it
   hotlinks 12 images from a competitor's Webflow CDN. Deferred by Promit.

---

## 6. Where the handoff doc is wrong

1. **"No readable text/logos anywhere"** — false. All 19 brand mockups carry
   legible wordmarks (AERON, AVELUNE, MERIDIAN, ROSEMONT, QUANTIVA). By design
   for a mockup set, but it means the verification claim can't be relied on, and
   it settles that these can never be used as neutral texture.
2. **The Quantiva set** uses a real client's name on fabricated work (§4).
3. **G03's accent** is filed as pink `#ED649E`; the image is teal (§3).
4. **`imageWideUrl` for a detail-page headline overlay** — no such slot (§2).

Plus one the handoff couldn't have known: the deployed site is behind the repo.
Screenshots of the live hero show the old eight-discipline labels ("Brand
Identity", "Web Development"); local `lib/services.ts` has been on five offers
since the 8→5 consolidation.

---

## 7. Mechanics

Copy everything including the cuts, so the inventory stays intact on disk —
**except** `services/custom-software-ai.jpg`, per §2. Every new path goes through
`asset()` from `lib/asset.ts`.

Verify: `npm run build:pages`, then
`grep -r 'src="/\(hero\|services\|projects\)/' out/` — any bare match without the
basePath is a bug. Render in real headless Chromium, not the in-app preview pane
(it truncates oversized stylesheets and silently drops images).
