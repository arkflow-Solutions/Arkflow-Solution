import { Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { PageHero } from "@/components/pages/page-hero";
import { CtaBand } from "@/components/pages/cta-band";
import { caseStudies } from "@/lib/content";

import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Case studies",
  description:
    "ArkFlow publishes client results only once they exist and the client has approved them. This page is where the first ones will appear.",
  path: "/case-studies",
});


export default function CaseStudiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Case studies"
        title="Being earned right now."
        lead={caseStudies.statement}
      />

      <Section className="hairline !pt-16">
        <Container className="max-w-3xl">
          <Reveal>
            <Eyebrow>What every case study will contain</Eyebrow>
            <ul className="mt-8 space-y-5">
              {caseStudies.promise.map((p) => (
                <li key={p} className="flex gap-3 text-lead text-[color:var(--text-secondary)]">
                  <Check size={18} className="mt-1.5 shrink-0 text-success" aria-hidden />
                  {p}
                </li>
              ))}
            </ul>
            <p className="mt-10 text-body text-[color:var(--text-secondary)]">
              We&apos;d rather show you an empty page than an invented one.
              The first results will appear here, with their clinics&apos;
              sign-off, as the founding cohort completes.
            </p>
          </Reveal>
        </Container>
      </Section>

      <CtaBand
        title="Be the case study."
        body="Founding clinics receive waived implementation in exchange for the right to publish their results. The guarantee still applies — the risk stays with us."
      />
    </>
  );
}
