import type { Metadata } from "next";
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
import { CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Apply",
  description: "Apply to join SInC — IIT Delhi's Student Incubation Cell.",
};

const steps = [
  "Submit your application with your idea and motivation",
  "Our team reviews applications on a rolling basis",
  "Shortlisted candidates get an intro call with coordinators",
  "Accepted founders get full access to SInC programs and resources",
];

const faqs = [
  {
    q: "When will I hear back?",
    a: "Within 5–7 business days of submitting your application.",
  },
  {
    q: "Do I need a team?",
    a: "Solo founders are welcome. Teams are great too — apply as a group lead.",
  },
  {
    q: "What if my idea is early-stage?",
    a: "Perfect. SInC is built for ideation through pre-seed. We meet you where you are.",
  },
];

export default function ApplyPage() {
  return (
    <>
      <PageHeader
        badge="Apply"
        title="Join SInC"
        description="Open to all IIT Delhi students with a startup idea or early venture."
      />
      <section className="section-padding pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2 space-y-6">
              <Reveal>
                <div className="framer-card p-8">
                  <SectionHeading
                    label="Process"
                    title="What happens next"
                    className="mb-6"
                  />
                  <ol className="space-y-4">
                    {steps.map((step, i) => (
                      <li key={step} className="flex gap-3">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                          {i + 1}
                        </span>
                        <span className="text-muted pt-0.5">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </Reveal>

              <Reveal>
                <div className="framer-card p-8">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    Eligibility
                  </h3>
                  <ul className="text-muted space-y-2 text-sm">
                    <li>• Current IIT Delhi student (any program)</li>
                    <li>• Startup idea or early-stage venture</li>
                    <li>• Commitment to engage with SInC programs</li>
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
                <div className="framer-card p-8 sm:p-10">
                  <SectionHeading
                    label="Application"
                    title="Tell us about your idea"
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
