"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import {
  BODY_PROFILE,
  CANOPY_PROFILE,
  CORE_EDGES,
  CORE_NODES,
  VEHICLE,
} from "@/lib/vehicle-geometry";
import type { PartId } from "@/lib/vehicle-geometry";

const INK = "#0A0E1A";
const BLUE = "#1A3CFF";
const BLUE_SOFT = "#3B82F6";

/** Builds an extruded, bevelled solid from a 2D side profile. */
function extrude(
  profile: [number, number][],
  depth: number,
  bevel: number
): THREE.ExtrudeGeometry {
  const shape = new THREE.Shape();
  profile.forEach(([x, y], i) =>
    i === 0 ? shape.moveTo(x, y) : shape.lineTo(x, y)
  );
  shape.closePath();
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: depth - bevel * 2,
    bevelEnabled: true,
    bevelThickness: bevel,
    bevelSize: bevel,
    bevelSegments: 3,
    curveSegments: 2,
  });
  // Extrusion runs along +Z from the shape plane; centre it on the axis.
  geo.translate(0, 0, -depth / 2 + bevel);
  geo.computeVertexNormals();
  return geo;
}

/**
 * X-RAY, NOT A PRODUCT SHOT.
 *
 * The first version gave the body a solid metallic material under
 * studio rim lighting. That is the visual grammar of vehicle
 * advertising, and it read as one — the shell was the subject and the
 * seven subsystems inside it were invisible.
 *
 * Now: the shell is translucent and edge-lit, the internal architecture
 * is the brightest thing in frame, and the vehicle never fully closes.
 * A cutaway reads as a diagram; a sealed solid reads as a showroom.
 */
export function ArkflowVehicle({
  separation = 0,
  activePart = null,
  spin = 0,
}: {
  /** 0 = closed shell, 1 = fully separated with the core revealed. */
  separation?: number;
  activePart?: PartId | null;
  /** Slow idle rotation, in radians. */
  spin?: number;
}) {
  const group = useRef<THREE.Group>(null);

  const body = useMemo(() => extrude(BODY_PROFILE, VEHICLE.bodyWidth, 0.06), []);
  const canopy = useMemo(
    () => extrude(CANOPY_PROFILE, VEHICLE.canopyWidth, 0.04),
    []
  );
  const bodyEdges = useMemo(() => new THREE.EdgesGeometry(body, 22), [body]);
  const canopyEdges = useMemo(
    () => new THREE.EdgesGeometry(canopy, 22),
    [canopy]
  );

  /** Line segments joining the core nodes. Rebuilt only if the graph changes. */
  const coreLines = useMemo(() => {
    const pts: number[] = [];
    CORE_EDGES.forEach(([a, b]) => {
      pts.push(...CORE_NODES[a].pos, ...CORE_NODES[b].pos);
    });
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
    return g;
  }, []);

  useFrame(() => {
    if (group.current) group.current.rotation.y = spin;
  });

  // The vehicle is never fully sealed. Even "closed" keeps a gap, so
  // the internal architecture is always legible through the shell.
  const lift = 0.16 + separation * 0.78;
  const coreGlow = 0.55 + separation * 0.45;

  return (
    <group ref={group}>
      {/* ---------------- lower body shell ---------------- */}
      <group position={[0, separation * 0.06, 0]}>
        <mesh geometry={body}>
          <meshBasicMaterial
            color="#0E1526"
            transparent
            opacity={0.16}
            depthWrite={false}
            side={THREE.DoubleSide}
          />
        </mesh>
        <lineSegments geometry={bodyEdges}>
          <lineBasicMaterial
            color={activePart === "doors" ? BLUE : BLUE_SOFT}
            transparent
            opacity={activePart === "doors" ? 1 : 0.5}
          />
        </lineSegments>
      </group>

      {/* ---------------- glass canopy ---------------- */}
      <group position={[0, lift, 0]} rotation={[0, 0, separation * -0.06]}>
        <mesh geometry={canopy}>
          <meshBasicMaterial
            color="#0B1220"
            transparent
            opacity={0.12}
            depthWrite={false}
            side={THREE.DoubleSide}
          />
        </mesh>
        <lineSegments geometry={canopyEdges}>
          <lineBasicMaterial
            color={activePart === "driver" || activePart === "dashboard" ? BLUE : BLUE_SOFT}
            transparent
            opacity={
              activePart === "driver" || activePart === "dashboard" ? 1 : 0.5
            }
          />
        </lineSegments>
      </group>

      {/* ---------------- internal architecture ---------------- */}
      <group>
        <lineSegments geometry={coreLines}>
          <lineBasicMaterial color={BLUE} transparent opacity={coreGlow} />
        </lineSegments>
        {CORE_NODES.map((n) => (
          <group key={n.id} position={n.pos}>
            <mesh>
              <octahedronGeometry args={[0.085, 0]} />
              <meshBasicMaterial color="#BFD2FF" />
            </mesh>
            <mesh>
              <sphereGeometry args={[0.17, 10, 10]} />
              <meshBasicMaterial color={BLUE} transparent opacity={0.16} />
            </mesh>
          </group>
        ))}
      </group>

      {/* ---------------- wheels ---------------- */}
      {VEHICLE.wheelPositions.map(([x, z]) => (
        <group
          key={`${x}-${z}`}
          position={[x, VEHICLE.wheelHeight, z]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <mesh>
            <cylinderGeometry
              args={[
                VEHICLE.wheelRadius,
                VEHICLE.wheelRadius,
                VEHICLE.wheelWidth,
                24,
                1,
                true,
              ]}
            />
            <meshBasicMaterial
              color={activePart === "wheels" ? BLUE : "#2A3350"}
              transparent
              opacity={activePart === "wheels" ? 0.5 : 0.22}
              side={THREE.DoubleSide}
            />
          </mesh>
          <mesh position={[0, VEHICLE.wheelWidth / 2 + 0.005, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[VEHICLE.wheelRadius * 0.5, VEHICLE.wheelRadius * 0.62, 28]} />
            <meshBasicMaterial
              color={activePart === "wheels" ? BLUE : BLUE_SOFT}
              transparent
              opacity={activePart === "wheels" ? 1 : 0.45}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>
      ))}

      {/* ---------------- underbody light bar ---------------- */}
      <mesh position={[0, 0.17, 0]}>
        <boxGeometry args={[3.5, 0.015, 1.2]} />
        <meshBasicMaterial color={BLUE} transparent opacity={0.55} />
      </mesh>

      {/* ---------------- front and rear signature lines ---------------- */}
      <mesh position={[2.32, 0.5, 0]}>
        <boxGeometry args={[0.02, 0.035, 1.28]} />
        <meshBasicMaterial color="#BFD2FF" />
      </mesh>
      <mesh position={[-2.26, 0.62, 0]}>
        <boxGeometry args={[0.02, 0.03, 1.34]} />
        <meshBasicMaterial
          color={activePart === "boot" ? BLUE : "#7FA0FF"}
          transparent
          opacity={activePart === "boot" ? 1 : 0.7}
        />
      </mesh>
    </group>
  );
}

export { INK, BLUE, BLUE_SOFT };
