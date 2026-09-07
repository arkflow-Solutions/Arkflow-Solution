"use client";

import { useRef } from "react";
import { Scene, useSceneTurn } from "@/components/home/scenes/scene";
import { sceneDesk } from "@/lib/scene-content";
import { cn } from "@/lib/utils";

/* ==================================================== SCENE 05
 *
 * THE DESK. The first four scenes are the customer's experience of the
 * gaps. This one is the staff experience of the same gaps: a person
 * spending their day being the connection between systems that do not
 * talk to each other.
 *
 * NO PEOPLE ARE DRAWN. Explicit founder instruction, and correct — a
 * cartoon figure at a desk is the single fastest way to turn a premium
 * dark composition into a stock SaaS illustration. What is shown is the
 * SURFACES: a conversation, a calendar, a record, a notification, a
 * spreadsheet. The human presence is implied by the fragments being
 * carried between them by hand.
 *
 * ────────────────────────────────────────────────────────────────
 * NO PRODUCTIVITY CLAIMS. There is no time saved, no hours reclaimed,
 * no task count, no "X% less admin" anywhere in this scene, and none
 * may be added. What changes visually is that the manual carrying
 * stops. How much that is worth is a conversation, not a number on a
 * homepage.
 *
 * The invoice / payment-reminder line from the original approved copy
 * is deliberately absent — it is not in the current capability set and
 * verify.mjs check 13 blocks the phrasing. See lib/scene-content.ts.
 * ────────────────────────────────────────────────────────────────
 */

/** The surfaces on the desk. Recognisable objects, not abstractions. */
const SURFACES = [
  { key: "conversation", name: "Conversation", detail: "3 unread" },
  { key: "calendar", name: "Calendar", detail: "Thu 10:30" },
  { key: "record", name: "Customer record", detail: "J. Tan" },
  { key: "notification", name: "Form notification", detail: "New enquiry" },
  { key: "sheet", name: "Spreadsheet", detail: "Follow-ups" },
] as const;

export function SceneDesk() {
  const ref = useRef<HTMLDivElement>(null);
  const { turn, settled } = useSceneTurn(ref);
  const connected = settled ? 1 : turn;

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
      <div ref={ref} className="af-desk">
        {/* --- the surfaces ------------------------------------- */}
        <div
          className={cn("af-desk__field", connected > 0.5 && "is-connected")}
          style={{ ["--wire" as string]: connected.toFixed(2) }}
        >
          {SURFACES.map((s) => (
            <div key={s.key} className={cn("af-surface", `af-surface--${s.key}`)}>
              <span className="af-surface__n">{s.name}</span>
              <span className="af-surface__d">{s.detail}</span>
            </div>
          ))}

          {/* The connections. Drawn at zero length while the work is
              manual, then completing as the system takes it over. The
              lines are decorative — every surface is real text above. */}
          <svg className="af-desk__wires" viewBox="0 0 600 260" aria-hidden>
            <path d="M110 60 H300 V130 H490" className="af-wire" />
            <path d="M110 200 H300" className="af-wire" />
            <path d="M300 130 V200 H490" className="af-wire" />
          </svg>
        </div>

        {/* --- what moves off the person, and what never should --- */}
        <div className="af-desk__split">
          <div className="af-desk__col">
            <p className="af-desk__label af-desk__label--ai">
              <i className="af-dot af-dot--flow" aria-hidden />
              {sceneDesk.handledLabel}
            </p>
            <ul className="af-desk__list">
              {sceneDesk.handled.map((h) => (
                <li
                  key={h}
                  className={cn("af-desk__item", connected > 0.4 && "is-moved")}
                >
                  {h}
                </li>
              ))}
            </ul>
          </div>

          <div className="af-desk__col">
            <p className="af-desk__label af-desk__label--human">
              <i className="af-dot af-dot--human" aria-hidden />
              {sceneDesk.humanLabel}
            </p>
            <ul className="af-desk__list af-desk__list--human">
              {sceneDesk.human.map((h) => (
                <li key={h} className="af-desk__item is-human">
                  {h}
                </li>
              ))}
            </ul>
            <p className="af-desk__close">{sceneDesk.close}</p>
          </div>
        </div>
      </div>
    </Scene>
  );
}
