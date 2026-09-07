"use client";

import { useRef } from "react";
import { Scene, SceneCompare, useSceneTurn } from "@/components/home/scenes/scene";
import { sceneDays } from "@/lib/scene-content";
import { cn } from "@/lib/utils";

/* ==================================================== SCENE 03
 *
 * THE DAYS PASS. Two problems in one scene, because they are the same
 * problem: a week goes by and nothing happens.
 *
 * First half — the forgotten follow-up. Someone is interested. Someone
 * writes "follow up Tuesday". Tuesday arrives and leaves.
 *
 * Second half — the appointment nobody confirmed. It is booked, the
 * week runs, and nothing sits between the booking and the day.
 *
 * ────────────────────────────────────────────────────────────────
 * THE CLAIM BOUNDARY. READ THIS BEFORE EDITING THE RESOLVED CHAIN.
 *
 * This scene ends on an appointment CONFIRMED AND LIVE ON THE CALENDAR.
 * It does not show the customer arriving, and it must never be edited
 * so that it does.
 *
 * ArkFlow can schedule a next action, send a confirmation and send a
 * reminder. Those are current capabilities. Whether the person walks
 * through the door is not something any software delivers, and a final
 * frame showing an attended appointment would be a claim we cannot
 * support. There are also no rates, counts or percentages anywhere in
 * this file, for the same reason.
 *
 * The last cell is "Confirmed". The scene stops there.
 * ────────────────────────────────────────────────────────────────
 */

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

/** A week with one thing on it and nothing between. */
function DeadWeek() {
  return (
    <div className="af-week af-week--cold">
      <div className="af-note" role="note">
        <span className="af-note__pin" aria-hidden />
        {sceneDays.note}
      </div>

      <ol className="af-week__days" aria-label="A week in which nothing happens">
        {DAYS.map((d, i) => (
          <li key={d} className={cn("af-day", i === 1 && "af-day--marked")}>
            <span className="af-day__l">{d}</span>
            {/* Tuesday is marked and still empty. That is the point. */}
            <span className="af-day__slot" aria-hidden />
          </li>
        ))}
      </ol>

      <ol className="af-chain af-chain--cold">
        {sceneDays.problemChain.map((step, i) => (
          <li
            key={step}
            className={cn(
              "af-chain__step",
              i === sceneDays.problemChain.length - 1 && "af-chain__step--lost"
            )}
          >
            {step}
          </li>
        ))}
      </ol>
    </div>
  );
}

/** The same week, with something between the booking and the day. */
function LiveWeek({ turn, settled }: { turn: number; settled: boolean }) {
  // Events light in order as the scene turns, so the week is read left
  // to right rather than arriving all at once.
  const lit = settled ? 4 : Math.floor(turn * 5);
  const events = [
    { day: 1, label: "Next action" },
    { day: 2, label: "Booked" },
    { day: 3, label: "Reminder" },
    { day: 3, label: "Confirmed" },
  ];

  return (
    <div className="af-week af-week--live">
      <ol className="af-week__days" aria-label="The same week, with the system running">
        {DAYS.map((d, i) => {
          const on = events.filter((e, n) => e.day === i && n < lit);
          return (
            <li key={d} className={cn("af-day", on.length && "af-day--on")}>
              <span className="af-day__l">{d}</span>
              <span className="af-day__slot" aria-hidden />
              {on.map((e) => (
                <span key={e.label} className="af-day__ev">
                  {e.label}
                </span>
              ))}
            </li>
          );
        })}
      </ol>

      <ol className="af-chain af-chain--live">
        {sceneDays.resolvedChain.map((step, i) => (
          <li
            key={step}
            className={cn("af-chain__step", i < lit + 1 && "is-on")}
          >
            {step}
          </li>
        ))}
      </ol>

      {/* The sentence that holds the claim boundary in the DOM, not just
          in a comment. It says confirmed. It does not say attended. */}
      <p className="af-week__verdict">{sceneDays.resolvedNote}</p>
    </div>
  );
}

export function SceneDays() {
  const ref = useRef<HTMLDivElement>(null);
  const { turn, settled } = useSceneTurn(ref);

  return (
    <Scene
      id="the-days"
      /* Book. The second flagged gap in the canonical model. */
      emphasis={0.62}
      stageIndex={4}
      seal={settled ? 1 : turn}
      title={sceneDays.title}
      lead={sceneDays.lead}
    >
      <div ref={ref}>
        <SceneCompare
          turn={turn}
          settled={settled}
          problemLabel={sceneDays.problemLabel}
          resolvedLabel={sceneDays.resolvedLabel}
          problem={<DeadWeek />}
          resolved={<LiveWeek turn={turn} settled={settled} />}
        />
      </div>
    </Scene>
  );
}
