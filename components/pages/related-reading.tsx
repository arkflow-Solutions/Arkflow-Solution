import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { articleBySlug } from "@/lib/insights";

/**
 * RelatedReading — the service page's link back into the writing.
 *
 * WHY. Every article already links forward to the service page it
 * belongs to (ArticleSolutionLink) and sideways to its siblings
 * (RelatedArticles), but nothing linked back the other way. That made
 * /insights a cul-de-sac from the product pages: all the internal link
 * equity flowed one direction, and a visitor on /aesthetic-clinics who
 * wanted evidence that we understand the problem had nowhere to go.
 *
 * Two or three links, chosen by hand per page rather than generated —
 * "related" is a judgement about what this reader wants next, and an
 * algorithm picking by category gets it wrong often enough to be worth
 * the hand-editing.
 *
 * ANCHOR TEXT IS THE ARTICLE TITLE, not "read more". A descriptive
 * anchor is the whole point of the exercise.
 *
 * A slug that no longer exists renders nothing rather than a dead
 * link, so deleting an article cannot break a service page.
 */
export function RelatedReading({
  slugs,
  title = "Worth reading first",
  lead,
}: {
  slugs: string[];
  title?: string;
  lead?: string;
}) {
  const items = slugs
    .map((s) => articleBySlug(s))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));

  if (!items.length) return null;

  return (
    <Section className="hairline">
      <Container>
        <Reveal>
          <Eyebrow>From ArkFlow Insights</Eyebrow>
          <h2 className="mt-5 max-w-2xl text-heading font-semibold">{title}</h2>
          {lead && (
            <p className="mt-5 max-w-prose text-lead text-[color:var(--text-secondary)]">
              {lead}
            </p>
          )}
        </Reveal>

        <ul className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-3">
          {items.map((a, i) => (
            <Reveal
              key={a.slug}
              as="li"
              delay={i * 0.05}
              className="border-t border-[color:var(--border-subtle)] pt-5"
            >
                <Link
                  href={`/insights/${a.category}/${a.slug}`}
                  className="group block"
                >
                  <span className="block text-body font-medium text-white transition-colors group-hover:text-blue-soft">
                    {a.title}
                  </span>
                  <span className="mt-2 block text-small text-[color:var(--text-secondary)]">
                    {a.description}
                  </span>
                </Link>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
