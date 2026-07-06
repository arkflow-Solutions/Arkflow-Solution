"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * OrderField — the second 3D moment, and the thesis in motion.
 * At the top of the Revenue Journey the particles are scattered —
 * enquiries arriving from everywhere, unhandled. As the visitor
 * scrolls the section, every particle finds its lane and the noise
 * becomes one ordered current. Chaos, operated.
 *
 * Scroll progress is read from the host section's bounding rect each
 * frame — no scroll listeners, no re-renders.
 */

const COUNT = 1800;
const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

function Field({ hostRef }: { hostRef: React.RefObject<HTMLElement> }) {
  const ref = useRef<THREE.Points>(null);

  const { chaos, order, seeds, colors } = useMemo(() => {
    const chaos = new Float32Array(COUNT * 3);
    const order = new Float32Array(COUNT * 3);
    const seeds = new Float32Array(COUNT * 2);
    const colors = new Float32Array(COUNT * 3);
    const platinum = new THREE.Color("#7c859b");
    const blue = new THREE.Color("#3b82f6");

    for (let i = 0; i < COUNT; i++) {
      // Chaos: a loose, deep scatter
      chaos.set(
        [(Math.random() - 0.5) * 18, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10],
        i * 3
      );
      // Order: five thin lanes — one per journey stage
      const lane = i % 5;
      order.set(
        [
          (Math.random() - 0.5) * 20,
          (lane - 2) * 0.85 + (Math.random() - 0.5) * 0.12,
          (Math.random() - 0.5) * 1.2,
        ],
        i * 3
      );
      seeds.set([Math.random() * Math.PI * 2, 0.5 + Math.random() * 0.8], i * 2);
      const c = Math.random() < 0.06 ? blue : platinum;
      colors.set([c.r, c.g, c.b], i * 3);
    }
    return { chaos, order, seeds, colors };
  }, []);

  const positions = useMemo(() => new Float32Array(chaos), [chaos]);

  useFrame(({ clock }) => {
    const host = hostRef.current;
    if (!host || !ref.current) return;

    // Section scroll progress, 0 (entering) -> 1 (leaving)
    const rect = host.getBoundingClientRect();
    const vh = window.innerHeight;
    const raw = (vh * 0.85 - rect.top) / (rect.height * 0.85);
    const p = easeInOut(THREE.MathUtils.clamp(raw, 0, 1));

    const t = clock.elapsedTime;
    const pos = ref.current.geometry.attributes.position;
    for (let i = 0; i < COUNT; i++) {
      const phase = seeds[i * 2];
      const speed = seeds[i * 2 + 1];
      // Chaos jitters; order flows.
      const cx = chaos[i * 3] + Math.sin(t * 0.4 * speed + phase) * 0.5;
      const cy = chaos[i * 3 + 1] + Math.cos(t * 0.3 * speed + phase) * 0.5;
      const cz = chaos[i * 3 + 2];
      let ox = order[i * 3] + ((t * speed * 0.7 + phase * 3) % 20) - 10;
      const oy = order[i * 3 + 1] + Math.sin(ox * 0.4 + t * 0.5) * 0.06;
      const oz = order[i * 3 + 2];
      pos.setXYZ(
        i,
        THREE.MathUtils.lerp(cx, ox, p),
        THREE.MathUtils.lerp(cy, oy, p),
        THREE.MathUtils.lerp(cz, oz, p)
      );
    }
    pos.needsUpdate = true;
    (ref.current.material as THREE.PointsMaterial).opacity = 0.18 + p * 0.22;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.3}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function OrderField({
  hostRef,
}: {
  hostRef: React.RefObject<HTMLElement>;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 9], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      aria-hidden
    >
      <fog attach="fog" args={["#0a0e1a", 7, 15]} />
      <Field hostRef={hostRef} />
    </Canvas>
  );
}
