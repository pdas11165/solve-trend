# Solve Trend — what's missing, and what makes it client-ready

Written 2026-07-28 after an audit of all 26 section components + 13 `ui/`
primitives, a pass over the 11 saved reference sites, and a 21st.dev catalog
search. Companion to [`IMAGERY.md`](./IMAGERY.md).

---

## 0. The headline

The site is **not short on sections** — it has 15 on the homepage plus
`/services`, `/blog`, `/careers`, `/projects`, `/pricing`, and legals. Compared
to the reference agencies it's already denser than most.

What stops it being client-ready is not missing features. It's **three trust
problems and one polish gap**, in that order of importance. Adding shaders to a
site with invented testimonials on it makes a prettier site with invented
testimonials on it — so the ordering below is deliberate.

---

## 1. Trust blockers — fix before this goes in front of a client

### 1.1 The testimonials are fabricated *and* named after the reference sites

`components/TestimonialShowcase.tsx` carries eight quotes attributed to: Duo
Nutrition, **Lesse Studio**, **AERUK Digital**, Northwind Labs, Harbor & Co.,
Vela Health, Forge Collective, Atlas Retail.

Two of those are the literal names of sites in the reference folder
(`lessestudio_com.html`, `aerukart_com.html`). This is invented social proof on
a live commercial site — the single biggest liability here, and it gets worse if
a prospect recognises the names.

**Options, all fine, pick one:** hide the section until you have real quotes;
replace with a "what working with us is like" section that makes no attribution
claim; or supply real quotes and I'll wire them. I won't write replacement
quotes — fabricating them is the problem, not the format.

### 1.2 The site hotlinks a competitor's CDN

`components/CraftingSection.tsx:14` defines `AWAKE_CDN` pointing at
`cdn.prod.website-files.com/67a5fb8b…` — Awake Agency's Webflow bucket. It's
serving:

- the three "Strategy / Creativity / Technology" badge icons (lines 21–33)
- five placeholder client logos in the trust marquee (lines 73–77)

Same class of problem the imagery pass fixed in July: fragile (they can delete
or rotate it any time), off-brand, and it's their asset being served on your
commercial site. The logo marquee also still reads "Trusted by ambitious brands"
above five marks that aren't clients.

**Fix:** replace the three badge icons with local SVGs, and either cut the
placeholder logos down to the three real ones (Honda, Home Depot, UNICEF) or
drop the marquee until there are more.

### 1.3 No Open Graph image

`app/opengraph-image.*` doesn't exist. `layout.tsx` declares an `openGraph`
block but there's no image behind it — so every link to this site pasted into
Slack, WhatsApp, LinkedIn, or iMessage renders as a bare grey card. For an
agency whose product *is* visual craft, this is the highest
embarrassment-per-hour item on the list and it's ~30 minutes of work
(`app/opengraph-image.tsx` with Next's `ImageResponse`, plus per-route ones for
`/services/[slug]` and `/blog/[slug]`).

### 1.4 Two things that are configured but not live

- **Contact form** falls back to `mailto:` because `RESEND_API_KEY` was never
  set in Netlify. Enquiries currently depend on the visitor's mail client
  opening. This is the money path.
- **No analytics at all.** No GA, no Plausible, nothing — so there's no way to
  know whether any of this is working. `/privacy` already describes cookie use,
  which is currently a claim about something that isn't happening. Plausible or
  Fathom keeps that page honest with no consent banner needed; GA4 would need
  one.

---

## 2. Sections the reference sites have and you don't

R&D across the 11 saved pages. Three gaps show up on nearly every one:

| Missing | Who has it | Why it matters |
| --- | --- | --- |
| **Team / faces** | Arounda (circular headshots), Awake ("Meet the creative minds…"), Bungee (grayscale portraits), Avoora | You're a solo-led studio selling trust. Every reference puts faces on the site. Right now there is not one human on yours. |
| **Credential badges** | Arounda (Clutch, GoodFirms, Upwork, Dribbble), Lesse (Shopify Experts) | Third-party validation you can't self-assert. Clutch/Shopify Partner profiles are free to create. |
| **Real case studies with outcomes** | Arounda, Awake, Avoora (full CMS case-study routes) | `ProjectsSection` is honest but sells *scope* ("Brand sprint", "2–3 wks"), not results. One real before/after with a number beats six capability cards. |

Also worth noting: **five `ui/` primitives are dead code** — `GlassCards`,
`AnimatedGallery`, `GradientBoldCard`, `MotionFooter`, `TextScrollAnimation`,
`ScrollFaqAccordion` are imported nowhere. Previous 21st.dev pulls that never
landed. Either use them or delete them; they're currently shipping in the repo
and confusing the inventory.

---

## 3. Gradients & shaders for the dark sections

