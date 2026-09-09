"use client";

import { useRef } from "react";
import { Container } from "@/components/ui/container";
import { SceneAtmosphere } from "@/components/motion/scene-atmosphere";
import { useViewportProgress } from "@/lib/use-viewport-progress";
import {
  ThroughlineSvg,
  NARROW_LAYOUT,
} from "@/components/throughline/throughline-svg";
import { sceneTransformation } from "@/lib/scene-content";
import { THROUGHLINE_STAGES } from "@/lib/throughline";
import { cn } from "@/lib/utils";

/* ==================================================== THE TRANSFORMATION
 *
 * The emotional pivot, and the only place on the homepage where the
 * argument is made rather than shown.
 *
 * WHAT THE FOUR MOMENTS ARE. Four points in ONE customer journey — the
 * enquiry, the follow-up, the appointment, the customer — each shown in
 * the state it ends up in when nothing connects them, then in the state
 * it reaches when something does. They are deliberately NOT a
 * one-to-one recap of the preceding scenes: there are five of those and
 * four moments here, and the point is not "here is what you just
 * watched" but "these were never separate problems". An earlier version
 * of this comment claimed a literal scene-by-scene recap. It never was
 * one, and the four rows should not be made into one.
 *
 * WHY THIS IS THE MOST IMPORTANT SCENE ON THE PAGE. Up to here the
 * visitor has a handful of separate complaints about their business.
 * The job of this scene is a single realisation — that they were four
 * places on one journey that nobody owns. Everything after this point
 * is the answer to a question the visitor has now actually asked.
 *
 * HOW IT IS BUILT. No new geometry. The Throughline renderer draws the
 * line; `seal` closes it. One scalar drives every part of the
 * transformation, and it must stay that way: the headline, the four
 * moments, the line and the state label are one movement, not four
 * animations that happen to overlap.
 *
 * DO NOT ADD EXPLANATION HERE. The temptation with a pivot is to
 * caption it. One headline and one line is the whole budget.
 */

/* ────────────────────────────────────────────────────────────────
   SCENE-LOCAL TIMING, AND WHY IT IS NOT THE SHARED `turn`

   The shared curve (TURN_AT 0.42, TURN_OVER 0.2) puts the turn in the
   second half of a section's traversal. For a comparison scene that is
   right — the title is not the payoff there. Here it is, and the
   arithmetic broke the scene.

   Measured before this change, at 1280x900: the section was 1038px
   tall, the transformation began when the section top reached +86px
   and completed at -301px. At +86 the state label was 112px below the
   fold; at -301 the headline had scrolled 177px above the top. There
   was NO scroll position where the visitor could see the headline, the
   resolved moments, the completed line and "One connected journey" at
   once — which is the entire job of a scene built around a single
   simultaneous realisation.

   So this scene maps its own scalar, from its own progress. Change
   these two numbers rather than the shared constants, and re-measure
   the section height if the composition ever grows.

   ────────────────────────────────────────────────────────────────
   THE LINE HAS TO FINISH ON SCREEN, NOT ON ITS WAY IN.

   The first version of this timing looked right on paper and was
   broken in the browser: the line reached 100% when the section top
   was at +136px, and the line only becomes fully visible at +127px.
   It completed nine pixels of scroll BEFORE the visitor could see all
   of it, so every frame in which the whole line was on screen showed
   it already finished. The reported symptom — "the Throughline is not
   visibly moving" — was exactly that, and it was arithmetic, not
   rendering.

   Two causes, both fixed here. The window used to open at progress
   0.30, while the line was still below the fold, and `lineProgress`
   used to complete at seal 0.63 rather than 1. Now the window opens as
   the line arrives and the line finishes precisely as the composition
   settles:

     progress 0.28  seal 0     line 0.10, just entering the viewport
     progress 0.36  seal 0.36  line 0.43, visibly drawing
     progress 0.43  seal 0.69  line 0.72, now fully on screen with
                               nearly a third still to draw
     progress 0.50  seal 1     line 1.00, section top +3, everything
                               visible together

   395px of scroll across the window. */
