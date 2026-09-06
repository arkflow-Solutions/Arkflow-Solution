/**
 * ArkFlow — conversion tracking foundation.
 *
 * PRIVACY RULE, ENFORCED IN CODE: no personally identifiable information
 * is ever placed in an event payload. No email, no phone, no name, no
 * free-text field contents. Events record WHAT happened and WHERE, never WHO.
 * The identity join happens in GHL against the contact record, not here.
 *
 * Vendor-agnostic. Wire `dispatch` to GA4, Plausible or PostHog in one place.
 */

/**
 * The full event taxonomy. Adding an event means adding it here first.
 *
 * PRUNED 6 September 2026. Thirteen events were removed because the
 * surface that fired them no longer exists: the /packages route and its
 * cards (`package_cta_click`, `package_comparison_view`,
 * `package_expand`), the ROI calculator (`calculator_start`,
 * `calculator_input_change`, `calculator_result_view`,
 * `calculator_to_audit_click`), the trust page (`trust_page_view`), the
 * lead magnets (`lead_magnet_view`, `lead_magnet_submit`), the website
 * build and revamp views (`website_build_view`, `website_revamp_view`),
 * and `lead_response_audit_submit`.
 *
 * WHY PRUNE RATHER THAN LEAVE: this union is the taxonomy's
 * documentation. An event that can never fire reads as instrumentation
 * that exists, so an analyst waits for data that is not coming and a
 * developer assumes the surface is still there. Deleting it is the only
 * way the list stays true.
 *
 * WHAT WAS DELIBERATELY KEPT: events whose surface exists but is not
 * yet instrumented — `booking_widget_open`, `contact_form_submit`,
 * `email_click`, `phone_click`, `case_study_view`, `attract_page_view`
 * and the rest. Those are gaps in coverage, not dead entries, and
 * removing them would hide work still owed.
 *
 * RETIRED 6 September 2026 with the CTA migration:
 * `revenue_leak_audit_click` and `lead_response_audit_click`. Both fired
 * from the audit-funnel button, which no longer exists — the canonical
 * conversion is now the booking modal and fires `discovery_call_click`.
 * Historical GA4 data under the old keys is unaffected by removing them
 * here; nothing can send to them any more, so listing them would claim
 * instrumentation that does not exist.
 */
export type ArkFlowEvent =
  // Hero
  | 'cta_hero_primary_click' // Book a Discovery Call
  | 'cta_hero_secondary_click' // See how ArkFlow works
  // Audit — the primary conversion
  | 'audit_form_view'
  | 'audit_form_start'
  | 'audit_form_submit'
  // Other enquiry paths
  | 'contact_form_submit'
  | 'quotation_request_submit'
  | 'whatsapp_click'
  | 'email_click'
  | 'phone_click'
  // Booking
  | 'booking_widget_open'
  | 'booking_widget_confirmed'
  // Interactive
  | 'demo_interaction'
  // Content — ArkFlow Intelligence
  | 'article_view'
  | 'article_50_percent'
  | 'article_complete'
  | 'article_card_click'
  | 'solution_view'
  | 'industry_cta_click'
  | 'case_study_view'
  // Conversion — canonical names
  | 'discovery_call_click'
  | 'discovery_call_booked'
  | 'cta_secondary_click'
  // Social — outbound, tracked so the ecosystem loop is measurable
  | 'instagram_click'
  | 'facebook_click'
  // Footer / closing
  | 'cta_final_click'
  // Website line (v1.4 Amendment 8)
  | 'website_review_click'
  | 'attract_page_view'
  // Homepage v3 — "Book a Discovery Call" is the canonical conversion
  | 'engine_stage_view'
  | 'leak_stage_view'
  | 'ai_demo_play'
  | 'ai_demo_complete'
  | 'before_after_toggle'
  | 'industry_select'
  | 'scroll_depth'

/**
 * Allowed parameter values. Constrained to primitives so a free-text
 * field cannot be passed in by accident.
 */
type EventParams = {
  /** Section or page the interaction originated from, e.g. 'homepage_hero'. */
  location?: string
  /** Revenue Engine stage name, e.g. 'Respond'. A public label, never an identifier. */
  stage?: string
  /** Ordinal position within the ten-stage engine. */
  index?: number
  /** Scroll depth milestone: 25 | 50 | 75 | 100. */
  percent?: number
  /** Which side of a two-state comparison is shown. */
  view?: string
  /** Industry slug where relevant, e.g. 'aesthetic-clinics'. */
  industry?: string
  /** Which calculator field changed — the field NAME only, never its value. */
  field?: string
  /** Ordinal step in a multi-step flow. */
  step?: number
  /** Article slug — a public URL segment, never an identifier. */
  slug?: string
  /** Insights category slug. */
  category?: string
  /** Funnel level: discovery | problem | intent. */
  level?: string
}

import { readCampaign } from '@/lib/social'

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
    gtag?: (...args: unknown[]) => void
    plausible?: (name: string, opts?: { props: Record<string, unknown> }) => void
  }
}

const PII_KEYS = /email|phone|name|mobile|message|notes|address|nric/i

function stripPii(params: EventParams): Record<string, unknown> {
  const clean: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(params)) {
    if (PII_KEYS.test(key)) continue
    if (value === undefined || value === null) continue
    if (typeof value === 'object') continue
    clean[key] = value
  }
  return clean
}

/**
 * Fire a tracked event. Safe to call during SSR (no-ops on the server)
 * and safe to call when no analytics vendor is loaded.
 */
export function track(event: ArkFlowEvent, params: EventParams = {}): void {
  if (typeof window === 'undefined') return

  // Campaign attribution rides on every event so the social -> article ->
  // audit journey can be reconstructed. UTM fields only: readCampaign()
  // never returns arbitrary query parameters.
  const payload = { ...stripPii(params), ...readCampaign() }

  try {
    if (typeof window.gtag === 'function') {
      window.gtag('event', event, payload)
    } else if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event, ...payload })
    }

    if (typeof window.plausible === 'function') {
      window.plausible(event, { props: payload })
    }
  } catch {
    // Tracking must never break the page.
  }

  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.debug('[arkflow:track]', event, payload)
  }
}

/**
 * Convenience wrapper for onClick handlers.
 *
 *   <button onClick={onTrackedClick('cta_hero_primary_click',
 *     { location: 'homepage_hero' }, openBooking)}>
 */
export function onTrackedClick<E>(
  event: ArkFlowEvent,
  params: EventParams = {},
  then?: (e: E) => void
) {
  return (e: E) => {
    track(event, params)
    then?.(e)
  }
}
