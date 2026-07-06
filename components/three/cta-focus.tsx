"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * CtaFocus — the closing 3D moment. Everything the page has said
 * resolves here: a wide, slow field of particles drifting inward
 * toward one quiet point of light — the discovery call. Barely
 * there; the darkness around the CTA is part of the composition.
 */

const COUNT = 900;

function Convergence() {
  const ref = useRef<THREE.Points>(null);

  const { positions, seeds, colors } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const seeds = new Float32Array(COUNT * 3); // angle, radius, speed
    const colors = new Float32Array(COUNT * 3);
    const platinum = new THREE.Color("#6f7890");
    const blue = new THREE.Color("#3b82f6");

    for (let i = 0; i < COUNT; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 2 + Math.random() * 8;
      seeds.set([angle, radius, 0.3 + Math.random() * 0.7], i * 3);
      positions.set(
        [Math.cos(angle) * radius, Math.sin(angle) * radius * 0.45, (Math.random() - 0.5) * 3],
        i * 3
      );
      const c = Math.random() < 0.08 ? blue : platinum;
      colors.set([c.r, c.g, c.b], i * 3);
    }
    return { positions, seeds, colors };
  }, []);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const pos = ref.current!.geometry.attributes.position;
    for (let i = 0; i < COUNT; i++) {
      let angle = seeds[i * 3];
      let radius = seeds[i * 3 + 1];
      const speed = seeds[i * 3 + 2];
      // Slow orbit, slower inward drift; reborn at the rim.
      angle += 0.0016 * speed;
      radius -= 0.0035 * speed;
      if (radius < 0.25) radius = 8 + Math.random() * 2;
      seeds[i * 3] = angle;
      seeds[i * 3 + 1] = radius;
      pos.setXYZ(
        i,
        Math.cos(angle) * radius,
        Math.sin(angle) * radius * 0.45 + Math.sin(t * 0.5 + angle * 3) * 0.05,
        pos.getZ(i)
      );
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.026}
        vertexColors
        transparent
        opacity={0.4}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function CtaFocus() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      aria-hidden
    >
      <fog attach="fog" args={["#0a0e1a", 5, 12]} />
      <Convergence />
    </Canvas>
  );
}
