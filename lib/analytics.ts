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

/** The full event taxonomy. Adding an event means adding it here first. */
export type ArkFlowEvent =
  // Hero
  | 'cta_hero_primary_click' // Get Your Lead Response Audit
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
  // Packages
  | 'package_cta_click'
  | 'package_comparison_view'
  // Interactive
  | 'demo_interaction'
  | 'calculator_start'
  | 'calculator_input_change'
  | 'calculator_result_view'
  | 'calculator_to_audit_click'
  // Content
  | 'industry_cta_click'
  | 'case_study_view'
  | 'trust_page_view'
  // Footer / closing
  | 'cta_final_click'

/**
 * Allowed parameter values. Constrained to primitives so a free-text
 * field cannot be passed in by accident.
 */
type EventParams = {
  /** Section or page the interaction originated from, e.g. 'homepage_hero'. */
  location?: string
  /** Package tier where relevant: 'respond' | 'operate' | 'scale'. */
  tier?: 'respond' | 'operate' | 'scale'
  /** Industry slug where relevant, e.g. 'aesthetic-clinics'. */
  industry?: string
  /** Which calculator field changed — the field NAME only, never its value. */
  field?: string
  /** Ordinal step in a multi-step flow. */
  step?: number
}

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

  const payload = stripPii(params)

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
