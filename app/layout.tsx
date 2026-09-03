import type { Metadata } from "next";
import "./globals.css";
import { fontSans, fontMono } from "@/lib/fonts";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BookingModal } from "@/components/booking/booking-modal";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { IntroVeil } from "@/components/motion/intro-veil";
import { OrgJsonLd } from "@/components/seo/json-ld";
import { SITE_URL } from "@/lib/site";
import Script from "next/script";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";

/**
 * Site metadata.
 *
 * Positioning: the ARCHITECTURE is for service businesses; the current
 * COMMERCIAL FOCUS is Singapore aesthetic clinics. Both, distinctly.
 * Response and delivery figures are stated as commitments — never as
 * achieved performance (there is no client data to support that yet).
 */
const DESCRIPTION =
  "ArkFlow designs, connects and operates the digital architecture behind service businesses — enquiry to booking to payment to repeat customer. Currently focused on Singapore aesthetic clinics.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "ArkFlow — Revenue Operations for Singapore service businesses",
    template: "%s — ArkFlow",
  },
  description: DESCRIPTION,
  keywords: [
    "Revenue Operations Singapore",
    "connected business systems Singapore",
    "appointment booking automation",
    "aesthetic clinic enquiry system",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_SG",
    url: SITE_URL,
    siteName: "ArkFlow",
    title: "ArkFlow — Revenue Operations for Singapore service businesses",
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "ArkFlow — Revenue Operations for Singapore service businesses",
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true },
  /**
   * Meta (Facebook) Business domain verification.
   *
   * Emitted server-side into <head> via the Metadata API. Meta rejects
   * this tag if it is injected by JavaScript or placed outside <head>,
   * so it must stay here rather than in a client component or script.
   *
   * The token is public by design — it proves domain control, it is not
   * a credential. Safe to commit.
   */
  verification: {
    other: {
      "facebook-domain-verification": "qq0rsvwf2t50efu64zvo6pmx4rxor1",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fontSans.variable} ${fontMono.variable}`}>
      <head />
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
        <BookingModal />
        <GoogleAnalytics />
        {/*
          GoHighLevel embed script. Drives auto-resize for both the
          booking widget (BookingModal) and the Lead Response Audit
          survey on /contact — without it the iframes render at a
          fixed height and clip their own content.

          lazyOnload keeps it off the critical path; neither embed is
          above the fold. Served from the white-label domain so no
          third-party host appears in the network tab.
        */}
        <Script
          src="https://link.arkflowsolutions.com/js/form_embed.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
