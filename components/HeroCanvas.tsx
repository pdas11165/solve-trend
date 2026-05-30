"use client";

import * as React from "react";

/**
 * Hero 3D Glass Prisms — Aeruk-style chromatic glass.
 * MeshPhysicalMaterial w/ transmission + iridescence + HDR env map.
 * Auto-rotate per frame + mouse lerp parallax.
 *
 * Renders nothing on prefers-reduced-motion or mobile <768px (the canvas itself
 * still mounts but we hide the smaller prisms and reduce canvas width).
 */
export default function HeroCanvas() {
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
      const { HDRLoader } = await import(
        "three/examples/jsm/loaders/HDRLoader.js"
      );
      if (disposed) return;

      const isMobile = window.innerWidth < 768;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        45,
        mount.clientWidth / mount.clientHeight,
        0.1,
        100
      );
      camera.position.set(0, 0, 10);

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.1;
      mount.appendChild(renderer.domElement);

      // Lights — used both as base and as fallback if HDR fails
      const ambient = new THREE.AmbientLight(0xffffff, 0.55);
      scene.add(ambient);
      const key = new THREE.DirectionalLight(0xffffff, 1.6);
      key.position.set(5, 5, 5);
      scene.add(key);
      const fill = new THREE.DirectionalLight(0xff7a5c, 0.6);
      fill.position.set(-5, -2, 4);
      scene.add(fill);

      const pmrem = new THREE.PMREMGenerator(renderer);
      pmrem.compileEquirectangularShader();

      // Try to load HDR. If it fails (offline / blocked), keep going with lights.
      try {
        const hdr = new HDRLoader();
        hdr.load(
          "https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/studio_small_08_1k.hdr",
          (hdrTexture) => {
            const envMap = pmrem.fromEquirectangular(hdrTexture).texture;
            scene.environment = envMap;
            hdrTexture.dispose();
            pmrem.dispose();
          },
          undefined,
          () => {
            /* swallow HDR error — lights still illuminate */
          }
        );
      } catch {
        /* ignore */
      }

      const glass = new THREE.MeshPhysicalMaterial({
        transmission: 1.0,
        roughness: 0.0,
        metalness: 0.0,
        thickness: 2.5,
        ior: 1.5,
        reflectivity: 0.5,
        iridescence: 1.0,
        iridescenceIOR: 1.3,
        iridescenceThicknessRange: [100, 800],
        envMapIntensity: 2.0,
        side: THREE.DoubleSide,
        clearcoat: 1.0,
        clearcoatRoughness: 0.0,
        color: 0xffffff,
      });

      // Large prism (center-right)
      const large = new THREE.Mesh(
        new THREE.IcosahedronGeometry(1, 0),
        glass
      );
      large.scale.setScalar(2.5);
      large.position.set(2.2, -0.2, 0);
      scene.add(large);

      // Medium prism (upper-left)
      const medium = new THREE.Mesh(
        new THREE.OctahedronGeometry(1, 0),
        glass
      );
      medium.scale.setScalar(1.5);
      medium.position.set(-3.0, 1.4, 1.5);
      if (!isMobile) scene.add(medium);

      // Small prism (lower-right)
      const small = new THREE.Mesh(
        new THREE.IcosahedronGeometry(1, 0),
        glass
      );
      small.scale.setScalar(1.0);
      small.position.set(3.5, -2.0, 1.8);
      if (!isMobile) scene.add(small);

      // Pointer parallax
      const mouse = { x: 0.5, y: 0.5 };
      const targetRot = { x: 0, y: 0 };
      const currentRot = { x: 0, y: 0 };
      const onMove = (e: PointerEvent) => {
        const rect = mount.getBoundingClientRect();
        mouse.x = (e.clientX - rect.left) / rect.width;
        mouse.y = (e.clientY - rect.top) / rect.height;
      };
      window.addEventListener("pointermove", onMove, { passive: true });
      cleanup.push(() => window.removeEventListener("pointermove", onMove));

      const onResize = () => {
        if (!mount) return;
        camera.aspect = mount.clientWidth / mount.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(mount.clientWidth, mount.clientHeight);
      };
      window.addEventListener("resize", onResize);
      cleanup.push(() => window.removeEventListener("resize", onResize));

      const meshes = [large, medium, small];

      const tick = () => {
        if (disposed) return;
        if (!reduceMotion) {
          meshes.forEach((m) => {
            m.rotation.x += 0.003;
            m.rotation.y += 0.005;
          });
          targetRot.x = (mouse.y - 0.5) * 0.3;
          targetRot.y = (mouse.x - 0.5) * 0.3;
          currentRot.x += (targetRot.x - currentRot.x) * 0.05;
          currentRot.y += (targetRot.y - currentRot.y) * 0.05;
          scene.rotation.x = currentRot.x;
          scene.rotation.y = currentRot.y;
        }
        renderer.render(scene, camera);
        frameId = requestAnimationFrame(tick);
      };
      tick();

      cleanup.push(() => {
        if (frameId !== null) cancelAnimationFrame(frameId);
        renderer.dispose();
        glass.dispose();
        meshes.forEach((m) => {
          m.geometry.dispose();
        });
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

  return <div ref={mountRef} className="hero-canvas" aria-hidden="true" />;
}
