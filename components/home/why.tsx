import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";

export function Why() {
  return (
    <Section className="hairline">
      <Container>
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <Eyebrow>Why ArkFlow</Eyebrow>
            <h2 className="mt-4 text-heading font-semibold">
              Not an agency. Not a chatbot. A Revenue Operations partner.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="space-y-6 text-body text-[color:var(--text-secondary)] lg:pt-12">
              <p>
                Agencies bring people to your door — keep yours. ArkFlow makes
                sure nobody who reaches your door walks away because no one
                answered. It&apos;s a different job entirely.
              </p>
              <p>
                And unlike a chatbot you configure and babysit yourself, ArkFlow
                is managed. We build one connected system — enquiry to booking
                to payment — around your services and your tone, then monitor
                and tune it every week. You buy the outcome, not the software.
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
