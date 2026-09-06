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
import { GoogleAnalytics } from "@/components/analytics/google-analytics";

/**
 * Site metadata.
 *
 * POSITIONING, updated 6 September 2026: ArkFlow is a Revenue Operating
 * Company and its public positioning is INDUSTRY-AGNOSTIC. The previous
 * description named Singapore aesthetic clinics as the commercial
 * focus; aesthetics is now one vertical among several and must not
 * appear in the site-wide title, description or Open Graph tags.
 *
 * No figure, percentage, result or client count appears here. There is
 * no verified client data, so none is claimed.
 */
const DESCRIPTION =
  "ArkFlow is a Revenue Operating Company. We build and operate the AI-powered revenue systems that capture more enquiries, convert more customers, retain more customers and remove repetitive manual work.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "ArkFlow · AI-powered revenue systems for growing businesses",
    template: "%s · ArkFlow",
  },
  description: DESCRIPTION,
  /* Concepts, not stuffing. These are the categories ArkFlow actually
     occupies; the copy on the page is written for people, not for this
     list. */
  keywords: [
    "revenue operations",
    "revenue operating system",
    "AI revenue automation",
    "lead follow-up automation",
    "AI appointment booking",
    "customer retention automation",
    "customer reactivation",
    "business automation Singapore",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_SG",
    url: SITE_URL,
    siteName: "ArkFlow",
    title: "ArkFlow · AI-powered revenue systems for growing businesses",
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "ArkFlow · AI-powered revenue systems for growing businesses",
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
          MOVED 6 September 2026 — the GoHighLevel embed script
          (form_embed.js) used to load here, on every page.

          It drives auto-resize for the booking iframe. It once also
          served the Revenue Leak Audit survey embed, but that component
          was removed, leaving the booking widget as its only consumer —
          and the booking widget mounts only when a visitor opens it.
          Loading a third-party script on every page, including /privacy
          and /terms, for a widget most visitors never open is a cost
          with no matching benefit.

          It now loads inside components/booking/booking-modal.tsx, at
          the moment the modal opens. next/script de-duplicates by src,
          so repeated opens load it once.
        */}
      </body>
    </html>
  );
}
