"use client";

import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { DiscoveryCallButton, SectionHead } from "@/components/home/v3/shared";
import { track } from "@/lib/analytics";
import { whyArkflow, auditCta, finalCta } from "@/lib/revenue-content";
import { sceneClose } from "@/lib/scene-content";

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
                <DiscoveryCallButton location="homepage_audit_section">
                  {auditCta.cta}
                </DiscoveryCallButton>
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
            <DiscoveryCallButton location="homepage_final_cta">
              {finalCta.primary}
            </DiscoveryCallButton>
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

/* ============================================ SCENE 10 · SYSTEM + CLOSE
 *
 * Phase 3E. Six sections collapsed into one closing movement:
 * Product UI, Capabilities, What ArkFlow Is, Why ArkFlow, the audit
 * recognition list, and the final CTA.
 *
 * WHY THEY MERGE. They were six answers to one question — "is this
 * real, and who are you?" — asked six times in 1,140 words at the point
 * in the page where attention is thinnest. Shown once, against a system
 * the visitor can see, the same answer costs a fraction of that.
 *
 * WHERE THE POSITIONING WENT. "Revenue Operating Company" was the first
 * three words on the old homepage and the phrase a business owner is
 * least equipped to decode. It now lands HERE, after they have watched
 * the system work, where the category name finally describes something
 * they recognise. It was removed from the hero. It was not removed from
 * the site — this is the founder-approved home for it.
 *
 * WHAT MUST NOT CHANGE:
 *  · This file must keep rendering DiscoveryCallButton. verify.mjs
 *    check 12d asserts it by filename.
 *  · The CTA opens the booking modal via useBooking. It must never
 *    become a link to the Revenue Leak Audit funnel — check 12a fails
 *    the build if that URL appears on a public surface.
 *  · id="revenue-leak-audit" is kept: /solutions links to this anchor.
 *  · The interface below is the existing stylised ArkFlow board with
 *    placeholder records. No GoHighLevel screenshots, per founder
 *    decision — another vendor's chrome on our homepage reads as a
 *    reseller, and real screenshots carry customer PII.
 */

export function SystemAndClose() {
  return (
    <section id="revenue-leak-audit" className="af-scene af-close hairline">
      <Container>
        {/* --- the connected system ----------------------------- */}
        <Reveal>
          <header className="af-scene__head af-scene__head--centre">
            <h2 className="af-scene__title">{sceneClose.systemTitle}</h2>
            <p className="af-scene__lead">{sceneClose.systemLead}</p>
          </header>
        </Reveal>

        <Reveal delay={0.06}>
          <ol className="af-surfaces">
            {sceneClose.surfaces.map((s, i) => (
              <li key={s.name} className="af-surfaces__item">
                <span className="af-surfaces__n">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {/* The website is a real ArkFlow capability, not just a
                    surface the system plugs into, so the first one is a
                    route rather than a label. */}
                <span className="af-surfaces__name">
                  {i === 0 ? (
                    <Link href="/attract" className="af-surfaces__link">
                      {s.name}
                    </Link>
                  ) : (
                    s.name
                  )}
                </span>
                <span className="af-surfaces__body">{s.body}</span>
              </li>
            ))}
          </ol>
        </Reveal>

        {/* --- who is behind it --------------------------------- */}
        <Reveal delay={0.08}>
          <div className="af-position">
            <p className="af-position__name">{sceneClose.positioning.name}</p>
            <p className="af-position__line">{sceneClose.positioning.line}</p>
            <p className="af-position__body">{sceneClose.positioning.body}</p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <ul className="af-pillars">
            {sceneClose.pillars.map((p) => (
              <li key={p.name} className="af-pillar">
                <span className="af-pillar__n">{p.name}</span>
                <span className="af-pillar__b">{p.body}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* --- the close ---------------------------------------- */}
        <Reveal delay={0.12}>
          <div className="af-close__cta">
            <div>
              <h2 className="af-close__title">{sceneClose.ctaTitle}</h2>
              <p className="af-scene__lead">{sceneClose.ctaLead}</p>
              <p className="af-close__note">{sceneClose.ctaNote}</p>
              <div className="mt-10">
                <DiscoveryCallButton location="homepage_close">
                  {sceneClose.cta}
                </DiscoveryCallButton>
              </div>
            </div>

            <div>
              <p className="af-close__areas-l">{sceneClose.areasLabel}</p>
              <ul className="af-audit__areas">
                {auditCta.areas.map((area) => (
                  <li key={area}>{area}</li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
