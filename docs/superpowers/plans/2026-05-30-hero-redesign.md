# Hero Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the Solve Trend hero as a centered "monument" with a giant wordmark, an Arounda-style hover-pill subtitle, a brand-tinted GL flow shader (plus subtle glass prisms), and a Bungee-style infinite marquee of service tiles that pause + frost on hover.

**Architecture:** All work is confined to the hero. `Hero.tsx` composes four pieces: a new `HeroShader.tsx` (full-bleed WebGL flow shader + 2 glass prisms), a reworked `HeroHeadline.tsx` (wordmark + glass hover-pills with floating icons), a neomorphic CTA, and a new `HeroMarquee.tsx` (service strips). All visuals are driven by new, hero-scoped CSS added to `app/globals.css`. No other section, component, variable, or function is modified or renamed.

**Tech Stack:** Next.js 16 (App Router), React 19, three.js 0.184 (already a dependency), CSS in `app/globals.css` (Tailwind v4 import present but hero uses plain CSS to match the existing file's conventions). No test framework exists; verification is `npm run lint`, `npx tsc --noEmit`, `npm run build`, and visual screenshot checks via the dev server.

---

## Testing note (read first)

This repo has **no unit-test framework** (only `eslint`). Per the project's minimal-change rule we are **not** adding one. Every task is therefore verified by:

1. `npm run lint` — no new errors
2. `npx tsc --noEmit` — no type errors
3. (final) `npm run build` — compiles
4. (final) visual check on `npm run dev` at `http://localhost:3000`

Run `npm run dev` once at the start in a background terminal so you can eyeball changes as you go.

## Brand tokens (used by all tasks)

Add these NEW tokens — do **not** edit the existing `--red`/`--red-light`/`--red-mid` (they are used by other sections and changing them would alter UI elsewhere):

```css
--brand-red:    #F03223;
--brand-amber:  #F7A23B;
--brand-coral:  #F26B3A;
--brand-black:  #050005;
--brand-white:  #E1E1E1;
```

## File structure

| File | Action | Responsibility |
|------|--------|----------------|
| `app/globals.css` | Modify | Add brand tokens + all hero-scoped styles; adjust `.hero` for the monument layout |
| `components/Hero.tsx` | Rewrite | Compose shader + headline + CTA + marquee |
| `components/HeroHeadline.tsx` | Rewrite | Wordmark + glass hover-pills + floating icons |
| `components/HeroShader.tsx` | Create | WebGL flow shader background + 2 subtle glass prisms |
| `components/HeroMarquee.tsx` | Create | Infinite service-tile marquee with hover pause + frosted reveal |

`components/HeroCanvas.tsx` is left untouched (currently unused by `Hero`); `HeroShader` is its spiritual successor but we do not delete `HeroCanvas` to avoid touching anything outside scope. `components/ui/text-rotate.tsx` stays in place (the rewritten headline simply stops importing it).

---

### Task 1: Brand tokens + base monument layout CSS

**Files:**
- Modify: `app/globals.css` (`:root` block ~line 11-38, and `.hero` block ~line 371-447)

- [ ] **Step 1: Add brand tokens**

In `app/globals.css`, inside the existing `:root { ... }` (after the `--red-mid` line ~15), add:

```css
  /* Brand (hero monument) — authoritative brand spec */
  --brand-red:    #F03223;
  --brand-amber:  #F7A23B;
  --brand-coral:  #F26B3A;
  --brand-black:  #050005;
  --brand-white:  #E1E1E1;
```

- [ ] **Step 2: Convert `.hero` to the centered monument layout**

Replace the existing `.hero { ... }` rule (~line 371-378) with:

```css
.hero {
  position: relative;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 120px 0 0;
  background: var(--brand-black);
  isolation: isolate;
}
.hero-monument-wrap {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  flex: 1 1 auto;
  justify-content: center;
  padding: 0 24px;
}
```

Leave `.hero .container`, `.hero-canvas`, and the other existing `.hero-*` rules in place for now (they become unused but removing them is a separate cleanup; keeping them avoids accidental breakage). The new shader uses class `.hero-shader` defined in Task 3.

- [ ] **Step 3: Verify lint + types**

Run: `npm run lint && npx tsc --noEmit`
Expected: no new errors (CSS-only change; tsc unaffected).

- [ ] **Step 4: Commit**

```bash
git add app/globals.css
git commit -m "feat(hero): add brand tokens and monument base layout"
```

---

### Task 2: Wordmark + glass hover-pills + floating icons

**Files:**
- Rewrite: `components/HeroHeadline.tsx`
- Modify: `app/globals.css` (append hero monument styles)

- [ ] **Step 1: Rewrite `HeroHeadline.tsx`**

Replace the entire contents of `components/HeroHeadline.tsx` with:

```tsx
"use client";

import * as React from "react";

type Accent = "red" | "amber" | "coral";
const PILLS: { word: string; accent: Accent }[] = [
  { word: "brand", accent: "red" },
  { word: "websites", accent: "amber" },
  { word: "ui/ux", accent: "coral" },
];

function PillIcons() {
  return (
    <span className="hero-pill-icons" aria-hidden="true">
      <span className="hero-pill-icon i1">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
          <path d="M12 2l2.4 6.9H22l-6 4.4 2.3 7-6.3-4.6L5.7 20l2.3-7-6-4.4h7.6z" />
        </svg>
      </span>
      <span className="hero-pill-icon i2">
        <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
          <rect x="4" y="4" width="16" height="16" rx="4" />
        </svg>
      </span>
      <span className="hero-pill-icon i3">
        <svg viewBox="0 0 24 24" width="11" height="11" fill="currentColor">
          <circle cx="12" cy="12" r="9" />
        </svg>
      </span>
    </span>
  );
}

export default function HeroHeadline() {
  return (
    <div className="hero-monument">
      <h1 className="hero-wordmark">
        Solve<span className="hero-wordmark-reg">&reg;</span>Trend
      </h1>
      <p className="hero-subtitle">
        We unite{" "}
        {PILLS.map((p, i) => (
          <React.Fragment key={p.word}>
            <span className={`hero-pill accent-${p.accent}`} tabIndex={0}>
              <span className="hero-pill-word">{p.word}</span>
              <PillIcons />
            </span>
            {i < PILLS.length - 1 ? (i === PILLS.length - 2 ? " & " : ", ") : ""}
          </React.Fragment>
        ))}{" "}
        into one product
      </p>
    </div>
  );
}
```

- [ ] **Step 2: Append wordmark + pill styles to `app/globals.css`**

Add at the end of the hero section in `app/globals.css` (after the `@media (max-width: 768px)` block that ends ~line 447):

```css
/* =========================================================================
   HERO MONUMENT — wordmark, glass hover-pills, floating icons
   ========================================================================= */
.hero-monument { display: flex; flex-direction: column; align-items: center; gap: 22px; }
.hero-wordmark {
  font-family: var(--font-display);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 0.85;
  color: var(--brand-white);
  font-size: clamp(3.5rem, 12vw, 11rem);
  text-shadow: 0 0 90px rgba(240, 50, 35, 0.45);
}
.hero-wordmark-reg { color: var(--brand-red); }

.hero-subtitle {
  font-family: var(--font-body);
  font-size: clamp(1rem, 1.6vw, 1.5rem);
  color: rgba(225, 225, 225, 0.62);
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 6px;
  max-width: 760px;
}

.hero-pill {
  position: relative;
  display: inline-flex;
  align-items: center;
  color: #fff;
  font-weight: 600;
  padding: 5px 14px;
  border-radius: 999px;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  cursor: default;
  transition: box-shadow 0.35s var(--ease-smooth), background 0.35s var(--ease-smooth), transform 0.35s var(--ease-smooth);
}
.hero-pill .hero-pill-word { position: relative; z-index: 2; }
.hero-pill:hover, .hero-pill:focus-visible { transform: translateY(-1px); }

.hero-pill.accent-red {
  background: rgba(240, 50, 35, 0.16);
  border: 1px solid rgba(240, 50, 35, 0.5);
  box-shadow: 0 0 16px rgba(240, 50, 35, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.18);
}
.hero-pill.accent-red:hover, .hero-pill.accent-red:focus-visible {
  background: rgba(240, 50, 35, 0.28);
  box-shadow: 0 0 34px rgba(240, 50, 35, 0.85), inset 0 1px 0 rgba(255, 255, 255, 0.25);
}
.hero-pill.accent-amber {
  background: rgba(247, 162, 59, 0.16);
  border: 1px solid rgba(247, 162, 59, 0.5);
  box-shadow: 0 0 16px rgba(247, 162, 59, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.18);
}
.hero-pill.accent-amber:hover, .hero-pill.accent-amber:focus-visible {
  background: rgba(247, 162, 59, 0.28);
  box-shadow: 0 0 34px rgba(247, 162, 59, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.25);
}
.hero-pill.accent-coral {
  background: rgba(242, 107, 58, 0.16);
  border: 1px solid rgba(242, 107, 58, 0.5);
  box-shadow: 0 0 16px rgba(242, 107, 58, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.18);
}
.hero-pill.accent-coral:hover, .hero-pill.accent-coral:focus-visible {
  background: rgba(242, 107, 58, 0.28);
  box-shadow: 0 0 34px rgba(242, 107, 58, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.25);
}

/* Floating tag icons (Arounda effect) */
.hero-pill-icons { position: absolute; inset: 0; z-index: 1; pointer-events: none; }
.hero-pill-icon {
  position: absolute;
  left: 50%;
  top: 50%;
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.6);
  transition: opacity 0.35s var(--ease-smooth), transform 0.35s var(--ease-smooth);
}
.hero-pill.accent-red .hero-pill-icon { color: var(--brand-red); }
.hero-pill.accent-amber .hero-pill-icon { color: var(--brand-amber); }
.hero-pill.accent-coral .hero-pill-icon { color: var(--brand-coral); }

.hero-pill:hover .hero-pill-icon,
.hero-pill:focus-visible .hero-pill-icon { opacity: 1; }
.hero-pill:hover .hero-pill-icon.i1,
.hero-pill:focus-visible .hero-pill-icon.i1 { transform: translate(-150%, -190%) scale(1); }
.hero-pill:hover .hero-pill-icon.i2,
.hero-pill:focus-visible .hero-pill-icon.i2 { transform: translate(70%, -170%) scale(1); }
.hero-pill:hover .hero-pill-icon.i3,
.hero-pill:focus-visible .hero-pill-icon.i3 { transform: translate(160%, 60%) scale(1); }

@media (prefers-reduced-motion: reduce) {
  .hero-pill, .hero-pill-icon { transition: none; }
}
```

- [ ] **Step 3: Temporarily render to verify (manual)**

`Hero.tsx` still imports `HeroHeadline` and will render the new markup. On `http://localhost:3000` confirm: centered "Solve®Trend", subtitle reads "We unite brand, websites & ui/ux into one product", and hovering each pill blooms its glow + 3 floating icons.

- [ ] **Step 4: Verify lint + types**

Run: `npm run lint && npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add components/HeroHeadline.tsx app/globals.css
git commit -m "feat(hero): wordmark and glass hover-pills with floating icons"
```

---

### Task 3: WebGL flow shader background + glass prisms

**Files:**
- Create: `components/HeroShader.tsx`
- Modify: `app/globals.css` (append `.hero-shader` rule)

- [ ] **Step 1: Create `components/HeroShader.tsx`**

```tsx
"use client";

import * as React from "react";

/**
 * Hero background: a full-bleed brand-tinted flow shader (red/amber on near-black)
 * rendered behind two subtle, slowly rotating glass prisms.
 *
 * - Shader quad rendered with an orthographic camera (scene A).
 * - Prisms rendered with a perspective camera on top (scene B), autoClear off.
 * - Mouse position lerps into the shader + prism rotation.
 * - prefers-reduced-motion: renders a single static frame.
 * - Mobile (<768px): drops the prisms, keeps the shader.
 */
export default function HeroShader() {
  const mountRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let disposed = false;
    let frameId: number | null = null;
    const cleanup: Array<() => void> = [];

    (async () => {
      const THREE = await import("three");
      if (disposed) return;

      const isMobile = window.innerWidth < 768;
      const w = mount.clientWidth;
      const h = mount.clientHeight;

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(w, h);
      renderer.autoClear = false;
      mount.appendChild(renderer.domElement);

      // ---- Scene A: full-screen shader quad ----
      const sceneBg = new THREE.Scene();
      const camBg = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

      const uniforms = {
        u_time: { value: 0 },
        u_res: { value: new THREE.Vector2(w, h) },
        u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
      };

      const fragment = `
        precision highp float;
        varying vec2 v_uv;
        uniform float u_time;
        uniform vec2 u_res;
        uniform vec2 u_mouse;

        // hash + value noise + fbm
        float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453123); }
        float noise(vec2 p){
          vec2 i=floor(p), f=fract(p);
          float a=hash(i), b=hash(i+vec2(1.,0.)), c=hash(i+vec2(0.,1.)), d=hash(i+vec2(1.,1.));
          vec2 u=f*f*(3.-2.*f);
          return mix(a,b,u.x)+(c-a)*u.y*(1.-u.x)+(d-b)*u.x*u.y;
        }
        float fbm(vec2 p){
          float v=0., a=0.5;
          for(int i=0;i<5;i++){ v+=a*noise(p); p*=2.0; a*=0.5; }
          return v;
        }

        void main(){
          vec2 uv = v_uv;
          float aspect = u_res.x / u_res.y;
          vec2 p = uv; p.x *= aspect;
          vec2 m = u_mouse; m.x *= aspect;

          float t = u_time * 0.05;
          vec2 q = vec2(fbm(p*2.0 + t), fbm(p*2.0 - t + 5.2));
          float flow = fbm(p*3.0 + q*1.6 + vec2(t*1.4, -t));

          // brand palette: near-black -> red -> amber
          vec3 black = vec3(0.020, 0.0, 0.020);
          vec3 red   = vec3(0.941, 0.196, 0.137);
          vec3 amber = vec3(0.969, 0.635, 0.231);

          vec3 col = mix(black, red, smoothstep(0.35, 0.85, flow));
          col = mix(col, amber, smoothstep(0.7, 1.0, flow) * 0.6);

          // mouse glow
          float d = distance(p, m);
          col += red * 0.25 * exp(-d*3.0);

          // vignette
          col *= 1.0 - 0.5 * distance(uv, vec2(0.5));
          gl_FragColor = vec4(col, 1.0);
        }
      `;
      const vertex = `
        varying vec2 v_uv;
        void main(){ v_uv = uv; gl_Position = vec4(position, 1.0); }
      `;

      const quadMat = new THREE.ShaderMaterial({
        uniforms,
        vertexShader: vertex,
        fragmentShader: fragment,
      });
      const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), quadMat);
      sceneBg.add(quad);

      // ---- Scene B: glass prisms ----
      const sceneFg = new THREE.Scene();
      const camFg = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
      camFg.position.set(0, 0, 10);

      sceneFg.add(new THREE.AmbientLight(0xffffff, 0.6));
      const key = new THREE.DirectionalLight(0xffffff, 1.4);
      key.position.set(5, 5, 5);
      sceneFg.add(key);
      const fill = new THREE.DirectionalLight(0xff5a3c, 0.6);
      fill.position.set(-5, -2, 4);
      sceneFg.add(fill);

      const glass = new THREE.MeshPhysicalMaterial({
        transmission: 0.9,
        roughness: 0.08,
        metalness: 0.0,
        thickness: 2.0,
        ior: 1.45,
        iridescence: 1.0,
        iridescenceIOR: 1.3,
        iridescenceThicknessRange: [120, 760],
        clearcoat: 1.0,
        clearcoatRoughness: 0.0,
        transparent: true,
        opacity: 0.9,
        side: THREE.DoubleSide,
        color: 0xffffff,
      });

      const prismA = new THREE.Mesh(new THREE.IcosahedronGeometry(1, 0), glass);
      prismA.scale.setScalar(1.8);
      prismA.position.set(-3.6, 1.4, 0);

      const prismB = new THREE.Mesh(new THREE.OctahedronGeometry(1, 0), glass);
      prismB.scale.setScalar(1.2);
      prismB.position.set(3.8, -1.8, 0.5);

      const prisms: import("three").Mesh[] = [];
      if (!isMobile) {
        sceneFg.add(prismA);
        sceneFg.add(prismB);
        prisms.push(prismA, prismB);
      }

      // ---- Interaction ----
      const mouse = { x: 0.5, y: 0.5 };
      const onMove = (e: PointerEvent) => {
        const rect = mount.getBoundingClientRect();
        mouse.x = (e.clientX - rect.left) / rect.width;
        mouse.y = 1.0 - (e.clientY - rect.top) / rect.height;
      };
      window.addEventListener("pointermove", onMove, { passive: true });
      cleanup.push(() => window.removeEventListener("pointermove", onMove));

      const onResize = () => {
        if (!mount) return;
        const nw = mount.clientWidth;
        const nh = mount.clientHeight;
        renderer.setSize(nw, nh);
        uniforms.u_res.value.set(nw, nh);
        camFg.aspect = nw / nh;
        camFg.updateProjectionMatrix();
      };
      window.addEventListener("resize", onResize);
      cleanup.push(() => window.removeEventListener("resize", onResize));

      const start = performance.now();
      const curMouse = new THREE.Vector2(0.5, 0.5);

      const renderFrame = () => {
        curMouse.x += (mouse.x - curMouse.x) * 0.05;
        curMouse.y += (mouse.y - curMouse.y) * 0.05;
        uniforms.u_mouse.value.copy(curMouse);
        if (!reduceMotion) {
          uniforms.u_time.value = (performance.now() - start) / 1000;
          prisms.forEach((m) => {
            m.rotation.x += 0.0025;
            m.rotation.y += 0.004;
          });
        }
        renderer.clear();
        renderer.render(sceneBg, camBg);
        renderer.clearDepth();
        renderer.render(sceneFg, camFg);
      };

      const tick = () => {
        if (disposed) return;
        renderFrame();
        frameId = requestAnimationFrame(tick);
      };

      if (reduceMotion) {
        renderFrame(); // single static frame
      } else {
        tick();
      }

      cleanup.push(() => {
        if (frameId !== null) cancelAnimationFrame(frameId);
        quadMat.dispose();
        quad.geometry.dispose();
        glass.dispose();
        prismA.geometry.dispose();
        prismB.geometry.dispose();
        renderer.dispose();
        if (renderer.domElement.parentElement === mount) {
          mount.removeChild(renderer.domElement);
        }
      });
    })();

    return () => {
      disposed = true;
      cleanup.forEach((fn) => fn());
    };
  }, []);

  return <div ref={mountRef} className="hero-shader" aria-hidden="true" />;
}
```

