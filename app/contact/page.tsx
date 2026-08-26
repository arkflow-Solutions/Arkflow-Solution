import { ContactExperience } from "@/components/contact/contact-experience";

import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact & Lead Response Audit",
  description:
    "Book a discovery call or request a free Lead Response Audit on your own numbers. One recommended package, backed by the 30-Day Response Guarantee.",
  path: "/contact",
});


export default function ContactPage() {
  return <ContactExperience />;
}
