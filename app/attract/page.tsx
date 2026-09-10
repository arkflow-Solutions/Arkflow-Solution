import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/pages/page-hero";
import { WhatsAppCta } from "@/components/attract/whatsapp-cta";
import { BookCallButton } from "@/components/pages/book-call-button";
import { AttractHandoff } from "@/components/throughline/attract-handoff";
import { Magnetic } from "@/components/motion/magnetic";
import {
  CatalogueToJourney,
  Environments,
  PainPaths,
  Capability,
} from "@/components/attract/website-scenes";
import { buildMetadata } from "@/lib/seo";
import {
  attractHero,
  catalogue,
  environments,
  painPaths,
  capability,
  continuity,
  attractCta,
} from "@/lib/attract-content";

import "./attract.css";

/**
 * /attract — the Website page. Stage one of the Revenue Engine.
 *
 * THE PAGE IS THE ARGUMENT. It claims a website guides a decision rather
 * than storing information, so it cannot be a stack of headings and card
 * grids explaining that claim — which is what it was. Seven environments,
 * each answering one question and handing to the next:
 *
 *   01 the premise
 *   02 the catalogue         — a flat site losing a visitor
 *   03 the re-staging        — a transition inside 02, not a new section
 *   04 the environments      — the IKEA translation, one question each
 *   05 one pain, followed    — the visitor chooses; the page responds
 *   06 what we build + where we stop
 *   07 website → enquiry → response → qualification → booking → conversion
 *
 * Governance for every claim lives at the head of lib/attract-content.ts
 * and is enforced by scripts/verify.mjs across all source files.
 *
 * SCOPE. Styles are route-scoped in ./attract.css so app/globals.css —
 * where the locked homepage scenes live — is not touched at all.
 */
export const metadata = buildMetadata({
  title: "Websites — the front door of your revenue system",
  description:
    "A website isn't where you put information. It's where you guide a decision. ArkFlow designs and builds the website experience for Singapore service businesses, as stage one of the revenue system behind it.",
  path: "/attract",
});

export default function AttractPage() {
  return (
    <>
      {/* ------------------------------------------- 01 · THE PREMISE */}
      <PageHero
        eyebrow={attractHero.eyebrow}
        title={`${attractHero.title} ${attractHero.titleAccent}`}
        lead={attractHero.lead}
      />

      <Container>
        <div className="flex flex-wrap gap-4 pb-4">
          <Magnetic>
            <BookCallButton size="large" withArrow>
              {attractHero.primaryCta}
            </BookCallButton>
          </Magnetic>
          <WhatsAppCta
            label={attractHero.secondaryCta}
            prefill={attractCta.whatsappPrefill}
            location="attract_hero"
            variant="secondary"
            size="large"
          />
        </div>
      </Container>

      {/* --------------------------- 02 · THE CATALOGUE + 03 · RE-STAGING
          One block on purpose. The visitor should not see a boundary
          between the failing site and the working one — they should see
          the same site change. */}
      <Section className="hairline">
        <Container>
          <p className="font-mono text-eyebrow uppercase tracking-wider text-blue-soft">
            {catalogue.eyebrow}
          </p>
          <h2 className="mt-5 max-w-2xl text-heading font-semibold">
            {catalogue.title}
          </h2>
          <p className="mt-6 max-w-prose text-lead text-[color:var(--text-secondary)]">
            {catalogue.body}
          </p>

          <div className="mt-14">
            <CatalogueToJourney />
          </div>
        </Container>
      </Section>

      {/* -------------------------------------- 04 · THE ENVIRONMENTS */}
      <Section className="hairline">
        <Container>
          <p className="font-mono text-eyebrow uppercase tracking-wider text-blue-soft">
            {environments.eyebrow}
          </p>
          <p className="mt-5 max-w-2xl text-subheading font-medium leading-snug">
            {environments.intro}
          </p>

          <div className="mt-12">
            <Environments />
          </div>
        </Container>
      </Section>

      {/* ------------------------------------ 05 · ONE PAIN, FOLLOWED */}
      <Section className="hairline">
        <Container>
          <p className="font-mono text-eyebrow uppercase tracking-wider text-blue-soft">
            {painPaths.eyebrow}
          </p>

          <div className="mt-8">
            <PainPaths />
          </div>
        </Container>
      </Section>

      {/* ------------------- 06 · WHAT WE BUILD, AND WHERE WE STOP */}
      <Section className="hairline">
        <Container>
          <p className="font-mono text-eyebrow uppercase tracking-wider text-blue-soft">
            {capability.eyebrow}
          </p>
          <h2 className="mt-5 max-w-2xl text-heading font-semibold">
            {capability.title}
          </h2>

          <Capability />
        </Container>
      </Section>

      {/* ---------------------------------------- 07 · THE CONTINUITY
          The website joining the system it opens onto. `through={5}`
          carries the light to Conversion — the stages an enquiry from
          this page actually travels. */}
      <Section className="hairline">
        <Container>
          <p className="font-mono text-eyebrow uppercase tracking-wider text-blue-soft">
            {continuity.eyebrow}
          </p>
          <h2 className="mt-5 max-w-2xl text-heading font-semibold">
            {continuity.title}
          </h2>

          <AttractHandoff note={continuity.journeyNote} through={5} />
        </Container>
      </Section>

      {/* --------------------------------------------------- ACTION */}
      <Section className="hairline">
        <Container>
          <div className="rounded-card border border-blue/30 bg-blue/[0.04] p-8 md:p-12">
            <h2 className="max-w-2xl text-heading font-semibold">
              {attractCta.title}
            </h2>
            <p className="mt-5 max-w-prose text-lead text-[color:var(--text-secondary)]">
              {attractCta.body}
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Magnetic>
                <BookCallButton size="large" withArrow>
                  {attractCta.primary}
                </BookCallButton>
              </Magnetic>
              <WhatsAppCta
                label={attractCta.secondary}
                prefill={attractCta.whatsappPrefill}
                location="attract_final_cta"
                variant="secondary"
                size="large"
              />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
