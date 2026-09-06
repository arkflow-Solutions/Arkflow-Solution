import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { PageHero } from "@/components/pages/page-hero";
import { CtaBand } from "@/components/pages/cta-band";
import { BookCallButton } from "@/components/pages/book-call-button";
import { howWeWork } from "@/lib/home-content";

import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "How ArkFlow works",
  /* Corrected 7 Sep 2026: the step is "Optimisation", not "30-day
     optimisation" — that name was retired with the guarantee it was
     measured against. The audit is no longer the entry point either;
     a discovery call is. */
  description:
    "Discovery, setup, testing, go-live and optimisation. How an ArkFlow system is built, tested and operated — starting with a discovery call.",
  path: "/how-it-works",
});


export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        eyebrow="How it works"
        title="Five steps, and we run the system afterwards."
        lead="Most vendors stop at handover. The build is the beginning of the relationship, not the end of it."
      />

      {/* The Revenue Leak Audit — migrated from the retired /resources */}
      <Section className="hairline !pt-16">
        <Container>
          <Reveal>
            <div className="rounded-card border border-blue/40 bg-surface/60 p-10 md:p-12">
              <Eyebrow>Free · Where it starts</Eyebrow>
              <h2 className="mt-6 max-w-2xl text-heading font-semibold">
                The Revenue Leak Audit
              </h2>
              <p className="mt-6 max-w-prose text-lead text-[color:var(--text-secondary)]">
                Free, and the most useful thirty minutes we offer. We measure
                how fast enquiries to your business actually get answered —
                nights, weekends, mid-appointment — and put a number on what the
                gap is costing you, using your own figures.
              </p>
              <p className="mt-6 max-w-prose text-body text-[color:var(--text-secondary)]">
                It is a diagnosis, not a pitch. If the answer is that your
                response time is already fine, we will tell you that, and you
                will have spent half an hour finding out something worth
                knowing.
              </p>
              <div className="mt-10">
                <BookCallButton size="large" withArrow>
                  Request an audit
                </BookCallButton>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* The five steps */}
      <Section className="hairline">
        <Container>
          <Reveal>
            <Eyebrow>The build</Eyebrow>
            <h2 className="mt-6 max-w-3xl text-heading font-semibold">
              From first conversation to a system that runs.
            </h2>
          </Reveal>

          <ol className="mt-16 space-y-px overflow-hidden rounded-card border border-[color:var(--border-subtle)]">
            {howWeWork.steps.map((s, i) => (
              <Reveal key={s.name} delay={i * 0.05} className="bg-surface/60">
                <li className="grid gap-6 p-8 md:grid-cols-[140px_1fr] md:p-10">
                  <div>
                    <span className="font-mono text-eyebrow uppercase text-[color:var(--text-tertiary)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-2 text-subheading font-medium">
                      {s.name}
                    </h3>
                  </div>
                  <p className="max-w-prose text-body text-[color:var(--text-secondary)]">
                    {s.body}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>

          <Reveal className="mt-10">
            {/*
              CORRECTED 7 September 2026. This footnote cited a 72-hour
              core-system figure and a 10-business-day website delivery
              "on Scale". All three were problems: "Scale" is a
              superseded package name, both figures are published
              delivery commitments that were removed everywhere else, and
              the 72-hour figure referred to a step that no longer
              mentions it — the footnote annotated something that had
              stopped existing.
            */}
            <p className="max-w-prose text-small text-[color:var(--text-tertiary)]">
              Timelines are agreed per engagement and committed to in writing
              in the quotation, rather than quoted here as averages from past
              work. Where a website is part of the engagement, it runs on its
              own track alongside the system build.
            </p>
          </Reveal>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
