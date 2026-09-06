/**
 * Site-wide constants.
 *
 * GOVERNANCE: values marked PENDING are not yet verified by the founder or
 * the deployment. They must not be replaced with invented data. Anything
 * PENDING is either hidden from the UI or rendered as a non-functional
 * label until the real value is supplied.
 */

/**
 * VERIFIED — GoHighLevel booking widget, discovery call.
 * Rebuilt account, 1 Sep 2026. The previous calendar
 * (KusL0qfR1oz37ZonStXL) belonged to the deleted sub-account and
 * every "Book Discovery Call" button was opening a dead widget.
 *
 * Served from the link.arkflowsolutions.com white-label domain rather
 * than api.leadconnectorhq.com, so the booking iframe stays on an
 * ArkFlow domain.
 */
export const GHL_CALENDAR_URL =
  "https://link.arkflowsolutions.com/widget/booking/dVmkLzktSpMYKEIXNBpz";

/** Alias — the name used across content and components. */
export const BOOKING_URL = GHL_CALENDAR_URL;

/**
 * CANONICAL PUBLIC CTA — the Revenue Leak Audit funnel.
 *
 * Founder ruling, 6 September 2026: the Revenue Leak Audit is the
 * primary conversion mechanism for the public website, and it lives on
 * its own funnel. The main site educates and drives here; it never
 * recreates the funnel inline.
 *
 * This is a separate property from SURVEY_URL below. Do not merge them
 * without a ruling on whether the old Lead Response Audit survey and
 * this funnel are the same asset.
 */
export const AUDIT_URL = "https://go.arkflowsolutions.com/audit";

/**
 * SUPERSEDED AS A PUBLIC CTA — the Lead Response Audit intake survey.
 * VERIFIED as a GoHighLevel asset, 1 Sep 2026.
 *
 * NOT RENDERED ANYWHERE. Corrected 6 September 2026: the comments here
 * previously stated that /contact embedded this survey and that it was
 * therefore immune to the /api/enquiry environment-variable failure.
 * Both statements were false. The embed component was removed when the
 * multi-step form became the single intake path, and this constant has
 * had no consumer since.
 *
 * It is retained, unused, only as the record of a live GHL asset that
 * may still be receiving submissions from elsewhere. AUDIT_URL is the
 * canonical public CTA and this must never be presented as one.
 *
 * FOUNDER DECISION OPEN: retire this survey, rename it, or keep it as
 * the intake step behind AUDIT_URL. Delete this constant once decided.
 */
export const SURVEY_URL =
  "https://link.arkflowsolutions.com/widget/survey/NXyNayYOuw3hhVcb9cMY";

/**
 * VERIFIED — www.arkflowsolutions.com is live and serving this site.
 *
 * This constant is the ONLY origin in the codebase. It resolves every
 * canonical URL, OG URL, sitemap entry and JSON-LD url. The previous
 * fallback pointed at the Vercel preview origin, which meant every page
 * declared the .vercel.app URL as its canonical — telling search engines
 * the preview was the original and suppressing the production domain.
 *
 * REQUIRED IN VERCEL: set www.arkflowsolutions.com as the PRIMARY domain
 * so ark-flow-sg.vercel.app 301s to it. Without that redirect there are
 * still two indexable copies of every page.
 *
 * EMPTY IS TREATED AS UNSET. This previously used `??`, which only falls
 * back on null/undefined — so `NEXT_PUBLIC_SITE_URL=""` (what a bare
 * `NEXT_PUBLIC_SITE_URL=` line in an env file produces) resolved SITE_URL
 * to "" and made `new URL(SITE_URL)` throw `TypeError: Invalid URL`,
 * failing the build in app/layout.tsx and lib/seo.ts. Trimming first and
 * using `||` makes empty, whitespace and unset all resolve to the
 * canonical origin below. The origin itself is unchanged.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "") ||
  "https://www.arkflowsolutions.com";

/**
 * VERIFIED — company WhatsApp, supplied by the founder 28 Aug 2026.
 * Resolves the long-standing placeholder; every WhatsApp affordance
 * across the site now renders and points here.
 *
 * wa.me requires the number in international format with no plus sign,
 * no spaces and no dashes: +65 8765 5809 -> 6587655809.
 */
