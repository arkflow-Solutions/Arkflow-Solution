import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { Showcase } from "@/components/case-studies/showcase";
import { BuildFacts } from "@/components/case-studies/build-facts";
import type { CaseStudy } from "@/lib/case-studies";

/**
 * One case study on the Results page.
 *
 * EXTRACTED 27 October 2026, when the second and third studies were
 * published. The page had this markup inline for a single hardcoded
 * study; three copies of it would have been three places to forget to
 * change something.
 *
 * EACH ENTRY IS NUMBERED AND RULED OFF so a reader scrolling past
 * three of them can tell where one ends and the next begins. That is
 * the only structural difference from the single-study version — the
 * showcase, the record strap, the prose, the counts and the scope are
 * unchanged.
 *
 * The "no performance numbers" note is NOT repeated here. It is
 * stated once at the bottom of the page, because saying it three
 * times reads as protesting rather than as a standard.
 */
export function CaseStudyEntry({
  study,
  index,
  priority = false,
}: {
  study: CaseStudy;
  /** Zero-based. Rendered as 01, 02, 03. */
  index: number;
  /** True for the first entry only — the one above the fold. */
  priority?: boolean;
}) {
  const n = String(index + 1).padStart(2, "0");

  return (
    <article className="af-cs-entry" aria-labelledby={`cs-${study.slug}`}>
      {/* The marker. A rule, an ordinal and the client's name, so the
          boundary between studies is unmissable at a glance. */}
      <Section className="hairline !pb-0 !pt-20 md:!pt-24">
        <Container>
          <Reveal>
            <div className="af-cs-marker">
              <span className="af-cs-marker__n">{n}</span>
              <h2 id={`cs-${study.slug}`} className="af-cs-marker__name">
                {study.client}
              </h2>
              <span className="af-cs-marker__meta">
                {study.sector} · Live {study.live}
              </span>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Showcase study={study} priority={priority} />

      <Section className="!pt-4 md:!pt-6">
        <Container>
          <Reveal>
            <dl className="grid grid-cols-2 gap-x-8 gap-y-7 border-b border-[color:var(--border-subtle)] pb-10 md:grid-cols-4">
              {[
                { k: "Client", v: study.client },
                { k: "Sector", v: study.sector },
                { k: "Live since", v: study.live },
                { k: "What we did", v: study.discipline },
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
                <p
                  key={para.slice(0, 32)}
                  className="text-body text-[color:var(--text-secondary)]"
                >
                  {para}
                </p>
              ))}
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section className="!pt-0">
        <Container>
          <Reveal>
            <Eyebrow>What was built</Eyebrow>
            <h3 className="mt-5 max-w-2xl text-subheading font-medium text-white">
              Four numbers, each of which you can go and count.
            </h3>
            <BuildFacts facts={study.facts} />
          </Reveal>
        </Container>
      </Section>

      <Section className="!pt-0">
        <Container>
          <Reveal>
            <Eyebrow>The work</Eyebrow>
          </Reveal>
          <div className="af-cs-scope">
            {study.scope.map((group, i) => (
              <Reveal key={group.title} delay={i * 0.06}>
                <h4 className="af-cs-group__title">{group.title}</h4>
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
    </article>
  );
}
