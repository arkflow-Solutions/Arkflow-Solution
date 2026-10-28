import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { BookCallButton } from "@/components/pages/book-call-button";
import { IllustrativeTag } from "@/components/home/v3/shared";
import { buildMetadata } from "@/lib/seo";
import { CONTACT_EMAIL, WHATSAPP_DISPLAY, WHATSAPP_URL } from "@/lib/site";
import {
  agent,
  care,
  challenge,
  close,
  connected,
  conversations,
  handover,
  optimise,
  overviewHero,
  pipelineStages,
  split,
  summary,
  working,
} from "@/lib/overview-content";

import "./overview.css";

/**
 * /overview — the "ArkFlow for Every Business" deck, as a page you
 * send someone instead of attaching a PDF.
 *
 * UNLISTED, NOT PRIVATE. Anyone who has the URL can open it. The page
 * is kept out of search and out of the site's own navigation, which
 * is what "hidden" means here, and it is the right level for a sales
 * deck. It is NOT protection: do not put anything on this page that
 * would matter if a stranger read it.
 *
 * HOW IT IS HIDDEN, and why each part is needed:
 *
 *   noIndex          buildMetadata emits <meta name="robots"
 *                    content="noindex">, which is the mechanism that
 *                    actually keeps it out of Google.
 *   X-Robots-Tag     next.config.mjs sends noindex, nofollow as a
 *                    header too, so the instruction survives even
 *                    when the HTML is not parsed.
 *   not in sitemap   app/sitemap.ts lists routes explicitly; this one
 *                    is deliberately absent.
 *   not linked       no navbar, footer or in-content link anywhere on
 *                    the site points here. An unlinked page is only
 *                    discoverable if someone shares the URL.
 *
 * DELIBERATELY NOT IN robots.txt. Adding "Disallow: /overview" would
 * publish the path to everyone who reads robots.txt — the file is the
 * first place anyone curious looks — and worse, it would stop
 * crawlers fetching the page at all, so they would never see the
 * noindex tag and the URL could still surface from an external link.
 * Disallow and noindex pull in opposite directions; noindex wins.
 *
 * CONTENT comes from lib/overview-content.ts, which is the deck's own
 * wording. Nothing was invented to fill a gap, and the slides'
 * "Illustrative" markers are reproduced wherever the deck carries
 * one.
 */
export const metadata = buildMetadata({
  title: "ArkFlow for Every Business",
  description:
    "How ArkFlow answers every enquiry, follows up automatically and keeps leads moving toward a booking, for service businesses in Singapore.",
  path: "/overview",
  noIndex: true,
});

