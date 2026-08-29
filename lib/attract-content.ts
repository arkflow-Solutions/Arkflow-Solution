/**
 * /attract — website work as the first stage of the canonical journey.
 *
 * GOVERNING SOURCE: Canonical Package Specification v1.4, Amendment 8
 * (locked 28 August 2026). Every commercial claim on this page traces to
 * a numbered section of that document. No new commercial assumptions.
 *
 * HARD CONSTRAINTS — do not relax when editing:
 *  · NO PRICING. Not S$288 / S$2,880 / S$4,880 / S$380 / S$188, no "from",
 *    no ranges, no anchors, nothing in metadata or structured data. (v1.4 §5)
 *  · NO SEO AS A SERVICE. Technical foundations may be described only as
 *    properties of a properly built site, never as an offering. (v1.4 §19)
 *  · SCALE IS NOT WEAKENED. The standalone offer is never "starter",
 *    "entry-level", "lite", "cheap", "trial" or an alternative. (v1.4 §15)
 *  · NO CAPACITY SCARCITY. The 2-project/month limit is internal and must
 *    not appear as slots, counters or urgency. (v1.4 §13)
 *  · NO FABRICATED PROOF. No clients, results, traffic, rankings, revenue,
 *    leads, conversion rates or project volume. (v1.4 §20)
 *  · NO NEW FRAMEWORK. ATTRACT is stage one of the existing six-stage
 *    canonical journey, not a new model. (v1.4 §21)
 */

export const attractHero = {
  eyebrow: "Attract · Stage one",
  title: "Get discovered. Build the front door.",
  titleAccent: "Turn attention into enquiries.",
  lead: "A website is the first stage of the customer journey, not a brochure that sits beside it. ArkFlow can build that front door on its own — or as part of the system it opens into.",
  primaryCta: "Get a Website Review",
  secondaryCta: "Book a discovery call",
} as const;

/** The problem. Kept to one idea, per the site-wide copy discipline. */
export const attractProblem = {
  eyebrow: "The problem",
  title: "A website that looks right and still loses the enquiry.",
  lead: "Most underperforming websites are not ugly. They are unclear about what the visitor should do next, slow on the phone where most people actually arrive, and disconnected from whatever happens after someone gets in touch.",
  symptoms: [
    "Visitors arrive, read, and leave without a reason to make contact",
    "The enquiry form goes to an inbox nobody watches on a Saturday",
    "It reads well on a laptop and awkwardly on the phone",
    "Nothing records where the enquiry came from",
    "The site says nothing about what happens after someone enquires",
  ],
  close: "None of that is a design problem. It is a journey problem that happens to be visible on a website.",
} as const;

/**
 * The fork. This is the page's load-bearing section — the standalone /
 * Scale distinction from v1.4 §15, stated without weakening Scale.
 */
export const attractFork = {
  eyebrow: "Two ways to do this",
  title: "The front door, or the front door and everything behind it.",
  lead: "Both are real engagements. Which one is right depends on what you need working, not on budget.",
  options: [
    {
      id: "standalone",
      label: "Website on its own",
      promise: "We build the front door.",
      body: "A one-time engagement. You get a website built properly — designed around how customers actually decide, quick on a phone, with the enquiry landing somewhere you will see it.",
      note: "Built so it can connect to a CRM and follow-up system later without rebuilding the site.",
    },
    {
      id: "scale",
      label: "Website inside ArkFlow Scale",
      promise: "We build the front door and everyone behind it.",
      body: "The website, plus the system it opens into: every channel in one inbox, replies that go out whether or not anyone is free, booking, invoicing, follow-up, reactivation, and a voice agent for the calls your team cannot take.",
      note: "The complete revenue system. The website is one component of it.",
      href: "/packages#scale",
      hrefLabel: "See what Scale includes",
    },
  ],
} as const;

/** Website Build — scope exactly as approved at v1.4 §2. */
export const websiteBuild = {
  eyebrow: "Website Build",
  title: "A new website, built as the first stage of the journey.",
  lead: "For businesses with no website, or one being replaced outright.",
  includes: [
    { label: "Strategy and sitemap", body: "What the site is for, and what each page has to do." },
    { label: "Customer-journey mapping", body: "Who arrives on which page, and what they need before they will make contact." },
    { label: "UI design", body: "In your brand where you have one, in the ArkFlow design language where you do not." },
    { label: "Development and performance", body: "Built to load quickly rather than to look impressive on a fast connection." },
    { label: "Mobile optimisation", body: "Designed for the phone first, because that is where most people will see it." },
    { label: "Conversion structure", body: "What the visitor is asked to do on each page, and why they would do it." },
    { label: "Enquiry form and WhatsApp routing", body: "The enquiry reaches you on the channel you actually answer." },
    { label: "Analytics", body: "Installed and configured, so you can see what people do rather than guess." },
  ],
  /**
   * v1.4 §19 — permitted framing only. Describes properties of a
   * well-built site. Must never read as an ongoing service.
   */
  foundations: {
    title: "Built with the technical foundations search engines expect.",
    body: "Semantic structure, unique page titles and descriptions, canonical URLs, a sitemap, social metadata, image alt text, sensible internal linking and a site that is fast and indexable. These are properties of a website built correctly, in the way that working links are.",
    boundary: "ArkFlow does not currently offer SEO as an ongoing service, and does not make ranking or traffic claims.",
  },
} as const;