- [ ] **Step 2: Append `.hero-shader` style to `app/globals.css`**

```css
.hero-shader {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}
.hero-shader canvas { width: 100% !important; height: 100% !important; }
```

- [ ] **Step 3: Verify lint + types**

Run: `npm run lint && npx tsc --noEmit`
Expected: no errors. (Note the `import("three").Mesh` type annotation keeps the array typed without a top-level three import.)

- [ ] **Step 4: Commit**

```bash
git add components/HeroShader.tsx app/globals.css
git commit -m "feat(hero): brand-tinted WebGL flow shader with glass prisms"
```

---

### Task 4: Service marquee with hover pause + frosted reveal

**Files:**
- Create: `components/HeroMarquee.tsx`
- Modify: `app/globals.css` (append marquee styles)

- [ ] **Step 1: Create `components/HeroMarquee.tsx`**

Uses tasteful Unsplash images via plain `<img>` (no `next/image` remote config needed). The data model carries an optional `video` field so real service videos can be dropped in later without markup changes.

```tsx
import * as React from "react";

type Service = { num: string; name: string; img: string; video?: string };

const SERVICES: Service[] = [
  {
    num: "01",
    name: "UI/UX Design",
    img: "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=600&q=80",
  },
  {
    num: "02",
    name: "Web Development",
    img: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?auto=format&fit=crop&w=600&q=80",
  },
  {
    num: "03",
    name: "Brand Identity",
    img: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=600&q=80",
  },
  {
    num: "04",
    name: "Growth Ops",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
  },
  {
    num: "05",
    name: "Content Strategy",
    img: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=600&q=80",
  },
];

function Tile({ s, dup }: { s: Service; dup?: boolean }) {
  return (
    <div className="hero-strip" aria-hidden={dup ? "true" : undefined}>
      {s.video ? (
        <video
          className="hero-strip-media"
          src={s.video}
          poster={s.img}
          muted
          loop
          autoPlay
          playsInline
        />
      ) : (
        <img className="hero-strip-media" src={s.img} alt="" loading="lazy" />
      )}
      <div className="hero-strip-frost">
        <span className="hero-strip-num">{s.num}</span>
        <span className="hero-strip-name">{s.name}</span>
      </div>
    </div>
  );
}

export default function HeroMarquee() {
  return (
    <div className="hero-strips" aria-label="Our services">
      <div className="hero-strips-track">
        {SERVICES.map((s) => (
          <Tile key={s.num} s={s} />
        ))}
        {SERVICES.map((s) => (
          <Tile key={`dup-${s.num}`} s={s} dup />
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Append marquee styles to `app/globals.css`**

```css
/* =========================================================================
   HERO SERVICE STRIPS — Bungee-style marquee + frosted hover reveal
   ========================================================================= */