Seven components render on `--bg-dark`: `DarkTransition`, `VelocityMarquee`,
`TrendShowcaseSection`, `TestimonialShowcase`, `PricingSection`,
`ContactSection`, `HiringStrip`. Right now the dark passage is lit almost
entirely by two blurred radial blobs and a dot grid — it flattens out over
~6 screens.

**The right library:** `paper-design`'s Paper Shaders on 21st.dev
(Apache-2.0, and described as *drop-in, zero-dependency*). That matters — the
alternative results (`Mesh Gradient Background`, `Robot Hero`) are React Three
Fiber, which drags in three.js + postprocessing for a background. Not worth it.

**Placement, in priority order:**

1. **`DarkTransition` — "How We Work".** The best candidate by far: it's a
   pinned 300vh section where the visitor sits for a long time, and the
   background is currently static. A slow mesh-gradient shader in brand red /
   amber at low opacity, *behind* the existing dot grid, would give the whole
   flight sequence depth.
2. **`TrendShowcaseSection` — the comparison.** A **static** mesh gradient (no
   animation) as a wash behind the radar chart. Static variants exist and cost
   nothing per frame.
3. **`ContactSection`.** A slow, very low-contrast animated gradient behind the
   form. This is the last thing a visitor sees before converting.

**Do not** put one behind `VelocityMarquee` — the words now carry the colour,
and a shader there would fight them.

**Performance rules, non-negotiable:**

- **Max two live WebGL canvases on the homepage.** Each is a persistent GPU
  context; three or more on a page that already runs Lenis + GSAP ScrollTrigger
  + autoplaying video will cost real frames on mid-range laptops.
- Pause every shader when off-screen with an `IntersectionObserver`.
- Hard-disable under `prefers-reduced-motion` and fall back to the existing
  static radial gradients — animated full-screen gradients are a genuine
  vestibular trigger.
- Measure before and after. The homepage is already ~25 screens.

---

## 4. The robot on the AI Automation page

Three candidates, and the obvious pick isn't the flashiest:

| Component | Stack | Verdict |
| --- | --- | --- |
| **Interactive 3D Character** (#6612) | **Zdog.js + GSAP** | **Recommended.** Zdog is ~28KB; GSAP is *already a dependency*. Follows the cursor, has idle breathing and looking-around animations. Renders to canvas, no WebGL context, no three.js. |
| Robot Hero (#17351) | React Three Fiber + framer-motion | Looks great, but three.js + R3F is ~600KB for one decorative robot on one sub-page. |
| Interactive 3D Robot (#1914) | Spline | Loads Spline's runtime *and* fetches the scene from Spline's CDN at runtime — a third-party dependency on a page load, and another external host on a site we just finished de-hotlinking. |

**Where it goes:** `/services/custom-software-ai`, in the detail-page hero
opposite the copy. Cursor-following idle robot reads as "this thing is alive and
watching", which is exactly the right note for the AI automation offer, and it's
the flagship service so the extra weight is justified on that route alone.

It should be `next/dynamic` with `ssr: false` so it never blocks the other four
service pages, and it needs a reduced-motion static pose.

---

## 5. The 21st.dev constraint

The account is on the **free tier: 2 component code retrievals per day**
(`get_usage`). Search and metadata are unmetered — so I can research freely, but
pulling actual source is rationed. That's the binding constraint on how fast any
of section 3 or 4 can land.

**Shortlist, in the order I'd spend retrievals:**

| Priority | Component | id | For |
| --- | --- | --- | --- |
| 1 | Paper Shaders mesh gradient (recolour to brand) | 21801 / 17796 | §3.1 + §3.2 |
| 2 | Interactive 3D Character (Zdog + GSAP) | 6612 | §4 robot |
| 3 | Team Showcase (grayscale→colour on hover + name list) | 10098 | §2 team — and it mirrors the hover-list pattern `Services.tsx` already uses, so it'd feel native |
| 4 | Glowing Effect (Cursor-style border glow) | 1567 | Pricing / project cards |
| 5 | Spotlight Card | 9648 | Dark-section cards |

Two a day means the shader + robot is day one, team + glow is day two. Or a
$X upgrade removes the limit — your call.

---

## 6. Suggested order

1. **Testimonials decision** (§1.1) — blocks everything else being worth doing.
2. **OG image** (§1.3) — highest visible payoff per hour on the list.
3. **De-hotlink the Awake CDN** (§1.2).
4. **Resend key + analytics** (§1.4).
5. **Shaders** in `DarkTransition` and `TrendShowcaseSection` (§3).
6. **Robot** on the AI page (§4).
7. **Team section** (§2) — needs a photo of you before it can be built.
8. Delete or use the five dead `ui/` primitives.

Items 1, 4, and 7 need something from you (a decision, an API key, a photo).
2, 3, 5, 6, and 8 I can do unattended.
