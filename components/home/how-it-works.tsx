import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { howItWorks } from "@/lib/content";

export function HowItWorks() {
  return (
    <Section className="hairline">
      <Container>
        <Reveal>
          <Eyebrow>How it works</Eyebrow>
          <h2 className="mt-4 max-w-2xl text-heading font-semibold">
            From first call to live system in 72 hours
          </h2>
        </Reveal>

        <ol className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-5 lg:gap-6">
          {howItWorks.map((item, i) => (
            <Reveal key={item.step} delay={i * 0.07}>
              <li className="border-t border-[color:var(--border-subtle)] pt-5">
                <p className="font-mono text-eyebrow uppercase text-[color:var(--text-tertiary)]">
                  Step {i + 1}
                </p>
                <h3 className="mt-3 text-body font-medium">{item.step}</h3>
                <p className="mt-3 text-small text-[color:var(--text-secondary)]">
                  {item.body}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
