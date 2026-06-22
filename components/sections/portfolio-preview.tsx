import Link from "next/link";
import { ArrowRight, Rocket } from "lucide-react";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { startups } from "@/lib/data";

export function PortfolioPreview() {
  const preview = startups.slice(0, 3);

  return (
    <section className="section-padding border-t border-border bg-card/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <Reveal className="max-w-2xl">
            <SectionHeading
              label="Startup portfolio"
              title="Campus ventures"
              description="Founder, pitch, idea, and valuation — the startups building from IIT Delhi with SInC."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <Link href="/portfolio">
              <Button variant="outline" className="gap-2 bg-card">
                Full portfolio <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </Reveal>
        </div>

        <StaggerContainer className="grid gap-5 md:grid-cols-3">
          {preview.map((s) => (
            <StaggerItem key={s.slug}>
              <Link
                href={`/portfolio/${s.slug}`}
                className="group soft-card block h-full p-6 transition-colors hover:bg-accent-tint/30"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-foreground font-mono text-base font-bold text-background">
                    {s.name.charAt(0)}
                  </div>
                  {s.valuation && (
                    <span className="rounded-md border border-border bg-pop-peach/40 px-2 py-0.5 font-mono text-[10px] font-semibold uppercase">
                      {s.valuation}
                    </span>
                  )}
                </div>
                <h3 className="mt-4 text-lg font-bold tracking-tight group-hover:text-primary transition-colors">
                  {s.name}
                </h3>
                <p className="mt-2 text-sm font-medium text-foreground/90 line-clamp-2">{s.tagline}</p>
                <p className="mt-3 text-sm text-muted line-clamp-2">{s.idea}</p>
                <div className="mt-5 border-t border-border pt-4">
                  <span className="text-xs font-medium uppercase tracking-wider text-muted">Founder</span>
                  <p className="mt-0.5 text-sm font-semibold">{s.founder}</p>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {startups.length === 0 && (
          <div className="soft-card text-center py-12">
            <Rocket className="h-8 w-8 mx-auto text-muted mb-3" />
            <p className="text-muted text-sm">Portfolio slots — add startups in data/startups.json</p>
          </div>
        )}
      </div>
    </section>
  );
}
