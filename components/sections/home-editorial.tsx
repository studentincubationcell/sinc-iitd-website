import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { AsciiPeopleLoopMedia } from "@/components/ui/ascii-people-reel";

/* ─── 00 · Network signal — top-left / large people / bottom-right ─── */
export function NetworkSignalBand() {
  return (
    <section
      id="network-signal"
      className="relative scroll-mt-20 border-b border-border bg-background"
    >
      <div className="relative mx-auto max-w-[96rem] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <div className="relative min-h-[70vh] lg:min-h-[78vh]">
          {/* Top-left */}
          <Reveal>
            <div className="relative z-20 max-w-sm">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">
                Founders
              </p>
              <p className="mt-3 text-lg leading-snug tracking-[-0.015em] text-foreground sm:text-xl">
                Students with an idea — or the itch to start — finding the room where building
                begins.
              </p>
            </div>
          </Reveal>

          {/* Middle — large people, soft-dissolved into paper */}
          <Reveal>
            <div className="pointer-events-none absolute inset-x-0 top-[12%] bottom-[14%] z-0 sm:top-[8%] lg:top-[4%] lg:bottom-[10%]">
              <AsciiPeopleLoopMedia className="h-full w-full" showCaption={false} />
            </div>
          </Reveal>

          {/* Bottom-right */}
          <Reveal>
            <div className="relative z-20 mt-[58vh] flex justify-end sm:mt-[62vh] lg:mt-[64vh]">
              <div className="max-w-sm text-left sm:text-right">
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">
                  Mentors · Investors
                </p>
                <p className="mt-3 text-lg leading-snug tracking-[-0.015em] text-foreground sm:text-xl">
                  Operators and capital that show up for campus ventures — feedback, intros, and
                  real doors.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─── 01 · Manifesto — quote only ─── */
export function ManifestoBand() {
  return (
    <section id="manifesto" className="relative scroll-mt-20 overflow-hidden bg-inverse">
      <div className="relative mx-auto max-w-[96rem] px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-36">
        <Reveal>
          <blockquote className="relative z-10 max-w-3xl">
            <p className="mb-6 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-teal/80">
              10,000 engineers · one campus
            </p>
            <p className="headline-tight text-balance text-3xl leading-[1.15] text-brand-teal sm:text-5xl lg:text-[3.2rem]">
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
    href: "/registry",
    title: "List on the startup registry",
    description:
      "Three minutes. Your venture goes into IIT Delhi's founder registry — mentors and coordinators look here first.",
    audience: "Builders with an idea or venture",
  },
  {
    href: "/cohort",
    title: "Join the founder cohort",
    description:
      "A focused batch of student teams building real ventures with structure, mentorship, and momentum.",
    audience: "Builders ready to commit",
  },
  {
    href: "/opportunities",
    title: "Find a role or bounty",
    description:
      "Team matching and paid bounties — contribute to campus ventures before starting your own.",
    audience: "Builders looking for a way in",
  },
  {
    href: "/programs",
    title: "Explore the programs",
    description: "Mentorship, space, legal, funding connect — the operating system around founders.",
    audience: "Anyone mapping the path",
  },
];

export function PathwaysIndex() {
  return (
    <section className="border-b border-border bg-background">
      <div className="mx-auto max-w-[96rem] px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
        <Reveal>
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">
            Ways in
          </p>
          <h2 className="mt-3 max-w-xl text-3xl tracking-tight text-foreground sm:text-4xl">
            Pick a door. Start moving.
          </h2>
        </Reveal>
        <ol className="mt-14 divide-y divide-border border-y border-border">
          {PATHWAYS.map((item, i) => (
            <li key={item.href}>
              <Reveal>
                <Link
                  href={item.href}
                  className="group grid gap-3 py-8 transition-colors sm:grid-cols-[4rem_1fr_auto] sm:items-baseline sm:gap-8"
                >
                  <span className="font-mono text-sm text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight text-foreground group-hover:text-brand-blue sm:text-2xl">
                      {item.title}
                    </h3>
                    <p className="mt-2 max-w-2xl text-base text-muted">{item.description}</p>
                    <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                      {item.audience}
                    </p>
                  </div>
                  <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-muted transition-transform group-hover:translate-x-1 group-hover:text-brand-blue" />
                </Link>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ─── Campus atmosphere — full-bleed main building (page bottom) ─── */
export function CampusAtmosphereBand() {
  return (
    <section className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen overflow-hidden">
      <div className="relative aspect-[21/9] min-h-[280px] w-full sm:min-h-[360px] lg:min-h-[520px]">
        <Image
          src="/campus/iitd-atmosphere-softlight.png"
          alt="IIT Delhi main building"
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority={false}
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background to-transparent" />
        <p className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-background/90 mix-blend-difference sm:bottom-8 sm:text-foreground/70 sm:mix-blend-normal">
          IIT Delhi · Main building
        </p>
      </div>
    </section>
  );
}

/* ─── Big type band — full-viewport, heavily blurred campus wash ─── */
export function BigTypeBand() {
  return (
    <section className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] flex min-h-[100svh] w-screen items-center overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/campus/iitd-atmosphere-cartoon.png"
          alt=""
          fill
          className="scale-110 object-cover object-center opacity-[0.22] blur-2xl sm:blur-3xl"
          sizes="100vw"
          aria-hidden
        />
        <div className="absolute inset-0 bg-background/55" />
      </div>
      <div className="relative mx-auto w-full max-w-[96rem] px-5 py-24 sm:px-8 lg:px-12">
        <Reveal>
          <p className="headline-tight max-w-4xl text-balance text-4xl leading-[1.1] text-foreground sm:text-5xl lg:text-[3.8rem]">
            Built on campus.
            <span className="mt-2 block text-brand-blue">Aimed at the world.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
