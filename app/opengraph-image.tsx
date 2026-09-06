import { ImageResponse } from "next/og";

/**
 * Default Open Graph card — the image behind every share of this site
 * that does not supply its own.
 *
 * REWRITTEN 6 September 2026. The previous card read "Your business has
 * the tools. ArkFlow makes them work as one." with a footer promising a
 * reply in under 90 seconds and a core system live in 72 hours. Both
 * were superseded:
 *
 *  - The headline was the V2 positioning. Every social share of every
 *    page was previewing language the site itself no longer used, which
 *    made the share and the landing page read as two different
 *    companies.
 *  - The footer stated response and delivery commitments. lib/seo.ts
 *    already forbids those in page descriptions ("Response and delivery
 *    figures are commitments"), and the same rule applies here — an OG
 *    card is a public surface, and this one was the last place those
 *    figures survived outside the legal pages.
 *
 * The copy below is taken from the approved site description in
 * app/layout.tsx, and the stage list is the canonical ten-stage Revenue
 * Engine enforced by scripts/verify.mjs check 4. Nothing here is new
 * language: it is the positioning that is already live, finally
 * reaching the share card.
 *
 * GOVERNANCE: no price, no client count, no performance figure, no
 * package or tier name, no capability above its classification.
 */

export const runtime = "edge";
export const alt =
  "ArkFlow — a Revenue Operating Company. We build and operate the systems that capture, convert and retain revenue.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Canonical ten stages. Must match lib/revenue-content.ts. */
const STAGES =
  "Attract · Capture · Respond · Qualify · Book · Convert · Follow Up · Retain · Reactivate · Grow";

export default function OpengraphImage() {
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
        <div style={{ display: "flex", fontSize: 44, fontWeight: 700 }}>
          <span style={{ color: "#FFFFFF" }}>ARK</span>
          <span style={{ color: "#1A3CFF" }}>FLOW</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: "#FFFFFF",
              fontSize: 64,
              fontWeight: 600,
              letterSpacing: -2,
              lineHeight: 1.05,
            }}
          >
            A Revenue Operating
          </div>
          <div
            style={{
              color: "#FFFFFF",
              fontSize: 64,
              fontWeight: 600,
              letterSpacing: -2,
              lineHeight: 1.05,
            }}
          >
            Company.
          </div>
          <div style={{ color: "#D1D5DB", fontSize: 30, marginTop: 28 }}>
            We build and operate the systems that capture, convert and retain.
          </div>
        </div>
        {/* The canonical engine, small. Wraps to a second line rather
            than overflowing if a renderer measures the text wider. */}
        <div
          style={{
            color: "rgba(209,213,219,0.6)",
            fontSize: 15,
            letterSpacing: 1.4,
            lineHeight: 1.6,
            textTransform: "uppercase",
          }}
        >
          {STAGES}
        </div>
      </div>
    ),
    { ...size }
  );
}
