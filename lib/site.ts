/**
 * Site-wide constants.
 *
 * GOVERNANCE: values marked PENDING are not yet verified by the founder or
 * the deployment. They must not be replaced with invented data. Anything
 * PENDING is either hidden from the UI or rendered as a non-functional
 * label until the real value is supplied.
 */

/**
 * The GoHighLevel white-label host.
 *
 * MOVED 28 October 2026, from link.arkflowsolutions.com to
 * go.arkflowsolutions.com. The link.* subdomain is gone: the booking
 * widget, the embed script and the old survey all return 404 on it.
 * That means every "Book a Discovery Call" on the live site was
 * opening a dead widget, and the resize script behind it was 404ing
 * too — the same failure as 1 September 2026, when a rebuilt
 * sub-account orphaned the previous calendar.
 *
 * ONE PLACE, so it cannot happen a third time quietly. Everything
 * that touches the CRM host reads this constant: the calendar, the
 * embed script, and the host named in the cookie policy. If the
 * subdomain moves again, this line moves and the site follows.
 */
export const GHL_HOST = "go.arkflowsolutions.com";

/**
 * VERIFIED 28 October 2026 — GoHighLevel booking widget, discovery
 * call. Supplied by the founder as an embed snippet and checked
 * before it shipped: the URL returns 200, and the widget renders
 * "Discovery Booking Call", 1 hr, Asia/Singapore (GMT+8), with real
 * slots on it.
 *
 * Calendar history, because this is the third one:
 *   KusL0qfR1oz37ZonStXL  deleted sub-account, dead by 1 Sep 2026
 *   dVmkLzktSpMYKEIXNBpz  on link.*, dead by 28 Oct 2026
 *   NuxqCMoH5NOnYwkbxMTr  current, on go.*
 *
 * scripts/verify.mjs check 12b asserts this exact ID, so a silent
 * revert fails the build rather than the booking flow.
 */
export const GHL_CALENDAR_URL =
  "https://go.arkflowsolutions.com/widget/booking/NuxqCMoH5NOnYwkbxMTr";

/**
 * The GoHighLevel resize script that the booking iframe needs.
 *
 * Loaded by components/booking/booking-modal.tsx at the moment the
 * modal opens, never on page load. It lives here rather than in the
 * component because check 12a forbids the CRM host appearing anywhere
 * but this file — which is exactly the rule that would have caught
 * the dead link.* script if it had been written this way in the first
 * place.
 */
export const GHL_EMBED_SCRIPT_URL = "https://go.arkflowsolutions.com/js/form_embed.js";

/**
 * The LeadConnector live chat widget. Added 29 October 2026.
 *
 * VERIFIED: the loader returns 200 and the widget id belongs to this
 * account — it differs from the one on khaivisuals.com, so this is
 * not a client's widget pasted onto our own site.
 *
 * SERVED FROM THE VENDOR CDN, not the white-label domain. GHL_HOST
 * above is ArkFlow's own subdomain for booking and forms;
 * widgets.leadconnectorhq.com is GoHighLevel's shared CDN and there
 * is no white-label equivalent for the chat widget. That difference
 * is why it is a separate constant rather than built from GHL_HOST,
 * and why the cookie policy names both hosts.
 *
 * LOADS ON EVERY PAGE. Unlike the booking widget, which is requested
 * only when a visitor opens the modal, a chat bubble has to be
 * present to be useful. That changed what the cookie policy had to
 * say — see app/cookies/page.tsx.
 */
export const CHAT_WIDGET_ID = "6ae234ceeebfe8c5f0131e6d";
export const CHAT_WIDGET_HOST = "widgets.leadconnectorhq.com";
export const CHAT_WIDGET_LOADER = `https://${CHAT_WIDGET_HOST}/loader.js`;
export const CHAT_WIDGET_RESOURCES = `https://${CHAT_WIDGET_HOST}/chat-widget/loader.js`;

/** Alias — the name used across content and components. */
export const BOOKING_URL = GHL_CALENDAR_URL;

/**
 * AUDIT_URL — REINSTATED 14 October 2026 (founder decision).
 *
 * THE HISTORY, BECAUSE IT HAS TURNED TWICE.
 *   6 Sep 2026  Removed. The audit funnel was the public CTA and it sent
 *               every visitor off arkflowsolutions.com at the moment of
 *               highest intent. The canonical conversion became the
 *               booking modal.
 *   6 Oct 2026  The Growth Blueprint made the Revenue Leak Audit the
 *               primary conversion again, and it was built on-site at
 *               /audit so the funnel stayed on this domain.
 *   14 Oct 2026 The founder moved the funnel to a GoHighLevel landing
 *               page. The audit CTA now points here, and /audit
 *               redirects here, so there is exactly one funnel rather
 *               than an on-site form competing with a GHL one.
 *
 *   28 Oct 2026 Found dead. go.arkflowsolutions.com/revenue-leak-audit
 *               -page returned {"msg":"Not found"} — so every audit
 *               CTA on the site, and the /audit redirect, led nowhere.
 *   31 Oct 2026 Rebuilt by the founder on the link.* subdomain and
 *               verified here end to end before this line changed.
 *
 * VERIFIED 31 October 2026, all three funnel steps walked in a browser:
 *   1  /revenue-leak-audit-page        landing, "Start the Audit"
 *   2  /revenue-leak-audit-question-page   22 questions over 5 steps,
 *      required-field validation refusing to advance when it should
 *   3  /leak-audit-report?r=<payload>  a real report naming the
 *      business and scoring a Revenue Leak Index per category
 *
 * WHY link.* AND NOT go.*. Both subdomains are live and they serve
 * different things. go.* hosts the booking widget and form_embed.js;
 * link.* hosts the funnel pages. The 28 October note claiming link.*
 * was dead was wrong — only its /widget/ paths had moved. Neither
 * host is a drop-in for the other: the funnel 404s on go.*, and the
 * calendar 404s on link.*.
 *
 * THE SLUG. The founder supplied "-page-page" and that works, but so
 * does "-page", byte-for-byte the same page. The shorter one is used
 * because it is what a person would type and what reads sanely in a
 * CTA; if GHL ever stops aliasing it, check 12a-ii below fails the
 * build rather than letting the CTA rot quietly.
 *
 * ONE PLACE, ON PURPOSE. Every audit CTA and the /audit redirect read
 * this constant, so the destination changes in one edit. scripts/verify
 * .mjs check 12a allows these hosts only through lib/site.ts: a
 * hardcoded funnel URL anywhere else in public source still fails the
 * build.
 */