export const WHATSAPP_NUMBER = "6587655809";
export const WHATSAPP_DISPLAY = "+65 8765 5809";
export const WHATSAPP_URL: string | null = `https://wa.me/${WHATSAPP_NUMBER}`;

/**
 * Builds a WhatsApp link with the message pre-filled, so an enquiry
 * arrives with its own context instead of a bare "Hi". Keep prefills
 * short — long ones look automated and get deleted before sending.
 */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/**
 * GOVERNANCE FLAG — changed from hello@arkflow.sg.
 *
 * arkflow.sg is not the domain serving this site (www.arkflowsolutions.com
 * is), so hello@arkflow.sg had no deliverable mailbox behind it. A contact
 * address that bounces on a live site is a silent revenue leak, so this has
 * been aligned to the contact address recorded in governance.
 *
 * If a mailbox now exists on the production domain, replace this with
 * hello@arkflowsolutions.com — one line, and the whole site follows.
 */
export const CONTACT_EMAIL = "arkflowsg@gmail.com";

/** VERIFIED — company contact number, as used across ArkFlow deliverables. */
export const CONTACT_PHONE = "+65 8765 5809";

/**
 * Company identity — single source of truth.
 *
 * BRAND vs LEGAL ENTITY. These are two different strings and the
 * distinction is deliberate:
 *
 *   Brand        "ArkFlow"                      — capital F, used everywhere
 *                                                  in marketing and product copy
 *   Legal entity "Arkflow Solutions Pte. Ltd."   — lowercase f, with points,
 *                                                  the ACRA registered name
 *
 * The registered name is NOT a stylistic variant of the brand. Do not
 * "correct" the lowercase f in `legalName` — it is the name on the
 * register, and legal, privacy and terms contexts must match it exactly.
 * Equally, do not push the lowercase form into marketing copy.
 *
 * CORRECTED 28 Aug 2026: legalName previously read "ArkFlow Solutions
 * Pte Ltd", applying brand capitalisation to the registered entity.
 *
 * VERIFIED AGAINST THE ACRA BUSINESS PROFILE, 6 September 2026. The
 * registered name carries points: "Pte. Ltd.", not "Pte Ltd". The
 * lowercase f was already correct. The registered address is
 * "#6-28", not "#06-28".
 *
 * NOTE FOR WHOEVER RECONCILES THE CONTRACT STACK: the issued documents
 * (ARK-WTOS, ARK-PRIV, ARK-DPCA, 31 Aug 2026) render the entity as
 * "ArkFlow Solutions Pte. Ltd." with a capital F, and the address as
 * "#06-28". Those documents are out of scope here and have not been
 * touched. The website now follows the ACRA profile; the contracts do
 * not yet. That divergence is real and is flagged, not resolved.
 */
export const COMPANY = {
  /**
   * ACRA registered name, verified against the Business Profile
   * 6 Sep 2026. Exact capitalisation and punctuation — do not alter.
   */
  legalName: "Arkflow Solutions Pte. Ltd.",
  /** Unique Entity Number, ACRA. */
  uen: "202638999Z",
  /** Public brand. Capital F. */
  shortName: "ArkFlow",
  /**
   * Registered address, per the ACRA Business Profile verified
   * 6 September 2026. The unit is "#6-28" — the issued contract stack
   * renders it "#06-28", which is the divergence noted above.
   */
  address: "60 Paya Lebar Road, #6-28, Paya Lebar Square, Singapore 409051",
  base: "Singapore · SGT business hours",
} as const;

/**
 * Document references for the issued legal documents. The public pages
 * are summaries of these; the issued documents govern.
 *
 * ISSUE dates, not legal-review dates. Do not relabel them as "reviewed"
 * — no representation is made here about who reviewed what.
 */
export const LEGAL_DOCS = {
  websiteTerms: { ref: "ARK-WTOS", issued: "31 August 2026" },
  privacy: { ref: "ARK-PRIV", issued: "31 August 2026" },
  dataProtection: { ref: "ARK-DPCA", issued: "31 August 2026" },
} as const;

/** Formatted identification line: "Arkflow Solutions Pte. Ltd. · UEN 202638999Z" */
export const COMPANY_IDENTIFIER = `${COMPANY.legalName} · UEN ${COMPANY.uen}`;
