import { ContactExperience } from "@/components/contact/contact-experience";
import { FaqJsonLd } from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/seo";
import { faq } from "@/lib/content";

/**
 * PRIMARY KEYWORD: "lead follow-up automation" (Singapore intent).
 * No other page targets it — see docs/keyword-map.md.
 */
export const metadata = buildMetadata({
  title: "Lead Follow-Up Automation Singapore",
  description:
    "Tell us where enquiries are going cold and we will map your enquiry-to-booking flow. Based in Singapore, replies in minutes during SGT business hours.",
  path: "/contact",
});

/**
 * The custom multi-step form (ContactExperience) is the single intake
 * path on this page — per founder decision, 2 Sep 2026.
 *
 * A GoHighLevel survey embed previously ran underneath it as a second,
 * always-working path while GHL_API_TOKEN / GHL_LOCATION_ID were unset.
 * Now that those are configured (see /api/enquiry), the custom form
 * delivers directly and the duplicate survey was removed to avoid two
 * intake forms confusing the visitor.
 *
 * components/contact/survey-embed.tsx was deleted on 6 September 2026.
 * It had been unreferenced since that change, while its own comments
 * still described it as live — a stale unreferenced file is exactly the
 * failure HOTFIX.md records. SURVEY_URL remains in lib/site.ts as the
 * record of the GHL asset, pending a founder decision.
 *
 * THE FAQ SCHEMA IS EMITTED HERE, not inside ContactExperience, because
 * this is the server component — structured data belongs in HTML the
 * crawler is handed, not in a client bundle. It reads the same `faq`
 * array the accordion renders and takes the same first six entries, so
 * the markup cannot claim an answer the page does not show.
 */
export default function ContactPage() {
  return (
    <>
      <FaqJsonLd items={faq.slice(0, 6)} />
      <ContactExperience />
    </>
  );
}
