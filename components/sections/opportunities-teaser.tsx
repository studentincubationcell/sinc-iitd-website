import Link from "next/link";
import { ArrowRight, Code2, Users } from "lucide-react";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { opportunities } from "@/lib/data";

export function OpportunitiesTeaser() {
  const bounty = opportunities.bounties.find((b) => b.status === "open");
  const role = opportunities.teamMatching.find((t) => t.status === "open");

  return (
    <section className="section-padding border-t border-border bg-card/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <Reveal className="max-w-2xl">
            <SectionHeading
              label="Opportunities"
              title="Build with founders"
              description="Team matching for co-builders. Bounty board for students who want to ship and get paid."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <Link href="/opportunities">
              <Button variant="outline" className="gap-2 bg-card">
                View all <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </Reveal>
        </div>

        <StaggerContainer className="grid md:grid-cols-2 gap-5 max-w-4xl">
          {role && (
            <StaggerItem>
              <Link
                href="/opportunities"
                className="group soft-card block h-full bg-pop-pink/10 p-6 transition-colors hover:bg-pop-pink/15"
              >
                <Users className="h-6 w-6 mb-4 text-foreground/80" strokeWidth={2} />
                <span className="text-xs font-semibold uppercase tracking-wider text-muted">{role.startup}</span>
                <h3 className="mt-2 text-lg font-bold">{role.role}</h3>
                <p className="mt-2 text-sm text-muted line-clamp-2">{role.description}</p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-wide">{role.equity}</p>
              </Link>
            </StaggerItem>
          )}
          {bounty && (
            <StaggerItem>
              <Link
                href="/opportunities"
                className="group soft-card block h-full bg-brand-teal/10 p-6 transition-colors hover:bg-brand-teal/15"
              >
                <Code2 className="h-6 w-6 mb-4 text-foreground/80" strokeWidth={2} />
                <span className="text-xs font-semibold uppercase tracking-wider text-muted">{bounty.startup}</span>
                <h3 className="mt-2 text-lg font-bold">{bounty.title}</h3>
                <p className="mt-2 text-sm text-muted line-clamp-2">{bounty.description}</p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-wide">{bounty.reward}</p>
              </Link>
            </StaggerItem>
          )}
        </StaggerContainer>
      </div>
    </section>
  );
}
