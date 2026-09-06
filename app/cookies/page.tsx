import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/pages/page-hero";
import { CONTACT_EMAIL, COMPANY, LEGAL_DOCS } from "@/lib/site";

import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Cookie Policy",
  description:
    "What cookies and similar technologies the ArkFlow website uses, who sets them, why, and how to control them through your browser.",
  path: "/cookies",
});

/**
 * Cookie Policy.
 *
 * NEW 6 September 2026. The Privacy Policy (ARK-PRIV clause 12) commits
 * to explaining cookies; this page is that explanation. It describes the
 * implementation as it actually is, verified against the source:
 *
 *   - ArkFlow's own application code sets NO cookies and uses NO browser
 *     storage. Verified across the repository: no document.cookie, no
 *     localStorage, sessionStorage or indexedDB outside node_modules, no
 *     middleware, no Set-Cookie. Every cookie here comes from a third
 *     party. That is an unusually clean position and it is stated plainly.
 *   - Google Analytics loads on every page when NEXT_PUBLIC_GA_ID is set.
 *   - GoHighLevel loads only when a visitor opens the booking widget
 *     (changed the same day; it previously loaded on every page).
 *
 * WHAT THIS PAGE DELIBERATELY DOES NOT SAY: specific cookie names,
 * lifetimes, or the precise behaviour of any provider's cookies. None of
 * that is established by this repository, and inventing it would be
 * worse than omitting it. Establishing the real inventory requires
 * loading the deployed site and inspecting the browser, plus vendor
 * documentation — both flagged for follow-up.
 *
 * CONSENT MODEL: browser-settings control, matching ARK-PRIV clause 12.2.
 * There is no consent banner, and this page says so rather than implying
 * a choice the visitor is not being offered. Whether a different model is
 * required is a legal question that has not been answered, and the site
 * must not pretend otherwise in either direction.
 */
export default function CookiePolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Cookie Policy"
        lead={`What this website stores on your device, who sets it, and how to control it. Issued ${LEGAL_DOCS.privacy.issued}.`}
      />
      <Section className="!pt-8">
        <Container>
          <div className="max-w-prose space-y-10 text-body text-[color:var(--text-secondary)]">
            <p className="border-l-2 border-[color:var(--border-strong)] pl-5">
              <strong className="font-medium text-white">In short.</strong>{" "}
              {COMPANY.shortName}&apos;s own website code does not set any
              cookies. The cookies that exist on this site are set by two
              third-party services: our analytics provider, and our CRM
              provider when you open the booking widget. You can control all of
              them through your browser.
            </p>

            <div>
              <h2 className="text-subheading font-medium text-white">
                What cookies are
              </h2>
              <p className="mt-4">
                A cookie is a small file a website asks your browser to store.
                Related technologies — local storage and similar — work the same
                way. They are used to make a site work, to remember something
                between visits, or to measure how a site is used.
              </p>
            </div>

            <div>
              <h2 className="text-subheading font-medium text-white">
                What {COMPANY.shortName} sets
              </h2>
              <p className="mt-4">
                Nothing. Our own application code sets no cookies and uses no
                browser storage. We do not store an identifier for you, we do
                not remember preferences between visits, and we do not run a
                first-party tracker of our own.
              </p>
            </div>

            <div>
              <h2 className="text-subheading font-medium text-white">
                What third parties set
              </h2>

              <h3 className="mt-8 text-body font-medium text-white">
                Google Analytics — analytics
              </h3>
              <p className="mt-3">
                Loads on every page. Google Analytics sets cookies so that
                repeat visits and page views can be counted as belonging to the
                same browser, which is what makes a visitor count meaningful
                rather than a count of page loads.
              </p>
              <p className="mt-3">
                We use it to understand which pages are read and which routes
                into the site work. We do not send your name, email address,
                phone number or the content of your message to it — our
                analytics code removes those fields before any event is sent.
                Campaign parameters from a link you followed (for example
                utm_source) are included.
              </p>
              <p className="mt-3 text-small text-[color:var(--text-tertiary)]">
                The cookie names, their lifetimes and their exact contents are
                determined by Google, not by us, and may change without notice
                to us. We do not restate them here because we cannot guarantee
                that a restatement stays accurate.
              </p>

              <h3 className="mt-8 text-body font-medium text-white">
                GoHighLevel — booking widget
              </h3>
              <p className="mt-3">
                Loads only if you open the booking widget. Until you do, no
                GoHighLevel script or frame is requested by this site at all. If
                you open it, the widget and its supporting script are served
                from{" "}
                <span className="font-mono text-small">
                  link.arkflowsolutions.com
                </span>{" "}
                — a domain that belongs to us but is operated by our CRM
                provider on our behalf.
              </p>
              <p className="mt-3 text-small text-[color:var(--text-tertiary)]">
                Any cookie set in that context is set by the provider under its
                own arrangements. We do not control it and do not restate its
                behaviour here.
              </p>

              <h3 className="mt-8 text-body font-medium text-white">
                Hosting
              </h3>
              <p className="mt-3">
                Our hosting provider serves every page and necessarily receives
                the technical information described in our Privacy Policy. If it
                issues any cookie for routing or protection, that is set by the
                provider rather than by our code.
              </p>
            </div>

            <div>
              <h2 className="text-subheading font-medium text-white">
                Links that leave this site
              </h2>
              <p className="mt-4">
                The Revenue Leak Audit, WhatsApp and our social profiles open
                separate sites. Once you are there, that site&apos;s own cookie
                and privacy practices apply, not this policy.
              </p>
            </div>

            <div>
              <h2 className="text-subheading font-medium text-white">
                How to control cookies
              </h2>
              <p className="mt-4">
                Every major browser lets you see the cookies a site has set,
                delete them, and block some or all of them — usually under
                Privacy or Site settings. Blocking cookies for this site will
                not stop you reading it. It may affect the booking widget, which
                is provided by a third party and relies on its own storage.
              </p>
              <p className="mt-4">
                {COMPANY.shortName} does not currently show a cookie consent
                banner. Cookie control on this site is through your browser
                settings, as described in clause 12 of our{" "}
                <Link
                  href="/privacy"
                  className="text-blue-soft underline underline-offset-4"
                >
                  Privacy Policy
                </Link>
                . We would rather say that plainly than present a banner that
                does not change what loads.
              </p>
            </div>

            <div>
              <h2 className="text-subheading font-medium text-white">
                Questions
              </h2>
              <p className="mt-4">
                Write to{" "}
                <a
                  className="text-blue-soft underline underline-offset-4"
                  href={`mailto:${CONTACT_EMAIL}`}
                >
                  {CONTACT_EMAIL}
                </a>
                . Our{" "}
                <Link
                  href="/privacy"
                  className="text-blue-soft underline underline-offset-4"
                >
                  Privacy Policy
                </Link>{" "}
                explains what personal data we hold, how long we keep it and how
                to ask for access, correction or deletion.
              </p>
            </div>

            <p className="border-t border-[color:var(--border-subtle)] pt-8 text-small text-[color:var(--text-tertiary)]">
              This page supports clause 12 of {LEGAL_DOCS.privacy.ref} (issued{" "}
              {LEGAL_DOCS.privacy.issued}). Website operated by{" "}
              {COMPANY.legalName} (UEN {COMPANY.uen}), {COMPANY.address}.
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
