import type { TeamMember } from "@/lib/schemas";
import { TEAM_DEPARTMENTS } from "@/lib/schemas";

function isFilled(value?: string) {
  return Boolean(value?.trim());
}

export function isTeamMemberFilled(member: TeamMember) {
  return isFilled(member.name);
}

export function countFilledTeam(members: TeamMember[]) {
  return members.filter(isTeamMemberFilled).length;
}

export function getTeamInitials(name: string) {
  const trimmed = name.trim();
  if (!trimmed) return "+";
  return trimmed
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export { isFilled as isTeamFieldFilled };

const departmentRank = new Map(
  TEAM_DEPARTMENTS.map((department, index) => [department, index])
);

export function sortTeamMembers(members: TeamMember[]) {
  return [...members].sort((a, b) => {
    const aHasPhoto = isFilled(a.image);
    const bHasPhoto = isFilled(b.image);
    if (aHasPhoto !== bHasPhoto) return aHasPhoto ? -1 : 1;

    const aRank = departmentRank.get(a.team as (typeof TEAM_DEPARTMENTS)[number]) ?? 99;
    const bRank = departmentRank.get(b.team as (typeof TEAM_DEPARTMENTS)[number]) ?? 99;
    if (aRank !== bRank) return aRank - bRank;

    return a.id.localeCompare(b.id, undefined, { numeric: true });
  });
}
