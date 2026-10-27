/**
 * Published case studies.
 *
 * THE RULE THIS FILE EXISTS TO ENFORCE. A case study may contain only
 * facts that can be checked by someone who does not work here. Every
 * figure below was measured from the client's live site on 17 October
 * 2026 and can be re-measured by anyone with a browser — page counts
 * from the published sitemap, image counts by crawling it, the
 * third-party script count by reading the source.
 *
 * WHAT IS DELIBERATELY ABSENT. No enquiry volume, no bookings, no
 * revenue, no traffic, no ranking, no conversion rate, no testimonial.
 * Not because none of it will ever exist, but because none of it has
 * been measured over a meaningful period and signed off by the client
 * yet. `pending` below is published on the page for exactly that
 * reason: the gap is stated rather than filled.
 *
 * ADDING THE NUMBERS LATER. When the client approves a measured
 * result, it goes in `outcomes` with the window it was measured over
 * and the source it came from. Until then `outcomes` stays empty and
 * the page renders the pending note instead. There is no code path
 * that prints a performance figure without a measurement window
 * attached to it.
 */

export type BuildFact = {
  /** The figure itself. A count, never a performance claim. */
  value: number;
  /** Rendered after the numeral, e.g. "pages". */
  label: string;
  /** How anyone else can check it. */
  source: string;
};

export type ScopeGroup = {
  /** Revenue Engine stage, or "Under the hood" for build craft. */
  title: string;
  /** One line on what this group of work is for. */
  summary: string;
  items: string[];
};

export type Outcome = {
  metric: string;
  /** Measurement window, e.g. "Nov 2026 – Jan 2027". Never optional. */
  window: string;
  /** Where the figure came from, e.g. "GoHighLevel conversation export". */
  source: string;
};

export type CaseStudy = {
  slug: string;
  client: string;
  /** What the client does, in their own terms. */
  discipline: string;
  sector: string;
  /** Month the system went live. */
  live: string;
  url: string;
  /** The display form of the URL — no protocol, no trailing slash. */
  host: string;
  /** One sentence, above the fold. */
  standfirst: string;
  /** Two or three paragraphs. The narrative, not a feature list. */
  body: string[];
  scope: ScopeGroup[];
  facts: BuildFact[];
  /** Measured, client-approved results. Empty until both are true. */
  outcomes: Outcome[];
  /** Shown while `outcomes` is empty. */
  pending: string;
  shots: {
    desktop: { src: string; width: number; height: number; alt: string };
    mobile: { src: string; width: number; height: number; alt: string };
  };
};

export const khaiVisuals: CaseStudy = {
  slug: "khai-visuals",
  client: "Khai Visuals",
  discipline: "Wedding and commercial photography",
  sector: "Photography",
  live: "October 2026",
  url: "https://www.khaivisuals.com/",
  host: "khaivisuals.com",

  standfirst:
    "A wedding portfolio that had to open fast on a phone, and a way to ask about a date without filling in a form.",

  body: [
    /* Framing only — no claim is made about the previous site's
       performance, because none was measured. The problem stated is
       structural and true of the category generally. */
    "Khai shoots weddings. Couples find him on a phone, usually in the week they are deciding, so the site had to show the work in full without making them wait for it.",
    "Thirty-five pages and 1,398 photographs, every one WebP, each sent to a phone at a different crop from the laptop version. Live chat on every page, and a date checker that writes the WhatsApp message for them before they type anything. One third-party script on the whole site.",
  ],

  scope: [
    {
      title: "Attract",
      summary: "Be findable by couples already searching for a photographer.",
      items: [
        "Thirty-five pages, structured and interlinked",
        "Ten wedding stories, each told in the order of the day",
        "Four photo essays and nine commercial and performance projects",
        "Five guides answering what couples actually search for",
        "ProfessionalService and WebSite structured data, sitemap and robots",
      ],
    },
    {
      title: "Capture",
      summary: "Somewhere to go that answers tonight, not tomorrow.",
      items: [
        "Live chat on every page, running on the ArkFlow CRM stack",
        "A date checker that composes a WhatsApp message from the enquiry type and the date",
        "A full enquiry form for the ones who want to write more",
        "Every enquiry path landing in one place, not four inboxes",
      ],
    },
    {
      title: "Under the hood",
      summary: "What makes 1,398 photographs survive a phone with one bar of signal.",
      items: [
        "1,398 photographs, every one WebP — no JPEG, no PNG",
        "Exactly one third-party script on the whole site",
        "Art-directed responsive images: a different crop for phones",
        "Every image sized in the markup, so nothing jumps as the page loads",
        "prefers-reduced-motion honoured, skip link, labelled gallery controls",
      ],
    },
  ],

  /* Counts, not performance. Each was measured on 17 October 2026 and
     each `source` says how to repeat the measurement. */
  facts: [
    {
      value: 35,
      label: "pages live",
      source: "Counted from the published sitemap.xml",
    },
    {
      value: 1398,
      label: "photographs, all WebP",
      source: "Unique image files, crawled across all 35 pages",
    },
    {
      value: 1,
      label: "third-party script",
      source: "The chat widget loader. Counted from the page source",
    },
    {
      value: 0,
      label: "frameworks or page builders",
      source: "Hand-written HTML, CSS and JavaScript",
    },
  ],

  /* Empty on purpose. See the file header. */
  outcomes: [],

  pending:
    "The system went live in October 2026. Enquiry and booking figures will be published here when there are enough months of them to mean something, measured from the client's own CRM, and only with the client's sign-off. We are not going to estimate them in the meantime.",

  /**
   * DIMENSIONS ARE THE CAPTURED VIEWPORT IN CSS PIXELS, not the pixel
   * dimensions of the file. The desktop shot is a 2x capture of a
   * 1440x900 viewport and the phone a 3x capture of 390x844, so the
   * files are larger than the numbers below. next/image needs these
   * only for the aspect ratio and reserved space; the srcset it
   * generates still serves the full-resolution source.
   *
   * There is a second reason not to write the file's own width here.
   * verify.mjs check 9a bans à-la-carte prices by matching bare
   * numerals, and `2,?880` is one of them — a literal 2880 in any
   * public source file fails the build. An image width is not a
   * price, but the check cannot tell, and loosening a governance
   * regex to accommodate a screenshot is the wrong trade.
   */
  shots: {
    desktop: {
      src: "/case-studies/khai-visuals-desktop.jpg",
      width: 1440,
      height: 900,
      alt: "The Khai Visuals homepage on a desktop browser: a wide photograph of a couple on a balcony, with the navigation and a WhatsApp button over it.",
    },
    mobile: {
      src: "/case-studies/khai-visuals-mobile.jpg",
      width: 390,
      height: 844,
      alt: "The same homepage on a phone, the photograph filling the screen above a WhatsApp button.",
    },
  },
};

