# Solve Trend — Imagery System

Reference analysis, art direction, and the full generation prompt set for the
Hero, Projects, and Services surfaces.

Machine-readable companion: [`imagery-manifest.json`](./imagery-manifest.json).

---

## 1. What the reference sites actually use

Analysed by pulling every raster asset off the 11 saved reference pages in
`~/Downloads/solveCursor/reference websites/` (469 URLs → 328 downloaded →
contact-sheeted and reviewed visually). Three distinct image families emerged,
and each site commits hard to one of them.

### Family A — Editorial / cinematic art
*Vertora, Vetora service page, Idotive, Avoora*

The dominant look on the sites whose vibe is closest to what Solve Trend wants.
Characteristics, consistently:

- **One saturated colour owns the frame.** Not a palette — a single hue washing
  the whole image (crimson, cobalt, amber, teal) with the subject lit into it.
- **Hard gel lighting with a defined shape.** Slatted blind shadows across a
  face, a horizontal light bar over the eyes, a rim of coloured light on a jaw.
- **Objects photographed like they matter.** A translucent blue chair alone on a
  blue seamless. A dropper bottle half-submerged with palm shadow and water
  ripple. Stacked pool floats on a flat sea horizon. Macarons with one raking
  light. These are *product photography grammar applied to non-products*.
- **Chrome / glass / iridescent sculpture on a pedestal.** Avoora runs a whole
  set of these — a glass torus, a stacked capsule form, a liquid-metal hand — on
  a bone-white or pale-grey studio sweep with one long soft shadow.
- **Prism and refraction.** Rainbow light streaks bent across a dark surface,
  spectral flares over a portrait.
- **Motion as blur.** A running figure smeared over an orange ground, a
  long-exposure figure inside a ring of light.

What it buys you: the page looks expensive and art-directed. What it costs: it
says nothing literal about the service. It is mood, not proof.

### Family B — Device & product mockups
*Arounda, Awake, Qubix*

The "here is the work" family. Also very consistent:

- **MacBook Pro at a 3/4 angle on a dark textured surface**, screen showing a
  real dashboard UI, one cool key light. Arounda has ~15 near-identical
  variations of exactly this — it is their whole portfolio grammar.
- **A pair of iPhones, overlapped, floating, on a loud flat colour** (acid
  green, deep blue). Screens show an app in use.
- **A floating browser window** with soft drop shadow on a light gradient — no
  device chrome, just the page, tilted slightly.
- **Laptop-on-desk with hands in frame** — Awake uses this to make the work feel
  in-use rather than staged.
- **Photographed work context**: a designer's hands on a colour swatch fan, a
  photographer with a camera, cosmetics on a plinth (Qubix).

What it buys you: credibility and specificity. What it costs: it's the most
generic look on the internet if the UI on screen isn't yours.

### Family C — Supporting portraiture & UI chrome
*All sites*

- Circular team headshots on flat pastel/neutral backdrops (Arounda, Bungee).
- Square testimonial headshots, warm, mid-shot, one colour backdrop (Avoora,
  Bungee) — note these are clearly AI-generated on Bungee and Avoora.
