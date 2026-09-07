"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Scene, useSceneTurn } from "@/components/home/scenes/scene";
import { THROUGHLINE_STAGES } from "@/lib/throughline";
import { publicLabel, hasDistinctLabel } from "@/lib/stage-labels";
import { sceneJourney } from "@/lib/scene-content";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

/* ==================================================== SCENE 09
 *
 * THE WHOLE JOURNEY. The first time the visitor sees the complete line.
 *
 * By this point they have watched four segments of it break and be
 * closed, watched a real conversation run along it, and seen where the
 * machine stops. Only now is the full ten-stage model worth showing —
 * because now every stage refers to something they have already seen
 * rather than to vocabulary they have to learn.
 *
 * PLAIN ENGLISH FIRST, CANONICAL NAMES SECOND.
 *
 * The stage names on screen are the public labels from
 * lib/stage-labels.ts: Website, Enquiry, Response, Qualification,
 * Booking, Conversion, Follow-up, Retention, Reactivation, Growth.
 *
 * The canonical keys — Attract, Capture, Respond, Qualify, Book,
 * Convert, Follow Up, Retain, Reactivate, Grow — are UNCHANGED in the
 * data model and are available here behind a toggle for anyone who
 * wants the engineering vocabulary. Nothing about the canonical model
 * moved; only the caption did. scripts/verify.mjs check 4 reads the
 * keys and is unaffected.
 *
 * THE LINE IS NOT DRAWN HERE (Phase 3F.3A).
 *
 * This scene used to own two ThroughlineSvg renders — a wide and a
 * narrow layout preset — sitting above the list. Both are gone. The
 * path is now the page's Throughline rail, swept across all ten stages
 * as the visitor reads, so the thing moving through this scene is
 * demonstrably the same opportunity that has been travelling since
 * scene 02 rather than a fresh drawing of the same shape.
 *
 * That also removes the two competing lines this scene had: the rail
 * previously stood down here precisely because the scene drew its own.
 */

const LAST = THROUGHLINE_STAGES.length - 1;

export function SceneJourney() {
  const ref = useRef<HTMLDivElement>(null);
  const { turn, settled } = useSceneTurn(ref);
  const [technical, setTechnical] = useState(false);

  /**
   * Which stage the opportunity has reached.
   *
   * Driven by the page's Throughline, not by a second animation of our
   * own: the rail broadcasts the stage as the line sweeps, and this
   * list follows it. That is what makes the marker on the line and the
   * name in the list the same object rather than two things that happen
   * to agree.
   *
   * Under reduced motion the rail never sweeps and no event arrives, so
   * this resolves to the completed journey — every stage passed, which
   * is the honest resting state.
   */
  const [railStage, setRailStage] = useState<number | null>(null);

  useEffect(() => {
    if (settled) return;
    const onStage = (e: Event) => {
      const i = (e as CustomEvent<{ stage: number }>).detail?.stage;
      if (typeof i === "number") setRailStage(i);
    };
    window.addEventListener("arkflow:throughline", onStage);
    return () => window.removeEventListener("arkflow:throughline", onStage);
  }, [settled]);

  /**
   * THE LIST NEVER DEPENDS ON THE CANVAS.
   *
   * The rail does not mount at all on a device without WebGL — there the
   * hero owns the single Canvas 2D loop and the spine stands down — so
   * no sweep events ever arrive. Without a fallback those visitors would
   * see nine of ten stages sitting permanently dim, which reads as a
   * broken or unfinished list rather than a journey.
   *
   * So the rail's broadcast is an ENHANCEMENT, not the source. When it
   * is speaking, the list follows the opportunity on the line, and the
   * two are visibly the same object. When it is silent, the scene's own
   * scroll progress walks the list instead. Same behaviour either way;
   * one path is simply better synchronised with the visual.
   */
  const walked = Math.min(LAST, Math.floor(turn * (LAST + 1)));
  const active = settled ? LAST : (railStage ?? walked);

  return (
    <Scene
      id="the-journey"
      emphasis={1.15}
      stageIndex={LAST}
      seal={1}
      title={sceneJourney.title}
      lead={sceneJourney.lead}
    >
      <div ref={ref} className="af-journey">
        {/* PHASE 3F.3A — THIS SCENE NO LONGER DRAWS ITS OWN LINE.
            It used to render a static ThroughlineSvg of the same path
            above a numbered list, which meant the "journey" was a
            picture of a line beside ten descriptions: a feature list
            with an illustration on top. 76% of the scene's text sat
            inside <li> elements, the highest on the page.

            The line is now the page's Throughline — the same one the
            visitor has been following since scene 02, carrying the same
            opportunity — swept end to end as they read. The list below
            stays complete and authoritative; what changed is that it is
            no longer pretending to be the visual. */}

        {/* All ten stages, always in the DOM with their meanings. The
            visual emphasises one at a time; nothing is ever hidden,
            removed or collapsed to zero, so a screen reader and a
            keyboard user get the entire journey regardless of scroll
            position or whether the canvas ever ran. */}
        <ol className="af-journey__stages">
          {THROUGHLINE_STAGES.map((stage, i) => {
            /* Three states, so the list reads as a position on a
               journey rather than ten equal rows: what the opportunity
               has passed, where it is now, and what is still ahead. */
            const passed = i < active;
            const here = i === active;
            return (
              <li
                key={stage.label}
                className={cn(
                  "af-jstage",
                  passed && "is-passed",
                  here && "is-here"
                )}
                aria-current={here ? "step" : undefined}
              >
                <span className="af-jstage__n">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="af-jstage__body">
                  <span className="af-jstage__name">
                    {publicLabel(stage.label)}
                  </span>
                  {/* Stage one is the front door, and ArkFlow builds
                      it. Placed here rather than in a section of its
                      own: the visitor is already reading "Website" as
                      step one of their own journey, which is the only
                      context in which the capability needs no
                      explaining. */}
                  {i === 0 && (
                    <Link href="/attract" className="af-jstage__build">
                      {sceneJourney.buildLink}
                    </Link>
                  )}
                  {technical && hasDistinctLabel(stage.label) && (
                    <span className="af-jstage__canon">{stage.label}</span>
                  )}
                  <span className="af-jstage__meaning">{stage.meaning}</span>
                </span>
              </li>
            );
          })}
        </ol>

        <div className="af-journey__foot">
          <button
            type="button"
            className="af-journey__toggle"
            aria-pressed={technical}
            onClick={() => {
              setTechnical((v) => !v);
              // Both the event name and the parameter keys are closed
              // unions on purpose — the analytics vocabulary is
              // governed, so this uses the existing interaction event
              // and the existing `view` key rather than extending it.
              track("demo_interaction", {
                location: "homepage_journey",
                view: technical ? "public_labels" : "technical_labels",
              });
            }}
          >
            {sceneJourney.technicalToggle}
          </button>
          {technical && (
            <p className="af-journey__note">{sceneJourney.technicalNote}</p>
          )}
        </div>
      </div>
    </Scene>
  );
}
