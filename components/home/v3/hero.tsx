"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { DiscoveryCallButton } from "@/components/home/v3/shared";
import { LeakFlow } from "@/components/motion/leak-flow";
import { ChannelIcon } from "@/components/ui/channel-icon";
import { useSceneGate, useScrollProgress } from "@/lib/use-scene-gate";
import { track } from "@/lib/analytics";
import { sceneOpening } from "@/lib/scene-content";
import { cn } from "@/lib/utils";

const HeroScene = dynamic(() => import("@/components/three/hero-scene"), {
  ssr: false,
  loading: () => null,
});

/**
 * Hero — the pinned 3D scroll story, preserved from v2 and re-pointed
 * at the leak narrative.
 *
 * WHAT IS PRESERVED. The scene gate, the scroll-progress driver, the
 * pinned sticky story, the three-beat structure, the dynamic import and
 * the rule that the value proposition is fully legible at progress 0.
 * The 3D scene is unchanged: entry points scattered, then connecting
 * inward, then the system assembling. That progression already argues
 * exactly what the leak story argues, so it was rewritten in copy
 * rather than rebuilt in geometry.
 *
 * WHAT IS NEW. The headline is the leak. The 2D fallback is now
 * LeakFlow rather than ConvergenceField, so devices without WebGL get
 * the signature visual rather than an ambient one. The primary action
 * is "Book a Discovery Call", which opens the booking modal.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { use3d, lite, inView } = useSceneGate(ref);
  const progress = useScrollProgress(ref);

  const beat =
    progress >= sceneOpening.beats[2].at
      ? 2
      : progress >= sceneOpening.beats[1].at
        ? 1
        : 0;

  /* The headline block fades as the pinned story advances. Hoisted to a
     variable because the beat bar and the pointer-events guard both
     need to know when it has gone. */
  const contentOpacity = use3d
    ? 1 - Math.max(0, (progress - 0.2) / 0.22)
    : 1;

  return (
    <section
      ref={ref}
      className={cn("relative", use3d ? (lite ? "h-[240vh]" : "h-[340vh]") : "")}
      aria-label="ArkFlow, a Revenue Operating Company"
    >
      <div
        className={cn(
          "flex flex-col justify-center overflow-hidden",
          use3d ? "sticky top-0 h-[100svh]" : "pb-24 pt-32 md:pb-32 md:pt-40"
        )}
      >
        {/* Scene layer. 3D where the device can carry it, the leak
            canvas everywhere else. Never both. */}
        <div className="pointer-events-none absolute inset-0">
          {use3d ? (
            <HeroScene progress={progress} active={inView} lite={lite} />
          ) : (
            <div className="af-hero-flow">
              <LeakFlow lite />
            </div>
          )}
        </div>

        {/* Depth: an ink vignette so the headline never fights the scene. */}
        <div className="af-hero-veil" aria-hidden />

        <Container className="relative">
          <div
            className="max-w-3xl transition-opacity duration-500"
            style={{
              opacity: contentOpacity,
              /* Once faded out this block is invisible but was still
                 clickable, so the scroll beats were sitting on top of
                 live buttons. Nothing that cannot be seen should be
                 hittable. */
              pointerEvents: contentOpacity < 0.05 ? "none" : undefined,
            }}
          >
            {/* PHASE 3E — the "Revenue Operating Company" eyebrow is
                gone from here. It was the first three words on the site
                and the phrase a business owner is least equipped to
                decode. The positioning was MOVED, not deleted: it now
                lands in SystemAndClose (v3/close.tsx), once the visitor
                has watched the system work and the category name
                describes something they recognise.

                In its place: the doors an enquiry actually arrives
                through, named in words nobody has to learn. */}
            <div className="af-hero-doors">
              {sceneOpening.doors.map((d) => (
                <span key={d} className="af-hero-door">
                  <ChannelIcon
                    name={d === "Messaging" ? "WhatsApp" : d}
                    className="text-blue-soft"
                  />
                  {d}
                </span>
              ))}
            </div>

            <h1 className="mt-8 text-display-xl font-semibold">
              {sceneOpening.title}
              <br />
              <span className="af-leak-word">{sceneOpening.titleAccent}</span>
            </h1>

            {/* One line. The scene behind it does the explaining. */}
            <p className="mt-8 max-w-prose text-lead text-[color:var(--text-secondary)]">
              {sceneOpening.lead}
            </p>

            <div className="pointer-events-auto mt-12 flex flex-wrap items-center gap-4">
              <DiscoveryCallButton location="homepage_hero">
                {sceneOpening.primaryCta}
              </DiscoveryCallButton>
              <Button
                href="#unanswered"
                variant="secondary"
                size="large"
                onClick={() =>
                  track("cta_secondary_click", { location: "homepage_hero" })
                }
              >
                {sceneOpening.secondaryCta}
              </Button>
            </div>
          </div>

        </Container>

        {/* Scroll beats, only while the pinned story is running.

            ANCHORED TO THE STICKY FRAME, NOT TO THE TEXT BLOCK. They
            used to live inside the Container above and were positioned
            `bottom-0` — but that is the bottom of the CONTENT, which at
            375px ends at 686px while the frame ends at 812px. The beats
            therefore landed on top of the CTA buttons with a measured
            61px overlap, while a 126px strip sat empty beneath them.
            Sitting outside the Container, they use that strip. */}
        {use3d && (
          /* THE BEAT STACK. Fixed 7 September 2026 — see below.
                Every beat occupies ONE shared grid cell (.af-hero-beats
                / .af-hero-beat in globals.css), so all three sit in
                exactly the same box whatever their wrapped height, and
                their opacity is staggered so two are never legible at
                once.

                THE BUG THIS REPLACES. Each beat used to be its own
                `absolute inset-x-0 bottom-0` block. Bottom-anchored
                blocks of DIFFERENT heights do not share a baseline: at
                375px "Between the steps, nobody is watching." wraps to
                two lines (61px tall, top 637) while "That is where they
                stop." is one line (30px tall, top 667) — so the second
                line of one landed on exactly the same 30px row as the
                whole of the other. During the 700ms crossfade both were
                partially visible and the rows collided, rendering as
                "Th…That is where they stop."

                It never showed on desktop because at 1280px all three
                beats fit on one line, so all three were the same height
                and did share a baseline. Classic desktop geometry
                carried onto mobile — and note that it passed every
                overflow, width and DOM check, because nothing was
                overflowing or missing. Two things were simply in the
                same place. */
          <div
            className="af-hero-beatbar"
            style={{ opacity: progress > 0.24 ? 1 : 0 }}
          >
            <Container>
              <div className="af-hero-beats">
                {/* No kicker label: the beat is one plain sentence.
                    Only the beat actually on screen is announced, so a
                    screen reader gets one caption, not all three. */}
                {sceneOpening.beats.map((b, i) => (
                  <p
                    key={b.line}
                    className={cn(
                      "af-hero-beat text-subheading font-medium leading-snug",
                      i === beat && "is-on"
                    )}
                    aria-hidden={i !== beat}
                  >
                    {b.line}
                  </p>
                ))}
              </div>
            </Container>
          </div>
        )}

        {/* Philosophy strip. Replaces the superseded commitments strip:
            these are statements of intent, not performance claims. */}
        {!use3d && (
          <Container className="relative">
            <dl className="mt-20 grid gap-px overflow-hidden rounded-card border border-[color:var(--border-subtle)] sm:grid-cols-3">
              {[
                { label: "Capture more", value: "Nothing arrives where nobody is watching" },
                { label: "Convert more", value: "The journey stops depending on memory" },
                { label: "Retain more", value: "The relationship continues after the sale" },
              ].map((c) => (
                <div key={c.label} className="bg-surface/60 p-6">
                  <dt className="font-mono text-eyebrow uppercase text-blue-soft">
                    {c.label}
                  </dt>
                  <dd className="mt-2 text-body text-[color:var(--text-secondary)]">
                    {c.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Container>
        )}
      </div>
    </section>
  );
}
