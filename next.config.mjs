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
      /* 14 October 2026. The Revenue Leak Audit moved to a GoHighLevel
         landing page, so the on-site /audit page would otherwise sit
         alongside it as a second form for the same thing — two funnels,
         two sets of numbers. Everything that points at /audit (older
         links, the footer, anything already indexed) now lands on the
         funnel instead.

         TEMPORARY (307), NOT PERMANENT, on purpose: a 301 is cached hard
         by browsers and is painful to undo if the funnel moves back
         on-site. The page file is left in place for the same reason.

         The literal is duplicated from AUDIT_URL in lib/site.ts because
         this file cannot import TypeScript. verify.mjs check 12a asserts
         the two are identical, so they cannot drift. */
      {
        source: "/audit",
        destination: "https://go.arkflowsolutions.com/revenue-leak-audit-page",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
