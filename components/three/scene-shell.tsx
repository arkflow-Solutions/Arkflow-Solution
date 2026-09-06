"use client";

import { useRef, useMemo } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";

/**
 * Scene shell shared by every ArkFlow 3D section.
 *
 * Performance contract (AMENDMENTS-v1.2):
 *  - `frameloop="demand"` unless the section is in view. An offscreen
 *    canvas costs nothing.
 *  - No textures, no HDR environment, no shadow maps. Lighting is three
 *    lights and an emissive palette; the look comes from art direction,
 *    not from assets.
 *  - dpr capped so a high-density phone doesn't render at 3x.
 */

export function SceneShell({
  children,
  active,
  lite = false,
  className,
}: {
  children: React.ReactNode;
  /** Section is in view. When false, rendering stops entirely. */
  active: boolean;
  /** Phone profile: lower dpr, no antialias, battery-friendly GPU hint. */
  lite?: boolean;
  className?: string;
}) {
  return (
    <Canvas
      className={className}
      frameloop={active ? "always" : "never"}
      dpr={lite ? [1, 1.25] : [1, 1.6]}
      gl={{
        antialias: !lite,
        powerPreference: lite ? "default" : "high-performance",
        alpha: true,
      }}
      camera={{
        fov: lite ? 36 : 28,
        near: 0.1,
        far: 80,
        position: lite ? [4.2, 2.8, 10] : [3.5, 2.4, 8.5],
      }}
    >
      <Lighting />
      <GroundGlow />
      {children}
    </Canvas>
  );
}

function Lighting() {
  return (
    <>
      {/*
        Flat and even, on purpose. Dramatic rim lighting from behind is
        the single strongest signal of product photography — it is what
        made the first version read as a car advertisement. The geometry
        here is mostly emissive edges and translucent planes, so it
        needs almost no lighting at all.
      */}
      <ambientLight intensity={1.1} color="#A9BCE6" />
      <directionalLight position={[2, 7, 6]} intensity={0.4} color="#DCE6FF" />
    </>
  );
}

/**
 * Ground: a radial falloff drawn to a small canvas at runtime. Gives the
 * vehicle something to sit on without shipping a texture file or paying
 * for a shadow map.
 */
function GroundGlow() {
  const texture = useMemo(() => {
    if (typeof document === "undefined") return null;
    const size = 256;
    const c = document.createElement("canvas");
    c.width = c.height = size;
    const ctx = c.getContext("2d");
    if (!ctx) return null;
    const g = ctx.createRadialGradient(
      size / 2,
      size / 2,
      0,
      size / 2,
      size / 2,
      size / 2
    );
    g.addColorStop(0, "rgba(26,60,255,0.20)");
    g.addColorStop(0.45, "rgba(26,60,255,0.06)");
    g.addColorStop(1, "rgba(10,14,26,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, []);

  if (!texture) return null;

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, 0]}>
      <planeGeometry args={[26, 26]} />
      <meshBasicMaterial map={texture} transparent depthWrite={false} />
    </mesh>
  );
}

/**
 * Drives the camera toward a pose. Smoothed rather than snapped, so
 * moving between parts reads as one continuous camera rather than cuts.
 */
export function CameraRig({
  position,
  target,
  smooth = 0.06,
}: {
  position: [number, number, number];
  target: [number, number, number];
  smooth?: number;
}) {
  const { camera } = useThree();
  const look = useRef(new THREE.Vector3(...target));
  const want = useRef(new THREE.Vector3(...position));
  const wantLook = useRef(new THREE.Vector3(...target));

  want.current.set(...position);
  wantLook.current.set(...target);

  useFrame(() => {
    camera.position.lerp(want.current, smooth);
    look.current.lerp(wantLook.current, smooth);
    camera.lookAt(look.current);
  });

  return null;
}
