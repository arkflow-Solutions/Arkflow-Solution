"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { track } from "@/lib/analytics";

/**
 * The one intake form behind both public entry points.
 *
 * REUSES THE EXISTING PIPELINE. It posts to /api/enquiry, the route that
 * already creates the GoHighLevel contact, applies tags and attaches the
 * answers as a note — including its honeypot field name and its rule
 * that a success response means a destination actually accepted the
 * enquiry. Building a second intake path would have meant a second place
 * for enquiries to disappear.
 *
 * WHAT DISTINGUISHES THE TWO USES is `source`, which becomes the tag in
 * GoHighLevel: the audit and the after-hours test are the same journey at
 * two depths, so they belong in one inbox, separable by tag.
 *
 * NO PII IN ANALYTICS. The events record that a form was started and
 * submitted and which page it was on. Never a field value.
 */

/** Matches HONEYPOT_FIELD in app/api/enquiry/route.ts. */
const HONEYPOT = "companyWebsite";

const GENERIC_ERROR =
  "Something went wrong sending that. Please try again, or email us directly.";

export function RequestForm({
  source,
  submitLabel,
  sendingLabel,
  note,
  startEvent,
  submitEvent,
  redirectTo,
}: {
  source: string;
  submitLabel: string;
  sendingLabel: string;
  note: string;
  startEvent: "audit_form_start" | "test_form_start";
  submitEvent: "audit_form_submit" | "test_form_submit";
  redirectTo: string;
}) {
  const router = useRouter();
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  /* A REF, NOT STATE. Measured: with state this fired five times on a
     single programmatic fill, because every input event in the same tick
     still saw `started === false` — React had not re-rendered yet.
     Browser autofill does exactly that, so the form-start count would
     have been inflated by real visitors, not just by the test. A ref
     updates synchronously. */
  const started = useRef(false);

  /* Fired once, on the first keystroke — not on render, which would
     count everyone who scrolled past. */
  const onFirstInput = () => {
    if (started.current) return;
    started.current = true;
    track(startEvent, { location: source });
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sending) return;
    setError(null);
    setSending(true);

    const data = new FormData(e.currentTarget);
    const firstName = String(data.get("firstName") ?? "").trim();
    const lastName = String(data.get("lastName") ?? "").trim();

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          name: `${firstName} ${lastName}`.trim(),
          email: String(data.get("email") ?? "").trim(),
          phone: String(data.get("phone") ?? "").trim(),
          message: String(data.get("message") ?? "").trim(),
          [HONEYPOT]: String(data.get(HONEYPOT) ?? ""),
          source,
        }),
      });

      if (!res.ok) {
        /* The route returns a safe, human message; fall back to a
           generic one rather than surfacing anything unexpected. */
        let msg = GENERIC_ERROR;
        try {
          const body = await res.json();
          if (body && typeof body.error === "string") msg = body.error;
        } catch {
          /* non-JSON error body — keep the generic message */
        }
        setError(msg);
        setSending(false);
        return;
      }
    } catch {
      setError(GENERIC_ERROR);
      setSending(false);
      return;
    }

    track(submitEvent, { location: source });
    router.push(redirectTo);
  }

  return (
    <form onSubmit={onSubmit} onInput={onFirstInput} className="af-form" noValidate={false}>
      <div className="af-form__row">
        <label className="af-field">
          <span className="af-field__label">First name</span>
          <input name="firstName" type="text" required autoComplete="given-name" maxLength={80} />
        </label>
        <label className="af-field">
          <span className="af-field__label">Last name</span>
          <input name="lastName" type="text" required autoComplete="family-name" maxLength={80} />
        </label>
      </div>

      <div className="af-form__row">
        <label className="af-field">
          <span className="af-field__label">Email</span>
          <input name="email" type="email" required autoComplete="email" maxLength={254} />
        </label>
        <label className="af-field">
          <span className="af-field__label">
            Phone <span className="af-field__opt">optional</span>
          </span>
          <input name="phone" type="tel" autoComplete="tel" maxLength={32} />
        </label>
      </div>

      <label className="af-field">
        <span className="af-field__label">
          Your business, and where enquiries arrive{" "}
          <span className="af-field__opt">optional</span>
        </span>
        <textarea name="message" rows={3} maxLength={2000} />
      </label>

      {/* Honeypot. Hidden from people, irresistible to bots. */}
      <div className="af-hp" aria-hidden>
        <label>
          Company website
          <input name={HONEYPOT} type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {error && (
        <p role="alert" className="af-form__error">
          {error}
        </p>
      )}

      <div className="af-form__actions">
        <Button type="submit" size="large" withArrow disabled={sending}>
          {sending ? sendingLabel : submitLabel}
        </Button>
        <p className="af-form__note">{note}</p>
      </div>
    </form>
  );
}
