/**
 * /attract — the Website page, rewritten around one idea.
 *
 * THE THESIS: a website isn't where you put information, it's where you
 * guide a decision. The page has to behave that way, not argue it. So
 * this file is deliberately short: the previous version rendered 1,351
 * words, more than the entire eleven-scene homepage, because it
 * explained the philosophy in prose. The demonstration lives in the
 * components; what stays here is only what has to be read.
 *
 * SEVEN ENVIRONMENTS, in order:
 *   01 the premise · 02 the catalogue · 03 the re-staging
 *   04 the environments · 05 one pain, followed
 *   06 proof by restraint + what ArkFlow builds
 *   07 website → enquiry → response → qualification → booking → conversion
 *
 * GOVERNING SOURCE: Canonical Package Specification v1.4, Amendment 8
 * (locked 28 August 2026). scripts/verify.mjs walks every source file.
 *
 * HARD CONSTRAINTS — do not relax when editing:
 *  · NO PRICING. No figures, ranges, anchors or "from", anywhere,
 *    including metadata and structured data. (v1.4 §5)
 *  · NO SEO AS A SERVICE. Technical foundations may be described only as
 *    properties of a properly built site, never as an offering. (v1.4 §19)
 *  · NO PACKAGE OR TIER NAMES. Respond / Operate / Scale are superseded.
 *  · NOTHING ABOVE ITS CLASSIFICATION. Website work, lead capture, AI
 *    conversation, qualification, booking, CRM, follow-up, retention and
 *    reactivation are current. Invoice/payment automation and the AI
 *    Voice Agent are NOT.
 *  · NO CAPACITY SCARCITY. (v1.4 §13)
 *  · NO FABRICATED PROOF. No clients, results, traffic, rankings,
 *    revenue, leads, conversion rates or project volume. (v1.4 §20)
 *    This is why environment 06 builds confidence by showing the system
 *    decline a sale rather than by showing outcomes.
 *  · ATTRACT IS STAGE ONE of the canonical ten-stage Revenue Engine.
 *
 * TWO STRINGS ARE MANDATORY and must survive any future edit:
 *  · capability.honesty.body — the v1.4 §3 finding.
 *  · capability.boundary — the v1.4 §19 boundary.
 */

/* ------------------------------------------------ 01 · THE PREMISE */

export const attractHero = {
  /* Public label follows the navigation: "Website", not "Attract".
     The canonical stage key is unchanged — see lib/stage-labels.ts. */
  eyebrow: "Website · Stage one",
  title: "A website isn't where you put information.",
  titleAccent: "It's where you guide a decision.",
  lead: "What follows is that principle, working.",
  primaryCta: "Book a Discovery Call",
  secondaryCta: "Get a Website Review",
} as const;

/* ---------------------------------------------- 02 · THE CATALOGUE */

/**
 * The deliberately poor website.
 *
 * NEUTRAL BY INSTRUCTION. Generic labels only — no industry, no
 * treatment names, nothing that could resemble a real company. The
 * point being demonstrated is information architecture, not a sector.
 * "Pricing" here is a nav label in a fictional mockup, not an ArkFlow
 * price; v1.4 §5 prohibits figures, and there are none.
 */
export const catalogue = {
  eyebrow: "Most websites",
  nav: ["Home", "Services", "About", "Pricing", "FAQ", "Contact"],
  tiles: [
    "Service A",
    "Service B",
    "Service C",
    "Service D",
    "Service E",
    "Service F",
    "Service G",
    "Service H",
  ],
  title: "Everything, at equal weight.",
  body: "Nothing here is wrong. Nothing here helps, either. The visitor has to work out what matters on their own.",
  exit: "Left without enquiring",
} as const;

/* --------------------------------------------- 03 · THE RE-STAGING */

export const restaging = {
  line: "Same business. Same services. Arranged around the decision instead of the org chart.",
} as const;

/* -------------------------------------------- 04 · THE ENVIRONMENTS */

/**
 * The IKEA translation, demonstrated rather than explained.
 *
 * `intro` is two sentences on purpose. The analogy earns one line; the
 * rooms below it do the actual work. Each room names the question a
 * visitor actually arrives with, and surfaces one of the same tiles
 * from environment 02 — the products never changed, only the context.
 */
export const environments = {
  eyebrow: "One question at a time",
  intro: "A showroom does not hand you the catalogue. It walks you through rooms.",
  rooms: [
    {
      question: "Is this for someone like me?",
      surfaces: "Service B",
      body: "The others stay available. They stop competing.",
    },
    {
      question: "What actually happens?",
      surfaces: "How it works",
      body: "A sequence, not a list of features.",
    },
    {
      question: "Who does it, and can I trust them?",
      surfaces: "About",
      body: "Named people. Real constraints, stated plainly.",
    },
    {
      question: "What does it cost me to find out?",
      surfaces: "Contact",
      body: "One next step, not five equal ones.",
    },
  ],
} as const;

/* ---------------------------------------- 05 · ONE PAIN, FOLLOWED */

/**
 * The page's single real interaction.
 *
 * Every path is in the DOM at all times — the visitor's choice reveals
 * one, it does not fetch one. That keeps the page authoritative without
 * JavaScript, keeps it readable to a crawler, and gives
 * prefers-reduced-motion a complete state to resolve to.
 *
 * The three pains are the approved set. Each resolves through the same
 * four beats so the structure itself is legible: PAIN → UNDERSTANDING →
 * SOLUTION → NEXT ACTION.
 */
