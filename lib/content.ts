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
    a: "We build the system that answers your enquiries, books the appointment and follows up afterwards, and then we run it for you. It works across WhatsApp, Instagram, your website form and email. We call ourselves a Revenue Operating Company, which just means we operate the thing we built rather than handing it over and leaving.",
  },
  {
    q: "Is this an AI automation agency, or a chatbot?",
    a: "Closer to an operations team than either. A chatbot is software you configure and then maintain yourself. We build the whole path from first message to confirmed appointment, against your actual services and your actual availability, and we keep running it. If something starts going wrong on a Tuesday, finding that out is our job, not yours.",
  },
  {
    q: "How does implementation work?",
    a: "We start with a Revenue Leak Audit on your own numbers, map your enquiry-to-payment flow, then build and test the system against your real services before it goes live. After that we monitor and tune it as it settles into how your team works.",
  },
  {
    q: "We already have a marketing agency. Do we still need this?",
    a: "Keep them. They are bringing people to your door, and we make sure nobody who reaches it walks away because no one answered. The two jobs are different and they work better together.",
  },
  {
    q: "We tried a chatbot before and it was a disaster.",
    a: "What you tried was almost certainly a generic tool you had to configure and maintain yourselves. ArkFlow is managed: we build the system specifically for your services and tone, and we monitor it every week. If something is off, we find out before your patients do.",
  },
  {
    q: "What happens to our patients' data?",
    a: "Your data stays inside the platform your system runs on, in your own account, and we sign a data processing agreement with every client under the Singapore PDPA. We never store or access clinical records. The system holds the enquiry and booking information it needs to run, and that is deleted within an agreed period if the relationship ends.",
  },
  {
    q: "Is this appropriate for a medical setting?",
    a: "Yes. The system never gives medical advice, never makes outcome claims, and never quotes outside your approved price list. Anything clinical goes to your team immediately. The constraints come from wording you have approved, so they hold on a busy Saturday as well as on the day it launches.",
  },
  {
    q: "Will it feel impersonal to our patients?",
    a: "A helpful reply within minutes at 9pm is the personal touch. The alternative is silence until the next morning. It also gives your team their evenings back, and lets them be present in the room with a patient instead of on a phone.",
  },
];

export const about = {
  mission:
    "ArkFlow exists to protect and grow the revenue that Singapore service businesses are quietly losing every day to slow replies, missed messages, no-shows and dormant follow-up.",
  positioning:
    "Most automation companies sell you software and leave. We build the path an enquiry takes from the first WhatsApp message to a confirmed appointment, and then we run it: watching what the system answered, what it escalated, and what it got wrong. We describe that as being a Revenue Operating Company, which is a phrase we made up for a simple idea. We operate the thing we built.",
  vision:
    "We are starting with Singapore aesthetic clinics and intend to be genuinely good at that before adding a second industry. A clinic has a specific shape: enquiries arrive on Instagram at 11pm, the consultation is the moment that matters, and the revenue is in the visit after this one. Learning one of those properly takes longer than learning five badly.",
  honesty: [
    { title: "We mark our claims", body: "Every claim we make internally is tagged as either something we have proven, something we recommend on reasoning, or an industry standard we are following. When we tell you which of those a promise is, that is where the answer comes from." },
    { title: "We don't publish numbers we haven't earned", body: "We are a young company and we are not going to pretend otherwise. There are no invented client counts, conversion rates or revenue figures on this site. Where a screen or a number is there to show you how something behaves, it is labelled illustrative in the interface itself." },
    { title: "Scope is agreed before it is built", body: "What your system does is written down and agreed with you before anyone builds anything. If something turns out to sit outside that, we raise it rather than quietly adding it or quietly dropping it." },
  ],
};

export const contact = {
  call: {
    title: "Book a discovery call",
    body: "Thirty minutes, no obligation. We map how an enquiry travels from first message to paid appointment, measure your current reply times, and show you where it stops. You keep the findings whether or not you work with us.",
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
    body: "The fastest way to reach us, and the same channel we build on.",
    href: WHATSAPP_URL,
  },
  /* `survey` removed 6 September 2026. It described a GoHighLevel survey
     iframe on /contact and claimed submissions landed in the CRM without
     depending on /api/enquiry. Neither was true any more: the embed
     component was deleted when the multi-step form became the single
     intake path, and nothing read this object. SURVEY_URL was deleted
     from lib/site.ts on 28 October 2026 once the survey URL was found
     to 404 along with the rest of the link.* subdomain. */
  email: { title: "Email", address: CONTACT_EMAIL },
  base: "Singapore · SGT business hours",
};

/**
 * `statement` REMOVED 17 October 2026. It read "Our first case studies
 * are being earned right now... we would rather show you an empty
 * page than an invented one" and was the lead of /case-studies while
 * that page was empty. The page is no longer empty — Khai Visuals is
 * published on it — so the line had become false, and a false line
 * left in the content file is the drift this repo exists to prevent.
 *
 * `promise` STAYS, and is now rendered beneath the first case study
 * published under it. The standard did not change; only the page did.
 * The case study itself lives in lib/case-studies.ts, which has its
 * own rule about what a published figure must carry.
 */
export const caseStudies = {
  promise: [
    "Real response-time numbers, before and after",
    "Booking and retention improvements, measured from the client's own data",
    "Published with the client's sign-off, or not at all",
  ],
};
