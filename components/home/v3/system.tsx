"use client";

import { useEffect, useRef, useState } from "react";
import {
  Inbox,
  MessageSquare,
  ListChecks,
  CalendarCheck,
  Database,
  Repeat,
  Heart,
  RotateCcw,
  Workflow,
  Globe,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Tilt } from "@/components/motion/tilt";
import { SectionHead } from "@/components/home/v3/shared";
import { useInView } from "@/lib/use-in-view";
import { useViewportProgress } from "@/lib/use-viewport-progress";
import { SceneAtmosphere } from "@/components/motion/scene-atmosphere";
import { THROUGHLINE_STAGES } from "@/lib/throughline";
import { track } from "@/lib/analytics";
import { beforeAfter, capabilities, humanAi } from "@/lib/revenue-content";
import { cn } from "@/lib/utils";

/* =================================================== 08 · BEFORE/AFTER
 *
 * The transformation is the argument, so the section performs it once
 * rather than presenting two static columns. It opens on the fragmented
 * state; shortly after it enters the viewport it resolves into the
 * connected one. The visitor can toggle back and forth afterwards.
 *
 * In the "before" state the tiles sit very slightly out of alignment.
 * That is the entire visual idea: the disorder is legible before a word
 * is read, and it resolves to a grid when the system connects.
 */

