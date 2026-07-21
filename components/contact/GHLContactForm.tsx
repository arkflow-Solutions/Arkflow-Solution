"use client";

import Script from "next/script";

/**
 * GHLContactForm — embeds the ArkFlow GoHighLevel survey.
 *
 * Submissions are handled entirely by GoHighLevel (no custom API route,
 * no EmailJS, no webhook mapping). GHL's embed script auto-resizes the
 * iframe; `minHeight` reserves space so the page doesn't shift while the
 * survey loads. The script is loaded via next/script with
 * strategy="afterInteractive" so it is only ever loaded once per page.
 */

const SURVEY_ID = "Oq72axtkafYqexdosYFd";
const SURVEY_SRC = `https://api.leadconnectorhq.com/widget/survey/${SURVEY_ID}`;

export function GHLContactForm({ minHeight = 850 }: { minHeight?: number }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-neutral-200 bg-white p-4 shadow-xl md:p-6">
      <iframe
        id={SURVEY_ID}
        src={SURVEY_SRC}
        title="ArkFlow enquiry form"
        scrolling="no"
        className="block w-full"
        style={{ border: "none", width: "100%", minHeight }}
      />
      <Script
        src="https://link.msgsndr.com/js/form_embed.js"
        strategy="afterInteractive"
      />
    </div>
  );
}
