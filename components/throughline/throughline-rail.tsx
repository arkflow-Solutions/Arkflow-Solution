"use client";

import { useEffect, useRef, useState } from "react";
import { ThroughlineCanvas } from "@/components/throughline/throughline-canvas";
import { THROUGHLINE_STAGES } from "@/lib/throughline";
import { cn } from "@/lib/utils";

/**
 * ThroughlineRail — continuity, not wallpaper.
 *
 * ────────────────────────────────────────────────────────────────
 * WHAT THIS IS FOR
 *
 * Phase 3E built ten good scenes. It did not build one film. Measured
 * from the code before this phase: the Throughline — the thing three
 * documents call the visual spine — rendered in exactly TWO of ten
 * scenes. Eight had no trace of it. The visitor was told the scenes
 * were one system and shown ten separate ones.
 *
 * This mounts the existing ThroughlineCanvas ONCE for the whole page and
 * reveals the segment that the current scene is actually about. Same
 * canonical model, same coordinates, same palette. No new geometry, no
 * second model, no new dependency.
 *
 * ────────────────────────────────────────────────────────────────
 * IT IS DELIBERATELY NOT ALWAYS VISIBLE.
 *
 * A glowing line permanently behind the site is decorative neon, and it
 * would make the Throughline mean less rather than more. The founder
 * instruction is explicit and correct: continuity is the goal, constant
 * visibility is not.
 *
 * So presence varies per scene. The line emerges where the scene is
 * about a point on it, recedes behind content where the scene is about
 * something else, and DISAPPEARS ENTIRELY in the two scenes that draw
 * their own Throughline (the pivot and the journey) — otherwise the
 * page would show two lines at once, which is the fastest way to prove
 * they are not the same object.
 *
 * The visitor should end up thinking "this is the same thing I have
 * been following", never "there is a glowing line behind the website".
 *
 * ────────────────────────────────────────────────────────────────
 * PERFORMANCE — THE HARD RULE
 *
 * There must never be two active Canvas 2D loops.
 *
 * The hero renders LeakFlow only when it cannot run WebGL. On such a
 * device LeakFlow is the one 2D loop and this rail MUST NOT mount. The
 * gate below mirrors the WebGL2 test in lib/use-scene-gate.ts exactly,
 * so the two decisions can never disagree:
 *
 *   WebGL device      hero = 1 WebGL scene, rail = the 1 Canvas 2D loop
 *   non-WebGL device  hero = LeakFlow (the 1 Canvas 2D loop), rail = off
 *   reduced motion    tier "none" -> hero = LeakFlow -> rail = off
 *
 * The canvas itself already stops entirely when offscreen or when the
 * tab is hidden, and never starts under prefers-reduced-motion.
 */

/**
 * What the rail shows during each scene.
 *
 * `stage` is an index into the canonical THROUGHLINE_STAGES and is the
 * SAME stage each scene already declares to SceneAtmosphere — the
 * mapping is not invented here, it is made visible here.
 *
 * `presence` is opacity. The two scenes that draw their own Throughline
 * carry presence 0, so the page never shows two lines at once.
 */
type Frame = {
  id: string;
  stage: number;
  seal: number;
  presence: number;
  /**
   * PHASE 3F.3A — the journey sweeps instead of holding one stage.
   *
   * Every other scene is ABOUT a stage, so the line brightens there and
   * stays. The journey is about the whole line, so its focus is driven
   * by how far the visitor has scrolled through the scene: the
   * opportunity travels Website → Growth as they read it.
   *
   * This is why scene 09 no longer draws a Throughline of its own. It
   * used to render a static SVG of the same path, which meant the
   * "journey" was a picture of a line next to a list. Now it is the
   * same line, carrying the same opportunity, that the visitor has been
   * following since scene 02 — which is the only way the scene can
   * honestly claim to be the continuation of the story.
   */
  sweep?: boolean;
};

const FRAMES: readonly Frame[] = [
  // Capture — the enquiry nobody answered. The gap is open.
  { id: "unanswered", stage: 1, seal: 0, presence: 0.32 },
  // Book — the week nothing happened. Also open.
  { id: "the-days", stage: 4, seal: 0, presence: 0.32 },
  // Reactivate — the only place the line loops back on itself.
  { id: "reactivation", stage: 8, seal: 1, presence: 0.28 },
  // Respond — the staff cost of the same gaps. The line runs beside
  // this scene rather than through it, so it sits furthest back.
  { id: "the-desk", stage: 2, seal: 0.4, presence: 0.18 },
  // The pivot draws its own full line. Stand down.
  { id: "the-shift", stage: 9, seal: 1, presence: 0 },
  // The conversation is a magnified segment of Capture → Book.
  { id: "ai-conversation", stage: 4, seal: 1, presence: 0.24 },
  // Respond again — the branch, where a person takes over.
  { id: "human-and-ai", stage: 2, seal: 1, presence: 0.26 },
  // The journey IS the line. Dominant, and swept end to end.
  { id: "the-journey", stage: 9, seal: 1, presence: 0.85, sweep: true },
  /* The close draws its own backbone, with the system attached to it,
     so the rail stands down exactly as it does for the pivot. Two lines
     at once was the defect corrected in scene 09. */
  { id: "revenue-leak-audit", stage: 9, seal: 1, presence: 0 },
] as const;

/** Mirrors lib/use-scene-gate.ts. If that test changes, change this. */
function canRunWebgl() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  try {
    const c = document.createElement("canvas");
    if (!c.getContext("webgl2")) return false;
  } catch {
    return false;
  }
  return (navigator.hardwareConcurrency ?? 4) > 2;
}

