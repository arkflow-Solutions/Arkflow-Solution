import { NextResponse } from "next/server";

/**
 * Enquiry endpoint — delivers website enquiries into GoHighLevel.
 *
 * Delivery is tried in this order, so you can pick whichever you've set up:
 *
 * 1. GoHighLevel Contacts API (RECOMMENDED — most reliable)
 *      GHL_API_TOKEN    Private Integration token (scope: contacts.write)
 *      GHL_LOCATION_ID  Your GHL location (sub-account) ID
 *    Creates/updates the contact directly. No webhook, no regenerating
 *    IDs, no premium-trigger charges.
 *
 * 2. Inbound webhook (fallback)
 *      GHL_WEBHOOK_URL  A GoHighLevel Inbound Webhook URL
 *
 * 3. Neither set — the enquiry is logged so the UX still works.
 *
 * Everything is logged to the Vercel runtime logs with the "[enquiry]"
 * prefix so delivery can be verified end-to-end.
 */

export const runtime = "nodejs";

type Enquiry = {
  firstName?: string;
  lastName?: string;
  name?: string;
  business?: string;
  businessType?: string;
  volume?: string;
  help?: string;
  email?: string;
  phone?: string;
  preferred?: string;
  message?: string;
};

export async function POST(req: Request) {
  let data: Enquiry;
  try {
    data = (await req.json()) as Enquiry;
  } catch {
    console.log("[enquiry] bad JSON body");
    return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
  }

  const token = process.env.GHL_API_TOKEN;
  const locationId = process.env.GHL_LOCATION_ID;
  const webhook = process.env.GHL_WEBHOOK_URL;

  console.log(
    "[enquiry] received. contactsApi:",
    Boolean(token && locationId),
    "webhook:",
    Boolean(webhook)
  );

  // 1) Preferred: create the contact directly via the GHL Contacts API.
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
          firstName: data.firstName || data.name || "",
          lastName: data.lastName || "",
          email: data.email,
          phone: data.phone || undefined,
          companyName: data.business || undefined,
          source: "ArkFlow website",
          // Tags drive the GoHighLevel workflow: it enrols on
          // "website-enquiry", and the confirmation branch reads the
          // "prefers-*" tag to decide WhatsApp vs Email.
          tags: [
            "website-enquiry",
            "hot-lead",
            `prefers-${(data.preferred || "email").toLowerCase()}`,
          ],
        }),
      });
      const body = await res.text().catch(() => "");
      console.log("[enquiry] GHL Contacts API status:", res.status, body.slice(0, 400));

      if (res.ok) {
        // Attach the enquiry details as a Note (separate endpoint —
        // create-contact does not accept notes inline). Best-effort:
        // never fail the request if the note step has an issue.
        try {
          const parsed = JSON.parse(body) as { contact?: { id?: string } };
          const contactId = parsed.contact?.id;
          const noteText = [
            data.business && `Business: ${data.business}`,
            data.businessType && `Type: ${data.businessType}`,
            data.volume && `Monthly enquiries: ${data.volume}`,
            data.help && `Wants help with: ${data.help}`,
            data.preferred && `Preferred contact: ${data.preferred}`,
            data.message && `Message: ${data.message}`,
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
            console.log("[enquiry] GHL note status:", noteRes.status);
          }
        } catch (noteErr) {
          console.log("[enquiry] note step skipped:", String(noteErr));
        }
        return NextResponse.json({ ok: true });
      }
      // fall through to the webhook if the API rejected it
    } catch (err) {
      console.log("[enquiry] Contacts API threw:", String(err));
    }
  }

  // 2) Fallback: inbound webhook.
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = await res.text().catch(() => "");
      console.log("[enquiry] webhook status:", res.status, body.slice(0, 300));
      if (!res.ok) {
        return NextResponse.json(
          { ok: false, error: "Upstream rejected the enquiry" },
          { status: 502 }
        );
      }
      return NextResponse.json({ ok: true });
    } catch (err) {
      console.log("[enquiry] webhook threw:", String(err));
      return NextResponse.json(
        { ok: false, error: "Could not reach the enquiry service" },
        { status: 502 }
      );
    }
  }

  // 3) Nothing configured yet — accept so the UX works.
  console.log("[enquiry] no destination configured:", JSON.stringify(data).slice(0, 300));
  return NextResponse.json({ ok: true });
}
