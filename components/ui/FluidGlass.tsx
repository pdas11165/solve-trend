/* eslint-disable react/no-unknown-property */
"use client";

import "@/lib/suppress-three-clock-warning";
import * as THREE from "three";
import { useRef, useEffect, memo, useState, type ReactNode } from "react";
import { createPortal, useFrame, useThree } from "@react-three/fiber";
import { useFBO, useGLTF, MeshTransmissionMaterial } from "@react-three/drei";
import { easing } from "maath";
import { assetPath } from "@/lib/asset-path";

const LENS_GLB = assetPath("/assets/3d/lens.glb");

export type LensModeProps = {
  scale?: number;
  ior?: number;
  thickness?: number;
  chromaticAberration?: number;
  anisotropy?: number;
  transmission?: number;
  roughness?: number;
  color?: string;
  [key: string]: unknown;
};

type ModeWrapperProps = {
  children?: ReactNode;
  glb: string;
  geometryKey: string;
  lockToBottom?: boolean;
  followPointer?: boolean;
  modeProps?: LensModeProps;
};

export const ModeWrapper = memo(function ModeWrapper({
  children,
  glb,
  geometryKey,
  lockToBottom = false,
  followPointer = true,
  modeProps = {},
}: ModeWrapperProps) {
  const ref = useRef<THREE.Mesh>(null);
  const { nodes } = useGLTF(glb);
  const buffer = useFBO();
  const { viewport: vp } = useThree();
  const [scene] = useState(() => new THREE.Scene());
  const geoWidthRef = useRef(1);

  useEffect(() => {
    const node = nodes[geometryKey] as THREE.Mesh | undefined;
    const geo = node?.geometry;
    if (!geo) return;
    geo.computeBoundingBox();
    geoWidthRef.current =
      (geo.boundingBox?.max.x ?? 0) - (geo.boundingBox?.min.x ?? 0) || 1;
  }, [nodes, geometryKey]);

  useFrame((state, delta) => {
    const { gl, viewport, pointer, camera } = state;
    const v = viewport.getCurrentViewport(camera, [0, 0, 15]);

    const destX = followPointer ? (pointer.x * v.width) / 2 : 0;
    const destY = lockToBottom
      ? -v.height / 2 + 0.2
      : followPointer
        ? (pointer.y * v.height) / 2
        : 0;

    if (ref.current) {
      easing.damp3(ref.current.position, [destX, destY, 15], 0.15, delta);

      if (modeProps.scale == null) {
        const maxWorld = v.width * 0.9;
        const desired = maxWorld / geoWidthRef.current;
        ref.current.scale.setScalar(Math.min(0.15, desired));
      }
    }

    gl.setRenderTarget(buffer);
    gl.setClearColor(0x000000, 0);
    gl.clear();
    gl.render(scene, camera);
    gl.setRenderTarget(null);
  });

  const { scale, ior, thickness, anisotropy, chromaticAberration, ...extraMat } =
    modeProps;

  const geometry = (nodes[geometryKey] as THREE.Mesh | undefined)?.geometry;

  return (
    <>
      {createPortal(children, scene)}
      <mesh scale={[vp.width, vp.height, 1]}>
        <planeGeometry />
        <meshBasicMaterial map={buffer.texture} transparent toneMapped={false} />
      </mesh>
      {geometry && (
        <mesh
          ref={ref}
          scale={scale ?? 0.15}
          rotation-x={Math.PI / 2}
          geometry={geometry}
        >
          <MeshTransmissionMaterial
            buffer={buffer.texture}
            ior={ior ?? 1.15}
            thickness={thickness ?? 5}
            anisotropy={anisotropy ?? 0.01}
            chromaticAberration={chromaticAberration ?? 0.1}
            {...extraMat}
          />
        </mesh>
      )}
    </>
  );
});

type LensProps = {
  children?: ReactNode;
  modeProps?: LensModeProps;
  followPointer?: boolean;
};

export function Lens({ modeProps = {}, followPointer = true, children }: LensProps) {
  return (
    <ModeWrapper
      glb={LENS_GLB}
      geometryKey="Cylinder"
      followPointer={followPointer}
      modeProps={modeProps}
    >
      {children}
    </ModeWrapper>
  );
}

useGLTF.preload(LENS_GLB);
