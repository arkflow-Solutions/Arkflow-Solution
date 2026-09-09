"use client";

import { useRef } from "react";
import { Container } from "@/components/ui/container";
import { SceneAtmosphere } from "@/components/motion/scene-atmosphere";
import { useSceneTurn } from "@/components/home/scenes/scene";
import { useViewportProgress } from "@/lib/use-viewport-progress";
import { ChannelIcon } from "@/components/ui/channel-icon";
import { IllustrativeTag } from "@/components/home/v3/shared";
import { CHANNEL_COLOR } from "@/lib/channel-icons";
import { THROUGHLINE_STAGES } from "@/lib/throughline";
import { sceneInbox } from "@/lib/scene-content";
import { cn } from "@/lib/utils";

/* ==================================================== SCENE 02
 *
 * EVERY CHANNEL. ONE INBOX.
 *
 * ────────────────────────────────────────────────────────────────
 * WHY THIS SCENE EXISTS
 *
 * The Phase 3E compression from eighteen sections to ten scenes dropped
 * the omnichannel concept completely. Measured on the homepage before
 * it: not one channel was named anywhere, except a single WhatsApp
 * badge on the closing composition's record card. The capability
 * survived on /solutions, /packages, /how-it-works and /attract — every
 * surface except the one most visitors actually see.
 *
 * ────────────────────────────────────────────────────────────────
 * WHY THIS SCENE DOES NOT USE THE <Scene> SHELL
 *
 * Every other scene has one full-width column, so the shell's header
 * sits above the body and that is correct for them. This scene is a
 * two-column composition, and a full-width header above a two-column
 * body is precisely what made it read as two unrelated blocks placed
 * side by side.
 *
 * So the headline, the lead and the eight ways in all live in the LEFT
 * TRACK of one grid, and the inbox owns the right track. One container,
 * one grid, one composition. The typography classes are the shared
 * ones (af-scene__title, af-scene__lead) so nothing about the page's
 * type rhythm changes — only which column it sits in.
 *
 * This mirrors demo.tsx and system.tsx, which compose their own shell
 * out of SceneAtmosphere + Container for the same reason.
 *
 * ────────────────────────────────────────────────────────────────
 * IT IS A CAPABILITY SCENE, NOT A LEAK SCENE
 *
 * Lit at 1.05 — above the page's baseline, where every problem scene
 * sits below it. Its Capture handover CLOSES across the scene rather
 * than leaking, which is what the seal running 0 to 1 means.
 *
 * ────────────────────────────────────────────────────────────────
 * WHAT IT SHOWS, AND WHY IT STAYS RECOGNISABLE
 *
 * Five conversations begin as separate cards drifting out of a frame
 * that is barely there, showing handles rather than people — which is
 * exactly what a fragmented setup shows you. The frame closes around
 * them and the handles resolve: two of the five are the same customer.
 * TikTok stays a handle, because a first contact from someone the
 * business has never dealt with has nothing to match to.
 *
 * The panel is built from the product-surface vocabulary this codebase
 * already owns — af-frame, af-rec, af-rec__ch — so it reads as an
 * ArkFlow interface rather than a generic dashboard.
 *
 * WHAT MUST NEVER APPEAR HERE. No unread counter, no unread dot, no
 * timestamp, no response time, no metric, no KPI, no chart, no search,
 * no sidebar, no filters, and no real person's data.
 */

/**
 * Brand colour, on the GLYPH ONLY.
 *
 * Founder decision, 9 September 2026, reversing the earlier monochrome
 * treatment: this audience does not know the words "omnichannel" or
 * "unified communications", and a green WhatsApp mark says in one
 * glance what a paragraph cannot. Recognition, not decoration.
 *
 * CHANNEL_COLOR already existed in lib/channel-icons.ts and had never
 * been used by anything, so no new asset, icon set or dependency is
 * introduced — the glyphs are the same SVGs, taking colour through
 * `currentColor` as they always could.
 *
 * Website is the one override: the shared map has it as a neutral, and
 * this scene wants ArkFlow blue so the front door reads as ours rather
 * than as a generic globe.
 *
 * The colour stops at the glyph. Pills stay dark, borders stay
 * subtle, type stays neutral, and the CSS pulls each hue a little
 * toward the platinum so eight saturated marks cannot turn a premium
 * composition into a social-media graphic.
 */
const GLYPH_TONE: Record<string, string> = {
  ...CHANNEL_COLOR,
  Website: "#3B82F6",
};

/**
 * Where each conversation sits before anything gathers it.
 *
 * Negative, so the cards drift LEFT — out of the frame that has not
 * closed around them yet — and settle right as it does. The largest is
 * -18px, which at 375px still leaves the card's left edge inside the
 * page gutter. Nothing can reach the viewport edge.
 */
const DRIFT = [0, -16, -8, -18, -10];

