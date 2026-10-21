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
   * USE THIS ONLY FOR A REAL IMAGE FILE, never to name an
   * `opengraph-image` route.
   *
   * CORRECTED 21 October 2026. This used to warn that declaring
   * `openGraph` here blocks Next.js's file-based opengraph-image from
   * being merged in, and several pages passed `ogImage:
   * "/opengraph-image"` to work around it. That was not true: tested
   * by building and reading the rendered HTML, a route with its own
   * opengraph-image.tsx and no `ogImage` gets its own card merged in
   * correctly. The workaround was the thing suppressing the card —
   * every article shared under the generic site image because of it.
   *
   * Every route now has its own opengraph-image.tsx (see
   * lib/og-card.tsx), so leave `ogImage` unset unless the page has a
   * genuine photograph to share — /case-studies passes a screenshot
   * of the client's live site, which beats any generated card.
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
  /**
   * TITLE FORMAT, settled 21 October 2026: `Page topic | ArkFlow`.
   *
   * Three things were wrong before. The <title> used " · " while
   * og:title used " — ", so the tab and the social card disagreed.
   * The separator itself was a middot, which several crawlers and
   * most humans read as decoration rather than as a boundary. And
   * because page titles were written as "About ArkFlow", the brand
   * appeared twice: "About ArkFlow · ArkFlow".
   *
   * One pipe, one brand, at the end. `title` must not contain the
   * word ArkFlow — buildMetadata strips a trailing brand rather than
   * trusting every caller to remember, because the duplication is
   * invisible until you look at a rendered tab.
   */
  const topic = (title ?? "").replace(/\s*[|·—-]\s*ArkFlow\s*$/i, "").trim();
  const fullTitle = topic
    ? `${topic} | ${SITE_NAME}`
    : "WhatsApp & AI Enquiry Automation for Singapore Clinics | ArkFlow";

  return {
    /* The bare topic. The root layout's template appends " | ArkFlow",
       so returning the brand here would print it twice. */
    title: topic || undefined,
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
