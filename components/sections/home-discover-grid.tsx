import Link from "next/link";
import { ArrowUpRight, Rocket, Calendar, Users, Briefcase } from "lucide-react";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const LINKS = [
  {
    href: "/portfolio",
    icon: Rocket,
    title: "Portfolio",
    description: "Founder, pitch, idea, valuation — campus ventures building with SInC.",
    tint: "hover:bg-accent-tint/60",
  },
  {
    href: "/events",
    icon: Calendar,
    title: "Calendar",
    description: "Founder meets, funding events, networking, and scheme deadlines.",
    tint: "hover:bg-pop-sky/20",
  },
  {
    href: "/network",
    icon: Users,
    title: "Network",
    description: "Alumni, investors, experts, and industrial visits.",
    tint: "hover:bg-pop-pink/15",
  },
  {
    href: "/opportunities",
    icon: Briefcase,
    title: "Opportunities",
    description: "Team matching and bounties — ship with founders, get paid.",
    tint: "hover:bg-pop-peach/25",
  },
] as const;

export function HomeDiscoverGrid() {
  return (
    <section className="section-padding bg-card/50">
      <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-12 max-w-2xl">
          <SectionHeading
            label="Explore"
            title="Everything in one place"
            description="Pick a door — each section has the full detail. No clutter on the home page."
          />
        </Reveal>

        <StaggerContainer className="grid gap-5 sm:grid-cols-2">
          {LINKS.map((item) => {
            const Icon = item.icon;
            return (
              <StaggerItem key={item.href}>
                <Link
                  href={item.href}
                  className={`group soft-card flex gap-5 p-6 sm:p-8 transition-colors ${item.tint}`}
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-foreground">
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-lg font-bold tracking-tight">{item.title}</h3>
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-muted opacity-0 transition-opacity group-hover:opacity-100" />
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{item.description}</p>
                  </div>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
