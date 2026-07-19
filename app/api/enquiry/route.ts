import { NextResponse } from "next/server";

/**
 * Enquiry endpoint — modular and GoHighLevel-ready.
 *
 * Set GHL_WEBHOOK_URL (Vercel → Settings → Environment Variables) to the
 * GoHighLevel Inbound Webhook URL and this route forwards each enquiry to
 * it. No endpoints are hardcoded in the client.
 *
 * This version logs each step to the Vercel runtime logs (prefix
 * "[enquiry]") so delivery can be verified end-to-end.
 */

export const runtime = "nodejs";

export async function POST(req: Request) {
  let data: unknown;
  try {
    data = await req.json();
  } catch {
    console.log("[enquiry] bad JSON body");
    return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
  }

  const webhook = process.env.GHL_WEBHOOK_URL;
  console.log("[enquiry] received. GHL_WEBHOOK_URL present:", Boolean(webhook));

  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = await res.text().catch(() => "");
      console.log(
        "[enquiry] forwarded to GHL. status:",
        res.status,
        "response:",
        body.slice(0, 300)
      );
      if (!res.ok) {
        return NextResponse.json(
          { ok: false, error: "Upstream rejected the enquiry" },
          { status: 502 }
        );
      }
    } catch (err) {
      console.log("[enquiry] forward threw:", String(err));
      return NextResponse.json(
        { ok: false, error: "Could not reach the enquiry service" },
        { status: 502 }
      );
    }
  } else {
    console.log(
      "[enquiry] NO GHL_WEBHOOK_URL configured — logging only:",
      JSON.stringify(data).slice(0, 300)
    );
  }

  return NextResponse.json({ ok: true });
}
