"use client";

import { useRef } from "react";
import { Container } from "@/components/ui/container";
import { SceneAtmosphere } from "@/components/motion/scene-atmosphere";
import { useViewportProgress } from "@/lib/use-viewport-progress";
import { THROUGHLINE_STAGES } from "@/lib/throughline";
import { cn } from "@/lib/utils";

/**
 * Scene — the shell every homepage scene sits in (Phase 3E).
 *
 * THE PROBLEM THIS SOLVES. Ten animated sections in a row is ten
 * feature demonstrations, which is exactly what this homepage must not
 * be. What makes them one story is that they share a spine: the same
 * Throughline, the same light, the same moment of turning. This shell
 * is that shared spine, so the consistency is structural rather than
 * something each scene has to remember.
 *
 * WHAT IT PROVIDES
 *  · Phase 3D atmosphere, keyed to the stage of the Throughline that
 *    this scene is about. Scene 02 is lit as Capture, scene 03 as Book.
 *    The environment therefore moves through the engine as the visitor
 *    scrolls, without anything saying so.
 *  · One turn parameter. Every scene shows a broken state, turns, and
 *    shows the whole state. They all turn at the same point in their
 *    own traversal, so the page develops a rhythm instead of feeling
 *    like a playlist.
 *  · A heading treatment small enough that the visual leads.
 *
 * REDUCED MOTION. `useViewportProgress` resolves to its final value and
 * reports `settled`. Scenes read that and render BOTH states at once,
 * statically — the comparison is the content, so a reduced-motion
 * visitor must still get both halves of it, not just the happy ending.
 */

const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);

/** Where in a scene's traversal the problem becomes the resolution. */
const TURN_AT = 0.42;
const TURN_OVER = 0.2;

export function useSceneTurn(ref: React.RefObject<HTMLElement>) {
  // 0.02 quantisation: at most fifty commits across a whole traversal
  // rather than one per frame. The CSS transitions interpolate between
  // them, so nothing reads as stepped. Ten scenes at one render per
  // frame would not be affordable.
  const { progress, settled } = useViewportProgress(ref, 1, 0.02);
  const turn = clamp01((progress - TURN_AT) / TURN_OVER);
  return { progress, turn, settled };
}

export function Scene({
  id,
  /** Canonical stage index this scene is about. Drives the light. */
  stageIndex,
  /** 0 = the handover is open and leaking, 1 = closed. */
  seal = 0,
  eyebrow,
  title,
  titleAccent,
  lead,
  children,
  className,
  /** Scenes that supply their own full-bleed composition. */
  bare = false,
}: {
  id: string;
  stageIndex?: number;
  seal?: number;
  eyebrow?: string;
  title: string;
  titleAccent?: string;
  lead?: string;
  children: React.ReactNode;
  className?: string;
  bare?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const { progress } = useSceneTurn(ref);
  const stage =
    stageIndex !== undefined ? THROUGHLINE_STAGES[stageIndex] : undefined;

  return (
    <section ref={ref} id={id} className={cn("af-scene hairline", className)}>
      <SceneAtmosphere
        progress={progress}
        seal={seal}
        focusT={stage?.t}
        vignette={false}
        className="af-scene__atmos"
      >
        <Container>
          <header className="af-scene__head">
            {eyebrow && <p className="af-scene__eyebrow">{eyebrow}</p>}
            <h2 className="af-scene__title">
              {title}
              {titleAccent && (
                <>
                  {" "}
                  <span className="af-leak-word">{titleAccent}</span>
                </>
              )}
            </h2>
            {lead && <p className="af-scene__lead">{lead}</p>}
          </header>

          <div className={cn(!bare && "af-scene__body")}>{children}</div>
        </Container>
      </SceneAtmosphere>
    </section>
  );
}

/**
 * SceneCompare — the before/after frame used by scenes 02, 03 and 05.
 *
 * On a wide screen the two states sit side by side and the resolved one
 * arrives as the scene turns. On a narrow screen they stack, because a
 * two-column comparison at 375px is two unreadable columns. Under
 * reduced motion both are simply present, fully lit.
 *
 * The labels are real text in the DOM, not decoration: the whole
 * argument of a comparison is which side you are looking at.
 */
export function SceneCompare({
  turn,
  settled,
  problemLabel,
  resolvedLabel,
  problem,
  resolved,
  note,
}: {
  turn: number;
  settled: boolean;
  problemLabel: string;
  resolvedLabel: string;
  problem: React.ReactNode;
  resolved: React.ReactNode;
  note?: string;
}) {
  const showResolved = settled || turn > 0.02;
  return (
    <div className="af-cmp">
      <div
        className={cn("af-cmp__side", !settled && turn > 0.7 && "is-dim")}
        data-state="problem"
      >
        <p className="af-cmp__label af-cmp__label--leak">
          <i className="af-dot af-dot--leak" aria-hidden />
          {problemLabel}
        </p>
        {problem}
      </div>

      <div
        className={cn("af-cmp__side", showResolved && "is-on")}
        data-state="resolved"
        style={settled ? undefined : { opacity: 0.12 + turn * 0.88 }}
      >
        <p className="af-cmp__label af-cmp__label--flow">
          <i className="af-dot af-dot--flow" aria-hidden />
          {resolvedLabel}
        </p>
        {resolved}
      </div>

      {note && <p className="af-cmp__note">{note}</p>}
    </div>
  );
}
