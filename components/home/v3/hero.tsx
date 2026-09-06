"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { AuditButton } from "@/components/home/v3/shared";
import { LeakFlow } from "@/components/motion/leak-flow";
import { useSceneGate, useScrollProgress } from "@/lib/use-scene-gate";
import { track } from "@/lib/analytics";
import { hero } from "@/lib/revenue-content";
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
 * is the Revenue Leak Audit.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { use3d, lite, inView } = useSceneGate(ref);
  const progress = useScrollProgress(ref);

  const beat =
    progress >= hero.beats[2].at ? 2 : progress >= hero.beats[1].at ? 1 : 0;

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
              opacity: use3d ? 1 - Math.max(0, (progress - 0.2) / 0.22) : 1,
            }}
          >
            <div className="af-hero-badge">
              <span className="af-hero-badge__dot" aria-hidden />
              <Eyebrow className="text-[color:var(--text-tertiary)]">
                {hero.eyebrow}
              </Eyebrow>
            </div>

            <h1 className="mt-8 text-display-xl font-semibold">
              {hero.title}
              <br />
              <span className="af-leak-word">{hero.titleAccent}</span>
            </h1>

            <p className="mt-10 max-w-prose text-lead text-[color:var(--text-secondary)]">
              {hero.lead}
            </p>
            <p className="mt-4 max-w-prose text-lead text-white">
              {hero.leadTwo}
            </p>

            <div className="pointer-events-auto mt-12 flex flex-wrap items-center gap-4">
              <AuditButton location="homepage_hero">
                {hero.primaryCta}
              </AuditButton>
              <Button
                href="#revenue-engine"
                variant="secondary"
                size="large"
                onClick={() =>
                  track("cta_secondary_click", { location: "homepage_hero" })
                }
              >
                {hero.secondaryCta}
              </Button>
            </div>
          </div>

          {/* Scroll beats, only while the pinned story is running. */}
          {use3d && (
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 transition-opacity duration-500"
              style={{ opacity: progress > 0.24 ? 1 : 0 }}
            >
              {hero.beats.map((b, i) => (
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
