import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { AsciiField } from "@/components/ui/ascii-field";

/* ─── 01 · Full-bleed manifesto quote band (deep navy) ─── */
export function ManifestoBand() {
  return (
    <section id="manifesto" className="relative scroll-mt-20 overflow-hidden bg-inverse">
      <AsciiField
        seed={23}
        count={420}
        className="absolute -right-[10%] top-0 h-full w-[70%] opacity-50"
        color="var(--brand-teal)"
      />
      <div className="relative mx-auto max-w-[96rem] px-5 py-28 sm:px-8 sm:py-40 lg:px-12">
        <Reveal>
          <blockquote className="max-w-4xl">
            <p className="headline-tight text-balance text-3xl leading-[1.15] text-brand-teal sm:text-5xl lg:text-[3.4rem]">
              &ldquo;A campus with 10,000 engineers doesn&apos;t have an idea problem. It has a
              starting problem &mdash; and starting is exactly what a community can fix.&rdquo;
            </p>
            <footer className="mt-10 text-base text-inverse-foreground">
              Student Incubation Cell
              <span className="block text-inverse-muted">IIT Delhi</span>
            </footer>
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── 02 · Statement band (pale cyan) ───────────────────── */
export function StatementBand() {
  return (
    <section className="bg-accent-tint">
      <div className="mx-auto max-w-[96rem] px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
        <Reveal>
          <p className="headline-tight max-w-3xl text-balance text-3xl leading-[1.16] text-foreground sm:text-4xl lg:text-[2.6rem]">
            Great student startups are not accidents. They come from{" "}
            <span className="text-brand-blue">rooms full of builders</span>, honest feedback,
            fast experiments, and a community that treats every early idea seriously.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── 03 · Selected pathways — numbered editorial index ── */
const PATHWAYS = [
  {
    href: "/cohort",
    title: "Join the founder cohort",
    description:
      "A focused batch of student teams building real ventures with structure, mentorship, and momentum.",
    audience: "Builders ready to commit",
  },
  {
    href: "/events",
    title: "Show up to what's happening",
    description:
      "Founder meets, funding events, industrial visits, and rooms where the right people actually meet.",
    audience: "Everyone on campus",
  },
  {
    href: "/opportunities",
    title: "Work inside a startup",
    description:
      "Team matching and paid bounties — contribute to campus ventures before starting your own.",
    audience: "Students exploring the craft",
  },
  {
    href: "/network",
    title: "Back the next generation",
    description:
      "Alumni, investors, and industry partners plug in as mentors, hosts, and early believers.",
    audience: "Alumni, investors & industry",
  },
] as const;

export function PathwaysIndex() {
  return (
    <section id="community" className="scroll-mt-20 border-t border-border bg-background">
      <div className="mx-auto max-w-[96rem] px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
        <Reveal>
          <h2 className="mega-display text-4xl text-foreground sm:text-6xl">Selected Pathways</h2>
        </Reveal>

        <div className="mt-16 border-t border-border">
          {PATHWAYS.map((p, i) => (
            <Reveal key={p.href}>
              <Link
                href={p.href}
                className="group grid gap-4 border-b border-border py-8 transition-colors hover:bg-[var(--hover-on-canvas)] sm:py-10 lg:grid-cols-[5rem_1fr_1fr_auto] lg:items-baseline lg:gap-8"
              >
                <span className="font-mono text-sm text-muted">({String(i + 1).padStart(2, "0")})</span>
                <h3 className="headline-tight text-2xl text-foreground sm:text-3xl">{p.title}</h3>
                <div>
                  <p className="text-base leading-relaxed text-muted">{p.description}</p>
                  <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-brand-blue">
                    {p.audience}
                  </p>
                </div>
                <span className="hidden h-11 w-11 items-center justify-center rounded-full border border-border transition-colors group-hover:border-foreground group-hover:bg-foreground group-hover:text-background lg:flex">
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-14 flex flex-wrap items-center gap-6">
            <Link href="/apply" className="pill-cta">
              Start a conversation
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-muted">
              Not sure where you fit? Write to us — we route every serious message to a real person.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── 04 · Giant typographic closer ─────────────────────── */
export function BigTypeBand() {
  return (
    <section className="relative overflow-hidden border-t border-border bg-background">
      <AsciiField
        seed={41}
        count={380}
        className="absolute -left-[14%] top-0 h-full w-[60%] opacity-70"
        color="var(--brand-blue)"
      />
      <div className="relative mx-auto max-w-[96rem] px-5 py-28 sm:px-8 sm:py-36 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <Reveal>
            <p className="max-w-xs text-base leading-relaxed text-foreground">
              Exams end. Placements end. What you build with other people is the part of college
              that keeps compounding — and it starts with walking into one room.
            </p>
          </Reveal>
          <Reveal>
            <p className="mega-display text-5xl text-foreground sm:text-8xl lg:text-right lg:text-[9rem]">
              Built on Campus
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
