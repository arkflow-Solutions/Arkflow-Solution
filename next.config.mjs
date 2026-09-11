/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  /**
   * Retired routes. /industries violated the Stage 1 rule (it presented
   * six verticals as served); /resources content moved into /how-it-works
   * as the Lead Response Audit entry step. Permanent redirects because
   * both were in the published sitemap and may be indexed.
   */
  async redirects() {
    return [
      { source: "/industries", destination: "/aesthetic-clinics", permanent: true },
      { source: "/resources", destination: "/how-it-works", permanent: true },
      /* 11 September 2026. The page labelled "What we build" moved to a
         URL that agrees with its label: ArkFlow does not sell fixed
         packages. /packages was in the published sitemap and may be
         indexed or bookmarked, so it redirects rather than 404s. */
      { source: "/packages", destination: "/what-we-build", permanent: true },
    ];
  },
};

export default nextConfig;