export const AUDIT_URL =
  "https://link.arkflowsolutions.com/revenue-leak-audit-page";

/**
 * The note below describes the September removal and is kept as the
 * record of why the on-site rule existed.
 *
 * WHY IT WENT: the audit funnel is a separate property. Making it the
 * primary CTA sent every visitor off arkflowsolutions.com at the moment
 * of highest intent, into a funnel with its own notice and its own data
 * collection. The canonical conversion is now "Book a Discovery Call",
 * which keeps the visitor here and opens the booking modal.
 *
 * The audit itself is unchanged and still exists as a separate system.
 * The site still describes it as something that happens ON a discovery
 * call — it is simply no longer a button that leaves the website.
 *
 * DO NOT REINTRODUCE IT AS A CTA. scripts/verify.mjs check 12 fails the
 * build if go.arkflowsolutions.com/audit appears in public source again.
 */

/**
 * SURVEY_URL REMOVED 28 October 2026.
 *
 * It was the Lead Response Audit intake survey, kept unused since 6
 * September as "the record of a live GHL asset that may still be
 * receiving submissions from elsewhere". It is not live: the URL
 * returns 404, along with the rest of link.arkflowsolutions.com.
 *
 * The founder decision it was waiting on (retire, rename, or keep as
 * an intake step) is moot now that the asset is gone, so the dead URL
 * goes and this note stays in its place. The survey ID was
 * NXyNayYOuw3hhVcb9cMY if it ever needs to be traced in GoHighLevel.
 */

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
 * The public contact address.
 *
 * CHANGED 21 October 2026, founder instruction. The site had been
 * showing arkflowsg@gmail.com since the hello@arkflow.sg address was
 * found to have no mailbox behind it — a working personal address was
 * judged better than a professional-looking one that bounces. It is
 * now hello@arkflowsolutions.com, on the domain that actually serves
 * this site.
 *
 * READS FROM THE ENVIRONMENT so it can be changed without a code
 * deploy: set NEXT_PUBLIC_CONTACT_EMAIL in Vercel and it wins. The
 * literal below is the default, not a fallback for a broken mailbox.
 *
 * THE MAILBOX MUST EXIST BEFORE THIS SHIPS. The founder is creating
 * it. If it is not receiving mail on the day this goes to production,
 * set NEXT_PUBLIC_CONTACT_EMAIL back to the Gmail address rather than
 * leaving a bouncing address on a live site — that is the exact
 * failure the previous value was chosen to avoid.
 *
 * Trimmed, and empty is treated as unset, for the same reason
 * SITE_URL does it: a bare `NEXT_PUBLIC_CONTACT_EMAIL=` line in an env
 * file otherwise renders an empty mailto on every page.
 */
export const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "hello@arkflowsolutions.com";

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
 * lowercase f was already correct.
 *
 * ADDRESS UNIT — "#06-28" (founder decision, 19 September 2026). The
 * site previously rendered "#6-28", following the ACRA profile as read
 * on 6 September. The signed contract stack (ARK-WTOS, ARK-PRIV,
 * ARK-DPCA, 31 Aug 2026) uses "#06-28", and the founder confirmed that
 * form is correct, so the website now matches the contracts.
 *
 * NOTE FOR WHOEVER RECONCILES THE CONTRACT STACK: the issued documents
 * render the entity as "ArkFlow Solutions Pte. Ltd." with a capital F.
 * The website follows the ACRA name (lowercase f). That divergence is
 * real and is flagged, not resolved.
 */
/**
 * The registered address as structured parts, for schema.org
 * PostalAddress. Same verified ACRA address as COMPANY.address below,
 * which is composed from these parts so the two can never diverge.
 */
export const COMPANY_ADDRESS = {
  streetAddress: "60 Paya Lebar Road, #06-28, Paya Lebar Square",
  addressLocality: "Singapore",
  postalCode: "409051",
  addressCountry: "SG",
} as const;

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
   * Registered address. The unit is "#06-28", matching the signed
   * contract stack (founder decision, 19 September 2026 — see above).
   */
  address: `${COMPANY_ADDRESS.streetAddress}, ${COMPANY_ADDRESS.addressLocality} ${COMPANY_ADDRESS.postalCode}`,
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
