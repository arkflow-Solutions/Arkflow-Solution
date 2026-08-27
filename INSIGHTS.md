# ArkFlow Intelligence — how to run it

## Publishing an article

1. Copy an existing file in `lib/insights/articles/`.
2. Import it in `lib/insights/index.ts` and add it to the `articles` array.

That is the whole process. Routing, sitemap, category page, related
content, schema and the homepage strip all derive from that array, so
there is no second list to keep in sync and no way to publish an article
that Google cannot reach.

The types enforce what governance cares about: every article must declare
a category, a funnel `level`, an author and a `solution` destination. An
article that dead-ends fails to compile.

## Funnel levels

`level` picks the closing CTA automatically:

| Level | Reader | Closing CTA framing |
|---|---|---|
| `discovery` | "what is X" | Soft — how much of this applies to you |
| `problem` | knows it costs them | Direct — put a number on it |
| `intent` | evaluating now | Hard — audit, then one recommendation |

The primary conversion is the Lead Response Audit at every level. Only
the framing changes.

## The AI category decision

Three pillars target AI terms. ArkFlow is not an AI agency, so the
resolution is answer framing: each AI pillar explains what the technology
is, when it is worth buying, **and what it does not fix**, then routes to
the operations argument. Read `what-is-an-ai-voice-agent` — it tells the
reader not to buy one if their phone is already answered. That is the
model for every AI article.

**"AI automation agency Singapore" was dropped as a target.** Ranking for
it asserts an identity the Founder Bible rejects.

**Expect off-target traffic.** "AI automation for small business" brings
retail, F&B and trades — outside Stage 1. Add an industry field to the
audit intake so these can be triaged before they consume a discovery call.

## Social

`lib/social.ts` is the only place a social URL may appear; the verify
script enforces it. Instagram is live. **Facebook is `null`** — every
Facebook affordance renders nothing until you supply the canonical page
URL. One line, and footer, article prompts and Organization `sameAs` all
pick it up.

### UTM

Use `campaignUrl()` rather than writing query strings by hand:

```ts
campaignUrl("/insights/lead-response/why-speed-to-lead-matters",
            "instagram", "speed to lead", "carousel-1")
```

Source and medium are type-constrained, so "ig" / "insta" / "Instagram"
cannot become three channels in your reporting. Campaign parameters are
attached to every analytics event automatically, so the
social → article → audit path is reconstructable.

## Analytics

38 events in `lib/analytics.ts`, including the full set from the brief.
Articles fire `article_view`, `article_50_percent` and `article_complete`.
The PII filter is enforced in code — no email, phone, name or free-text
value can enter a payload.

Still not wired: no analytics vendor is loaded. `track()` no-ops safely
until GA4 or Plausible is added. That is one script tag plus the existing
`dispatch` block.

## Package cards

Cards are now buttons that open a real dialog (focus managed, Escape
closes, scroll locked, focus returned). Content comes from `tiers[].detail`.
No price appears — the dialog routes to the audit, which is where scope
and therefore price is established.

The LED border is one conic gradient masked to a 1px ring, animated via
`@property` rotation so it composites rather than repaints. Under
`prefers-reduced-motion` it becomes a static illuminated edge: the motion
is removed, the tier identity is not.

## Not built, and why

- **Lead magnets (§22)** — infrastructure without a real resource would be
  scaffolding for something that does not exist. Build when there is a
  document worth exchanging an email for.
- **Exit intent (§24)** — deliberately skipped. On a site with three
  articles it costs more trust than it captures.
- **Author bio (§9)** — name and role only. Supply real biographical
  detail and it renders wherever the byline appears.
- **Seven remaining articles (§44)** — three seeded properly rather than
  ten generated thinly, per your own instruction.
