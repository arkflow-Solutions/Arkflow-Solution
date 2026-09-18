/**
 * ArkFlow Intelligence — content model.
 *
 * Articles are typed TypeScript objects rather than MDX. The reason is
 * governance: a typed model lets the build enforce things prose cannot.
 * Every article must declare a category, a funnel level, an author and at
 * least one internal destination, so "article that goes nowhere" fails to
 * compile rather than quietly shipping.
 */

export type Category =
  | "revenue-operations"
  | "lead-response"
  | "whatsapp-automation"
  | "ai-voice-agents"
  | "ai-automation"
  | "aesthetic-clinics";

/**
 * Funnel level, per the three content levels in the brief.
 *  discovery — broad, "what is X"
 *  problem   — "why this costs you money"
 *  intent    — evaluating a solution now
 * Drives which CTA the article closes with.
 */
export type Level = "discovery" | "problem" | "intent";

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string; id: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  /**
   * An aside. `href` is optional and exists so an article can offer the
   * reader one onward path at the moment the idea is in their head,
   * rather than collecting every internal link into a list at the end.
   * Optional because the three articles published before it had none.
   */
  | {
      type: "callout";
      title?: string;
      text: string;
      href?: string;
      hrefLabel?: string;
    }
  | { type: "quote"; text: string }
  /**
   * A contextual invitation to book a discovery call, placed mid-article.
   *
   * GOVERNANCE: this block carries no destination of its own. It opens the
   * one canonical booking modal (lib/use-booking.ts) and reports the one
   * canonical conversion event, `discovery_call_click`. There is
   * deliberately no `href` and no event name here, so an article cannot
   * introduce a second funnel by writing content.
   *
   * The tracked `location` is NOT authored either — the renderer numbers
   * these blocks in document order (article_mid, article_mid_2, …) so two
   * CTAs in one article cannot collide or be mislabelled by hand.
   */
  | { type: "cta"; text: string; label?: string }
  | { type: "steps"; items: { label: string; text: string }[] }
  | { type: "table"; head: string[]; rows: string[][] }
  /* ------------------------------------------------------ visual blocks */
  /**
   * A process chain: enquiry -> reply -> qualify -> book. The workhorse
   * diagram. Renders as a row on desktop, a vertical stack on mobile.
   */
  | {
      type: "flow";
      caption?: string;
      steps: { label: string; note?: string; state?: "normal" | "loss" }[];
    }
  /** Two-column before/after. `loss` styling marks the failing side. */
  | {
      type: "compare";
      caption?: string;
      left: { title: string; items: string[]; tone?: "loss" | "normal" };
      right: { title: string; items: string[]; tone?: "loss" | "normal" };
    }
  /**
   * A row of figures.
   *
   * GOVERNANCE: `note` is REQUIRED, not optional. Every number shown at
   * display size must carry its own provenance line — "Illustrative", or
   * the source. This is enforced by the type system precisely because an
   * unlabelled big number is the easiest way to accidentally publish a
   * performance claim.
   */
  | {
      type: "metrics";
      note: string;
      caption?: string;
      items: { value: string; label: string }[];
    }
  /**
   * A real image. `alt` and dimensions are required — alt for
   * accessibility, dimensions so the browser reserves space and the page
   * does not shift while loading.
   */
  | {
      type: "image";
      src: string;
      alt: string;
      width: number;
      height: number;
      caption?: string;
    };

export type Faq = { q: string; a: string };

export type Article = {
  slug: string;
  /** The article's own title — the visible H1, breadcrumb, card and schema headline. */
  title: string;
  /**
   * Optional shorter title for search results and social cards only
   * (<title>, og:title, twitter:title). Falls back to `title`. Exists so
   * an author's full headline can stay on the page while the title tag
   * stays within the length search engines display.
   */
  seoTitle?: string;
  /** Meta description AND the card blurb. 140–160 chars. */
  description: string;
  category: Category;
  level: Level;
  /** ISO date. */
  published: string;
  updated?: string;
  authorId: string;
  /**
   * One-line hook shown under the H1. Optional: an article whose full
   * title already does that job omits it rather than repeating itself.
   */
  standfirst?: string;
  blocks: Block[];
  faq?: Faq[];
  /**
   * Optional override for the end-of-article CTA copy.
   *
   * WHY AN OVERRIDE RATHER THAN AN EDIT TO THE SHARED COPY. ArticleCta
   * picks its framing from `level`, and all three levels are in use by
   * published articles (problem, intent, discovery). Rewriting any of
   * those strings would silently rewrite a signed-off article, so an
   * article that needs its own framing states it here and every other
   * article keeps the default untouched.
   *
   * The primary action is NOT settable. It is always the canonical
   * booking modal firing `discovery_call_click` — only the words above
   * the button change.
   */
  cta?: { title: string; body: string };
  /**
   * The ArkFlow destination this article should route to. Required —
   * an article with no onward path is a dead end (brief §47).
   */
  solution: { label: string; href: string; note: string };
  /** Slugs of related articles. Falls back to same-category if omitted. */
  related?: string[];
};

export type Author = {
  id: string;
  name: string;
  role: string;
  /**
   * Optional. Intentionally unset until real biographical detail is
   * supplied. Fabricated credentials would poison the E-E-A-T signal
   * this field exists to create.
   */
  bio?: string;
};

/** ~200 wpm, counting only reader-visible text. */
export function readingMinutes(blocks: Block[]): number {
  let words = 0;
  for (const b of blocks) {
    if ("text" in b && b.text) words += b.text.split(/\s+/).length;
    if ("items" in b && Array.isArray(b.items)) {
      for (const it of b.items) {
        const text =
          typeof it === "string"
            ? it
            : [
                "label" in it ? it.label : "",
                "text" in it ? it.text : "",
                "note" in it ? it.note : "",
                "value" in it ? it.value : "",
              ]
                .filter(Boolean)
                .join(" ");
        words += text.split(/\s+/).length;
      }
    }
    if (b.type === "compare") {
      words += [...b.left.items, ...b.right.items].join(" ").split(/\s+/).length;
    }
    if (b.type === "flow") {
      words += b.steps
        .map((s) => `${s.label} ${s.note ?? ""}`)
        .join(" ")
        .split(/\s+/).length;
    }
    if (b.type === "table") {
      words += b.rows.flat().join(" ").split(/\s+/).length;
    }
  }
  return Math.max(1, Math.round(words / 200));
}

/** Section headings, for the table of contents. */
export function toc(blocks: Block[]) {
  return blocks
    .filter((b): b is Extract<Block, { type: "h2" }> => b.type === "h2")
    .map((b) => ({ id: b.id, text: b.text }));
}
