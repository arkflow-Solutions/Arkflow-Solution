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
  | { type: "callout"; title?: string; text: string }
  | { type: "quote"; text: string }
  | { type: "steps"; items: { label: string; text: string }[] }
  | { type: "table"; head: string[]; rows: string[][] };

export type Faq = { q: string; a: string };

export type Article = {
  slug: string;
  title: string;
  /** Meta description AND the card blurb. 140–160 chars. */
  description: string;
  category: Category;
  level: Level;
  /** ISO date. */
  published: string;
  updated?: string;
  authorId: string;
  /** One-line hook shown under the H1. */
  standfirst: string;
  blocks: Block[];
  faq?: Faq[];
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
    if ("items" in b) {
      for (const it of b.items) {
        words += (typeof it === "string" ? it : `${it.label} ${it.text}`).split(
          /\s+/
        ).length;
      }
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
