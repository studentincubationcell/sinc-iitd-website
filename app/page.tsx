import { HeroSection } from "@/components/sections/hero";
import { HomeAudienceRouting } from "@/components/sections/home-audience-routing";
import { HomeDiscoverGrid } from "@/components/sections/home-discover-grid";
import { CohortStrip } from "@/components/sections/cohort-strip";
import { PortfolioPreview } from "@/components/sections/portfolio-preview";
import { EventsMarquee } from "@/components/sections/events";
import { ClubStatsBand } from "@/components/sections/stats-programs";
import { ApplyCTA } from "@/components/sections/cta-page-header";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <HomeAudienceRouting />
      <HomeDiscoverGrid />
      <CohortStrip />
      <PortfolioPreview />
      <EventsMarquee />
      <ClubStatsBand />
      <ApplyCTA />
    </>
  );
}
