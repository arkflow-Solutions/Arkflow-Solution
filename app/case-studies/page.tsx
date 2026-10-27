import { Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { PageHero } from "@/components/pages/page-hero";
import { CtaBand } from "@/components/pages/cta-band";
import { CaseStudyEntry } from "@/components/case-studies/entry";
import { caseStudies } from "@/lib/content";
import { publishedCaseStudies } from "@/lib/case-studies";
import { buildMetadata } from "@/lib/seo";

import "./case-studies.css";

/**
 * /case-studies — "Results" in the navigation.
 *
 * THIS PAGE WAS EMPTY UNTIL 17 OCTOBER 2026, AND SAID SO. It carried
 * one line — "we would rather show you an empty page than an invented
 * one" — and a promise about what a case study would contain when
 * there was one. There is now more than one, so the page shows them.
 *
 * REBUILT AS A LIST, 27 October 2026. It rendered a single hardcoded
 * study. Brewprint Coffee and Fort Achievers & Co. went live in the
 * same month, so the page now maps over lib/case-studies.ts and
 * publishing a fourth is a data edit with no change here.
 *
 * WHAT CHANGED IS THE CONTENT, NOT THE STANDARD. The promise is still
 * on the page, and every case study is published under it: every
 * figure is a count a stranger can re-measure from the client's live
 * site, and the performance numbers an agency would put here are
 * conspicuously absent, with the reason stated once at the end rather
 * than three times over.
 *
 * THE PROOF IS AN OUTBOUND LINK. The most persuasive thing available
 * is not a screenshot but the live site, so each entry sends people to
 * it rather than keeping them here.
 */
export const metadata = buildMetadata({
  title: "Results: Live Client Sites We Built",
  description:
    "Three Singapore businesses, built and launched by ArkFlow: a behaviour support practice, a specialty cafe and a wedding photographer. Every figure is checkable.",
  path: "/case-studies",
  ogImage: publishedCaseStudies[0].shots.desktop.src,
});

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Results"
        title="Three live, and you can go and check them."
        lead="Three Singapore businesses we built and still run. Every number below can be checked on their own sites in about a minute, which is why there are no percentages on this page."
      />

      {/* One entry per study. The first carries the priority image,
          because it is the one above the fold. */}
      {publishedCaseStudies.map((study, i) => (
        <CaseStudyEntry
          key={study.slug}
          study={study}
          index={i}
          priority={i === 0}
        />
      ))}

      {/* THE SECTION AN AGENCY WOULD DELETE. Stated once, after all
          three, rather than repeated under each one. */}
      <Section className="hairline">
        <Container className="max-w-3xl">
          <Reveal>
            <Eyebrow>What this does not say yet</Eyebrow>
            <h2 className="mt-5 text-heading font-semibold">
              There are no performance numbers on this page.
            </h2>
            <p className="af-cs-pending text-lead text-[color:var(--text-secondary)]">
              All three went live in October 2026. Enquiry, booking and
              order figures will be published here when there are enough
              months of them to mean something, measured from each
              client&apos;s own records and only with their sign-off. We
              are not going to estimate them in the meantime, and where a
              client&apos;s own site shows a rating they earned before we
              built it, that is theirs and not a result of this work.
            </p>

            <p className="mt-12 text-body text-[color:var(--text-tertiary)]">
              The standard every case study here is held to:
            </p>
            <ul className="mt-5 space-y-5">
              {caseStudies.promise.map((p) => (
                <li
                  key={p}
                  className="flex gap-3 text-lead text-[color:var(--text-secondary)]"
                >
                  <Check size={18} className="mt-1.5 shrink-0 text-success" aria-hidden />
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </Section>

      <CtaBand
        title="Be the next one."
        body="We are working with founding clients now. Their results will be published here with their sign-off, measured from their own data, or not at all."
      />
    </>
  );
}
