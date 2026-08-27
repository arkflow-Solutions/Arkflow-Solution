import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { buildMetadata } from "@/lib/seo";
import { articles, articleBySlug, relatedArticles } from "@/lib/insights";
import { categoryBySlug } from "@/lib/insights/categories";
import { readingMinutes } from "@/lib/insights/types";
import {
  ArticleBody,
  ArticleToc,
  ArticleMeta,
} from "@/components/insights/article-body";
import {
  ArticleCta,
  ArticleSolutionLink,
  RelatedArticles,
} from "@/components/insights/article-cta";
import {
  ArticleSchema,
  BreadcrumbSchema,
  FaqSchema,
} from "@/components/insights/schema";
import {
  SocialFollow,
  ArticleTracking,
} from "@/components/insights/social-follow";

export function generateStaticParams() {
  return articles.map((a) => ({ category: a.category, slug: a.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { category: string; slug: string };
}) {
  const article = articleBySlug(params.slug);
  if (!article) return {};
  return buildMetadata({
    title: article.title,
    description: article.description,
    path: `/insights/${article.category}/${article.slug}`,
  });
}

export default function ArticlePage({
  params,
}: {
  params: { category: string; slug: string };
}) {
  const article = articleBySlug(params.slug);
  if (!article || article.category !== params.category) notFound();

  const category = categoryBySlug(article.category);
  const related = relatedArticles(article);

  return (
    <>
      <ArticleTracking
        slug={article.slug}
        category={article.category}
        level={article.level}
      />
      <ArticleSchema article={article} />
      <BreadcrumbSchema
        trail={[
          { name: "Insights", path: "/insights" },
          {
            name: category?.name ?? article.category,
            path: `/insights/${article.category}`,
          },
          {
            name: article.title,
            path: `/insights/${article.category}/${article.slug}`,
          },
        ]}
      />
      {article.faq && <FaqSchema items={article.faq} />}

      <article className="pb-16 pt-36 md:pt-44">
        <Container>
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-small text-[color:var(--text-tertiary)]">
              <li>
                <Link href="/insights" className="transition-colors hover:text-white">
                  Insights
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link
                  href={`/insights/${article.category}`}
                  className="transition-colors hover:text-white"
                >
                  {category?.name}
                </Link>
              </li>
            </ol>
          </nav>

          <div className="mx-auto max-w-[68ch]">
            <h1 className="text-display font-semibold leading-tight">
              {article.title}
            </h1>
            <p className="mt-6 text-lead text-[color:var(--text-secondary)]">
              {article.standfirst}
            </p>
            <div className="mt-8">
              <ArticleMeta article={article} />
              <p className="mt-2 font-mono text-eyebrow uppercase tracking-wider text-[color:var(--text-tertiary)]">
                {readingMinutes(article.blocks)} min read
              </p>
            </div>
            <ArticleToc article={article} />
          </div>

          <ArticleBody article={article} />

          {article.faq && (
            <div className="mx-auto mt-20 max-w-[68ch]">
              <h2 className="text-heading font-medium text-white">
                Common questions
              </h2>
              <dl className="mt-8 space-y-8">
                {article.faq.map((item) => (
                  <div key={item.q}>
                    <dt className="text-body font-medium text-white">{item.q}</dt>
                    <dd className="mt-2 text-body text-[color:var(--text-secondary)]">
                      {item.a}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          <div className="mx-auto max-w-[68ch]">
            <ArticleSolutionLink article={article} />
            <ArticleCta article={article} />
            <SocialFollow />
          </div>
        </Container>
      </article>

      <Section className="hairline">
        <Container>
          <RelatedArticles articles={related} />
        </Container>
      </Section>
    </>
  );
}
