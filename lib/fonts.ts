import { Schibsted_Grotesk, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";

/**
 * Typefaces. Changed 21 October 2026.
 *
 * WHAT WAS HERE AND WHY IT WENT. Inter for everything, with JetBrains
 * Mono for labels. Inter is a fine typeface and it is also the single
 * most common choice on the web, which means a dark site set entirely
 * in Inter reads as a template before anyone has read a word of it.
 * For a company whose whole argument is "we build this properly", the
 * default sans is the wrong first impression.
 *
 * WHAT REPLACED IT.
 *
 *   Headings  Schibsted Grotesk 600. A grotesk with slightly tighter
 *             apertures and more character in the g, a and R than
 *             Inter has. It holds up at display sizes, which is what
 *             this site asks of a heading face, and it does not have
 *             the quirks that make Bricolage Grotesque — the other
 *             candidate — hard to use on a page with this much text.
 *
 *   Body      Hanken Grotesk 400/500. A quieter, slightly warmer
 *             companion with a taller x-height, which matters because
 *             most of this site's body copy sits on a dark background
 *             where thin type disappears.
 *
 *   Labels    JetBrains Mono 400/500, UNCHANGED.
 *
 * ON THE THIRD FAMILY. The brief asked for at most two families. Mono
 * is kept as a third, deliberately: it sets every eyebrow and system
 * label on the site, it carries the tabular figures in the audit
 * sample and the case-study counters, and it is baked into the Scene
 * 02 and Scene 06 homepage baselines that are signed off and locked.
 * Dropping it is not a font swap, it is a restyle of approved work.
 * Five weights across three families, all subset to latin.
 *
 * LOADING. All three are self-hosted by next/font at build time — no
 * request to Google at runtime, no layout shift from a late swap, and
 * `display: "swap"` with next/font's generated fallback metrics so the
 * fallback occupies almost exactly the same space.
 */

/**
 * WEIGHTS AND PRELOADING WERE TUNED AGAINST A MEASUREMENT, not
 * guessed. The first cut loaded Schibsted at 500 and 600 and Hanken at
 * 400 and 500, all preloaded alongside mono. Mobile Lighthouse on the
 * homepage went from 88 to 77 and first contentful paint from 1.2s to
 * 2.0s, with 80KB of font files landing in the critical window. The
 * settings below are what brought it back; re-measure if you change
 * them.
 */

/** Display and headings. One weight — 600 is the only one used. */
export const fontSans = Schibsted_Grotesk({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-display",
  display: "swap",
});

/** Body copy. The face most of the site is actually read in. */
export const fontBody = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-sans",
  display: "swap",
});

/**
 * The utility face — eyebrows, metrics, system labels, tabular
 * figures. The operational voice.
 *
 * NOT PRELOADED, deliberately. It sets eyebrows and small labels and
 * never the largest element on any screen, so it has no business
 * competing with the headline and the body copy for the first few
 * hundred milliseconds. next/font still generates the fallback
 * metrics, so the swap when it does arrive does not shift layout.
 */
export const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
  preload: false,
});
