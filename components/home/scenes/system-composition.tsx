"use client";

import { useRef } from "react";
import {
  ThroughlineSvg,
  layoutThroughline,
  type ThroughlineLayout,
} from "@/components/throughline/throughline-svg";
import { THROUGHLINE_STAGES } from "@/lib/throughline";
import { useSceneTurn } from "@/components/home/scenes/scene";
import { sceneClose } from "@/lib/scene-content";
import { cn } from "@/lib/utils";

/**
 * SystemComposition — the zoom-out.
 *
 * Scene 09 showed the journey as a line travelled left to right. This is
 * the same line, complete and sealed, with the working surfaces hanging
 * off it at the points they actually serve. The claim it makes visually,
 * before a word is read, is that the ten stages and the software are ONE
 * object rather than two topics.
 *
 * ────────────────────────────────────────────────────────────────
 * WHY THIS SCENE DRAWS THE LINE AND THE RAIL STANDS DOWN
 *
 * The page's Throughline rail is fixed to the viewport. Artefacts that
 * scroll with the document cannot be attached to it — their positions
 * would drift apart on every scroll frame. Since the whole point here is
 * ATTACHMENT, the backbone has to live in the scene's own flow.
 *
 * So the rail's presence for this scene goes to zero and the composition
 * owns the line, which is exactly the arrangement the pivot (scene 06)
 * already uses. Same renderer, same canonical coordinates, same palette
 * — not a new visual language, and never two lines at once. That was the
 * defect corrected in scene 09 and it must not be reintroduced here.
 *
 * ────────────────────────────────────────────────────────────────
 * FOUR ARTEFACTS, NOT SIX
 *
 * The brief allowed up to six and asked for four if six cluttered. Four
 * is right, for a reason beyond density: the two dropped surfaces —
 * Website and Retention — are also public STAGE labels, so putting them
 * on the line would have restated scene 09 a third time. Website already
 * has its own route from scene 09's stage one; Retention is a stage the
 * visitor has just walked past.
 *
 * What remains is the four things a business owner recognises as objects
 * rather than concepts: a record, a conversation, a calendar, a next
 * action. Each is placed at the canonical stage it belongs to, and each
 * is a FRAGMENT — never a panel, never a dashboard, never a chart.
 *
 * NOTHING HERE IS A METRIC. No counts, no rates, no totals, no revenue.
 * The record uses the same representative placeholder identity as the
 * rest of the site.
 */

/** Flat and wide: four positions must be readable, none may crowd. */
const SYSTEM_LAYOUT: ThroughlineLayout = {
  width: 1200,
  height: 210,
  padLeft: 70,
  padRight: 70,
  /** Near-linear. Perspective would bunch the later artefacts. */
  perspective: 0.94,
  amplitude: 140,
};

/**
 * The phone gets a narrow composition of the same line, and the
 * artefacts stack beneath it rather than pretending to be pinned to
 * points that are forty pixels apart.
 */
const SYSTEM_NARROW: ThroughlineLayout = {
  width: 560,
  height: 260,
  padLeft: 34,
  padRight: 34,
  perspective: 0.7,
  amplitude: 190,
};

/**
 * Each artefact sits at the canonical stage it serves.
 *
 *   Capture    the record is created the moment an enquiry lands
 *   Respond    the conversation, and where a person can take over
 *   Book       the calendar
 *   Follow Up  the next action
 *
 * `side` alternates so neighbouring artefacts can never collide: Capture
 * and Respond are only ten percent of the width apart, which is closer
 * than a single card is wide.
 */
const SURFACES = [
  { key: "record", stage: 1, side: "above" },
  { key: "conversation", stage: 2, side: "below" },
  { key: "calendar", stage: 4, side: "above" },
  { key: "followup", stage: 6, side: "below" },
] as const;

/** Names come from approved copy; bodies are deliberately not rendered. */
const NAME: Record<string, string> = {
  record: "Customer record",
  conversation: "Conversation",
  calendar: "Calendar",
  followup: "Follow-up",
};

/**
 * Where each artefact attaches, as percentages of the SVG box.
 *
 * BOTH axes come from layoutThroughline — the SAME function the renderer
 * uses to draw the line — so a stem can never point at empty space.
 * That is the renderer-agreement rule the throughline-svg header sets
 * out, and taking y from a guessed "about half way down" is precisely
 * how the handoff markers drifted off the line the first time round.
 */
const ANCHOR = (() => {
  const L = layoutThroughline(SYSTEM_LAYOUT);
  return SURFACES.map((s) => {
    const t = THROUGHLINE_STAGES[s.stage].t;
    return {
      x: (L.x(t) / SYSTEM_LAYOUT.width) * 100,
      y: (L.y(t) / SYSTEM_LAYOUT.height) * 100,
    };
  });
})();

