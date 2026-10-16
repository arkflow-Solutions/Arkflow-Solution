import { Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { PageHero } from "@/components/pages/page-hero";
import { CtaBand } from "@/components/pages/cta-band";
import { Showcase } from "@/components/case-studies/showcase";
import { BuildFacts } from "@/components/case-studies/build-facts";
import { caseStudies } from "@/lib/content";
import { khaiVisuals } from "@/lib/case-studies";
import { buildMetadata } from "@/lib/seo";

import "./case-studies.css";

/**
 * /case-studies — "Results" in the navigation.
 *
 * THIS PAGE WAS EMPTY UNTIL 17 OCTOBER 2026, AND SAID SO. It carried
 * one line — "we would rather show you an empty page than an invented
 * one" — and a promise about what a case study would contain when
 * there was one. There is now one, so the page shows it.
 *
 * WHAT CHANGED IS THE CONTENT, NOT THE STANDARD. The promise is still
 * on the page, and the first case study is published under it: every
 * figure is a count that a stranger can re-measure from the client's
 * live site, and the performance numbers that an agency would put
 * here are conspicuously absent, with the reason stated. A page that
 * claimed a conversion lift three weeks after launch would be worth
 * less than the empty page it replaced.
 *
 * THE PROOF IS AN OUTBOUND LINK. The most persuasive thing available
 * is not a screenshot but the live site, so the page sends people to
 * it rather than keeping them here.
 */
export const metadata = buildMetadata({
  title: "Results",
  description:
    "Khai Visuals, built and launched by ArkFlow: 35 pages, 1,398 photographs and one third-party script. Every figure can be checked on the live site.",
  path: "/case-studies",
  ogImage: khaiVisuals.shots.desktop.src,
});

export default function CaseStudiesPage() {
  const study = khaiVisuals;

  return (
    <>
      <PageHero
        eyebrow="Results"
        title="The first one is live."
        lead={`${study.client} — ${study.discipline.toLowerCase()} in Singapore — launched on an ArkFlow-built system in ${study.live}. Everything claimed below can be checked on the site itself, which is the only kind of proof worth publishing.`}
      />

      <Showcase study={study} />

      {/* The record. A strap of facts before any prose, so a reader who
          scans and leaves still takes away who, what and when. */}
      <Section className="hairline !pt-16 md:!pt-20">
        <Container>
          <Reveal>
            <dl className="grid grid-cols-2 gap-x-8 gap-y-7 border-b border-[color:var(--border-subtle)] pb-10 md:grid-cols-4">
              {[
                { k: "Client", v: study.client },
                { k: "Sector", v: study.sector },
                { k: "Live since", v: study.live },
                { k: "Scope", v: "Attract and Capture" },
              ].map((row) => (
                <div key={row.k}>
                  <dt className="font-mono text-eyebrow uppercase text-[color:var(--text-tertiary)]">
                    {row.k}
                  </dt>
                  <dd className="mt-2 text-body text-white">{row.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.05}>
            <p className="mt-14 max-w-3xl text-lead text-white">
              {study.standfirst}
            </p>
            <div className="mt-8 max-w-prose space-y-6">
              {study.body.map((para) => (
                <p key={para.slice(0, 32)} className="text-body text-[color:var(--text-secondary)]">
                  {para}
                </p>
              ))}
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Counts, not performance — the heading says so, and every
          numeral carries its method underneath. */}
      <Section className="hairline">
        <Container>
          <Reveal>
            <Eyebrow>What was built</Eyebrow>
            <h2 className="mt-5 max-w-2xl text-heading font-semibold">
              Four numbers, each of which you can go and count.
            </h2>
            <BuildFacts facts={study.facts} />
          </Reveal>
        </Container>
      </Section>

      {/* The scope, grouped by the engine stages it covers. */}
      <Section className="hairline">
        <Container>
          <Reveal>
            <Eyebrow>The work</Eyebrow>
            <h2 className="mt-5 max-w-2xl text-heading font-semibold">
              Two stages of the engine, built as one system.
            </h2>
          </Reveal>

          <div className="af-cs-scope">
            {study.scope.map((group, i) => (
              <Reveal key={group.title} delay={i * 0.06}>
                <h3 className="af-cs-group__title">{group.title}</h3>
                <p className="af-cs-group__summary">{group.summary}</p>
                <ul className="af-cs-group__items">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* THE SECTION AN AGENCY WOULD DELETE. It states what this case
          study does not contain and why, and keeps the three standing
          rules in view next to the first case study published under
          them. */}
      <Section className="hairline">
        <Container className="max-w-3xl">
          <Reveal>
            <Eyebrow>What this does not say yet</Eyebrow>
            <h2 className="mt-5 text-heading font-semibold">
              There are no performance numbers on this page.
            </h2>
            <p className="af-cs-pending text-lead text-[color:var(--text-secondary)]">
              {study.pending}
            </p>

            <p className="mt-12 text-body text-[color:var(--text-tertiary)]">
              The standard every case study here is held to:
            </p>
            <ul className="mt-5 space-y-5">
              {caseStudies.promise.map((p) => (
                <li key={p} className="flex gap-3 text-lead text-[color:var(--text-secondary)]">
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
