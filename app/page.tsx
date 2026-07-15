import { HeroSection } from "@/components/sections/hero";
import { CohortStrip } from "@/components/sections/cohort-strip";
import { HomeDifference } from "@/components/sections/home-difference";
import { PortfolioPreview } from "@/components/sections/portfolio-preview";
import { ProgramsScroll } from "@/components/sections/programs-scroll";
import { EventsMarquee } from "@/components/sections/events";
import { ClubStatsBand } from "@/components/sections/stats-programs";
import { ApplyCTA } from "@/components/sections/cta-page-header";
import { programs } from "@/lib/data";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CohortStrip />
      <HomeDifference />
      <ProgramsScroll programs={programs} />
      <PortfolioPreview />
      <ClubStatsBand />
      <EventsMarquee />
      <ApplyCTA />
    </>
  );
}
