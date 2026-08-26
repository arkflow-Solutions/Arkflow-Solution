/**
 * /solutions — one page, six anchored sections (approved sitemap).
 *
 * GOVERNANCE:
 *  - Tier labels must match the Canonical Package Specification as
 *    amended by AMENDMENTS-v1.1 and v1.3. Voice AI is Scale-only;
 *    RenewalRadar is Operate and above; recall and ad-source tracking
 *    are on every level.
 *  - No prices anywhere (Amendment 2).
 *  - Delivery windows are commitments, never measured performance.
 *  - Reporting is a supporting capability, not the reason to buy.
 *  - No claim that any advertising platform is integrated.
 */

export type SolutionSection = {
  id: string;
  nav: string;
  eyebrow: string;
  title: string;
  lead: string;
  items: { name: string; tier: string; body: string }[];
  note?: string;
};

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
        tier: "Every level",
        body: "WhatsApp, Instagram, TikTok, Messenger, Telegram, SMS, email and website enquiries land in one place, against one customer record — so the history is already there when someone opens it.",
      },
      {
        name: "Professional website",
        tier: "Scale",
        body: "A fast, credible site built to produce enquiries and feed them straight into the same system, rather than into a form nobody checks. Delivered within 10 business days.",
      },
      {
        name: "Lead source captured",
        tier: "Every level",
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
        tier: "Every level",
        body: "Replies to new enquiries in your own voice, at any hour, and asks the questions that turn a message into something your team can act on — what they want, when, and how urgent.",
      },
      {
        name: "AI Voice Agent",
        tier: "Scale",
        body: "Picks up inbound calls when your team is with a customer. Handles hours, location, common questions, bookings and reschedules — and hands the call over the moment it stops being routine. Designed to answer within two rings.",
      },
      {
        name: "Escalation to a person",
        tier: "Every level",
        body: "Anything sensitive, anything requiring judgement, and anything where the customer asks for a human goes to your team immediately.",
      },
    ],
    note: "In a clinical setting the assistant never gives medical advice, never makes outcome claims and never quotes outside your approved price list.",
  },
  {
    id: "booking",
    nav: "Booking & payments",
    eyebrow: "Getting to the appointment",
    title: "The booking gets made. The invoice chases itself.",
    lead: "Two of the three jobs that quietly consume a service business, handled without anyone remembering to do them.",
    items: [
      {
        name: "BookingBot",
        tier: "Operate and above",
        body: "Booking, rescheduling and cancellation over messaging, synced to your calendar — with confirmations, 24-hour and 2-hour reminders, and a follow-up sequence when someone does not show.",
      },
      {
        name: "InvoiceFlow",
        tier: "Operate and above",
        body: "Invoices generated and delivered on the right trigger, then a reminder chain that runs on its own, with an escalation to you if it is still unpaid. Payment collected without a single chasing message from your team.",
      },
    ],
  },
  {
    id: "automation",
    nav: "Automation",
    eyebrow: "What keeps moving",
    title: "The follow-up that does not depend on memory.",
    lead: "Almost every leak in a service business is something that should have been sent and wasn't.",
    items: [
      {
        name: "Follow-up sequences",
        tier: "Every level",
        body: "An enquiry that goes quiet gets followed up on a schedule, in a way that reads like a person wrote it, until it is either answered or closed.",
      },
      {
        name: "Reminders and no-show recovery",
        tier: "Operate and above",
        body: "Confirmations and reminders before the appointment, and a recovery sequence afterwards for the ones that still slipped.",
      },
      {
        name: "Review requests",
        tier: "Every level",
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
        tier: "Every level",
        body: "Every contact visible on one pipeline — new, contacted, qualified, booked, won, lost. No lead exists only in somebody's phone.",
      },
      {
        name: "Customer journey",
        tier: "Every level",
        body: "What they asked, what they were quoted, what they booked, what they paid and when they last came in — held together rather than scattered.",
      },
      {
        name: "Smart lists",
        tier: "Every level",
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
        tier: "Every level",
        body: "Enquiry volume, response time and conversion — expanded on Operate to cover bookings, no-shows and payment, and on Scale to cover website and voice.",
      },
      {
        name: "Ad source tracking",
        tier: "Every level",
        body: "Connect your Facebook, Instagram, Google Ads and TikTok accounts and the lead source travels with the customer — into the same record as the conversation, the booking and the payment. One dashboard rather than four tabs and a spreadsheet.",
      },
      {
        name: "Monthly strategy call",
        tier: "Scale",
        body: "Thirty minutes on your own numbers, and what to change next.",
      },
    ],
    note: "What each platform reports back varies, and ArkFlow connects what they expose rather than replacing the native ad managers. ArkFlow does not run or manage paid advertising — it shows you which of yours is working.",
  },
];
