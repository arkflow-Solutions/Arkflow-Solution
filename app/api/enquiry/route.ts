import { NextResponse } from "next/server";

/**
 * Enquiry endpoint — delivers website enquiries into GoHighLevel.
 *
 * DELIVERY ORDER
 *   1. GoHighLevel Contacts API  (primary — configured in Production)
 *        GHL_API_TOKEN    Private Integration token (scope: contacts.write)
 *        GHL_LOCATION_ID  GHL location (sub-account) ID
 *      Creates the contact, applies the workflow tags, then attaches the
 *      qualification answers as a Note.
 *   2. Inbound webhook           (optional fallback)
 *        GHL_WEBHOOK_URL  A GoHighLevel Inbound Webhook URL.
 *      Intentionally UNSET in Production. The route must work without it.
 *
 * THE RULE THIS ROUTE NOW ENFORCES
 * A success response means a destination actually accepted the enquiry.
 * Previously, when no destination was configured or the Contacts API
 * failed, this route logged the enquiry and returned `{ ok: true }` — the
 * visitor saw "Thank you." and the enquiry existed nowhere. Silent loss
 * behind a success message is the worst available failure mode, so every
 * undelivered path now returns a non-2xx and the form reports it.
 *
 * LOGGING
 * Operational only: outcome, error category, upstream HTTP status. No
 * names, emails, phone numbers, messages, qualification answers, request
 * payloads or upstream response bodies are ever written to the logs, on
 * any path including validation rejection. Never log the token.
 *
 * ERRORS RETURNED TO THE VISITOR
 * Generic and safe. Upstream status codes, GHL error text, environment
 * state and infrastructure details stay server-side.
 */

export const runtime = "nodejs";

/** Largest body we will read. The real form sends well under 4 KB. */
const MAX_BODY_BYTES = 16_384;

/** A plausible body has ~12 keys; far beyond that is not our form. */
const MAX_KEYS = 30;

/** Per-field ceilings. Generous for real input, bounded for abuse. */
const MAX = {
  firstName: 80,
  lastName: 80,
  business: 120,
  businessType: 80,
  volume: 40,
  help: 400,
  helpItem: 80,
  email: 254, // RFC 5321 practical maximum
  phone: 32,
  preferred: 24,
  message: 2000,
} as const;

const MAX_HELP_ITEMS = 20;

/**
 * Honeypot. Rendered off-screen and hidden from assistive technology, so
 * a human never sees it and a bot that fills every input does.
 * Must match the field name in components/contact/contact-experience.tsx.
 */
const HONEYPOT_FIELD = "companyWebsite";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Deliberately permissive: digits, spaces, +, -, ., and parentheses, with
 * a 7–15 digit count (E.164 allows at most 15). This accepts Singapore
 * local, +65, and every international format we could reasonably receive.
 * Phone is optional — an absent number is valid, a malformed one is not.
 */
const PHONE_SHAPE_RE = /^[+\d][\d\s().-]*$/;

type Outcome = "delivered" | "rejected" | "undelivered";

/** Operational log line. Never accepts user-supplied content. */
function log(outcome: Outcome, category: string, status?: number) {
  console.log(
    `[enquiry] ${outcome} category=${category}${
      status === undefined ? "" : ` upstream=${status}`
    }`
  );
}

function badRequest(error: string, field?: string) {
  return NextResponse.json(
    { ok: false, error, ...(field ? { field } : {}) },
    { status: 400 }
  );
}

