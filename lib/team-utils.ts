import type { TeamMember } from "@/lib/schemas";
import { TEAM_BANDS } from "@/lib/schemas";

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

const bandRank = new Map(
  TEAM_BANDS.map((band, index) => [band, index])
);

export function sortTeamMembers(members: TeamMember[]) {
  return [...members].sort((a, b) => {
    const aHasPhoto = isFilled(a.image);
    const bHasPhoto = isFilled(b.image);
    if (aHasPhoto !== bHasPhoto) return aHasPhoto ? -1 : 1;

    const aBand = bandRank.get(a.team as (typeof TEAM_BANDS)[number]) ?? 99;
    const bBand = bandRank.get(b.team as (typeof TEAM_BANDS)[number]) ?? 99;
    if (aBand !== bBand) return aBand - bBand;

    const aOrder = a.order ?? 99;
    const bOrder = b.order ?? 99;
    if (aOrder !== bOrder) return aOrder - bOrder;

    return a.name.localeCompare(b.name);
  });
}
