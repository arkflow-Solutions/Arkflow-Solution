import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * Approved sitemap. /industries, /resources and /styleguide are retired.
 * /aesthetic-clinics is the only dedicated vertical page at Stage 1.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/how-it-works",
    "/solutions",
    "/aesthetic-clinics",
    "/packages",
    "/case-studies",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
  ];
  return routes.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority:
      path === "" ? 1 : ["/packages", "/aesthetic-clinics"].includes(path) ? 0.9 : 0.7,
  }));
}
