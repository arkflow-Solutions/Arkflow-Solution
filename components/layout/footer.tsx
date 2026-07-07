import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Wordmark } from "@/components/layout/wordmark";

const columns = [
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "Resources", href: "/resources" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Packages",
    links: [
      { label: "Respond", href: "/packages#respond" },
      { label: "Operate", href: "/packages#operate" },
      { label: "Scale", href: "/packages#scale" },
    ],
  },
  {
    heading: "Industries",
    links: [
      { label: "Aesthetic Clinics", href: "/industries#aesthetic" },
      { label: "Dental & Medical", href: "/industries#medical" },
      { label: "Psychology", href: "/industries#psychology" },
      { label: "Property & Professional", href: "/industries#professional" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="hairline">
      <Container className="py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Wordmark size="large" />
            <p className="mt-4 max-w-xs text-small text-[color:var(--text-tertiary)]">
              Revenue Operations for Singapore service businesses. Capture,
              convert and retain more revenue.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.heading}>
              <p className="font-mono text-eyebrow uppercase text-[color:var(--text-tertiary)]">
                {col.heading}
              </p>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-small text-platinum transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="hairline mt-14 flex flex-col justify-between gap-4 pt-8 text-small text-[color:var(--text-tertiary)] md:flex-row">
          <p>© {new Date().getFullYear()} ArkFlow Solutions Pte Ltd. Singapore.</p>
          <p className="font-mono text-eyebrow uppercase">
            Smarter Systems. Lower Costs. Better Results.
          </p>
        </div>
      </Container>
    </footer>
  );
}
