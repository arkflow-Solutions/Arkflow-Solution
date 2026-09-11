/**
 * /what-we-build — the engagement.
 *
 * ROUTE. This page was /packages. It moved to /what-we-build on
 * 11 September 2026: the navigation has labelled it "What we build"
 * since 7 September precisely because ArkFlow does not sell fixed
 * packages, and a URL that said /packages contradicted the label's own
 * reason for existing. /packages redirects here permanently — see
 * next.config.js. This file replaces lib/packages-content.ts.
 *
 * THE PAGE'S ONE QUESTION. "What would working with ArkFlow actually
 * involve — what do you build, what do you keep running, and where is
 * the line?" Not a third capability list:
 *   /attract    the front door and the guided website journey
 *   /solutions  what happens to one opportunity after it arrives
 *   here        what ArkFlow builds and operates as an engagement
 *
 * WHAT WAS REMOVED, AND WHY. The previous page listed 23 deliverables
 * under three capitalised, numbered "layers" — which read as three
 * packages to choose between, the tier ladder the rebuild existed to
 * remove, and duplicated /attract and /solutions almost line for line.
 * The same ground is now three zones of one scoped plan, each described
 * in a sentence rather than a list.
 *
 * THE VISUAL GRAMMAR IS A PLAN VIEWED FROM ABOVE. Inside the boundary:
 * what ArkFlow builds and operates. Outside it: what ArkFlow does not
 * do. Every zone carries two registers — BUILD and OPERATE — because
 * the operating relationship is the most differentiated thing ArkFlow
 * offers and it used to be a footnote under the third layer.
 *
 * HARD CONSTRAINTS — do not relax when editing:
 *  · NO PRICING. No figures, ranges, anchors or "from".
 *  · NO PACKAGE OR TIER NAMES, and the zones must never be presented as
 *    three things a client buys separately.
 *  · NO GUARANTEES, CONTRACT TERMS OR DELIVERY COMMITMENTS. No durations,
 *    no cadences, no "live in X days", no "at any hour".
 *  · NOTHING ABOVE ITS CLASSIFICATION. Invoice and payment automation
 *    and the AI Voice Agent are not current. The assistant is described
 *    as configured, with a person behind it — never as a voice product.
 *  · CHANNELS ARE CONDITIONAL. Do not enumerate channels here, and never
 *    present WhatsApp or any other channel as unconditional: what can be
 *    connected depends on the implementation.
 *  · NO FABRICATED PROOF, AND NO UNSUPPORTED GENERALISATIONS. The
 *    previous page said "most revenue is lost after the enquiry" and
 *    "this is the layer most businesses are missing". Neither was
 *    supportable and both are gone. Describe ArkFlow, not the market.
 *
 * THREE BOUNDARY STRINGS ARE SHARED GOVERNANCE, and match their
 * wording on other pages exactly:
 *  · outside[0] — "ArkFlow does not run or manage paid advertising"
 *                 (also /solutions).
 *  · outside[1] — the v1.4 §19 SEO boundary (also /attract).
 *  · outside[3] — the clinical safety boundary (also /solutions).
 *
 * The string "revenue-operations" is also an Insights category slug in
 * lib/insights/categories.ts. That is an unrelated namespace; this file
 * does not use it as an id, so nothing here can collide with it.
 */

/* ------------------------------------------------------------ HERO */

export const wwbHero = {
  eyebrow: "What we build",
  title: "What we build depends on how your business actually works.",
  lead: "ArkFlow doesn't sell fixed software packages. We look at how enquiries, bookings and customers move through your business today, scope the system it actually needs, build it, and keep it running with you.",
  note: "Pricing is quoted after a discovery call. A system scoped around your business cannot honestly be priced before anyone has looked at it.",
  primaryCta: "Book a Discovery Call",
} as const;

/* -------------------------------------------------------- THE PLAN */

