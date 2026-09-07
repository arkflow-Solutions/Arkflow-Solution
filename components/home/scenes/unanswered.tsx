"use client";

import { useRef } from "react";
import { Scene, SceneCompare, useSceneTurn } from "@/components/home/scenes/scene";
import { sceneUnanswered } from "@/lib/scene-content";
import { aiDemoScript } from "@/lib/revenue-content";
import { cn } from "@/lib/utils";

/* ==================================================== SCENE 02
 *
 * THE UNANSWERED ENQUIRY.
 *
 * The first scene where the visitor should see their own business. A
 * message arrives at 9:41 PM. Nothing happens. The clock moves and the
 * thread goes cold. Then the same message, answered.
 *
 * NO DIALOGUE WAS WRITTEN FOR THIS SCENE.
 *
 * Every line below is lifted verbatim from `aiDemoScript` in
 * lib/revenue-content.ts, which is the approved demonstration script
 * shown in full in scene 07. Writing new customer dialogue would be
 * inventing a product demonstration, which is exactly the thing this
 * project does not do. It also makes this scene a genuine preview:
 * the visitor meets Jamie here and watches the whole conversation
 * later, rather than meeting two different fictional customers.
 *
 * If the approved script ever changes, this scene follows it
 * automatically — the beats are read by index, not copied.
 */

/** Beat 0 is the customer's opening message. */
const OPENING = aiDemoScript[0];
/** Beat 3 is the system's first reply. Beat 6 is the qualifying turn. */
const REPLY = aiDemoScript[3];
const QUALIFY = aiDemoScript[7];

function Bubble({
  from,
  text,
  who,
  className,
}: {
  from: string;
  text: string;
  who: string;
  className?: string;
}) {
  return (
    <div className={cn("af-msg", `af-msg--${from}`, className)}>
      <span className="af-msg__by">{who}</span>
      {text}
    </div>
  );
}

/** A thread with the clock running and nobody in it. */
function DeadThread({ turn }: { turn: number }) {
  return (
    <div className="af-thread af-thread--cold">
      <Bubble
        from="them"
        who="Customer"
        text={OPENING.kind === "msg" ? OPENING.text : ""}
      />

      {/* The clock IS the content of this panel. Nothing else happens,
          and that is the entire argument. Real text, so a screen reader
          gets the passage of time rather than an empty box. */}
      <ol className="af-clock" aria-label="Time passing with no reply">
        {sceneUnanswered.problemClock.map((t, i) => (
          <li
            key={t}
            className={cn(
              "af-clock__t",
              i === sceneUnanswered.problemClock.length - 1 && "af-clock__t--last"
            )}
          >
            {t}
          </li>
        ))}
      </ol>

      <p
        className="af-thread__verdict"
        style={{ opacity: 0.35 + Math.min(1, turn * 2) * 0.65 }}
      >
        {sceneUnanswered.problemNote}
      </p>
    </div>
  );
}

/** The same enquiry, answered. */
function LiveThread() {
  return (
    <div className="af-thread af-thread--live">
      <Bubble
        from="them"
        who="Customer"
        text={OPENING.kind === "msg" ? OPENING.text : ""}
      />
      <Bubble
        from="ai"
        who="ArkFlow"
        text={REPLY.kind === "msg" ? REPLY.text : ""}
      />
      <Bubble
        from="ai"
        who="ArkFlow"
        text={QUALIFY.kind === "msg" ? QUALIFY.text : ""}
      />

      <ol className="af-clock af-clock--live" aria-label="Reply timings">
        {sceneUnanswered.resolvedClock.map((t, i) => (
          <li key={`${t}-${i}`} className="af-clock__t">
            {t}
          </li>
        ))}
      </ol>

      <p className="af-thread__verdict af-thread__verdict--on">
        {sceneUnanswered.resolvedNote}
      </p>
    </div>
  );
}

export function SceneUnanswered() {
  const ref = useRef<HTMLDivElement>(null);
  const { turn, settled } = useSceneTurn(ref);

  return (
    <Scene
      id="unanswered"
      /* Capture. A gap in the canonical model, and left unsealed here
         because this scene is the leak, not the fix. */
      stageIndex={1}
      seal={settled ? 1 : 1 - turn}
      title={sceneUnanswered.title}
      lead={sceneUnanswered.lead}
    >
      <div ref={ref}>
        <SceneCompare
          turn={turn}
          settled={settled}
          problemLabel={sceneUnanswered.problemLabel}
          resolvedLabel={sceneUnanswered.resolvedLabel}
          problem={<DeadThread turn={turn} />}
          resolved={<LiveThread />}
        />
      </div>
    </Scene>
  );
}
