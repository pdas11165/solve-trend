/* eslint-disable react/no-unknown-property */
"use client";

import "@/lib/suppress-three-clock-warning";
import * as THREE from "three";
import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Image } from "@react-three/drei";
import { Lens, type LensModeProps } from "./FluidGlass";
import {
  pixelTargetToWorld,
  type ArcTarget,
  IMG_WIDTH,
  IMG_HEIGHT,
} from "./intro-arc-utils";

type StudyImage = { id: string; image: string };

type ArcCardImagesProps = {
  studies: StudyImage[];
  targets: ArcTarget[];
  containerSize: { width: number; height: number };
  activeIndex: number | null;
};

function ArcCardImages({
  studies,
  targets,
  containerSize,
  activeIndex,
}: ArcCardImagesProps) {
  const groupRefs = useRef<(THREE.Group | null)[]>([]);
  const { viewport } = useThree();

  useFrame(() => {
    if (!containerSize.width || !containerSize.height) return;

    targets.forEach((target, i) => {
      const group = groupRefs.current[i];
      if (!group) return;

      const isSiblingActive =
        activeIndex !== null && activeIndex !== i;
      const isActive = activeIndex === i;
      const opacity = isActive
        ? 0
        : isSiblingActive
          ? 0.35 * target.opacity
          : target.opacity;

      const { wx, wy, cardWorldW, cardWorldH } = pixelTargetToWorld(
        target,
        containerSize,
        viewport,
      );

      group.position.set(wx, wy, 0);
      group.rotation.z = (target.rotation * Math.PI) / 180;
      group.scale.set(
        cardWorldW / (IMG_WIDTH / 100),
        cardWorldH / (IMG_HEIGHT / 100),
        1,
      );
      group.visible = opacity > 0.02;

      group.traverse((child) => {
        if ("material" in child && child.material) {
          const mat = child.material as THREE.Material & { opacity?: number };
          if (typeof mat.opacity === "number") {
            mat.opacity = opacity;
            mat.transparent = true;
          }
        }
      });
    });
  });

  return (
    <>
      {studies.map((study, i) => (
        <group
          key={study.id}
          ref={(el) => {
            groupRefs.current[i] = el;
          }}
        >
          <Image
            url={study.image}
            scale={[IMG_WIDTH / 100, IMG_HEIGHT / 100]}
            toneMapped={false}
          />
        </group>
      ))}
    </>
  );
}

type ArcFluidGlassSceneProps = {
  studies: StudyImage[];
  targets: ArcTarget[];
  containerSize: { width: number; height: number };
  activeIndex: number | null;
  lensProps: LensModeProps;
  isMobile: boolean;
};

function ArcFluidGlassScene({
  studies,
  targets,
  containerSize,
  activeIndex,
  lensProps,
  isMobile,
}: ArcFluidGlassSceneProps) {
  return (
    <Lens
      followPointer
      modeProps={{
        scale: isMobile ? 0.16 : 0.22,
        ior: 1.15,
        thickness: 5,
        chromaticAberration: 0.08,
        anisotropy: 0.01,
        ...lensProps,
      }}
    >
      <ArcCardImages
        studies={studies}
        targets={targets}
        containerSize={containerSize}
        activeIndex={activeIndex}
      />
    </Lens>
  );
}

type ArcFluidGlassCanvasProps = {
  studies: StudyImage[];
  targets: ArcTarget[];
  containerSize: { width: number; height: number };
  activeIndex: number | null;
  visible: boolean;
  lensProps?: LensModeProps;
  onError?: () => void;
};

export default function ArcFluidGlassCanvas({
  studies,
  targets,
  containerSize,
  activeIndex,
  visible,
  lensProps = {},
  onError,
}: ArcFluidGlassCanvasProps) {
  const isMobile = containerSize.width > 0 && containerSize.width < 768;

  return (
    <div
      className="arc-fluid-glass-layer"
      style={{ opacity: visible ? 1 : 0 }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 20], fov: 15 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener("webglcontextlost", (e) => {
            e.preventDefault();
            onError?.();
          });
        }}
      >
        <ArcFluidGlassScene
          studies={studies}
          targets={targets}
          containerSize={containerSize}
          activeIndex={activeIndex}
          lensProps={lensProps}
          isMobile={isMobile}
        />
      </Canvas>
    </div>
  );
}
