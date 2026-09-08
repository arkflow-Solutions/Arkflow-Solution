"use client";

import { useRef } from "react";
import { Scene, useSceneTurn } from "@/components/home/scenes/scene";
import { sceneDesk } from "@/lib/scene-content";
import { cn } from "@/lib/utils";

/* ==================================================== SCENE 05
 *
 * THE DESK — one detail, four places.
 *
 * The first four scenes are the customer's experience of the gaps. This
 * one is the staff experience of the same gaps: a person spending their
 * day being the connection between things that do not talk to each
 * other.
 *
 * ────────────────────────────────────────────────────────────────
 * WHAT THIS REPLACED, AND WHY
 *
 * Phase 3E drew five surfaces in a CSS grid with three hardcoded SVG
 * paths over them. Measured, those paths connected nothing: the viewBox
 * was a fixed 600x260 while the grid was two columns below 768px and
 * three above it, so every wire terminus landed either inside a card
 * (painted beneath it, invisible) or in a gutter. Calendar and Customer
 * record — the two surfaces that mattered — were joined to nothing at
 * all. At 375px the viewBox letterboxed into a band floating across the
 * middle of the composition. It was an architecture diagram whose arrows
 * were decorative and wrong.
 *
 * It is gone. There is no SVG in this scene, no path, no arrow and no
 * wire, and none may be added: a diagram is the one thing a business
 * owner cannot read.
 *
 * ────────────────────────────────────────────────────────────────
 * WHAT IT SHOWS INSTEAD
 *
 * The clearest non-jargon image of "not connected" is the same fact
 * written in four places and the four not matching. The calendar says
 * Thu 10:30, the thread says "thurs 10.30am", the follow-up says
 * "Thu 10am?", and the record says nothing.
 *
 * THE LAYOUT PERFORMS THE MEANING. Disconnected is four separated rows
 * with gaps between them. Connected is the gaps collapsing to zero, the
 * borders merging into one panel, and the values agreeing. Nothing is
 * explained; the geometry changes and the words stop disagreeing.
 *
 * ────────────────────────────────────────────────────────────────
 * THIS IS STILL A PROBLEM SCENE.
 *
 * Scene 06 is the page's turn and must stay that way. So the resolution
 * here is an exhale, not the subject: the rows hold their disagreement
 * through the first third of the traversal, and what the visitor should
 * carry out of scene 05 is "four places, and they do not match".
 *
 * NO PEOPLE ARE DRAWN. Founder instruction, and correct — a figure at a
 * desk turns a premium dark composition into stock SaaS illustration.
 * The person is present only as the thing carrying the detail around.
 *
 * NO PRODUCTIVITY CLAIMS. No time saved, no hours reclaimed, no task
 * count, no percentage, and none may be added.
 *
 * COLOUR CARRIES NOTHING. The disagreement is legible as text —
 * "thurs 10.30am" against "Thu 10:30" — so the whole argument survives
 * greyscale, colour blindness and a stylesheet that fails to load.
 */

export function SceneDesk() {
  const ref = useRef<HTMLDivElement>(null);
  const { progress, turn, settled } = useSceneTurn(ref);
  const connected = settled ? 1 : turn;

  /* Five beats in one scroll, no pinning.
     The first two ride `progress` so the composition is present as the
     scene arrives; the last three ride the shared `turn`, which is what
     keeps this scene's resolution on the same rhythm as scenes 02 and
     03. Under reduced motion `settled` is true from the first frame and
     every beat resolves at once — see the media block in globals.css,
     which keeps BOTH values visible so the comparison survives. */
  const arrived = settled || progress > 0.15;
  const listed = settled || progress > 0.24;
  const joined = settled || turn > 0.35;
  const agreed = settled || turn > 0.45;
  const named = settled || turn > 0.6;

  return (
    <Scene
      id="the-desk"
      /* Respond — the stage where a person is currently the system. */
      emphasis={0.7}
      stageIndex={2}
      seal={connected}
      title={sceneDesk.title}
      lead={sceneDesk.lead}
    >
      <div
        ref={ref}
        className={cn(
          "af-once",
          arrived && "is-arrived",
          listed && "is-listed",
          joined && "is-joined",
          agreed && "is-agreed",
          named && "is-named"
        )}
      >
        {/* The appointment. It lands alone, because a business owner
            recognises an appointment before anything else on the page. */}
        <p className="af-once__detail">{sceneDesk.detail}</p>

        {/* One state label, swapped rather than cross-faded — two words
            sharing a cell is the collision this codebase has already
            paid for once. The dot reinforces; the text carries. */}
        <p className="af-once__state">
          <i
            className={cn("af-dot", named ? "af-dot--flow" : "af-dot--leak")}
            aria-hidden
          />
          {named ? sceneDesk.resolvedLabel : sceneDesk.problemLabel}
        </p>

        {/* A description list, because that is exactly what this is: a
            surface, and what that surface currently says. With styles
            off it still reads "Conversation: thurs 10.30am. Calendar:
            Thu 10:30." — the argument intact, in the DOM. */}
        <dl className="af-once__rows">
          {sceneDesk.places.map((p, i) => (
            <div
              key={p.name}
              className="af-once__row"
              style={{ ["--i" as string]: i }}
            >
              <dt className="af-once__label">{p.name}</dt>
              <dd className="af-once__value">
                <span className="af-once__was">
                  {p.was ?? (
                    <>
                      <span aria-hidden>—</span>
                      <span className="sr-only">{sceneDesk.blank}</span>
                    </>
                  )}
                </span>
                <span className="af-once__is">{sceneDesk.agreed}</span>
              </dd>
            </div>
          ))}
        </dl>

        <p className="af-once__close">{sceneDesk.close}</p>
      </div>
    </Scene>
  );
}
