/**
 * ArkFlow vehicle — geometry definition.
 *
 * A conceptual "digital operating vehicle", generated in code. No
 * purchased model, no scanned asset, no manufacturer likeness
 * (AMENDMENTS-v1.2, Amendment 4).
 *
 * The silhouette below was designed and visually verified in 2D before
 * being extruded: length 4.8, height 1.22, L/H 3.93, wheel diameter 57%
 * of overall height. Those are low-slung GT proportions — the numbers
 * are what stop a procedural car reading as a box on wheels.
 *
 * Units are metres. Origin sits on the ground plane at the vehicle's
 * centre, +X forward, +Y up, +Z to the near side.
 */

/** Lower body, side profile. Extruded across Z with a bevel. */
export const BODY_PROFILE: [number, number][] = [
  [-2.30, 0.30],
  [-2.26, 0.60],
  [-2.02, 0.74],
  [-1.30, 0.82],
  [0.00, 0.84],
  [1.10, 0.80],
  [1.95, 0.68],
  [2.35, 0.50],
  [2.40, 0.34],
  [2.10, 0.20],
  [-2.00, 0.20],
];

/** Glass canopy. Sits on the beltline; lifts away on shell separation. */
export const CANOPY_PROFILE: [number, number][] = [
  [-1.98, 0.76],
  [-1.58, 1.06],
  [-0.70, 1.22],
  [0.45, 1.22],
  [1.15, 1.06],
  [1.55, 0.84],
];

export const VEHICLE = {
  bodyWidth: 1.66,
  canopyWidth: 1.42,
  wheelRadius: 0.35,
  wheelWidth: 0.26,
  /** Wheel centres: [x, z]. Slightly outboard of the body, deliberately. */
  wheelPositions: [
    [-1.55, 0.86],
    [-1.55, -0.86],
    [1.55, 0.86],
    [1.55, -0.86],
  ] as [number, number][],
  wheelHeight: 0.35,
  length: 4.8,
  height: 1.22,
} as const;

/**
 * Internal architecture revealed when the shell separates. Each node is
 * an ArkFlow subsystem; edges are the connections between them. This is
 * the payload of the whole metaphor — the thing the vehicle opens to
 * show.
 */
export const CORE_NODES: {
  id: string;
  label: string;
  pos: [number, number, number];
}[] = [
  { id: "inbox", label: "Inbox", pos: [1.30, 0.62, 0] },
  { id: "assistant", label: "Assistant", pos: [0.62, 0.78, 0.34] },
  { id: "crm", label: "CRM", pos: [0.60, 0.52, -0.36] },
  { id: "calendar", label: "Calendar", pos: [-0.18, 0.74, -0.30] },
  { id: "payments", label: "Payments", pos: [-0.24, 0.50, 0.32] },
  { id: "workflows", label: "Workflows", pos: [-1.02, 0.68, 0] },
  { id: "records", label: "Records", pos: [-1.72, 0.56, 0] },
];

/** Connections between core nodes, by index into CORE_NODES. */
export const CORE_EDGES: [number, number][] = [
  [0, 1],
  [0, 2],
  [1, 2],
  [1, 3],
  [2, 3],
  [2, 4],
  [3, 5],
  [4, 5],
  [5, 6],
  [2, 6],
];

/**
 * Customer entry points orbiting the vehicle in the hero. Angles are in
 * radians around Y; radius and height place each one in the ring.
 */
export const ENTRY_POINTS: {
  label: string;
  angle: number;
  radius: number;
  y: number;
}[] = [
  { label: "Website", angle: 0.15, radius: 5.4, y: 1.9 },
  { label: "Instagram", angle: 0.85, radius: 5.9, y: 1.2 },
  { label: "WhatsApp", angle: 1.55, radius: 5.2, y: 2.3 },
  { label: "Google", angle: 2.35, radius: 6.1, y: 1.5 },
  { label: "TikTok", angle: 3.05, radius: 5.5, y: 2.6 },
  { label: "Facebook", angle: 3.75, radius: 5.8, y: 1.1 },
  { label: "Email", angle: 4.45, radius: 5.3, y: 2.1 },
  { label: "Phone", angle: 5.15, radius: 6.0, y: 1.6 },
  { label: "Calendar", angle: 5.75, radius: 5.6, y: 2.5 },
];

/** Seven components of the analogy, with a camera pose for each. */
export type PartId =
  | "doors"
  | "engine"
  | "driver"
  | "wheels"
  | "boot"
  | "dashboard"
  | "destination";

/**
 * Camera poses per component.
 *
 * Deliberately flat and elevated rather than low three-quarter: a low
 * hero angle is showroom language, while a near-side elevation reads as
 * a technical drawing. Every pose keeps some separation — the vehicle
 * is never shown sealed, because a sealed car is a beauty shot.
 */
export const PART_VIEWS: Record<
  PartId,
  { position: [number, number, number]; target: [number, number, number]; separation: number }
> = {
  doors: { position: [0.4, 1.9, 7.4], target: [0, 0.8, 0], separation: 0.2 },
  engine: { position: [4.0, 2.6, 5.2], target: [1.6, 0.7, 0], separation: 1 },
  driver: { position: [1.0, 2.9, 4.8], target: [0.4, 0.9, 0], separation: 1 },
  wheels: { position: [1.6, 1.4, 6.4], target: [0.6, 0.4, 0], separation: 0.35 },
  boot: { position: [-4.0, 2.4, 5.0], target: [-1.7, 0.7, 0], separation: 1 },
  dashboard: { position: [0.8, 3.2, 4.4], target: [0.6, 0.8, 0], separation: 1 },
  destination: { position: [-1.4, 3.6, 10.6], target: [3.0, 0.4, 0], separation: 0.3 },
};
