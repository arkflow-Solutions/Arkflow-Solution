import type { MetadataRoute } from "next";

const BASE = "https://arkflow.sg";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "", "/packages", "/solutions", "/industries",
    "/case-studies", "/about", "/resources", "/contact",
  ];
  return routes.map((path) => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/packages" ? 0.9 : 0.7,
  }));
}
