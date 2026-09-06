"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { CORE_EDGES, CORE_NODES } from "@/lib/vehicle-geometry";

const BLUE = "#1A3CFF";

/**
 * SystemCore — the seven ArkFlow subsystems and the connections between
 * them, as a free-standing lattice.
 *
 * This is the site's one 3D material. It appears here as an abstract
 * cluster; in section 4 the SAME nodes settle into the outline of a
 * vehicle, which is what makes the car read as a diagram briefly taking
 * a familiar shape rather than as a product on a turntable.
 *
 * `assemble` runs 0 → 1: at 0 the nodes are scattered and the edges are
 * dark; at 1 they hold their positions and the graph is lit.
 */
export function SystemCore({
  assemble = 0,
  spin = 0,
  lite = false,
}: {
  assemble?: number;
  spin?: number;
  lite?: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const lines = useRef<THREE.LineSegments>(null);

  /** Scattered start positions, deterministic so it never re-randomises. */
  const scattered = useMemo(
    () =>
      CORE_NODES.map((n, i) => {
        const a = (i / CORE_NODES.length) * Math.PI * 2;
        return new THREE.Vector3(
          Math.cos(a) * 3.1 + n.pos[0] * 0.2,
          1.4 + Math.sin(i * 1.7) * 1.1,
          Math.sin(a) * 3.1
        );
      }),
    []
  );

  /** Final positions: the vehicle-shaped arrangement, lifted to eye level. */
  const settled = useMemo(
    () =>
      CORE_NODES.map((n) => new THREE.Vector3(n.pos[0], n.pos[1] + 0.8, n.pos[2])),
    []
  );

  const current = useMemo(
    () => CORE_NODES.map(() => new THREE.Vector3()),
    []
  );

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(new Array(CORE_EDGES.length * 6).fill(0), 3)
    );
    return g;
  }, []);

  useFrame(({ clock }) => {
    if (group.current) {
      group.current.rotation.y = spin + clock.getElapsedTime() * 0.045;
    }

    // Positions interpolate scattered → settled with a per-node offset,
    // so the lattice assembles rather than snapping as one block.
    current.forEach((v, i) => {
      const t = THREE.MathUtils.clamp(assemble * 1.4 - i * 0.05, 0, 1);
      v.lerpVectors(scattered[i], settled[i], t * t * (3 - 2 * t));
    });

    const attr = geometry.getAttribute("position") as THREE.BufferAttribute;
    CORE_EDGES.forEach(([a, b], i) => {
      attr.setXYZ(i * 2, current[a].x, current[a].y, current[a].z);
      attr.setXYZ(i * 2 + 1, current[b].x, current[b].y, current[b].z);
    });
    attr.needsUpdate = true;

    if (lines.current) {
      const m = lines.current.material as THREE.LineBasicMaterial;
      m.opacity = 0.12 + assemble * 0.6;
    }

    group.current?.children.forEach((child) => {
      const i = child.userData.nodeIndex as number | undefined;
      if (i === undefined) return;
      child.position.copy(current[i]);
    });
  });

  return (
    <group ref={group}>
      <lineSegments ref={lines} geometry={geometry}>
        <lineBasicMaterial color={BLUE} transparent opacity={0.12} />
      </lineSegments>

      {CORE_NODES.map((n, i) => (
        <group key={n.id} userData={{ nodeIndex: i }}>
          <mesh>
            <octahedronGeometry args={[0.1, 0]} />
            <meshBasicMaterial color={BLUE} />
          </mesh>
          <mesh>
            <sphereGeometry args={[0.2, 10, 10]} />
            <meshBasicMaterial color={BLUE} transparent opacity={0.12} />
          </mesh>
          {!lite && assemble > 0.45 && (
            <Html
              center
              distanceFactor={9}
              position={[0, 0.32, 0]}
              style={{ pointerEvents: "none" }}
            >
              <span
                className="af-entry-label"
                style={{ opacity: (assemble - 0.45) / 0.4 }}
              >
                {n.label}
              </span>
            </Html>
          )}
        </group>
      ))}
    </group>
  );
}
