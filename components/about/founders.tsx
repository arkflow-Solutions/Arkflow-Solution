import Image from "next/image";
import { COMPANY, COMPANY_IDENTIFIER } from "@/lib/site";

/**
 * The founders, and the company behind the contract.
 *
 * PHOTOGRAPHY IS PENDING, AND THE SECTION SAYS SO RATHER THAN FAKING IT.
 * Stock portraits on a founder section are worse than no portraits: they
 * are recognisable as stock, and a trust section caught lying about the
 * one thing it exists to prove takes the rest of the page with it.
 * Generated portraits are the same failure with extra steps. So each
 * founder has a real, reserved frame carrying their initials, sized to
 * the exact aspect ratio the photographs will use.
 *
 * TO DROP THE REAL PHOTOS IN: add the files to public/brand/, then set
 * `photo` on the founder below. Nothing else changes — same frame, same
 * dimensions, no layout shift, no redesign.
 *
 * NOTHING HERE IS INVENTED. Names and roles are as supplied by the
 * founder; the company line comes from lib/site.ts, which is the single
 * verified source for the ACRA name, UEN and registered address. There
 * are no biographies, because none have been supplied — an invented
 * credential on a trust page is the most expensive sentence on a
 * website.
 */

type Founder = {
  name: string;
  role: string;
  initials: string;
  /** Set once real photography exists, e.g. "/brand/khairul.jpg". */
  photo?: string;
};

const founders: Founder[] = [
  { name: "Khairul Naim", role: "Founder", initials: "KN" },
  { name: "Clifford Tan", role: "Co-Founder", initials: "CT" },
];

export function Founders() {
  return (
    <div>
      <div className="grid gap-10 sm:grid-cols-2 sm:gap-12">
        {founders.map((f) => (
          <div key={f.name}>
            <div className="relative aspect-[4/5] w-full max-w-[18rem] overflow-hidden rounded-card border border-[color:var(--border-subtle)] bg-surface/60">
              {f.photo ? (
                <Image
                  src={f.photo}
                  alt={`${f.name}, ${f.role} of ArkFlow`}
                  fill
                  sizes="(max-width: 640px) 100vw, 288px"
                  className="object-cover"
                />
              ) : (
                /* The reserved frame. Decorative — the name beneath it
                   is the content, so this adds nothing to the
                   accessibility tree. */
                <div
                  aria-hidden
                  className="flex h-full w-full items-center justify-center"
                >
                  <span className="font-mono text-[2rem] tracking-[0.18em] text-[color:var(--text-tertiary)]">
                    {f.initials}
                  </span>
                </div>
              )}
            </div>
            <p className="mt-5 text-subheading font-medium text-white">{f.name}</p>
            <p className="mt-1 text-body text-[color:var(--text-secondary)]">{f.role}</p>
          </div>
        ))}
      </div>

      <dl className="mt-14 grid max-w-2xl gap-3 border-t border-[color:var(--border-subtle)] pt-8 text-body text-[color:var(--text-secondary)]">
        <div className="flex flex-wrap gap-x-3">
          <dt className="text-[color:var(--text-tertiary)]">Registered entity</dt>
          <dd>{COMPANY_IDENTIFIER}</dd>
        </div>
        <div className="flex flex-wrap gap-x-3">
          <dt className="text-[color:var(--text-tertiary)]">Registered address</dt>
          <dd>{COMPANY.address}</dd>
        </div>
        <div className="flex flex-wrap gap-x-3">
          <dt className="text-[color:var(--text-tertiary)]">Based</dt>
          <dd>{COMPANY.base}</dd>
        </div>
      </dl>
    </div>
  );
}
