import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { cohort } from "@/lib/data";

export function CohortStrip() {
  return (
    <section className="border-y border-border bg-accent-tint/40">
      <div className="mx-auto max-w-[90rem] px-4 py-8 sm:px-6 lg:px-8">
        <Reveal className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-muted">
              {cohort.status}
            </span>
            <p className="mt-1 text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              {cohort.name}
              {cohort.duration ? ` · ${cohort.duration}` : ""}
            </p>
            <p className="mt-2 text-sm text-muted leading-relaxed">
              {cohort.cohortSize} · {cohort.tagline}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
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
