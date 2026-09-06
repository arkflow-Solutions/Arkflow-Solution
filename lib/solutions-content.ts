/**
 * /solutions — one page, six anchored sections (approved sitemap).
 *
 * TIER 2A, 6 September 2026 — public positioning cleanup.
 *
 * WHAT CHANGED AND WHY:
 *
 *  - The tier ladder is gone. Items were labelled "Every level",
 *    "Operate and above" and "Scale". Those are superseded package
 *    names and must not appear on a public surface, so the field is now
 *    `availability` and carries a factual capability grouping instead.
 *    No replacement tier was invented.
 *
 *  - "BookingBot" and "InvoiceFlow" are removed. Neither is an approved
 *    public product name. Booking is described functionally, because
 *    ArkFlow does ship it. Invoicing is not described at all, because
 *    invoice and payment automation is classified FUTURE, and renaming
 *    it functionally would still claim a capability above its
 *    classification.
 *
 *  - "AI Voice Agent" is removed. It is IN DEVELOPMENT / VALIDATION,
 *    not a shipped product, and /solutions describes what a client
 *    actually receives today.
 *
 *  - Delivery commitments are removed ("within 10 business days").
 *    Timelines are agreed per engagement, not published.
 *
 * GOVERNANCE:
 *  - No prices, packages, tiers or guarantees anywhere.
 *  - Nothing above its capability classification. Current only.
 *  - No claim that any advertising platform is managed by ArkFlow.
 *  - Reporting is a supporting capability, not the reason to buy.
 */

export type SolutionSection = {
  id: string;
  nav: string;
  eyebrow: string;
  title: string;
  lead: string;
  /**
   * Factual capability grouping. NOT a package, tier or plan.
   *   "Current capability"       — shipped and operating today.
   *   "Implementation-dependent" — shipped, but scoped per engagement.
   */
  items: { name: string; availability: string; body: string }[];
  note?: string;
};

const CURRENT = "Current capability";
const SCOPED = "Implementation-dependent";

export const solutionSections: SolutionSection[] = [
  {
    id: "inbox",
    nav: "Unified inbox",
    eyebrow: "Where it arrives",
    title: "Every way in, one place to look.",
    lead: "A customer picks the channel. Your team should not have to follow them across six apps to keep up.",
    items: [
      {
        name: "Unified inbox",
        availability: CURRENT,
        body: "WhatsApp, Instagram, TikTok, Messenger, Telegram, SMS, email and website enquiries land in one place, against one customer record — so the history is already there when someone opens it.",
      },
      {
        name: "Professional website",
        availability: SCOPED,
        body: "A fast, credible site built to produce enquiries and feed them straight into the same system, rather than into a form nobody checks.",
      },
      {
        name: "Lead source captured",
        availability: CURRENT,
        body: "Where the enquiry came from is recorded with the enquiry itself, so the answer to \"what is actually working\" is not a guess.",
      },
    ],
  },
  {
    id: "ai",
    nav: "AI assistants",
    eyebrow: "Who answers",
    title: "Answered straight away, handed over when it matters.",
    lead: "The assistant handles what is routine. A person handles what is not. The line between the two is set by you, not by us.",
    items: [
      {
        name: "Digital assistant",
        availability: CURRENT,
        body: "Replies to new enquiries in your own voice, at any hour, and asks the questions that turn a message into something your team can act on — what they want, when, and how urgent.",
      },
      {
        name: "Lead qualification",
        availability: CURRENT,
        body: "The conversation establishes what the enquiry is actually for and how ready it is, and the customer record reflects it — so your team opens a qualified opportunity rather than an unread message.",
      },
      {
        name: "Escalation to a person",
        availability: CURRENT,
        body: "Anything sensitive, anything requiring judgement, and anything where the customer asks for a human goes to your team immediately.",
      },
    ],
    note: "In a clinical setting the assistant never gives medical advice, never makes outcome claims and never quotes outside your approved price list.",
  },
  {
    id: "booking",
    nav: "Booking",
    eyebrow: "Getting to the appointment",
    title: "The booking gets made, without anyone chasing it.",
    lead: "One of the jobs that quietly consumes a service business, handled without anyone having to remember to do it.",
    items: [
      {
        name: "Appointment booking and scheduling",
        availability: CURRENT,
        body: "Booking, rescheduling and cancellation over messaging, synced to your calendar — with confirmations, 24-hour and 2-hour reminders, and a follow-up sequence when someone does not show.",
      },
    ],
  },
  {
    id: "automation",
    nav: "Automation",
    eyebrow: "What keeps moving",
    title: "The follow-up that does not depend on memory.",
    lead: "Almost every leak in a service business is something that should have been sent and was not.",
    items: [
      {
        name: "Follow-up sequences",
        availability: CURRENT,
        body: "An enquiry that goes quiet gets followed up on a schedule, in a way that reads like a person wrote it, until it is either answered or closed.",
      },
      {
        name: "Reminders and no-show recovery",
        availability: CURRENT,
        body: "Confirmations and reminders before the appointment, and a recovery sequence afterwards for the ones that still slipped.",
      },
      {
        name: "Retention and reactivation",
        availability: CURRENT,
        body: "Customers who are due get a personalised message on a rule you set, and customers who have gone quiet are surfaced before they are gone for good — revenue that was already earned once.",
      },
      {
        name: "Review requests",
        availability: CURRENT,
        body: "Asked at the point a customer is most likely to say yes, rather than whenever someone gets round to it.",
      },
    ],
  },
  {
    id: "crm",
    nav: "CRM & journey",
    eyebrow: "What is remembered",
    title: "One record per customer, for as long as they are a customer.",
    lead: "Not a database anyone has to maintain by hand. The record fills itself as the conversation happens.",
    items: [
      {
        name: "CRM and pipeline",
        availability: CURRENT,
        body: "Every contact visible on one pipeline — new, contacted, qualified, booked, won, lost. No lead exists only in somebody's phone.",
      },
      {
        name: "Customer journey",
        availability: CURRENT,
        body: "What they asked, what they were quoted, what they booked and when they last came in — held together rather than scattered.",
      },
      {
        name: "Smart lists",
        availability: CURRENT,
        body: "The enquiries that came in this week, the ones that have gone three days without a reply, and the ones worth calling today.",
      },
    ],
  },
  {
    id: "reporting",
    nav: "Reporting",
    eyebrow: "What you can see",
    title: "Reporting is the instrument panel, not the engine.",
    lead: "Every platform already reports on itself. The problem is that understanding your business means opening all of them and doing the joining in your head.",
    items: [
      {
        name: "Monthly performance report",
        availability: CURRENT,
        body: "Enquiry volume, response time, bookings, no-shows and conversion — read against the stages of your own revenue engine rather than platform by platform.",
      },
      {
        name: "Ad source tracking",
        availability: SCOPED,
        body: "Connect your Facebook, Instagram, Google Ads and TikTok accounts and the lead source travels with the customer — into the same record as the conversation and the booking. One dashboard rather than four tabs and a spreadsheet.",
      },
      {
        name: "Monthly strategy call",
        availability: CURRENT,
        body: "Thirty minutes on your own numbers, and what to change next.",
      },
    ],
    note: "What each platform reports back varies, and ArkFlow connects what they expose rather than replacing the native ad managers. ArkFlow does not run or manage paid advertising — it shows you which of yours is working.",
  },
];
