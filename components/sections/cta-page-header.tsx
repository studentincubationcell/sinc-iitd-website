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
    <section className="relative overflow-hidden border-t border-border-ink bg-foreground py-28 text-background lg:py-36">
      {/* Cross-grid overlay (light lines on ink) */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(244,243,238,1) 1px, transparent 1px), linear-gradient(90deg, rgba(244,243,238,1) 1px, transparent 1px)",
          backgroundSize: "34px 34px",
        }}
      />

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <Reveal>
          {/* Eyebrow */}
          <span className="mb-7 inline-flex items-center justify-center gap-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-background/60">
            <span className="inline-block h-3 w-3 bg-accent-lime" />
            Start your journey
          </span>

          {/* Mega headline */}
          <h2 className="editorial-display text-5xl sm:text-6xl lg:text-[5rem]">
            Ready to build{" "}
            <span className="lime-mark">something real?</span>
          </h2>

          <p className="mx-auto mt-8 max-w-lg text-lg leading-relaxed text-background/55 sm:text-xl">
            Join SInC — mentorship, lab access, and a community of builders pushing from campus idea to funded startup.
          </p>

          {/* Feature pills */}
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {FEATURES.map((f) => (
              <span
                key={f.label}
                className="inline-flex items-center gap-2 border border-background/30 px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wide text-background/70 transition-colors hover:border-accent-lime hover:bg-accent-lime hover:text-foreground"
              >
                <f.icon className="h-4 w-4" strokeWidth={2} />
                {f.label}
              </span>
            ))}
          </div>

          {/* CTAs */}
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
                className="h-14 border-background bg-transparent px-12 text-base text-background hover:bg-background hover:text-foreground"
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
  const isClub = variant === "club";

  return (
    <section
      className="relative overflow-hidden"
      style={
        isClub
          ? { background: "linear-gradient(160deg, #09051a 0%, #130d2e 100%)", paddingTop: "8rem", paddingBottom: "3.5rem" }
          : { paddingTop: "8rem", paddingBottom: "3.5rem" }
      }
    >
      {isClub && (
        <>
          <div
            className="absolute inset-0 cross-grid pointer-events-none"
            style={{ maskImage: "radial-gradient(ellipse 90% 100% at 70% 0%, black 20%, transparent 80%)", WebkitMaskImage: "radial-gradient(ellipse 90% 100% at 70% 0%, black 20%, transparent 80%)" }}
          />
          <div
            className="pointer-events-none absolute -top-10 right-1/4 w-96 h-96 rounded-full opacity-20 aurora-drift"
            style={{ background: "radial-gradient(circle, rgba(167,139,250,0.6) 0%, transparent 65%)", filter: "blur(64px)" }}
          />
          <div
            className="pointer-events-none absolute top-0 -left-16 w-80 h-80 rounded-full opacity-15 aurora-drift-2"
            style={{ background: "radial-gradient(circle, rgba(245,158,11,0.55) 0%, transparent 68%)", filter: "blur(70px)" }}
          />
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background/60 to-transparent pointer-events-none" />
        </>
      )}
      {!isClub && <div className="absolute inset-0 dot-grid opacity-70 pointer-events-none" />}

      <div className={`relative mx-auto px-4 sm:px-6 lg:px-8 ${narrow ? "max-w-3xl" : "max-w-7xl"}`}>
        {backHref && (
          <Link
            href={backHref}
            className={`mb-8 inline-flex items-center gap-2 text-sm font-medium transition-colors ${
              isClub ? "text-white/40 hover:text-club-gold" : "text-muted hover:text-primary"
            }`}
          >
            <ArrowLeft className="h-4 w-4" />
            {backLabel ?? "Back"}
          </Link>
        )}
        <SectionHeading
          label={badge ?? "SInC"}
          title={title}
          description={description}
          club={isClub}
        />
        {children}
      </div>
    </section>
  );
}
