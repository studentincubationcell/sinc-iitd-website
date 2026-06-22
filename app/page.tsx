import { HeroSection } from "@/components/sections/hero";
import { CohortStrip } from "@/components/sections/cohort-strip";
import { HomeAudienceRouting } from "@/components/sections/home-audience-routing";
import { HomeDifference } from "@/components/sections/home-difference";
import { JourneySection } from "@/components/sections/journey";
import { NetworkPreview } from "@/components/sections/network-preview";
import { PortfolioPreview } from "@/components/sections/portfolio-preview";
import { ProgramsScroll } from "@/components/sections/programs-scroll";
import { CalendarPreview } from "@/components/sections/calendar-preview";
import { EventsMarquee } from "@/components/sections/events";
import { OpportunitiesTeaser } from "@/components/sections/opportunities-teaser";
import { ClubStatsBand } from "@/components/sections/stats-programs";
import { TeamPreview } from "@/components/sections/team";
import { ApplyCTA } from "@/components/sections/cta-page-header";
import { programs, journeySteps, team } from "@/lib/data";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CohortStrip />
      <HomeAudienceRouting />
      <HomeDifference />
      <JourneySection steps={journeySteps} />
      <NetworkPreview />
      <PortfolioPreview />
      <ProgramsScroll programs={programs} />
      <CalendarPreview />
      <EventsMarquee />
      <OpportunitiesTeaser />
      <ClubStatsBand />
      <TeamPreview team={team} />
      <ApplyCTA />
    </>
  );
}