const SEAL_FROM = 0.28;
const SEAL_OVER = 0.22;

/**
 * Finer than the shared 0.02.
 *
 * The line is the one element here that redraws continuously rather
 * than crossfading between two states, so it is the one that shows
 * quantisation. At 0.02 the window is 11 commits and the stroke jumps
 * roughly nine percent at a time; at 0.01 it is 22, which reads as
 * travel. The hook is still rAF-throttled and still gated by the
 * intersection observer, so this costs nothing while the scene is off
 * screen.
 */
const STEP = 0.01;

const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);

/**
 * The accent's colour, interpolated from the one scalar.
 *
 * This is done here rather than in CSS on purpose. The first attempt
 * published `--seal` as a custom property and let the stylesheet do
 * `color-mix(in srgb, blue calc(var(--seal) * 100%), amber)` with a
 * matching opacity ramp. Measured, it did not work: with `--seal`
 * inherited and reading "1" on the element, the opacity still computed
 * to its zero value, because an unregistered custom property does not
 * reliably invalidate calc() and color-mix() consumers on change.
 *
 * Registering it with @property would fix that, but the moments beside
 * it are already inline-styled from the same scalar, so doing the same
 * here needs no new mechanism and cannot silently stop working.
 *
 * The two ends are the palette's own: amber is revenue leaking, blue is
 * revenue moving. Nothing new is introduced between them.
 */
const LEAK = [217, 119, 6] as const;
const FLOW = [59, 130, 246] as const;
const accentColour = (seal: number) =>
  `rgb(${LEAK.map((c, i) => Math.round(c + (FLOW[i] - c) * seal)).join(", ")})`;

