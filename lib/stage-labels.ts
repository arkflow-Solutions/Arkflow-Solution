/**
 * PUBLIC STAGE LABELS — presentation layer only.
 *
 * The canonical Revenue Engine is ten stages with fixed keys:
 *
 *   Attract · Capture · Respond · Qualify · Book
 *   Convert · Follow Up · Retain · Reactivate · Grow
 *
 * Those keys are the data model. They live in lib/revenue-content.ts
 * (`key`) and lib/throughline.ts (`label`), scripts/verify.mjs check 4
 * asserts them in order, and NOTHING in this file may change them.
 *
 * WHY THIS FILE EXISTS
 * The homepage is read by business owners who do not know what
 * "Attract" or "Reactivate" mean as stages of anything. They know what
 * a website is, and what it means for a customer to come back. Making
 * them learn our vocabulary before they can understand their own
 * problem is a tax we were charging for no reason.
 *
 * So the public site says "Website" where the model says "Attract".
 * Same stage, same key, same governance — a different word on the
 * screen. The technical name stays available for anyone who wants it.
 *
 * WHY A SEPARATE FILE RATHER THAN A FIELD ON THE STAGE
 * Because the alternative is editing lib/throughline.ts, which is the
 * canonical geometry and semantics of the whole design system, in order
 * to change a caption. Keeping the mapping here means the canonical
 * files are untouched by presentation decisions, and it stays obvious
 * to the next reader that these strings are cosmetic. If this map is
 * deleted, the site falls back to the canonical names and still works.
 *
 * Founder decision, 7 September 2026. Do not add a stage here that is
 * not in the canonical ten, and do not use these strings as identity —
 * they are display text and nothing else.
 */

/** The canonical keys, exactly as check 4 asserts them. */
export type CanonicalStage =
  | "Attract"
  | "Capture"
  | "Respond"
  | "Qualify"
  | "Book"
  | "Convert"
  | "Follow Up"
  | "Retain"
  | "Reactivate"
  | "Grow";

/**
 * Canonical key -> the word a business owner already knows.
 *
 * Approved 7 September 2026. Changing any value here is a copy change
 * and needs sign-off; changing a KEY breaks the canonical model and
 * will fail the build.
 */
export const PUBLIC_STAGE_LABEL: Record<CanonicalStage, string> = {
  Attract: "Website",
  Capture: "Enquiry",
  Respond: "Response",
  Qualify: "Qualification",
  Book: "Booking",
  Convert: "Conversion",
  "Follow Up": "Follow-up",
  Retain: "Retention",
  Reactivate: "Reactivation",
  Grow: "Growth",
};

/**
 * Public label for a canonical key.
 *
 * Falls back to the canonical name for anything unrecognised, so a new
 * stage is merely untranslated rather than missing. Never throws — a
 * caption is not worth a runtime error.
 */
export function publicLabel(canonical: string): string {
  return PUBLIC_STAGE_LABEL[canonical as CanonicalStage] ?? canonical;
}

/**
 * Whether the public wording differs from the canonical name. Used to
 * decide if the technical term is worth showing as secondary detail:
 * "Response" and "Respond" do not need explaining, "Website" does.
 */
export function hasDistinctLabel(canonical: string): boolean {
  const p = PUBLIC_STAGE_LABEL[canonical as CanonicalStage];
  return Boolean(p) && p.toLowerCase() !== canonical.toLowerCase();
}
