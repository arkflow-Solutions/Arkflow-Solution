/**
 * THE THROUGHLINE — one opportunity moving through the ArkFlow system.
 *
 * This is the canonical model behind the cinematic layer. It exists so
 * that the hero, the leak canvas, the engine and the customer journey
 * stop being four unrelated visuals and become four magnifications of
 * the same subject.
 *
 * WHY A SHARED MODEL RATHER THAN A SHARED COMPONENT
 * The renderers genuinely need different technologies — WebGL for the
 * spatial scenes, Canvas 2D for the particle flow, SVG for the
 * keyboard-navigable engine. Forcing one renderer would make at least
 * one of them worse. What creates continuity is not shared pixels but
 * shared COORDINATES: every renderer samples this path, so a node at
 * t = 0.4 sits at the same point in the story wherever it is drawn.
 *
 * COORDINATE SPACE
 * Deliberately abstract and unitless. x runs 0 → 1 in reading order,
 * y runs -1 (above the line) → +1 (below it), 0 being the spine. It is
 * NOT pixels, NOT metres and NOT a viewBox. Each renderer projects it:
 *
 *   SVG     → projectToBox() into a viewBox
 *   Canvas  → projectToBox() into device pixels
 *   R3F     → projectToWorld() onto a plane in scene space
 *
 * This is why the model has no React, no DOM and no three.js import. It
 * is pure data and pure functions, safe to import anywhere including on
 * the server.
 *
 * THE FIVE RULES (DESIGN-SYSTEM.md)
 *  1. One Throughline per page or scene.
 *  2. It changes state, never identity.
 *  3. Direction follows reading order.
 *  4. It is drawn only when carrying meaning — never ambient.
 *  5. Reduced motion resolves to the final state, with the same
 *     information present.
 *
 * GROUNDED IN WHAT ALREADY EXISTS. The ten stages are the canonical
 * Revenue Engine, reproduced exactly from lib/revenue-content.ts and
 * enforced by scripts/verify.mjs check 4. The three gaps are the three
 * unattended handovers the leak canvas has always asserted
 * (GAP_INDICES in components/motion/leak-flow.tsx), and each maps to a
 * real `leak` string on the matching stage in revenue-content. Nothing
 * here is invented; it is the existing narrative given coordinates.
 */

/* ------------------------------------------------------------------ */
/* Vocabulary                                                          */
/* ------------------------------------------------------------------ */

/**
 * What happens at a point on the line. These are the approved terms —
 * they describe events in a customer journey, not visual decoration.
 */
export type ThroughlineKind =
  /** A decision or event the opportunity passes through. */
  | "node"
  /** An unattended handover. Where revenue characteristically leaks. */
  | "gap"
  /** The line divides — a person takes over from the system. */
  | "branch"
  /** The line comes back rather than terminating. Retention. */
  | "return"
  /** The journey completes and compounds. */
  | "completion";

/**
 * The state of the line at a moment. Maps 1:1 onto the semantic colour
 * rules: blue is revenue moving, amber is revenue leaking, green is a
 * human taking over. Nothing else earns those colours.
 */
export type ThroughlineState =
  /** Not yet reached. Structure visible, no energy. */
  | "idle"
  /** Revenue moving. --blue-soft */
  | "flowing"
  /** Revenue leaking. --warning. Only ever at a gap. */
  | "leaking"
  /** A person has taken over. --success. Only ever at a branch. */
  | "human"
  /** Reached the end. --blue */
  | "complete";

/**
 * Colour per state.
 *
 * Both forms are given deliberately. DOM and SVG renderers should use
 * `cssVar` so a token change propagates. Canvas 2D and WebGL cannot read
 * CSS custom properties without a getComputedStyle round-trip per frame,
 * so they use `hex` — which is why these must be kept in sync with
 * app/globals.css and tailwind.config.ts by hand.
 */
export const THROUGHLINE_COLOURS: Record<
  ThroughlineState,
  { cssVar: string; hex: string; meaning: string }
> = {
  idle: {
    cssVar: "var(--border-strong)",
    hex: "#242A3D",
    meaning: "Structure present, nothing moving through it yet",
  },
  flowing: {
    cssVar: "var(--blue-soft)",
    hex: "#3B82F6",
    meaning: "Revenue moving",
  },
  leaking: {
    cssVar: "var(--warning, #D97706)",
    hex: "#D97706",
    meaning: "Revenue leaking — only at a gap, never decorative",
  },
  human: {
    cssVar: "var(--success, #059669)",
    hex: "#059669",
    meaning: "A person has taken over — only at a branch",
  },
  complete: {
    cssVar: "var(--blue)",
    hex: "#1A3CFF",
    meaning: "The journey completed",
  },
};

