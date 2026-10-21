import { ImageResponse } from "next/og";

/**
 * The shared Open Graph card.
 *
 * WHY THIS EXISTS. Until 21 October 2026 only the homepage had an
 * og:image. Every other route — including every Insights article, the
 * clinic page and the case study — shared as a bare blue link on
 * WhatsApp and LinkedIn, which on WhatsApp is close to invisible in a
 * busy chat. That is the channel we sell, so it was an odd place to be
 * invisible.
 *
 * Each route now has a ten-line `opengraph-image.tsx` that calls this
 * with its own title. One layout, one set of brand rules, one place to
 * change them.
 *
 * GOVERNANCE: no price, no client count, no performance figure, no
 * package or tier name, no response-time commitment. An OG card is a
 * public surface and the same rules apply as to a page description —
 * see lib/seo.ts.
 */

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

export function ogCard({
  title,
  eyebrow = "ArkFlow",
  footnote = "Singapore",
}: {
  /** The page topic. Keep it under about 60 characters. */
  title: string;
  /** Small mono label above the title. */
  eyebrow?: string;
  /** Small label along the bottom. */
  footnote?: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#0A0E1A",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 40, fontWeight: 700 }}>
          <span style={{ color: "#FFFFFF" }}>ARK</span>
          <span style={{ color: "#1A3CFF" }}>FLOW</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              color: "#3B82F6",
              fontSize: 20,
              letterSpacing: 3,
              textTransform: "uppercase",
              marginBottom: 24,
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              display: "flex",
              color: "#FFFFFF",
              /* Long titles get smaller type rather than overflowing
                 the card — Satori does not reflow out of the box. */
              fontSize: title.length > 46 ? 54 : 66,
              fontWeight: 600,
              letterSpacing: -2,
              lineHeight: 1.08,
              maxWidth: 940,
            }}
          >
            {title}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "rgba(209,213,219,0.6)",
            fontSize: 20,
            letterSpacing: 1,
          }}
        >
          <span>{footnote}</span>
          <span>arkflowsolutions.com</span>
        </div>
      </div>
    ),
    { ...OG_SIZE }
  );
}
