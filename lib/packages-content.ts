/**
 * /packages — what ArkFlow can build and operate for a business.
 *
 * REBUILT 7 September 2026. The original /packages route was deleted in
 * the v3 build because it published the Respond / Operate / Scale tier
 * ladder and the 30-Day Response Guarantee. Its *structure* was sound —
 * a comparison, explicit boundaries, plain terms — and that structure is
 * what returns here. None of its commercial content does.
 *
 * WHAT THIS PAGE IS FOR
 * One question: "what can ArkFlow actually build for my business?" It is
 * a scope-of-engagement page, not a pricing page.
 *
 * THE LAYERS ARE NOT PRODUCTS. Digital Experience, Revenue Infrastructure
 * and Revenue Operations are conceptual groupings of the canonical engine
 * stages — a way to read the ten stages at a glance. They are NOT package
 * names, NOT tiers, and must never be sold as three things a client picks
 * between. Every engagement is scoped individually.
 *
 * HARD CONSTRAINTS — do not relax when editing:
 *  · NO PRICING. No figures, no ranges, no "from", nothing in metadata.
 *  · NO PACKAGE OR TIER NAMES. Respond / Operate / Scale are superseded.
 *  · NO GUARANTEE. The 30-Day Response Guarantee is not a current term.
 *  · NO CONTRACT TERMS. No minimum commitment, no notice period, no
 *    upgrade path. Those live in the signed Order Form, not on a website.
 *  · NO DELIVERY COMMITMENTS. No "live in X days".
 *  · NOTHING ABOVE ITS CLASSIFICATION. Invoice/payment automation and the
 *    AI Voice Agent are not current and must not appear as included.
 *  · NO FABRICATED PROOF. No clients, results or volumes.
 *
 * The canonical engine (Attract → Capture → Respond → Qualify → Book →
 * Convert → Follow Up → Retain → Reactivate → Grow) is the spine. Do not
 * reorder or rename a stage to make a layer look tidier.
 */

export const packagesHero = {
  eyebrow: "What we build",
  title: "One system, scoped to what your business actually needs.",
  lead: "ArkFlow does not sell fixed packages. Every engagement is scoped around how your business already operates, then quoted. What follows is the range of what can be built — and how the parts connect.",
  note: "Pricing is quoted after a discovery call, because a system configured around your business cannot honestly be priced before anyone has looked at it.",
} as const;

/**
 * The three layers, mapped onto the canonical engine. `stages` must
 * always reproduce the canonical wording exactly.
 */
export const packageLayers = [
  {
    id: "digital-experience",
    index: "01",
    name: "Digital Experience",
    stages: ["Attract"],
    promise: "The front door.",
    lead: "The website and the digital presence a customer meets first. Built as the first stage of the journey rather than a brochure beside it.",
    includes: [
      "Website build, or a review and revamp of an existing site",
      "Strategy, sitemap and customer-journey mapping",
      "UI design in your brand, or in the ArkFlow design language",
      "Mobile-first build, performance and technical foundations",
      "Conversion structure — what each page asks the visitor to do",
      "Enquiry form and WhatsApp routing",
      "Analytics installed and configured",
    ],
    note: "Can be a standalone engagement. Built so it can connect to the layers below later without rebuilding the site.",
    href: "/attract",
    hrefLabel: "See the website work",
  },
  {
    id: "revenue-infrastructure",
    index: "02",
    name: "Revenue Infrastructure",
    stages: ["Capture", "Respond", "Qualify", "Book"],
    promise: "What happens the moment someone gets in touch.",
    lead: "The enquiry arrives, gets answered, gets understood, and turns into something in the calendar — without depending on who happens to be free.",
    includes: [
      "Unified inbox across WhatsApp, Instagram, TikTok, Messenger, Telegram, SMS, email and web",
      "AI assistant that answers new enquiries in your voice, at any hour",
      "Escalation to a person the moment judgement is needed",
      "Lead qualification recorded against the customer",
      "Appointment booking and scheduling synced to your calendar",
      "Confirmations, reminders and no-show recovery",
      "CRM and pipeline — one record per customer",
      "Lead source captured with the enquiry",
    ],
    note: "This is the layer most businesses are missing. The enquiries already exist; what is absent is the system that catches them.",
    href: "/solutions",
    hrefLabel: "See the capabilities",
  },
  {
    id: "revenue-operations",
    index: "03",
    name: "Revenue Operations",
    stages: ["Convert", "Follow Up", "Retain", "Reactivate", "Grow"],
    promise: "The part that keeps working after the first sale.",
    lead: "Most revenue is lost after the enquiry, not before it. This layer is the follow-up, the retention and the reactivation that would otherwise depend on someone remembering.",
    includes: [
      "Follow-up sequences that run until an enquiry is answered or closed",
      "Personalised recall on a rule you set — a date, or time since the last visit",
      "Retention workflows for customers going quiet",
      "Reactivation of dormant customers",
      "Review requests at the point a customer is most likely to say yes",
      "Operational automation for repetitive internal work",
      "Monthly performance reporting against your own engine stages",
      "Monthly strategy call on your numbers",
    ],
    note: "ArkFlow operates this layer with you rather than handing it over and leaving. That operating relationship is the difference between software and a system.",
    href: "/solutions",
    hrefLabel: "See the capabilities",
  },
] as const;

