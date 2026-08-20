import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/cta-page-header";
import {
  TeamIntro,
  TeamByDepartment,
  TeamEmptyState,
  JoinTeamCTA,
} from "@/components/sections/team";
import { countFilledTeam } from "@/lib/team-utils";
import { team } from "@/lib/data";

export const metadata: Metadata = {
  title: "Team",
  description:
    "Meet the SInC team — students building the ecosystem for campus founders at IIT Delhi.",
};

export default function TeamPage() {
  const filledCount = countFilledTeam(team);

  return (
    <>
      <PageHeader
        variant="club"
        badge="Team"
        title="The people behind SInC"
        description="The coordinators and executives who make SInC happen."
      />
      <section className="py-16 pb-24">
        <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
          <TeamIntro count={filledCount} />
          {team.length === 0 ? (
            <TeamEmptyState />
          ) : (
            <TeamByDepartment members={team} />
          )}
          <JoinTeamCTA />
        </div>
      </section>
    </>
  );
}
