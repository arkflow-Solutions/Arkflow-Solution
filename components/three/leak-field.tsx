"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * LeakField — the current, leaking. Refined: particles that break from
 * the stream now dim toward the page's ink as they fall, so each leak
 * ends in disappearance — revenue that was never seen again.
 */

const COUNT = 750;
const tmpColor = new THREE.Color();
const platinumC = new THREE.Color("#7d8598");
const LEAK_RATE = 0.22;

function Field() {
  const ref = useRef<THREE.Points>(null);

  const { positions, meta, colors, baseColors } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const meta = new Float32Array(COUNT * 4);
    const colors = new Float32Array(COUNT * 3);
    const baseColors = new Float32Array(COUNT * 3);
    const platinum = new THREE.Color("#7d8598");
    const blue = new THREE.Color("#1a3cff");

    for (let i = 0; i < COUNT; i++) {
      const x = (Math.random() - 0.5) * 24;
      positions.set([x, (Math.random() - 0.5) * 0.7, (Math.random() - 0.5) * 3], i * 3);
      meta.set(
        [Math.random() * Math.PI * 2, 0.6 + Math.random() * 0.8, Math.random() < LEAK_RATE ? 1 : 0, Math.random()],
        i * 4
      );
      const c = Math.random() < 0.05 ? blue : platinum;
      colors.set([c.r, c.g, c.b], i * 3);
      baseColors.set([c.r, c.g, c.b], i * 3);
    }
    return { positions, meta, colors, baseColors };
  }, []);

  const ink = useMemo(() => new THREE.Color("#0a0e1a"), []);
  const tmp = useMemo(() => new THREE.Color(), []);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const pos = ref.current!.geometry.attributes.position;
    const col = ref.current!.geometry.attributes.color;

    for (let i = 0; i < COUNT; i++) {
      const phase = meta[i * 4];
      const speed = meta[i * 4 + 1];
      const isLeaker = meta[i * 4 + 2];
      let x = pos.getX(i) + 0.012 * speed;

      if (isLeaker) {
        let leakT = meta[i * 4 + 3] + 0.004 * speed;
        if (leakT > 1) {
          leakT = 0;
          x = -12;
        }
        meta[i * 4 + 3] = leakT;
        const falling = Math.max(0, leakT - 0.55) / 0.45;
        pos.setY(i, Math.sin(x * 0.5 + t * speed + phase) * 0.3 - falling * falling * 5.2);
        // Fade as they fall — revenue disappearing, literally
        const col = ref.current!.geometry.attributes.color;
        tmpColor.copy(platinumC).multiplyScalar(1 - falling * 0.85);
        col.setXYZ(i, tmpColor.r, tmpColor.g, tmpColor.b);
        col.needsUpdate = true;

        // Fade into the ink as it falls — gone without a sound
        tmp.setRGB(baseColors[i * 3], baseColors[i * 3 + 1], baseColors[i * 3 + 2]);
        tmp.lerp(ink, falling * falling);
        col.setXYZ(i, tmp.r, tmp.g, tmp.b);
      } else {
        pos.setY(i, Math.sin(x * 0.5 + t * speed + phase) * 0.3);
      }

      if (x > 12) x = -12;
      pos.setX(i, x);
    }
    pos.needsUpdate = true;
    col.needsUpdate = true;
  });

  return (
    <points ref={ref} position={[0, 1.4, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
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

export default function LeakField() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      aria-hidden
    >
      <Field />
    </Canvas>
  );
}
