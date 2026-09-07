"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { SectionHead, IllustrativeTag } from "@/components/home/v3/shared";
import { useInView } from "@/lib/use-in-view";
import { retention, reactivation, multiLocation } from "@/lib/revenue-content";
import { sceneDisappearing } from "@/lib/scene-content";
import { cn } from "@/lib/utils";

/* ======================================================= 11 · RETENTION
 *
 * Four states of the same person, lighting in sequence. The section
 * argues that the customer journey continues past the transaction, so
 * the visual continues past the first panel rather than stopping there.
 */

export function Retention() {
  const { ref, inView } = useInView<HTMLDivElement>("-80px");
  const [lit, setLit] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setLit(retention.arc.length);
      return;
    }
    const timers = retention.arc.map((_, i) =>
      window.setTimeout(() => setLit((n) => Math.max(n, i + 1)), i * 280)
    );
    return () => timers.forEach(window.clearTimeout);
  }, [inView]);

  return (
    <Section className="hairline" id="retention">
      <Container>
        <SectionHead
          eyebrow={retention.eyebrow}
          title={retention.title}
          lead={retention.lead}
        />

        <div ref={ref} className="af-arc mt-16">
          {retention.arc.map((s, i) => (
            <div
              key={s.title}
              className={cn("af-arc__step", i < lit && "af-arc__step--on")}
            >
              <span className="af-arc__n">{String(i + 1).padStart(2, "0")}</span>
              <b>{s.title}</b>
              <p>{s.body}</p>
              {i < retention.arc.length - 1 && (
                <span className="af-arc__link" aria-hidden />
              )}
            </div>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-14 max-w-2xl text-subheading font-medium leading-snug">
            {retention.close}
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}

/* ==================================================== 12 · REACTIVATION
 *
 * A dormant customer database, drawn as records. When the section is
 * reached, a proportion matches a re-engagement rule and warms, and a
 * subset of those enters a follow-up workflow and lights.
 *
 * The proportions are deliberately arbitrary and the section says so:
 * this illustrates the shape of a workflow, not a recovery rate. No
 * claim about how many dormant customers any business will recover
 * appears anywhere on this page.
 */

const CELL_COUNT = 260;

export function Reactivation() {
  const { ref, inView } = useInView<HTMLDivElement>("-80px");
  const [warm, setWarm] = useState<Set<number>>(new Set());
  const [wake, setWake] = useState<Set<number>>(new Set());
  const started = useRef(false);

  // Deterministic per mount, so the pattern does not reshuffle on
  // re-render, and no Math.random runs during SSR.
  const plan = useMemo(() => {
    const w: number[] = [];
    const k: number[] = [];
    for (let i = 0; i < CELL_COUNT; i++) {
      if ((i * 7 + 3) % 10 < 3) {
        w.push(i);
        if ((i * 13 + 5) % 10 < 4) k.push(i);
      }
    }
    return { w, k };
  }, []);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setWarm(new Set(plan.w));
      setWake(new Set(plan.k));
      return;
    }

    const timers: number[] = [];
    plan.w.forEach((cell, i) => {
      timers.push(
        window.setTimeout(() => {
          setWarm((prev) => new Set(prev).add(cell));
        }, 120 + i * 14)
      );
    });
    plan.k.forEach((cell, i) => {
      timers.push(
        window.setTimeout(() => {
          setWake((prev) => new Set(prev).add(cell));
        }, 900 + i * 34)
      );
    });
    return () => timers.forEach(window.clearTimeout);
  }, [inView, plan]);

  return (
    <Section className="hairline" id="reactivation">
      <Container>
        <SectionHead
          eyebrow={reactivation.eyebrow}
          title={sceneDisappearing.title}
          lead={sceneDisappearing.lead}
        />

        {/* PHASE 3E — the opening frame. Before the field of dormant
            records, ONE record: a customer who bought and then cooled.
            Without it the grid reads as an abstract array of cells; with
            it, the grid reads as many of that person, which is the
            recognition this scene is for ("I have hundreds of those").
            No count is stated and none may be — see reactivation.note. */}
        <Reveal className="mt-14">
          <ol className="af-record-life" aria-label="What happens to one customer">
            {sceneDisappearing.lifecycle.map((step, i) => (
              <li
                key={step.label}
                className={`af-record-life__step is-${step.tone}`}
              >
                <span className="af-record-life__dot" aria-hidden />
                <span className="af-record-life__l">{step.label}</span>
                {i < sceneDisappearing.lifecycle.length - 1 && (
                  <span className="af-record-life__gap" aria-hidden />
                )}
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal className="mt-12">
          <div ref={ref} className="af-dormant">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <span className="font-mono text-eyebrow uppercase text-[color:var(--text-tertiary)]">
                Customer database · dormant segment
              </span>
              <IllustrativeTag />
            </div>

            <div className="af-dormant__grid mt-8" aria-hidden>
              {Array.from({ length: CELL_COUNT }, (_, i) => (
                <span
                  key={i}
                  className={cn(
                    "af-cell",
                    warm.has(i) && "af-cell--warm",
                    wake.has(i) && "af-cell--wake"
                  )}
                />
              ))}
            </div>

            <ul className="af-dormant__legend mt-8">
              {reactivation.legend.map((l) => (
                <li key={l.label}>
                  <i className={cn("af-cell", `af-cell--${l.tone}`)} aria-hidden />
                  {l.label}
                </li>
              ))}
            </ul>

            <div className="af-dormant__wf mt-8">
              {reactivation.workflow.map((w) => (
                <div key={w.title} className="af-wf">
                  <b>{w.title}</b>
                  <p>{w.body}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="mt-8 max-w-prose text-small text-[color:var(--text-tertiary)]">
            {reactivation.note}
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}

/* =================================================== 13 · MULTI-LOCATION */

export function MultiLocation() {
  return (
    <Section className="hairline" id="multi-location">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center lg:gap-16">
          <div>
            <SectionHead
              eyebrow={multiLocation.eyebrow}
              title={multiLocation.title}
              lead={multiLocation.lead}
            />
            <Reveal delay={0.06}>
              <p className="mt-5 max-w-prose text-lead text-[color:var(--text-secondary)]">
                {multiLocation.leadTwo}
              </p>
              <p className="mt-6 max-w-prose text-small text-[color:var(--text-tertiary)]">
                {multiLocation.note}
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <svg
              viewBox="0 0 420 300"
              className="af-locsvg"
              role="img"
              aria-label="Diagram: one central ArkFlow system connected to four business locations, each with its own calendar and team, feeding one connected operational view."
            >
              <line className="af-loc-edge" x1="210" y1="80" x2="70" y2="180" />
              <line className="af-loc-edge" x1="210" y1="80" x2="163" y2="180" />
              <line className="af-loc-edge" x1="210" y1="80" x2="257" y2="180" />
              <line className="af-loc-edge" x1="210" y1="80" x2="350" y2="180" />

              <rect className="af-loc-core" x="128" y="36" width="164" height="44" rx="10" />
              <text className="af-loc-core-l" x="210" y="63" textAnchor="middle">
                ARKFLOW
              </text>

              {[
                { x: 24, cx: 70, n: "LOCATION 01" },
                { x: 117, cx: 163, n: "LOCATION 02" },
                { x: 211, cx: 257, n: "LOCATION 03" },
                { x: 304, cx: 350, n: "LOCATION 04" },
              ].map((l) => (
                <g key={l.n}>
                  <rect className="af-loc-node" x={l.x} y="180" width="92" height="66" rx="9" />
                  <text x={l.cx} y="205" textAnchor="middle">{l.n}</text>
                  <text x={l.cx} y="222" textAnchor="middle" opacity="0.6">Own calendar</text>
                  <text x={l.cx} y="236" textAnchor="middle" opacity="0.6">Own team</text>
                </g>
              ))}

              <text x="210" y="278" textAnchor="middle" opacity="0.5">
                {multiLocation.caption.toUpperCase()}
              </text>
            </svg>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
