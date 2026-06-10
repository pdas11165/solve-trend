"use client";

import * as React from "react";

/**
 * "Pulse Grid" — interactive dot-grid ripple section background.
 *
 * A full-bleed grid of brand dots (the dot-grid motif from the logo / CTA /
 * nav icons) rendered as GPU points with a custom shader. Moving the cursor
 * fires expanding ripple waves through the grid: dots displace outward,
 * swell, and heat up to brand red along the wavefront, then settle back to a
 * quiet warm-gray graph-paper texture. Ambient waves fire on their own every
 * few seconds so the section is alive even without a cursor (and on touch,
 * taps fire ripples).
 *
 * - All motion is computed in the vertex shader from a small ring buffer of
 *   wave sources (position + start time + strength) — a few thousand dots
 *   cost almost nothing.
 * - The host `.pulse-grid` element is mask-faded at its top and bottom edges
 *   (globals.css) so the grid dissolves in and out instead of cutting off.
 * - Dots fade slightly (never fully) behind the section heading.
 * - prefers-reduced-motion: renders one static grid frame, no rAF.
 * - Pauses when scrolled out of view.
 * - Fails safe: no WebGL -> leaves the plain CSS background.
 */

const MAX_WAVES = 12;

export default function PulseGrid() {
  const mountRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let disposed = false;
    const cleanup: Array<() => void> = [];

    (async () => {
      let THREE: typeof import("three");
      try {
        THREE = await import("three");
      } catch {
        return;
      }
      if (disposed) return;

      let renderer: import("three").WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      } catch {
        return; // no WebGL — keep the plain background
      }

      let w = mount.clientWidth || window.innerWidth;
      let h = mount.clientHeight || window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      renderer.setPixelRatio(dpr);
      renderer.setSize(w, h);
      renderer.setClearColor(0x000000, 0);
      mount.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      // pixel-space ortho camera, y down — pointer coords map 1:1
      const camera = new THREE.OrthographicCamera(0, w, 0, h, -10, 10);

      const uniforms = {
        uTime: { value: 0 },
        uDPR: { value: dpr },
        uMouse: { value: new THREE.Vector2(-9999, -9999) },
        uMouseActive: { value: 0 },
        uWaves: {
          value: Array.from(
            { length: MAX_WAVES },
            () => new THREE.Vector4(0, 0, -1000, 0)
          ),
        },
        uCenter: { value: new THREE.Vector2(w * 0.5, Math.min(h * 0.25, 340)) },
        uRadii: { value: new THREE.Vector2(w * 0.36, Math.min(h * 0.25, 320)) },
        uColorBase: { value: new THREE.Color(0x9a9088) }, // warm gray
        uColorHot: { value: new THREE.Color(0xf03223) }, // brand red
      };

      const material = new THREE.ShaderMaterial({
        uniforms,
        transparent: true,
        depthWrite: false,
        depthTest: false,
        vertexShader: /* glsl */ `
          uniform float uTime;
          uniform float uDPR;
          uniform vec2  uMouse;
          uniform float uMouseActive;
          uniform vec4  uWaves[${MAX_WAVES}];
          uniform vec2  uCenter;
          uniform vec2  uRadii;
          attribute float aSeed;
          varying float vHeat;
          varying float vFade;

          void main() {
            vec2 p = position.xy;

            // ambient: two slow crossed waves keep the grid breathing
            float ambient =
              sin(p.x * 0.011 + uTime * 0.7) *
              sin(p.y * 0.013 - uTime * 0.55) * 0.5 + 0.5;

            float excite = 0.0;
            vec2 disp = vec2(0.0);

            // expanding ripple rings from recent pointer activity
            for (int i = 0; i < ${MAX_WAVES}; i++) {
              vec4 wv = uWaves[i];
              float age = uTime - wv.z;
              if (age < 0.0 || age > 3.5) continue;
              float d = distance(p, wv.xy);
              float ring = age * 340.0;                  // wavefront radius px
              float band = exp(-pow(d - ring, 2.0) / 7200.0); // ~60px wide
              float a = band * exp(-age * 1.5) * wv.w;
              excite += a;
              vec2 dir = d > 0.001 ? (p - wv.xy) / d : vec2(0.0);
              disp += dir * a * 16.0;
            }

            // soft bulge directly under the cursor
            float prox = 0.0;
            if (uMouseActive > 0.5) {
              float dm = distance(p, uMouse);
              prox = exp(-dm * dm / 16200.0); // sigma ~90px
              vec2 dirm = dm > 0.001 ? (p - uMouse) / dm : vec2(0.0);
              disp += dirm * prox * 12.0;
            }

            float heat = clamp(excite + prox * 0.8, 0.0, 1.0);
            vHeat = heat;

            // keep the heading zone calmer, never invisible
            vec2 q = (p - uCenter) / uRadii;
            vFade = mix(0.45, 1.0, smoothstep(0.65, 1.2, length(q)));

            vec4 mv = modelViewMatrix * vec4(p + disp, 0.0, 1.0);
            gl_Position = projectionMatrix * mv;

            float radius = (1.3 + ambient * 0.55 + heat * 3.2)
                         * (0.85 + aSeed * 0.3);
            gl_PointSize = radius * 2.0 * uDPR;
          }
        `,
        fragmentShader: /* glsl */ `
          precision highp float;
          uniform vec3 uColorBase;
          uniform vec3 uColorHot;
          varying float vHeat;
          varying float vFade;

          void main() {
            vec2 c = gl_PointCoord - 0.5;
            float edge = 1.0 - smoothstep(0.34, 0.5, length(c));
            if (edge < 0.01) discard;
            vec3 col = mix(uColorBase, uColorHot, vHeat);
            float alpha = mix(0.34, 0.95, vHeat) * vFade * edge;
            gl_FragColor = vec4(col, alpha);
          }
        `,
      });

      let points: import("three").Points | null = null;

      const buildGrid = () => {
        if (points) {
          scene.remove(points);
          points.geometry.dispose();
        }
        const spacing = w < 768 ? 26 : 22;
        const cols = Math.ceil(w / spacing) + 1;
        const rows = Math.ceil(h / spacing) + 1;
        const count = cols * rows;
        const positions = new Float32Array(count * 3);
        const seeds = new Float32Array(count);
        let k = 0;
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            positions[k * 3] = c * spacing;
            positions[k * 3 + 1] = r * spacing;
            positions[k * 3 + 2] = 0;
            seeds[k] = Math.random();
            k++;
          }
        }
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute(
          "position",
          new THREE.BufferAttribute(positions, 3)
        );
        geometry.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
        points = new THREE.Points(geometry, material);
        points.frustumCulled = false;
        scene.add(points);
      };
      buildGrid();

      // ---- wave ring buffer ----
      let waveIdx = 0;
      const now = () => performance.now() / 1000;
      const fireWave = (x: number, y: number, strength: number) => {
        const v = uniforms.uWaves.value[waveIdx];
        v.set(x, y, now(), strength);
        waveIdx = (waveIdx + 1) % MAX_WAVES;
        lastWaveAt = now();
      };
      let lastWaveAt = -10;

      // ---- pointer ----
      let lastSpawn = { x: -9999, y: -9999 };
      const onMove = (e: PointerEvent) => {
        const rect = renderer.domElement.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const inside =
          x >= -40 && x <= rect.width + 40 && y >= -40 && y <= rect.height + 40;
        uniforms.uMouseActive.value = inside ? 1 : 0;
        if (!inside) return;
        uniforms.uMouse.value.set(x, y);
        // trailing ripples while sweeping
        const dx = x - lastSpawn.x;
        const dy = y - lastSpawn.y;
        if (dx * dx + dy * dy > 70 * 70) {
          fireWave(x, y, 0.7);
          lastSpawn = { x, y };
        }
      };
      const onDown = (e: PointerEvent) => {
        const rect = renderer.domElement.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        if (y >= 0 && y <= rect.height) fireWave(x, y, 1.5);
      };
      const onLeaveWin = () => {
        uniforms.uMouseActive.value = 0;
      };

      const onResize = () => {
        const nw = mount.clientWidth || window.innerWidth;
        const nh = mount.clientHeight || window.innerHeight;
        if (nw === w && nh === h) return;
        w = nw;
        h = nh;
        renderer.setSize(w, h);
        camera.right = w;
        camera.bottom = h;
        camera.updateProjectionMatrix();
        uniforms.uCenter.value.set(w * 0.5, Math.min(h * 0.25, 340));
        uniforms.uRadii.value.set(w * 0.36, Math.min(h * 0.25, 320));
        buildGrid();
      };
      // the host section grows as images/fonts load — track its real size
      const ro = new ResizeObserver(onResize);
      ro.observe(mount);
      cleanup.push(() => ro.disconnect());

      // ---- loop ----
      let frameId: number | null = null;
      let running = false;
      const tick = () => {
        if (!running) return;
        const t = now();
        uniforms.uTime.value = t;
        // ambient ripple when idle so the grid is alive without a cursor
        if (t - lastWaveAt > 2.4) {
          fireWave(
            w * (0.15 + Math.random() * 0.7),
            h * (0.15 + Math.random() * 0.7),
            0.55
          );
        }
        renderer.render(scene, camera);
        frameId = requestAnimationFrame(tick);
      };
      const start = () => {
        if (running || reduceMotion) return;
        running = true;
        frameId = requestAnimationFrame(tick);
      };
      const stop = () => {
        running = false;
        if (frameId !== null) cancelAnimationFrame(frameId);
        frameId = null;
      };

      if (reduceMotion) {
        uniforms.uTime.value = 0;
        renderer.render(scene, camera); // static grid
      } else {
        start();
        window.addEventListener("pointermove", onMove, { passive: true });
        window.addEventListener("pointerdown", onDown, { passive: true });
        window.addEventListener("pointerout", onLeaveWin, { passive: true });
        cleanup.push(() => {
          window.removeEventListener("pointermove", onMove);
          window.removeEventListener("pointerdown", onDown);
          window.removeEventListener("pointerout", onLeaveWin);
        });
      }
      window.addEventListener("resize", onResize);
      cleanup.push(() => window.removeEventListener("resize", onResize));

      const io = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) start();
        else stop();
      });
      io.observe(mount);
      cleanup.push(() => io.disconnect());

      cleanup.push(() => {
        stop();
        points?.geometry.dispose();
        material.dispose();
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

  return <div ref={mountRef} className="pulse-grid" aria-hidden="true" />;
}
