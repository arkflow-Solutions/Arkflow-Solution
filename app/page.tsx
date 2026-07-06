import { Hero } from "@/components/home/hero";
import { Trust } from "@/components/home/trust";
import { Problem } from "@/components/home/problem";
import { Why } from "@/components/home/why";
import { Journey } from "@/components/home/journey";
import { Packages } from "@/components/home/packages";
import { Industries } from "@/components/home/industries";
import { HowItWorks } from "@/components/home/how-it-works";
import { Faq } from "@/components/home/faq";
import { FinalCta } from "@/components/home/final-cta";
import { FaqJsonLd } from "@/components/seo/json-ld";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Trust />
      <Problem />
      <Why />
      <Journey />
      <Packages />
      <Industries />
      <HowItWorks />
      <Faq />
      <FinalCta />
      <FaqJsonLd />
    </>
  );
}
