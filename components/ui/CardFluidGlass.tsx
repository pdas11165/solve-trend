/* eslint-disable react/no-unknown-property */
"use client";

import "@/lib/suppress-three-clock-warning";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { Image } from "@react-three/drei";
import { Lens, type LensModeProps } from "./FluidGlass";

type CardFluidGlassSceneProps = {
  image: string;
  lensProps?: LensModeProps;
};

function CardFluidGlassScene({ image, lensProps = {} }: CardFluidGlassSceneProps) {
  return (
    <Lens
      followPointer
      modeProps={{
        scale: 0.48,
        ior: 1.18,
        thickness: 5,
        chromaticAberration: 0.12,
        anisotropy: 0.01,
        ...lensProps,
      }}
    >
      <Image url={image} scale={[3.2, 2.2]} position={[0, 0, 0]} toneMapped={false} />
    </Lens>
  );
}

type CardFluidGlassProps = {
  image: string;
  onError?: () => void;
};

export default function CardFluidGlass({ image, onError }: CardFluidGlassProps) {
  return (
    <div className="intro-glass-media-canvas">
      <Canvas
        camera={{ position: [0, 0, 20], fov: 15 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener("webglcontextlost", (e) => {
            e.preventDefault();
            onError?.();
          });
        }}
      >
        <CardFluidGlassScene image={image} />
      </Canvas>
    </div>
  );
}
