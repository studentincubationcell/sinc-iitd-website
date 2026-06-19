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
    <section
      className="relative overflow-hidden py-28 lg:py-36 border-t border-white/[0.06] vignette"
      style={{ background: "linear-gradient(160deg, #09051a 0%, #130d2e 45%, #1e1247 100%)" }}
    >
      {/* Iridescent halo */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="iridescent h-[640px] w-[640px] rounded-full opacity-[0.16]" style={{ filter: "blur(70px)" }} />
      </div>
      {/* Layered glows */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full"
        style={{ background: "radial-gradient(ellipse at bottom, rgba(167,139,250,0.22) 0%, transparent 65%)", filter: "blur(60px)" }}
      />
      <div
        className="pointer-events-none absolute top-0 right-1/4 w-[400px] h-[300px] rounded-full opacity-20"
        style={{ background: "radial-gradient(ellipse, rgba(245,158,11,0.5) 0%, transparent 65%)", filter: "blur(72px)" }}
      />
      <div
        className="pointer-events-none absolute top-1/2 left-0 w-[300px] h-[300px] rounded-full opacity-12"
        style={{ background: "radial-gradient(circle, rgba(192,132,252,0.6) 0%, transparent 65%)", filter: "blur(64px)" }}
      />
      <div className="absolute inset-0 cross-grid pointer-events-none" />
      <div className="absolute inset-0 hero-grain opacity-[0.03] pointer-events-none" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center text-white">
        <Reveal>
          {/* Eyebrow */}
          <span className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.3em] text-club-lavender/60 mb-7">
            <span className="h-px w-8 bg-club-lavender/40" />
            Start your journey
            <span className="h-px w-8 bg-club-lavender/40" />
          </span>

          {/* Mega headline */}
          <h2 className="headline-tight text-glow-soft text-5xl sm:text-6xl lg:text-[5rem] font-black">
            Ready to build
            <br />
            <span className="gradient-text-hero">something real?</span>
          </h2>

          <p className="mt-8 text-lg sm:text-xl text-white/40 max-w-lg mx-auto leading-relaxed">
            Join SInC — mentorship, lab access, and a community of builders pushing from campus idea to funded startup.
          </p>

          {/* Feature pills */}
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {FEATURES.map((f) => (
              <span
                key={f.label}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm font-semibold text-white/65 hover:border-club-lavender/40 hover:bg-white/[0.08] hover:text-white/90 transition-all"
              >
                <f.icon className="h-4 w-4 text-club-lavender/80" strokeWidth={2} />
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
                className="h-14 gap-2 px-12 text-base font-black normal-case tracking-normal shadow-[0_0_40px_rgba(245,158,11,0.45)] hover:shadow-[0_0_60px_rgba(245,158,11,0.65)] transition-shadow"
              >
                Apply now <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/programs">
              <Button
                size="lg"
                variant="outline"
                className="h-14 px-12 text-base border-white/15 text-white/70 hover:bg-white/[0.06] hover:border-white/30 hover:text-white"
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
