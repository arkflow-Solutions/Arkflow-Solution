/**
 * Site-wide constants.
 *
 * GOVERNANCE: values marked PENDING are not yet verified by the founder or
 * the deployment. They must not be replaced with invented data. Anything
 * PENDING is either hidden from the UI or rendered as a non-functional
 * label until the real value is supplied.
 */

/** VERIFIED — GoHighLevel / LeadConnector booking widget. */
export const GHL_CALENDAR_URL =
  "https://api.leadconnectorhq.com/widget/booking/KusL0qfR1oz37ZonStXL";

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
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
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
 *   Brand        "ArkFlow"                     — capital F, used everywhere
 *                                                 in marketing and product copy
 *   Legal entity "Arkflow Solutions Pte Ltd"   — lowercase f, the ACRA
 *                                                 registered name
 *
 * The registered name is NOT a stylistic variant of the brand. Do not
 * "correct" the lowercase f in `legalName` — it is the name on the
 * register, and legal, privacy and terms contexts must match it exactly.
 * Equally, do not push the lowercase form into marketing copy.
 *
 * CORRECTED 28 Aug 2026: legalName previously read "ArkFlow Solutions
 * Pte Ltd", applying brand capitalisation to the registered entity.
 */
export const COMPANY = {
  /** ACRA registered name. Exact capitalisation — do not alter. */
  legalName: "Arkflow Solutions Pte Ltd",
  /** Unique Entity Number, ACRA. */
  uen: "202638999Z",
  /** Public brand. Capital F. */
  shortName: "ArkFlow",
  base: "Singapore · SGT business hours",
} as const;

/** Formatted identification line: "Arkflow Solutions Pte Ltd · UEN 202638999Z" */
export const COMPANY_IDENTIFIER = `${COMPANY.legalName} · UEN ${COMPANY.uen}`;
