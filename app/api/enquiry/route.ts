import { NextResponse } from "next/server";

/**
 * Enquiry endpoint — modular and GoHighLevel-ready.
 *
 * The client never hardcodes a destination; it POSTs the enquiry here.
 * This route forwards to GoHighLevel (or any system) via an env var:
 *
 *   GHL_WEBHOOK_URL   A GoHighLevel inbound webhook / form-submit URL.
 *                     (Set in Vercel → Project → Settings → Environment
 *                     Variables. No code change needed.)
 *
 * If no env var is set, the enquiry is accepted and logged so the whole
 * experience works in preview. Swap in the GHL API later by editing only
 * this file — the UI stays untouched.
 */

export const runtime = "nodejs";

export async function POST(req: Request) {
  let data: unknown;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
  }

  const webhook = process.env.GHL_WEBHOOK_URL;

  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        return NextResponse.json(
          { ok: false, error: "Upstream rejected the enquiry" },
          { status: 502 }
        );
      }
    } catch {
      return NextResponse.json(
        { ok: false, error: "Could not reach the enquiry service" },
        { status: 502 }
      );
    }
  } else {
    // No destination configured yet — accept so the UX works in preview.
    console.log("[enquiry] received (no GHL_WEBHOOK_URL configured):", data);
  }

  return NextResponse.json({ ok: true });
}
