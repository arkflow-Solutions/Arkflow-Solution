"use client";

import Link from "next/link";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { SectionHead } from "@/components/home/v2/shared";
import { Inbox, MessageSquare } from "lucide-react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ChannelIcon } from "@/components/ui/channel-icon";
import { CHANNEL_COLOR } from "@/lib/channel-icons";
import { engine, inbox } from "@/lib/home-content";
import { cn } from "@/lib/utils";

/* ========================================================= 5 · ENGINE */

export function EngineJourney() {
  return (
    <Section className="hairline" id="the-engine">
      <Container>
        <SectionHead
          eyebrow={engine.eyebrow}
          title={engine.title}
          lead={engine.lead}
        />

        <ol className="mt-16">
          {engine.stages.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.04}>
              <li className="af-stage">
                <div className="af-stage__marker" aria-hidden>
                  <span className="af-stage__dot" />
                  {i < engine.stages.length - 1 && (
                    <span className="af-stage__line" />
                  )}
                </div>
                <div className="pb-12">
                  <p className="font-mono text-eyebrow uppercase text-blue-soft">
                    {s.name}
                  </p>
                  <p className="mt-3 max-w-prose text-body text-[color:var(--text-secondary)]">
                    {s.body}
                  </p>
                  {"href" in s && s.href && (
                    <Link
                      href={s.href}
                      className="mt-3 inline-block text-small text-blue-soft underline underline-offset-4 transition-colors hover:text-white"
                    >
                      See how we build the front door &rarr;
                    </Link>
                  )}
                </div>
              </li>
            </Reveal>
          ))}
        </ol>

        {/* The one surviving line from the retired "Second admin" section. */}
        <Reveal className="mt-4">
          <p className="max-w-2xl text-subheading font-medium leading-snug">
            {engine.close}
          </p>
          {/* Amendment 8 (v1.4) — approved supporting line. */}
          <p className="mt-4 max-w-2xl text-body text-[color:var(--text-secondary)]">
            {engine.frontDoor}{" "}
            <Link
              href={engine.frontDoorHref}
              className="text-blue-soft underline underline-offset-4 transition-colors hover:text-white"
            >
              See website work &rarr;
            </Link>
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}

/* ==================================================== 6 · UNIFIED INBOX */

export function UnifiedInbox() {
  return (
    <Section className="hairline" id="unified-inbox">
      <Container>
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* --- left: the claim, and the channels it covers --- */}
          <Reveal>
            <Eyebrow>{inbox.eyebrow}</Eyebrow>
            <h2 className="mt-6 text-heading font-semibold">{inbox.title}</h2>
            <p className="mt-6 max-w-prose text-lead text-[color:var(--text-secondary)]">
              {inbox.lead}
            </p>

            <ul className="mt-10 flex flex-wrap gap-3">
              {inbox.channels.map((name) => (
                <li
                  key={name}
                  className="flex items-center gap-2.5 rounded-button border border-[color:var(--border-subtle)] bg-surface/50 py-2 pl-2 pr-4 text-small text-white"
                >
                  <ChannelBadge name={name} size={26} />
                  {name}
                </li>
              ))}
            </ul>
          </Reveal>

          {/* --- right: the inbox itself --- */}
          <Reveal delay={0.08}>
            <div className="overflow-hidden rounded-card border border-[color:var(--border-subtle)] bg-surface/70 shadow-[0_24px_80px_-32px_rgba(0,0,0,0.9)]">
              <div className="flex items-center justify-between border-b border-[color:var(--border-subtle)] px-5 py-4">
                <div className="flex items-center gap-3">
                  <Inbox size={18} aria-hidden className="text-blue-soft" />
                  <p className="text-body font-medium text-white">
                    {inbox.panel.title}
                  </p>
                </div>
                <span className="rounded-button border border-blue/40 px-3 py-1 font-mono text-[0.625rem] uppercase tracking-wider text-blue-soft">
                  {inbox.panel.badge}
                </span>
              </div>

              <ul className="divide-y divide-[color:var(--border-subtle)]">
                {inbox.panel.conversations.map((c) => (
                  <li
                    key={c.from}
                    className={cn(
                      "flex items-center gap-4 px-5 py-4",
                      c.unread && "bg-blue/[0.07]"
                    )}
                  >
                    <ChannelBadge name={c.channel} size={38} avatar />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-body font-medium text-white">
                        {c.from}
                      </p>
                      <p className="truncate text-small text-[color:var(--text-secondary)]">
                        {c.preview}
                      </p>
                    </div>
                    {c.unread && (
                      <span
                        aria-label="Unread"
                        className="h-2 w-2 shrink-0 rounded-full bg-blue"
                      />
                    )}
                  </li>
                ))}
              </ul>

              <p className="border-t border-[color:var(--border-subtle)] px-5 py-3 text-center font-mono text-[0.625rem] uppercase tracking-wider text-[color:var(--text-tertiary)]">
                Illustration
              </p>
            </div>

            <p className="mt-8 text-subheading font-medium leading-snug">
              {inbox.close}
            </p>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

/**
 * A channel mark on its brand-coloured tile. Brand colour is confined to
 * this badge — the page accent stays #1A3CFF everywhere else.
 */
function ChannelBadge({
  name,
  size,
  avatar = false,
}: {
  name: string;
  size: number;
  avatar?: boolean;
}) {
  const color = CHANNEL_COLOR[name] ?? "#8B93A7";

  if (!avatar) {
    return (
      <span
        className="flex items-center justify-center rounded-[9px]"
        style={{
          width: size,
          height: size,
          background: `color-mix(in srgb, ${color} 18%, transparent)`,
          color,
        }}
      >
        <ChannelIcon name={name} size={Math.round(size * 0.54)} />
      </span>
    );
  }

  return (
    <span className="relative shrink-0" style={{ width: size, height: size }}>
      <span
        className="flex h-full w-full items-center justify-center rounded-full border border-[color:var(--border-subtle)] bg-ink"
        aria-hidden
      >
        <MessageSquare size={16} className="text-[color:var(--text-tertiary)]" />
      </span>
      <span
        className="absolute -bottom-0.5 -right-0.5 flex items-center justify-center rounded-md border-2 border-surface"
        style={{ width: 18, height: 18, background: color, color: "#fff" }}
      >
        <ChannelIcon name={name} size={10} />
      </span>
    </span>
  );
}

/*
 * REMOVED — "What ArkFlow provides" (six-group feature grid) and
 * "Second admin". The grid now lives on /solutions, which already
 * carries all six layers in more depth. Its one homepage-worthy line
 * survives as engine.close in the journey section above.
 */
