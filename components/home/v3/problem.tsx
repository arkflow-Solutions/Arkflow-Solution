"use client";

import { useRef, useState } from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ChannelIcon } from "@/components/ui/channel-icon";
import { LeakFlow } from "@/components/motion/leak-flow";
import { SectionHead, StageNumber } from "@/components/home/v3/shared";
import { useScrollProgress } from "@/lib/use-scene-gate";
import { track } from "@/lib/analytics";
import { revenueLeak, fragmentation, whatArkflow } from "@/lib/revenue-content";
import { cn } from "@/lib/utils";

/* ==================================================== 02 · REVENUE LEAK
 *
 * The signature moment. A pinned canvas where the visitor closes the
 * gaps themselves by scrolling: at the top of the section the handovers
 * are open and opportunities fall out in amber; by the bottom they are
 * sealed and the same flow completes in blue.
 *
 * Below it, the eleven-stage path is addressable. Selecting a stage
 * shows what typically goes wrong there and where ArkFlow works. This
 * is the recognition step of the conversion sequence: the visitor
 * should find their own business in the list.
 */

export function RevenueLeak() {
  const ref = useRef<HTMLElement>(null);
  const progress = useScrollProgress(ref);
  const [active, setActive] = useState(2);

  // Gaps stay open for the first third, seal across the middle, and
  // hold sealed at the end. The visitor performs the fix.
  const seal = Math.max(0, Math.min(1, (progress - 0.32) / 0.34));
  const stage = revenueLeak.stages[active];

  const select = (i: number) => {
    setActive(i);
    track("leak_stage_view", { stage: revenueLeak.stages[i].stage });
  };

  return (
    <section ref={ref} id="the-leak" className="hairline relative">
      {/* --- pinned leak canvas --------------------------------- */}
      <div className="af-leak-scroll">
        <div className="af-leak-pin">
          <div className="af-leak-canvas">
            <LeakFlow seal={seal} />
          </div>

          <Container className="relative flex h-full flex-col justify-center">
            <div className="max-w-2xl">
              <Eyebrow>{revenueLeak.eyebrow}</Eyebrow>
              <h2 className="mt-6 text-heading font-semibold">
                {revenueLeak.title}
              </h2>
              <p className="mt-6 max-w-prose text-lead text-[color:var(--text-secondary)]">
                {revenueLeak.lead}
              </p>
            </div>

            {/* State readout. The label changes as the visitor seals
                the system, so the motion is explained rather than
                merely watched. */}
            <div className="af-leak-state" aria-hidden>
              <span
                className={cn("af-leak-state__item", seal < 0.5 && "is-on")}
              >
                <i className="af-dot af-dot--leak" />
                Handovers open. Opportunities falling out.
              </span>
              <span
                className={cn("af-leak-state__item", seal >= 0.5 && "is-on")}
              >
                <i className="af-dot af-dot--flow" />
                Handovers closed. The journey completes.
              </span>
            </div>
          </Container>
        </div>
      </div>

      {/* --- addressable stage path ----------------------------- */}
      <Container className="pb-24 md:pb-32">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
          <Reveal>
            <p className="text-small text-[color:var(--text-tertiary)]">
              {revenueLeak.hint}
            </p>

            <div className="af-rail-list mt-6" role="tablist" aria-label="Customer journey stages">
              {revenueLeak.stages.map((s, i) => (
                <button
                  key={s.stage}
                  type="button"
                  role="tab"
                  id={`leak-tab-${i}`}
                  aria-selected={i === active}
                  aria-controls="leak-panel"
                  tabIndex={i === active ? 0 : -1}
                  onClick={() => select(i)}
                  onFocus={() => select(i)}
                  onKeyDown={(e) => {
                    const last = revenueLeak.stages.length - 1;
                    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
                      e.preventDefault();
                      select(active === last ? 0 : active + 1);
                    }
                    if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
                      e.preventDefault();
                      select(active === 0 ? last : active - 1);
                    }
                  }}
                  className={cn("af-rail-row", i === active && "af-rail-row--on")}
                >
                  <StageNumber n={i + 1} active={i === active} />
                  <span className="af-rail-row__name">{s.stage}</span>
                  <span className="af-rail-row__drip">{s.drip}</span>
                </button>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div
              className="af-leak-panel"
              id="leak-panel"
              role="tabpanel"
              aria-labelledby={`leak-tab-${active}`}
            >
              <div className="flex items-center justify-between gap-4">
                <span className="font-mono text-eyebrow uppercase text-[color:var(--text-tertiary)]">
                  Stage {String(active + 1).padStart(2, "0")} · {stage.stage}
                </span>
                <span className="af-illus af-illus--leak">Potential leak</span>
              </div>

              <h3 className="mt-6 text-subheading font-semibold">{stage.head}</h3>
              <p className="mt-4 max-w-prose text-body text-[color:var(--text-secondary)]">
                {stage.what}
              </p>

              <ul className="mt-8 space-y-0">
                {stage.signs.map((sign) => (
                  <li key={sign} className="af-sign">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
                      <path d="M8 2.5 14 13H2L8 2.5Z" stroke="#D97706" strokeWidth="1.3" strokeLinejoin="round" />
                      <path d="M8 6.6v2.6M8 11.1h.01" stroke="#D97706" strokeWidth="1.3" strokeLinecap="round" />
                    </svg>
                    {sign}
                  </li>
                ))}
              </ul>

              <div className="af-fix">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden className="mt-1 shrink-0">
                  <circle cx="8" cy="8" r="6.4" stroke="#3B82F6" strokeWidth="1.3" />
                  <path d="m5.4 8.2 1.8 1.8 3.4-3.8" stroke="#3B82F6" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p className="text-small text-[color:var(--text-secondary)]">
                  <strong className="font-medium text-white">Where ArkFlow works:</strong>{" "}
                  {stage.fix}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/* ================================================= 03 · FRAGMENTATION
 *
 * Preserved from the v2 "Ten doors" section: the channel chips with
 * their brand glyphs were the strongest visual there and are kept.
 * Upgraded from one list into a two-panel argument, so the cost of
 * fragmentation sits directly beside its cause.
 */

export function Fragmentation() {
  return (
    <Section className="hairline" id="fragmentation">
      <Container>
        <SectionHead
          eyebrow={fragmentation.eyebrow}
          title={fragmentation.title}
          lead={fragmentation.lead}
          wide
        />

        <div className="mt-16 grid gap-4 lg:grid-cols-2">
          <Reveal>
            <div className="af-frag af-frag--before card-toplight">
              <h3 className="text-subheading font-semibold">
                {fragmentation.doors.heading}
              </h3>
              <p className="mt-2 text-small text-[color:var(--text-tertiary)]">
                {fragmentation.doors.sub}
              </p>

              <ul className="mt-8 flex flex-wrap gap-2.5">
                {fragmentation.doors.items.map((item) => (
                  <li key={item} className="af-chip">
                    <ChannelIcon name={item} className="text-blue-soft" />
                    {item}
                  </li>
                ))}
              </ul>

              <p className="mt-8 text-body text-[color:var(--text-secondary)]">
                {fragmentation.doors.note}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="af-frag af-frag--cost card-toplight">
              <h3 className="text-subheading font-semibold">
                {fragmentation.cost.heading}
              </h3>
              <p className="mt-2 text-small text-[color:var(--text-tertiary)]">
                {fragmentation.cost.sub}
              </p>

              <ul className="mt-8 grid gap-2 sm:grid-cols-2">
                {fragmentation.cost.items.map((item) => (
                  <li key={item} className="af-cost-item">
                    <i className="af-dot af-dot--leak" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>

              <p className="mt-8 text-body text-[color:var(--text-secondary)]">
                {fragmentation.cost.note}
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

/* ================================================ 04 · WHAT ARKFLOW IS */

export function WhatArkflow() {
  return (
    <Section className="hairline" id="what-arkflow-is">
      <Container>
        <SectionHead
          eyebrow={whatArkflow.eyebrow}
          title={whatArkflow.title}
          lead={whatArkflow.lead}
        />

        <div className="mt-16 border-t border-[color:var(--border-subtle)]">
          {whatArkflow.layers.map((layer, i) => (
            <Reveal key={layer.label} delay={i * 0.05}>
              <div className="af-layer">
                <span className="af-layer__label">{layer.label}</span>
                <p className="text-body text-[color:var(--text-secondary)]">
                  {layer.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-14 text-subheading font-medium leading-snug">
            {whatArkflow.close}
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