.hero-strips {
  position: relative;
  z-index: 2;
  width: 100%;
  overflow: hidden;
  padding-bottom: 0;
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
  mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
}
.hero-strips-track {
  display: flex;
  gap: 14px;
  align-items: flex-end;
  width: max-content;
  padding: 0 7px;
  animation: heroStripScroll 38s linear infinite;
}
.hero-strips:hover .hero-strips-track { animation-play-state: paused; }
@keyframes heroStripScroll {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

.hero-strip {
  position: relative;
  flex: 0 0 auto;
  width: clamp(120px, 12vw, 180px);
  height: clamp(150px, 20vh, 240px);
  border-radius: 20px 20px 0 0;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: box-shadow 0.4s var(--ease-smooth), transform 0.4s var(--ease-smooth);
}
.hero-strip-media {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.hero-strip-frost {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  text-align: center;
  color: #fff;
  background: rgba(20, 4, 4, 0.45);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  opacity: 0;
  transition: opacity 0.4s var(--ease-smooth);
}
.hero-strip-num {
  font-size: 11px;
  letter-spacing: 0.1em;
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 999px;
  padding: 2px 9px;
}
.hero-strip-name {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: clamp(0.9rem, 1.1vw, 1.15rem);
}
.hero-strip:hover {
  transform: translateY(-6px);
  box-shadow: 0 -10px 50px rgba(240, 50, 35, 0.55);
  border-color: rgba(240, 50, 35, 0.6);
}
.hero-strip:hover .hero-strip-frost { opacity: 1; }

@media (prefers-reduced-motion: reduce) {
  .hero-strips-track { animation: none; }
  .hero-strip, .hero-strip-frost { transition: none; }
}
```

Note: when a real `video` src is later added, pausing on hover needs a small `onMouseEnter`/`onMouseLeave` handler calling `el.pause()`/`el.play()`. With images now, no JS is required — leave a `// TODO(video): pause on hover` comment is NOT allowed in code; instead this is documented here in the plan only.

- [ ] **Step 3: Verify lint + types**

Run: `npm run lint && npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add components/HeroMarquee.tsx app/globals.css
git commit -m "feat(hero): service marquee with frosted hover reveal"
```

---

### Task 5: Compose the hero + neomorphic CTA

**Files:**
- Rewrite: `components/Hero.tsx`
- Modify: `app/globals.css` (append neomorphic CTA style)

- [ ] **Step 1: Rewrite `components/Hero.tsx`**

```tsx
import * as React from "react";
import { DotGridArrow } from "./Icons";
import HeroHeadline from "./HeroHeadline";
import HeroShader from "./HeroShader";
import HeroMarquee from "./HeroMarquee";

export default function Hero() {
  return (
    <section className="hero hero--monument" id="top" aria-label="Hero">
      <HeroShader />
      <div className="hero-monument-wrap">
        <HeroHeadline />
        <a className="hero-cta-neo" href="#contact">
          Start a project
          <DotGridArrow />
        </a>
      </div>
      <HeroMarquee />
    </section>
  );
}
```

This removes the old eyebrow, side social rail, and paragraph sub (all hero-only). The `DotGridArrow` import is unchanged.

- [ ] **Step 2: Append neomorphic CTA style to `app/globals.css`**

```css
.hero-cta-neo {
  margin-top: 30px;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 15px;
  color: #fff;
  padding: 14px 26px;
  border-radius: 16px;
  background: linear-gradient(145deg, #161118, #0b0809);
  box-shadow:
    -6px -6px 16px rgba(255, 255, 255, 0.04),
    6px 6px 18px rgba(0, 0, 0, 0.7),
    inset 0 0 0 1px rgba(255, 255, 255, 0.06);
  transition: box-shadow 0.3s var(--ease-smooth), transform 0.3s var(--ease-smooth);
}
.hero-cta-neo:hover {
  transform: translateY(-2px);
  box-shadow:
    -4px -4px 12px rgba(255, 255, 255, 0.05),
    8px 8px 22px rgba(0, 0, 0, 0.75),
    0 0 26px rgba(240, 50, 35, 0.4),
    inset 0 0 0 1px rgba(240, 50, 35, 0.4);
}
.hero-cta-neo .arrow { transition: transform 0.3s var(--ease-smooth); }
.hero-cta-neo:hover .arrow { transform: translateX(4px); }
@media (prefers-reduced-motion: reduce) { .hero-cta-neo { transition: none; } }
```

- [ ] **Step 3: Full visual verification on dev server**

On `http://localhost:3000` confirm all together: shader animating behind, two glass prisms drifting, centered wordmark with glow, hover-pills blooming icons, neomorphic CTA, and the service marquee scrolling + pausing + frosting on hover. Resize to mobile width and confirm prisms drop and layout holds. Toggle OS "reduce motion" and confirm animations freeze.

- [ ] **Step 4: Verify lint + types**

Run: `npm run lint && npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add components/Hero.tsx app/globals.css
git commit -m "feat(hero): compose monument hero with neomorphic CTA"
```

---

### Task 6: Production build verification

**Files:** none (verification only)

- [ ] **Step 1: Build**

Run: `npm run build`
Expected: build completes with no errors and the `/` route is generated.

- [ ] **Step 2: Smoke-test the production server**

Run: `npm run start` then open `http://localhost:3000`.
Expected: hero renders identically to dev; no console errors related to three.js / shader compilation.

- [ ] **Step 3: Final commit (only if build surfaced fixes)**

```bash
git add -A
git commit -m "chore(hero): build verification fixes"
```

(If the build was clean with nothing to change, skip this commit.)

---

## Self-review

**Spec coverage:**
- Centered monument layout → Task 1, Task 5
- Brand palette (#F03223 / #050005 / #E1E1E1 + warm tones) → Task 1 tokens, used in Tasks 2-5
- Wordmark with red ® + glow → Task 2
- Hover-pill subtitle (Arounda effect), liquid glass + glow, warm accents → Task 2
- GL flow shader, brand-tinted, mouse-reactive → Task 3
- Subtle floating glass prisms (kept per request) → Task 3
- Marquee service strips, Bungee-style infinite scroll → Task 4
- Per-tile media (image now, video-ready) → Task 4
- Hover: pause marquee + frosted glass + reveal + glow → Task 4
- Neomorphic CTA → Task 5
- reduced-motion + mobile handling → Tasks 2, 3, 4, 5
- Scope guardrails (no other sections/renames) → respected throughout; global `Nav` intentionally left untouched (its `.nav-pill` is already a blurred dark glass pill, so the "glass nav" intent is already met without risking other sections)

**Placeholder scan:** No "TBD/TODO" left in code. The video-pause extension is documented in the plan prose only (Task 4 Step 2), not as a code placeholder.

**Type consistency:** `Service` type fields (`num`, `name`, `img`, `video?`) are consistent between the data array and `Tile`. `Accent` union (`red`/`amber`/`coral`) matches the `accent-*` CSS classes. Class names referenced in CSS (`hero-shader`, `hero-wordmark`, `hero-pill`, `hero-pill-icon i1/i2/i3`, `hero-strips`, `hero-strips-track`, `hero-strip`, `hero-strip-frost`, `hero-cta-neo`) all match their component usages.

**Deviation from spec:** The spec listed restyling the nav to liquid glass. The existing global `Nav` (`.nav-pill`) already uses `rgba(8,8,8,0.85)` + `backdrop-filter: blur(24px)` — effectively a glass pill — and it renders over every section, so restyling it risks UI changes elsewhere (violates the minimal-change rule). It is therefore left untouched. Flag for the user if they want a dedicated hero-only glass nav treatment.

---

## Execution Handoff

Plan complete. Choose execution approach when ready:
1. **Subagent-Driven (recommended)** — fresh subagent per task with review between tasks.
2. **Inline Execution** — execute tasks in this session with checkpoints.
