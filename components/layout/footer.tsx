import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Wordmark } from "@/components/layout/wordmark";
import { activeSocials } from "@/lib/social";
import { COMPANY } from "@/lib/site";

/* Approved sitemap only. There is no "Industries" column: listing
   verticals ArkFlow does not serve would breach Stage 1 discipline
   (Founder Bible S1.5 / S1.11). */
const columns = [
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Case studies", href: "/case-studies" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    /* PACKAGES COLUMN REMOVED, 6 Sep 2026. Package names are not for
       public use and /packages no longer exists. Replaced with the
       homepage's own structure. */
    heading: "The system",
    links: [
      { label: "Where revenue leaks", href: "/#the-leak" },
      { label: "The Revenue Engine", href: "/#revenue-engine" },
      { label: "Capabilities", href: "/#capabilities" },
      { label: "Industries", href: "/#industries" },
    ],
  },
  {
    heading: "Solutions",
    links: [
      { label: "How it works", href: "/how-it-works" },
      { label: "Unified inbox", href: "/solutions#inbox" },
      { label: "Booking", href: "/solutions#booking" },
      { label: "Aesthetic clinics", href: "/aesthetic-clinics" },
      { label: "ArkFlow Intelligence", href: "/insights" },
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
              A Revenue Operating Company. We build and operate the
              AI-powered revenue systems that sit across the customer
              journey. Capture more, convert more, retain more.
            </p>
            {/* Verified profiles only — see lib/social.ts. A profile with
                no confirmed URL renders nothing rather than a dead link. */}
            {activeSocials.length > 0 && (
              <ul className="mt-6 flex gap-5">
                {activeSocials.map((s) => (
                  <li key={s.id}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-small text-platinum transition-colors hover:text-white"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
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
          {/* Legal entity, not brand. Sourced from lib/site.ts so the
              registered name and UEN exist in exactly one place. */}
          <p>
            © {new Date().getFullYear()} {COMPANY.legalName} · UEN {COMPANY.uen}
          </p>
          <nav aria-label="Legal" className="flex gap-6">
            <Link href="/privacy" className="transition-colors hover:text-white">
              Privacy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-white">
              Terms
            </Link>
          </nav>
        </div>
      </Container>
    </footer>
  );
}
