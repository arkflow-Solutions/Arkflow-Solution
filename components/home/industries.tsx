import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";
import { industries } from "@/lib/content";

export function Industries() {
  return (
    <Section className="hairline">
      <Container>
        <Reveal>
          <Eyebrow>Industries</Eyebrow>
          <h2 className="mt-4 max-w-2xl text-heading font-semibold">
            Built for practices where every enquiry matters
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <Card emphasis className="h-full">
              <p className="font-mono text-eyebrow uppercase text-blue-soft">
                Primary
              </p>
              <h3 className="mt-3 text-subheading font-medium">
                {industries.primary.name}
              </h3>
              <p className="mt-4 text-body text-[color:var(--text-secondary)]">
                {industries.primary.body}
              </p>
            </Card>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 lg:content-start">
            {industries.secondary.map((ind, i) => (
              <Reveal key={ind.name} delay={i * 0.05}>
                <div className="rounded-card border border-[color:var(--border-subtle)] px-6 py-5 transition-colors duration-300 hover:border-[color:var(--border-strong)]">
                  <h3 className="text-body font-medium">{ind.name}</h3>
                  <p className="mt-1 text-small text-[color:var(--text-tertiary)]">
                    {ind.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
