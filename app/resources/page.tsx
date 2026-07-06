import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { PageHero } from "@/components/pages/page-hero";
import { CtaBand } from "@/components/pages/cta-band";
import { resources } from "@/lib/content";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "The Lead Response Audit and field notes from real Singapore service-business deployments — published as they're earned.",
};

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Field notes, not thought leadership."
        lead={resources.fieldNotesIntro}
      />

      {/* Flagship: the Lead Response Audit */}
      <Section className="hairline !pt-16">
        <Container>
          <Reveal>
            <Card emphasis className="p-10 md:p-12">
              <p className="font-mono text-eyebrow uppercase text-blue-soft">Free · Flagship</p>
              <h2 className="mt-4 text-heading font-semibold">{resources.flagship.name}</h2>
              <p className="mt-5 max-w-prose text-lead text-[color:var(--text-secondary)]">
                {resources.flagship.body}
              </p>
              <div className="mt-8">
                <Button href="/contact" size="large" withArrow>
                  {resources.flagship.cta}
                </Button>
              </div>
            </Card>
          </Reveal>
        </Container>
      </Section>

      {/* Field notes — honest early state */}
      <Section className="hairline">
        <Container>
          <Reveal>
            <Eyebrow>Field notes</Eyebrow>
            <h2 className="mt-4 max-w-2xl text-heading font-semibold">
              In progress — published as they&apos;re earned
            </h2>
            <p className="mt-5 max-w-prose text-lead text-[color:var(--text-secondary)]">
              These are being written from live audits and deployments. No
              placeholder posts, no recycled content — each note publishes
              when its numbers are real.
            </p>
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {resources.planned.map((title, i) => (
              <Reveal key={title} delay={i * 0.06}>
                <div className="flex h-full flex-col rounded-card border border-dashed border-[color:var(--border-strong)] p-7">
                  <p className="font-mono text-eyebrow uppercase text-[color:var(--text-tertiary)]">
                    Upcoming
                  </p>
                  <h3 className="mt-3 text-subheading font-medium">{title}</h3>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand title="Want your numbers audited first?" body="The Lead Response Audit is part of every discovery call — free, specific to your business, and yours to keep." />
    </>
  );
}
