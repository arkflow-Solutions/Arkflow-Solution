import { packages, faq } from "@/lib/content";

const BASE = "https://arkflow.sg";

/** Organization + OfferCatalog — rendered site-wide from the layout. */
export function OrgJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "ArkFlow Solutions",
    url: BASE,
    description:
      "Revenue Operations partner for Singapore clinics and service businesses. AI systems that answer every enquiry in under 90 seconds, keep calendars full, and collect payment.",
    areaServed: { "@type": "Country", name: "Singapore" },
    address: { "@type": "PostalAddress", addressCountry: "SG" },
    slogan: "Smarter Systems. Lower Costs. Better Results.",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "ArkFlow Packages",
      itemListElement: packages.map((p) => ({
        "@type": "Offer",
        name: `ArkFlow ${p.name}`,
        description: p.headline,
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: p.price.replace("S$", "").replace(",", ""),
          priceCurrency: "SGD",
          unitText: "MONTH",
        },
      })),
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** FAQPage — rendered on the home page only. */
export function FaqJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
