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
import { TEAM_DEPARTMENTS } from "@/lib/schemas";
import {
  isTeamMemberFilled,
  isTeamFieldFilled,
  getTeamInitials,
  sortTeamMembers,
} from "@/lib/team-utils";

function getInitials(name: string) {
  return getTeamInitials(name);
}

function PlaceholderText({
  children,
  empty,
}: {
  children: React.ReactNode;
  empty: boolean;
}) {
  if (empty) {
    return (
      <span className="text-muted/40 italic border-b border-dashed border-muted/30">
        {children}
      </span>
    );
  }
  return <>{children}</>;
}

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

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {links.length > 0
        ? links.map(({ key, label, Icon }) => {
            const href = getSocialHref(member, key)!;
            return (
              <a
                key={key}
                href={href}
                target={key === "email" ? undefined : "_blank"}
                rel={key === "email" ? undefined : "noopener noreferrer"}
                aria-label={`${member.name || "Team member"} on ${label}`}
                className="flex h-9 w-9 items-center justify-center rounded-none border border-border text-muted transition-all duration-200 hover:border-brand-teal hover:bg-accent-lime hover:text-on-accent"
              >
                <Icon className="h-4 w-4" />
              </a>
            );
          })
        : socialConfig.map(({ key, Icon }) => (
            <span
              key={key}
              className="flex h-9 w-9 items-center justify-center rounded-none border border-dashed border-border/80 text-muted/25"
              aria-hidden
            >
              <Icon className="h-4 w-4" />
            </span>
          ))}
    </div>
  );
}

export function TeamCard({ member }: { member: TeamMember }) {
  const nameEmpty = !isTeamFieldFilled(member.name);
  const roleEmpty = !isTeamFieldFilled(member.role);
  const bioEmpty = !isTeamFieldFilled(member.bio);
  const hasPhoto = isTeamFieldFilled(member.image);

  return (
    <article className="group flex flex-col items-center text-center px-2 py-4">
      <div
        className={cn(
          "relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border border-border bg-card sm:h-28 sm:w-28",
          nameEmpty && "border-dashed bg-background"
        )}
      >
        {hasPhoto ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={member.image as string}
            alt={member.name || member.team}
            className="h-full w-full object-cover object-top"
            loading="lazy"
          />
        ) : (
          <span
            className={cn(
              "font-mono text-2xl font-bold tracking-tight",
              nameEmpty ? "text-muted/35" : "text-foreground"
            )}
          >
            {getInitials(member.name)}
          </span>
        )}
      </div>

      <h3 className="mt-4 text-base font-bold tracking-tight text-foreground">
        <PlaceholderText empty={nameEmpty}>
          {nameEmpty ? "Coming soon" : member.name}
        </PlaceholderText>
      </h3>
      <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
        <PlaceholderText empty={roleEmpty}>
          {roleEmpty ? member.team : member.role}
        </PlaceholderText>
      </p>
      {!bioEmpty && (
        <p className="mt-2 max-w-[16rem] text-sm leading-relaxed text-muted line-clamp-2">
          {member.bio}
        </p>
      )}
      {!nameEmpty && (
        <MemberSocials member={member} className="mt-3 justify-center" />
      )}
    </article>
  );
}

export function TeamIntro({
  count,
}: {
  count: number;
  slots?: number;
}) {
  return (
    <Reveal className="max-w-2xl mx-auto text-center mb-14">
      <p className="text-base text-muted leading-relaxed sm:text-lg">
        A dedicated team of students building the ecosystem for campus founders —
        mentorship, events, tech, and incubation.
      </p>
      {count > 0 && (
        <p className="mt-4 font-mono text-xs uppercase tracking-[0.16em] text-muted">
          {count} members listed
        </p>
      )}
    </Reveal>
  );
}

export function TeamByDepartment({ members }: { members: TeamMember[] }) {
  const departments = [
    ...new Set([
      ...TEAM_DEPARTMENTS,
      ...members.map((m) => m.team),
    ]),
  ].filter((d) => members.some((m) => m.team === d));

  return (
    <div className="space-y-16">
      {departments.map((dept) => {
        const deptMembers = members.filter((m) => m.team === dept);
        const filled = deptMembers.filter(isTeamMemberFilled).length;
        return (
          <div key={dept}>
            <Reveal className="mb-8 text-center">
              <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-brand-teal">
                {dept}
              </h2>
              <div className="mx-auto mt-2 h-px w-12 bg-brand-teal/50" />
              <p className="mt-2 text-xs text-muted">
                {filled > 0 ? `${filled} members` : "Coming soon"}
              </p>
            </Reveal>
            <StaggerContainer className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {deptMembers.map((member) => (
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

export function TeamPreview({
  team,
}: {
  team: TeamMember[];
}) {
  const preview = sortTeamMembers(team.filter(isTeamMemberFilled)).slice(0, 5);
  if (preview.length === 0) return null;

  return (
    <section className="section-padding border-t border-border bg-accent-tint/40">
      <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col items-center text-center gap-4">
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
        <StaggerContainer className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
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
      <Users className="mx-auto h-10 w-10 text-muted mb-4" />
      <h3 className="text-xl font-semibold mb-2">Team profiles coming soon</h3>
      <p className="text-muted max-w-md mx-auto text-sm leading-relaxed">
        We&apos;re updating this page with our coordinators and leads across
        events, tech, outreach, and incubation.
      </p>
    </div>
  );
}

export function JoinTeamCTA() {
  return (
    <Reveal className="mt-20 border-t border-border pt-14 text-center">
      <Mail className="h-8 w-8 text-foreground mx-auto mb-4" />
      <h3 className="text-2xl font-bold tracking-tight">Want to join the team?</h3>
      <p className="text-muted mt-3 mb-8 max-w-lg mx-auto text-sm leading-relaxed">
        We&apos;re always looking for passionate builders across events, tech,
        outreach, and incubation.
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
