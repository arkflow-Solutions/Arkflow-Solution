import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * Per-page metadata builder.
 *
 * WHY THIS EXISTS: pages previously exported only `title` and
 * `description`. Next.js merges metadata with the root layout, so the
 * openGraph block was inherited — every page shared the homepage's
 * og:title ("Your business has the tools...") and og:url. A link to
 * /packages shared on WhatsApp previewed as the homepage.
 *
 * buildMetadata emits a complete, self-contained set per page: canonical,
 * og:title, og:description, og:url and twitter card. Nothing inherits.
 *
 * GOVERNANCE: no description may contain a price, a client count or a
 * performance claim. Response and delivery figures are commitments.
 */

export const SITE_NAME = "ArkFlow";
export const LOCALE = "en_SG";

type BuildMetadataArgs = {
  /** Page title WITHOUT the " — ArkFlow" suffix. Omit for the homepage. */
  title?: string;
  description: string;
  /** Route path with a leading slash. Homepage is "/". */
  path: string;
  /** Set true for pages that should not be indexed. */
  noIndex?: boolean;
  /**
   * og:type. Defaults to "website" so every existing page's output is
   * unchanged; articles pass "article", which is what they are.
   */
  ogType?: "website" | "article";
  /**
   * Social preview image, as a site-relative path.
   *
   * WHY THIS IS OPT-IN AND NOT YET THE DEFAULT. Declaring `openGraph`
   * here deliberately stops the root layout's metadata being inherited
   * (see above) — and that also stops Next.js's file-based
   * app/opengraph-image.tsx from being merged in. The result is that
   * every page except the homepage currently ships with no og:image at
   * all. Passing `images` below fixes that for one page at a time.
   *
   * Making it the default would fix all fifteen routes in one line, but
   * that changes the social preview of pages that are already signed
   * off, so it is being raised for approval rather than assumed.
   */
  ogImage?: string;
};

export function buildMetadata({
  title,
  description,
  path,
  noIndex = false,
  ogType = "website",
  ogImage,
}: BuildMetadataArgs): Metadata {
  const url = new URL(path, SITE_URL).toString();
  const fullTitle = title
    ? `${title} — ${SITE_NAME}`
    : "ArkFlow — Revenue Operations for Singapore service businesses";

  return {
    title,
    description,
    alternates: { canonical: path },
    /**
     * noindex, FOLLOW — not nofollow.
     *
     * A page held out of the index is still a page Google should crawl
     * through. nofollow would tell it to ignore every outbound link,
     * which on an empty category pillar means dropping the /insights
     * and discovery-call links that give the page its only value while
     * it waits for content. noindex keeps it out of results; follow
     * keeps the crawl path intact.
     */
    robots: noIndex ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: {
      type: ogType,
      locale: LOCALE,
      siteName: SITE_NAME,
      title: fullTitle,
      description,
      url,
      ...(ogImage
        ? { images: [{ url: new URL(ogImage, SITE_URL).toString() }] }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      ...(ogImage
        ? { images: [new URL(ogImage, SITE_URL).toString()] }
        : {}),
    },
  };
}