export function SceneTransformation() {
  const ref = useRef<HTMLElement>(null);
  const { progress, settled } = useViewportProgress(ref, 1, STEP);
  const seal = settled ? 1 : clamp01((progress - SEAL_FROM) / SEAL_OVER);

  /* The line draws across the WHOLE window and lands on the last frame
     of it. The 1.35 multiplier this replaces finished it at seal 0.63,
     which is what put a completed line on screen before the visitor
     could see all of it. Nothing may make this complete early again:
     the coefficient and SEAL_OVER have to keep the line arriving at
     seal 1, and 0.10 is only the head start that stops the scene
     opening on a bare stroke.

     The last moment resolves at seal 0.74 (0.24 of stagger plus 0.5 of
     travel), so the order the visitor reads is: the moments settle,
     then the line closes over them. The line is the summary, not the
     trigger. */
  const lineProgress = settled ? 1 : Math.min(1, 0.1 + seal * 0.9);

  return (
    <section
      ref={ref}
      id="the-shift"
      className="af-scene af-scene--pivot"
    >
      <SceneAtmosphere
        progress={progress}
        seal={seal}
        /* Lit as Grow — the far end of the line, which is the first
           time on this page the environment reaches it. This is the
           ATMOSPHERE's focus and is not the same thing as the
           renderer's focus below. */
        focusT={THROUGHLINE_STAGES[THROUGHLINE_STAGES.length - 1].t}
        emphasis={1.6}
        className="af-scene__atmos"
      >
        <Container>
          <header className="af-scene__head af-scene__head--centre">
            <h2 className="af-scene__title af-scene__title--big">
              {sceneTransformation.title}{" "}
              {/* THE HEADLINE MUST NOT ASSERT THE ENDING BEFORE IT
                  HAPPENS. "Nothing falls through." used to render at
                  full strength from the first frame, above four rows
                  that all said it did — a sentence claiming the problem
                  was solved, in the colour this site reserves for
                  revenue leaking. It now rises out of the same seal
                  that closes the moments: subdued and amber while the
                  journey is broken, full and blue when it is not. The
                  words never change. */}
              <span
                className="af-pivot-word"
                style={{
                  color: accentColour(seal),
                  opacity: 0.34 + seal * 0.66,
                }}
              >
                {sceneTransformation.titleAccent}
              </span>
            </h2>
            <p className="af-scene__lead">{sceneTransformation.lead}</p>
          </header>

          {/* The four moments, still broken, then whole. Real text on
              both sides so the comparison survives without the motion.

              NOT CARDS. They used to carry a border, a background and a
              10px radius, with a 14px label left and a mono value right
              — which is, to the pixel, the row treatment the desk scene
              uses one scene earlier. Two adjacent scenes cannot share a
              component idiom and still feel like different arguments.
              These are four lines of text now, and the pivot is lighter
              than the scene before it, which is what a realisation
              should feel like. */}
          <ul className="af-pivot__moments">
            {sceneTransformation.moments.map((m, i) => {
              // Each closes slightly after the last, left to right, so
              // the seal reads as one movement travelling the line
              // rather than four things blinking at once.
              const local = clamp01((seal - i * 0.08) / 0.5);

              /* The two words share one grid cell, so their opacities
                 must CROSS AT ZERO rather than fade through each other.

                 They used to be `1 - local` and `local`, which meant
                 that at local = 0.5 both "Unconfirmed" and "Confirmed"
                 rendered at 50% in the same box — two different words
                 on top of one another, which is unreadable. The 700ms
                 CSS transition made it worse by keeping both mid-flight
                 even when the targets were 0 and 1.

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
                    {/* `settled` is set in exactly one place in
                        useViewportProgress — the reduced-motion branch
                        — so it is a reliable flag for "no animation is
                        going to happen here". When it is true the CSS
                        un-stacks both words and shows the broken one
                        struck through, and hiding it from assistive
                        technology would then announce only half of a
                        comparison that is fully visible on screen. */}
                    <span
                      className="af-moment__broken"
                      style={{ opacity: broken }}
                      aria-hidden={!settled && broken < 0.5}
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

          {/* The line itself. Everything above was one segment of it.
              Two compositions of the same geometry, toggled in CSS —
              the pattern the closing scene already uses.

              WHY THE PHONE NEEDS ITS OWN. The default box is 1200x300,
              4:1. Scaled into a 327px column that is 82px tall, and at
              that height the ten stages compress into a near-flat
              squiggle and the gap circles close inside a band too
              shallow to see. On a phone the single most important
              visual event of the pivot was invisible. NARROW_LAYOUT is
              1.6:1 and was built for exactly this. */}
          <div className="af-pivot__line af-pivot__line--wide">
            <ThroughlineSvg
              progress={lineProgress}
              seal={seal}
              /* CAPTURE, NOT GROW — and this is load-bearing.
                 focusStageIndex drives four things in the renderer: the
                 gate halo, the light pool's position, the focus node's
                 size, and the boundary where lit segments switch from
                 `complete` to `flowing`.
                 With Grow (t = 1.0) every segment satisfies t <= focus,
                 so the whole line rendered one flat colour and the
                 halo's activation, (p - focus.t) / 0.09, stayed at zero
                 until p reached 1 and then popped. The line read as a
                 diagram filling in.
                 With Capture the colour boundary exists, the pool sits
                 where the opportunity enters, and the halo builds as
                 the line arrives — which is also what the renderer's
                 own comment says the gate is for. The atmosphere above
                 still lights at Grow; these are different parameters. */
              focusStageIndex={1}
              title="One customer journey, from first contact to a returning customer"
            />
          </div>
          <div className="af-pivot__line af-pivot__line--narrow" aria-hidden>
            <ThroughlineSvg
              progress={lineProgress}
              seal={seal}
              focusStageIndex={1}
              layout={NARROW_LAYOUT}
            />
          </div>

          {/* The payoff line flips at 0.85, not 0.5. At the midpoint
              the label sits 114px below the fold, so it announced "One
              connected journey" while off screen and the visitor
              scrolled down to find it already said so. At 0.85 the
              section top is +57 and the whole composition — this line
              included — is on screen to see it change. */}
          <p className="af-pivot__state">
            <i
              className={cn(
                "af-dot",
                seal > 0.85 ? "af-dot--flow" : "af-dot--leak"
              )}
              aria-hidden
            />
            {seal > 0.85
              ? sceneTransformation.resolvedLabel
              : sceneTransformation.problemLabel}
          </p>
        </Container>
      </SceneAtmosphere>
    </section>
  );
}
