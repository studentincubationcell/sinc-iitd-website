import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/cta-page-header";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/motion/reveal";
import { ApplyCTA } from "@/components/sections/cta-page-header";
import { SectionHeading } from "@/components/ui/section-heading";
import { about } from "@/lib/data";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about SInC — the Student Incubation Cell at IIT Delhi.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        variant="club"
        badge="About SInC"
        title="Building IIT Delhi's founder ecosystem"
        description={about.intro}
      />

      <section className="section-padding">
        <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <Reveal className="lg:sticky lg:top-32 lg:self-start">
              <SectionHeading
                label="Who we are"
                title="The bridge between ideas and impact"
                description="SInC connects classroom innovation with real-world entrepreneurship at IIT Delhi — so no student with a bold idea has to figure it out alone."
              />
            </Reveal>

            <StaggerContainer className="space-y-6">
              {[
                { title: "Mission", body: about.mission, pop: "bg-accent-lime" },
                { title: "Vision", body: about.vision, pop: "bg-pop-pink" },
                { title: "Values", body: about.values, pop: "bg-pop-sky" },
              ].map((item) => (
                <StaggerItem key={item.title}>
                  <div className={`${item.pop} brutal-block p-8 text-foreground`}>
                    <h3 className="mb-3 font-mono text-xs font-bold uppercase tracking-[0.16em] text-foreground">
                      {item.title}
                    </h3>
                    <p className="leading-relaxed text-foreground/80">{item.body}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      <section className="section-padding bg-background border-y border-border dot-grid">
        <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Timeline"
            title="Our journey"
            align="center"
            className="mb-12"
          />
          <StaggerContainer className="grid md:grid-cols-3 gap-6">
            {about.timeline.map((item) => (
              <StaggerItem key={item.title}>
                <div className="framer-card p-8 text-center h-full bg-card">
                  <div className="mb-3 inline-flex items-center justify-center border-2 border-border-ink bg-accent-lime px-3 py-1 font-mono text-sm font-bold text-foreground">
                    {item.year}
                  </div>
                  <h3 className="text-lg font-black tracking-tight mb-2">{item.title}</h3>
                  <p className="text-sm text-muted">{item.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="section-padding">
        <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Partners"
            title="Ecosystem partners"
            description="Placeholder slots — add logos when available"
            align="center"
            className="mb-10"
          />
          <div className="flex flex-wrap justify-center gap-4">
            {about.partners.map((p) => (
              <div
                key={p}
                className="rounded-none border-2 border-dashed border-border-ink bg-card px-8 py-4 font-mono text-sm font-semibold uppercase tracking-wide text-muted"
              >
                {p}
              </div>
            ))}
          </div>
        </div>
      </section>

      <ApplyCTA />
    </>
  );
}
