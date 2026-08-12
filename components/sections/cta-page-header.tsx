import Link from "next/link";
import { ArrowLeft, ArrowRight, Compass, Banknote, FlaskConical, Handshake } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

/* ─── ApplyCTA ─────────────────────────────────────────── */
const FEATURES = [
  { icon: Compass, label: "Mentorship" },
  { icon: Banknote, label: "Funding Connect" },
  { icon: FlaskConical, label: "Lab Access" },
  { icon: Handshake, label: "Founder Community" },
];

export function ApplyCTA() {
  return (
    <section className="relative overflow-hidden border-t border-border-ink/10 bg-card py-28 lg:py-36">
      <div
        className="pointer-events-none absolute inset-0 dot-grid opacity-50"
        style={{
          maskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 90%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 90%)",
        }}
      />

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <Reveal>
            <span className="mb-7 inline-flex items-center justify-center gap-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
            Start your journey
          </span>

          <h2 className="editorial-display text-5xl text-foreground sm:text-6xl lg:text-[5rem]">
            Ready to build{" "}
            <span className="text-accent">something real?</span>
          </h2>

          <p className="mx-auto mt-8 max-w-lg text-lg leading-relaxed text-muted sm:text-xl">
            List your venture on the registry in minutes — or apply to Cohort 01 for structured mentorship and momentum.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {FEATURES.map((f) => (
              <span
                key={f.label}
                className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wide text-muted transition-colors hover:border-accent hover:bg-accent-tint hover:text-foreground"
              >
                <f.icon className="h-4 w-4" strokeWidth={2} />
                {f.label}
              </span>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Link href="/registry" className="pill-cta h-14 px-12 text-sm">
              Join the registry <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/apply" className="pill-cta pill-cta-outline h-14 px-12 text-sm">
              Apply to Cohort
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
    <section className="relative overflow-hidden border-b border-border bg-background pb-16 pt-40">
      <div className={`relative mx-auto px-5 sm:px-8 lg:px-12 ${narrow ? "max-w-3xl" : "max-w-[96rem]"}`}>
        {backHref && (
          <Link
            href={backHref}
            className="mb-8 inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-muted transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            {backLabel ?? "Back"}
          </Link>
        )}
        <SectionHeading label={badge ?? "SInC"} title={title} description={description} />
        {children}
      </div>
    </section>
  );
}
