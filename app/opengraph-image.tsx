import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "ArkFlow — your business has the tools. ArkFlow makes them work as one.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          <div style={{ color: "#FFFFFF", fontSize: 64, fontWeight: 600, letterSpacing: -2, lineHeight: 1.05 }}>
            Your business has the tools.
          </div>
          <div style={{ color: "#FFFFFF", fontSize: 64, fontWeight: 600, letterSpacing: -2, lineHeight: 1.05 }}>
            ArkFlow makes them work as one.
          </div>
          <div style={{ color: "#D1D5DB", fontSize: 30, marginTop: 28 }}>
            The connected system behind a service business
          </div>
        </div>
        <div style={{ color: "rgba(209,213,219,0.6)", fontSize: 24, letterSpacing: 3, textTransform: "uppercase" }}>
          Designed to reply in under 90 sec · Core system live in 72 hours
        </div>
      </div>
    ),
    { ...size }
  );
}
