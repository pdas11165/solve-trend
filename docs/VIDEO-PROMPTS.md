# Creative / Studio reveal video — generation prompts

Target: the scroll-driven reveal block modelled on Vertora's service page — the words
**Creative** and **Studio** flanking a small dark box that scales to full-bleed as you
scroll.

Reverse-engineered from `~/Downloads/solveCursor/reference websites/Vetora_Servicepage.html`
and its stylesheet (`vertora.webflow.shared.99e089426.css`).

## The reference implementation

```
.rt-reveal-video-wrap        height: 200rem              3200px scroll track
.rt-sticky-wrapper-v4        height: 100vh; sticky top:0 pinned viewport
.rt-reveal-video-inner-wrap  width: 100vw; height: 100vh
.rt-showreel-image-wrap      height: 100vh               the element that scales
.rt-video-wrap               border-radius: .7rem; overflow: clip
.rt-background-video-v1      width:100vw; height:100vh; object-fit: cover
.rt-reel-video-text.rt-text-1  right: calc(100% + .85rem)   "Creative"
.rt-reel-video-text.rt-text-2  left:  calc(100% + .85rem)   "Studio"
```

Their clip is Pexels **8303104** (golden pleated ribbon fan), reused in the homepage
hamburger menu. Below tablet the whole interaction is disabled: `position: static`,
video becomes a flat 25rem band, both words hidden by `rt-tab-display-none`.

## Hard constraints every prompt must satisfy

Derived from how the block actually behaves, and from what every reference site's
`<video>` tag does (`autoplay loop muted playsinline` + poster):

1. **16:9, 1920×1080.** Final state is `width:100vw; height:100vh; object-fit:cover`.
2. **Centre-safe composition.** `object-fit: cover` at every scale step means the clip
   is cropped to a narrow vertical slice at the start of the scroll. No single focal
   point, no subject that can be sliced in half. Use an all-over *field* texture — this
   is the reason Vertora picked ribbons and not an object.
3. **No text, no logos, no glyphs.** Video models garble typography, and the section's
   own words sit right beside the box.
4. **No people, no hands, no faces.** Nothing that dates or needs a release.
5. **Silent.** Every reference is `muted`. Turn audio generation off — it also costs less.
6. **One continuous shot, no cuts.** A cut inside a looping background reads as a glitch.
7. **Slow, even motion.** The viewer controls the scale via scroll; competing fast motion
   in the clip fights that.
8. **Even exposure.** Section copy may overlay it. Avoid blown highlights that swallow
   white text or dead blacks that swallow dark text.

## Settings

- Aspect ratio `16:9`, resolution 1080p
- Duration 8–10s (longer = more chance of drift and artefacts)
- Audio **off**
- Model: **Kling v3.0** is the strongest pure text-to-video for abstract motion.
  Seedance 2.0 is reference-driven — better if you feed it a start frame.

## Looping — do this in post, not in the prompt

None of these models reliably produce a seamless loop, and asking for one in the prompt
wastes generations. Make any clip loop perfectly with a ping-pong (reverse-and-append).
On slow abstract drift the reversal is invisible. `ffmpeg-static` is already in the repo:

```bash
node_modules/ffmpeg-static/ffmpeg -i raw.mp4 \
  -filter_complex "[0]split[a][b];[b]reverse[r];[a][r]concat=n=2:v=1" \
  -an -c:v libx264 -crf 23 -pix_fmt yuv420p -movflags +faststart creative-studio.mp4
```

Poster frame (every reference site ships one):

```bash
node_modules/ffmpeg-static/ffmpeg -i creative-studio.mp4 -vframes 1 -q:v 3 creative-studio-poster.jpg
```

Then reference both through `asset()` from `lib/asset.ts`, or it 404s on the GitHub
Pages subpath.

---

## Prompt 1 — Pleated ribbon fan (closest to Vertora's actual clip)

The faithful reverse-engineer, recoloured to Solve Trend. Safest bet of the five.

```
Abstract 3D render of hundreds of thin parallel ribbons fanning across the full frame,
pleated like folded paper, curving into a slow S-shaped wave. Raking low-angle light
grazes the folds so each pleat catches a bright specular edge and falls into deep shadow.
Deep crimson and burnt amber, warm highlights blooming to pale gold where the light
concentrates. Matte, slightly powdery surface, subtle fabric grain. The whole field
undulates slowly and continuously, like a curtain breathing. Camera drifts almost
imperceptibly from left to right, no zoom, no cut. Even all-over composition with no
focal point, texture filling every part of the frame edge to edge. Cinematic, high-end
motion design, 4K, shallow depth of field falling off at the corners.
```

Avoid: text, logos, people, hands, hard cuts, fast motion, strobing, flat lighting.

