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
 * PENDING — no verified WhatsApp number. The previous value
 * (wa.me/6500000000) was a placeholder that shipped as a live link.
 * While null, every WhatsApp affordance is hidden rather than broken.
 */
export const WHATSAPP_URL: string | null = null;

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

export const COMPANY = {
  legalName: "ArkFlow Solutions Pte Ltd",
  shortName: "ArkFlow",
  base: "Singapore · SGT business hours",
} as const;