function str(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

/** Required, present, and within its ceiling. */
function requireField(
  value: unknown,
  max: number,
  label: string,
  field: string
): { value: string } | { error: ReturnType<typeof badRequest> } {
  const v = str(value);
  if (!v) return { error: badRequest(`${label} is required.`, field) };
  if (v.length > max) {
    return { error: badRequest(`${label} is too long.`, field) };
  }
  return { value: v };
}

export async function POST(req: Request) {
  /* ---- 1. Size, then shape. Read as text so an oversized body is
           rejected before it is parsed. ---------------------------------- */
  let raw: string;
  try {
    raw = await req.text();
  } catch {
    log("rejected", "unreadable_body");
    return badRequest("We could not read that submission. Please try again.");
  }

  if (Buffer.byteLength(raw, "utf8") > MAX_BODY_BYTES) {
    log("rejected", "payload_too_large");
    return NextResponse.json(
      { ok: false, error: "That submission is too large. Please shorten your message." },
      { status: 413 }
    );
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    log("rejected", "malformed_json");
    return badRequest("We could not read that submission. Please try again.");
  }

  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    log("rejected", "not_an_object");
    return badRequest("We could not read that submission. Please try again.");
  }

  const body = parsed as Record<string, unknown>;

  if (Object.keys(body).length > MAX_KEYS) {
    log("rejected", "too_many_fields");
    return badRequest("We could not read that submission. Please try again.");
  }

  /* ---- 2. Honeypot ------------------------------------------------------
     A filled honeypot is a bot, not a visitor, so no human is misled by
     the success-shaped response. Returning 200 avoids telling the bot
     which field trapped it; a 400 here would teach it to omit the field
     next time. Nothing is delivered and nothing is stored. */
  if (str(body[HONEYPOT_FIELD])) {
    log("rejected", "honeypot");
    return NextResponse.json({ ok: true });
  }

  /* ---- 3. Field validation. Mirrors the multi-step form's own gates, so
           a submission the UI accepts is never rejected here. ------------- */
  const firstName = requireField(body.firstName, MAX.firstName, "First name", "firstName");
  if ("error" in firstName) return firstName.error;

  const lastName = requireField(body.lastName, MAX.lastName, "Last name", "lastName");
  if ("error" in lastName) return lastName.error;

  const business = requireField(body.business, MAX.business, "Business name", "business");
  if ("error" in business) return business.error;

  const businessType = requireField(body.businessType, MAX.businessType, "Business type", "businessType");
  if ("error" in businessType) return businessType.error;

  const volume = requireField(body.volume, MAX.volume, "Monthly enquiry volume", "volume");
  if ("error" in volume) return volume.error;

  /* `help` arrives as a comma-joined string from the current form, but an
     array is the more natural shape and older clients may still send one.
     Both are accepted and normalised to a single string. */
  let help = "";
  if (Array.isArray(body.help)) {
    if (body.help.length > MAX_HELP_ITEMS) {
      log("rejected", "help_too_many_items");
      return badRequest("Please select fewer options.", "help");
    }
    const items = body.help.map(str).filter(Boolean);
    if (items.some((i) => i.length > MAX.helpItem)) {
      log("rejected", "help_item_too_long");
      return badRequest("One of the selected options is not valid.", "help");
    }
    help = items.join(", ");
  } else {
    help = str(body.help);
  }
  if (!help) {
    log("rejected", "help_missing");
    return badRequest("Please tell us what you would like help with.", "help");
  }
  if (help.length > MAX.help) {
    log("rejected", "help_too_long");
    return badRequest("Please select fewer options.", "help");
  }

  const emailRaw = requireField(body.email, MAX.email, "Email address", "email");
  if ("error" in emailRaw) return emailRaw.error;
  const email = emailRaw.value;
  if (!EMAIL_RE.test(email)) {
    log("rejected", "email_invalid");
    return badRequest("That email address does not look right.", "email");
  }

  /* Phone is optional. Validate only when something was entered. */
  const phone = str(body.phone);
  if (phone) {
    if (phone.length > MAX.phone) {
      log("rejected", "phone_too_long");
      return badRequest("That phone number does not look right.", "phone");
    }
    const digits = phone.replace(/\D/g, "");
    if (!PHONE_SHAPE_RE.test(phone) || digits.length < 7 || digits.length > 15) {
      log("rejected", "phone_invalid");
      return badRequest("That phone number does not look right.", "phone");
    }
  }

  const preferred = str(body.preferred).slice(0, MAX.preferred);
  const message = str(body.message);
  if (message.length > MAX.message) {
    log("rejected", "message_too_long");
    return badRequest("Please shorten your message.", "message");
  }

  /* ---- 4. Delivery ------------------------------------------------------ */
  const token = process.env.GHL_API_TOKEN;
  const locationId = process.env.GHL_LOCATION_ID;
  const webhook = process.env.GHL_WEBHOOK_URL;

  const undeliverable = () =>
    NextResponse.json(
      {
        ok: false,
        error:
          "We could not send that just now. Please try again in a moment, or reach us on WhatsApp or email.",
      },
      { status: 502 }
    );

  // 4a. Primary: GoHighLevel Contacts API.
  if (token && locationId) {
    const ghlHeaders = {
      Authorization: `Bearer ${token}`,
      Version: "2021-07-28",
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    try {
      const res = await fetch("https://services.leadconnectorhq.com/contacts/", {
        method: "POST",
        headers: ghlHeaders,
        body: JSON.stringify({
          locationId,
          firstName: firstName.value,
          lastName: lastName.value,
          email,
          phone: phone || undefined,
          companyName: business.value,
          source: "ArkFlow website",
          // Tags drive the GoHighLevel workflow: it enrols on
          // "website-enquiry", and the confirmation branch reads the
          // "prefers-*" tag to decide WhatsApp vs Email.
          tags: [
            "website-enquiry",
            "hot-lead",
            `prefers-${(preferred || "email").toLowerCase()}`,
          ],
        }),
      });

      if (res.ok) {
        // Attach the qualification answers as a Note (separate endpoint —
        // create-contact does not accept notes inline). Best-effort: the
        // contact exists, so a note failure does not make this undelivered.
        try {
          const created = (await res.json()) as { contact?: { id?: string } };
          const contactId = created.contact?.id;
          const noteText = [
            `Business: ${business.value}`,
            `Type: ${businessType.value}`,
            `Monthly enquiries: ${volume.value}`,
            `Wants help with: ${help}`,
            preferred && `Preferred contact: ${preferred}`,
            message && `Message: ${message}`,
          ]
            .filter(Boolean)
            .join("\n");

          if (contactId && noteText) {
            const noteRes = await fetch(
              `https://services.leadconnectorhq.com/contacts/${contactId}/notes`,
              {
                method: "POST",
                headers: ghlHeaders,
                body: JSON.stringify({ body: noteText }),
              }
            );
            if (!noteRes.ok) log("delivered", "note_failed", noteRes.status);
          } else {
            log("delivered", "note_skipped_no_contact_id");
          }
        } catch {
          log("delivered", "note_step_threw");
        }

        log("delivered", "contacts_api", res.status);
        return NextResponse.json({ ok: true });
      }

      // Non-2xx from GHL. Status only — never the response body, which
      // echoes the contact record back.
      log("undelivered", "contacts_api_rejected", res.status);
    } catch {
      log("undelivered", "contacts_api_threw");
    }
  }

  // 4b. Optional fallback: inbound webhook. Only reached when the primary
  //     is unset or failed. Unset in Production, and that is supported.
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName.value,
          lastName: lastName.value,
          name: `${firstName.value} ${lastName.value}`.trim(),
          business: business.value,
          businessType: businessType.value,
          volume: volume.value,
          help,
          email,
          phone: phone || undefined,
          preferred: preferred || undefined,
          message: message || undefined,
          source: "ArkFlow website",
        }),
      });

      if (res.ok) {
        log("delivered", "webhook", res.status);
        return NextResponse.json({ ok: true });
      }
      log("undelivered", "webhook_rejected", res.status);
      return undeliverable();
    } catch {
      log("undelivered", "webhook_threw");
      return undeliverable();
    }
  }

  /* ---- 5. Nowhere to deliver --------------------------------------------
     Either nothing is configured, or the primary failed and no fallback
     exists. Both are genuine non-delivery. The visitor is told plainly
     rather than shown a false confirmation. */
  log("undelivered", token && locationId ? "primary_failed_no_fallback" : "no_destination_configured");
  return NextResponse.json(
    {
      ok: false,
      error:
        "We could not send that just now. Please try again in a moment, or reach us on WhatsApp or email.",
    },
    { status: 503 }
  );
}