export function ThroughlineRail() {
  /**
   * null until measured. Rendering nothing on the server and on the
   * first client frame is deliberate: the rail is decoration, and
   * decoration must never be what decides the page's first paint.
   */
  const [enabled, setEnabled] = useState<boolean | null>(null);
  const [lite, setLite] = useState(false);
  const [frame, setFrame] = useState<Frame | null>(null);
  const [sweepT, setSweepT] = useState(0);
  /** Last mapped stage, so focus never rewinds while the line is hidden. */
  const heldRef = useRef(THROUGHLINE_STAGES[1].t);
  /** Last stage index broadcast, so we only announce real changes. */
  const announced = useRef(-1);

  useEffect(() => {
    // The hero owns the one Canvas 2D loop on devices without WebGL.
    setEnabled(canRunWebgl());
    setLite(window.matchMedia("(max-width: 900px)").matches);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const sections = FRAMES.map((f) => ({
      f,
      el: document.getElementById(f.id),
    })).filter((s): s is { f: Frame; el: HTMLElement } => Boolean(s.el));

    if (!sections.length) return;

    /* Whichever mapped scene occupies most of the viewport wins. A
       simple "is intersecting" test flickers between two scenes at a
       boundary; dominance does not. */
    const pick = () => {
      const vh = window.innerHeight || 1;
      let best: Frame | null = null;
      let bestArea = 0;
      let bestEl: HTMLElement | null = null;
      for (const { f, el } of sections) {
        const r = el.getBoundingClientRect();
        const area = Math.min(r.bottom, vh) - Math.max(r.top, 0);
        if (area > bestArea) {
          bestArea = area;
          best = f;
          bestEl = el;
        }
      }
      // Nothing mapped is on screen — the hero, or the footer. The rail
      // is absent there, which is correct: the hero has its own scene.
      const won = bestArea > vh * 0.25 ? best : null;

      /* For a sweeping scene, how far the visitor has read through it.
         Measured against the section's own travel past the viewport
         middle, so the opportunity reaches Growth as the scene ends
         rather than long before or after. */
      let sweep = 0;
      if (won?.sweep && bestEl) {
        const r = bestEl.getBoundingClientRect();
        const span = r.height + vh * 0.4;
        sweep = Math.max(0, Math.min(1, (vh * 0.7 - r.top) / span));
      }

      setFrame(won);
      setSweepT(sweep);
    };

    /* Throttled on a timestamp rather than requestAnimationFrame.
       rAF is the usual choice, but it is starved whenever the browser
       is not painting — a background tab, a low-power mode, a throttled
       frame loop — and a starved rAF would leave the spine frozen on
       whichever scene it last saw. A stale line is worse than no line,
       because it silently stops being about the scene it is behind.

       Nine getBoundingClientRect reads at 10Hz is not a cost worth
       optimising away with a mechanism that can stop running. */
    let last = 0;
    const onScroll = () => {
      const now = Date.now();
      if (now - last < 100) return;
      last = now;
      pick();
    };

    pick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [enabled]);

  if (!enabled) return null;

  const presence = frame?.presence ?? 0;
  const stage = frame ? THROUGHLINE_STAGES[frame.stage] : undefined;
  /* When no scene is mapped — the hero, the footer, the two scenes that
     draw their own line — the canvas is invisible anyway, but its focus
     must not reset to 0 or the eased travel would rewind while hidden
     and the next scene would start with the line sliding in from the
     beginning. Holding the last stage keeps the journey monotonic. */
  if (stage) heldRef.current = stage.t;

  /* A sweeping scene overrides its fixed stage: focus runs the whole
     line as the visitor reads. Everything else holds its own stage. */
  const focusT = frame?.sweep ? sweepT : (stage?.t ?? heldRef.current);
  if (frame?.sweep) heldRef.current = focusT;
  const held = heldRef.current;

  /* Tell the page which stage the opportunity has reached, so the
     journey's DOM list can follow the SAME object rather than running
     its own parallel animation. One event, only on change, matching
     the house pattern already used by arkflow:open-booking. The list
     is authoritative either way: if this never fires, every stage is
     still present and readable. */
  if (typeof window !== "undefined" && frame?.sweep) {
    let nearest = 0;
    let bestD = Infinity;
    THROUGHLINE_STAGES.forEach((s, i) => {
      const d = Math.abs(s.t - focusT);
      if (d < bestD) {
        bestD = d;
        nearest = i;
      }
    });
    if (nearest !== announced.current) {
      announced.current = nearest;
      window.dispatchEvent(
        new CustomEvent("arkflow:throughline", { detail: { stage: nearest } })
      );
    }
  }

  return (
    <div
      className={cn("af-spine", presence > 0 && "is-on")}
      style={{ ["--spine-presence" as string]: presence.toFixed(2) }}
      /* Decorative in the strictest sense. Every stage name, meaning and
         state on this page is real text in the DOM; this reinforces the
         story and never carries it. */
      aria-hidden
      data-rail-stage={stage?.label ?? "none"}
    >
      {/* `focus` is what makes this an object rather than a backdrop:
          the line brightens around the stage this scene is about and
          recedes elsewhere, and the opportunity works that stretch.
          Held at the last stage while nothing is mapped, so the line
          does not snap back to the start between scenes. */}
      <ThroughlineCanvas
        seal={frame?.seal ?? 0}
        focus={held}
        lite={lite}
        className="af-spine__c"
      />
    </div>
  );
}
