# Imagery Handoff — v2 generation set → live site

**For: Claude Code, working in `/Users/promitdas/Documents/Claude/solve-trend`**
**From: Cowork session, 2026-07-29**

All 51 images in `docs/imagery-manifest-v2.json` are generated, reviewed, and saved. Every one was checked for: no readable text/logos anywhere, no real third-party trademarks, correct dominant accent hue, and consistency with the site's restrained studio-object / cinematic-editorial aesthetic. Verified against the manifest programmatically — 51/51 files present on disk.

They currently live in a **staging folder**, not in `public/`, so nothing on the live site has changed yet:

```
website content/Hero section images/       (16 files)
website content/Services section images/   (10 files)
website content/Projects images/           (25 files)
```

This doc is the wiring plan: what to copy where, what code to touch, and one open decision that needs a call before the biggest chunk (the 19 brand-mockup images) can go live.

---

## 1. Hero — 16 tiles → new `lib/hero-tiles.ts`

**Status quo:** `components/HeroMarquee.tsx` currently derives its strip from `SERVICES` (5 tiles), so the marquee repeats itself twice per loop. This has been a known gap — see `docs/IMAGERY.md` §5 item 1, written before these images existed.

**Do this:**

1. Copy all 16 files from `website content/Hero section images/` → `public/hero/`, keeping the manifest's own filenames (`01-strategy-cards.jpg` … `16-node-cluster.jpg`).
2. Create `lib/hero-tiles.ts` exporting 16 entries — pull `img`, `accent` straight from the table below; `num` = `01`–`16`; `name` = a short label per tile (strategy cards, portrait/slats, light ribbon, lens glow, acrylic layers, portrait/prism, glass torus, hands/swatches, chrome mesh, motion figure, liquid drop, portrait/red wash, paper fold, desk overhead, caustics, node cluster).
3. Update `HeroMarquee.tsx` to map over the new 16-entry array instead of `SERVICE_TILES` built from `SERVICES`. Keep the existing `HERO_VIDEO` override (`brand-strategy-identity` → the loop `.mp4`) — it's keyed by service slug, not by tile, so it doesn't apply to hero tiles directly; decide whether any hero tile should still carry a video override or whether all 16 are now static (recommend: all static, the video loop stays on the Services section only).

| ID | File → `public/hero/` | Accent |
|---|---|---|
| H01 | `01-strategy-cards.jpg` | `#E8341A` |
| H02 | `02-portrait-slats.jpg` | `#F2A23B` |
| H03 | `03-light-ribbon.jpg` | `#ED649E` |
| H04 | `04-lens-glow.jpg` | `#764BA2` |
| H05 | `05-acrylic-layers.jpg` | `#5196FD` |
| H06 | `06-portrait-prism.jpg` | `#1A3DE8` |
| H07 | `07-glass-torus.jpg` | `#0E9F6E` |
| H08 | `08-hands-swatches.jpg` | `#F2A23B` |
| H09 | `09-chrome-mesh.jpg` | `#1A3DE8` |
| H10 | `10-motion-figure.jpg` | `#12B5C9` |
| H11 | `11-liquid-drop.jpg` | `#F2A23B` |
| H12 | `12-portrait-red-wash.jpg` | `#E8341A` |
| H13 | `13-paper-fold.jpg` | `#ED649E` |
| H14 | `14-desk-overhead.jpg` | `#764BA2` |
| H15 | `15-caustics.jpg` | `#5196FD` |
| H16 | `16-node-cluster.jpg` | `#12B5C9` |

Tiles render at ~280×500 (`.hero-strip`, `globals.css:791`) — all shot at `9:16`, so no cropping needed.

**Bonus use for the same 16 files:** `lib/vision-gallery.ts` currently points at placeholder external Webflow CDN images (`HERO_CDN`/`WORK_CDN`/`PROJECT_CDN` constants) rendered by `components/VisionExpertiseSection.tsx` in a 4-column masonry. These verticals are a natural drop-in replacement — swap the 12 external URLs for 12 of the hero files (any 12; all 16 share the same aspect and art direction) and drop the CDN constants once nothing references them.

---

## 2. Services — 5 images + 5 wide companions → `lib/services.ts`

**Status quo:** `SERVICES[].imageUrl` (5 fields, one per offer) is consumed at `4:3` by `components/Services.tsx` (both the card grid and the hover-zoom list) and by `app/services/[slug]/page.tsx`. There is no wide-image field yet — the `SW*` set below is new inventory for that gap (`docs/IMAGERY.md` §5 item 2).

**Do this:**

1. Copy 10 files from `website content/Services section images/` → `public/services/`.
2. Update the 5 `imageUrl` values in `lib/services.ts` to the new `S*` paths (same slugs, same accents already in the file — just repoint the string).
3. Add a new `imageWideUrl: string` field to the `Service` type and populate it with the `SW*` paths.
4. In `app/services/[slug]/page.tsx`, use `imageWideUrl` for the detail-page hero banner (currently reuses `imageUrl` at line ~146) — the `SW*` images were shot `16:9` with deliberate left-third negative space for a headline overlay, so this is a straight swap, not a crop.

