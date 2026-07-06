/**
 * Packages page content — sourced from the Canonical Package
 * Specification v1.0 (§6 Upgrade Rules, §7 Boundaries, §9 Pricing
 * Policy, §10 Package Matrix). Do not edit without founder sign-off.
 */

export const matrix = {
  columns: ["Respond", "Operate", "Scale"] as const,
  rows: [
    { label: "Monthly price", values: ["S$688", "S$988", "S$1,488"] },
    { label: "Implementation fee", values: ["S$888", "S$888", "S$888"] },
    { label: "Minimum commitment", values: ["6 months", "6 months", "6 months"] },
    { label: "Instant WhatsApp AI response", values: ["Included", "Included", "Included"] },
    { label: "Lead qualification & CRM pipeline", values: ["Included", "Included", "Included"] },
    { label: "Booking automation (BookingBot)", values: ["—", "Included", "Included"] },
    { label: "Invoicing & collection (InvoiceFlow)", values: ["—", "Included", "Included"] },
    { label: "Professional website", values: ["—", "—", "Included"] },
    { label: "AI Voice Agent", values: ["—", "Add-on +S$400", "Included"] },
    { label: "Past-customer reactivation", values: ["—", "—", "Included"] },
    { label: "Monthly performance report", values: ["Included", "Included", "Included"] },
    { label: "Monthly strategy call", values: ["—", "—", "30 min"] },
    { label: "Support", values: ["WhatsApp · 4-hr", "WhatsApp · 4-hr", "WhatsApp · 4-hr"] },
    { label: "Guarantee", values: ["30-Day Response", "30-Day Response", "30-Day Response"] },
  ],
};

export const pricingPolicy = [
  {
    term: "Payment terms",
    detail:
      "Invoiced on the 1st of each month, due within 7 days. Paid by Stripe card link or PayNow Corporate.",
  },
  {
    term: "Minimum commitment",
    detail:
      "6 months on all three packages, then month-to-month. An upgrade does not reset the minimum.",
  },
  {
    term: "Upgrades",
    detail:
      "Additive and frictionless: you keep everything you rely on and the next layer switches on. No re-onboarding, no second implementation fee. The new price applies from the next billing cycle.",
  },
  {
    term: "Standard discounts",
    detail:
      "Annual prepayment: 8%. Multi-location: 15% for 3 or more locations. These are the only two — the monthly fee is never discounted to close a deal.",
  },
  {
    term: "Price changes",
    detail:
      "Increases apply to new clients only — never retroactively. Existing clients receive 90 days' written notice before any change affects a renewal.",
  },
  {
    term: "Cancellation",
    detail:
      "After the 6-month minimum, either party may end the engagement with 30 days' written notice. The implementation fee is non-refundable; the monthly fee is refundable only under the guarantee.",
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