export const brewprint: CaseStudy = {
  slug: "brewprint-coffee",
  client: "Brewprint Coffee",
  discipline: "Online shop and back office",
  sector: "Food and beverage",
  live: "October 2026",
  url: "https://www.brewprintsg.app/",
  host: "brewprintsg.app",

  standfirst:
    "A shop, an events booking system, and a back office the cafe runs without calling us.",

  body: [
    /* The problem is stated structurally. No claim is made about what
       the cafe sold before, because nothing was measured. */
    "Brewprint is a cafe in Tampines. They wanted to sell beans and matcha to people who would never walk past the shop, take bookings for their live coffee station at events, and run both themselves.",
    "There are two halves to it. The shop: five products, a cart, checkout, order confirmation, and a separate booking path for events. And a password-protected back office with eleven sections, where they handle orders, customers, products, discounts, the events calendar, the site pop-up, messages and subscribers. Prices change, a product goes up, a discount comes down, and none of it needs us.",
  ],

  scope: [
    {
      title: "Attract",
      summary: "Be findable by people who want coffee near them, and by people who want beans delivered.",
      items: [
        "Nineteen pages, including five product pages and an events page",
        "CafeOrCoffeeShop structured data with address, coordinates and opening hours",
        "Product and Offer structured data on every item in the shop",
        "Three guides on matcha, beans and the cafe itself",
        "Sitemap and a robots file that keeps cart and confirmation pages out of search",
      ],
    },
    {
      title: "Capture and convert",
      summary: "Two different buyers, two different paths, both finished on the site.",
      items: [
        "A shop with a cart, a checkout and an order confirmation",
        "An events path for booking the live coffee and matcha station",
        "A first-order welcome offer, shown once rather than on every visit",
        "WhatsApp, phone and email on every page for the ones who would rather ask",
      ],
    },
    {
      title: "The back office",
      summary: "The part the owner opens every morning.",
      items: [
        "Eleven sections behind a password: orders, calendar, customers, products",
        "Discounts, the site pop-up, messages, subscribers, analytics and settings",
        "Orders move through fulfilment states as they are prepared and delivered",
        "An events calendar holding paid bookings and blocked dates, read by the booking page",
        "Kept out of search by robots, and it is their data in their own account",
      ],
    },
    {
      title: "Under the hood",
      summary: "A shop that still has to load on a phone in a lift lobby.",
      items: [
        "54 images, every one WebP — no JPEG, no PNG",
        "Exactly one third-party script, and it is the map on the contact page",
        "Hero illustrations drawn in the browser rather than loaded as images",
        "No framework, no page builder, no theme and no plugin stack",
        "Five legal pages, including shipping and returns, because it takes payments",
      ],
    },
  ],

  facts: [
    { value: 19, label: "pages live", source: "Counted from the published sitemap.xml" },
    { value: 11, label: "admin sections", source: "The back-office navigation at /admin" },
    { value: 54, label: "images, all WebP", source: "Unique image files, crawled across all 19 pages" },
    { value: 1, label: "third-party script", source: "The Google Map embed. Counted from the page source" },
  ],

  outcomes: [],

  pending:
    "The shop went live in October 2026 and the orders in it so far are the cafe's own tests. Real order volume, basket size and event bookings will be published here once there are enough months of them to mean something, from the client's records and with their sign-off.",

  shots: {
    desktop: {
      src: "/case-studies/brewprint-desktop.jpg",
      width: 1440,
      height: 900,
      alt: "The Brewprint Coffee homepage: a line-drawn cup rendered like a technical blueprint beside the headline 'Coffee drawn to a blueprint', with Order Online and Book Our Service buttons.",
    },
    mobile: {
      src: "/case-studies/brewprint-mobile.jpg",
      width: 390,
      height: 844,
      alt: "The same homepage on a phone, the blueprint cup above the headline and the ordering button.",
    },
  },
};

