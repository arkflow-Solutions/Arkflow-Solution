import { SITE_URL, COMPANY } from "@/lib/site";
import type { Article } from "@/lib/insights/types";
import { authors } from "@/lib/insights/categories";

/**
 * Structured data for Insights.
 *
 * Claims only what is true: real author name, real dates, real
 * publisher. No aggregateRating, no review markup, no fabricated
 * organisation properties — rich-result markup asserting things ArkFlow
 * cannot evidence is a manual-action risk, not just a governance one.
 */

function Script({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function ArticleSchema({ article }: { article: Article }) {
  const author = authors[article.authorId];
  const url = `${SITE_URL}/insights/${article.category}/${article.slug}`;

  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: article.title,
        description: article.description,
        datePublished: article.published,
        dateModified: article.updated ?? article.published,
        inLanguage: "en-SG",
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        url,
        author: author
          ? { "@type": "Person", name: author.name, jobTitle: author.role }
          : undefined,
        publisher: {
          "@type": "Organization",
          name: COMPANY.legalName,
          url: SITE_URL,
        },
      }}
    />
  );
}

export function BreadcrumbSchema({
  trail,
}: {
  trail: { name: string; path: string }[];
}) {
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: trail.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.name,
          item: `${SITE_URL}${item.path}`,
        })),
      }}
    />
  );
}

export function FaqSchema({ items }: { items: { q: string; a: string }[] }) {
  if (!items.length) return null;
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      }}
    />
  );
}
