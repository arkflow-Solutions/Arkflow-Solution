"use client";

import { useEffect, useRef, useState } from "react";
import { SURVEY_URL } from "@/lib/site";
import { track } from "@/lib/analytics";

/**
 * Lead Response Audit survey — GoHighLevel embed.
 *
 * WHY AN IFRAME RATHER THAN THE CUSTOM FORM
 * The custom form posts to /api/enquiry, which creates the contact via
 * the GHL Contacts API. That route needs GHL_API_TOKEN and
 * GHL_LOCATION_ID set in Vercel, and when they are missing it logs the
 * enquiry and returns success — the visitor sees "Thank you" and the
 * lead goes nowhere. This embed cannot fail that way: the submission
 * goes straight from the browser into the CRM.
 *
 * Height is managed by GoHighLevel's form_embed.js, loaded once in
 * app/layout.tsx. The min-height below is only a pre-resize floor so
 * the section does not collapse while the iframe loads.
 */
export function SurveyEmbed() {
  const ref = useRef<HTMLIFrameElement>(null);
  const [seen, setSeen] = useState(false);

  // Fire once when the form actually comes into view, so the funnel
  // separates "reached the form" from "loaded the page".
  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          track("audit_form_view", { location: "contact_survey" });
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [seen]);

  return (
    <div className="overflow-hidden rounded-card border border-[color:var(--border-subtle)] bg-surface/40">
      <iframe
        ref={ref}
        src={SURVEY_URL}
        title="ArkFlow Lead Response Audit enquiry form"
        id="NXyNayYOuw3hhVcb9cMY"
        data-cookie-consent="true"
        data-cookie-consent-provider="auto"
        scrolling="no"
        loading="lazy"
        className="w-full border-none"
        style={{ minHeight: 620 }}
      />
    </div>
  );
}
