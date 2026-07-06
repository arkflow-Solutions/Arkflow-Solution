"use client";

import { useMemo, useRef, type MutableRefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * JourneyCurrent — the current, ordered. Refined: as each particle
 * travels down the spine and the stream tightens, its colour resolves
 * toward a cool clarity — order is literally legibility.
 */

const COUNT = 900;

function Current({ progress }: { progress: MutableRefObject<number> }) {
  const ref = useRef<THREE.Points>(null);

  const { positions, meta, colors, baseColors } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const meta = new Float32Array(COUNT * 2);
    const colors = new Float32Array(COUNT * 3);
    const baseColors = new Float32Array(COUNT * 3);
    const platinum = new THREE.Color("#8b93a7");
    const blue = new THREE.Color("#1a3cff");

    for (let i = 0; i < COUNT; i++) {
      meta.set([Math.random(), Math.random() * Math.PI * 2], i * 2);
      positions.set([0, 20, (Math.random() - 0.5) * 1.5], i * 3);
      const c = Math.random() < 0.08 ? blue : platinum;
      colors.set([c.r, c.g, c.b], i * 3);
      baseColors.set([c.r, c.g, c.b], i * 3);
    }
    return { positions, meta, colors, baseColors };
  }, []);

  const clarity = useMemo(() => new THREE.Color("#dfe7ff"), []);
  const tmp = useMemo(() => new THREE.Color(), []);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const p = THREE.MathUtils.clamp(progress.current, 0, 1);
    const pos = ref.current!.geometry.attributes.position;
    const col = ref.current!.geometry.attributes.color;
    const SPAN = 9;

    for (let i = 0; i < COUNT; i++) {
      const offset = meta[i * 2];
      const phase = meta[i * 2 + 1];
      const travel = ((offset + t * 0.05) % 1) * p;
      const spread = 0.9 - travel * 0.72;
      pos.setY(i, 4.5 - travel * SPAN);
      pos.setX(i, Math.sin(travel * 14 + phase) * spread);

      tmp.setRGB(baseColors[i * 3], baseColors[i * 3 + 1], baseColors[i * 3 + 2]);
      tmp.lerp(clarity, travel * 0.7);
      col.setXYZ(i, tmp.r, tmp.g, tmp.b);
    }
    pos.needsUpdate = true;
    col.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.032}
        vertexColors
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function JourneyCurrent({
  progress,
}: {
  progress: MutableRefObject<number>;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      aria-hidden
    >
      <Current progress={progress} />
    </Canvas>
  );
}
