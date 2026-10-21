import { AUDIT_URL } from "@/lib/site";

/**
 * The site's two calls to action, written down once.
 *
 * WHY THIS FILE EXISTS. Before 21 October 2026 the site asked for the
 * same thing in five different ways — "Get free audit", "Get your free
 * Revenue Leak Audit", "Book a Discovery Call", "Book Discovery Call"
 * and "Book Your Free Discovery Call" — across twenty-nine call sites,
 * and they did not all go to the same place. Two of those labels
 * opened a booking modal and the rest went to the audit funnel, so a
 * visitor who saw one button on the homepage and a differently worded
 * one on /solutions had no way of knowing whether they were being
 * offered one thing or two.
 *
 * ONE PRIMARY, ONE SECONDARY, AND THEY NEVER VARY.
 *   Primary    "Get your free Revenue Leak Audit"  -> AUDIT_URL
 *   Secondary  "See how it works"                  -> /how-it-works
 *
 * Import these rather than typing the words. A literal CTA string in a
 * component is how the five variants happened in the first place.
 *
 * THE BOOKING MODAL HAS NOT GONE. It is the scheduling step AFTER
 * someone has asked for the audit — /audit/thank-you — rather than the
 * first thing asked of a stranger. It is no longer a competing CTA on
 * marketing pages.
 */
export const CTA_PRIMARY = "Get your free Revenue Leak Audit";

/**
 * The same action, shortened for the fixed navigation bar only.
 *
 * The full label is 32 characters and will not sit beside six nav
 * items and the wordmark below about 1400px without wrapping the bar.
 * This is the one place the wording is allowed to differ, it still
 * names the same offer, and it goes to the identical destination.
 * Do not use it anywhere else.
 */
export const CTA_PRIMARY_COMPACT = "Free Revenue Leak Audit";

export const CTA_PRIMARY_HREF = AUDIT_URL;

export const CTA_SECONDARY = "See how it works";
export const CTA_SECONDARY_HREF = "/how-it-works";

/**
 * The response-time claim, written down once.
 *
 * SETTLED 21 October 2026. The site carried three different promises:
 * the hero said "replies in minutes", five places said "in seconds",
 * and three said "90 seconds". A prospect reading two pages caught us
 * contradicting ourselves about the one thing we sell.
 *
 * "Minutes" is the claim, because it is the one that holds at 2am on a
 * public holiday weekend when a message has to queue behind a provider
 * retry. Seconds is what usually happens and is not what we promise.
 * Use RESPONSE_TIME in copy; do not write a faster number next to it.
 */
export const RESPONSE_TIME = "in minutes";
