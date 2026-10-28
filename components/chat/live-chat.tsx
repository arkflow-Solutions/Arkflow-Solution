"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import {
  CHAT_WIDGET_ID,
  CHAT_WIDGET_LOADER,
  CHAT_WIDGET_RESOURCES,
} from "@/lib/site";

/**
 * LiveChat — the LeadConnector chat widget, loaded on first
 * interaction rather than on page load.
 *
 * WHY NOT JUST strategy="lazyOnload". That was the first attempt and
 * it was measured: three Lighthouse runs each, same build, same
 * machine, the only variable being whether the widget's hosts were
 * blocked.
 *
 *            performance      median LCP      median TBT
 *   loaded    61 / 58 / 57      15,120ms         395ms
 *   blocked   74 / 73 / 100      4,561ms         183ms
 *
 * The widget's own script only accounts for about 136ms of main
 * thread. The damage is the greeting card: a 301x150 panel with an
 * avatar image that paints several seconds after everything else and
 * becomes the largest contentful element on the page. LCP is the
 * metric that asks "when did the main thing appear", and a chat
 * bubble arriving late makes the honest answer fifteen seconds.
 *
 * WHY FIRST INTERACTION FIXES IT RATHER THAN HIDING IT. The browser
 * stops recording LCP at the first user input. Loading the widget on
 * that same input means it can never be the largest contentful paint,
 * for a real visitor as much as for a lab test. This is not a trick
 * to score well: the page a person receives is identical either way,
 * and the only thing deferred is an optional third-party widget.
 *
 * THE TRADE-OFF, STATED. A visitor who lands and never moves, scrolls
 * or taps will not see the chat bubble. That is the cost of this
 * approach and it is deliberate: someone who has not interacted with
 * the page at all was not about to open a chat. Any real scroll,
 * pointer move, tap or keypress brings it in, which in practice is
 * within a second or two of arriving. If you would rather it always
 * loaded, delete the gate below and accept the LCP figures above.
 *
 * NOT RENDERED WITHOUT AN ID — if CHAT_WIDGET_ID is emptied this
 * renders nothing, the same rule the social links follow.
 *
 * NO CONSENT GATE, AND THAT IS A DECISION NOT AN OVERSIGHT. The site
 * has no cookie banner. Lighthouse confirms the widget sets a
 * third-party cookie (__cf_bm, Cloudflare bot management) from its
 * own hosts, and the cookie policy now names the widget and the host
 * it comes from. Under Singapore's PDPA that is a defensible
 * position. If the site starts taking material EEA or UK traffic,
 * this needs a consent gate in front of it and the policy needs to
 * say so.
 */

/** Anything a real person does within seconds of arriving. */
const TRIGGERS = [
  "pointerdown",
  "pointermove",
  "touchstart",
  "keydown",
  "scroll",
  "wheel",
] as const;

export function LiveChat() {
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    if (!CHAT_WIDGET_ID) return;

    let done = false;
    const fire = () => {
      if (done) return;
      done = true;
      setArmed(true);
      for (const t of TRIGGERS) window.removeEventListener(t, fire);
    };

    /* passive: these must never delay a scroll. once: belt and braces
       alongside the `done` guard, which is what actually prevents a
       double mount when two events land in the same tick. */
    for (const t of TRIGGERS) {
      window.addEventListener(t, fire, { passive: true, once: true });
    }

    return () => {
      for (const t of TRIGGERS) window.removeEventListener(t, fire);
    };
  }, []);

  if (!CHAT_WIDGET_ID || !armed) return null;

  return (
    <Script
      id="leadconnector-chat-widget"
      src={CHAT_WIDGET_LOADER}
      data-resources-url={CHAT_WIDGET_RESOURCES}
      data-widget-id={CHAT_WIDGET_ID}
      strategy="afterInteractive"
    />
  );
}
