import Link from "next/link";
import {
  Rocket,
  Calendar,
  Users,
  Sparkles,
  Briefcase,
  Mail,
  ArrowUpRight,
  BookOpen,
} from "lucide-react";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { contentMap, events, startups, cohort } from "@/lib/data";

const ICONS: Record<string, typeof Rocket> = {
  portfolio: Rocket,
  calendar: Calendar,
  network: Users,
  cohort: Sparkles,
  opportunities: Briefcase,
  join: Mail,
};

export function HomeContentPillars() {
  return (
    <section className="section-padding border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-12 max-w-3xl">
          <SectionHeading
            label="Site map"
            title="Everything SInC offers — organized"
            description={contentMap.intro}
          />
        </Reveal>

        <StaggerContainer className="grid gap-6 lg:grid-cols-2">
          {contentMap.pillars.map((pillar) => {
            const Icon = ICONS[pillar.id] ?? BookOpen;
            const count =
              pillar.id === "portfolio"
                ? `${startups.length} startups`
                : pillar.id === "calendar"
                  ? `${events.length} calendar items`
                  : pillar.id === "cohort"
                    ? cohort.cohortSize ?? ""
                    : null;

            return (
              <StaggerItem key={pillar.id}>
                <article className="soft-card flex h-full flex-col p-6 sm:p-8">
                  <div className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-border bg-accent-tint/50">
                      <Icon className="h-5 w-5" strokeWidth={2} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-xl font-bold tracking-tight">{pillar.title}</h3>
                        {count && (
                          <span className="shrink-0 text-xs font-medium text-muted">{count}</span>
                        )}
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{pillar.summary}</p>
                    </div>
                  </div>

                  <ul className="mt-5 flex-1 space-y-1.5 border-t border-border pt-5">
                    {pillar.includes.map((item) => (
                      <li key={item} className="flex gap-2 text-sm text-foreground/85">
                        <span className="text-muted">·</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-wrap gap-3 pt-2">
                    <Link
                      href={pillar.href}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold hover:text-primary transition-colors"
                    >
                      Open {pillar.title.split(" ")[0]} <ArrowUpRight className="h-4 w-4" />
                    </Link>
                    {pillar.secondaryHref && (
                      <Link
                        href={pillar.secondaryHref}
                        className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors"
                      >
                        {pillar.id === "network" ? "Resources" : "Apply"} →
                      </Link>
                    )}
                  </div>
                </article>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
