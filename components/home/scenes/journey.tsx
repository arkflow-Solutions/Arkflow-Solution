"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Scene, useSceneTurn } from "@/components/home/scenes/scene";
import {
  ThroughlineSvg,
  type ThroughlineLayout,
} from "@/components/throughline/throughline-svg";
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
 * LAYOUT. The Attract→Capture proof on /attract uses a strong
 * perspective (0.6) because it is about the first two stages and wants
 * the far field to recede. This scene is about all ten equally, so it
 * uses a near-linear exponent and a wider box. Same renderer, same
 * model, different composition — which is the whole point of the
 * Throughline being layout-parameterised.
 */

const JOURNEY_LAYOUT: ThroughlineLayout = {
  width: 1240,
  height: 260,
  padLeft: 40,
  padRight: 40,
  /** Near-linear: ten stages need even spacing to be readable. */
  perspective: 0.92,
  amplitude: 190,
};

const JOURNEY_NARROW: ThroughlineLayout = {
  width: 560,
  height: 460,
  padLeft: 30,
  padRight: 30,
  perspective: 0.95,
  amplitude: 260,
};

const LAST = THROUGHLINE_STAGES.length - 1;

export function SceneJourney() {
  const ref = useRef<HTMLDivElement>(null);
  const { turn, settled } = useSceneTurn(ref);
  const [technical, setTechnical] = useState(false);

  // One opportunity travelling the whole line as the scene is read.
  const travelled = settled ? 1 : Math.min(1, turn * 1.15);

  return (
    <Scene
      id="the-journey"
      stageIndex={LAST}
      seal={1}
      title={sceneJourney.title}
      lead={sceneJourney.lead}
    >
      <div ref={ref} className="af-journey">
        {/* The line. Decorative: every stage below is real text. */}
        <div className="af-journey__line af-journey__line--wide">
          <ThroughlineSvg
            progress={travelled}
            seal={1}
            focusStageIndex={LAST}
            layout={JOURNEY_LAYOUT}
            title="The ten stages of the ArkFlow customer journey"
          />
        </div>
        <div className="af-journey__line af-journey__line--narrow">
          <ThroughlineSvg
            progress={travelled}
            seal={1}
            focusStageIndex={LAST}
            layout={JOURNEY_NARROW}
          />
        </div>

        {/* The stages, in plain English. This list is the accessible
            equivalent of the line above and carries the meaning on its
            own — the visual is an illustration of it, not the source. */}
        <ol className="af-journey__stages">
          {THROUGHLINE_STAGES.map((stage, i) => {
            const reached = travelled >= stage.t - 0.02;
            return (
              <li
                key={stage.label}
                className={cn("af-jstage", reached && "is-on")}
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