/* ------------------------------------------------------------------ */
/* The ten stages                                                      */
/* ------------------------------------------------------------------ */

export type ThroughlineStage = {
  /** Canonical stage name. Must match lib/revenue-content.ts exactly. */
  readonly label: string;
  /** Position along the line, 0 → 1. */
  readonly t: number;
  readonly kind: ThroughlineKind;
  /**
   * What happens here, in one line. This is the DOM/screen-reader text —
   * the accessible equivalent of whatever the renderer draws. No visual
   * renderer may carry meaning that is absent here.
   */
  readonly meaning: string;
};

/**
 * The canonical ten. Order and wording are fixed by governance; `t` is
 * evenly spaced because the stages are equally weighted as a model, not
 * because a real journey is evenly paced.
 *
 * GAPS are Capture, Book and Follow Up — three unattended handovers,
 * matching the leak canvas and each backed by a `leak` string in
 * revenue-content:
 *   Capture   — "lands somewhere only one person checks"
 *   Book      — "booking requires another message... or office hours"
 *   Follow Up — "a lead disappears because a human had a busy week"
 *
 * Respond is the BRANCH: it is where the system answers and hands over
 * to a person when judgement is needed. Retain and Reactivate are
 * RETURNS — the line coming back rather than ending. Grow is COMPLETION.
 */
export const THROUGHLINE_STAGES: readonly ThroughlineStage[] = [
  {
    label: "Attract",
    t: 0.0,
    kind: "node",
    meaning: "Attention arrives and has somewhere obvious to land.",
  },
  {
    label: "Capture",
    t: 0.111,
    kind: "gap",
    meaning: "Every enquiry becomes a record, whatever door it came through.",
  },
  {
    label: "Respond",
    t: 0.222,
    kind: "branch",
    meaning:
      "An answer in seconds, and a person takes over the moment judgement is needed.",
  },
  {
    label: "Qualify",
    t: 0.333,
    kind: "node",
    meaning: "The right questions asked before anyone spends time.",
  },
  {
    label: "Book",
    t: 0.444,
    kind: "gap",
    meaning: "Interest becomes an appointment inside the conversation.",
  },
  {
    label: "Convert",
    t: 0.556,
    kind: "node",
    meaning: "The appointment already won is protected.",
  },
  {
    label: "Follow Up",
    t: 0.667,
    kind: "gap",
    meaning: "Nothing depends on someone remembering.",
  },
  {
    label: "Retain",
    t: 0.778,
    kind: "return",
    meaning: "The customer comes back, because the system asked.",
  },
  {
    label: "Reactivate",
    t: 0.889,
    kind: "return",
    meaning: "Customers who went quiet are surfaced before they are gone.",
  },
  {
    label: "Grow",
    t: 1.0,
    kind: "completion",
    meaning: "The journey compounds rather than restarting each time.",
  },
] as const;

/** Indices of the three unattended handovers. */
export const GAP_STAGE_INDICES: readonly number[] = THROUGHLINE_STAGES.reduce<
  number[]
>((acc, s, i) => (s.kind === "gap" ? [...acc, i] : acc), []);

/* ------------------------------------------------------------------ */
/* Path geometry                                                       */
/* ------------------------------------------------------------------ */

export type Point = { x: number; y: number };

/**
 * The spine, in unit space.
 *
 * Shallow and mostly horizontal on purpose. A dramatic curve would read
 * as decoration; the subject is a journey through a business, and the
 * drama belongs to what happens AT the points, not to the line's shape.
 * The gentle rise toward the end is the only editorial gesture: the
 * journey ends slightly above where it began.
 */
export const THROUGHLINE_PATH: readonly Point[] = [
  { x: 0.0, y: 0.22 },
  { x: 0.14, y: 0.1 },
  { x: 0.3, y: 0.02 },
  { x: 0.46, y: -0.02 },
  { x: 0.62, y: -0.04 },
  { x: 0.78, y: -0.12 },
  { x: 0.9, y: -0.2 },
  { x: 1.0, y: -0.26 },
] as const;

/** Cumulative arc length at each control point. Computed once. */
const CUMULATIVE: readonly number[] = (() => {
  const out: number[] = [0];
  for (let i = 1; i < THROUGHLINE_PATH.length; i++) {
    const a = THROUGHLINE_PATH[i - 1];
    const b = THROUGHLINE_PATH[i];
    out.push(out[i - 1] + Math.hypot(b.x - a.x, b.y - a.y));
  }
  return out;
})();

