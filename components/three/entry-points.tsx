"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { ENTRY_POINTS } from "@/lib/vehicle-geometry";

const BLUE = "#1A3CFF";

/**
 * The customer entry points — the "ten doors". Each sits in a ring
 * around the vehicle with a line running inward. At connect = 0 the
 * lines are dark and the nodes are scattered; as connect rises the
 * lines light up and a pulse travels toward the vehicle.
 *
 * This is the argument of the whole site expressed as geometry: many
 * ways in, one system they feed.
 */
export function EntryPoints({
  connect = 0,
  fade = 1,
  lite = false,
}: {
  /** 0 = disconnected, 1 = fully flowing into the vehicle. */
  connect?: number;
  /** Overall opacity, used to retire the ring as the camera closes in. */
  fade?: number;
  /**
   * Phone profile. Six nodes instead of nine, and no drei <Html>
   * labels — those are real DOM elements repositioned every frame,
   * which is the single most expensive thing in this scene on mobile.
   */
  lite?: boolean;
}) {
  const pulses = useRef<THREE.Group>(null);

  const nodes = useMemo(
    () =>
      (lite ? ENTRY_POINTS.filter((_, i) => i % 3 !== 2) : ENTRY_POINTS).map((e) => {
        const x = Math.cos(e.angle) * e.radius;
        const z = Math.sin(e.angle) * e.radius;
        return { ...e, pos: new THREE.Vector3(x, e.y, z) };
      }),
    [lite]
  );

  /** One geometry for every inbound line — a single draw call. */
  const lines = useMemo(() => {
    const pts: number[] = [];
    nodes.forEach((n) => {
      pts.push(n.pos.x, n.pos.y, n.pos.z, 0, 0.8, 0);
    });
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
    return g;
  }, [nodes]);

  useFrame(({ clock }) => {
    if (!pulses.current || connect < 0.02) return;
    const t = clock.getElapsedTime();
    pulses.current.children.forEach((child, i) => {
      const n = nodes[i];
      // Each pulse runs node → vehicle on its own offset phase.
      const p = ((t * 0.32 + i * 0.11) % 1) * connect;
      child.position.lerpVectors(n.pos, new THREE.Vector3(0, 0.8, 0), p);
      const m = (child as THREE.Mesh).material as THREE.MeshBasicMaterial;
      m.opacity = Math.sin(p * Math.PI) * connect * fade;
    });
  });

  return (
    <group>
      <lineSegments geometry={lines}>
        <lineBasicMaterial
          color={BLUE}
          transparent
          opacity={(0.06 + connect * 0.34) * fade}
        />
      </lineSegments>

      {nodes.map((n) => (
        <group key={n.label} position={n.pos}>
          <mesh>
            <octahedronGeometry args={[0.11, 0]} />
            <meshBasicMaterial
              color={BLUE}
              transparent
              opacity={(0.4 + connect * 0.6) * fade}
            />
          </mesh>
          {!lite && fade > 0.25 && (
            <Html
              center
              distanceFactor={11}
              position={[0, 0.34, 0]}
              style={{ pointerEvents: "none" }}
            >
              <span className="af-entry-label" style={{ opacity: fade }}>
                {n.label}
              </span>
            </Html>
          )}
        </group>
      ))}

      <group ref={pulses}>
        {nodes.map((n) => (
          <mesh key={`p-${n.label}`} position={n.pos}>
            <sphereGeometry args={[0.055, 6, 6]} />
            <meshBasicMaterial color="#BFD2FF" transparent opacity={0} />
          </mesh>
        ))}
      </group>
    </group>
  );
}
