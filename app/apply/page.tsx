import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/sections/cta-page-header";
import { ApplyForm } from "@/components/forms/apply-form";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { cohort } from "@/lib/data";

export const metadata: Metadata = {
  title: "Apply",
  description: "Apply to SInC Cohort 01 — IIT Delhi's Hacker House / Venture Lab.",
};

const faqs = [
  {
    q: "When will I hear back?",
    a: "Rolling review through the selection sprint. Shortlisted teams enter the one-week hackathon phase before final cohort selection.",
  },
  {
    q: "Do I need a team?",
    a: "Solo builders can apply. Teams are encouraged — apply as a group lead and list co-builders.",
  },
  {
    q: "What if my idea is early-stage?",
    a: "That's the point. Cohort 01 is built for ideation through pre-seed. The selection sprint is where you prove builder + hypothesis strength.",
  },
  {
    q: "Do I keep my IP?",
    a: "Yes. You sign IP to your own venture, not SInC. See the full rules on the Cohort 01 page.",
  },
];

export default function ApplyPage() {
  const steps = cohort.selection
    ? [
        ...cohort.selection.map((s) => s.title + " — " + s.description.split(".")[0] + "."),
        "If selected: " + (cohort.duration ?? "3-month") + " build phase with weekly check-ins and monthly gates.",
      ]
    : [
        "Submit your application with your idea and motivation",
        "Our team reviews applications on a rolling basis",
        "Shortlisted candidates enter the selection sprint",
        "Accepted founders join Cohort 01",
      ];

  return (
    <>
      <PageHeader
        variant="club"
        badge={cohort.status}
        title={`Apply — ${cohort.name}`}
        description="Open to IIT Delhi students. 5 pre-decided tracks + 1 open track. 5–10 ventures selected."
      >
        <Reveal className="mt-4">
          <Link
            href="/cohort"
            className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wide text-muted hover:text-foreground transition-colors"
          >
            Full cohort proposal <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </Reveal>
      </PageHeader>
      <section className="section-padding pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2 space-y-6">
              <Reveal>
                <div className="framer-card p-8">
                  <SectionHeading
                    label="Selection"
                    title="What happens next"
                    className="mb-6"
                  />
                  <ol className="space-y-4">
                    {steps.map((step, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center border-2 border-border-ink bg-accent-lime font-mono text-sm font-bold text-foreground">
                          {i + 1}
                        </span>
                        <span className="text-muted pt-0.5 text-sm leading-relaxed">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </Reveal>

              <Reveal>
                <div className="framer-card p-8">
                  <h3 className="text-lg font-black tracking-tight mb-4 flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-foreground" />
                    Eligibility
                  </h3>
                  <ul className="text-muted space-y-2 text-sm">
                    <li>• Current IIT Delhi student (any program)</li>
                    <li>• Strong builder or sharp hypothesis (or both)</li>
                    <li>• Commitment to weekly check-ins if selected</li>
                    <li>• {cohort.cohortSize ?? "5–10 ventures"} will be selected</li>
                  </ul>
                </div>
              </Reveal>

              <Reveal>
                <div className="framer-card p-2 sm:p-4">
                  <Accordion type="single">
                    {faqs.map((faq, i) => (
                      <AccordionItem key={faq.q} value={`apply-faq-${i}`}>
                        <AccordionTrigger value={`apply-faq-${i}`}>
                          {faq.q}
                        </AccordionTrigger>
                        <AccordionContent value={`apply-faq-${i}`}>
                          {faq.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-3">
              <Reveal>
                <div className="framer-card p-8 sm:p-10 border-t-4 border-t-accent-lime">
                  <SectionHeading
                    label="Application"
                    title="Tell us about your idea"
                    description="Track preference, team, and why you're building. We'll follow up before the selection sprint."
                    className="mb-8"
                  />
                  <ApplyForm />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
