import { WHATSAPP_URL, CONTACT_EMAIL, BOOKING_URL, SURVEY_URL } from "@/lib/site";

/**
 * ArkFlow content — copy for /about, /case-studies, /contact and the
 * shared contact affordances (BookingModal, CtaBand, BookCallButton,
 * article CTAs).
 *
 * REDUCED 6 September 2026. This module previously carried the full
 * package specification — the tier ladder, comparison matrix, upgrade
 * rules, pricing policy and expandable tier panels. The /packages route
 * was removed when public positioning moved to the quotation model, and
 * seventeen of the twenty-two exports here were left behind with no
 * consumer. They are deleted: `packages`, `accents`, `packageIncludes`,
 * `packageAssurances`, `packageTerms`, `problems`, `journey`,
 * `industries`, `howItWorks`, `matrix`, `upgradeRules`, `boundaries`,
 * `pricingPolicy`, `solutions`, `resources`, `packageDetails` and
 * `packageDetailOrder`. Nothing rendered from any of them.
 *
 * WHY THEY WERE DELETED RATHER THAN LEFT: unreferenced content is not
 * inert. It failed the governance checks in scripts/verify.mjs and so
 * blocked the build, while publishing nothing that a visitor could see
 * — the worst of both. HOTFIX.md records what a stale unreferenced file
 * costs on a Vercel build.
 *
 * GOVERNANCE — the five exports that remain are LIVE and rendered.
 * `guarantee` and the guarantee sentence inside `about.honesty` and
 * `faq` still carry commercial terms that the September 2026
 * resolutions classify as superseded. They are deliberately UNTOUCHED:
 * replacing them is a founder copy decision and, for the contract term,
 * a legal one. Do not paraphrase them here to make a check pass.
 */
export const guarantee = {
  name: "30-Day Response Guarantee",
  // Canonical full text — do not paraphrase in legal contexts.
  fullText:
    "If ArkFlow does not reduce the client's average lead response time to under 90 seconds within the first 30 days after successful onboarding, ArkFlow will refund the client's first monthly subscription fee. This is ArkFlow's only guarantee.",
  summary:
    "Response time not under 90 seconds within 30 days? Your first month is refunded — checked at Day 30, no need to ask.",
};

export const faq = [
  {
    q: "What exactly does the 30-Day Response Guarantee cover?",
    a: "One thing, stated plainly: if we don't reduce your average lead response time to under 90 seconds within the first 30 days after onboarding, we refund your first monthly subscription fee. It's our only guarantee, and we evaluate it proactively at Day 30 — you never have to ask for a refund you're owed.",
  },
  {
    q: "What's the minimum commitment?",
    a: "Six months on every package, then month-to-month with 30 days' notice. There is a one-time implementation that covers the real work of building and testing your system — it is never a profit centre, and it is waived when you upgrade between packages.",
  },
  {
    q: "How fast can we go live?",
    a: "Your system goes live within 72 hours of your completed intake form. On Scale, your website is live within 10 business days.",
  },
  {
    q: "We already have a marketing agency. Do we still need this?",
    a: "Keep them — they're bringing people to your door. We make sure nobody who reaches your door walks away because no one answered. It's a different job entirely, and the two work better together.",
  },
  {
    q: "We tried a chatbot before and it was a disaster.",
    a: "What you tried was almost certainly a generic tool you had to configure and maintain yourselves. ArkFlow is managed: we build the system specifically for your services and tone, and we monitor it every week. If something is off, we find out before your patients do.",
  },
  {
    q: "What happens to our patients' data?",
    a: "Your data stays inside the platform your system runs on, and we sign a data processing agreement with every client, consistent with Singapore PDPA. We never store or access patient clinical records — only the enquiry and booking information needed to run the system, deleted within an agreed period if the relationship ends.",
  },
  {
    q: "Is this appropriate for a medical setting?",
    a: "Yes, and we take it seriously. The system never gives medical advice, never makes outcome claims, and never quotes outside your approved price list. Anything clinical is handed to your team immediately. This is configured to stay inside HSA advertising guidelines from day one — it's built in, not bolted on.",
  },
  {
    q: "Will it feel impersonal to our patients?",
    a: "A helpful reply in 60 seconds at 9pm is the personal touch — the alternative is silence until the next morning. The system buys your team time to be personal where it matters most: in the room with the patient, not on their phones.",
  },
];

export const about = {
  mission:
    "ArkFlow exists to protect and grow the revenue that Singapore service businesses are quietly losing every day to slow replies, missed messages, no-shows and dormant follow-up.",
  positioning:
    "Read the verbs in that mission: protect, grow, convert, reactivate. They are revenue verbs, not technology verbs. ArkFlow is a Revenue Operations company, not an AI automation company — automation is how we deliver the outcome; revenue is the outcome. We never lead with the technology. We lead with the money the clinic keeps.",
  vision:
    "Depth first. ArkFlow doesn't begin as a platform — it begins as the best operations partner Singapore aesthetic clinics have ever had, and earns the right to expand one vertical at a time. Breadth is earned.",
  honesty: [
    { title: "We mark our claims", body: "Internally, every claim ArkFlow makes carries an evidence tag: proven principle, reasoned recommendation, or validated standard. We know exactly which of our promises are proven and which are being earned — and we price the risk of the unproven ones into our guarantee, not into your fees." },
    { title: "The risk sits with us", body: "We're a young company, and we won't pretend otherwise. That's why the 30-Day Response Guarantee exists: if your response time isn't under 90 seconds within 30 days, your first month is refunded — measured proactively, so you never have to ask." },
    { title: "Fees track effort", body: "The implementation fee is never a profit centre. It covers the real work of building and testing your system, is reviewed as our delivery gets more efficient, and is waived entirely on upgrades." },
  ],
};

export const contact = {
  call: {
    title: "Book a discovery call",
    body: "Thirty minutes, no obligation. We map your enquiry-to-payment flow, run a Revenue Leak Audit on your current numbers, and show you exactly where revenue is slipping through — useful whether or not you work with us.",
    // Live booking widget — every "Book Discovery Call" CTA opens this
    // in <BookingModal />. Sourced from lib/site.ts so the calendar ID
    // exists in exactly one place; the last rebuild left a dead widget
    // behind precisely because it was duplicated.
    href: BOOKING_URL,
  },
  /* PENDING — no verified WhatsApp number. `href` reads from
     WHATSAPP_URL in lib/site.ts, which is null until the founder
     supplies one. While null, every WhatsApp affordance hides itself
     rather than shipping a dead link. Do not invent a number. */
  whatsapp: {
    title: "WhatsApp us",
    body: "The fastest way to reach us — the same channel we build on. Business-hours replies within 4 hours.",
    href: WHATSAPP_URL,
  },
  /**
   * Revenue Leak Audit survey — the GoHighLevel form that captures an
   * enquiry directly into the CRM. Rendered in an iframe on /contact,
   * so submissions land in GHL without depending on the /api/enquiry
   * endpoint or its environment variables.
   */
  survey: {
    title: "Start your Revenue Leak Audit",
    body: "A few questions about how enquiries reach your business today. Takes about two minutes, and the answers are what we measure against.",
    href: SURVEY_URL,
  },
  email: { title: "Email", address: CONTACT_EMAIL },
  base: "Singapore · SGT business hours",
};

export const caseStudies = {
  statement:
    "Our first case studies are being earned right now, with founding clinics — implementation waived in exchange for the right to publish their results.",
  promise: [
    "Real response-time numbers, before and after",
    "Show-rate and collection improvements, measured from the client's own data",
    "Published with the clinic's sign-off, or not at all",
  ],
};
