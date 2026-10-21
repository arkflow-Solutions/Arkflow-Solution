"use client";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { track } from "@/lib/analytics";
import {
  CTA_PRIMARY,
  CTA_PRIMARY_HREF,
  CTA_SECONDARY,
  CTA_SECONDARY_HREF,
} from "@/lib/cta";

/**
 * CtaBand — the closing ask on every inner page.
 *
 * CHANGED 21 October 2026. This opened the booking modal and was
 * labelled "Book Discovery Call", while the navigation two hundred
 * pixels above it said "Get free audit" and went somewhere else. A
 * visitor had no way to tell whether those were one offer or two.
 *
 * It now carries the site's two canonical actions, from lib/cta.ts:
 * the audit as primary, "See how it works" as secondary. The booking
 * modal is still mounted and is still how a call gets scheduled — it
 * is simply the step after someone has asked for the audit, not a
 * second front door competing with it.
 */
export function CtaBand({
  title = "Find out what your business is leaking.",
  body = "We map how an enquiry travels from first message to paid appointment, and show you the points where it stops. Useful whether or not you work with us.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <Section className="hairline">
      <Container className="text-center">
        <Reveal>
          <h2 className="mx-auto max-w-3xl text-heading font-semibold">{title}</h2>
          <p className="mx-auto mt-5 max-w-prose text-lead text-[color:var(--text-secondary)]">
            {body}
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Button
              href={CTA_PRIMARY_HREF}
              size="large"
              withArrow
              onClick={() => track("audit_cta_click", { location: "cta_band" })}
            >
              {CTA_PRIMARY}
            </Button>
            <Button
              href={CTA_SECONDARY_HREF}
              variant="secondary"
              size="large"
              onClick={() => track("cta_secondary_click", { location: "cta_band" })}
            >
              {CTA_SECONDARY}
            </Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
