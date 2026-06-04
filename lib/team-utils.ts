import type { TeamMember } from "@/lib/schemas";

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
