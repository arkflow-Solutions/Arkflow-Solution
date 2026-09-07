"use client";

import { useEffect, useRef, useState } from "react";
import { THROUGHLINE_STAGES } from "@/lib/throughline";
import { useViewportProgress } from "@/lib/use-viewport-progress";
import { SceneAtmosphere } from "@/components/motion/scene-atmosphere";
import {
  DEFAULT_LAYOUT,
  NARROW_LAYOUT,
  ThroughlineSvg,
  stagePercent,
} from "@/components/throughline/throughline-svg";
import { cn } from "@/lib/utils";

/**
 * AttractHandoff — the Attract → Capture transition.
 *
 * WHY HERE. /attract already ends on the continuity argument: a website
 * that can become part of a system later. That section listed the ten
 * canonical stages as a flat row of chips — accurate, but it read as a
 * caption rather than as the moment the website joins something larger.
 *
 * PHASE 3C ITERATION. The first attempt was reviewed on the page and was
 * an infographic: a hairline in a large empty panel, with Attract →
 * Capture occupying 9.5% of the width and the Attract label clipped
 * against the left edge. The composition now:
 *
 *  · uses perspective, so the near field is where the argument is and
 *    the later stages recede toward a vanishing point;
 *  · gives the line real weight near Attract, tapering with distance;
 *  · gathers a restrained pool of light at Capture, which activates as
 *    the opportunity arrives;
 *  · starts the line off-frame, so the opportunity enters from outside
 *    the business rather than beginning at a node.
 *
 * The reading is: outside → entering the system → continuing through it.
 *
 * ONE LAYOUT. Marker positions come from stagePercent(), the same
 * function the SVG geometry uses. The labels cannot drift off the line.
 *
 * MOTION. One tween, 1500ms, ease-premium, once on entering view. Every
 * stage of the sequence — the signal arriving, the travel to Capture,
 * the halo opening, the line continuing — is derived from that single
 * value rather than choreographed separately, so there is no timeline to
 * fall out of sync. Under prefers-reduced-motion progress is set to 1
 * immediately, producing the identical resolved composition.
 *
 * COST. Zero per-frame cost at rest. No canvas, no WebGL, no texture,
 * no filter. The SVG draws once and holds.
 */

/** Same curve as ease-premium, for a numeric tween. */
const easePremium = (t: number) => 1 - Math.pow(1 - t, 3);
const REVEAL_MS = 1500;

const ATTRACT = THROUGHLINE_STAGES[0];
const CAPTURE = THROUGHLINE_STAGES[1];
const FOCUS_INDEX = 1;

export function AttractHandoff({
  note,
  className,
}: {
  note?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  /* Two independent motion sources, deliberately.

     `progress` is the one-shot reveal: it runs once when the section
     arrives and then holds, so the LINE settles into a strong static
     state rather than looping. Phase 3C locked that behaviour and this
     phase does not touch it.

     `travel` is continuous and drives only the ATMOSPHERE. The line
     never moves under the reader; the environment around it responds
     to where the opportunity has got to. It costs nothing at rest —
     the hook measures only while the section is near the viewport, and
     quantising to 0.02 means a full traversal commits at most fifty
     renders rather than one per frame. The CSS transition on the
     atmosphere interpolates between those steps, so the light reads as
     continuous.

     0.5 is the reduced-motion resolution because that is where
     sectionLuminance places the Capture climax — a reader who has
     asked for no motion gets the section's strongest, most complete
     state rather than its faded tail. */
  const { progress: travel } = useViewportProgress(ref, 0.5, 0.02);
  const [narrow, setNarrow] = useState(false);
  const done = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const sync = () => setNarrow(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setProgress(1);
      return;
    }

    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting || done.current) return;
        done.current = true;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / REVEAL_MS);
          setProgress(easePremium(t));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { rootMargin: "-12% 0px" }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  /* The narrow composition is a different layout, not a scaled one, so
     the marker positions have to follow it. Resolved after mount to keep
     the first client render identical to the server render. */
  const layout = narrow ? NARROW_LAYOUT : DEFAULT_LAYOUT;
  const attractPct = stagePercent(ATTRACT, layout);
  const capturePct = stagePercent(CAPTURE, layout);
  const captureLit = progress >= CAPTURE.t;

  return (
    <div ref={ref} className={cn("mt-14", className)}>
      <SceneAtmosphere
        progress={travel}
        seal={1}
        focusT={CAPTURE.t}
        fromT={ATTRACT.t}
        className="af-hand"
      >
        <div className="af-hand__field" aria-hidden />

        {/* Structure. Decorative — every stage name and meaning below
            this is real text. */}
        <ThroughlineSvg
          progress={progress}
          seal={1}
          focusStageIndex={FOCUS_INDEX}
          layout={layout}
          className="af-hand__svg"
        />

        {/* Surface. Positioned from the same layout as the geometry. */}
        <div className="af-hand__labels" aria-hidden>
          <span className="af-hand__label" style={{ left: `${attractPct}%` }}>
            <span className="af-hand__name">{ATTRACT.label}</span>
            <span className="af-hand__role">Your website</span>
          </span>
          <span
            className={cn(
              "af-hand__label af-hand__label--focus",
              captureLit && "is-lit"
            )}
            style={{ left: `${capturePct}%` }}
          >
            <span className="af-hand__name">{CAPTURE.label}</span>
            <span className="af-hand__role">Enters the system</span>
          </span>
          <span className="af-hand__horizon">
            <span className="af-hand__role">…and keeps going</span>
          </span>
        </div>
      </SceneAtmosphere>

      {/* The meaning, in text. Tied to the visual above by the same two
          stage names and the same order — not a second component. */}
      <div className="af-hand__read">
        <dl className="af-hand__pair">
          <div>
            <dt>{ATTRACT.label}</dt>
            <dd>{ATTRACT.meaning}</dd>
          </div>
          <div>
            <dt className="is-focus">{CAPTURE.label}</dt>
            <dd>{CAPTURE.meaning}</dd>
          </div>
        </dl>

        <div>
          <p className="font-mono text-eyebrow uppercase tracking-wider text-[color:var(--text-tertiary)]">
            The full journey
          </p>
          <ol className="af-hand__stages">
            {THROUGHLINE_STAGES.map((s, i) => (
              <li key={s.label}>
                <span
                  aria-current={i === 0 ? "step" : undefined}
                  data-focus={i <= FOCUS_INDEX ? "true" : undefined}
                >
                  {s.label}
                </span>
                {i < THROUGHLINE_STAGES.length - 1 && (
                  <span aria-hidden className="af-hand__arrow">
                    &rarr;
                  </span>
                )}
              </li>
            ))}
          </ol>
          {note && <p className="af-hand__note">{note}</p>}
        </div>
      </div>
    </div>
  );
}
