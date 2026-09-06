import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/pages/page-hero";
import { ArticleCard } from "@/components/insights/article-cta";
import { buildMetadata } from "@/lib/seo";
import { articles, categoryCounts, latestArticles } from "@/lib/insights";
import { categories } from "@/lib/insights/categories";

export const metadata = buildMetadata({
  title: "ArkFlow Intelligence",
  description:
    "Practical writing on Revenue Operations for Singapore service businesses — lead response, WhatsApp, CRM, AI voice agents and aesthetic clinic operations.",
  path: "/insights",
});

export default function InsightsPage() {
  const counts = categoryCounts();
  const featured = latestArticles(3);

  return (
    <>
      <PageHero
        eyebrow="ArkFlow Intelligence"
        title="How service businesses actually make and lose money."
        lead="Practical writing on the operational gaps between an enquiry arriving and a customer coming back. No AI hype, no filler."
      />

      <Section className="hairline">
        <Container>
          <h2 className="text-heading font-medium text-white">Latest</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {featured.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </Container>
      </Section>

      <Section className="hairline">
        <Container>
          <h2 className="text-heading font-medium text-white">Topics</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`/insights/${c.slug}`}
                className="group rounded-card border border-[color:var(--border-subtle)] bg-surface/50 p-7 transition-colors hover:border-blue/40"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-subheading font-medium text-white">
                    {c.name}
                  </h3>
                  <span className="font-mono text-eyebrow text-[color:var(--text-tertiary)]">
                    {counts[c.slug] ?? 0}
                  </span>
                </div>
                <p className="mt-3 text-small leading-relaxed text-[color:var(--text-secondary)]">
                  {c.description}
                </p>
              </Link>
            ))}
          </div>
          <p className="mt-10 text-small text-[color:var(--text-tertiary)]">
            {articles.length} article{articles.length === 1 ? "" : "s"} published.
            New writing is added as it is researched — we would rather publish
            ten useful pieces than a hundred thin ones.
          </p>
        </Container>
      </Section>
    </>
  );
}
