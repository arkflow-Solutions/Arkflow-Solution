/**
 * How an ArkFlow engagement is structured, and a sample of what the
 * Revenue Leak Audit produces.
 *
 * ────────────────────────────────────────────────────────────────
 * TWO THINGS IN THIS FILE ARE NOT REAL AND MUST STAY MARKED
 *
 * 1. EVERY PRICE IS A PLACEHOLDER. `[PRICE RANGE — …]` strings render
 *    on the page exactly as written. The founder has not supplied
 *    numbers, and verify.mjs check 3 forbids publishing a price list
 *    anyway (Amendment 2). Replace the placeholder with a range only
 *    if the governance position on pricing changes too — do not quietly
 *    put a number here and leave the check in place.
 *
 * 2. THE SAMPLE AUDIT IS INVENTED DATA, LABELLED AS SUCH. Every figure
 *    in `sampleAudit` is illustrative and is rendered inside an
 *    "Illustrative" marker. It exists so a visitor can see the SHAPE of
 *    the deliverable before booking. It is not a client, it is not an
 *    average, and it must never be described as either. If a real
 *    audit is ever published it needs the client's written sign-off and
 *    belongs in lib/case-studies.ts, which has its own rules.
 * ────────────────────────────────────────────────────────────────
 */

export const engagementIntro = {
  eyebrow: "How engagements work",
  title: "Setup, then a monthly fee to operate it.",
  lead: "Two parts, and we quote both before anything starts. There is no fixed package list, because the scope depends on how many channels you run and how much of your booking already works.",
};

export type EngagementPart = {
  label: string;
  title: string;
  price: string;
  includes: string[];
  note: string;
};

export const engagementParts: EngagementPart[] = [
  {
    label: "One-off",
    title: "Build and launch",
    /* PLACEHOLDER — see the header. Rendered literally. */
    price: "[PRICE RANGE — one-off setup]",
    includes: [
      "Revenue Leak Audit on your own numbers, before anything is scoped",
      "Enquiry-to-booking flow mapped across every channel you run",
      "WhatsApp Business API registration on your own Meta account",
      "Message templates written by you, submitted and approved",
      "The system built against your real services, not a demo",
      "Staff testing, then a soft launch on one channel before the rest",
    ],
    note: "Scope depends on how many channels and locations you run, and whether you already have a CRM worth building on.",
  },
  {
    label: "Monthly",
    title: "Operate and tune",
    price: "[PRICE RANGE — monthly operation]",
    includes: [
      "We run the system, not just hand it over",
      "Weekly review of what the automation answered and what it escalated",
      "Template and sequence changes as your services change",
      "Response and booking numbers reported monthly from your own data",
      "A named person who answers when something looks wrong",
    ],
    note: "Platform and messaging costs (WhatsApp conversation fees, CRM subscription) are billed to your own accounts, not marked up through us.",
  },
];

export const engagementTimeline = {
  title: "A realistic first month",
  /* PROCESS, NOT A PROMISE. The delivery guarantees were retired in
     September 2026 and nothing here reinstates one. "Usually" is doing
     real work in these lines — leave it in. */
  note: "Typical, not guaranteed. The pace is usually set by how quickly treatment wording gets approved on your side.",
  weeks: [
    {
      week: "Week 1",
      title: "Audit and mapping",
      body: "We measure how your enquiries are answered today, across every channel, and map where they stop. You get the findings whether or not the engagement continues.",
    },
    {
      week: "Week 2",
      title: "Wording and build",
      body: "You approve what the system is allowed to say. We build against your real service list, your real availability and your real booking rules.",
    },
    {
      week: "Week 3",
      title: "Your team breaks it",
      body: "Staff test it as if they were patients, including the awkward questions. Everything that should reach a human gets checked that it does.",
    },
    {
      week: "Week 4",
      title: "Soft launch, one channel",
      body: "Live on a single channel with a person watching every conversation. We widen it once a week of real messages has gone through cleanly.",
    },
  ],
};

/**
 * A sample Revenue Leak Audit. ILLUSTRATIVE — see the file header.
 * Every number below is made up to show the format.
 */
export const sampleAudit = {
  title: "What the audit actually gives you",
  lead: "A short document, not a sales deck. Here is the shape of one, with illustrative numbers in place of a real clinic's.",
  subject: "Illustrative clinic · 2 locations · 4 enquiry channels",
  findings: [
    {
      channel: "WhatsApp",
      measured: "Median first reply: 3 h 40 m",
      after: "After 7pm: next morning",
      note: "Highest-volume channel and the slowest to answer.",
    },
    {
      channel: "Instagram DM",
      measured: "Median first reply: 9 h 12 m",
      after: "Weekend: Monday",
      note: "Checked by whoever is free, so nobody owns it.",
    },
    {
      channel: "Website form",
      measured: "Median first reply: 1 h 05 m",
      after: "After 7pm: next morning",
      note: "Goes to a shared mailbox; two of six test enquiries got no reply at all.",
    },
    {
      channel: "Phone (missed)",
      measured: "No callback on 4 of 9",
      after: "Not logged anywhere",
      note: "Missed calls leave no record, so they cannot be followed up.",
    },
  ],
  sections: [
    "Where enquiries enter, and which of those entry points nobody owns",
    "Measured first-reply time per channel, in and out of hours",
    "The three points where the most enquiries stop moving",
    "What could be answered automatically, and what must stay with your team",
    "What we would do first, and what we would deliberately leave alone",
  ],
  footnote:
    "Figures above are illustrative and do not describe any client. A real audit measures your own enquiries, sent by us, during and outside your working hours.",
};
