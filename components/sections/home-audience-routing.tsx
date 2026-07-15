import Link from "next/link";
import { Rocket, TrendingUp, Handshake, ArrowRight } from "lucide-react";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/motion/reveal";

const DOORS = [
  {
    id: "founder",
    icon: Rocket,
    eyebrow: "I'm a builder",
    title: "Start a startup",
    description:
      "Join Cohort 01, find a co-builder, pick up a bounty, and learn how startups actually work.",
    primary: { href: "/cohort", label: "Explore Cohort 01" },
    secondary: { href: "/opportunities", label: "Team & bounties" },
    tint: "bg-accent-tint/50",
  },
  {
    id: "investor",
    icon: TrendingUp,
    eyebrow: "I invest / scout",
    title: "Back IIT Delhi founders",
    description:
      "See the portfolio, the cohort thesis, and where capital goes. Meet teams at Demo Day.",
    primary: { href: "/portfolio", label: "View portfolio" },
    secondary: { href: "/cohort/brief", label: "Cohort one-pager" },
    tint: "bg-pop-sky/15",
  },
  {
    id: "connect",
    icon: Handshake,
    eyebrow: "I'm alumni / industry",
    title: "Plug into the network",
    description:
      "Mentor founders, host an industrial visit, or post a bounty. The door is genuinely open.",
    primary: { href: "/network", label: "See the network" },
    secondary: { href: "/contact", label: "Get in touch" },
    tint: "bg-pop-pink/10",
  },
] as const;

export function HomeAudienceRouting() {
  return (
    <section className="section-padding border-t border-border bg-background">
      <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-12 max-w-2xl">
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-muted">
            Start here
          </span>
          <h2 className="editorial-display text-3xl text-foreground sm:text-4xl">
            Whoever you are, there&apos;s a{" "}
            <span className="lime-mark">door for you.</span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
            SInC serves three kinds of people. Pick the one that fits — the rest of the site follows from here.
          </p>
        </Reveal>

        <StaggerContainer className="grid gap-5 lg:grid-cols-3">
          {DOORS.map((door) => {
            const Icon = door.icon;
            return (
              <StaggerItem key={door.id}>
                <div className={`soft-card flex h-full flex-col p-7 ${door.tint}`}>
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-card text-foreground">
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </span>
                  <span className="mt-5 text-xs font-semibold uppercase tracking-widest text-muted">
                    {door.eyebrow}
                  </span>
                  <h3 className="mt-1 text-xl font-bold tracking-tight">{door.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                    {door.description}
                  </p>
                  <div className="mt-6 flex flex-col gap-2 border-t border-border pt-5">
                    <Link
                      href={door.primary.href}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold hover:text-primary transition-colors"
                    >
                      {door.primary.label} <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      href={door.secondary.href}
                      className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors"
                    >
                      {door.secondary.label} →
                    </Link>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
