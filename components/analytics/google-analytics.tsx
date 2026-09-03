import Script from "next/script";

/**
 * Google Analytics 4 (gtag.js).
 *
 * Property created 2 Sep 2026 — measurement ID G-HW71JPTTTV.
 *
 * WHY THIS FILE EXISTS RATHER THAN A HARDCODED SCRIPT IN THE LAYOUT
 * lib/analytics.ts has carried a full 38-event taxonomy since Phase 3,
 * every call routed through track(), which already checks for
 * window.gtag and no-ops safely when it's absent (see lib/analytics.ts).
 * No vendor was ever loaded, so every event fired to nothing. This file
 * is the missing half — the moment it mounts, every existing track()
 * call across the site starts actually recording, with no other code
 * change required.
 *
 * WHY THE ID IS AN ENV VAR, NOT A CONSTANT
 * Google's own snippet hardcodes the ID inline. That's fine for a
 * single environment, but it means a Vercel preview deploy — every
 * branch, every PR — would report into the same production property,
 * polluting real traffic data with test sessions. Reading from
 * NEXT_PUBLIC_GA_ID keeps production and preview reporting separate
 * once a second (or blank) ID is set for Preview in Vercel, and lets
 * the ID rotate without a code change.
 *
 * WHY strategy="afterInteractive", NOT beforeInteractive
 * Analytics is not required for the page to be usable — loading it
 * after hydration keeps it off the critical rendering path. The GHL
 * embed script alongside it (app/layout.tsx) uses the even lazier
 * "lazyOnload" for the same reason: neither is load-bearing for the
 * visitor's first render.
 *
 * NOT YET DONE — Consent Mode.
 * No cookie-consent banner exists on the site yet, so this loads
 * unconditionally. Google's docs recommend Consent Mode (default-deny
 * until the visitor accepts) for EEA/UK visitors specifically — the
 * banner Google's own setup flow flagged. Out of scope for this pass;
 * flagging so it isn't silently forgotten if EU traffic becomes
 * material.
 */

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export function GoogleAnalytics() {
  if (!GA_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
}
