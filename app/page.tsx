import { HeroSection } from "@/components/sections/hero";
import {
  NetworkSignalBand,
  ManifestoBand,
  StatementBand,
  PathwaysIndex,
  CampusAtmosphereBand,
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
      <NetworkSignalBand />
      <PathwaysIndex />
      <StatementBand />
      <PortfolioPreview />
      <EventsMarquee />
      <BigTypeBand />
      <CampusAtmosphereBand />
      <ApplyCTA />
    </>
  );
}