const TOTAL_LENGTH = CUMULATIVE[CUMULATIVE.length - 1];

const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);

/**
 * Point on the spine at t (0 → 1), by arc length rather than by index —
 * so a stage at t = 0.5 is genuinely halfway along the drawn line, not
 * halfway through the control-point array.
 */
export function pointAt(t: number): Point {
  const target = clamp01(t) * TOTAL_LENGTH;
  for (let i = 1; i < CUMULATIVE.length; i++) {
    if (target > CUMULATIVE[i]) continue;
    const span = CUMULATIVE[i] - CUMULATIVE[i - 1];
    const local = span === 0 ? 0 : (target - CUMULATIVE[i - 1]) / span;
    const a = THROUGHLINE_PATH[i - 1];
    const b = THROUGHLINE_PATH[i];
    return { x: a.x + (b.x - a.x) * local, y: a.y + (b.y - a.y) * local };
  }
  return { ...THROUGHLINE_PATH[THROUGHLINE_PATH.length - 1] };
}

/** Evenly spaced points along the spine. For polylines and particles. */
export function sampleThroughline(steps = 96): Point[] {
  const out: Point[] = [];
  for (let i = 0; i <= steps; i++) out.push(pointAt(i / steps));
  return out;
}

/** Unit-space position of each stage. */
export function stagePoints(): (Point & { stage: ThroughlineStage })[] {
  return THROUGHLINE_STAGES.map((stage) => ({ ...pointAt(stage.t), stage }));
}

/* ------------------------------------------------------------------ */
/* Projection                                                          */
/* ------------------------------------------------------------------ */

export type Box = {
  width: number;
  height: number;
  /** Inset from the edges, in the same units as width/height. */
  padding?: number;
};

/**
 * Unit space → a 2D box (SVG viewBox or canvas pixels).
 *
 * y is negated because unit space treats -1 as "above the line" while
 * both SVG and canvas grow y downward.
 */
export function projectToBox(p: Point, box: Box): Point {
  const pad = box.padding ?? 0;
  const w = box.width - pad * 2;
  const h = box.height - pad * 2;
  return {
    x: pad + p.x * w,
    y: pad + h / 2 + -p.y * (h / 2),
  };
}

/**
 * Unit space → world space, for R3F.
 *
 * `spread` is the world width the line spans; `lift` is its height
 * above the ground plane. Returns a tuple ready to spread into a
 * three.js position.
 */
export function projectToWorld(
  p: Point,
  { spread = 8, lift = 0.9, depth = 0 }: { spread?: number; lift?: number; depth?: number } = {}
): [number, number, number] {
  return [(p.x - 0.5) * spread, lift + -p.y * (spread * 0.12), depth];
}

/* ------------------------------------------------------------------ */
/* State                                                               */
/* ------------------------------------------------------------------ */

/**
 * State of the line at position t, given how far the journey has
 * progressed and how far the gaps have been sealed.
 *
 * @param t        position on the line, 0 → 1
 * @param progress how far the opportunity has travelled, 0 → 1
 * @param seal     0 = every handover open and leaking, 1 = all closed.
 *                 The leak canvas already drives exactly this value from
 *                 scroll position, which is what lets the visitor close
 *                 the gaps themselves.
 */
export function stateAt(t: number, progress: number, seal = 1): ThroughlineState {
  if (t > progress) return "idle";
  if (progress >= 1 && t >= 1) return "complete";

  const stage = nearestStage(t);
  if (stage.kind === "gap" && seal < 0.999) return "leaking";
  if (stage.kind === "branch") return "human";
  return "flowing";
}

/** The stage nearest a position on the line. */
export function nearestStage(t: number): ThroughlineStage {
  const target = clamp01(t);
  let best = THROUGHLINE_STAGES[0];
  let bestDist = Infinity;
  for (const s of THROUGHLINE_STAGES) {
    const d = Math.abs(s.t - target);
    if (d < bestDist) {
      bestDist = d;
      best = s;
    }
  }
  return best;
}

/**
 * How close t is to a gap, 0 → 1, within `radius`. Renderers use this to
 * fade a break in the line in and out rather than snapping it.
 */
export function gapProximity(t: number, radius = 0.045): number {
  let closest = Infinity;
  for (const i of GAP_STAGE_INDICES) {
    closest = Math.min(closest, Math.abs(THROUGHLINE_STAGES[i].t - clamp01(t)));
  }
  if (closest >= radius) return 0;
  return 1 - closest / radius;
}
