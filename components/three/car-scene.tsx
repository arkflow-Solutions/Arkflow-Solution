"use client";

import { SceneShell, CameraRig } from "@/components/three/scene-shell";
import { ArkflowVehicle } from "@/components/three/arkflow-vehicle";
import { PART_VIEWS } from "@/lib/vehicle-geometry";
import type { PartId } from "@/lib/vehicle-geometry";

/**
 * The car explorer. Selecting a component moves the camera to its pose
 * and, for the internal ones, separates the shell so the relevant
 * subsystem is visible.
 *
 * There is no modelled cockpit or engine bay to fly into — the vehicle
 * is conceptual. Interior reveals are achieved by shell separation
 * instead, which is honest about what the geometry is (recorded in
 * AMENDMENTS-v1.2).
 */
export default function CarScene({
  part,
  active,
  lite = false,
}: {
  part: PartId;
  active: boolean;
  lite?: boolean;
}) {
  const view = PART_VIEWS[part];

  return (
    <SceneShell active={active} lite={lite}>
      <CameraRig position={view.position} target={view.target} smooth={0.055} />
      <ArkflowVehicle
        separation={view.separation}
        activePart={part}
        spin={-0.35}
      />
      {part === "destination" && <Road />}
    </SceneShell>
  );
}

/** The road ahead — DESTINATION is not a car part, it is where it goes. */
function Road() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[9, 0.004, 0]}>
        <planeGeometry args={[24, 2.6]} />
        <meshBasicMaterial color="#1A3CFF" transparent opacity={0.07} />
      </mesh>
      {[4, 7.5, 11, 14.5, 18, 21.5].map((x, i) => (
        <mesh key={x} rotation={[-Math.PI / 2, 0, 0]} position={[x, 0.006, 0]}>
          <planeGeometry args={[1.5, 0.06]} />
          <meshBasicMaterial
            color="#BFD2FF"
            transparent
            opacity={0.55 - i * 0.08}
          />
        </mesh>
      ))}
    </group>
  );
}
