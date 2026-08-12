import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Target, FileText } from "lucide-react";
import { PageHeader, ApplyCTA } from "@/components/sections/cta-page-header";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { cohort } from "@/lib/data";

export const metadata: Metadata = {
  title: "Cohort 01",
  description:
    "SInC Cohort 01 — IIT Delhi's Hacker House / Venture Lab. 3 months, 5–10 ventures, real funding via SAFEs.",
};

export default function CohortPage() {
  return (
    <>
      <PageHeader
        variant="club"
        badge={cohort.status}
        title={cohort.name}
        description={cohort.tagline}
      >
        <Reveal className="mt-8 max-w-3xl space-y-4">
          <p className="editorial-display text-2xl sm:text-3xl leading-snug text-foreground">
            {cohort.heroStatement}
          </p>
          {(cohort.duration || cohort.cohortSize) && (
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-muted">
              {cohort.duration}
              {cohort.duration && cohort.cohortSize ? " · " : ""}
              {cohort.cohortSize}
            </p>
          )}
          <div className="flex flex-wrap gap-3">
            <Link href="/apply" className="inline-block">
              <Button variant="club" className="gap-2">
                Apply to {cohort.name} <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/cohort/brief" className="inline-block">
              <Button variant="outline" className="gap-2 bg-card">
                <FileText className="h-4 w-4" /> Investor one-pager
              </Button>
            </Link>
          </div>
        </Reveal>
      </PageHeader>

      {cohort.objectives && cohort.objectives.length > 0 && (
        <section className="section-padding border-b border-border-ink">
          <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
            <SectionHeading
              label="Objectives"
              title="Why this cohort exists"
              align="center"
              className="mb-10"
            />
            <StaggerContainer className="grid md:grid-cols-3 gap-6">
              {cohort.objectives.map((obj) => {
                return (
                  <StaggerItem key={obj.title}>
                    <div className="soft-card p-8 h-full">
                      <Target className="h-5 w-5 mb-4 text-brand-teal" />
                      <h3 className="font-bold tracking-tight">{obj.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted">{obj.description}</p>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        </section>
      )}

      {cohort.selection && cohort.selection.length > 0 && (
        <section className="section-padding border-b border-border dot-grid">
          <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
            <SectionHeading
              label="Selection"
              title="How you get in"
              description="Two-phase process: education and applications, then a one-week hackathon sprint."
              className="mb-10"
            />
            <StaggerContainer className="grid md:grid-cols-3 gap-6">
              {cohort.selection.map((phase) => (
                <StaggerItem key={phase.phase}>
                  <div className="soft-card p-8 h-full border-l-4 border-l-brand-teal">
                    <span className="font-mono text-3xl font-bold text-foreground/20">
                      {String(phase.phase).padStart(2, "0")}
                    </span>
                    <h3 className="mt-2 text-lg font-bold">{phase.title}</h3>
                    <p className="mt-3 text-sm text-muted leading-relaxed">{phase.description}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      )}

      <section className="section-padding border-b border-border">
        <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="The plan"
            title="Sprint to Demo Day"
            align="center"
            className="mb-12"
          />
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cohort.plan.map((step) => (
              <StaggerItem key={step.step}>
                <div className="soft-card p-8 h-full">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border bg-accent-tint font-mono text-sm font-bold">
                    {step.step}
                  </span>
                  <h3 className="mt-4 text-lg font-bold tracking-tight">{step.title}</h3>
                  <p className="mt-2 text-sm text-muted leading-relaxed">{step.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {cohort.tracks && cohort.tracks.length > 0 && (
        <section className="section-padding border-b border-border-ink bg-background">
          <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
            <SectionHeading
              label="Tracks"
              title="5 tracks + 1 open"
              description="Pre-decided problem spaces plus an open track for your own hypothesis."
              className="mb-10"
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {cohort.tracks.map((track, i) => (
                <Reveal key={track.id} delay={i * 0.05}>
                  <div
                    className={`soft-card p-5 h-full ${
                      track.id === "track-open" ? "bg-accent-tint/50" : ""
                    }`}
                  >
                    <h3 className="text-sm font-semibold uppercase tracking-wide">{track.title}</h3>
                    <p className="mt-2 text-sm text-muted leading-relaxed">{track.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section-padding">
        <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <Reveal>
              <SectionHeading
                label="What you get"
                title="Built for founders, not spectators"
                description="3 months of structured support — build budget, fellowship, mentorship, and investor access."
              />
            </Reveal>
            <StaggerContainer className="space-y-4">
              {cohort.benefits.map((item) => {
                return (
                  <StaggerItem key={item.title}>
                    <div className="soft-card p-6">
                      <h3 className="font-bold tracking-tight">{item.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        </div>
      </section>

      <section className="section-padding bg-background border-t border-border">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Rules"
            title="What we expect"
            align="center"
            className="mb-8"
          />
          <Reveal>
            <ul className="space-y-3">
              {cohort.rules.map((rule) => (
                <li key={rule} className="flex gap-3 soft-card p-4">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-brand-teal mt-0.5" />
                  <span className="text-sm text-muted leading-relaxed">{rule}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/events">
              <Button variant="outline" className="gap-2">
                Cohort calendar <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/resources">
              <Button variant="outline" className="gap-2">
                Legal & schemes <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </Reveal>
        </div>
      </section>

      <ApplyCTA />
    </>
  );
}
