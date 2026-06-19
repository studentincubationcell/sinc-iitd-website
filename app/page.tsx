import { HeroSection } from "@/components/sections/hero";
import { HomeDifference } from "@/components/sections/home-difference";
import { ProgramsScroll } from "@/components/sections/programs-scroll";
import { EventsMarquee } from "@/components/sections/events";
import { JourneySection } from "@/components/sections/journey";
import { ClubStatsBand } from "@/components/sections/stats-programs";
import { TeamPreview } from "@/components/sections/team";
import { ApplyCTA } from "@/components/sections/cta-page-header";
import { programs, journeySteps, team } from "@/lib/data";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <HomeDifference />
      <ProgramsScroll programs={programs} />
      <EventsMarquee />
      <ClubStatsBand />
      <JourneySection steps={journeySteps} variant="dark" />
      <TeamPreview team={team} />
      <ApplyCTA />
    </>
  );
}
