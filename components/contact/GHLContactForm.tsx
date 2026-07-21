"use client";

import Script from "next/script";

/**
 * GHLContactForm — the ArkFlow GoHighLevel survey, dressed in the site's
 * dark-glass treatment: breathing blue aura, glass panel, animated top
 * accent, and a glow on hover.
 *
 * NOTE: the survey itself renders inside a cross-origin iframe, so no CSS
 * here can style its fields. The survey's own background must be set to
 * transparent (or dark) inside GoHighLevel for it to blend with this
 * panel. Submissions are handled entirely by GoHighLevel.
 *
 * No CSS transform is applied to the iframe's ancestors on purpose —
 * transforms make embedded iframes flicker and can swallow clicks.
 */

const SURVEY_ID = "Oq72axtkafYqexdosYFd";
const SURVEY_SRC = `https://api.leadconnectorhq.com/widget/survey/${SURVEY_ID}`;

const styles = `
.ghl-wrap{position:relative}
.ghl-aura{position:absolute;inset:-16px;border-radius:30px;pointer-events:none;
  background:radial-gradient(60% 55% at 50% 28%,rgba(26,60,255,.38),transparent 70%);
  filter:blur(28px);animation:ghl-breathe 6s ease-in-out infinite}
@keyframes ghl-breathe{0%,100%{opacity:.36}50%{opacity:.64}}
.ghl-panel{position:relative;border:1px solid var(--border-strong);border-radius:22px;
  background:linear-gradient(180deg,rgba(15,23,42,.80),rgba(15,23,42,.56));
  backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);
  box-shadow:0 40px 120px -40px rgba(0,0,0,.85);
  padding:14px;overflow:hidden;
  transition:border-color .35s ease,box-shadow .35s ease}
.ghl-wrap:hover .ghl-panel{border-color:rgba(59,130,246,.55);
  box-shadow:0 46px 130px -40px rgba(26,60,255,.55)}
.ghl-panel::before{content:"";position:absolute;inset:0 0 auto 0;height:1px;
  background:linear-gradient(90deg,transparent,rgba(59,130,246,.95),transparent);
  animation:ghl-sweep 4s ease-in-out infinite}
@keyframes ghl-sweep{0%,100%{opacity:.35}50%{opacity:1}}
.ghl-frame{display:block;width:100%;border:none;border-radius:16px;background:transparent}
@media(max-width:640px){.ghl-panel{padding:8px;border-radius:18px}}
@media(prefers-reduced-motion:reduce){.ghl-aura,.ghl-panel::before{animation:none}}
`;

export function GHLContactForm({ minHeight = 850 }: { minHeight?: number }) {
  return (
    <div className="ghl-wrap">
      <style>{styles}</style>
      <div className="ghl-aura" aria-hidden />
      <div className="ghl-panel">
        <iframe
          id={SURVEY_ID}
          src={SURVEY_SRC}
          title="ArkFlow enquiry form"
          scrolling="no"
          className="ghl-frame"
          style={{ width: "100%", border: "none", minHeight }}
        />
      </div>
      <Script
        src="https://link.msgsndr.com/js/form_embed.js"
        strategy="afterInteractive"
      />
    </div>
  );
}
