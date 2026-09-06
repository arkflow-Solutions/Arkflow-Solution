"use client";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { AuditButton, SectionHead } from "@/components/home/v3/shared";
import { track } from "@/lib/analytics";
import { whyArkflow, auditCta, finalCta } from "@/lib/revenue-content";

/* ==================================================== 16 · WHY ARKFLOW
 *
 * No badges, no counters, no logos, no statistics. Trust is built here
 * by saying precisely what ArkFlow does and does not do, including the
 * limits. "Honest about scope" is on the list because it is the claim
 * a visitor can actually verify from the rest of the page.
 */

export function WhyArkflow() {
  return (
    <Section className="hairline" id="why-arkflow">
      <Container>
        <SectionHead
          eyebrow={whyArkflow.eyebrow}
          title={whyArkflow.title}
          lead={whyArkflow.lead}
        />

        <div className="mt-16 border-t border-[color:var(--border-subtle)]">
          {whyArkflow.rows.map((row, i) => (
            <Reveal key={row.title} delay={Math.min(i, 4) * 0.05}>
              <div className="af-why-row">
                <h3 className="text-body font-semibold text-white">{row.title}</h3>
                <p className="max-w-prose text-small leading-relaxed text-[color:var(--text-secondary)]">
                  {row.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* ============================================= 17 · REVENUE LEAK AUDIT
 *
 * The canonical conversion mechanism. It is a SEPARATE funnel: this
 * section creates the desire and hands off. The audit is never
 * recreated inline on the main website (founder ruling, 6 Sep 2026),
 * so there is no form here and there must not be one.
 */

export function AuditSection() {
  return (
    <Section className="hairline" id="revenue-leak-audit">
      <Container>
        <Reveal>
          <div className="af-audit">
            <div>
              <Eyebrow>{auditCta.eyebrow}</Eyebrow>
              <h2 className="mt-6 text-heading font-semibold">{auditCta.title}</h2>
              <p className="mt-6 max-w-prose text-lead text-[color:var(--text-secondary)]">
                {auditCta.lead}
              </p>
              <p className="mt-6 max-w-prose text-small text-[color:var(--text-tertiary)]">
                {auditCta.note}
              </p>
              <div className="mt-10">
                <AuditButton location="homepage_audit_section">
                  {auditCta.cta}
                </AuditButton>
              </div>
            </div>

            <div>
              <p className="font-mono text-eyebrow uppercase text-[color:var(--text-tertiary)]">
                {auditCta.areasLabel}
              </p>
              <ul className="af-audit__areas">
                {auditCta.areas.map((area) => (
                  <li key={area}>{area}</li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

/* ====================================================== 18 · FINAL CTA */

export function FinalCta() {
  return (
    <section className="af-final hairline">
      <Container className="relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="text-heading font-semibold">{finalCta.title}</h2>
          <p className="mx-auto mt-8 max-w-prose text-lead text-[color:var(--text-secondary)]">
            {finalCta.lead}
          </p>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <AuditButton location="homepage_final_cta">
              {finalCta.primary}
            </AuditButton>
            <Button
              href="#revenue-engine"
              variant="secondary"
              size="large"
              onClick={() =>
                track("cta_secondary_click", { location: "homepage_final_cta" })
              }
            >
              {finalCta.secondary}
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
