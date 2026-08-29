import { SITE_URL } from "@/lib/site";
import { COMPANY, CONTACT_EMAIL, CONTACT_PHONE } from "@/lib/site";
import { sameAs } from "@/lib/social";

/**
 * Organization structured data.
 *
 * AMENDMENT 2: there is deliberately NO Product/Offer schema here.
 * ArkFlow quotes rather than publishes a price list, and emitting
 * `price` / `priceCurrency` in JSON-LD would publish the price list in
 * the page source. Do not reintroduce an Offer block.
 */
export function OrgJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    // Registered ACRA name, not the brand. `alternateName` carries the brand.
    name: COMPANY.legalName,
    alternateName: COMPANY.shortName,
    /**
     * UEN as a PropertyValue identifier. schema.org has no Singapore-
     * specific UEN property; PropertyValue with a named propertyID is the
     * documented pattern for jurisdictional registration numbers, and is
     * valid for Organization. Not emitted as `taxID` — a UEN is a
     * registration number, not a tax identifier.
     */
    identifier: {
      "@type": "PropertyValue",
      propertyID: "UEN",
      value: COMPANY.uen,
    },
    url: SITE_URL,
    description:
      "ArkFlow designs, connects and operates the digital architecture behind service businesses — from first enquiry through booking, payment and repeat customer.",
    logo: `${SITE_URL}/brand/arkflow-logo-lockup.png`,
    // Verified profiles only. An unconfirmed URL here is a false claim
    // of identity, so sameAs is omitted entirely when the list is empty.
    ...(sameAs.length ? { sameAs } : {}),
    areaServed: { "@type": "Country", name: "Singapore" },
    address: { "@type": "PostalAddress", addressCountry: "SG" },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: CONTACT_EMAIL,
      telephone: CONTACT_PHONE,
      areaServed: "SG",
      availableLanguage: ["en"],
    },
    knowsAbout: [
      "Revenue Operations",
      "Customer enquiry management",
      "Appointment booking systems",
      "Customer retention",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
