import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/pages/page-hero";
import { BookCallButton } from "@/components/pages/book-call-button";
import { Magnetic } from "@/components/motion/magnetic";
import { ScopePlan } from "@/components/what-we-build/scope-plan";
import { buildMetadata } from "@/lib/seo";
import {
  wwbHero,
  plan,
  operating,
  titleBlock,
  wwbCta,
} from "@/lib/what-we-build-content";

import "./what-we-build.css";

/**
 * /what-we-build — the engagement.
 *
 * Formerly /packages, which now redirects here permanently (see
 * next.config.js). The navigation label was already "What we build",
 * chosen because ArkFlow does not sell fixed packages; the URL now
 * agrees with it.
 *
 * THE THREE PAGES, KEPT DISTINCT:
 *   /attract        the front door and the guided website journey
 *   /solutions      what happens to one opportunity after it arrives
 *   /what-we-build  what ArkFlow builds and keeps operating, and where
 *                   the line is
 *
 * The central device is a scope plan viewed from above — see
 * components/what-we-build/scope-plan.tsx. Governance for every claim,
 * and the three boundary strings shared with /attract and /solutions,
 * are documented at the head of lib/what-we-build-content.ts.
 *
 * SCOPE. Styles are route-scoped in ./what-we-build.css, so
 * app/globals.css is not touched.
 */
export const metadata = buildMetadata({
  title: "What we build",
  description:
    "ArkFlow doesn't sell fixed software packages. We scope a revenue system around how your business actually works, build it, and keep operating it with you — and we are explicit about where the line is.",
  path: "/what-we-build",
});

export default function WhatWeBuildPage() {
  return (
    <>
      <PageHero
        eyebrow={wwbHero.eyebrow}
        title={wwbHero.title}
        lead={wwbHero.lead}
      />

      <Container>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-4 pb-4">
          <Magnetic>
            <BookCallButton size="large" withArrow>
              {wwbHero.primaryCta}
            </BookCallButton>
          </Magnetic>
          <p className="max-w-md text-small text-[color:var(--text-tertiary)]">
            {wwbHero.note}
          </p>
        </div>
      </Container>

      {/* ----------------------------------------------- THE SCOPE
          The plan: three zones inside a boundary, each in two
          registers, with what ArkFlow does not do standing outside it. */}
      <Section className="hairline">
        <Container>
          <p className="font-mono text-eyebrow uppercase tracking-wider text-blue-soft">
            {plan.eyebrow}
          </p>
          <h2 className="mt-5 max-w-2xl text-heading font-semibold">
            {plan.title}
          </h2>

          <ScopePlan />
        </Container>
      </Section>

      {/* -------------------------------------- BUILD, THEN OPERATE
          The operating relationship, stated as the page's argument
          rather than left as a note under a list. */}
      <Section className="hairline">
        <Container>
          <div className="af-wwb-operating">
            <div>
              <p className="font-mono text-eyebrow uppercase tracking-wider text-blue-soft">
                {operating.eyebrow}
              </p>
              <h2 className="af-wwb-operating__title">{operating.title}</h2>
            </div>
            <p className="af-wwb-operating__body">{operating.body}</p>
          </div>
        </Container>
      </Section>

      {/* ----------------------------------- HOW THE LINE GETS DRAWN
          The engagement sequence, set as the plan's title block rather
          than as a timeline. */}
      <Section className="hairline">
        <Container>
          <div className="af-wwb-tb">
            <p className="af-wwb-tb__head">{titleBlock.eyebrow}</p>
            <dl className="af-wwb-tb__rows">
              {titleBlock.rows.map((r) => (
                <div key={r.label} className="af-wwb-tb__row">
                  <dt className="af-wwb-tb__label">{r.label}</dt>
                  <dd className="af-wwb-tb__value">{r.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <p className="af-wwb-tb__note">{titleBlock.note}</p>
        </Container>
      </Section>

      {/* ------------------------------------------------- ACTION */}
      <Section className="hairline">
        <Container>
          <div className="rounded-card border border-blue/30 bg-blue/[0.04] p-8 md:p-12">
            <h2 className="max-w-2xl text-heading font-semibold">
              {wwbCta.title}
            </h2>
            <p className="mt-5 max-w-prose text-lead text-[color:var(--text-secondary)]">
              {wwbCta.body}
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Magnetic>
                <BookCallButton size="large" withArrow>
                  {wwbCta.primary}
                </BookCallButton>
              </Magnetic>
              <Link
                href={wwbCta.secondaryHref}
                className="text-small text-blue-soft underline underline-offset-4 transition-colors hover:text-white"
              >
                {wwbCta.secondaryLabel} &rarr;
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
