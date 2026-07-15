import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { cohort } from "@/lib/data";

export function CohortStrip() {
  return (
    <section className="border-b border-border bg-accent-tint/40">
      <div className="mx-auto max-w-[90rem] px-4 py-7 sm:px-6 lg:px-8">
        <Reveal className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <span className="relative hidden h-2.5 w-2.5 shrink-0 sm:flex">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-teal opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-brand-teal" />
            </span>
            <div className="max-w-2xl">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-teal">
                {cohort.status}
              </p>
              <p className="mt-1 text-lg font-bold tracking-tight text-foreground sm:text-xl">
                {cohort.name}
                {cohort.duration ? ` · ${cohort.duration}` : ""}
                <span className="hidden font-normal text-muted sm:inline">
                  {" — "}
                  {cohort.cohortSize}
                </span>
              </p>
            </div>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <Link href="/cohort">
              <Button variant="outline" size="default" className="bg-card">
                The plan
              </Button>
            </Link>
            <Link href="/apply">
              <Button variant="club" className="gap-2">
                Apply <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
