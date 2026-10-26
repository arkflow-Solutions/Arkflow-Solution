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
    "A Singapore photographer whose work was already good enough to book itself, and a website that was not helping it.",

  body: [
    /* Framing only — no claim is made about the previous site's
       performance, because none was measured. The problem stated is
       structural and true of the category generally. */
    "Khai photographs weddings. The pictures come from the moments people forget to pose, and a portfolio like that has one job on the web: to be seen in full, quickly, on a phone, by someone who is deciding this week. Most photography sites get in the way of that. They are slow, because a page builder loads its own machinery before the first photograph arrives — and when a couple finally decides to ask about a date, the only thing on offer is a contact form that answers tomorrow.",
    "ArkFlow rebuilt the whole thing as one system rather than as a website with features bolted to it. Thirty-five pages of work, written and structured so that someone searching for a solemnisation photographer in Singapore can find it. One thousand three hundred and ninety-eight photographs, every single one served as WebP. A capture layer that turns an interested visitor into a conversation in the channel Singapore actually uses, with the enquiry type and the date already filled in before they have typed anything.",
    "And one third-party script on the entire site. Everything else is hand-written and dependency-free: no framework, no page builder, no plugin stack. Every photograph is art-directed — a different crop is sent to a phone than to a laptop — and every one of them declares its dimensions so nothing jumps while the page settles. That is not craft for its own sake. It is what makes 1,398 photographs usable on a phone with one bar of signal at a wedding fair.",
  ],

  scope: [
    {
      title: "Attract",
      summary: "Make the work findable by the people already searching for it.",
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
      summary: "Give an interested visitor somewhere to go that answers now.",
      items: [
        "Live chat on every page, running on the ArkFlow CRM stack",
        "A date checker that composes a WhatsApp message from the enquiry type and the date",
        "A full enquiry form for the ones who want to write more",
        "Every enquiry path landing in one place, not four inboxes",
      ],
    },
    {
      title: "Under the hood",
      summary: "The part nobody sees, which is the part that decides whether they stay.",
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
  discipline: "Specialty coffee and matcha",
  sector: "Food and beverage",
  live: "October 2026",
  url: "https://www.brewprintsg.app/",
  host: "brewprintsg.app",

  standfirst:
    "A neighbourhood cafe in Tampines that needed to sell beans to people who would never walk past it.",

  body: [
    /* The problem is stated structurally. No claim is made about what
       the cafe sold before, because nothing was measured. */
    "Brewprint roasts and serves specialty coffee from a shop in Tampines. A cafe like that has two quite different jobs on the web and most cafe websites only attempt the first: tell people where you are and when you open, and then stop. The second job is harder. Someone who liked the matcha on Saturday should be able to buy a bag of it on Wednesday from an office in Raffles Place, and someone planning a company event should be able to book the live coffee station without a four-email thread.",
    "So the site is a shop as well as a storefront. Five products with their own pages and Product and Offer structured data, a working cart, a checkout, and an order confirmation. Alongside it an events page for the live coffee and matcha station, with its own booking path and its own confirmation. The cafe itself is described in the way Google needs it: CafeOrCoffeeShop structured data carrying the real address, the real coordinates and the real opening hours, so the shop shows up correctly when someone in Tampines asks their phone where to get coffee.",
    "Underneath, the whole thing is hand-written. One third-party script on the entire site and it is the Google Map on the contact page. Fifty-four images, every one WebP. No framework, no page builder, no plugin stack, no theme. The blueprint drawings in the hero are drawn in the browser rather than loaded as photographs, which is why a site with that much going on in it still arrives quickly on a phone.",
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
        "A first-order welcome offer, presented once rather than on every visit",
        "WhatsApp, phone and email on every page for the ones who would rather ask",
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
    { value: 54, label: "images, all WebP", source: "Unique image files, crawled across all 19 pages" },
    { value: 5, label: "products, each with schema", source: "Product and Offer markup, read from the page source" },
    { value: 1, label: "third-party script", source: "The Google Map embed. Counted from the page source" },
  ],

  outcomes: [],

  pending:
    "The shop went live in October 2026. Order volume, average basket and event bookings will be published here when there are enough months of them to mean something, taken from the client's own records and only with their sign-off.",

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
    "A Singapore practice supporting children at home, whose parents arrive at 1am having searched for something worrying.",

  body: [
    /* The audience description is the client's own, from their site.
       No claim is made here about enquiry volume or outcomes. */
    "Fort Achievers works with children in their own homes and shadows them at school. The parents who find them are usually searching at an odd hour, for something specific and frightening, in words no service page uses: why does my child hit, is this a meltdown or a tantrum, gentle parenting is not working. A brochure site with three service pages never meets that search.",
    "So the largest part of this build is the writing. Fourteen articles, each one answering a question a parent actually types, each one linked to the service it belongs to. That sits on top of three service pages, an about page and an FAQ whose six questions are marked up as FAQPage structured data so the answers can appear in the search result itself. Two parent-story videos carry VideoObject markup with their real durations and upload dates.",
    "The capture layer is built for the hour these parents arrive. Every page carries both a booking path for the free assessment and a WhatsApp button, twenty-three of them across the site, because a parent at 1am will send a message and will not fill in a form. And the entire site loads no third-party script at all: not one analytics tag, not one widget, not one font service. Sixty of its sixty-two images are lazy-loaded and the content renders with JavaScript switched off.",
  ],

  scope: [
    {
      title: "Attract",
      summary: "Meet the parent at the search they actually make, not the one a brochure expects.",
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
      summary: "A parent reading at 1am needs a way through that works at 1am.",
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

