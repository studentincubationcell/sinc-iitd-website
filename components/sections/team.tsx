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
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { TeamMember } from "@/lib/schemas";
import { TEAM_DEPARTMENTS } from "@/lib/schemas";
import {
  isTeamMemberFilled,
  isTeamFieldFilled,
  getTeamInitials,
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
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-muted transition-all duration-200 hover:border-primary hover:bg-primary hover:text-white hover:scale-110"
              >
                <Icon className="h-4 w-4" />
              </a>
            );
          })
        : socialConfig.map(({ key, label, Icon }) => (
            <span
              key={key}
              title={`Add ${label} in team.json`}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-dashed border-border/80 bg-background/50 text-muted/25"
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

  return (
    <article
      className={cn(
        "group framer-card flex flex-col h-full hover:-translate-y-0.5",
        isSlot && "border-dashed bg-background/50"
      )}
    >
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-start gap-4">
          <div className="relative shrink-0">
            <div
              className={cn(
                "flex h-14 w-14 items-center justify-center rounded-xl text-lg font-bold transition-transform duration-200 group-hover:scale-105",
                nameEmpty
                  ? "border border-dashed border-border bg-background text-muted/40"
                  : "bg-foreground text-background"
              )}
            >
              {getInitials(member.name)}
            </div>
            {!nameEmpty && (
              <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-accent border-2 border-card" />
            )}
          </div>
          <div className="min-w-0 flex-1 pt-0.5">
            <h3 className="text-lg font-bold tracking-tight truncate">
              <PlaceholderText empty={nameEmpty}>
                {nameEmpty ? "Name" : member.name}
              </PlaceholderText>
            </h3>
            <p className="text-sm font-medium mt-0.5">
              <PlaceholderText empty={roleEmpty}>
                <span className={roleEmpty ? "" : "text-primary"}>
                  {roleEmpty ? "Role" : member.role}
                </span>
              </PlaceholderText>
            </p>
            <Badge variant="outline" className="mt-2 text-xs">
              {member.team}
            </Badge>
          </div>
        </div>

        <p
          className={cn(
            "mt-4 text-sm leading-relaxed line-clamp-3 min-h-[3.75rem]",
            bioEmpty ? "text-muted/35 italic" : "text-muted"
          )}
        >
          {bioEmpty ? "Short bio — edit in team.json" : member.bio}
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
        support. Add your team below — names, roles, bios, and social links in{" "}
        <code className="text-primary text-sm">data/team.json</code>.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-4 py-1.5 text-sm font-semibold">
          <Users className="h-4 w-4" />
          {count > 0 ? `${count} members` : `${slots} slots to fill`}
        </span>
        {TEAM_DEPARTMENTS.map((dept) => (
          <span
            key={dept}
            className="rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium text-muted"
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
                  ? `${deptMembers.filter(isTeamMemberFilled).length} filled`
                  : `${deptMembers.length} slot${deptMembers.length === 1 ? "" : "s"}`}
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

export function TeamPreview({ team }: { team: TeamMember[] }) {
  const preview = team.slice(0, 3);

  return (
    <section className="section-padding bg-card border-y border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14">
          <SectionHeading
            label="Team"
            title="Meet the people behind SInC."
            description="Students building the ecosystem for campus founders."
            className="mb-0"
          />
          <Link href="/team" className="shrink-0">
            <Button variant="outline" className="rounded-full bg-background">
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
                  className="rounded-2xl border border-dashed border-border p-8 text-center bg-card/50"
                >
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-purple/20 text-2xl font-bold text-primary mb-4">
                    ?
                  </div>
                  <p className="font-semibold text-muted">Your team here</p>
                  <p className="text-sm text-muted/70 mt-1">
                    Add members in data/team.json
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
    <div className="rounded-3xl border-2 border-dashed border-border bg-card/50 p-16 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-purple/10 mb-6">
        <Users className="h-8 w-8 text-purple" />
      </div>
      <h3 className="text-xl font-semibold mb-2">Build your team page</h3>
      <p className="text-muted max-w-md mx-auto">
        Add members with names, roles, bios, and social links in{" "}
        <code className="text-primary text-sm">data/team.json</code>
      </p>
    </div>
  );
}

export function JoinTeamCTA() {
  return (
    <Reveal className="mt-20 rounded-2xl border border-border bg-gradient-to-br from-primary/5 to-purple/5 p-10 sm:p-12 text-center">
      <Mail className="h-10 w-10 text-primary mx-auto mb-4" />
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
          <Button>Apply to SInC</Button>
        </Link>
      </div>
    </Reveal>
  );
}