export function SceneInbox() {
  const ref = useRef<HTMLDivElement>(null);
  const atmosRef = useRef<HTMLDivElement>(null);
  const { progress, turn, settled } = useSceneTurn(ref);
  const { progress: atmos } = useViewportProgress(atmosRef, 1, 0.02);

  /* Four beats in one scroll, no pinning. The first two ride
     `progress` so the composition is present as the scene arrives; the
     rest ride the shared `turn`, which keeps this scene on the same
     rhythm as the ones around it. Under reduced motion `settled` is
     true from the first frame — see the media block in globals.css,
     which keeps the origin handles and both state labels legible so
     the argument survives without animation. */
  const arrived = settled || progress > 0.14;
  const listed = settled || progress > 0.22;
  const gathered = settled || turn > 0.3;
  const named = settled || turn > 0.42;

  return (
    <section id="every-way-in" className="af-scene">
      <div ref={atmosRef}>
        <SceneAtmosphere
          progress={atmos}
          /* The handover closes as the conversations land in one place.
             That is what this scene is: the gap at Capture being shut. */
          seal={settled ? 1 : turn}
          /* Capture — the stage this scene owns. Scene 03 moved to
             Respond when this arrived, so the rail advances between
             them instead of holding one point across two scenes. */
          focusT={THROUGHLINE_STAGES[1].t}
          emphasis={1.05}
          vignette={false}
          className="af-scene__atmos"
        >
          <Container className="relative z-[1]">
            <div
              ref={ref}
              className={cn(
                "af-inbox",
                arrived && "is-arrived",
                listed && "is-listed",
                gathered && "is-gathered",
                named && "is-named"
              )}
            >
              {/* ---- left track: the introduction ---------------- */}
              <div className="af-inbox__intro">
                <h2 className="af-scene__title af-inbox__title">
                  {sceneInbox.title}
                </h2>
                <p className="af-scene__lead af-inbox__lead">
                  {sceneInbox.lead}
                </p>

                {/* Eight ways in, on a 2x4 grid rather than a wrapped
                    cloud. Every name is real text; the glyph beside it
                    is decorative and hidden from assistive technology
                    by ChannelIcon itself. With styles off this reads as
                    a plain list of the places an enquiry arrives from. */}
                <ul className="af-inbox__ways">
                  {sceneInbox.doors.map((d, i) => (
                    <li
                      key={d}
                      className={cn(
                        "af-inbox__way",
                        /* Website is not a messaging app and must never
                           be dressed as one. */
                        d === "Website" && "af-inbox__way--form"
                      )}
                      style={{
                        ["--i" as string]: i,
                        ["--ch" as string]: GLYPH_TONE[d] ?? "currentColor",
                      }}
                    >
                      <ChannelIcon name={d} size={14} />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>

              {/* ---- right track: the inbox --------------------- */}
              <div className="af-inbox__panel">
                <div className="af-frame af-inbox__frame">
                  <div className="af-frame__bar">
                    <i aria-hidden />
                    <i aria-hidden />
                    <i aria-hidden />
                    <span className="af-frame__url">
                      {sceneInbox.frameLabel}
                    </span>
                    <span className="af-inbox__tag">
                      <IllustrativeTag />
                    </span>
                  </div>

                  <div className="af-frame__body af-inbox__body">
                    <ul className="af-inbox__rows">
                      {sceneInbox.arrivals.map((a, i) => (
                        <li
                          key={a.channel}
                          className="af-rec af-inbox__row"
                          style={{
                            ["--i" as string]: i,
                            ["--drift" as string]: `${DRIFT[i]}px`,
                            ["--ch" as string]:
                              GLYPH_TONE[a.channel] ?? "currentColor",
                          }}
                        >
                          <span className="af-inbox__id">
                            {/* Two readings of the same enquiry sharing
                                one cell: the account a fragmented setup
                                shows you, and the person one connected
                                record does. They cross at zero —
                                overlapping text in a shared cell is the
                                collision this codebase has already paid
                                for twice.

                                The TikTok row has nothing to resolve
                                to, so it renders once and stays as it
                                is. An identical handle struck through
                                beside itself would read as a rendering
                                fault, and under reduced motion — where
                                both are visible — it certainly would. */}
                            {a.handle === a.who ? (
                              <b className="af-inbox__who af-inbox__who--only">
                                {a.who}
                              </b>
                            ) : (
                              <>
                                <b className="af-inbox__handle">{a.handle}</b>
                                <b className="af-inbox__who">{a.who}</b>
                              </>
                            )}
                          </span>
                          <span className="af-inbox__meta">{a.meta}</span>
                          <span className="af-rec__ch af-inbox__ch">
                            <ChannelIcon name={a.channel} size={11} />
                            {a.channel}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Both state labels live in the DOM and cross-fade in
                    a shared cell, so the comparison survives reduced
                    motion. */}
                <p className="af-inbox__state">
                  <i
                    className={cn(
                      "af-dot",
                      named ? "af-dot--flow" : "af-dot--leak"
                    )}
                    aria-hidden
                  />
                  <span className="af-inbox__states">
                    <span className="af-inbox__was">
                      {sceneInbox.problemLabel}
                    </span>
                    <span className="af-inbox__is">
                      {sceneInbox.resolvedLabel}
                    </span>
                  </span>
                </p>
              </div>
            </div>
          </Container>
        </SceneAtmosphere>
      </div>
    </section>
  );
}
