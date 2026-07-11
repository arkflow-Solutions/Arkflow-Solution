"use client";

import { useMemo, useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * SpatialField — ArkFlow's page-wide living current.
 *
 * One persistent WebGL field sits fixed behind the entire homepage, so
 * the whole page reads as a single 3D space rather than a stack of flat
 * sections. Two behaviours tell one story:
 *
 *  1. ORDER FOLLOWS ATTENTION — particles near the pointer fall out of
 *     turbulence into a clean laminar line. Wherever attention goes, the
 *     current organises. That is the product.
 *  2. THE CURRENT TIGHTENS — as the visitor scrolls toward the closing
 *     call, the camera dollies in and the field compresses into a
 *     focused stream, converging on the discovery call.
 *
 * Depth: a soft far layer, an additive near layer, slow camera drift.
 * A single canvas keeps GPU cost low. Reduced motion skips it entirely
 * (the caller never mounts this component in that case).
 */

const COUNT = 2600;
const FAR_COUNT = 700;
const ORDER_RADIUS = 2.6;

function useWorldPointer() {
  const world = useRef(new THREE.Vector2(999, 999));
  const { camera, size, gl } = useThree();

  useEffect(() => {
    const el = gl.domElement;
    const toWorld = (clientX: number, clientY: number) => {
      const rect = el.getBoundingClientRect();
      const ndcX = ((clientX - rect.left) / rect.width) * 2 - 1;
      const ndcY = -(((clientY - rect.top) / rect.height) * 2 - 1);
      const cam = camera as THREE.PerspectiveCamera;
      const h = 2 * cam.position.z * Math.tan((cam.fov * Math.PI) / 360);
      const w = h * (size.width / size.height);
      world.current.set((ndcX * w) / 2, (ndcY * h) / 2);
    };
    const onMove = (e: PointerEvent) => toWorld(e.clientX, e.clientY);
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [camera, size, gl]);

  return world;
}

function Field({ progress }: { progress: React.MutableRefObject<number> }) {
  const nearRef = useRef<THREE.Points>(null);
  const farRef = useRef<THREE.Points>(null);
  const pointer = useWorldPointer();
  const smooth = useRef(0);

  const near = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const seeds = new Float32Array(COUNT * 4); // phase, speed, band, sizeJitter
    const colors = new Float32Array(COUNT * 3);
    const platinum = new THREE.Color("#8b93a7");
    const blue = new THREE.Color("#1a3cff");
    for (let i = 0; i < COUNT; i++) {
      const x = (Math.random() - 0.5) * 24;
      const band = (Math.random() - 0.5) * 3.4;
      positions.set([x, band, (Math.random() - 0.5) * 6], i * 3);
      seeds.set(
        [Math.random() * Math.PI * 2, 0.5 + Math.random(), band, 0.7 + Math.random() * 0.6],
        i * 4
      );
      const c = Math.random() < 0.08 ? blue : platinum;
      colors.set([c.r, c.g, c.b], i * 3);
    }
    return { positions, seeds, colors };
  }, []);

  const far = useMemo(() => {
    const positions = new Float32Array(FAR_COUNT * 3);
    const seeds = new Float32Array(FAR_COUNT * 2);
    for (let i = 0; i < FAR_COUNT; i++) {
      positions.set(
        [(Math.random() - 0.5) * 30, (Math.random() - 0.5) * 6, -4 - Math.random() * 6],
        i * 3
      );
      seeds.set([Math.random() * Math.PI * 2, 0.3 + Math.random() * 0.5], i * 2);
    }
    return { positions, seeds };
  }, []);

  useFrame(({ clock, camera }) => {
    const t = clock.elapsedTime;
    const tt = t * 0.18;
    const px = pointer.current.x;
    const py = pointer.current.y;

    // Ease the scroll progress so motion never snaps.
    smooth.current += (progress.current - smooth.current) * 0.05;
    const p = smooth.current; // 0..1 across the page
    const tighten = 1 - p * 0.72; // vertical compression toward the CTA

    // Slow camera drift + a gentle dolly-in as the page is scrolled.
    camera.position.x = Math.sin(t * 0.05) * 0.35;
    camera.position.y = Math.cos(t * 0.04) * 0.2 - p * 0.3;
    camera.position.z = 7 - p * 2.2;
    camera.lookAt(0, 0, 0);

    // Near layer: turbulence, ordered near the pointer, tightening on scroll
    const pos = nearRef.current!.geometry.attributes.position;
    for (let i = 0; i < COUNT; i++) {
      const x = pos.getX(i);
      const phase = near.seeds[i * 4];
      const speed = near.seeds[i * 4 + 1];
      const band = near.seeds[i * 4 + 2];

      const turbulentY =
        (band * 0.35 +
          Math.sin(x * 0.45 + tt * speed + phase) * 0.9 +
          Math.sin(x * 0.15 - tt * 0.6 + phase) * 0.5) *
        tighten;

      // ORDER FOLLOWS ATTENTION
      const dx = x - px;
      const dy = turbulentY - py;
      const d2 = dx * dx + dy * dy;
      let y = turbulentY;
      if (d2 < ORDER_RADIUS * ORDER_RADIUS) {
        const f = 1 - Math.sqrt(d2) / ORDER_RADIUS;
        const s = f * f * (3 - 2 * f);
        const laminarY = py + Math.sin(x * 0.6 + tt * 2) * 0.06;
        y = turbulentY + (laminarY - turbulentY) * s * 0.85;
      }
      pos.setY(i, y);

      let nx = x + (0.008 + p * 0.01) * speed;
      if (nx > 12) nx = -12;
      pos.setX(i, nx);
    }
    pos.needsUpdate = true;
    nearRef.current!.rotation.x = -0.32;

    // Far layer: slower, softer — depth
    const fpos = farRef.current!.geometry.attributes.position;
    for (let i = 0; i < FAR_COUNT; i++) {
      const x = fpos.getX(i);
      const phase = far.seeds[i * 2];
      const speed = far.seeds[i * 2 + 1];
      fpos.setY(i, Math.sin(x * 0.2 + tt * speed + phase) * 1.2 * tighten);
      let nx = x + 0.003 * speed;
      if (nx > 15) nx = -15;
      fpos.setX(i, nx);
    }
    fpos.needsUpdate = true;
    farRef.current!.rotation.x = -0.32;
  });

  return (
    <>
      <points ref={farRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[far.positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.09}
          color="#3d465c"
          transparent
          opacity={0.22}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      <points ref={nearRef} position={[0, -0.4, 0]}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[near.positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[near.colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.03}
          vertexColors
          transparent
          opacity={0.6}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </>
  );
}

export default function SpatialField() {
  const progress = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.current = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 50 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      aria-hidden
    >
      <Field progress={progress} />
    </Canvas>
  );
}
