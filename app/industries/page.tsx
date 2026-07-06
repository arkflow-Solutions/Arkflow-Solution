import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";
import { PageHero } from "@/components/pages/page-hero";
import { CtaBand } from "@/components/pages/cta-band";
import { industryDetails } from "@/lib/content";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "ArkFlow serves Singapore aesthetic clinics first, and service businesses where every enquiry matters — psychology, dental, medical, property and professional services.",
};

export default function IndustriesPage() {
  const primary = industryDetails.find((i) => i.primary)!;
  const secondary = industryDetails.filter((i) => !i.primary);

  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="Depth first. One vertical at a time."
        lead="ArkFlow doesn't serve every business adequately — it serves specific verticals exceptionally, starting where the pain is sharpest and every enquiry is worth the most."
      />

      {/* Primary vertical */}
      <Section className="hairline !pt-16" id="aesthetic">
        <Container>
          <Reveal>
            <Card emphasis className="p-10 md:p-12">
              <p className="font-mono text-eyebrow uppercase text-blue-soft">Primary vertical</p>
              <h2 className="mt-4 text-heading font-semibold">{primary.name}</h2>
              <p className="mt-5 max-w-prose text-lead text-[color:var(--text-secondary)]">
                {primary.fit}
              </p>
              <div className="mt-10 grid gap-8 md:grid-cols-3">
                {primary.pains.map((p, i) => (
                  <div key={p} className="border-t border-[color:var(--border-subtle)] pt-5">
                    <p className="font-mono text-eyebrow uppercase text-[color:var(--text-tertiary)]">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <p className="mt-3 text-body text-[color:var(--text-secondary)]">{p}</p>
                  </div>
                ))}
              </div>
            </Card>
          </Reveal>
        </Container>
      </Section>

      {/* Secondary verticals */}
      <Section className="hairline">
        <Container>
          <Reveal>
            <Eyebrow>Also configured for</Eyebrow>
            <h2 className="mt-4 max-w-2xl text-heading font-semibold">
              Service businesses where every enquiry matters
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {secondary.map((ind, i) => (
              <Reveal key={ind.name} delay={i * 0.05}>
                <Card className="h-full">
                  <h3 className="text-subheading font-medium">{ind.name}</h3>
                  <p className="mt-3 text-body text-[color:var(--text-secondary)]">{ind.fit}</p>
                  <p className="mt-5 font-mono text-eyebrow uppercase text-[color:var(--text-tertiary)]">
                    {ind.pains.join(" · ")}
                  </p>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* How vertical configuration works */}
      <Section className="hairline">
        <Container className="max-w-3xl">
          <Reveal>
            <Eyebrow>How vertical fit works</Eyebrow>
            <h2 className="mt-4 text-heading font-semibold">
              One proven system, configured to your business
            </h2>
            <div className="mt-8 space-y-6 text-body text-[color:var(--text-secondary)]">
              <p>
                ArkFlow isn&apos;t rebuilt from scratch for every client. The
                core system — instant response, pipeline, booking, invoicing —
                is proven once and deployed for each business, then configured
                deeply: your service menu, your prices, your hours, your
                booking policy, your tone.
              </p>
              <p>
                That&apos;s why go-live takes 72 hours instead of weeks, and
                why the system behaves like it was built for your industry —
                because the configuration layer was.
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>

      <CtaBand title="Don't see your industry?" body="If your business lives on enquiries, bookings and invoices, the system likely fits. A discovery call settles it in thirty minutes." />
    </>
  );
}
