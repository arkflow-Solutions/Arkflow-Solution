import { Inter, JetBrains_Mono } from "next/font/google";

/**
 * Canonical typefaces (Founder Bible Ch. 2.13):
 * Inter for display and body. Mono is the utility face for
 * eyebrows, metrics and system labels — the operational voice.
 */
export const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});
