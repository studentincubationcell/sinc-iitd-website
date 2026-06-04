import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/sections/cta-page-header";
import { ProgramsBento } from "@/components/sections/stats-programs";
import { JourneySection } from "@/components/sections/journey";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { programs, journeySteps } from "@/lib/data";

export const metadata: Metadata = {
  title: "Programs",
  description: "SInC programs — mentorship, incubation space, legal support, and funding connect for IIT Delhi founders.",
};

const faqs = [
  {
    q: "Who can join SInC?",
    a: "Any IIT Delhi student with a startup idea or early-stage venture. We welcome founders at every stage — from ideation to pre-seed.",
  },
  {
    q: "Is there a fee to join?",
    a: "No. SInC is a student-run cell supported by the institute. Core programs are free for IIT Delhi students.",
  },
  {
    q: "What do I get as a member?",
    a: "Mentorship access, incubation space at R&I Park, legal guidance, pitch prep, investor introductions, and a founder community.",
  },
  {
    q: "How do I apply?",
    a: "Fill out the application form on our Apply page. Our team reviews applications on a rolling basis.",
  },
];

export default function ProgramsPage() {
  return (
    <>
      <PageHeader
        badge="Programs"
        title="Everything you need to launch"
        description="From your first customer interview to your first term sheet — SInC supports every stage."
      />
      <ProgramsBento programs={programs} />
      <JourneySection steps={journeySteps} />

      <section className="py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-10">
            <h2 className="text-3xl font-bold">FAQ</h2>
          </Reveal>
          <Reveal>
            <Accordion type="single">
              {faqs.map((faq, i) => (
                <AccordionItem key={faq.q} value={`faq-${i}`}>
                  <AccordionTrigger value={`faq-${i}`}>{faq.q}</AccordionTrigger>
                  <AccordionContent value={`faq-${i}`}>{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
          <Reveal className="text-center mt-12">
            <Link href="/apply">
              <Button size="lg">Start your application</Button>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
