import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { PageHero } from "@/components/pages/page-hero";
import { CtaBand } from "@/components/pages/cta-band";
import { solutionSections } from "@/lib/solutions-content";

import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Solutions",
  description:
    "The layers inside an ArkFlow system — unified inbox, AI assistants, booking and payments, automation, CRM and reporting — and which package carries each one.",
  path: "/solutions",
});


/**
 * One page, six anchored sections (approved sitemap). Deliberately not
 * six thin pages: with no case studies behind them yet, six shallow
 * pages would be weaker for a reader and for search.
 */
export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title="One connected system, layer by layer."
        lead="None of these is sold as software. Each is a layer of one outcome — enquiry to booking to payment to the visit after that. Which layers are switched on is a packages question."
      />

      {/* Anchor nav */}
      <Container>
        <nav
          aria-label="Sections"
          className="flex flex-wrap gap-x-6 gap-y-3 border-y border-[color:var(--border-subtle)] py-5"
        >
          {solutionSections.map((s) => (
            <Link
              key={s.id}
              href={`#${s.id}`}
              className="font-mono text-eyebrow uppercase text-[color:var(--text-tertiary)] transition-colors hover:text-blue-soft"
            >
              {s.nav}
            </Link>
          ))}
        </nav>
      </Container>

      {solutionSections.map((s) => (
        <Section key={s.id} id={s.id} className="hairline scroll-mt-24">
          <Container>
            <Reveal>
              <Eyebrow>{s.eyebrow}</Eyebrow>
              <h2 className="mt-6 max-w-3xl text-heading font-semibold">
                {s.title}
              </h2>
              <p className="mt-6 max-w-prose text-lead text-[color:var(--text-secondary)]">
                {s.lead}
              </p>
            </Reveal>

            <div className="mt-14 space-y-px overflow-hidden rounded-card border border-[color:var(--border-subtle)]">
              {s.items.map((item, i) => (
                <Reveal key={item.name} delay={i * 0.04} className="bg-surface/60">
                  <div className="grid gap-4 p-7 md:grid-cols-[260px_1fr] md:p-8">
                    <div>
                      <h3 className="text-body font-medium text-white">
                        {item.name}
                      </h3>
                      <p className="mt-2 font-mono text-eyebrow uppercase text-blue-soft">
                        {item.tier}
                      </p>
                    </div>
                    <p className="max-w-prose text-body text-[color:var(--text-secondary)]">
                      {item.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            {s.note && (
              <Reveal className="mt-8">
                <p className="max-w-prose text-small text-[color:var(--text-tertiary)]">
                  {s.note}
                </p>
              </Reveal>
            )}
          </Container>
        </Section>
      ))}

      <Section className="hairline !py-16">
        <Container>
          <Reveal>
            <p className="max-w-prose text-body text-[color:var(--text-secondary)]">
              Which layers your business needs is a packages question —{" "}
              <Link
                href="/packages"
                className="text-blue-soft underline-offset-4 hover:underline"
              >
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
