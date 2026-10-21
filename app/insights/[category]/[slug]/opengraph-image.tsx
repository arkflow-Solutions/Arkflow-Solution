import { ogCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-card";
import { articles } from "@/lib/insights";
import { categoryBySlug } from "@/lib/insights/categories";

/* Per-article Open Graph card, titled with the article itself.
   Generated for every published article at build time, from the same
   registry the page and the sitemap read, so an article cannot ship
   with somebody else's card. */
export const runtime = "edge";
export const alt = "An ArkFlow article";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return articles.map((a) => ({ category: a.category, slug: a.slug }));
}

export default function Image({
  params,
}: {
  params: { category: string; slug: string };
}) {
  const article = articles.find(
    (a) => a.category === params.category && a.slug === params.slug
  );
  return ogCard({
    title: article?.title ?? "ArkFlow Insights",
    eyebrow: categoryBySlug(params.category)?.name ?? "Insights",
  });
}