export default function OverviewPage() {
  return (
    <>
      {/* ---------------------------------------------------- hero */}
      <section className="af-ov-hero">
        <Container>
          <Reveal>
            <Eyebrow>{overviewHero.eyebrow}</Eyebrow>
            <h1 className="af-ov-h1">{overviewHero.title}</h1>
            <ul className="af-ov-hero__lines">
              {overviewHero.lines.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
            <div className="mt-10">
              <BookCallButton size="large" withArrow location="overview_hero">
                Book a 15&ndash;20 minute meeting
              </BookCallButton>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ----------------------------------------------- challenge */}
      <Section className="hairline">
        <Container>
          <Reveal>
            <Eyebrow>{challenge.eyebrow}</Eyebrow>
            <h2 className="af-ov-h2">{challenge.title}</h2>
            <p className="af-ov-lead">{challenge.lead}</p>
          </Reveal>

          <ul className="af-ov-grid3">
            {challenge.items.map((item, i) => (
              <Reveal key={item.title} as="li" delay={i * 0.04} className="af-ov-cell">
                <h3 className="af-ov-cell__title">{item.title}</h3>
                <p className="af-ov-cell__body">{item.body}</p>
              </Reveal>
            ))}
          </ul>

          <Reveal>
            <p className="af-ov-close">{challenge.close}</p>
          </Reveal>
        </Container>
      </Section>

      {/* ------------------------------------------------ optimise */}
      <Section className="hairline">
        <Container>
          <Reveal>
            <Eyebrow>{optimise.eyebrow}</Eyebrow>
            <h2 className="af-ov-h2">{optimise.title}</h2>
            <p className="af-ov-lead">{optimise.lead}</p>
          </Reveal>

          <ol className="af-ov-grid3 af-ov-numbered">
            {optimise.items.map((item, i) => (
              <Reveal key={item.title} as="li" delay={i * 0.04} className="af-ov-cell">
                <span className="af-ov-cell__n">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="af-ov-cell__title">{item.title}</h3>
                <p className="af-ov-cell__body">{item.body}</p>
              </Reveal>
            ))}
          </ol>

          <Reveal>
            <p className="af-ov-note">{optimise.note}</p>
          </Reveal>
        </Container>
      </Section>

      {/* ----------------------------------------- connected system */}
      <Section className="hairline">
        <Container>
          <Reveal>
            <Eyebrow>{connected.eyebrow}</Eyebrow>
          </Reveal>

          <div className="af-ov-stack">
            {connected.items.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.05}>
                <article className="af-ov-panel">
                  <div className="af-ov-panel__head">
                    <h3 className="af-ov-panel__title">{item.title}</h3>
                    <IllustrativeTag />
                  </div>
                  <p className="af-ov-panel__body">{item.body}</p>

                  {/* The pipeline from slide 5, as labels only. The
                      names and counts on that slide are examples, so
                      no number travels with them. */}
                  {i === 1 && (
                    <ol className="af-ov-pipeline">
                      {pipelineStages.map((s) => (
                        <li key={s}>{s}</li>
                      ))}
                    </ol>
                  )}

                  <p className="af-ov-panel__note">{item.note}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* --------------------------------------------------- agent */}
      <Section className="hairline">
        <Container>
          <Reveal>
            <Eyebrow>{agent.eyebrow}</Eyebrow>
            <h2 className="af-ov-h2">{agent.title}</h2>
            <p className="af-ov-lead">{agent.lead}</p>
          </Reveal>

          <Reveal delay={0.05}>
            <ol className="af-ov-chain">
              {agent.chain.map((step, i) => (
                <li key={step}>
                  <span className="af-ov-chain__n">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
            <p className="af-ov-note">{agent.note}</p>
          </Reveal>
        </Container>
      </Section>

      {/* ------------------------------------------- conversations */}
      <Section className="hairline">
        <Container>
          <Reveal>
            <Eyebrow>{conversations.eyebrow}</Eyebrow>
            <h2 className="af-ov-h2">{conversations.title}</h2>
          </Reveal>

          <div className="af-ov-stack">
            {conversations.items.map((c, i) => (
              <Reveal key={c.label} delay={i * 0.05}>
                <article className="af-ov-panel">
                  <div className="af-ov-panel__head">
                    <p className="af-ov-panel__label">
                      {String(i + 1).padStart(2, "0")} &middot; {c.label}
                    </p>
                    <IllustrativeTag />
                  </div>
                  <h3 className="af-ov-panel__title">{c.headline}</h3>
                  <ol className="af-ov-steps">
                    {c.steps.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ol>
                  <p className="af-ov-panel__note">{c.note}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* --------------------------------------------- AI vs team */}
      <Section className="hairline">
        <Container>
          <Reveal>
            <Eyebrow>{split.eyebrow}</Eyebrow>
            <h2 className="af-ov-h2">{split.title}</h2>
          </Reveal>

          <div className="af-ov-split">
            {[split.ai, split.team].map((col, i) => (
              <Reveal key={col.title} delay={i * 0.06}>
                <h3 className={`af-ov-split__title${i === 1 ? " is-team" : ""}`}>
                  {col.title}
                </h3>
                <ul className="af-ov-split__items">
                  {col.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <p className="af-ov-note">{split.note}</p>
          </Reveal>
        </Container>
      </Section>

      {/* ------------------------------------------------ handover */}
      <Section className="hairline">
        <Container>
          <Reveal>
            <Eyebrow>{handover.eyebrow}</Eyebrow>
            <h2 className="af-ov-h2">{handover.title}</h2>
            <p className="af-ov-lead">{handover.lead}</p>
          </Reveal>

          <Reveal delay={0.05}>
            <ol className="af-ov-chain">
              {handover.steps.map((step, i) => (
                <li key={step}>
                  <span className="af-ov-chain__n">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
            <p className="af-ov-note">{handover.note}</p>
          </Reveal>
        </Container>
      </Section>

      {/* ---------------------------------------------------- care */}
      <Section className="hairline">
        <Container>
          <Reveal>
            <Eyebrow>{care.eyebrow}</Eyebrow>
            <h2 className="af-ov-h2">{care.title}</h2>
            <p className="af-ov-lead">{care.lead}</p>
          </Reveal>

          <ul className="af-ov-grid2">
            {care.items.map((item, i) => (
              <Reveal key={item.title} as="li" delay={i * 0.04} className="af-ov-cell">
                <h3 className="af-ov-cell__title">{item.title}</h3>
                <p className="af-ov-cell__body">{item.body}</p>
              </Reveal>
            ))}
          </ul>

          <Reveal>
            <p className="af-ov-note">{care.note}</p>
          </Reveal>
        </Container>
      </Section>

      {/* ------------------------------------------------- summary */}
      <Section className="hairline">
        <Container>
          <Reveal>
            <Eyebrow>{summary.eyebrow}</Eyebrow>
            <h2 className="af-ov-h2">{summary.title}</h2>
          </Reveal>

          <ol className="af-ov-grid5">
            {summary.items.map((item, i) => (
              <Reveal key={item.title} as="li" delay={i * 0.04} className="af-ov-cell">
                <span className="af-ov-cell__n">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="af-ov-cell__title">{item.title}</h3>
                <p className="af-ov-cell__body">{item.body}</p>
              </Reveal>
            ))}
          </ol>

          <Reveal>
            <p className="af-ov-close">{summary.note}</p>
          </Reveal>
        </Container>
      </Section>

      {/* ------------------------------------------------- working */}
      <Section className="hairline">
        <Container>
          <Reveal>
            <Eyebrow>{working.eyebrow}</Eyebrow>
            <h2 className="af-ov-h2">{working.title}</h2>
            <p className="af-ov-lead">{working.lead}</p>
          </Reveal>

          <ol className="af-ov-grid5">
            {working.steps.map((step, i) => (
              <Reveal key={step.title} as="li" delay={i * 0.04} className="af-ov-cell">
                <span className="af-ov-cell__n">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="af-ov-cell__title">{step.title}</h3>
                <p className="af-ov-cell__body">{step.body}</p>
              </Reveal>
            ))}
          </ol>

          <Reveal>
            <div className="af-ov-notes">
              {working.notes.map((n) => (
                <p key={n} className="af-ov-note">
                  {n}
                </p>
              ))}
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* --------------------------------------------------- close */}
      <Section className="hairline">
        <Container className="max-w-3xl">
          <Reveal>
            <Eyebrow>{close.eyebrow}</Eyebrow>
            <h2 className="af-ov-h2">{close.title}</h2>
            <p className="af-ov-lead">{close.lead}</p>

            <ul className="af-ov-points">
              {close.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>

            <div className="mt-9">
              <BookCallButton size="large" withArrow location="overview_close">
                Book a 15&ndash;20 minute meeting
              </BookCallButton>
            </div>

            <p className="af-ov-pilot">{close.pilot}</p>

            <div className="af-ov-contact">
              {WHATSAPP_URL && (
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  WhatsApp {WHATSAPP_DISPLAY}
                </a>
              )}
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              <span>arkflowsolutions.com</span>
            </div>

            <p className="af-ov-sig">{close.signature}</p>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
