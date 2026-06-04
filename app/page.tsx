import { HeroSection } from "@/components/sections/hero";
import { StatsSection, ProgramsBento } from "@/components/sections/stats-programs";
import { EventsMarquee } from "@/components/sections/events";
import { JourneySection } from "@/components/sections/journey";
import { TeamPreview } from "@/components/sections/team";
import { ApplyCTA } from "@/components/sections/cta-page-header";
import { programs, journeySteps, team } from "@/lib/data";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <ProgramsBento programs={programs} />
      <EventsMarquee />
      <JourneySection steps={journeySteps} />
      <TeamPreview team={team} />
      <ApplyCTA />
    </>
  );
}
