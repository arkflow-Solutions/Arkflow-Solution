import { ContactExperience } from "@/components/contact/contact-experience";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact & Revenue Leak Audit",
  description:
    "Talk to us about where revenue is leaking — slow replies, missed enquiries, follow-up that stops — or request a Revenue Leak Audit on your own numbers.",
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
 */
export default function ContactPage() {
  return <ContactExperience />;
}
