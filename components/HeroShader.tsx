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

          vec3 black = vec3(0.020, 0.0, 0.020);
          vec3 red   = vec3(0.941, 0.196, 0.137);
          vec3 amber = vec3(0.969, 0.635, 0.231);

          vec3 col = mix(black, red, smoothstep(0.35, 0.85, flow));
          col = mix(col, amber, smoothstep(0.7, 1.0, flow) * 0.6);

          float d = distance(p, m);
          col += red * 0.25 * exp(-d*3.0);

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
        renderFrame();
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
