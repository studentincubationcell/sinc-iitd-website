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
    "Meet the SInC team — add your coordinators and leads in team.json.",
};

export default function TeamPage() {
  const filledCount = countFilledTeam(team);

  return (
    <>
      <PageHeader
        badge="Team"
        title="The people behind SInC"
        description="Fill in your team — one card per department, ready for names and social links."
      />
      <section className="py-16 pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <TeamIntro count={filledCount} slots={team.length} />
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