/** Website Revamp — v1.4 §3. The diagnostic philosophy is the point. */
export const websiteRevamp = {
  eyebrow: "Website Revamp",
  title: "Your website may not need replacing. It may need rebuilding properly.",
  lead: "For a site that exists and underperforms. Every revamp starts with a review, because the honest answer is sometimes that less work is needed than you expected — or that the website is not the problem at all.",
  verdicts: [
    {
      name: "Optimise",
      body: "The structure is sound. We fix the conversion path, the copy and the performance in place.",
    },
    {
      name: "Redesign",
      body: "The structure is sound but the site looks and feels older than the business does. We rebuild the visual and experience layer.",
    },
    {
      name: "Rebuild",
      body: "The foundation cannot carry the work. At that point it becomes a Website Build, and we say so before you commit to anything.",
    },
  ],
  /**
   * v1.4 §3 mandatory finding. This is a governance requirement, not a
   * positioning flourish — do not soften or remove it.
   */
  honesty: {
    title: "Sometimes the website is not the problem.",
    body: "If the review finds that traffic arrives and converts, but enquiries are answered slowly or not at all, we will tell you that — and point you at a Lead Response Audit instead of selling you a website you do not need.",
    ctaLabel: "About the Lead Response Audit",
    href: "/how-it-works",
  },
} as const;

/** Website Review — v1.4 §4. Mandatory before any Revamp. Never "free". */
export const websiteReview = {
  eyebrow: "Website Review",
  title: "Start by finding out what is actually wrong.",
  lead: "A paid review of your existing website. It is required before any revamp, because quoting a rebuild without looking properly is guesswork.",
  examines: [
    "Design",
    "Customer journey",
    "Conversion experience",
    "Mobile experience",
    "Performance",
    "Technical foundations",
  ],
  output: "You get a written verdict — optimise, redesign or rebuild — with the reasoning behind it.",
  credit: "If you proceed with a build or revamp, the review fee is credited in full against it.",
  /** v1.4 §4 — distinct artifact from the Lead Response Audit. */
  distinction: "This is a different thing from the Lead Response Audit, which measures how quickly enquiries to your business get answered. A business can genuinely need both.",
} as const;

/** Selected work — structure only. v1.4 §20: publication BLOCKED. */
export const selectedWork = {
  eyebrow: "Selected work",
  title: "Published once attribution and consent are settled.",
  body: "We will show work here when we can name who delivered it, under which entity, and with the client's written permission. Until then this space stays empty rather than being filled with something that implies a track record we have not yet earned.",
} as const;

/** How the engagement runs. v1.4 §9 — the parallel six-step path. */
export const websiteProcess = {
  eyebrow: "How it runs",
  title: "Six steps, and you know where you stand at each one.",
  steps: [
    { name: "Review", body: "We look at what exists and return a verdict, or start from strategy if there is nothing yet." },
    { name: "Strategy", body: "What the site is for, who it speaks to, and what each page has to accomplish." },
    { name: "Design", body: "The visual and experience layer, agreed before anything is built." },
    { name: "Build", body: "Development, mobile, performance, enquiry routing and analytics." },
    { name: "Launch", body: "Live, tested on real devices, with the enquiry path checked end to end." },
    { name: "Handover", body: "Documentation and access, so you are never locked out of your own website." },
  ],
  /** v1.4 §9 — commitments, never performance claims. */
  commitment: "Delivery timelines are agreed in the quotation and committed to in writing. We give you a start date we can keep rather than the earliest one you would like to hear.",
} as const;

/** The upgrade path, stated as continuity rather than as a sales hook. */
export const attractContinuity = {
  eyebrow: "What happens next",
  title: "A website that can become part of a system later.",
  body: "Every website we build is put together so its enquiry form, WhatsApp routing and analytics can be connected to a CRM, automated follow-up and reporting later — without rebuilding the site to do it. If you never take that step, you still have a website that works. If you do, you are not starting again.",
  journey: ["Attract", "Engage", "Qualify", "Book", "Convert", "Retain"],
  journeyNote: "Website work sits at Attract, the first stage of how ArkFlow thinks about the whole customer journey.",
} as const;

/** v1.4 §14 — eligibility widened for this line only. Packages stay Stage 1. */
export const attractEligibility = {
  title: "Who this is for",
  body: "Singapore service businesses where an enquiry turns into a consultation, an appointment and then a returning customer. Aesthetic clinics are our current commercial focus, and the rest of the ArkFlow system is built around them — but website work is not limited to one industry.",
} as const;

export const attractCta = {
  title: "Send us your website.",
  body: "We will look at the design, the customer journey, the conversion experience and the technical foundations, and tell you whether it needs optimising, redesigning or rebuilding.",
  primary: "Get a Website Review",
  secondary: "Book a discovery call",
  /** Pre-filled so the first message carries its own context. */
  whatsappPrefill:
    "Hi ArkFlow — I'd like a Website Review. My website is: ",
} as const;
