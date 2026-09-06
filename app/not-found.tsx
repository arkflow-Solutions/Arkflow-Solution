import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Section className="pt-40">
      <Container className="text-center">
        <p className="font-mono text-eyebrow uppercase text-blue-soft">404</p>
        <h1 className="mt-4 text-display font-semibold">Page not found</h1>
        <p className="mx-auto mt-4 max-w-prose text-lead text-[color:var(--text-secondary)]">
          The page you are looking for does not exist or has moved.
        </p>
        <div className="mt-8">
          <Button href="/">Back to home</Button>
        </div>
      </Container>
    </Section>
  );
}
