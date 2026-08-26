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
  description:
    "Discovery, setup, testing, go-live and 30-day optimisation. How an ArkFlow system is built, tested and operated — starting with a free Lead Response Audit.",
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

      {/* The Lead Response Audit — migrated from the retired /resources */}
      <Section className="hairline !pt-16">
        <Container>
          <Reveal>
            <div className="rounded-card border border-blue/40 bg-surface/60 p-10 md:p-12">
              <Eyebrow>Free · Where it starts</Eyebrow>
              <h2 className="mt-6 max-w-2xl text-heading font-semibold">
                The Lead Response Audit
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
            <p className="max-w-prose text-small text-[color:var(--text-tertiary)]">
              Timings are service commitments measured from a completed intake,
              not averages from past work. The 72-hour figure covers the core
              system; on Scale, the professional website is delivered within 10
              business days on a parallel track.
            </p>
          </Reveal>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
