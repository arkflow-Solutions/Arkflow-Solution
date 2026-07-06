import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";

/**
 * PageHero — the quiet opening every inner page shares. The homepage
 * is the flagship; inner pages open with typography, not spectacle.
 */
export function PageHero({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
}) {
  return (
    <section className="pb-16 pt-40 md:pb-20 md:pt-48">
      <Container>
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-5 max-w-3xl text-display font-semibold">{title}</h1>
          {lede && (
            <p className="mt-6 max-w-prose text-lead text-[color:var(--text-secondary)]">
              {lede}
            </p>
          )}
        </Reveal>
      </Container>
    </section>
  );
}
