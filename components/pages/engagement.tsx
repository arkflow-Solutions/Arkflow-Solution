import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { IllustrativeTag } from "@/components/home/v3/shared";
import {
  engagementIntro,
  engagementParts,
  engagementTimeline,
  sampleAudit,
} from "@/lib/engagement-content";

/**
 * How engagements are structured, and a sample of the audit.
 *
 * WHY THIS EXISTS. /contact told visitors we would "recommend one
 * package" and no package, structure or number appeared anywhere on
 * the site. A buyer cannot tell whether this is a S$500 tool or a
 * S$50,000 programme, so the cautious ones leave rather than ask.
 *
 * WHAT IT DOES NOT DO. It does not publish a price — verify.mjs check
 * 3 forbids that and the founder has supplied no numbers. It publishes
 * the SHAPE: two parts, what each covers, who pays the platform costs,
 * and roughly how the first month goes. That is most of what the
 * question is really asking.
 *
 * The price strings render as visible [PRICE RANGE — …] placeholders.
 * That is deliberate and is listed in the handover.
 */

/** Marks a string that is still a placeholder for the founder to fill. */
function isPlaceholder(s: string) {
  return s.trim().startsWith("[");
}

export function Engagement() {
  return (
    <>
      <Section className="hairline">
        <Container>
          <Reveal>
            <Eyebrow>{engagementIntro.eyebrow}</Eyebrow>
            <h2 className="mt-5 max-w-3xl text-heading font-semibold">
              {engagementIntro.title}
            </h2>
            <p className="mt-6 max-w-prose text-lead text-[color:var(--text-secondary)]">
              {engagementIntro.lead}
            </p>
          </Reveal>

          <div className="mt-14 grid gap-10 md:grid-cols-2 md:gap-14">
            {engagementParts.map((part, i) => (
              <Reveal key={part.title} delay={i * 0.06}>
                <div className="border-t border-[color:var(--border-strong)] pt-6">
                  <p className="font-mono text-eyebrow uppercase text-blue-soft">
                    {part.label}
                  </p>
                  <h3 className="mt-4 text-subheading font-medium text-white">
                    {part.title}
                  </h3>
                  <p className="mt-3">
                    {isPlaceholder(part.price) ? (
                      <span className="rounded-[4px] bg-warning/10 px-1.5 py-0.5 font-mono text-small text-warning">
                        {part.price}
                      </span>
                    ) : (
                      <span className="text-body text-white">{part.price}</span>
                    )}
                  </p>
                  <ul className="mt-6 space-y-3">
                    {part.includes.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 text-body text-[color:var(--text-secondary)]"
                      >
                        <span
                          aria-hidden
                          className="mt-3 h-px w-3 shrink-0 bg-blue-soft"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 max-w-prose text-small text-[color:var(--text-tertiary)]">
                    {part.note}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* The first month, as a timeline rather than four more cards —
          the page already has two card-shaped things above it. */}
      <Section className="hairline">
        <Container>
          <Reveal>
            <h2 className="max-w-2xl text-heading font-semibold">
              {engagementTimeline.title}
            </h2>
            <p className="mt-5 max-w-prose text-body text-[color:var(--text-tertiary)]">
              {engagementTimeline.note}
            </p>
          </Reveal>

          <ol className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {engagementTimeline.weeks.map((w, i) => (
              <Reveal
                key={w.week}
                as="li"
                delay={i * 0.05}
                className="border-t border-[color:var(--border-subtle)] pt-5"
              >
                  <span className="font-mono text-eyebrow uppercase text-[color:var(--text-tertiary)]">
                    {w.week}
                  </span>
                  <h3 className="mt-3 text-body font-medium text-white">
                    {w.title}
                  </h3>
                  <p className="mt-2 text-small leading-relaxed text-[color:var(--text-secondary)]">
                    {w.body}
                  </p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      {/* The sample audit. Every number invented, and the page says so
          twice — once at the top of the table and once underneath. */}
      <Section className="hairline">
        <Container>
          <Reveal>
            <h2 className="max-w-2xl text-heading font-semibold">
              {sampleAudit.title}
            </h2>
            <p className="mt-5 max-w-prose text-lead text-[color:var(--text-secondary)]">
              {sampleAudit.lead}
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="mt-10 overflow-hidden rounded-card border border-[color:var(--border-strong)] bg-surface/60">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[color:var(--border-subtle)] px-6 py-4">
                <p className="font-mono text-eyebrow uppercase text-[color:var(--text-tertiary)]">
                  {sampleAudit.subject}
                </p>
                <IllustrativeTag />
              </div>

              <table className="w-full border-collapse text-left">
                <caption className="sr-only">
                  Illustrative Revenue Leak Audit findings. These figures
                  are examples of the format and do not describe any real
                  client.
                </caption>
                <thead>
                  <tr className="border-b border-[color:var(--border-subtle)]">
                    <th scope="col" className="px-6 py-3 font-mono text-eyebrow uppercase text-[color:var(--text-tertiary)]">
                      Channel
                    </th>
                    <th scope="col" className="px-6 py-3 font-mono text-eyebrow uppercase text-[color:var(--text-tertiary)]">
                      In hours
                    </th>
                    <th scope="col" className="px-6 py-3 font-mono text-eyebrow uppercase text-[color:var(--text-tertiary)]">
                      Out of hours
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sampleAudit.findings.map((f) => (
                    <tr
                      key={f.channel}
                      className="border-b border-[color:var(--border-subtle)] last:border-0 align-top"
                    >
                      <th scope="row" className="px-6 py-5 text-body font-medium text-white">
                        {f.channel}
                        <span className="mt-1 block text-small font-normal text-[color:var(--text-tertiary)]">
                          {f.note}
                        </span>
                      </th>
                      <td className="px-6 py-5 text-body tabular-nums text-[color:var(--text-secondary)]">
                        {f.measured}
                      </td>
                      <td className="px-6 py-5 text-body tabular-nums text-[color:var(--text-secondary)]">
                        {f.after}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h3 className="mt-14 text-subheading font-medium text-white">
              What the document covers
            </h3>
            <ul className="mt-6 grid max-w-3xl gap-3">
              {sampleAudit.sections.map((s) => (
                <li
                  key={s}
                  className="flex gap-3 text-body text-[color:var(--text-secondary)]"
                >
                  <span aria-hidden className="mt-3 h-px w-3 shrink-0 bg-blue-soft" />
                  {s}
                </li>
              ))}
            </ul>
            <p className="mt-8 max-w-prose text-small text-[color:var(--text-tertiary)]">
              {sampleAudit.footnote}
            </p>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
