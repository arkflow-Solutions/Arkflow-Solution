import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { articles } from "@/lib/insights";
import { categories } from "@/lib/insights/categories";

/**
 * Approved sitemap. /industries, /resources and /styleguide are retired.
 * /aesthetic-clinics is the only dedicated vertical page at Stage 1.
 *
 * Insights routes are derived from the article registry, so publishing an
 * article adds it to the sitemap automatically — there is no second list
 * to keep in sync and therefore no way for an article to be unreachable.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/how-it-works",
    "/solutions",
    "/aesthetic-clinics",
    "/attract",
    "/packages",
    "/insights",
    "/case-studies",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
  ];

  const now = new Date();

  const pages: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: path === "" || path === "/insights" ? "weekly" : "monthly",
    priority:
      path === ""
        ? 1
        : ["/packages", "/aesthetic-clinics", "/insights", "/attract"].includes(path)
          ? 0.9
          : 0.7,
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
  const populatedCategories = categories.filter(
    (c) => articles.some((a) => a.category === c.slug),
  );

  const pillars: MetadataRoute.Sitemap = populatedCategories.map((c) => ({
    url: `${SITE_URL}/insights/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const posts: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${SITE_URL}/insights/${a.category}/${a.slug}`,
    lastModified: new Date(a.updated ?? a.published),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...pages, ...pillars, ...posts];
}
