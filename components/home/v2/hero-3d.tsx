"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { BookingButton } from "@/components/home/v2/shared";
import { ConvergenceField } from "@/components/motion/convergence-field";
import { useSceneGate, useScrollProgress } from "@/lib/use-scene-gate";
import { hero } from "@/lib/home-content";
import { cn } from "@/lib/utils";

const HeroScene = dynamic(() => import("@/components/three/hero-scene"), {
  ssr: false,
  loading: () => null,
});

/**
 * Hero — a pinned 3D scroll story.
 *
 * The value proposition is legible in the first viewport, before any
 * scrolling: the headline, the sub, and both CTAs are visible at
 * progress 0. The scroll story deepens the idea; it is never a gate in
 * front of it.
 *
 * Beats:
 *   1  "Ten doors."          disconnected entry points
 *   2  "One system."         connections flow inward
 *   3  "ArkFlow is the car." shell separates, core revealed
 */

const BEATS = [
  {
    at: 0,
    kicker: "Every way in",
    line: "Your customers arrive through a different door every time.",
  },
  {
    at: 0.34,
    kicker: "One system",
    line: "ArkFlow connects every one of them to the same place.",
  },
  {
    at: 0.66,
    kicker: "Inside",
    line: "Inbox, assistant, CRM, calendar, payments, workflows, records — connected.",
  },
];

export function Hero3D() {
  const ref = useRef<HTMLElement>(null);
  const { use3d, lite, inView } = useSceneGate(ref);
  const progress = useScrollProgress(ref);

  const beat =
    progress >= BEATS[2].at ? 2 : progress >= BEATS[1].at ? 1 : 0;

  return (
    <section
      ref={ref}
      className={cn("relative", use3d ? (lite ? "h-[240vh]" : "h-[340vh]") : "")}
      aria-label="ArkFlow — the connected system"
    >
      <div
        className={cn(
          "flex flex-col justify-center overflow-hidden",
          use3d ? "sticky top-0 h-[100svh]" : "pb-24 pt-32 md:pb-32 md:pt-40"
        )}
      >
        {/* --- 3D scene, or the lightweight field when gated out --- */}
        <div className="pointer-events-none absolute inset-0">
          {use3d ? (
            <HeroScene progress={progress} active={inView} lite={lite} />
          ) : (
            <ConvergenceField />
          )}
        </div>

        {/* --- copy, always readable, never waiting on the scene --- */}
        <Container className="relative">
          <div
            className="max-w-3xl transition-opacity duration-500"
            style={{ opacity: use3d ? 1 - Math.max(0, (progress - 0.2) / 0.22) : 1 }}
          >
            <Eyebrow>{hero.eyebrow}</Eyebrow>
            <h1 className="mt-8 text-display-xl font-semibold">
              {hero.title}
              <br />
              <span className="text-[color:var(--text-tertiary)]">
                {hero.titleAccent}
              </span>
            </h1>
            <p className="mt-10 max-w-prose text-lead text-[color:var(--text-secondary)]">
              {hero.lead}
            </p>
            <div className="pointer-events-auto mt-12 flex flex-wrap items-center gap-4">
              <BookingButton>{hero.primaryCta}</BookingButton>
              <Button href="#the-car" variant="secondary" size="large">
                {hero.secondaryCta}
              </Button>
            </div>
          </div>

          {/* --- scroll beats, only when the story is running --- */}
          {use3d && (
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 transition-opacity duration-500"
              style={{ opacity: progress > 0.24 ? 1 : 0 }}
            >
              {BEATS.map((b, i) => (
                <div
                  key={b.kicker}
                  className="absolute inset-x-0 bottom-0 transition-all duration-700 ease-premium"
                  style={{
                    opacity: i === beat ? 1 : 0,
                    transform: `translateY(${i === beat ? 0 : 12}px)`,
                  }}
                >
                  <p className="font-mono text-eyebrow uppercase text-blue-soft">
                    {b.kicker}
                  </p>
                  <p className="mt-3 max-w-xl text-subheading font-medium leading-snug">
                    {b.line}
                  </p>
                </div>
              ))}
            </div>
          )}
        </Container>

        {/* --- commitments strip, static hero only --- */}
        {!use3d && (
          <Container className="relative">
            <dl className="mt-20 grid gap-px overflow-hidden rounded-card border border-[color:var(--border-subtle)] sm:grid-cols-3">
              {hero.commitments.map((c) => (
                <div key={c.value} className="bg-surface/60 p-6">
                  <dt className="font-mono text-eyebrow uppercase text-[color:var(--text-tertiary)]">
                    {c.label}
                  </dt>
                  <dd className="mt-2 text-body font-medium text-white">
                    {c.value}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-small text-[color:var(--text-tertiary)]">
              {hero.commitmentsNote}
            </p>
          </Container>
        )}
      </div>
    </section>
  );
}
