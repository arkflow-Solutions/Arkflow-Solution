import type { Metadata } from "next";
import "./globals.css";
import { fontSans, fontMono } from "@/lib/fonts";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { IntroVeil } from "@/components/motion/intro-veil";
import { OrgJsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  metadataBase: new URL("https://arkflow.sg"),
  title: {
    default: "ArkFlow — Revenue Operations for Singapore Clinics",
    template: "%s — ArkFlow",
  },
  description:
    "ArkFlow is a Revenue Operations partner for Singapore aesthetic and medical clinics. AI systems that answer every enquiry in under 90 seconds, keep your calendar full, and collect payment without chasing.",
  keywords: [
    "Revenue Operations Singapore",
    "clinic automation Singapore",
    "WhatsApp AI response",
    "aesthetic clinic booking system",
  ],
  openGraph: {
    type: "website",
    locale: "en_SG",
    url: "https://arkflow.sg",
    siteName: "ArkFlow",
    title: "ArkFlow — Never lose another lead, booking, or invoice.",
    description:
      "Revenue Operations for Singapore service businesses. Response < 90 sec · Live in 72 hours · 30-Day Response Guarantee.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ArkFlow — Revenue Operations for Singapore Clinics",
    description:
      "Never lose another lead, booking, or invoice. Response < 90 sec · Live in 72 hours · 30-Day Response Guarantee.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fontSans.variable} ${fontMono.variable}`}>
      <body>
        <IntroVeil />
        <SmoothScroll />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[300] focus:rounded-button focus:bg-surface focus:px-4 focus:py-2 focus:text-small"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <OrgJsonLd />
      </body>
    </html>
  );
}
