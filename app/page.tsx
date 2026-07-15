import { HeroSection } from "@/components/sections/hero";
import {
  ManifestoBand,
  StatementBand,
  PathwaysIndex,
  BigTypeBand,
} from "@/components/sections/home-editorial";
import { PortfolioPreview } from "@/components/sections/portfolio-preview";
import { EventsMarquee } from "@/components/sections/events";
import { ApplyCTA } from "@/components/sections/cta-page-header";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ManifestoBand />
      <PathwaysIndex />
      <StatementBand />
      <PortfolioPreview />
      <EventsMarquee />
      <BigTypeBand />
      <ApplyCTA />
    </>
  );
}
