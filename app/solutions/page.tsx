import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { PageHero } from "@/components/pages/page-hero";
import { CtaBand } from "@/components/pages/cta-band";
import { solutions } from "@/lib/content";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "The systems inside ArkFlow — instant response, BookingBot, InvoiceFlow, website, AI voice agent and reactivation — and the packages that carry them.",
};

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title="One connected system, layer by layer."
        lead="These are the systems inside every ArkFlow deployment. They're never sold as software — each is a layer of one connected outcome: enquiry to booking to payment, without leaks. Packages decide which layers are on."
      />

      <Section className="hairline !pt-16">
        <Container>
          <div className="grid gap-x-10 gap-y-14 md:grid-cols-2">
            {solutions.map((sys, i) => (
              <Reveal key={sys.name} delay={Math.min(i * 0.05, 0.2)}>
                <div className="border-t border-[color:var(--border-subtle)] pt-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h2 className="text-subheading font-medium">{sys.name}</h2>
                    <p className="font-mono text-eyebrow uppercase text-blue-soft">{sys.tier}</p>
                  </div>
                  <p className="mt-4 text-body text-[color:var(--text-secondary)]">{sys.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.25}>
            <p className="mt-16 text-body text-[color:var(--text-secondary)]">
              Which layers your business needs is a packages question —{" "}
              <Link href="/packages" className="text-blue-soft underline-offset-4 hover:underline">
                see how Respond, Operate and Scale carry them
              </Link>
              .
            </p>
          </Reveal>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