export const painPaths = {
  eyebrow: "Start where you actually are",
  prompt: "Which one sounds like your business?",
  steps: ["Pain", "Understanding", "Solution", "Next action"],
  paths: [
    {
      id: "disappear",
      pain: "We get enquiries, but too many disappear.",
      understanding:
        "It lands on a channel nobody is watching, and the first reply comes hours later.",
      solution:
        "Every enquiry becomes a record the moment it arrives, whatever door it came through.",
      action: { label: "See how the system responds", href: "/how-it-works" },
    },
    {
      id: "choose",
      pain: "People visit, but they don't understand why they should choose us.",
      understanding:
        "The site lists what you offer. It never answers the question they arrived with.",
      solution:
        "The journey is arranged around their decision, not your service list.",
      action: { label: "Book a Discovery Call", href: null },
    },
    {
      id: "once",
      pain: "Customers buy once, then disappear.",
      understanding:
        "Nothing follows the first purchase, so the second depends on them remembering you.",
      solution:
        "The website fronts a system that keeps going after the sale, not only before it.",
      action: { label: "See the full journey", href: "/how-it-works" },
    },
  ],
} as const;

/* ------------------ 06 · PROOF BY RESTRAINT + WHAT ARKFLOW BUILDS */

/**
 * Confidence, built the only honest way available.
 *
 * v1.4 §20 forbids clients, results, traffic, rankings, revenue, leads,
 * conversion rates and project volume — so there is no case study, no
 * logo wall and no metric here, and there must never be. What is left
 * is stronger anyway: show the engagement that actually happens, and
 * show the system declining a sale it does not believe in.
 *
 * `chain` is the capability made visible. It is a sequence, not a menu:
 * nothing in it can be bought separately, which is why it is drawn as
 * one line rather than as six cards.
 */
export const capability = {
  eyebrow: "Above and below",
  title: "What the customer feels. What we build underneath.",

  /**
   * THE SURFACE — one environment, moving through one decision.
   *
   * This replaced a vertical Strategy → Journey → UX → Design →
   * Development → Conversion timeline. The timeline was accurate and
   * it was the wrong primary composition: it made the page's biggest
   * moment an ArkFlow methodology diagram on a page whose whole
   * argument is that a website should guide a customer. It also read
   * as a third rail-and-nodes section, identical on a phone to the
   * guided path in environment 05.
   *
   * Now the customer's experience is the composition and the method
   * is the substrate under it. Five states of one decision, in one
   * surface: the question becomes dominant, the relevant information
   * comes forward, the rest recedes, and the next step becomes
   * obvious.
   */
  surface: {
    label: "What the customer experiences",
    states: [
      {
        key: "Question",
        line: "Is this right for someone like me?",
        forward: "Who it is for",
      },
      {
        key: "Context",
        line: "Here is what it actually involves.",
        forward: "How it works",
      },
      {
        key: "Understanding",
        line: "I know what happens after I enquire.",
        forward: "What to expect",
      },
      {
        key: "Confidence",
        line: "These are the people who would do it.",
        forward: "Who does it",
      },
      {
        key: "Action",
        line: "There is one obvious thing to do next.",
        forward: "The next step",
      },
    ],
    action: "Book a Discovery Call",
  },

  /**
   * THE SUBSTRATE — the same six phases, demoted to what they are.
   *
   * Deliberately NOT mapped one-to-one onto the five states above.
   * All six are underneath all five; pretending Strategy produces
   * "Question" and Design produces "Confidence" would be a tidy
   * diagram and a false one.
   */
  substrate: {
    label: "Underneath",
    phases: ["Strategy", "Journey", "UX", "Design", "Development", "Conversion"],
    note: "The conversion path is what the other five are for.",
  },

  /* v1.4 §3 mandatory finding — governance. Do not soften, do not
     move it behind an interaction, do not make it optional. */
  honesty: {
    title: "Sometimes the website is not the problem.",
    body: "If the review finds that traffic arrives and converts, but enquiries are answered slowly or not at all, we will tell you that — and point you at a Revenue Leak Audit instead of selling you a website you do not need.",
    ctaLabel: "See how ArkFlow works",
    href: "/how-it-works",
  },

  /* v1.4 §19 boundary — governance. Must remain rendered text. */
  boundary:
    "ArkFlow does not currently offer SEO as an ongoing service, and does not make ranking or traffic claims.",
} as const;

/* ------------------------------------------------ 07 · CONTINUITY */

export const continuity = {
  eyebrow: "Stage one of ten",
  title: "The front end of a revenue system.",
  journeyNote:
    "Built on its own, and designed so the rest can connect later without rebuilding the front door.",
} as const;

/* -------------------------------------------------------- ACTION */

export const attractCta = {
  title: "Send us your website.",
  body: "We will tell you whether it needs optimising, redesigning or rebuilding — or whether the problem is somewhere else.",
  primary: "Book a Discovery Call",
  secondary: "Get a Website Review",
  whatsappPrefill:
    "Hi ArkFlow, I would like a Website Review. Here is my website:",
} as const;
