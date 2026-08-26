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
    ];
  },
};

export default nextConfig;
