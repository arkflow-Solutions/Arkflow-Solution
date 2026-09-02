import { ContactExperience } from "@/components/contact/contact-experience";
import { SurveyEmbed } from "@/components/contact/survey-embed";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { contact } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact & Lead Response Audit",
  description:
    "Book a discovery call or request a free Lead Response Audit on your own numbers. One recommended package, backed by the 30-Day Response Guarantee.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <ContactExperience />

      {/*
        Lead Response Audit intake — the GoHighLevel survey.

        Submissions go straight from the browser into the CRM, so this
        works regardless of whether GHL_API_TOKEN and GHL_LOCATION_ID
        are set in Vercel. The custom multi-step form above posts to
        /api/enquiry, which needs those variables and silently drops the
        enquiry without them.

        See DECISION note in the change summary: running both a custom
        form and this survey on one page is a duplication worth
        resolving once the API route is confirmed working.
      */}
      <Section className="hairline" id="audit">
        <Container>
          <div className="mx-auto max-w-2xl">
            <h2 className="text-heading font-semibold">
              {contact.survey.title}
            </h2>
            <p className="mt-5 text-body text-[color:var(--text-secondary)]">
              {contact.survey.body}
            </p>
            <div className="mt-10">
              <SurveyEmbed />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
