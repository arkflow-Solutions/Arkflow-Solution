import type { Metadata } from "next";
import { ContactExperience } from "@/components/contact/contact-experience";

export const metadata: Metadata = {
  title: "Contact — Let's build your revenue engine",
  description:
    "Start an enquiry or book a 30-minute discovery call with ArkFlow. A free Lead Response Audit on your own numbers, one recommended package, backed by the 30-Day Response Guarantee.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact ArkFlow — Every great automation starts with one conversation",
    description:
      "Two minutes to enter the queue for a free Lead Response Audit. Book a discovery call with ArkFlow.",
    url: "https://arkflow.sg/contact",
  },
};

export default function ContactPage() {
  return <ContactExperience />;
}
