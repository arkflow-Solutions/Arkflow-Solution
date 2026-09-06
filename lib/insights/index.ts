import type { Article, Category } from "@/lib/insights/types";
import { article as speedToLead } from "@/lib/insights/articles/why-speed-to-lead-matters";
import { article as clinicFollowUp } from "@/lib/insights/articles/aesthetic-clinic-lead-follow-up";
import { article as voiceAgent } from "@/lib/insights/articles/what-is-an-ai-voice-agent";

/**
 * Article registry.
 *
 * Add an article by importing it and appending it here. Everything else —
 * routing, sitemap, category pages, related content, schema — derives from
 * this array, so there is exactly one place to update.
 */
export const articles: Article[] = [speedToLead, clinicFollowUp, voiceAgent];

export const articleBySlug = (slug: string) =>
  articles.find((a) => a.slug === slug);

export const articlesByCategory = (category: Category) =>
  articles
    .filter((a) => a.category === category)
    .sort((a, b) => b.published.localeCompare(a.published));

export const latestArticles = (n: number) =>
  [...articles].sort((a, b) => b.published.localeCompare(a.published)).slice(0, n);

/**
 * Related articles. Explicit `related` slugs win; the remainder is filled
 * from the same category, then from anywhere. Always returns something —
 * an article that dead-ends is the failure this exists to prevent.
 */
export function relatedArticles(article: Article, n = 3): Article[] {
  const out: Article[] = [];
  const push = (a?: Article) => {
    if (a && a.slug !== article.slug && !out.some((x) => x.slug === a.slug)) {
      out.push(a);
    }
  };

  for (const slug of article.related ?? []) push(articleBySlug(slug));
  for (const a of articlesByCategory(article.category)) push(a);
  for (const a of latestArticles(articles.length)) push(a);

  return out.slice(0, n);
}

/** Counts per category, for the index page. */
export function categoryCounts(): Record<string, number> {
  return articles.reduce<Record<string, number>>((acc, a) => {
    acc[a.category] = (acc[a.category] ?? 0) + 1;
    return acc;
  }, {});
}