/** The artefact itself. Fragments of a working system, not interfaces. */
function Artefact({ kind }: { kind: string }) {
  if (kind === "record") {
    return (
      <span className="af-sys__card">
        <span className="af-sys__who">J. Tan</span>
        <span className="af-sys__meta">Asked about availability</span>
        <span className="af-sys__chan">WhatsApp</span>
      </span>
    );
  }
  if (kind === "conversation") {
    return (
      <span className="af-sys__card af-sys__card--thread">
        <span className="af-sys__bubble">Is anyone there?</span>
        <span className="af-sys__bubble af-sys__bubble--ours">
          Yes — what are you looking to book?
        </span>
      </span>
    );
  }
  if (kind === "calendar") {
    return (
      <span className="af-sys__card af-sys__card--date">
        <span className="af-sys__day">Thu</span>
        <span className="af-sys__time">10:30</span>
        <span className="af-sys__meta">Confirmed</span>
      </span>
    );
  }
  return (
    <span className="af-sys__card">
      <span className="af-sys__meta">Next action</span>
      <span className="af-sys__who">Check in after the visit</span>
    </span>
  );
}

export function SystemComposition() {
  const ref = useRef<HTMLDivElement>(null);
  const { progress, turn, settled } = useSceneTurn(ref);

  /* Three beats, in one scroll, no pinning:
       1  the completed line arrives
       2  the artefacts appear, attached
       3  the human branch marks Respond
     Under reduced motion every beat is already resolved — `settled` is
     true from the first frame, the same way every other scene handles
     it. Nothing here depends on animation to be understood.

     THE FIRST BEAT USES `progress`, NOT `turn`, AND THAT IS DELIBERATE.

     `turn` is the shared page rhythm: it is pinned at zero until 42% of
     a section's traversal, because every other scene shows a broken
     state first and turns. This scene has no broken state. Gating the
     line on `turn` measured out as roughly 670px of empty space on a
     phone, where the stacked composition is tall — the visitor would
     have scrolled most of the way through a blank area before the line
     appeared under it. The line is this scene's ground, so it arrives
     with the scene. The two beats that are genuinely staged — the
     artefacts attaching, then the human branch — keep the shared
     rhythm. */
  const arrived = settled || progress > 0.18;
  const attached = settled || turn > 0.08;
  const human = settled || turn > 0.45;

  return (
    <div ref={ref} className={cn("af-sys", arrived && "is-arrived")}>
      <div className="af-sys__stage">
        {/* The backbone. Complete and sealed: the resolved state of the
            same line the visitor has followed since scene 02.
            Decorative — every name below it is real text in the DOM. */}
        <div className="af-sys__line af-sys__line--wide">
          <ThroughlineSvg
            progress={1}
            seal={1}
            focusStageIndex={THROUGHLINE_STAGES.length - 1}
            layout={SYSTEM_LAYOUT}
            title="One connected system across the whole customer journey"
          />
        </div>
        <div className="af-sys__line af-sys__line--narrow" aria-hidden>
          <ThroughlineSvg
            progress={1}
            seal={1}
            focusStageIndex={THROUGHLINE_STAGES.length - 1}
            layout={SYSTEM_NARROW}
          />
        </div>

        {/* The surfaces, attached at the stage each one serves. On a
            narrow screen they stop being positioned and stack below the
            line — four cards cannot be pinned to points 40px apart. */}
        <ul className={cn("af-sys__nodes", attached && "is-on")}>
          {SURFACES.map((s, i) => (
            <li
              key={s.key}
              className={cn("af-sys__node", `af-sys__node--${s.side}`)}
              style={{
                ["--x" as string]: `${ANCHOR[i].x.toFixed(2)}%`,
                ["--y" as string]: `${ANCHOR[i].y.toFixed(2)}%`,
                ["--i" as string]: i,
              }}
            >
              <span className="af-sys__stem" aria-hidden />
              <Artefact kind={s.key} />
              <span className="af-sys__label">{NAME[s.key]}</span>

              {/* THE HUMAN BRANCH.
                  One word, in the green that has meant "a person has
                  taken over" since scene 08 — reinforcing it, not
                  re-explaining it.

                  It rides the conversation node rather than floating
                  free on the line because Respond is where the
                  conversation attaches, so a separate marker at the same
                  stage would land on top of it. Riding the stem puts the
                  mark where the branch meets the line, which is what it
                  means, and it survives the mobile stack. */}
              {s.key === "conversation" ? (
                <span className={cn("af-sys__human", human && "is-on")}>
                  <i className="af-dot af-dot--human" aria-hidden />
                  {sceneClose.humanLabel}
                </span>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
