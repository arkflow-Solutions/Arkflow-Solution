/**
 * Social ecosystem configuration.
 *
 * GOVERNANCE: only verified accounts appear here. Instagram is confirmed.
 * The Facebook page exists ("Arkflow Solution") but its canonical URL has
 * not been supplied, so `url` is null and every Facebook affordance
 * renders nothing until it is filled in. Guessing a Facebook URL would
 * either 404 or, worse, link to somebody else's page.
 *
 * To enable Facebook: set `url` below. Nothing else needs changing —
 * footer, article follow prompts and Organization sameAs all read from here.
 */

export type SocialProfile = {
  id: "instagram" | "facebook";
  label: string;
  handle: string;
  url: string | null;
};

export const socials: SocialProfile[] = [
  {
    id: "instagram",
    label: "Instagram",
    handle: "@arkflow.solution",
    url: "https://www.instagram.com/arkflow.solution/",
  },
  {
    id: "facebook",
    label: "Facebook",
    handle: "Arkflow Solution",
    // PENDING — supply the canonical page URL. Do not guess.
    url: null,
  },
];

/** Only profiles with a verified URL. Use this for rendering. */
export const activeSocials = socials.filter(
  (s): s is SocialProfile & { url: string } => Boolean(s.url)
);

/**
 * The company page on LinkedIn.
 *
 * DELIBERATELY NOT IN `socials`. That array is the audience-facing
 * follow list: it drives the footer and the "more practical automation
 * notes" prompt under every article, and that prompt fires a click
 * event chosen by a two-way ternary between instagram and facebook.
 * A third entry would be reported as a Facebook click, and the
 * analytics event union is closed, so making it correct would mean
 * widening the union and the ternary — a change to the analytics
 * architecture for the sake of one link.
 *
 * LinkedIn is also a different kind of thing here: a corporate identity
 * shown once on the About page, not a content channel we ask readers to
 * follow. It lives on its own so it can be linked deliberately, and it
 * still lives in this file so there is exactly one place a social URL
 * is ever written down.
 */
export const companyLinkedIn = {
  label: "LinkedIn",
  url: "https://www.linkedin.com/company/arkflow-solutions/",
} as const;

/**
 * For Organization schema `sameAs`. Verified profiles only.
 *
 * LinkedIn is included even though it is not in `socials`: sameAs is a
 * statement of corporate identity, not a follow list, and the company
 * page is exactly what it is for. Keeping it out of `socials` is about
 * the follow prompt's click tracking, not about whether the profile is
 * real — see the note on companyLinkedIn.
 */
export const sameAs = [
  ...activeSocials.map((s) => s.url),
  companyLinkedIn.url,
];

/* ------------------------------------------------------------------ UTM */

/**
 * Campaign URL builder.
 *
 * Purpose is consistency: "ig", "insta" and "Instagram" as three separate
 * sources in analytics makes the channel unmeasurable. Source and medium
 * are constrained by the type system; only campaign is free text.
 */
export type UtmSource = "instagram" | "facebook" | "linkedin" | "email" | "qr";

const MEDIUM: Record<UtmSource, string> = {
  instagram: "social",
  facebook: "social",
  linkedin: "social",
  email: "email",
  qr: "offline",
};

export function campaignUrl(
  path: string,
  source: UtmSource,
  campaign: string,
  content?: string
): string {
  const url = new URL(path, "https://www.arkflowsolutions.com");
  url.searchParams.set("utm_source", source);
  url.searchParams.set("utm_medium", MEDIUM[source]);
  url.searchParams.set("utm_campaign", slug(campaign));
  if (content) url.searchParams.set("utm_content", slug(content));
  return url.toString();
}

function slug(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Reads campaign parameters from the current URL. Returns only UTM
 * fields — never the full query string, which can carry identifiers.
 */
export function readCampaign(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const out: Record<string, string> = {};
  for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_content"]) {
    const value = params.get(key);
    if (value) out[key] = value.slice(0, 64);
  }
  return out;
}
