import { WHATSAPP_URL, CONTACT_EMAIL, BOOKING_URL } from "@/lib/site";

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
 * TIER 2A, 6 September 2026 — public positioning cleanup.
 *
 * The `guarantee` export is DELETED. It carried the 30-Day Response
 * Guarantee, which is not a current public term. Its only consumer was
 * one line in components/contact/contact-experience.tsx; that line was
 * rewritten first, leaving the export with no consumer at all.
 *
 * The superseded commercial framing has also been removed from `faq`,
 * `about` and `caseStudies`: the guarantee, the six-month minimum, the
 * implementation-fee and upgrade language, the package/tier ladder, and
 * the 72-hour and 10-business-day delivery commitments.
 *
 * NOTHING REPLACED THEM. No new guarantee, no new contract term, no new
 * delivery window and no new tier was invented to fill the gap — a
 * commercial promise is a founder decision and a contract term is a
 * legal one. Where a question could not be answered without inventing
 * one, the question was removed rather than answered vaguely.
 *
 * The binding terms live in /terms, which Tier 2A does not touch.
 */
export const faq = [
  {
    q: "What is ArkFlow, exactly?",
    a: "A Revenue Operating Company. We build and operate the connected system that runs between your enquiries and your revenue — capture, response, qualification, booking, conversion, follow-up, retention and reactivation. AI is part of how it works, but the product is the operating system, not the AI.",
  },
  {
    q: "Is this an AI automation agency, or a chatbot?",
    a: "Neither. A chatbot is one component someone hands you and leaves you to maintain. We design the system around how your business actually operates, implement it, and keep operating it — the software is the mechanism, the revenue operations are the work.",
  },
  {
    q: "How does implementation work?",
    a: "We start with a Revenue Leak Audit on your own numbers, map your enquiry-to-payment flow, then build and test the system against your real services before it goes live. After that we monitor and tune it as it settles into how your team works.",
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
    "Read the verbs in that mission: protect, grow, convert, reactivate. They are revenue verbs, not technology verbs. ArkFlow is a Revenue Operating Company, not an AI automation company — AI is the mechanism, the connected revenue operating system is the solution. We never lead with the technology. We lead with the revenue a business keeps.",
  vision:
    "Depth first. ArkFlow doesn't begin as a platform — it begins by operating one business's revenue system properly, and earns the right to expand from there. Breadth is earned.",
  honesty: [
    { title: "We mark our claims", body: "Internally, every claim ArkFlow makes carries an evidence tag: proven principle, reasoned recommendation, or validated standard. We know exactly which of our promises are proven and which are still being earned — and we say which is which rather than blurring the two." },
    { title: "We don't publish numbers we haven't earned", body: "We're a young company, and we won't pretend otherwise. You will not find invented client counts, conversion rates or revenue figures on this site. Anything shown to illustrate how the system behaves is labelled as illustrative, in the interface itself." },
    { title: "Scope is agreed before it is built", body: "What your system does is decided with you, in writing, before implementation starts — so what gets built is what was actually discussed, and anything outside it is raised rather than assumed." },
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
    body: "The fastest way to reach us — the same channel we build on.",
    href: WHATSAPP_URL,
  },
  /* `survey` removed 6 September 2026. It described a GoHighLevel survey
     iframe on /contact and claimed submissions landed in the CRM without
     depending on /api/enquiry. Neither was true any more: the embed
     component was deleted when the multi-step form became the single
     intake path, and nothing read this object. SURVEY_URL still exists in
     lib/site.ts as the record of a live GHL asset pending a founder
     decision — it is simply not rendered anywhere. */
  email: { title: "Email", address: CONTACT_EMAIL },
  base: "Singapore · SGT business hours",
};

export const caseStudies = {
  statement:
    "Our first case studies are being earned right now, with founding clients. We would rather show you an empty page than an invented one.",
  promise: [
    "Real response-time numbers, before and after",
    "Booking and retention improvements, measured from the client's own data",
    "Published with the client's sign-off, or not at all",
  ],
};