export const fortAchievers: CaseStudy = {
  slug: "fort-achievers",
  client: "Fort Achievers & Co.",
  discipline: "Home-based behaviour and communication support",
  sector: "Child development",
  live: "October 2026",
  url: "https://www.fortachieversco.com/",
  host: "fortachieversco.com",

  standfirst:
    "Fourteen articles answering the things parents actually type into Google at one in the morning.",

  body: [
    /* The audience description is the client's own, from their site.
       No claim is made here about enquiry volume or outcomes. */
    "Fort Achievers support children at home and shadow them at school. Parents find them late at night, searching for something specific and worrying, in words no service page uses: why does my child hit, is this a meltdown or a tantrum.",
    "So most of this build is writing. Fourteen articles, one for each of those questions, each linked to the service it belongs to. Three service pages, an FAQ marked up so the answers can show in the search result, and two parent videos. Twenty-three WhatsApp buttons across the site, because at that hour a parent sends a message. No third-party scripts anywhere on it.",
  ],

  scope: [
    {
      title: "Attract",
      summary: "Answer the search a worried parent actually makes.",
      items: [
        "Twenty-five pages, fourteen of them long-form articles",
        "Three service pages: home support, school shadowing, workshops and training",
        "An FAQ marked up as FAQPage structured data, six questions",
        "LocalBusiness and WebSite structured data with real opening hours",
        "Two parent-story videos with VideoObject markup",
      ],
    },
    {
      title: "Capture",
      summary: "A way through that works at one in the morning.",
      items: [
        "A free-assessment booking path on every page",
        "Twenty-three WhatsApp entry points across the site",
        "Phone and contact form for the ones who would rather call",
        "The same two actions in the header, the hero and the footer, everywhere",
      ],
    },
    {
      title: "Under the hood",
      summary: "No vendor scripts at all, on a site about children.",
      items: [
        "Zero third-party scripts — no widget, no tag, no font service",
        "60 of 62 images lazy-loaded, one marked high priority for the hero",
        "Content renders with JavaScript switched off",
        "Self-hosted fonts and self-hosted assets throughout",
      ],
    },
  ],

  facts: [
    { value: 25, label: "pages live", source: "Counted from the published sitemap.xml" },
    { value: 14, label: "articles published", source: "Blog URLs in the sitemap" },
    { value: 23, label: "WhatsApp entry points", source: "wa.me links counted in the homepage source" },
    { value: 0, label: "third-party scripts", source: "No external script tags in the page source" },
  ],

  outcomes: [],

  pending:
    "The site went live in October 2026. Enquiry and assessment-booking figures will be published here once there are enough months of them to mean something, taken from the client's own records and only with their sign-off. The Google rating shown on their site is their own, earned before this build, and is not a result of it.",

  shots: {
    desktop: {
      src: "/case-studies/fort-achievers-desktop.jpg",
      width: 1440,
      height: 900,
      alt: "The Fort Achievers & Co. homepage: a child reaching for a moon-shaped balloon behind the headline 'Home-based behaviour and communication support for children in Singapore', with booking and WhatsApp buttons.",
    },
    mobile: {
      src: "/case-studies/fort-achievers-mobile.jpg",
      width: 390,
      height: 844,
      alt: "The same homepage on a phone, the headline over the photograph above the two buttons.",
    },
  },
};

/**
 * Newest first. The page renders them in this order.
 */
export const publishedCaseStudies: CaseStudy[] = [
  fortAchievers,
  brewprint,
  khaiVisuals,
];