| Slug | `imageUrl` → `public/services/` | `imageWideUrl` → `public/services/` | Accent |
|---|---|---|---|
| `brand-strategy-identity` | `brand-strategy-identity.jpg` | `brand-strategy-identity-wide.jpg` | `#E8341A` |
| `web-design-development` | `web-design-development.jpg` | `web-design-development-wide.jpg` | `#1A3DE8` |
| `motion-video` | `motion-video.jpg` | `motion-video-wide.jpg` | `#ED649E` |
| `ecommerce` | `ecommerce.jpg` | `ecommerce-wide.jpg` | `#0E9F6E` |
| `custom-software-ai` | `custom-software-ai.jpg` | `custom-software-ai-wide.jpg` | `#12B5C9` |

Note: `public/services/` currently also has `custom-software-ai-alt.jpg`, `ux-design.jpg`, `video-production.jpg` from the old 8-discipline set — those still back `lib/portfolio.ts` entries for the two legacy slugs that got merged (`video-production`, `ux-design`). Leave them; don't overwrite.

---

## 3. Capability showcase — 3 images → `lib/project-showcase.ts`

**Status quo:** `SHOWCASE_PROJECTS` (rendered wherever this powers the homepage capability strip) has 6 entries; 3 already carry real `.mp4` loops (`brand-strategy`, `web-development`... check current file) and 3 carry static stills (`brand-identity.jpg`, `web-development.png`, `ecommerce.png`) that the v2 manifest's own changelog flags as due for replacement.

**Do this:**

1. Copy `capability-web-development.jpg`, `capability-ai-automation.jpg`, `capability-brand-design.jpg` from `website content/Projects images/` → `public/projects/`.
2. These are pure abstract material/light still lifes (glass+steel lattice, glass-sphere node cluster, ink-and-paper) — deliberately reworked away from screen/UI mockups per Promit's feedback round 4, because screen mockups were reading as generic AI stock. Use them as the `media` value for whichever `SHOWCASE_PROJECTS` entries currently point at a static `.jpg`/`.png` rather than a `.mp4` (check the file — the ids to look for are `web-development`, `ai-automation`; `brand-identity` may still want its own asset, see open question below since G03 is filed as "brand design" not "brand identity" — confirm ID naming lines up with the `capability-brand-design` = Brand Strategy & Identity offer, `capability-web-development` = Web Design & Development offer, `capability-ai-automation` = Custom Software & AI Automation offer).

| ID | File → `public/projects/` | Accent | Maps to `SHOWCASE_PROJECTS` id |
|---|---|---|---|
| G01 | `capability-web-development.jpg` | `#1A3DE8` | `web-development` |
| G02 | `capability-ai-automation.jpg` | `#12B5C9` | `ai-automation` |
| G03 | `capability-brand-design.jpg` | `#ED649E` | `brand-identity` (verify — accent is pink/motion, not the amber `brand-identity` currently uses; double-check against the live component before wiring) |

**Flag:** G03's accent (`#ED649E`, Motion & Video's colour) doesn't match `brand-identity`'s current accent (`#F2A23B`, amber) in `project-showcase.ts`. Either the manifest intended G03 for a different card, or the accent needs updating alongside the image swap. Confirm with Promit before wiring this one specifically — the other two (G01, G02) are unambiguous.

---

## 4. Editorial product stills — 2 images → `lib/portfolio.ts` / `lib/project-showcase.ts`

`P01` (`brand-strategy-still.jpg`) and `P02` (`brand-identity-still.jpg`) are natural flat-lay / collateral-set photography (bound sample book, branded collateral stack) — Seedream 4.5, not device mockups. Copy to `public/projects/` and consider them for:

- `lib/portfolio.ts` → `brand-strategy` and `brand-identity` case-study entries currently point at `/projects/brand-strategy-poster.jpg` and `/projects/brand-identity-hero.jpg`. These new stills are candidates to replace or sit alongside those.
- Alternatively, use as `poster` frames on the corresponding `SHOWCASE_PROJECTS` video cards (`brand-strategy`, `brand-identity`), per the original `docs/IMAGERY.md` §5 item 3 plan.

Confirm which placement before overwriting — `portfolio.ts` and `project-showcase.ts` are two different surfaces (`/projects` case-study page vs. homepage capability strip) and both currently work; this is additive inventory, not a forced replacement.

`P03`–`P06` (web-development-still, ecommerce-still, motion-still, ai-automation-still) exist in the folder from the original device-mockup concept but were effectively superseded by the G01–G03 abstract rework for the capability strip specifically. They're still valid generic project stills if a use turns up (e.g. blog card imagery, OG images) — no forced action needed on these four.

---

## 5. Brand-mockup set — 19 images — **no consuming component exists yet**

