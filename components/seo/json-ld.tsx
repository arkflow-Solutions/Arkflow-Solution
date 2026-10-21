import { SITE_URL } from "@/lib/site";
import { COMPANY, COMPANY_ADDRESS, CONTACT_EMAIL, CONTACT_PHONE } from "@/lib/site";
import { sameAs } from "@/lib/social";

/**
 * Organization structured data.
 *
 * AMENDMENT 2: there is deliberately NO Product/Offer schema here.
 * ArkFlow quotes rather than publishes a price list, and emitting
 * `price` / `priceCurrency` in JSON-LD would publish the price list in
 * the page source. Do not reintroduce an Offer block.
 */
/**
 * WebSite. Separate from Organization because they describe different
 * things — the company and the site — and Google reads them for
 * different purposes. No SearchAction: there is no site search to
 * point it at, and declaring one that does not exist is the kind of
 * markup that earns a manual action.
 */
export function WebSiteJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: COMPANY.shortName,
          url: SITE_URL,
          inLanguage: "en-SG",
          publisher: { "@id": `${SITE_URL}/#organization` },
        }),
      }}
    />
  );
}

/**
 * FAQPage.
 *
 * Fed from the same `faq` array the page renders, never from a second
 * copy of the text. Structured data that disagrees with the visible
 * answer is a policy violation, and the only reliable way to prevent
 * that is to make it impossible to edit one without the other.
 */
export function FaqJsonLd({
  items,
}: {
  items: readonly { q: string; a: string }[];
}) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: items.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }),
      }}
    />
  );
}

/**
 * Service, for /aesthetic-clinics.
 *
 * NO `offers` BLOCK, for the same reason Organization has none:
 * ArkFlow quotes rather than publishes a price list, and emitting
 * price/priceCurrency here would publish it in the page source
 * (Amendment 2). No aggregateRating either — there are no reviews to
 * aggregate, and inventing the property is a manual-action risk.
 */
export function ServiceJsonLd({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name,
          description,
          serviceType: "Customer enquiry response and booking automation",
          provider: { "@id": `${SITE_URL}/#organization` },
          areaServed: { "@type": "Country", name: "Singapore" },
          audience: {
            "@type": "BusinessAudience",
            name: "Aesthetic clinics in Singapore",
          },
          url: new URL(path, SITE_URL).toString(),
        }),
      }}
    />
  );
}

export function OrgJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    /* A stable node id so WebSite.publisher and Service.provider can
       point at this entity instead of each repeating the company
       block. One organisation on the site, described once. */
    "@id": `${SITE_URL}/#organization`,
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
    // Industry-agnostic, and no capability named here that is not
    // current. "Payment" was removed: invoice and payment automation is
    // classified future and exploratory (founder ruling, 6 Sep 2026).
    description:
      "ArkFlow is a Revenue Operating Company. It designs the customer journey, builds the system that runs it, and keeps operating it — from first enquiry through booking, follow-up and repeat customer.",
    logo: `${SITE_URL}/brand/arkflow-logo-lockup.png`,
    // Verified profiles only. An unconfirmed URL here is a false claim
    // of identity, so sameAs is omitted entirely when the list is empty.
    ...(sameAs.length ? { sameAs } : {}),
    areaServed: { "@type": "Country", name: "Singapore" },
    /**
     * The full registered address, not just the country. It is the
     * ACRA-verified address already published on /privacy, /terms and
     * /cookies, so this adds no new claim — it makes the existing,
     * verified Singapore location machine-readable and consistent with
     * what the legal pages already state.
     */
    address: { "@type": "PostalAddress", ...COMPANY_ADDRESS },
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
