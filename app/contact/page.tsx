import { ContactExperience } from "@/components/contact/contact-experience";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact & Lead Response Audit",
  description:
    "Book a discovery call or request a free Lead Response Audit on your own numbers. One recommended package, backed by the 30-Day Response Guarantee.",
  path: "/contact",
});

/**
 * The custom multi-step form (ContactExperience) is the single intake
 * path on this page — per founder decision, 2 Sep 2026.
 *
 * A GoHighLevel survey embed (SurveyEmbed) previously ran underneath it
 * as a second, always-working path while GHL_API_TOKEN / GHL_LOCATION_ID
 * were unset. Now that those are configured (see /api/enquiry), the
 * custom form delivers directly and the duplicate survey was removed to
 * avoid two intake forms confusing the visitor.
 *
 * components/contact/survey-embed.tsx is left in the repo, unused, in
 * case a second embed is wanted again later — deleting it isn't
 * necessary, only importing it here.
 */
export default function ContactPage() {
  return <ContactExperience />;
}
