"use client";

import { useMemo, useRef, useEffect, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * THE LIVING CURRENT — ArkFlow's signature experience.
 *
 * Two behaviours, one story:
 *  1. ORDER FOLLOWS ATTENTION — particles near the pointer fall out of
 *     turbulence into a clean laminar line. Wherever attention goes,
 *     the current organises. That is the product.
 *  2. EVERY LEAD GETS CAUGHT — a click drops a bright lead particle
 *     into the field; the current captures it instantly and carries it
 *     away. A quiet mono "captured" marks the moment.
 *
 * Craft: two depth layers (near sharp, far soft), additive light,
 * slow camera drift, per-particle size variance. Reduced motion skips
 * the canvas entirely.
 */

const COUNT = 2400;
const FAR_COUNT = 500;
const MAX_LEADS = 24;
const ORDER_RADIUS = 2.4;

type Props = { onCapture?: (clientX: number, clientY: number) => void };

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
    const onLeave = () => world.current.set(999, 999);
    window.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [camera, size, gl]);

  return world;
}

function Field({ leads }: { leads: React.MutableRefObject<Float32Array> }) {
  const nearRef = useRef<THREE.Points>(null);
  const farRef = useRef<THREE.Points>(null);
  const leadRef = useRef<THREE.Points>(null);
  const pointer = useWorldPointer();

  const near = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const seeds = new Float32Array(COUNT * 4); // phase, speed, band, sizeJitter
    const colors = new Float32Array(COUNT * 3);
    const platinum = new THREE.Color("#8b93a7");
    const blue = new THREE.Color("#1a3cff");
    for (let i = 0; i < COUNT; i++) {
      const x = (Math.random() - 0.5) * 22;
      const band = (Math.random() - 0.5) * 3.2;
      positions.set([x, band, (Math.random() - 0.5) * 5], i * 3);
      seeds.set(
        [Math.random() * Math.PI * 2, 0.5 + Math.random(), band, 0.7 + Math.random() * 0.6],
        i * 4
      );
      const c = Math.random() < 0.07 ? blue : platinum;
      colors.set([c.r, c.g, c.b], i * 3);
    }
    return { positions, seeds, colors };
  }, []);

  const far = useMemo(() => {
    const positions = new Float32Array(FAR_COUNT * 3);
    const seeds = new Float32Array(FAR_COUNT * 2);
    for (let i = 0; i < FAR_COUNT; i++) {
      positions.set(
        [(Math.random() - 0.5) * 26, (Math.random() - 0.5) * 5, -4 - Math.random() * 4],
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

    // Slow camera drift — the scene breathes
    camera.position.x = Math.sin(t * 0.05) * 0.35;
    camera.position.y = Math.cos(t * 0.04) * 0.2;
    camera.lookAt(0, 0, 0);

    // Near layer: turbulence, ordered near the pointer
    const pos = nearRef.current!.geometry.attributes.position;
    for (let i = 0; i < COUNT; i++) {
      const x = pos.getX(i);
      const phase = near.seeds[i * 4];
      const speed = near.seeds[i * 4 + 1];
      const band = near.seeds[i * 4 + 2];

      const turbulentY =
        band * 0.35 +
        Math.sin(x * 0.45 + tt * speed + phase) * 0.9 +
        Math.sin(x * 0.15 - tt * 0.6 + phase) * 0.5;

      // ORDER FOLLOWS ATTENTION: within reach of the pointer, the
      // particle leaves turbulence for a clean laminar line.
      const dx = x - px;
      const dy = turbulentY - py;
      const d2 = dx * dx + dy * dy;
      let y = turbulentY;
      if (d2 < ORDER_RADIUS * ORDER_RADIUS) {
        const f = 1 - Math.sqrt(d2) / ORDER_RADIUS; // 0..1
        const s = f * f * (3 - 2 * f); // smoothstep
        const laminarY = py + Math.sin(x * 0.6 + tt * 2) * 0.06;
        y = turbulentY + (laminarY - turbulentY) * s * 0.85;
      }
      pos.setY(i, y);

      let nx = x + 0.008 * speed;
      if (nx > 11) nx = -11;
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
      fpos.setY(i, Math.sin(x * 0.2 + tt * speed + phase) * 1.2);
      let nx = x + 0.003 * speed;
      if (nx > 13) nx = -13;
      fpos.setX(i, nx);
    }
    fpos.needsUpdate = true;
    farRef.current!.rotation.x = -0.32;

    // Leads: EVERY LEAD GETS CAUGHT — swept right, eased into the
    // stream line, faded out at the edge. Layout: [x,y,vx,life] × MAX
    const L = leads.current;
    const lpos = leadRef.current!.geometry.attributes.position;
    for (let i = 0; i < MAX_LEADS; i++) {
      let [lx, ly, vx, life] = [L[i * 4], L[i * 4 + 1], L[i * 4 + 2], L[i * 4 + 3]];
      if (life > 0) {
        vx = Math.min(vx + 0.004, 0.14);
        lx += vx;
        const streamY = Math.sin(lx * 0.45 + tt) * 0.9;
        ly += (streamY - ly) * 0.06; // the current takes hold
        life -= lx > 10 ? 0.06 : 0.0008;
        if (lx > 12 || life <= 0) life = 0;
        L[i * 4] = lx; L[i * 4 + 1] = ly; L[i * 4 + 2] = vx; L[i * 4 + 3] = life;
      }
      lpos.setXYZ(i, lx, ly, 1.5);
    }
    lpos.needsUpdate = true;
    (leadRef.current!.material as THREE.PointsMaterial).opacity = 0.95;
    leadRef.current!.rotation.x = -0.32;
  });

  const leadPositions = useMemo(() => new Float32Array(MAX_LEADS * 3).fill(999), []);

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
      <points ref={leadRef} position={[0, -0.4, 0]}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[leadPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.12}
          color="#4d68ff"
          transparent
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </>
  );
}

export default function HeroFlow({ onCapture }: Props) {
  // Lead pool lives outside React state — mutated per frame
  const leads = useRef(new Float32Array(MAX_LEADS * 4));
  const nextLead = useRef(0);

  const drop = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const el = e.currentTarget.querySelector("canvas");
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const ndcX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ndcY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      const h = 2 * 7 * Math.tan((50 * Math.PI) / 360);
      const w = h * (rect.width / rect.height);
      const i = nextLead.current % MAX_LEADS;
      leads.current.set([(ndcX * w) / 2, (ndcY * h) / 2 + 0.4, 0.01, 1], i * 4);
      nextLead.current++;
      onCapture?.(e.clientX, e.clientY);
    },
    [onCapture]
  );

  return (
    <div className="h-full w-full" onPointerDown={drop}>
      <Canvas
        camera={{ position: [0, 0, 7], fov: 50 }}
        dpr={[1, 1.8]}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
        aria-hidden
      >
        <Field leads={leads} />
      </Canvas>
    </div>
  );
}
