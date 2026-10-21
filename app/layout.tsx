import type { Metadata } from "next";
import "./globals.css";
import { fontSans, fontBody, fontMono } from "@/lib/fonts";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BookingModal } from "@/components/booking/booking-modal";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { IntroVeilOnHome } from "@/components/motion/intro-veil-on-home";
import { OrgJsonLd, WebSiteJsonLd } from "@/components/seo/json-ld";
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
/**
 * HOMEPAGE TITLE AND DESCRIPTION, rewritten 21 October 2026.
 *
 * "Revenue Operating Company" is a category we invented. It is a good
 * brand idea and nobody types it into Google. The title now leads with
 * the words a clinic owner actually searches — WhatsApp, AI, enquiry,
 * Singapore — and the brand sits at the end where it belongs. The
 * invented category still exists in the copy on the page, explained in
 * a sentence on first use rather than asserted in a tab.
 */
const TITLE = "WhatsApp Automation for Singapore Clinics";
const DESCRIPTION =
  "ArkFlow answers clinic enquiries on WhatsApp, Instagram and email in minutes, books the appointment and follows up. Built and run for you in Singapore.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${TITLE} | ArkFlow`,
    template: "%s | ArkFlow",
  },
  description: DESCRIPTION,
  /**
   * NO `keywords`. Removed 21 October 2026.
   *
   * Google has ignored the meta keywords tag since 2009 and said so in
   * public. Ours was identical on all eighteen routes, which is the
   * one thing it can still do: look like keyword stuffing to anything
   * that does read it. The concepts it listed are now where they
   * count, in the titles and the body copy.
   */
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_SG",
    url: SITE_URL,
    siteName: "ArkFlow",
    title: `${TITLE} | ArkFlow`,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITLE} | ArkFlow`,
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
    /* en-SG, not en. Every page is written in Singapore English for a
       Singapore market — SGT, PDPA, S$, MOH — and the locale is
       already declared as en_SG in Open Graph. The <html> tag said
       plain "en", which is the one place a crawler looks first. */
    <html lang="en-SG" className={`${fontSans.variable} ${fontBody.variable} ${fontMono.variable}`}>
      <head />
      <body>
        {/* HOMEPAGE ONLY, as of 6 October 2026. The veil covers the page
            for about 4.6 seconds, which is a fine way to open the front
            door and a terrible thing to put in front of someone who just
            clicked "Get your free Revenue Leak Audit" — a direct hit on
            /audit, from an email or an ad, waited through the whole
            animation before it could read the form. The cinematic
            opening stays where it earns its place. */}
        <IntroVeilOnHome />
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
        <WebSiteJsonLd />
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
