import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, ArrowRight, Sparkles } from "lucide-react";
import { PageHeader, ApplyCTA } from "@/components/sections/cta-page-header";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { PageGuide } from "@/components/sections/page-guide";
import { ConnectionsWall } from "@/components/sections/connections-wall";
import { network } from "@/lib/data";
import type { NetworkPerson } from "@/lib/schemas";

export const metadata: Metadata = {
  title: "Network",
  description:
    "SInC's network — IIT Delhi alumni, investors, industry experts, and industrial visits.",
};

function PeopleGrid({
  people,
  accent,
}: {
  people: NetworkPerson[];
  accent: string;
}) {
  return (
    <StaggerContainer className="grid sm:grid-cols-2 gap-4">
      {people.map((person) => (
        <StaggerItem key={person.id}>
          <article className={`soft-card p-6 h-full bg-card border-t-4 ${accent}`}>
            <h3 className="text-lg font-bold tracking-tight">{person.name}</h3>
            <p className="text-xs font-medium uppercase tracking-wide text-muted mt-1">
              {person.role} · {person.affiliation}
            </p>
            {person.bio && (
              <p className="mt-3 text-sm text-muted leading-relaxed">{person.bio}</p>
            )}
          </article>
        </StaggerItem>
      ))}
    </StaggerContainer>
  );
}

function formatVisitDate(date: string) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function NetworkPage() {
  return (
    <>
      <PageHeader
        variant="club"
        badge="Network"
        title="Our connections"
        description={network.intro}
      />

      {network.connections && <ConnectionsWall connections={network.connections} />}

      <section className="section-padding">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <PageGuide title="Network is split into four areas">
            <p><strong>Alumni & peers</strong> — IIT Delhi founders and campus builder network.</p>
            <p><strong>Investors</strong> — angels, micro-VCs, R&I Park and institutional partners.</p>
            <p><strong>Experts</strong> — legal clinic, domain mentors.</p>
            <p><strong>Industrial visits</strong> — upcoming and past site visits (below).</p>
            <p>
              Guides: <Link href="/resources" className="font-medium text-foreground underline">Resources</Link>
              {" · "}
              Roles & bounties: <Link href="/opportunities" className="font-medium text-foreground underline">Opportunities</Link>
            </p>
          </PageGuide>
          <div className="space-y-20 mt-12">
            <div>
              <SectionHeading label="Alumni" title="IIT Delhi founders & peers" className="mb-8" />
              <PeopleGrid people={network.alumni} accent="border-accent-lime" />
            </div>

            <div>
              <SectionHeading label="Investors" title="Capital & institutional partners" className="mb-8" />
              <PeopleGrid people={network.investors} accent="border-pop-pink" />
            </div>

            <div>
              <SectionHeading label="Experts" title="Mentors & domain specialists" className="mb-8" />
              <PeopleGrid people={network.experts} accent="border-pop-sky" />
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding border-t border-border bg-card/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Industrial visits"
            title="Learning outside the campus"
            description="Site visits with industry partners — upcoming trips for cohort teams and past highlights."
            className="mb-10"
          />

          {network.visits.upcoming.length > 0 && (
            <Reveal className="mb-10">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-muted mb-4">
                Upcoming
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {network.visits.upcoming.map((visit) => (
                  <div key={visit.id} className="soft-card p-6 flex gap-4 bg-card">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-accent-tint/60">
                      <Calendar className="h-5 w-5" />
                    </span>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <h4 className="font-bold tracking-tight">{visit.company}</h4>
                        <time className="text-xs font-medium text-muted shrink-0">
                          {formatVisitDate(visit.date)}
                        </time>
                      </div>
                      <p className="text-sm text-muted mt-1 leading-relaxed">{visit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          )}

          {network.visits.past.length > 0 && (
            <Reveal>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-muted mb-4">
                Past visits
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {network.visits.past.map((visit) => (
                  <div key={visit.id} className="soft-card p-6 flex gap-4 bg-card/60">
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <h4 className="font-bold tracking-tight">{visit.company}</h4>
                        <time className="text-xs font-medium text-muted shrink-0">
                          {formatVisitDate(visit.date)}
                        </time>
                      </div>
                      <p className="text-sm text-muted mt-1 leading-relaxed">{visit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          )}
        </div>
      </section>

      <section className="section-padding border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Build with us"
            title="Team matching & bounties"
            description="Founders post roles and tasks. Students ship, learn, and get paid."
            align="center"
            className="mb-10"
          />
          <StaggerContainer className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {network.comingSoon.map((item) => (
              <StaggerItem key={item.title}>
                <Link
                  href="/opportunities"
                  className="group soft-card block p-7 h-full bg-card transition-colors hover:bg-accent-tint/30"
                >
                  <Sparkles className="h-6 w-6 text-foreground/80 mb-4 group-hover:text-primary transition-colors" strokeWidth={2} />
                  <h3 className="text-lg font-bold tracking-tight">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted leading-relaxed">{item.description}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold group-hover:text-primary transition-colors">
                    View board →
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <ApplyCTA />
    </>
  );
}
