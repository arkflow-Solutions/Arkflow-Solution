import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/pages/page-hero";
import { ArticleCard } from "@/components/insights/article-cta";
import { CtaBand } from "@/components/pages/cta-band";
import { buildMetadata } from "@/lib/seo";
import { articlesByCategory } from "@/lib/insights";
import { categories, categoryBySlug } from "@/lib/insights/categories";
import { BreadcrumbSchema } from "@/components/insights/schema";

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { category: string };
}) {
  const category = categoryBySlug(params.category);
  if (!category) return {};
  return buildMetadata({
    title: category.title,
    description: category.description,
    path: `/insights/${category.slug}`,
  });
}

/** Pillar page for one topic cluster. */
export default function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const category = categoryBySlug(params.category);
  if (!category) notFound();

  const posts = articlesByCategory(category.slug);

  return (
    <>
      <BreadcrumbSchema
        trail={[
          { name: "Insights", path: "/insights" },
          { name: category.name, path: `/insights/${category.slug}` },
        ]}
      />
      <PageHero
        eyebrow="ArkFlow Intelligence"
        title={category.title}
        lead={category.standfirst}
      />

      <Section className="hairline">
        <Container>
          {posts.length ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          ) : (
            <p className="max-w-prose text-body text-[color:var(--text-secondary)]">
              Nothing published in this topic yet. We add writing here as it is
              researched rather than filling the section for the sake of it.
            </p>
          )}
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