Why it survives the crop: the ribbon field is uniform across the frame, so a narrow
centre slice looks like a deliberate close-up rather than a broken composition.

---

## Prompt 2 — Prismatic light leak on black (best fit for a dark section)

Reverse-engineered from Vertora's *other* clip (Pexels 12149178), used in their CTA
block. This is the one to pick if the block sits against `--bg-dark` — it reads as a
black box that happens to be alive, which is exactly the "black box" brief.

```
Abstract macro of prismatic light refracting through a slowly rotating crystal edge
against near-black. Thin blades of spectral colour — deep blue, magenta, emerald, warm
red — sweep across the frame and cross near the centre, soft and heavily diffused at the
edges, sharp only where the beams intersect. Chromatic aberration splits each beam into
its component colours. The background stays a deep charcoal, never fully black, with a
faint film grain. Extremely slow continuous rotation, beams drifting and re-crossing,
one unbroken take. Anamorphic lens flare character, soft bloom, no visible light source.
Cinematic, dark, moody, 4K.
```

Avoid: text, logos, people, hard cuts, strobing, bright white blowout, lens dirt overlay.

Why it survives the crop: the beam crossing is centred, so the tall start-crop frames the
most interesting part and the full-bleed end state reveals the falloff.

---

## Prompt 3 — Liquid chrome caustics

Ties to the hero's existing liquid-glass language (`.hero-strip-glass` — specular sweep
plus a masked edge-refraction band), so the page reads as one system.

```
Abstract close-up of a molten liquid chrome surface rolling in slow, heavy swells that
fill the entire frame. Mirror-polished metal reflecting a soft studio environment, with
iridescent oil-slick colour blooming along the crests — teal, warm red, pale gold — while
the troughs stay a cool graphite. Thick, viscous, mercury-like motion, surface tension
pulling the peaks into smooth rounded ridges. Caustic light patterns ripple beneath the
surface. Camera holds still, extremely slow undulation, one continuous take, no cuts.
Edge-to-edge liquid texture with no single focal point. Studio product-photography
lighting, soft large-source highlights, 4K, macro lens.
```

Avoid: text, logos, splashes, droplets, people, hands, fast motion, hard cuts.

Why it survives the crop: liquid swells are self-similar at any framing.

---

## Prompt 4 — Grainy gradient mesh

Reverse-engineered from Avoora's hero clip. Maps directly onto the site's existing
pink-to-cream hero gradient and the light-to-dark narrative arc, so it can bridge a light
section into the dark one rather than sitting against it.

```
Abstract animated gradient mesh filling the frame, large soft blooms of colour bleeding
into one another with no hard edges. Deep crimson and warm coral on the right dissolving
through a pale cream centre into a cool teal and deep indigo on the left. Heavy fine film
grain over the whole image, like a scanned photographic gradient. The blooms drift and
breathe extremely slowly, colours swelling and receding, continuously morphing without
ever cutting or repeating a pose. No shapes, no objects, no edges — pure colour field.
Soft, warm, analogue. One unbroken take, 4K.
```

Avoid: text, logos, objects, geometry, people, hard edges, banding, fast motion, cuts.

Why it survives the crop: a pure colour field has no composition to break. This is the
most crop-proof of the five and the most forgiving of overlaid copy.

---

## Prompt 5 — Extruded geometry tunnel

Reverse-engineered from idotive's kaleidoscopic cube tunnel, slowed heavily. The forward
motion complements the scale-up reveal — the clip appears to open as the box opens.

```
Abstract 3D render flying slowly through an endless tunnel of extruded rounded-rectangle
frames receding to a bright vanishing point at the centre of the frame. Hundreds of
hollow blocks in matte deep crimson, warm cream, teal and charcoal, arranged in dense
irregular layers, thin light streaks threading between them. Soft global illumination,
gentle ambient occlusion in the recesses, everything slightly glossy. The camera pushes
forward at a slow constant crawl, blocks drifting past the lens, one continuous take, no
cuts. Symmetrical radial composition centred on the vanishing point. Clean, precise,
high-end 3D motion design, 4K.
```

Avoid: text, logos, people, fast motion, motion blur streaking, strobing, hard cuts.

Why it survives the crop: a radial composition centred on the vanishing point reads
correctly at any crop width — the centre is always the subject.

---

## Recommended order

If any generation fails, spend the next on the same concept rather than moving down the
list — a re-roll is usually enough.

1. **Prompt 2** (prismatic on black) — matches the "black box" brief most literally
2. **Prompt 1** (ribbon fan) — the faithful reverse-engineer, lowest risk
3. **Prompt 4** (gradient mesh) — most crop-proof, best under overlaid copy
4. **Prompt 3** (liquid chrome) — strongest tie to the existing hero glass language
5. **Prompt 5** (geometry tunnel) — highest risk; tunnels are where these models artefact
