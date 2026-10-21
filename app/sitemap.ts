import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { articles } from "@/lib/insights";
import { categories } from "@/lib/insights/categories";
import { lastModified } from "@/lib/last-modified";

/**
 * Approved sitemap. /industries, /resources and /styleguide are retired.
 * /aesthetic-clinics is the only dedicated vertical page at Stage 1.
 *
 * Insights routes are derived from the article registry, so publishing an
 * article adds it to the sitemap automatically — there is no second list
 * to keep in sync and therefore no way for an article to be unreachable.
 *
 * REWRITTEN 21 October 2026.
 *
 *  - `priority` and `changeFrequency` are GONE. Google has said
 *    publicly, more than once, that it ignores both. Ours encoded a
 *    guess ("the homepage is a 1, legal pages are a 0.7") that no
 *    crawler ever read, and maintaining a number nobody consumes is
 *    how a sitemap drifts out of agreement with the site.
 *
 *  - `lastModified` is now the real date each route last changed,
 *    resolved from git (see lib/last-modified.ts). Every URL used to
 *    carry the build timestamp, which told Google that all eighteen
 *    pages changed every time one did. That is the fastest way to
 *    teach a crawler to stop believing the file.
 */

/** Files whose change counts as a change to each route. */
const ROUTES: Array<{ path: string; files: string[] }> = [
  { path: "", files: ["app/page.tsx", "lib/home-content.ts", "lib/scene-content.ts", "lib/hero-sequence.ts"] },
  /* /audit is deliberately absent: since 14 October it 307s to the
     GoHighLevel funnel, and submitting a redirecting URL earns a
     "Page with redirect" exclusion in Search Console. /audit/thank-you
     is absent too — it is noindex, and a confirmation page has no
     business in search results. /test is the one indexable entry
     point ArkFlow still owns. */
  { path: "/test", files: ["app/test/page.tsx", "lib/audit-content.ts"] },
  { path: "/how-it-works", files: ["app/how-it-works/page.tsx"] },
  { path: "/solutions", files: ["app/solutions/page.tsx", "lib/solutions-content.ts"] },
  { path: "/aesthetic-clinics", files: ["app/aesthetic-clinics/page.tsx"] },
  { path: "/attract", files: ["app/attract/page.tsx", "lib/attract-content.ts"] },
  { path: "/what-we-build", files: ["app/what-we-build/page.tsx", "lib/what-we-build-content.ts"] },
  { path: "/compliance", files: ["app/compliance/page.tsx", "lib/compliance-content.ts"] },
  { path: "/insights", files: ["app/insights/page.tsx", "lib/insights/index.ts"] },
  { path: "/case-studies", files: ["app/case-studies/page.tsx", "lib/case-studies.ts"] },
  { path: "/about", files: ["app/about/page.tsx", "components/about/founders.tsx"] },
  { path: "/contact", files: ["app/contact/page.tsx", "components/contact/contact-experience.tsx"] },
  { path: "/privacy", files: ["app/privacy/page.tsx"] },
  { path: "/terms", files: ["app/terms/page.tsx"] },
  { path: "/cookies", files: ["app/cookies/page.tsx"] },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = ROUTES.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: lastModified(...r.files),
  }));

  /**
   * Only categories that actually hold an article are submitted.
   *
   * Six category pillars are defined but three currently hold no
   * articles. An empty pillar renders a heading, a standfirst and a
   * "nothing published yet" line — under 200 words including the shared
   * nav and footer. Submitting those in the sitemap asks Google to index
   * pages with no content, which is what "Discovered — currently not
   * indexed" means, and repeated across a section it lowers crawl trust
   * for the whole /insights cluster.
   *
   * This is derived, not a second list: publishing the first article in
   * a category puts its pillar back in the sitemap automatically, with
   * no edit here. The matching noindex is in
   * app/insights/[category]/page.tsx and lifts on the same condition.
   */
  const populatedCategories = categories.filter((c) =>
    articles.some((a) => a.category === c.slug)
  );

  /* A pillar's date is the newest article in it — the thing that
     actually changes what the page shows. */
  const pillars: MetadataRoute.Sitemap = populatedCategories.map((c) => {
    const newest = articles
      .filter((a) => a.category === c.slug)
      .map((a) => new Date(a.updated ?? a.published))
      .sort((x, y) => y.getTime() - x.getTime())[0];
    return { url: `${SITE_URL}/insights/${c.slug}`, lastModified: newest };
  });

  const posts: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${SITE_URL}/insights/${a.category}/${a.slug}`,
    lastModified: new Date(a.updated ?? a.published),
  }));

  return [...pages, ...pillars, ...posts];
}