This is the open decision. `B01`–`F03` (16 images) plus the already-integrated `G01`–`G03` make up a **5-brand, 5-industry client-work set** invented for this manifest: Avelune (skincare), Aeron (consumer tech), Rosemont (restaurant), Meridian (real estate), Quantiva (financial services — this one is named after a real prior client, Quantiva Consulting, per the manifest's own changelog, so keep that set's direction minimal/professional rather than stylised).

**Nothing in the current codebase references any of these filenames or brand names** — confirmed by grep across `lib/`, `components/`, `app/`. They were generated ahead of a feature that doesn't exist yet.

| Brand | Industry | Accent | Files (in `website content/Projects images/`) |
|---|---|---|---|
| Avelune | Skincare | `#F2A23B` | `avelune-packaging.jpg`, `avelune-signage.jpg`, `avelune-app.jpg`, `avelune-apparel.jpg` |
| Aeron | Consumer tech | `#5196FD` | `aeron-headphones.jpg`, `aeron-app.jpg`, `aeron-ad.jpg` |
| Rosemont | Restaurant | `#E8341A` | `rosemont-tabletop.jpg`, `rosemont-signage.jpg`, `rosemont-app.jpg` |
| Meridian | Real estate | `#1A3DE8` | `meridian-signage.jpg`, `meridian-app.jpg`, `meridian-exterior.jpg` |
| Quantiva | Financial services | `#0E9F6E` | `quantiva-dashboard.jpg`, `quantiva-stationery.jpg`, `quantiva-office.jpg` |

**Recommendation:** this is the right raw material for a new "Selected Work" or "Client Showcase" gallery on `app/projects/page.tsx` — a grid of 5 fictional-brand case-study cards, each with its 3–4 image set, sitting above or below the existing `PORTFOLIO_CASE_STUDIES` service-category cards. That's a real feature to design and build, not a two-line wire-up like §1–§4. Do not silently invent copy/case-study text for these — check with Promit on whether these are meant as illustrative "type of work we do" cards (safe, no copy needed beyond a category label) or need invented outcome copy (needs sign-off, since fabricated client results are a credibility risk).

Until that's decided, copy the 19 files to `public/projects/brand-mockups/` (new subfolder) so they're available in `public/` without being wired into a page — keeps `git status` clean and the images ready to go the moment the feature is scoped.

---

## 6. Mechanical steps for whoever wires this up

```bash
cd "/Users/promitdas/Documents/Claude/solve-trend"

mkdir -p public/hero public/services public/projects/brand-mockups

# Hero
cp "website content/Hero section images/"*.jpg public/hero/

# Services
cp "website content/Services section images/"*.jpg public/services/

# Capability + editorial stills (flat, top-level public/projects/)
cp "website content/Projects images/capability-"*.jpg public/projects/
cp "website content/Projects images/brand-strategy-still.jpg" public/projects/
cp "website content/Projects images/brand-identity-still.jpg" public/projects/

# Brand mockups (staged, not yet wired)
cp "website content/Projects images/avelune-"*.jpg public/projects/brand-mockups/
cp "website content/Projects images/aeron-"*.jpg public/projects/brand-mockups/
cp "website content/Projects images/rosemont-"*.jpg public/projects/brand-mockups/
cp "website content/Projects images/meridian-"*.jpg public/projects/brand-mockups/
cp "website content/Projects images/quantiva-"*.jpg public/projects/brand-mockups/
```

**Every new path must go through `asset()`** from `lib/asset.ts` when referenced as a string (bare `/hero/…`, `/services/…`, `/projects/…` refs render without the GitHub Pages basePath and 404 on the deployed subpath). `next/image` with a static string `src` still needs this — it's not automatic.

**Verify:**
1. `npm run build:pages`
2. `grep -r 'src="/\(hero\|services\|projects\)/' out/` — any bare match without the basePath prefix is a bug.
3. Load the dev server in real headless Chromium (Playwright), not the in-app preview pane — `docs/IMAGERY.md` §5 item 5 notes the preview pane freezes style recalculation, which matters if any of this touches CSS-driven layout (the hero marquee's scroll-linked transforms, for instance).

---

## 7. What's still open

1. **G03 accent mismatch** (§3) — confirm before wiring `capability-brand-design.jpg` into `project-showcase.ts`.
2. **P01/P02 destination** (§4) — `portfolio.ts` case-study images vs. `project-showcase.ts` video posters; pick one (or both).
3. **Brand-mockup feature scope** (§5) — the 19-image set needs an actual gallery built, plus a decision on whether per-brand copy is illustrative-only or needs invented case-study outcomes (flagging: fabricated results would need explicit sign-off, this isn't something to just write).
4. **Hero-tile video override** (§1) — confirm whether any of H01–H16 should carry a looping video, or all 16 stay static now that the service-level video lives on `brand-strategy-identity` alone.

Once 1–3 are answered, §1–§4 are pure mechanical wiring (copy files, repoint strings, add one type field) — no design decisions left in those sections.
