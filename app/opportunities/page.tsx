import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Code2, Users, IndianRupee, Gift, Briefcase, Sparkles } from "lucide-react";
import { PageHeader, ApplyCTA } from "@/components/sections/cta-page-header";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { opportunities } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Opportunities",
  description: "Join a startup team or pick up bounties from the IIT Delhi founder network.",
};

export default function OpportunitiesPage() {
  return (
    <>
      <PageHeader
        variant="club"
        badge="Opportunities"
        title="Get your hands dirty"
        description="Connect with early-stage founders. Join a founding team, or take up a bounty to solve a specific problem."
      />

      <section className="section-padding border-y border-border-ink bg-background">
        <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12">
            
            {/* Team Matching Section */}
            <div className="lg:col-span-6 space-y-8">
              <Reveal>
                <div className="flex items-center gap-3 mb-6">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-tint text-accent">
                    <Users className="h-6 w-6" strokeWidth={2} />
                  </span>
                  <div>
                    <h2 className="text-2xl font-black tracking-tight">Team matching</h2>
                    <p className="text-sm text-muted">Join a startup as a co-founder or core team.</p>
                  </div>
                </div>
              </Reveal>

              <StaggerContainer className="grid gap-6">
                {opportunities.teamMatching.map((tm) => (
                  <StaggerItem key={tm.id}>
                    <article className="group relative border-2 border-border-ink bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-framer-hover">
                      <div className="mb-4 flex items-start justify-between border-b border-border-ink pb-4">
                        <div>
                          <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-accent">
                            {tm.startup}
                          </span>
                          <h3 className="mt-1 text-xl font-black leading-snug text-foreground">
                            {tm.role}
                          </h3>
                        </div>
                        {tm.status === "open" ? (
                          <span className="rounded-full border border-border bg-accent-tint px-2 py-0.5 font-mono text-[10px] font-bold uppercase text-accent">
                            Open
                          </span>
                        ) : (
                          <span className="rounded-full border border-border-ink bg-muted px-2 py-0.5 font-mono text-[10px] font-bold uppercase text-background">
                            Closed
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted leading-relaxed mb-6">
                        {tm.description}
                      </p>
                      
                      <div className="mb-6 flex flex-wrap gap-2">
                        {tm.requirements.map((req) => (
                          <span key={req} className="border border-border-ink/50 bg-background px-2 py-1 font-mono text-[10px] uppercase text-muted">
                            {req}
                          </span>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-y-3 justify-between border-t border-dashed border-border-ink pt-4 font-mono text-[11px] uppercase tracking-wide">
                        <div className="flex items-center gap-1.5 text-muted">
                          <Briefcase className="h-3.5 w-3.5" />
                          {tm.commitment}
                        </div>
                        <div className="flex items-center gap-1.5 text-foreground font-bold">
                          <Sparkles className="h-3.5 w-3.5 text-accent" />
                          {tm.equity}
                        </div>
                      </div>
                    </article>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>

            {/* Bounties Section */}
            <div className="lg:col-span-6 space-y-8">
              <Reveal>
                <div className="flex items-center gap-3 mb-6">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-tint text-accent">
                    <Code2 className="h-6 w-6" strokeWidth={2} />
                  </span>
                  <div>
                    <h2 className="text-2xl font-black tracking-tight">Bounty board</h2>
                    <p className="text-sm text-muted">Ship features, get paid or treated.</p>
                  </div>
                </div>
              </Reveal>

              <StaggerContainer className="grid gap-6">
                {opportunities.bounties.map((bounty) => {
                  const RewardIcon = bounty.type === "Money" ? IndianRupee : Gift;
                  const isClosed = bounty.status === "closed";
                  return (
                    <StaggerItem key={bounty.id}>
                      <article className={`group relative border-[3px] border-border-ink bg-card p-6 transition-all hover:bg-accent-tint ${isClosed ? "opacity-60 grayscale" : "shadow-md"}`}>
                        <div className="mb-4 flex items-start justify-between">
                          <div>
                            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-brand-teal group-hover:text-brand-blue transition-colors">
                              {bounty.startup}
                            </span>
                            <h3 className="mt-1 text-lg font-black leading-snug">
                              {bounty.title}
                            </h3>
                          </div>
                          {isClosed ? (
                            <span className="border-2 border-border-ink bg-muted px-2 py-1 font-mono text-[10px] font-bold uppercase text-background">
                              Claimed
                            </span>
                          ) : (
                            <span className="border-2 border-border-ink bg-brand-teal px-2 py-1 font-mono text-[10px] font-bold uppercase text-on-accent transition-colors group-hover:bg-brand-teal-light">
                              Bounty
                            </span>
                          )}
                        </div>
                        <p className="text-sm leading-relaxed text-muted group-hover:text-foreground/80 transition-colors mb-6">
                          {bounty.description}
                        </p>

                        <div className="mb-6 flex flex-wrap gap-2">
                          {bounty.skills.map((skill) => (
                            <span key={skill} className="border border-border-ink/50 bg-background px-2 py-1 font-mono text-[10px] uppercase text-muted  transition-colors">
                              {skill}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between border-t-2 border-dashed border-border-ink pt-4">
                          <div className="font-mono text-xs font-semibold text-muted group-hover:text-foreground/70 transition-colors">
                            Due: {new Date(bounty.deadline).toLocaleDateString("en-IN", { month: "short", day: "numeric" })}
                          </div>
                          <div className="flex items-center gap-1.5 font-bold text-foreground group-hover:text-brand-blue transition-colors">
                            <RewardIcon className="h-4 w-4" />
                            {bounty.reward}
                          </div>
                        </div>
                      </article>
                    </StaggerItem>
                  );
                })}
              </StaggerContainer>
            </div>

          </div>

          <Reveal className="mt-16 text-center">
            <Link href="/contact" className="inline-block">
              <Button variant="outline" size="lg" className="gap-2 bg-card border-2">
                Want to post an opportunity? <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </Reveal>
        </div>
      </section>

      <ApplyCTA />
    </>
  );
}
