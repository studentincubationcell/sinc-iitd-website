"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { site } from "@/lib/data";

const DEMO_ACTIVE = "/about";

type VariantProps = {
  className?: string;
};

type LogoWordmarkProps = {
  /** Gumroad-style: larger single-line wordmark */
  gumroad?: boolean;
  /** Tighter for floating capsule bar */
  dense?: boolean;
};

function LogoWordmark({ gumroad, dense }: LogoWordmarkProps) {
  const iconSize = dense ? 30 : gumroad ? 36 : 34;

  return (
    <Link href="/" className="flex items-center gap-3 group shrink-0 min-w-0">
      <div className="relative shrink-0">
        <Image
          src="/logo.svg"
          alt=""
          width={iconSize}
          height={iconSize}
          aria-hidden
          className="transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 bg-brand-teal ring-1 ring-foreground" />
      </div>
      <div className="min-w-0 leading-none">
        <span
          className={cn(
            "block font-black tracking-tight text-foreground",
            gumroad
              ? "text-xl sm:text-[1.35rem]"
              : dense
                ? "text-base sm:text-lg"
                : "text-lg sm:text-xl"
          )}
        >
          {site.name}
        </span>
        {!gumroad && (
          <span className="mt-1 block font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-muted">
            IIT Delhi
          </span>
        )}
      </div>
    </Link>
  );
}

function NavLinks({
  activeHref,
  linkClass,
  activeClass,
  inactiveClass,
}: {
  activeHref: string;
  linkClass: string;
  activeClass: string;
  inactiveClass: string;
}) {
  return (
    <>
      {site.nav.map((item) => {
        const active = activeHref === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(linkClass, active ? activeClass : inactiveClass)}
          >
            {item.label}
          </Link>
        );
      })}
    </>
  );
}

/** A — Gumroad classic: sentence-case, ink pill active, divider + flat ink CTA */
export function HeaderVariantA({ className }: VariantProps) {
  return (
    <header
      className={cn(
        "border-b border-border bg-background text-foreground",
        className
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-3.5 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 shrink-0">
          <LogoWordmark gumroad />
          <span className="hidden sm:inline-flex items-center rounded-full border border-border-ink px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-muted">
            IIT Delhi
          </span>
        </div>

        <nav className="hidden lg:flex items-center gap-0.5">
          <NavLinks
            activeHref={DEMO_ACTIVE}
            linkClass="rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-200"
            activeClass="bg-foreground text-background"
            inactiveClass="text-muted hover:text-foreground"
          />
        </nav>

        <div className="hidden sm:flex items-center gap-4 shrink-0">
          <span className="hidden md:block h-5 w-px bg-border-ink/30" aria-hidden />
          <Link
            href="/contact"
            className="hidden md:inline text-sm font-medium text-foreground hover:opacity-70 transition-opacity"
          >
            Contact
          </Link>
          <Link
            href="/apply"
            className="inline-flex items-center justify-center bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-90"
          >
            Apply now
          </Link>
        </div>
      </div>
    </header>
  );
}

/** B — Gumroad layout × SInC brutal: mono nav, teal pill, hard-shadow CTA, dot grid */
export function HeaderVariantB({ className }: VariantProps) {
  return (
    <header
      className={cn(
        "relative border-b-2 border-border-ink bg-background text-foreground overflow-hidden",
        className
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(10,10,10,0.12) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />
      <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <LogoWordmark />

        <nav className="hidden lg:flex items-center gap-1">
          <NavLinks
            activeHref={DEMO_ACTIVE}
            linkClass="rounded-full px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] transition-all duration-200"
            activeClass="bg-brand-teal text-foreground"
            inactiveClass="text-muted hover:text-foreground"
          />
        </nav>

        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <span className="hidden md:block h-5 w-px bg-border-ink" aria-hidden />
          <Link
            href="/apply"
            className="inline-flex items-center justify-center border-2 border-border-ink bg-brand-teal px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-wide text-foreground hard-shadow transition-[transform,box-shadow] duration-150 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
          >
            Apply now
          </Link>
        </div>
      </div>
    </header>
  );
}

/** C — Floating capsule: centered nav, Gumroad divider, ink CTA in bordered bar */
export function HeaderVariantC({ className }: VariantProps) {
  return (
    <header className={cn("bg-transparent px-4 py-3 sm:px-6", className)}>
      <div className="mx-auto flex max-w-6xl items-center border-2 border-border-ink bg-[rgba(244,243,238,0.95)] backdrop-blur-md hard-shadow-sm">
        <div className="flex flex-1 items-center pl-3 py-2 sm:pl-4 sm:py-2.5 min-w-0">
          <LogoWordmark dense />
        </div>

        <nav className="hidden lg:flex items-center justify-center gap-0.5 px-2">
          <NavLinks
            activeHref={DEMO_ACTIVE}
            linkClass="px-3 py-1.5 text-sm font-medium transition-colors duration-200"
            activeClass="font-semibold text-foreground underline decoration-brand-teal decoration-2 underline-offset-[6px]"
            inactiveClass="text-muted hover:text-foreground"
          />
        </nav>

        <div className="flex flex-1 items-center justify-end gap-3 pr-3 py-2.5">
          <span className="hidden md:block h-5 w-px bg-border-ink/25" aria-hidden />
          <Link
            href="/apply"
            className="hidden md:inline text-sm font-medium text-muted hover:text-foreground transition-colors"
          >
            Apply
          </Link>
          <Link
            href="/apply"
            className="inline-flex items-center justify-center border-2 border-border-ink bg-foreground px-4 py-2 text-xs font-bold uppercase tracking-wide text-background"
          >
            Start
          </Link>
        </div>
      </div>
    </header>
  );
}

/** Mini hero strip so each variant reads in page context */
export function HeaderPreviewContext({ variant }: { variant: "A" | "B" | "C" }) {
  const labels = {
    A: "Classic Gumroad",
    B: "Gumroad × Brutalist",
    C: "Floating capsule",
  };

  return (
    <div className="border-x border-b border-border-ink bg-background">
      <div className="dot-grid relative min-h-[220px] px-6 py-10 sm:px-10 sm:py-14">
        <p className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">
          Option {variant} · {labels[variant]}
        </p>
        <h2 className="editorial-display max-w-lg text-3xl sm:text-4xl text-foreground">
          Campus founders,{" "}
          <span className="lime-mark">real startups.</span>
        </h2>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
          Preview how this header sits against the home hero — paper canvas, ink type, teal marks.
        </p>
      </div>
    </div>
  );
}
