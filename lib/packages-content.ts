/**
 * Packages page content — sourced from the Canonical Package
 * Specification v1.0 (§6 Upgrade Rules, §7 Boundaries, §9 Pricing
 * Policy, §10 Package Matrix), as amended by AMENDMENTS-v1.1.
 *
 * AMENDMENT 2 — no price, implementation fee or discount appears on any
 * public surface. §09 and §10 remain canonical INTERNALLY; they are not
 * published. Do not reintroduce a price row.
 * AMENDMENT 1 — AI Voice Agent is Scale-only. The Operate add-on is gone.
 * AMENDMENT 6 — RenewalRadar is Operate and above, no longer Scale-only.
 * AMENDMENTS 5 & 7 — ad-source tracking and personalised recall on all levels.
 *
 * Do not edit without founder sign-off.
 */

export const matrix = {
  columns: ["Respond", "Operate", "Scale"] as const,
  rows: [
    { label: "Minimum commitment", values: ["6 months", "6 months", "6 months"] },
    { label: "Instant WhatsApp AI response", values: ["Included", "Included", "Included"] },
    { label: "Lead qualification & CRM pipeline", values: ["Included", "Included", "Included"] },
    { label: "Booking automation (BookingBot)", values: ["—", "Included", "Included"] },
    { label: "Invoicing & collection (InvoiceFlow)", values: ["—", "Included", "Included"] },
    { label: "Professional website", values: ["—", "—", "Included"] },
    { label: "AI Voice Agent", values: ["—", "—", "Included"] },
    { label: "Past-customer reactivation (RenewalRadar)", values: ["—", "Included", "Included"] },
    { label: "Personalised recall — birthday & last visit", values: ["Included", "Included", "Included"] },
    { label: "Ad source tracking — Meta, Google, TikTok", values: ["Included", "Included", "Included"] },
    { label: "Monthly performance report", values: ["Included", "Included", "Included"] },
    { label: "Monthly strategy call", values: ["—", "—", "30 min"] },
    { label: "Support", values: ["WhatsApp · 4-hr", "WhatsApp · 4-hr", "WhatsApp · 4-hr"] },
    { label: "Guarantee", values: ["30-Day Response", "30-Day Response", "30-Day Response"] },
  ],
};

export const pricingPolicy = [
  {
    term: "How pricing works",
    detail:
      "Every ArkFlow system is configured around how your business actually operates, so we quote rather than publish a list. The discovery call establishes what you need; the quotation follows from it.",
  },
  {
    term: "Payment terms",
    detail:
      "Invoiced monthly on the 1st, due within 7 days. Paid by Stripe card link or PayNow Corporate.",
  },
  {
    term: "Minimum commitment",
    detail:
      "6 months on all three packages, then month-to-month. An upgrade does not reset the minimum.",
  },
  {
    term: "Upgrades",
    detail:
      "Additive and frictionless: you keep everything you rely on and the next layer switches on. No re-onboarding, and no second implementation. Upgrades are triggered by evidence in your own numbers, never by a calendar.",
  },
  {
    term: "Rate changes",
    detail:
      "Any change applies to new clients at signing only — never retroactively. Existing clients receive 90 days' written notice before a change affects a renewal.",
  },
  {
    term: "Cancellation",
    detail:
      "After the 6-month minimum, either party may end the engagement with 30 days' written notice. The implementation is non-refundable; the monthly fee is refundable only under the 30-Day Response Guarantee.",
  },
];

export const boundaries = {
  included: [
    "A fully managed system — built, tested, monitored and tuned by ArkFlow, every week",
    "Everything listed at your package tier, exactly as specified",
    "WhatsApp-first support with a 4-hour business-hours response",
    "A monthly performance report you can read in five minutes",
  ],
  notIncluded: [
    "Paid advertising or content marketing — keep your agency; we make sure their leads convert",
    "Medical advice of any kind — anything clinical is handed to your team immediately",
    "General IT support, hardware, or systems outside the scope of your package",
    "Anything beyond your tier — out-of-scope work is quoted separately, before it begins. No surprise invoices.",
  ],
};
