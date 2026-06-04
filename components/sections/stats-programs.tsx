import {
  Users,
  Building2,
  Scale,
  TrendingUp,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/motion/reveal";
import { Counter } from "@/components/motion/counter";
import { SectionHeading } from "@/components/ui/section-heading";
import { site } from "@/lib/data";

export function StatsSection() {
  return (
    <section className="section-padding bg-section-dark text-section-dark-fg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Impact"
          title="By the numbers"
          description="Update these stats in data/site.json as SInC grows."
          align="center"
          dark
          className="mb-14"
        />
        <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {site.stats.map((stat) => (
            <StaggerItem key={stat.label}>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 text-center hover:bg-white/[0.07] transition-colors">
                <div className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
                  <Counter value={stat.value} suffix={stat.suffix} duration={900} />
                </div>
                <p className="mt-2 text-sm text-white/55 font-medium">{stat.label}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

const iconMap: Record<string, LucideIcon> = {
  Users,
  Building2,
  Scale,
  TrendingUp,
  Sparkles,
};

export function ProgramsBento({
  programs,
}: {
  programs: typeof import("@/lib/data").programs;
}) {
  return (
    <section className="section-padding bg-card border-y border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Features"
          title="Everything you need to ship your startup."
          description="Mentorship, space, legal support, and a founder community — on campus."
          className="mb-14"
        />

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {programs.map((program) => {
            const Icon = iconMap[program.icon] ?? Sparkles;
            return (
              <StaggerItem key={program.id}>
                <div className="group framer-card p-6 h-full hover:-translate-y-0.5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-foreground text-background mb-5 group-hover:scale-105 transition-transform">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 tracking-tight">
                    {program.title}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed">
                    {program.description}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
