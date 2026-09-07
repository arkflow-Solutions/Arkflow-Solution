"use client";

import { useEffect, useState } from "react";
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
  // The journey draws its own full line. Stand down.
  { id: "the-journey", stage: 9, seal: 1, presence: 0 },
  // Grow. The line resolves as the visitor arrives at the close.
  { id: "revenue-leak-audit", stage: 9, seal: 1, presence: 0.44 },
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
      for (const { f, el } of sections) {
        const r = el.getBoundingClientRect();
        const area = Math.min(r.bottom, vh) - Math.max(r.top, 0);
        if (area > bestArea) {
          bestArea = area;
          best = f;
        }
      }
      // Nothing mapped is on screen — the hero, or the footer. The rail
      // is absent there, which is correct: the hero has its own scene.
      setFrame(bestArea > vh * 0.25 ? best : null);
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
      <ThroughlineCanvas seal={frame?.seal ?? 0} lite={lite} className="af-spine__c" />
    </div>
  );
}