export function BeforeAfter() {
  const { ref, inView } = useInView<HTMLDivElement>("-100px");
  const [view, setView] = useState<"before" | "after">("before");
  const auto = useRef(false);

  useEffect(() => {
    if (!inView || auto.current) return;
    auto.current = true;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = window.setTimeout(() => setView("after"), reduce ? 400 : 1600);
    return () => window.clearTimeout(t);
  }, [inView]);

  const set = (next: "before" | "after") => {
    setView(next);
    track("before_after_toggle", { view: next, location: "homepage_before_after" });
  };

  const data = view === "before" ? beforeAfter.before : beforeAfter.after;

  return (
    <Section className="hairline" id="before-after">
      <Container>
        <SectionHead
          eyebrow={beforeAfter.eyebrow}
          title={beforeAfter.title}
          lead={beforeAfter.lead}
        />

        <Reveal className="mt-12">
          <div className="af-toggle" role="group" aria-label="Compare before and after ArkFlow">
            <span
              className="af-toggle__thumb"
              aria-hidden
              style={{ transform: `translateX(${view === "before" ? 0 : 100}%)` }}
            />
            <button
              type="button"
              aria-pressed={view === "before"}
              onClick={() => set("before")}
            >
              {beforeAfter.before.label}
            </button>
            <button
              type="button"
              aria-pressed={view === "after"}
              onClick={() => set("after")}
            >
              {beforeAfter.after.label}
            </button>
          </div>
        </Reveal>

        <div ref={ref} className="mt-10">
          <div
            className={cn(
              "af-swap",
              view === "before" ? "af-swap--before" : "af-swap--after"
            )}
            aria-live="polite"
          >
            <ul className="af-swap__grid">
              {data.items.map((item, i) => (
                <li key={item} className="af-swap__item" style={{ "--i": i } as React.CSSProperties}>
                  <i className="af-dot" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
            <p className="af-swap__caption">{data.caption}</p>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ==================================================== 09 · CAPABILITIES
 *
 * CURRENT capability areas only. AI voice is in development, invoice
 * and payment automation and marketing attribution are future, and
 * none of the three appears here. Nothing on this grid is a product
 * name; they are areas of work, described functionally.
 */

const ICONS = {
  capture: Inbox,
  conversation: MessageSquare,
  qualify: ListChecks,
  book: CalendarCheck,
  crm: Database,
  followup: Repeat,
  retain: Heart,
  reactivate: RotateCcw,
  ops: Workflow,
  web: Globe,
} as const;

export function Capabilities() {
  return (
    <Section className="hairline" id="capabilities">
      <Container>
        <SectionHead
          eyebrow={capabilities.eyebrow}
          title={capabilities.title}
          lead={capabilities.lead}
          wide
        />

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.items.map((cap, i) => {
            const Icon = ICONS[cap.icon as keyof typeof ICONS] ?? Workflow;
            return (
              <Reveal key={cap.title} delay={Math.min(i, 5) * 0.05}>
                <Tilt className="h-full">
                  <SpotlightCard className="h-full p-7">
                    <span className="af-cap-icon" aria-hidden>
                      <Icon size={17} strokeWidth={1.6} />
                    </span>
                    <h3 className="mt-6 text-body font-semibold text-white">
                      {cap.title}
                    </h3>
                    <p className="mt-3 text-small leading-relaxed text-[color:var(--text-secondary)]">
                      {cap.body}
                    </p>
                  </SpotlightCard>
                </Tilt>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.08}>
          <p className="mt-10 max-w-prose text-small text-[color:var(--text-tertiary)]">
            {capabilities.note}
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}

/* ====================================================== 10 · HUMAN + AI */

export function HumanAndAi() {
  const atmosRef = useRef<HTMLDivElement>(null);
  const { progress: atmos } = useViewportProgress(atmosRef, 1, 0.02);

  return (
    <Section className="hairline" id="human-and-ai">
      {/* PHASE 3E CONTINUITY — see the note in demo.tsx.
          Lit as Respond, which is the one `branch` stage in the
          canonical model and therefore the only green in the palette.
          The environment turns green exactly where the section's
          argument is that a person takes over: the light is making the
          point before the columns do. */}
      <div ref={atmosRef}>
        <SceneAtmosphere
          progress={atmos}
          seal={1}
          focusT={THROUGHLINE_STAGES[2].t}
          vignette={false}
        >
      <Container className="relative z-[1]">
        <SectionHead
          eyebrow={humanAi.eyebrow}
          title={humanAi.title}
          lead={humanAi.lead}
          wide
        />

        {/* PHASE 3E — the handover, shown on the thread the visitor has
            just watched rather than asserted in two lists.

            The marker sits between the two columns and names the exact
            moment from the approved script where the AI stopped: a
            health question it is not configured to answer. Making the
            boundary visible on real evidence is what stops this section
            reading as a claim.

            The lists are trimmed from seven items to four each. Nothing
            was reworded — the remaining items are verbatim from
            humanAi.ai.items / humanAi.human.items. */}
        <div className="af-handover">
          <Reveal>
            <div className="af-split af-split--ai card-toplight">
              <span className="af-split__tag">{humanAi.ai.tag}</span>
              <h3 className="mt-6 text-subheading font-semibold">
                {humanAi.ai.title}
              </h3>
              <ul className="mt-8">
                {humanAi.ai.items.slice(0, 4).map((item) => (
                  <li key={item}>
                    <i className="af-dot af-dot--flow" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* The boundary itself. Green is human takeover everywhere on
              this site, and Respond is the one `branch` stage in the
              canonical model — the palette already says this. */}
          <div className="af-handover__mark">
            <span className="af-handover__rule" aria-hidden />
            <span className="af-handover__badge">
              <i className="af-dot af-dot--human" aria-hidden />
              Escalation · a person takes over
            </span>
            <span className="af-handover__rule" aria-hidden />
          </div>

          <Reveal delay={0.08}>
            <div className="af-split af-split--human card-toplight">
              <span className="af-split__tag">{humanAi.human.tag}</span>
              <h3 className="mt-6 text-subheading font-semibold">
                {humanAi.human.title}
              </h3>
              <ul className="mt-8">
                {humanAi.human.items.slice(0, 4).map((item) => (
                  <li key={item}>
                    <i className="af-dot af-dot--human" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <p className="mt-14 max-w-2xl text-subheading font-medium leading-snug">
            {humanAi.close}
          </p>
        </Reveal>
      </Container>
        </SceneAtmosphere>
      </div>
    </Section>
  );
}
