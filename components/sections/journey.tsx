import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import type { JourneyStep } from "@/lib/schemas";

export function JourneySection({ steps }: { steps: JourneyStep[] }) {
  return (
    <section className="section-padding dot-grid">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Process"
          title="From idea to launch in five steps."
          description="Your startup journey with SInC — one supportive ecosystem at every stage."
          className="mb-14"
        />

        <StaggerContainer className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step) => (
            <StaggerItem key={step.step}>
              <div className="framer-card p-6 h-full hover:-translate-y-0.5">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary text-sm font-bold">
                  {step.step}
                </span>
                <h3 className="mt-4 text-lg font-semibold tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  {step.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <Reveal className="mt-12 text-center">
          <Link href="/programs">
            <Button size="lg" className="gap-2 rounded-full px-8">
              Explore Programs <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
