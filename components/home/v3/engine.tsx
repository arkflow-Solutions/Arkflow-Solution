"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionHead } from "@/components/home/v3/shared";
import { track } from "@/lib/analytics";
import { revenueEngine } from "@/lib/revenue-content";
import { cn } from "@/lib/utils";

/* ================================================= 05 · REVENUE ENGINE
 *
 * CANONICAL: ten stages. Attract, Capture, Respond, Qualify, Book,
 * Convert, Follow Up, Retain, Reactivate, Grow. The six-stage journey
 * that previously lived here is superseded and must not return.
 *
 * Not a ten-item list. Three linked representations of one system:
 *  - a schematic track where stages are nodes on a connected line,
 *    with everything before the active stage shown as already flowing
 *  - a tab rail, keyboard-driven, that scrolls the active stage into view
 *  - a panel that names the stage's purpose, the leak it exists to
 *    close, and an example flow whose steps light in sequence
 *
 * The flow-step animation is the meaning: information moving through a
 * stage rather than sitting in it.
 */

const STAGES = revenueEngine.stages;

export function RevenueEngine() {
  const [active, setActive] = useState(0);
  const [lit, setLit] = useState(0);
  const railRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const stage = STAGES[active];

  // Light the example-flow steps one after another when the stage
  // changes. Cleared on unmount and on every change, so a fast clicker
  // never stacks timers.
  useEffect(() => {
    setLit(0);
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      setLit(stage.flow.length);
      return;
    }
    const timers = stage.flow.map((_, i) =>
      window.setTimeout(() => setLit((n) => Math.max(n, i + 1)), 160 + i * 240)
    );
    return () => timers.forEach(window.clearTimeout);
  }, [active, stage.flow]);

  const select = (i: number, focus = false) => {
    setActive(i);
    track("engine_stage_view", { stage: STAGES[i].key, index: i + 1 });
    const el = tabRefs.current[i];
    if (el) {
      el.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
      if (focus) el.focus();
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const last = STAGES.length - 1;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      select(active === last ? 0 : active + 1, true);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      select(active === 0 ? last : active - 1, true);
    } else if (e.key === "Home") {
      e.preventDefault();
      select(0, true);
    } else if (e.key === "End") {
      e.preventDefault();
      select(last, true);
    }
  };

  return (
    <Section className="hairline" id="revenue-engine">
      <Container>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
          <SectionHead
            eyebrow={revenueEngine.eyebrow}
            title={revenueEngine.title}
          />
          <Reveal delay={0.08}>
            <p className="max-w-prose text-lead text-[color:var(--text-secondary)]">
              {revenueEngine.lead}
            </p>
          </Reveal>
        </div>

        {/* --- schematic track ------------------------------------ */}
        <Reveal className="mt-16">
          <div className="af-engine-schematic" aria-hidden>
            <svg viewBox="0 0 1000 64" preserveAspectRatio="none" className="af-engine-svg">
              <line x1="12" y1="32" x2="988" y2="32" className="af-engine-track" />
              <line
                x1="12"
                y1="32"
                x2={12 + (976 * active) / (STAGES.length - 1)}
                y2="32"
                className="af-engine-live"
              />
            </svg>
            <div className="af-engine-nodes">
              {STAGES.map((s, i) => (
                <span
                  key={s.key}
                  className={cn(
                    "af-engine-node",
                    i < active && "af-engine-node--past",
                    i === active && "af-engine-node--on"
                  )}
                />
              ))}
            </div>
          </div>
        </Reveal>

        {/* --- tab rail -------------------------------------------- */}
        <Reveal className="mt-8">
          <div
            ref={railRef}
            className="af-engine-rail"
            role="tablist"
            aria-label="The ArkFlow Revenue Engine"
            onKeyDown={onKeyDown}
          >
            {STAGES.map((s, i) => (
              <button
                key={s.key}
                type="button"
                role="tab"
                id={`engine-tab-${i}`}
                aria-selected={i === active}
                aria-controls="engine-panel"
                tabIndex={i === active ? 0 : -1}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                onClick={() => select(i)}
                className={cn("af-engine-tab", i === active && "af-engine-tab--on")}
              >
                <span className="af-engine-tab__n">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="af-engine-tab__l">{s.key}</span>
                <span className="af-engine-tab__bar" aria-hidden />
              </button>
            ))}
          </div>
        </Reveal>

        {/* --- stage panel ----------------------------------------- */}
        <Reveal className="mt-8">
          <div
            className="af-engine-panel"
            id="engine-panel"
            role="tabpanel"
            aria-labelledby={`engine-tab-${active}`}
          >
            <div>
              <Eyebrow>
                Stage {String(active + 1).padStart(2, "0")} of 10 · {stage.key}
              </Eyebrow>
              <h3 className="mt-5 text-subheading font-semibold lg:text-heading">
                {stage.head}
              </h3>
              <p className="mt-5 max-w-prose text-body text-[color:var(--text-secondary)]">
                {stage.body}
              </p>

              <div className="af-engine-leak">
                <p>
                  <b>Where it leaks without this</b>
                  {stage.leak}
                </p>
              </div>
            </div>

            <div className="af-flowbox">
              <div className="af-flowbox__bar">
                <i /><i /><i />
                <span>{stage.key} · example flow</span>
              </div>
              <div className="af-flowbox__body">
                {stage.flow.map((f, i) => (
                  <div
                    key={f.title}
                    className={cn("af-flowstep", i < lit && "af-flowstep--on")}
                  >
                    <span className="af-flowstep__rail" aria-hidden>
                      <span className="af-flowstep__node" />
                    </span>
                    <span className="af-flowstep__txt">
                      <b>{f.title}</b>
                      {f.body}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-small text-[color:var(--text-tertiary)]">
              {revenueEngine.hint}
            </p>
            <p className="text-small text-[color:var(--text-tertiary)]">
              {revenueEngine.note}
            </p>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
