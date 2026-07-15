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
                className="flex h-9 w-9 items-center justify-center rounded-none border border-border text-muted transition-all duration-200 hover:border-foreground hover:bg-inverse hover:text-inverse-foreground"
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
  const isSlot = nameEmpty && roleEmpty && bioEmpty;
  const hasPhoto = isTeamFieldFilled(member.image);

  return (
    <article
      className={cn(
        "sheen group framer-card flex flex-col h-full overflow-hidden hover:-translate-y-1",
        isSlot && "border-dashed bg-background/50"
      )}
    >
      {/* Portrait */}
      <div
        className={cn(
          "relative w-full overflow-hidden border-b-2 border-border-ink bg-muted/15",
          hasPhoto ? "aspect-[3/4]" : "aspect-square"
        )}
      >
        {hasPhoto ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={member.image as string}
            alt={`${member.name || member.team} team member`}
            className="h-full w-full object-contain object-top transition-all duration-300 [@media(hover:hover)]:grayscale [@media(hover:hover)]:group-hover:grayscale-0"
            loading="lazy"
          />
        ) : (
          <div
            className={cn(
              "flex h-full w-full items-center justify-center",
              nameEmpty
                ? "bg-background text-muted/30"
                : "bg-foreground text-background"
            )}
          >
            <span className="font-mono text-5xl font-bold tracking-tight">
              {getInitials(member.name)}
            </span>
          </div>
        )}
        {/* Department tag overlay */}
        <span className="absolute left-3 top-3 inline-flex items-center border-2 border-border-ink bg-accent-lime px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wide text-foreground">
          {member.team}
        </span>
        {!nameEmpty && (
          <span className="absolute right-3 top-3 h-3.5 w-3.5 bg-accent-lime border-2 border-foreground" />
        )}
      </div>

      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-lg font-bold tracking-tight truncate">
          <PlaceholderText empty={nameEmpty}>
            {nameEmpty ? "Name" : member.name}
          </PlaceholderText>
        </h3>
        <p className="text-sm font-medium mt-0.5">
          <PlaceholderText empty={roleEmpty}>
            <span className={roleEmpty ? "" : "text-foreground"}>
              {roleEmpty ? "Role" : member.role}
            </span>
          </PlaceholderText>
        </p>

        <p
          className={cn(
            "mt-3 text-sm leading-relaxed line-clamp-3 min-h-[3.75rem]",
            bioEmpty ? "text-muted/35 italic" : "text-muted"
          )}
        >
          {bioEmpty ? "Bio coming soon." : member.bio}
        </p>

        <div className="mt-auto pt-5 border-t border-border/50">
          <MemberSocials member={member} />
        </div>
      </div>
    </article>
  );
}

export function TeamIntro({
  count,
  slots,
}: {
  count: number;
  slots: number;
}) {
  return (
    <Reveal className="max-w-3xl mx-auto text-center mb-16">
      <p className="text-lg text-muted leading-relaxed">
        SInC is run by students who believe campus founders deserve world-class
        support. Meet the coordinators and leads across events, tech, outreach,
        and incubation.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <span className="inline-flex items-center gap-2 rounded-none bg-foreground px-4 py-1.5 font-mono text-xs font-semibold uppercase tracking-wide text-background">
          <Users className="h-4 w-4" />
          {count > 0 ? `${count} members` : "Team growing"}
        </span>
        {TEAM_DEPARTMENTS.map((dept) => (
          <span
            key={dept}
            className="rounded-none border border-border px-4 py-1.5 font-mono text-xs font-medium uppercase tracking-wide text-muted"
          >
            {dept}
          </span>
        ))}
      </div>
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
        return (
          <div key={dept}>
            <Reveal className="flex items-center gap-4 mb-8">
              <h2 className="text-2xl font-bold">{dept}</h2>
              <div className="h-px flex-1 bg-border" />
              <span className="text-sm text-muted font-medium">
                {deptMembers.filter(isTeamMemberFilled).length > 0
                  ? `${deptMembers.filter(isTeamMemberFilled).length} members`
                  : "Coming soon"}
              </span>
            </Reveal>
            <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
  const preview = sortTeamMembers(team).slice(0, 3);

  return (
    <section className="section-padding bg-background border-y border-border-ink relative overflow-hidden">
      <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14">
          <SectionHeading
            label="Team"
            title="Meet the people behind SInC."
            description="Students building the ecosystem for campus founders."
            className="mb-0"
          />
          <Link href="/team" className="shrink-0">
            <Button variant="outline">
              View full team
            </Button>
          </Link>
        </div>

        {preview.length === 0 ? (
          <Reveal>
            <div className="grid gap-6 sm:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="rounded-none border border-dashed border-border p-8 text-center"
                >
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-none border border-dashed border-border text-2xl font-bold text-muted/40 mb-4">
                    ?
                  </div>
                  <p className="font-semibold text-muted">Team member</p>
                  <p className="text-sm text-muted/70 mt-1">
                    Profile coming soon
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        ) : (
          <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {preview.map((member) => (
              <StaggerItem key={member.id}>
                <TeamCard member={member} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}
      </div>
    </section>
  );
}

export function TeamEmptyState() {
  return (
    <div className="rounded-none border border-dashed border-border bg-card p-16 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-none border border-border mb-6">
        <Users className="h-8 w-8 text-foreground" />
      </div>
      <h3 className="text-xl font-semibold mb-2">Team profiles coming soon</h3>
      <p className="text-muted max-w-md mx-auto">
        We&apos;re updating this page with our coordinators and leads across
        events, tech, outreach, and incubation.
      </p>
    </div>
  );
}

export function JoinTeamCTA() {
  return (
    <Reveal className="mt-20 rounded-none border border-border-ink bg-card p-10 sm:p-12 text-center hard-shadow">
      <Mail className="h-10 w-10 text-foreground mx-auto mb-4" />
      <h3 className="text-2xl font-bold">Want to join the team?</h3>
      <p className="text-muted mt-3 mb-8 max-w-lg mx-auto">
        We&apos;re always looking for passionate builders across events, tech,
        outreach, and incubation.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link href="/contact">
          <Button variant="outline">Get in touch</Button>
        </Link>
        <Link href="/apply">
          <Button variant="club">Apply to SInC</Button>
        </Link>
      </div>
    </Reveal>
  );
}
