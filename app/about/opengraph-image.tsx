import { ogCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-card";

/* Per-route Open Graph card. Layout and brand rules live in
   lib/og-card.tsx; this file supplies only this page's words. */
export const runtime = "edge";
export const alt = "About ArkFlow — ArkFlow";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogCard({ title: "About ArkFlow", eyebrow: "About" });
}