- Blurred iridescent gradient blobs used as blog-card fallbacks.
- Flat 3D soft-body icons (Idotive's orange blobby cross) for service tiles.

---

## 2. Art direction for Solve Trend

The references don't force a choice — they show that **different surfaces want
different families**, and the good sites mix them by surface rather than
blending them within one surface. Vetora uses Family A for services and Family B
nowhere; Arounda uses Family B for projects and Family A nowhere. Solve Trend
has both surfaces, so:

| Surface | Family | Rationale |
| --- | --- | --- |
| **Hero** | A (editorial) | The brief is "more elegant". Mood over literalism above the fold. |
| **Services** | A, one accent per offer | Vetora's exact pattern. Each offer already owns an accent in `lib/services.ts` — the image inherits it, so the section reads as a colour-coded set. |
| **Projects** | B (device mockups) | This is the showcase. It has to look like delivered work, not mood. |
| **Chrome accents** | §3.5, from the Higgsfield contest reference | Decorative 3D objects layered *over* the above, for the "fun and interactive" pass. |

**The unifying spine**, applied to every prompt so all 42 read as one system:

> medium-format editorial photography, single soft key light with controlled
> falloff, deep shadow retention, subtle matte film grain, shallow depth of
> field, no text, no lettering, no logos, no watermarks, no UI copy

Anything that breaks that spine (hard flash, HDR, busy backgrounds, stock-photo
smiling) is off-system.

**Accent colours** (from `lib/services.ts` — the single source of truth):

Consolidated to five offers on 2026-07-28 (see the header comment in
`lib/services.ts` for the reference-site evidence). These same five accents also
drive the dark-section marquee, one word per offer.

| # | Offer | Accent | Marquee word |
| --- | --- | --- | --- |
| 01 | Brand Strategy & Identity | `#E8341A` | Brand |
| 02 | Web Design & Development | `#1A3DE8` | Web |
| 03 | Motion & Video | `#ED649E` | Motion |
| 04 | eCommerce | `#0E9F6E` | eCommerce |
| 05 | Custom Software & AI Automation | `#12B5C9` | AI |

The retired accents (`#F2A23B` amber, `#764BA2` violet, `#5196FD` light blue)
still appear across the 16 hero tiles, which deliberately range wider than the
service palette.

---

## 3. Prompt set

42 images. Every prompt below is the literal `prompt` string to pass to
`generate_image`. Model settings are in §4.

### 3.1 Hero — 16 tiles, `9:16`

The hero strip renders portrait tiles at ~280×500 (`.hero-strip`, globals.css
:791). Today all 8 tiles reuse the service images, so the marquee visibly
repeats on its second half. 16 distinct tiles kills the repeat and gives the
orbit real variety.

Sequenced **object, human, object, human…** so the wave alternates in weight.

| ID | File | Prompt |
| --- | --- | --- |
| H01 | `hero/01-strategy-cards.jpg` | Eight overlapping matte card stock rectangles suspended mid-air in a shallow arc, deep crimson `#E8341A` seamless backdrop, one hard raking key light from upper left casting long parallel shadows, dust motes catching the beam, monochrome red on red, medium-format editorial still life, matte film grain, shallow depth of field, no text, no logos |
| H02 | `hero/02-portrait-slats.jpg` | Close editorial portrait of a person looking up and away, face lit by a hard slatted blind shadow in warm amber `#F2A23B`, deep unlit background falling to black, single gel light source, skin texture retained, cinematic colour, medium-format, matte grain, shallow depth of field, no text, no logos |
| H03 | `hero/03-light-ribbon.jpg` | A single continuous ribbon of hot pink `#ED649E` light drawn in long exposure through dark air, forming one elegant looping curve, black studio void, soft bloom on the brightest bend, faint reflection on a wet floor below, cinematic, matte grain, no text, no logos |
| H04 | `hero/04-lens-glow.jpg` | Extreme close-up of a cinema prime lens front element on a dark surface, deep violet `#764BA2` light raking across the glass coatings, internal reflections forming concentric rings, everything else in shadow, product photography grammar, medium-format, matte grain, shallow depth of field, no text, no logos |
| H05 | `hero/05-acrylic-layers.jpg` | Six translucent frosted acrylic sheets stacked with air gaps between them, standing upright on a pale grey studio sweep, cool blue `#5196FD` light passing through and refracting on the surface behind, one long soft shadow, minimal, architectural, medium-format still life, matte grain, no text, no logos |
| H06 | `hero/06-portrait-prism.jpg` | Editorial portrait in profile, a thin horizontal bar of spectral prism light cutting across the eyes, deep indigo `#1A3DE8` ambient wash, subject in dark clothing against near-black, single hard source with rainbow refraction, cinematic, medium-format, matte grain, shallow depth of field, no text, no logos |
| H07 | `hero/07-glass-torus.jpg` | An iridescent clear glass torus resting on a brushed steel pedestal, bone-white seamless studio sweep, one soft key from camera right, long soft shadow stretching left, caustic light pooling under the glass, emerald `#0E9F6E` refraction inside the form, minimal luxury product photography, medium-format, matte grain, no text, no logos |
| H08 | `hero/08-hands-swatches.jpg` | Overhead close-up of two hands fanning a printed colour swatch deck across a warm concrete surface, warm directional window light from the left, deep shadow on the right, muted natural palette with one amber `#F2A23B` swatch catching the light, documentary editorial, medium-format, matte grain, shallow depth of field, no text, no logos |
| H09 | `hero/09-chrome-mesh.jpg` | A polished chrome wireframe sphere made of thin intersecting rings, floating above a dark reflective floor, deep blue `#1A3DE8` rim light on the upper edges, black void background, sharp specular highlights, studio product photography, medium-format, matte grain, no text, no logos |
| H10 | `hero/10-motion-figure.jpg` | A figure in a loose white shirt captured in heavy motion blur crossing the frame left to right, saturated teal `#12B5C9` seamless backdrop, one slow-shutter exposure with a sharp trailing edge, limbs smeared into colour, editorial fashion photography, medium-format, matte grain, no text, no logos |
| H11 | `hero/11-liquid-drop.jpg` | A single suspended droplet of clear liquid frozen mid-fall against a deep charcoal drape, a warm amber light beam passing through it and splitting into a spectrum on the far side, macro product photography, extreme detail on the surface tension, matte grain, shallow depth of field, no text, no logos |
| H12 | `hero/12-portrait-red-wash.jpg` | Editorial portrait, head tilted back and up, entire frame washed in crimson `#E8341A` light, a second cooler light grazing the jawline from behind, black background, high contrast, skin texture and pores retained, cinematic gel lighting, medium-format, matte grain, shallow depth of field, no text, no logos |
| H13 | `hero/13-paper-fold.jpg` | A single sheet of heavy cotton paper folded into a sharp angular form standing on a pale bone seamless, hard low sun-angle key light from the right casting a long geometric shadow, subtle rose `#ED649E` bounce on the shadow side, minimal sculptural still life, medium-format, matte grain, no text, no logos |
| H14 | `hero/14-desk-overhead.jpg` | Overhead editorial shot of a dark walnut desk with a closed laptop, a ceramic cup, a folded pair of glasses and one open notebook, warm low-angle window light from the top left, deep shadows, muted natural tones with one violet `#764BA2` object accent, documentary workspace photography, medium-format, matte grain, no text, no logos, no readable writing |
| H15 | `hero/15-caustics.jpg` | Abstract underwater light caustics rippling across a pale sand-coloured floor, cool blue `#5196FD` water tones, one bright refracted hotspot, no subject, pure light study, soft focus falloff at the edges, medium-format, matte grain, no text, no logos |
| H16 | `hero/16-node-cluster.jpg` | A cluster of small clear glass spheres connected by fine matte black rods forming an irregular molecular lattice, suspended against a dark teal `#12B5C9` gradient void, one soft key from above rear producing rim highlights on each sphere, minimal scientific product photography, medium-format, matte grain, shallow depth of field, no text, no logos |

### 3.2 Services — 5 images, `4:3`

One per **offer**, Family A, each owning its accent. Matches the consolidated
five in `lib/services.ts` (8→5, 2026-07-28 — see the header comment there for
the reference-site evidence behind the regrouping). These replace the current
`imageUrl` values, all five of which currently reuse project stills.

| ID | Offer | File | Prompt |
| --- | --- | --- | --- |
| S01 | Brand Strategy & Identity | `services/brand-strategy-identity.jpg` | Close macro of a blind-deboss impression pressed into thick cotton paper, an abstract geometric mark with no letterforms, raking crimson #E8341A light from the left revealing the depth of the emboss and the paper fibre texture, rich shadow in the recesses, print-craft product photography, medium-format, matte grain, shallow depth of field, no text, no lettering, no logos |
| S02 | Web Design & Development | `services/web-design-development.jpg` | Nine frosted translucent acrylic rectangles arranged in a loose grid, standing at slight angles on a dark studio sweep, deep indigo #1A3DE8 light passing through them and projecting overlapping soft-edged shapes on the wall behind, architectural minimalism, one long shadow, medium-format still life, matte grain, no text, no interface elements, no logos |
| S03 | Motion & Video | `services/motion-video.jpg` | Long-exposure light painting of a hot pink #ED649E luminous line tracing a fluid three-dimensional spiral through dark air, motion trails with visible speed falloff, black studio void, soft bloom, one faint reflection below, cinematic abstract, matte grain, no text, no logos |
| S04 | eCommerce | `services/ecommerce.jpg` | An unbranded matte cardboard box mid-fall against a deep emerald #0E9F6E seamless backdrop, one strip of paper tape catching a hard key light, frozen motion with a faint trailing shadow, extreme negative space above, minimal conceptual product photography, medium-format, matte grain, no text, no printing on the box, no logos |
| S05 | Custom Software & AI | `services/custom-software-ai.jpg` | A dense irregular lattice of small clear glass nodes joined by fine matte black connectors, occupying the lower third of a deep teal #12B5C9 gradient void, one soft key from above rear lighting each node into a bright point, depth falloff into darkness at the back, minimal scientific still life, medium-format, matte grain, shallow depth of field, no text, no logos |

**Retired but still useful.** Three prompts written against the pre-merge list
no longer have a top-level offer, but each merged detail page has room for a
supporting image — keep them for that:

| Was | Prompt |
| --- | --- |
| Brand Strategy | A single chess-piece-like matte ceramic form standing alone on a vast crimson #E8341A seamless sweep, one hard key light from the upper right casting a long dramatic shadow across the empty ground, extreme negative space, the object small in frame, minimal conceptual still life, medium-format editorial photography, matte film grain, no text, no logos |
| Video Production | A cinema camera silhouette in a darkened studio, backlit by a deep violet #764BA2 practical light, atmospheric haze catching the beam, a second warm light grazing the camera body edge, everything else falling to black, moody behind-the-scenes editorial photography, medium-format, matte grain, shallow depth of field, no text, no logos |
| Web Development | A precise chrome lattice structure of thin intersecting bars receding into depth, floating above a dark reflective floor, deep indigo #1A3DE8 rim light along the leading edges, black void behind, sharp specular highlights and clean geometry, studio product photography, medium-format, matte grain, no text, no logos |

### 3.3 Service detail heroes — 5 images, `16:9`

Wider companions for `/services/[slug]`, same concept as the matching S-image so
the pages feel continuous with the homepage list.

Take each S-prompt above and append:

> ` , wide cinematic framing, subject offset to the right third, generous empty space on the left for a headline overlay, horizontal composition`

Files: `services/<slug>-wide.jpg` for the five canonical slugs
(`brand-strategy-identity`, `web-design-development`, `motion-video`,
`ecommerce`, `custom-software-ai`).

### 3.4 Projects — 6 images, `4:3`

Family B. These are the showcase, so they carry device chrome and screen
content. Screen content is deliberately described as abstract layout blocks with
**no readable text** — Recraft renders fake UI copy badly, and unreadable
blocks at card size look more convincing than garbled words.

| ID | Project | File | Prompt |
| --- | --- | --- | --- |
| P01 | Brand Strategy | `projects/brand-strategy-still.jpg` | Overhead flat lay of an open brand strategy document spread across a warm concrete surface, printed pages showing abstract diagram blocks and colour bars with no readable text, a crimson `#E8341A` marker and a folded pair of glasses beside them, warm directional window light from the upper left, deep soft shadows, documentary editorial photography, medium-format, matte grain, no text, no lettering, no logos |
| P02 | Brand Identity | `projects/brand-identity-still.jpg` | A brand collateral set arranged on a warm sand-toned surface — stacked business cards, a folded poster, a matte tote, a ceramic cup — all unbranded with abstract amber `#F2A23B` geometric shapes printed on them, one hard raking key light from the right, long parallel shadows, minimal art direction, medium-format product photography, matte grain, no text, no lettering, no logos |
| P03 | Web Development | `projects/web-development-still.jpg` | A modern laptop at a three-quarter angle on a dark textured slate surface, screen displaying an abstract website layout of clean rectangular blocks and a wide hero band in deep indigo `#1A3DE8`, no readable text on screen, one cool key light from the upper left, soft reflection on the surface, near-black background, premium device mockup photography, medium-format, matte grain, shallow depth of field, no logos |
| P04 | eCommerce | `projects/ecommerce-still.jpg` | Two smartphones overlapping and floating at slight angles above a flat emerald `#0E9F6E` backdrop, screens showing an abstract product-grid and checkout layout of clean blocks with no readable text, soft contact shadows below each device, one broad soft key light, bright minimal commercial mockup photography, medium-format, matte grain, no logos |
| P05 | Motion | `projects/motion-still.jpg` | A widescreen display on a dark studio table showing an abstract motion-graphics frame of overlapping hot pink `#ED649E` and black geometric shapes mid-transition, screen glow spilling onto the table surface, atmospheric haze, everything else in shadow, moody studio mockup photography, medium-format, matte grain, shallow depth of field, no text, no logos |
| P06 | AI Automation | `projects/ai-automation-still.jpg` | A floating browser window with a soft drop shadow, tilted slightly, displaying an abstract analytics dashboard of clean rectangular cards, a sidebar, and cyan `#22D3EE` chart shapes with no readable text or numbers, set against a pale grey to white gradient background, bright even studio light, crisp modern SaaS mockup, medium-format, no logos |

### 3.5 Chrome elements — 10 objects, `1:1`

Sourced from the Higgsfield Apps Contest trophy Promit supplied. What's doing
the work in that reference, isolated:

- **Fluted / ribbed clear glass** as a backdrop slab, with rainbow refraction
  running vertically down the flutes.
- **Chunky extruded 3D letterforms**, each with a *different* material —
  polished chrome bevel, matte coloured plastic, glossy sky-and-cloud gradient
  — rather than one uniform treatment.
- **Rounded-square badge tiles** with a thick bevelled chrome rim and a flat
  icon inset, floating at slightly different depths.
- **A rough dark stone plinth** grounding the whole stack, which is what keeps
  it from reading as generic Y2K chrome.
- Everything on near-black, lit from above with sharp specular hits.

These are decorative objects, not photography — they want transparent PNGs so
they can float over sections, tilt on cursor, and parallax. Generate at `1:1`
on a plain dark background, then run Higgsfield's `remove_background` tool on
each result before exporting.

| ID | File | Prompt |
| --- | --- | --- |
| C01 | `chrome/monogram-st.png` | A chunky extruded 3D monogram of two abstract interlocking geometric shapes, polished liquid-chrome material with a thick bevelled edge, rainbow iridescent reflections across the surface, floating against a plain near-black background, sharp specular highlights from an overhead studio light, soft contact shadow, high-detail 3D render, octane, no text, no letters, no logos |
| C02 | `chrome/badge-brand.png` | A rounded-square badge tile with a thick bevelled polished chrome rim and a flat crimson #E8341A inset face, a simple abstract geometric glyph embossed at its centre, floating at a slight three-quarter tilt against plain near-black, sharp specular highlights, soft contact shadow, glossy 3D render, no text, no letters, no logos |
| C03 | `chrome/badge-web.png` | A rounded-square badge tile with a thick bevelled polished chrome rim and a flat deep-indigo #1A3DE8 inset face, a simple abstract angular glyph embossed at its centre, floating at a slight three-quarter tilt against plain near-black, sharp specular highlights, soft contact shadow, glossy 3D render, no text, no letters, no logos |
| C04 | `chrome/badge-motion.png` | A rounded-square badge tile with a thick bevelled polished chrome rim and a flat hot-pink #ED649E inset face, a simple abstract swooping glyph embossed at its centre, floating at a slight three-quarter tilt against plain near-black, sharp specular highlights, soft contact shadow, glossy 3D render, no text, no letters, no logos |
| C05 | `chrome/badge-ecommerce.png` | A rounded-square badge tile with a thick bevelled polished chrome rim and a flat emerald #0E9F6E inset face, a simple abstract cube glyph embossed at its centre, floating at a slight three-quarter tilt against plain near-black, sharp specular highlights, soft contact shadow, glossy 3D render, no text, no letters, no logos |
| C06 | `chrome/badge-ai.png` | A rounded-square badge tile with a thick bevelled polished chrome rim and a flat teal #12B5C9 inset face, a simple abstract node-lattice glyph embossed at its centre, floating at a slight three-quarter tilt against plain near-black, sharp specular highlights, soft contact shadow, glossy 3D render, no text, no letters, no logos |
| C07 | `chrome/fluted-glass-slab.png` | A vertical slab of thick fluted ribbed clear glass standing upright, rainbow prismatic refraction running down each flute, crisp caustic light passing through onto the surface behind, floating against plain near-black, overhead studio key light, high-detail 3D render, no text, no logos |
| C08 | `chrome/stone-plinth.png` | A rough dark volcanic stone plinth with sharp fractured facets and a flat polished top surface, cool rim light along the upper edges, deep shadow in the crevices, floating against plain near-black, photoreal 3D render, no text, no logos |
| C09 | `chrome/orb-sky.png` | A glossy rounded 3D sphere with a soft blue sky-and-cloud gradient rendered across its surface, a small four-point sparkle catching one edge, thick chrome bevel around its equator, floating against plain near-black, glossy toy-like 3D render, sharp specular highlight, no text, no logos |
| C10 | `chrome/arrow-chrome.png` | A chunky extruded 3D arrow pointing up and to the right, polished liquid-chrome material with a thick bevelled edge and iridescent rainbow reflections, floating at a three-quarter angle against plain near-black, sharp overhead specular highlights, soft contact shadow, high-detail 3D render, no text, no logos |

**Where these would go** (not built — see §5, item 6):

- C02–C06 as the service-row hover markers in `Services.tsx`, one per offer,
  tilting on cursor like the PricingSection's existing 3D-tilt treatment.
- C01 floating in the hero, parallaxed.
- C07 as a section divider behind the "How We Work" heading.
- C08 + C09 + C10 as scattered scroll-parallax accents.

---

## 4. Generation runbook

**Blocked as of 2026-07-28.** The Higgsfield account is on `plus` with
**0 credits**; `trial_status` is `cancelled_by_user` (trial ends 2026-07-29).
`generate_image` returns:

```
403 only_website_usage_on_trial_is_available
```

A top-up or plan change is required before any of this runs. That's a purchase
decision — Promit's call, not something to action automatically.

**Cost:** `recraft_v4_1` preflighted at **1.25 credits/image** at default
resolution (`get_cost:true`). 42 images ≈ **53 credits**; at `2k` resolution
Recraft has previously run ~8 credits/image → ≈ **300 credits**. Generating
`count: 2` per prompt to pick the better take roughly doubles that.

**Model call shape** — params go **top-level inside `params`**, not nested:

```json
{
  "params": {
    "model": "recraft_v4_1",
    "prompt": "<prompt from §3>",
    "aspect_ratio": "9:16",
    "resolution": "2k",
    "model_type": "standard",
    "colors": [{"rgb": [232, 52, 26]}],
    "count": 2
  }
}
```

- `model_type: "standard"` for everything in §3.1–3.3 (abstract/editorial).
- `model_type: "utility"` for §3.4 (device and UI mockups).
- `colors` seeds the accent — pass the RGB of that image's accent.
- Jobs are async: poll `show_generations`, take `results[].rawUrl` (PNG).

**Post-processing** (no ImageMagick in this environment; `sips` webp silently
fails, so JPEG only):

```bash
sips -s format jpeg -s formatOptions 82 -Z 1600 in.png --out out.jpg
```

Hero tiles can go `-Z 1200` (they render ≤280px wide); project and service
images want `-Z 1600`.

---

## 5. Integration checklist

Nothing below has been wired up — the files don't exist yet, and pointing the
components at missing paths would break the running site. This is the exact
sequence once the images land in `public/`.

1. **Hero** — `components/HeroMarquee.tsx` derives its tiles from `SERVICES`
   (`SERVICE_TILES`, line 23). Since the 8→5 consolidation that's only five
   tiles, so the strip repeats sooner than before and this is now the most
   visible gap. Introduce a dedicated `lib/hero-tiles.ts` exporting the 16
   H-entries (`img`, `accent`, `num`, `name`) and map over that instead. Keep
   the `HERO_VIDEO` override (now keyed `brand-strategy-identity`) so the
   existing loop still plays.
2. **Services** — replace the five `imageUrl` values in `lib/services.ts` with
   the §3.2 paths. Add an `imageWideUrl` field for the §3.3 detail-page heroes
   and consume it in `app/services/[slug]/page.tsx`.
3. **Projects** — `lib/project-showcase.ts` keeps its three `.mp4` entries;
   swap the three stills (`brand-identity.jpg`, `web-development.png`,
   `ecommerce.png`) for the §3.4 files, and use the remaining P-images as
   `poster` frames on the video cards.
4. **Every new path must go through `asset()`** from `lib/asset.ts` — bare
   `/projects/…` refs render without the basePath and 404 on the GitHub Pages
   subpath. Verify with `npm run build:pages` then grep `out/index.html` for
   bare `/services/` or `/projects/` refs.
5. **Verify in real headless Chromium, not the in-app preview pane.** The pane
   freezes style recalculation — an injected `!important` rule does not move
   computed style — so `getComputedStyle` readings of anything CSS-driven are
   unreliable there. GSAP's own inline transforms still read correctly (it
   writes them directly), which is why motion-path geometry can be probed in
   the pane but CSS reveals cannot. Drive a short Playwright script against the
   dev server instead.
6. **Chrome elements (§3.5)** — not built. These need a component, not just
   images: a `<ChromeAccent>` wrapper doing cursor-tracked 3D tilt + scroll
   parallax, reusing the tilt/spotlight maths already in
   `components/PricingSection.tsx`. Worth agreeing placement before building —
   see the note at the end of §3.5.
