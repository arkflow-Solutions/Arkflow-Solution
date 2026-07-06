import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { PageHero } from "@/components/pages/page-hero";
import { CtaBand } from "@/components/pages/cta-band";
import { about } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "ArkFlow is a Singapore Revenue Operations company. Why we exist, how we think, and why the risk sits with us.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Revenue verbs, not technology verbs."
        lead={about.mission}
      />

      <Section className="hairline !pt-16">
        <Container className="max-w-3xl">
          <Reveal>
            <Eyebrow>What business we&apos;re really in</Eyebrow>
            <p className="mt-6 text-lead text-[color:var(--text-secondary)]">
              {about.positioning}
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section className="hairline">
        <Container className="max-w-3xl">
          <Reveal>
            <Eyebrow>Where this is going</Eyebrow>
            <h2 className="mt-4 text-heading font-semibold">Depth before breadth</h2>
            <p className="mt-6 text-lead text-[color:var(--text-secondary)]">
              {about.vision}
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section className="hairline">
        <Container>
          <Reveal>
            <Eyebrow>How we stay honest</Eyebrow>
            <h2 className="mt-4 max-w-2xl text-heading font-semibold">
              A young company that prices its own risk
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-x-10 gap-y-12 md:grid-cols-3">
            {about.honesty.map((h, i) => (
              <Reveal key={h.title} delay={i * 0.07}>
                <div className="border-t border-[color:var(--border-subtle)] pt-6">
                  <h3 className="text-subheading font-medium">{h.title}</h3>
                  <p className="mt-4 text-body text-[color:var(--text-secondary)]">{h.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="hairline">
        <Container className="max-w-3xl text-center">
          <Reveal>
            <p className="font-mono text-eyebrow uppercase text-[color:var(--text-tertiary)]">
              ArkFlow Solutions Pte Ltd · Singapore
            </p>
            <p className="mx-auto mt-6 max-w-prose text-lead text-[color:var(--text-secondary)]">
              Founded and operated in Singapore, for Singapore service
              businesses — on the channels they actually use, inside the rules
              they actually operate under.
            </p>
          </Reveal>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
