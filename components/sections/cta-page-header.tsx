import Link from "next/link";
import { ArrowLeft, ArrowRight, Compass, Banknote, FlaskConical, Handshake } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";

/* ─── ApplyCTA ─────────────────────────────────────────── */
const FEATURES = [
  { icon: Compass, label: "Mentorship" },
  { icon: Banknote, label: "Funding Connect" },
  { icon: FlaskConical, label: "Lab Access" },
  { icon: Handshake, label: "Founder Community" },
];

export function ApplyCTA() {
  return (
    <section className="relative overflow-hidden border-t border-border-ink bg-inverse py-28 text-inverse-foreground lg:py-36">
      <div className="pointer-events-none absolute inset-0 inverse-grid opacity-[0.35]" />

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <Reveal>
          <span className="mb-7 inline-flex items-center justify-center gap-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-inverse-foreground/60">
            <span className="inline-block h-3 w-3 bg-accent-lime" />
            Start your journey
          </span>

          <h2 className="editorial-display text-5xl sm:text-6xl lg:text-[5rem]">
            Ready to build{" "}
            <span className="lime-mark">something real?</span>
          </h2>

          <p className="mx-auto mt-8 max-w-lg text-lg leading-relaxed text-inverse-foreground/55 sm:text-xl">
            Join SInC — mentorship, lab access, and a community of builders pushing from campus idea to funded startup.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {FEATURES.map((f) => (
              <span
                key={f.label}
                className="inline-flex items-center gap-2 border border-inverse-foreground/30 px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wide text-inverse-foreground/70 transition-colors hover:border-accent-lime hover:bg-accent-lime hover:text-on-accent"
              >
                <f.icon className="h-4 w-4" strokeWidth={2} />
                {f.label}
              </span>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Link href="/apply">
              <Button
                size="lg"
                variant="club"
                className="h-14 gap-2 px-12 text-base font-bold normal-case tracking-normal"
              >
                Apply now <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/programs">
              <Button
                size="lg"
                variant="outline"
                className="h-14 border-inverse-foreground bg-transparent px-12 text-base text-inverse-foreground hover:bg-inverse-foreground hover:text-inverse"
              >
                Explore programs
              </Button>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── PageHeader ────────────────────────────────────────── */
export function PageHeader({
  title,
  description,
  badge,
  variant = "default",
  backHref,
  backLabel,
  children,
  narrow = false,
}: {
  title: string;
  description?: string;
  badge?: string;
  variant?: "default" | "club";
  backHref?: string;
  backLabel?: string;
  children?: React.ReactNode;
  narrow?: boolean;
}) {
  return (
    <section
      className="relative overflow-hidden border-b border-border-ink bg-background"
      style={{ paddingTop: "9rem", paddingBottom: "4rem" }}
    >
      <div className="absolute inset-0 dot-grid opacity-60 pointer-events-none" />

      <div className={`relative mx-auto px-4 sm:px-6 lg:px-8 ${narrow ? "max-w-3xl" : "max-w-7xl"}`}>
        {backHref && (
          <Link
            href={backHref}
            className="mb-8 inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-muted transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            {backLabel ?? "Back"}
          </Link>
        )}
        <SectionHeading
          label={badge ?? "SInC"}
          title={title}
          description={description}
        />
        {children}
      </div>
    </section>
  );
}
