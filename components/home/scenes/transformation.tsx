"use client";

import { useRef } from "react";
import { Container } from "@/components/ui/container";
import { SceneAtmosphere } from "@/components/motion/scene-atmosphere";
import { useSceneTurn } from "@/components/home/scenes/scene";
import { ThroughlineSvg } from "@/components/throughline/throughline-svg";
import { sceneTransformation } from "@/lib/scene-content";
import { THROUGHLINE_STAGES } from "@/lib/throughline";
import { cn } from "@/lib/utils";

/* ==================================================== SCENE 06
 *
 * THE TRANSFORMATION. The emotional pivot, and the only place on the
 * homepage where the argument is made rather than shown.
 *
 * The visitor has now watched four of their own failures: the enquiry
 * nobody answered, the week nothing happened, the customer who went
 * quiet, the person doing it all by hand. This scene puts those four
 * moments back on screen together, still broken, and then closes them
 * in ONE movement.
 *
 * WHY THIS IS THE MOST IMPORTANT SCENE ON THE PAGE. Up to here the
 * visitor has four separate complaints about their business. The job of
 * this scene is a single realisation — that they were never four
 * problems. They were four places on one journey that nobody owns.
 * Everything after this point is the answer to a question the visitor
 * has now actually asked.
 *
 * HOW IT IS BUILT. No new geometry. The Throughline renderer from Phase
 * 3C draws the line; Phase 3D's `seal` closes it. `seal` running 0 → 1
 * across the composition is literally the argument: amber drains, blue
 * completes, the gaps stop being gaps. That parameter was designed for
 * this moment two phases before this scene existed.
 *
 * DO NOT ADD EXPLANATION HERE. The temptation with a pivot is to
 * caption it. One headline and one line is the whole budget.
 */

export function SceneTransformation() {
  const ref = useRef<HTMLElement>(null);
  const { progress, turn, settled } = useSceneTurn(ref);
  const seal = settled ? 1 : turn;

  return (
    <section ref={ref} id="the-shift" className="af-scene af-scene--pivot">
      <SceneAtmosphere
        progress={progress}
        seal={seal}
        /* Lit as Grow — the far end of the line, which is the first
           time on this page the environment reaches it. */
        focusT={THROUGHLINE_STAGES[THROUGHLINE_STAGES.length - 1].t}
        emphasis={1.6}
        className="af-scene__atmos"
      >
        <Container>
          <header className="af-scene__head af-scene__head--centre">
            <h2 className="af-scene__title af-scene__title--big">
              {sceneTransformation.title}{" "}
              <span
                className={cn("af-pivot-word", seal > 0.5 && "is-on")}
              >
                {sceneTransformation.titleAccent}
              </span>
            </h2>
            <p className="af-scene__lead">{sceneTransformation.lead}</p>
          </header>

          {/* The four moments, still broken, then whole. Real text on
              both sides so the comparison survives without the motion. */}
          <ul className="af-pivot__moments">
            {sceneTransformation.moments.map((m, i) => {
              // Each closes slightly after the last, left to right, so
              // the seal reads as one movement travelling the line
              // rather than four things blinking at once.
              const local = Math.max(
                0,
                Math.min(1, (seal - i * 0.08) / 0.5)
              );

              /* The two words share one grid cell, so their opacities
                 must CROSS AT ZERO rather than fade through each other.

                 They used to be `1 - local` and `local`, which meant
                 that at local = 0.5 both "Unconfirmed" and "Confirmed"
                 rendered at 50% in the same 79×18px box — two different
                 words on top of one another, which is unreadable. The
                 700ms CSS transition made it worse by keeping both
                 mid-flight even when the targets were 0 and 1.

                 Now the outgoing word is gone by the midpoint and the
                 incoming one starts from it: they meet at zero, so
                 there is a clean handoff with neither a mush nor a gap.
                 The transition in globals.css is short enough (140ms)
                 to smooth the quantised scroll steps without
                 reintroducing an overlap window. */
              const broken = 1 - Math.min(1, local / 0.5);
              const whole = Math.max(0, (local - 0.5) / 0.5);

              return (
                <li key={m.label} className="af-moment">
                  <span className="af-moment__l">{m.label}</span>
                  <span className="af-moment__states">
                    <span
                      className="af-moment__broken"
                      style={{ opacity: broken }}
                      aria-hidden={broken < 0.5}
                    >
                      {m.broken}
                    </span>
                    <span
                      className="af-moment__whole"
                      style={{ opacity: whole }}
                      aria-hidden={whole < 0.5}
                    >
                      {m.whole}
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>

          {/* The line itself. Everything above was one segment of it. */}
          <div className="af-pivot__line">
            <ThroughlineSvg
              progress={settled ? 1 : Math.min(1, 0.15 + turn)}
              seal={seal}
              focusStageIndex={THROUGHLINE_STAGES.length - 1}
              title="One customer journey, from first contact to a returning customer"
            />
          </div>

          <p className="af-pivot__state">
            <i
              className={cn("af-dot", seal > 0.5 ? "af-dot--flow" : "af-dot--leak")}
              aria-hidden
            />
            {seal > 0.5
              ? sceneTransformation.resolvedLabel
              : sceneTransformation.problemLabel}
          </p>
        </Container>
      </SceneAtmosphere>
    </section>
  );
}
