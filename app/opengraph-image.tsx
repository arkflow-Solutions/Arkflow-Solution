import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "ArkFlow — Revenue Operations for Singapore Clinics";
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
          <div style={{ color: "#FFFFFF", fontSize: 76, fontWeight: 600, letterSpacing: -2, lineHeight: 1.05 }}>
            Never lose another lead,
          </div>
          <div style={{ color: "#FFFFFF", fontSize: 76, fontWeight: 600, letterSpacing: -2, lineHeight: 1.05 }}>
            booking, or invoice.
          </div>
          <div style={{ color: "#D1D5DB", fontSize: 30, marginTop: 28 }}>
            Revenue Operations for Singapore service businesses
          </div>
        </div>
        <div style={{ color: "rgba(209,213,219,0.6)", fontSize: 24, letterSpacing: 3, textTransform: "uppercase" }}>
          Response &lt; 90 sec · Live in 72 hours · 30-Day Response Guarantee
        </div>
      </div>
    ),
    { ...size }
  );
}
