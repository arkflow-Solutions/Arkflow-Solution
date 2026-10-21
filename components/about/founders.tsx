import Image from "next/image";
import Link from "next/link";
import { Linkedin } from "lucide-react";
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
 * REINSTATED 21 October 2026. The cards were hidden on 6 October
 * because two empty frames read as an unfinished page. They are back,
 * because an About page that names no human being is a worse problem
 * than an unfinished one: a clinic owner deciding whether to hand over
 * their patient enquiries wants to know who they are handing them to.
 * The frames carry initials until the photographs arrive.
 *
 * EVERY UNSUPPLIED FIELD IS A VISIBLE PLACEHOLDER, not a guess. `bio`
 * reads [BIO — …] on the page on purpose: a bracket in production is
 * embarrassing for a day, an invented credential is a liability
 * forever. Fill them in `founders` below and the brackets disappear.
 *
 * TO FINISH THIS SECTION:
 *   1. Drop the photographs in public/brand/ and set `photo`.
 *   2. Write two or three factual sentences each and set `bio`.
 *   3. Set `linkedin` to each personal profile URL.
 * Nothing else changes — same frame, same dimensions, no layout shift.
 *
 * NOTHING HERE IS INVENTED. Names and roles are as supplied by the
 * founder; the company line comes from lib/site.ts, which is the single
 * verified source for the ACRA name, UEN and registered address.
 */

type Founder = {
  name: string;
  role: string;
  initials: string;
  /** Set once real photography exists, e.g. "/brand/khairul.jpg". */
  photo?: string;
  /**
   * Two or three factual sentences. What they did before ArkFlow and
   * what they are responsible for here. No adjectives that cannot be
   * checked — not "visionary", not "award-winning" unless there is an
   * award with a name and a year.
   */
  bio?: string;
  /** Personal LinkedIn profile, not the company page. */
  linkedin?: string;
};

const founders: Founder[] = [
  {
    name: "Khairul Naim",
    role: "Founder",
    initials: "KN",
    // photo: "/brand/khairul-naim.jpg",
    // bio: "...",
    // linkedin: "https://www.linkedin.com/in/...",
  },
  {
    name: "Clifford Tan",
    role: "Co-Founder",
    initials: "CT",
    // photo: "/brand/clifford-tan.jpg",
    // bio: "...",
    // linkedin: "https://www.linkedin.com/in/...",
  },
];

/** A bracketed placeholder, styled so nobody ships it by accident. */
function Placeholder({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-[4px] bg-warning/10 px-1.5 py-0.5 font-mono text-small text-warning">
      {children}
    </span>
  );
}

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
            <p className="mt-1 text-body text-[color:var(--text-secondary)]">
              {f.role}
            </p>

            <p className="mt-4 max-w-prose text-body text-[color:var(--text-secondary)]">
              {f.bio ?? (
                <Placeholder>
                  [BIO — two or three factual sentences for {f.name}]
                </Placeholder>
              )}
            </p>

            {f.linkedin ? (
              <Link
                href={f.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-small text-blue-soft underline underline-offset-4 transition-colors hover:text-white"
              >
                <Linkedin size={16} aria-hidden />
                {f.name} on LinkedIn
              </Link>
            ) : (
              <p className="mt-4">
                <Placeholder>[LINKEDIN URL — {f.name}]</Placeholder>
              </p>
            )}

            {!f.photo && (
              <p className="mt-3">
                <Placeholder>[PHOTO — public/brand/, 4:5 portrait]</Placeholder>
              </p>
            )}
          </div>
        ))}
      </div>

      <dl className="mt-14 grid max-w-2xl gap-3 text-body text-[color:var(--text-secondary)]">
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