/**
 * Boundaries. Carried forward from the original page, which was right to
 * have them: saying what ArkFlow does not do is what makes the rest
 * credible. Every line here is a current, accurate limit.
 */
export const packageBoundaries = {
  eyebrow: "Where the line is",
  title: "What ArkFlow does not do.",
  lead: "Being specific about this is cheaper for both of us than discovering it in month two.",
  items: [
    {
      title: "We do not generate demand",
      body: "ArkFlow does not run or manage paid advertising and does not buy traffic. We connect the ad platforms you already run so the lead source travels with the customer — what each platform reports back varies, and we connect what they expose rather than replacing the native ad managers.",
    },
    {
      title: "We do not offer SEO as a service",
      body: "A website we build carries the technical foundations search engines expect, because that is what building one properly means. That is not the same as an ongoing SEO engagement, and we make no ranking or traffic claims.",
    },
    {
      title: "We do not build custom software",
      body: "ArkFlow configures and operates proven platforms into one connected system. If what you need is a bespoke application, we are the wrong partner and will say so.",
    },
    {
      title: "We do not give clinical or professional advice",
      body: "In a clinical setting the assistant never gives medical advice, never makes outcome claims and never quotes outside your approved price list. Anything requiring judgement goes to your team.",
    },
    {
      title: "We do not invent your content",
      body: "Messages, offers and recall intervals are written and approved by you. ArkFlow builds the system that sends them at the right moment.",
    },
  ],
} as const;

/** How scoping actually works. Replaces the old "Terms, plainly". */
export const packageTerms = {
  eyebrow: "How this works",
  title: "Scoped, quoted, then built.",
  steps: [
    {
      name: "Discovery call",
      body: "Thirty minutes on how enquiries reach your business today, and where they stop. You leave with a view of your own customer journey whether or not you work with us.",
    },
    {
      name: "Scope",
      body: "We agree which layers you need and what is in each one, in writing, before anything is quoted.",
    },
    {
      name: "Quotation",
      body: "A personalised quotation against that scope. We do not publish a price list, because a system configured around your business does not have one.",
    },
    {
      name: "Build and operate",
      body: "We implement what was agreed, test it against your real services, and keep operating it with you afterwards.",
    },
  ],
  note: "Commercial terms — fees, duration and everything else — are stated in the Order Form and the Master Service Agreement, not on this page.",
} as const;

export const packagesCta = {
  title: "The scope depends on where your revenue is actually leaking.",
  lead: "A discovery call is the fastest way to find out which of these layers your business needs — and which it does not.",
  primary: "Book a Discovery Call",
  secondary: "See the capabilities",
  secondaryHref: "/solutions",
} as const;