export const plan = {
  eyebrow: "The scope",
  title: "One system, drawn around your business.",
  boundaryLabel: "Scope",
  legend: {
    build: {
      label: "Build",
      body: "Scoped, designed, configured and connected.",
    },
    operate: {
      label: "Operate",
      body: "Run, watched and refined with you.",
    },
  },
  /**
   * Three zones of ONE plan. Not packages, not tiers. Each is a sentence
   * in each register — the capability detail lives on /attract and
   * /solutions, and is linked rather than repeated.
   */
  zones: [
    {
      index: "01",
      name: "Customer experience",
      title: "The front door.",
      build:
        "The website and the paths into the business — built to lead somewhere, and connected to what sits behind it.",
      operate:
        "Kept in step with the business as it changes, so the front door and the system behind it never drift apart.",
      href: "/attract",
      hrefLabel: "The website work",
    },
    {
      index: "02",
      name: "Revenue infrastructure",
      title: "Where an enquiry becomes actionable.",
      build:
        "Capture from the channels you use, where they can be connected. A configured assistant with a person behind it, qualification, booking, and one record per customer.",
      operate:
        "Tuned against real conversations — what the assistant answers, when it hands over, how bookings land.",
      href: "/solutions",
      hrefLabel: "What happens to an enquiry",
    },
    {
      index: "03",
      name: "Revenue operations",
      title: "What keeps it moving.",
      build:
        "Follow-up, retention and reactivation on rules you approve, with reporting against your own stages.",
      operate:
        "Refined with you over time, where the reporting shows people being lost.",
      /* Plain /solutions, not /solutions#automation. A cross-page hash
         currently lands at the top of the page — smooth-scroll.tsx has
         no on-load hash handling (deferred, see lib/solutions-content.ts)
         — so a deep link here would be a new instance of a known bug. */
      href: "/solutions",
      hrefLabel: "The follow-up in detail",
    },
  ],
  /**
   * Outside the line. Stated plainly, not defensively: knowing where the
   * system ends is what makes everything inside it credible.
   */
  outsideLabel: "Outside the line",
  outside: [
    {
      name: "Paid advertising",
      /* Shared governance string — matches /solutions. */
      body: "ArkFlow does not run or manage paid advertising. We connect the platforms you already use, so the source travels with the customer.",
    },
    {
      name: "SEO as a service",
      /* v1.4 §19 boundary — matches /attract verbatim. */
      body: "ArkFlow does not currently offer SEO as an ongoing service, and does not make ranking or traffic claims.",
    },
    {
      name: "Custom software",
      body: "We configure and operate proven platforms into one system. A bespoke application needs a different partner, and we will say so.",
    },
    {
      name: "Clinical or professional advice",
      /* Clinical safety boundary — matches /solutions verbatim. */
      body: "In a clinical setting the assistant never gives medical advice, never makes outcome claims and never quotes outside your approved price list.",
    },
    {
      name: "Your content and claims",
      body: "Messages, offers and claims are written and approved by you. We build what delivers them.",
    },
  ],
} as const;

/* ------------------------------------------------ BUILD, THEN RUN */

export const operating = {
  eyebrow: "Build, then operate",
  title: "We don't configure it and leave.",
  body: "A system is only as good as how it is run. So ArkFlow keeps running it with you — watching what it does, refining what it says, and changing it as the business changes. That operating relationship is the difference between software and a system.",
} as const;

/* ---------------------------------------- HOW THE LINE GETS DRAWN */

/**
 * Presented as the plan's title block — the corner of an architectural
 * drawing that records how it was made — rather than as a four-step
 * timeline. The scope boundary above is literally what the Scope step
 * produces.
 */
export const titleBlock = {
  eyebrow: "How the line gets drawn",
  rows: [
    { label: "Discovery", value: "How enquiries reach you today, and where they stop." },
    { label: "Scope", value: "Which parts of the plan you need, agreed in writing." },
    { label: "Quote", value: "Priced against that scope. There is no price list." },
    { label: "Build and operate", value: "Implemented, tested against your real services, then run with you." },
  ],
  note: "Fees, duration and every other commercial term are set out in the Order Form and the Master Service Agreement, not on this page.",
} as const;

/* -------------------------------------------------------- ACTION */

export const wwbCta = {
  title: "Start with how your business actually works.",
  body: "A discovery call is where the scope begins — which parts of the plan your business needs, and which it does not.",
  primary: "Book a Discovery Call",
  secondaryLabel: "See what happens to an enquiry",
  secondaryHref: "/solutions",
} as const;
