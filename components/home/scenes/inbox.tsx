"use client";

import { useRef } from "react";
import { Scene, useSceneTurn } from "@/components/home/scenes/scene";
import { ChannelIcon } from "@/components/ui/channel-icon";
import { IllustrativeTag } from "@/components/home/v3/shared";
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
 * The hero does carry nine channel labels, but only inside the WebGL
 * scene, only on devices that can run it, and they orbit and scatter.
 * They state the problem and never resolve it. This is the resolution
 * the hero has been promising since the first screen.
 *
 * ────────────────────────────────────────────────────────────────
 * IT IS A CAPABILITY SCENE, NOT A LEAK SCENE
 *
 * Lit at 1.05 — above the page's baseline, where every problem scene
 * sits below it. Scenes 03 to 06 are the problem block; this one is the
 * recognition that precedes it, so it must not read as another thing
 * going wrong. Its Capture handover CLOSES across the scene rather than
 * leaking, which is what the seal running 0 to 1 means.
 *
 * ────────────────────────────────────────────────────────────────
 * THE COMPOSITION, AND WHY IT IS NOT ABSTRACT
 *
 * Two zones. Left: the eight ways a customer can reach the business,
 * staggered so they read as doors around a business rather than as a
 * row of identical controls. Right: a substantial, recognisable ArkFlow
 * inbox.
 *
 * The inbox is built from the product-surface vocabulary this codebase
 * already owns — af-frame, af-frame__bar, af-frame__url, af-rec,
 * af-rec__ch — which had stopped rendering on the homepage entirely. So
 * it looks like an ArkFlow interface without inventing a visual system,
 * and it is not a GHL clone and not a generic SaaS dashboard.
 *
 * THE FRAGMENTATION HAPPENS INSIDE THE PANEL, NOT IN FREE SPACE. An
 * earlier pass floated message slivers in the gap between the zones and
 * converged them abstractly. It was cinematic and it stopped looking
 * like a communication system, which is the one thing this scene cannot
 * afford. Now the five conversations start as separate cards drifting
 * left out of a ghosted frame, and the frame materialises around them
 * as they settle. Same story, still recognisable at every frame.
 *
 * ────────────────────────────────────────────────────────────────
 * WHAT MUST NEVER APPEAR HERE
 *
 * No unread counter, no unread dot, no timestamp, no response time, no
 * metric, no KPI, no chart, no search field, no sidebar, no filters, no
 * avatars, and no real person's data. The previous live site's panel
 * carried "4 UNREAD" and "answered in under 90 seconds"; neither
 * renders anywhere in v3 and neither may be introduced.
 *
 * MONOCHROME GLYPHS. lib/channel-icons.ts also exports CHANNEL_COLOUR —
 * WhatsApp green, Instagram pink, TikTok red. It is used by nothing and
 * must stay that way. This site runs a three-colour semantic system:
 * blue is revenue moving, amber is revenue leaking, green is a person
 * taking over. Brand green beside the handover green would break the
 * one rule the whole page depends on.
 *
 * ────────────────────────────────────────────────────────────────
 * THE HANDOFF TO SCENE 03
 *
 * This scene ends on a populated inbox — this is where conversations
 * arrive. Scene 03 opens on one of them going unanswered overnight.
 * There is deliberately no departure animation: the rail advances
 * Capture to Respond as scene 03 takes over, and a second moving mark
 * here would compete with the panel.
 */

/**
 * Where each conversation sits before anything gathers it.
 *
 * Negative, so the cards drift LEFT — toward the ways-in column they
 * came from — and settle right into the frame as it closes around them.
 * The largest is -18px, which at 375px still leaves the card's left
 * edge inside the page gutter. Nothing can reach the viewport edge.
 */
const DRIFT = [0, -16, -8, -18, -10];

export function SceneInbox() {
  const ref = useRef<HTMLDivElement>(null);
  const { progress, turn, settled } = useSceneTurn(ref);

  /* Five beats in one scroll, no pinning.
     The first two ride `progress` so the composition is present as the
     scene arrives; the rest ride the shared `turn`, which keeps this
     scene on the same rhythm as the ones around it. Under reduced
     motion `settled` is true from the first frame — see the media block
     in globals.css, which keeps the origin handles and both state
     labels legible so the argument survives without animation. */
  const arrived = settled || progress > 0.14;
  const listed = settled || progress > 0.22;
  const gathered = settled || turn > 0.3;
  const named = settled || turn > 0.42;

  return (
    <Scene
      id="every-way-in"
      /* Above the baseline. Every problem scene sits below 1; this one
         is a capability, and the light says so before the copy does. */
      emphasis={1.05}
      /* Capture — the stage this scene owns. Scene 03 moved to Respond
         when this arrived, so the rail advances between them instead of
         holding one point across two consecutive scenes. */
      stageIndex={1}
      /* The handover closes as the conversations land in one place.
         That is what this scene is: the gap at Capture being shut. */
      seal={settled ? 1 : turn}
      title={sceneInbox.title}
      lead={sceneInbox.lead}
    >
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
        {/* ---- the ways in ------------------------------------- */}
        {/* Every name is real text; the glyph beside it is decorative
            and hidden from assistive technology by ChannelIcon itself.
            With styles off this reads as a plain list of the places an
            enquiry can arrive from. */}
        <ul className="af-inbox__ways">
          {sceneInbox.doors.map((d, i) => (
            <li
              key={d}
              className={cn(
                "af-inbox__way",
                /* Website is not a messaging app and must never be
                   dressed as one. */
                d === "Website" && "af-inbox__way--form"
              )}
              style={{ ["--i" as string]: i }}
            >
              <ChannelIcon name={d} size={13} />
              {d}
            </li>
          ))}
        </ul>

        {/* ---- the inbox --------------------------------------- */}
        <div className="af-inbox__panel">
          <div className="af-frame af-inbox__frame">
            <div className="af-frame__bar">
              <i aria-hidden />
              <i aria-hidden />
              <i aria-hidden />
              <span className="af-frame__url">{sceneInbox.frameLabel}</span>
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
                    }}
                  >
                    <span className="af-inbox__id">
                      {/* Two readings of the same enquiry, sharing one
                          cell: the account a fragmented setup shows you,
                          and the person one connected record does. They
                          cross at zero — overlapping text in a shared
                          cell is the collision this codebase has already
                          paid for twice.

                          The TikTok row has nothing to resolve to, so it
                          renders once and stays as it is. Printing an
                          identical handle struck through beside itself
                          would read as a rendering fault, and under
                          reduced motion — where both are visible at
                          once — it certainly would. */}
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

          {/* Both state labels live in the DOM and cross-fade in a
              shared cell, so the comparison survives reduced motion. */}
          <p className="af-inbox__state">
            <i
              className={cn("af-dot", named ? "af-dot--flow" : "af-dot--leak")}
              aria-hidden
            />
            <span className="af-inbox__states">
              <span className="af-inbox__was">{sceneInbox.problemLabel}</span>
              <span className="af-inbox__is">{sceneInbox.resolvedLabel}</span>
            </span>
          </p>
        </div>
      </div>
    </Scene>
  );
}
