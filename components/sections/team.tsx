"use client";

import Link from "next/link";
import { Users, Mail } from "lucide-react";
import {
  LinkedInIcon,
  InstagramIcon,
  TwitterIcon,
  GitHubIcon,
  MailIcon,
} from "@/components/icons/social";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { TeamMember } from "@/lib/schemas";
import { TEAM_BANDS } from "@/lib/schemas";
import {
  isTeamMemberFilled,
  isTeamFieldFilled,
  getTeamInitials,
  sortTeamMembers,
} from "@/lib/team-utils";

type SocialKey = "linkedin" | "instagram" | "twitter" | "github" | "email";

const socialConfig: {
  key: SocialKey;
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
}[] = [
  { key: "linkedin", label: "LinkedIn", Icon: LinkedInIcon },
  { key: "instagram", label: "Instagram", Icon: InstagramIcon },
  { key: "twitter", label: "X (Twitter)", Icon: TwitterIcon },
  { key: "github", label: "GitHub", Icon: GitHubIcon },
  { key: "email", label: "Email", Icon: MailIcon },
];

function getSocialHref(member: TeamMember, key: SocialKey): string | undefined {
  if (key === "email") {
    return member.email ? `mailto:${member.email}` : undefined;
  }
  return member[key];
}

export function MemberSocials({
  member,
  className,
}: {
  member: TeamMember;
  className?: string;
}) {
  const links = socialConfig.filter(({ key }) => getSocialHref(member, key));
  if (links.length === 0) return null;

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {links.map(({ key, label, Icon }) => {
        const href = getSocialHref(member, key)!;
        return (
          <a
            key={key}
            href={href}
            target={key === "email" ? undefined : "_blank"}
            rel={key === "email" ? undefined : "noopener noreferrer"}
            aria-label={`${member.name || "Team member"} on ${label}`}
            className="flex h-8 w-8 items-center justify-center border border-border text-muted transition-all duration-200 hover:border-brand-teal hover:bg-accent-lime hover:text-on-accent"
          >
            <Icon className="h-3.5 w-3.5" />
          </a>
        );
      })}
    </div>
  );
}

export function TeamCard({ member }: { member: TeamMember }) {
  const nameEmpty = !isTeamFieldFilled(member.name);
  const roleEmpty = !isTeamFieldFilled(member.role);
  const bioEmpty = !isTeamFieldFilled(member.bio);
  const hasPhoto = isTeamFieldFilled(member.image);

  return (
    <article className="group flex h-full flex-col border border-border bg-card">
      <div className="relative aspect-[3/4] overflow-hidden bg-accent-tint">
        {hasPhoto ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={member.image as string}
            alt={member.name || member.team}
            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-mono text-3xl font-bold tracking-tight text-muted/50">
              {getTeamInitials(member.name)}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col px-4 py-4 text-left">
        <h3 className="text-base font-bold tracking-tight text-foreground">
          {nameEmpty ? "Coming soon" : member.name}
        </h3>
        <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-teal">
          {roleEmpty ? member.team : member.role}
        </p>
        {isTeamFieldFilled(member.expertise) && (
          <p className="mt-0.5 text-xs text-muted">{member.expertise}</p>
        )}
        {!bioEmpty && (
          <p className="mt-2 text-sm leading-relaxed text-muted line-clamp-4">
            {member.bio}
          </p>
        )}
        {!nameEmpty && (
          <MemberSocials member={member} className="mt-auto pt-3" />
        )}
      </div>
    </article>
  );
}

export function TeamIntro({ count }: { count: number; slots?: number }) {
  if (count <= 0) return null;

  return (
    <Reveal className="mb-10 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
        {count} members
      </p>
    </Reveal>
  );
}

export function TeamByDepartment({ members }: { members: TeamMember[] }) {
  const listed = sortTeamMembers(members.filter(isTeamMemberFilled));
  const bands = [
    ...new Set([...TEAM_BANDS, ...listed.map((m) => m.team)]),
  ].filter((band) => listed.some((m) => m.team === band));

  return (
    <div className="space-y-16">
      {bands.map((band) => {
        const bandMembers = listed.filter((m) => m.team === band);
        return (
          <div key={band}>
            <Reveal className="mb-8">
              <div className="flex items-end justify-between gap-4 border-b border-border pb-3">
                <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-brand-teal">
                  {band}
                </h2>
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                  {bandMembers.length}{" "}
                  {bandMembers.length === 1 ? "member" : "members"}
                </p>
              </div>
            </Reveal>
            <StaggerContainer className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
              {bandMembers.map((member) => (
                <StaggerItem key={member.id}>
                  <TeamCard member={member} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        );
      })}
    </div>
  );
}

export function TeamPreview({ team }: { team: TeamMember[] }) {
  const preview = sortTeamMembers(team.filter(isTeamMemberFilled)).slice(0, 4);
  if (preview.length === 0) return null;

  return (
    <section className="section-padding border-t border-border bg-accent-tint/40">
      <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col items-center gap-4 text-center">
          <SectionHeading
            label="Team"
            title="Meet the people behind SInC"
            description="Students building the ecosystem for campus founders."
            align="center"
            className="mb-0"
          />
          <Link href="/team">
            <Button variant="outline" className="bg-card">
              View full team
            </Button>
          </Link>
        </div>
        <StaggerContainer className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {preview.map((member) => (
            <StaggerItem key={member.id}>
              <TeamCard member={member} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

export function TeamEmptyState() {
  return (
    <div className="py-16 text-center">
      <Users className="mx-auto mb-4 h-10 w-10 text-muted" />
      <h3 className="mb-2 text-xl font-semibold">Team profiles coming soon</h3>
      <p className="mx-auto max-w-md text-sm leading-relaxed text-muted">
        We&apos;re updating this page with our coordinators and leads across
        events, tech, outreach, and incubation.
      </p>
    </div>
  );
}

export function JoinTeamCTA() {
  return (
    <Reveal className="mt-20 border-t border-border pt-14 text-center">
      <Mail className="mx-auto mb-4 h-8 w-8 text-foreground" />
      <h3 className="text-2xl font-bold tracking-tight">Want to join the team?</h3>
      <p className="mx-auto mt-3 mb-8 max-w-lg text-sm leading-relaxed text-muted">
        We&apos;re always looking for passionate builders who want to work
        with campus founders.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link href="/contact">
          <Button variant="outline">Get in touch</Button>
        </Link>
        <Link href="/registry">
          <Button variant="club">List on registry</Button>
        </Link>
      </div>
    </Reveal>
  );
}
