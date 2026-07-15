import type { Metadata } from "next";
import Link from "next/link";
import {
  HeaderVariantA,
  HeaderVariantB,
  HeaderVariantC,
  HeaderPreviewContext,
} from "@/components/layout/header-gumroad-variants";

export const metadata: Metadata = {
  title: "Header previews · SInC",
  robots: { index: false, follow: false },
};

const variants = [
  {
    id: "A",
    title: "Classic Gumroad",
    description:
      "Sentence-case links, ink pill for the active page, vertical divider, flat black CTA — closest to Gumroad’s own nav.",
    Header: HeaderVariantA,
  },
  {
    id: "B",
    title: "Gumroad × SInC brutal",
    description:
      "Same Gumroad structure (divider + CTA cluster) but keeps mono uppercase nav, dot grid, teal active pill, and hard-shadow Apply button.",
    Header: HeaderVariantB,
  },
  {
    id: "C",
    title: "Floating capsule",
    description:
      "Centered links inside a bordered bar with hard shadow — Gumroad-style separator plus a text + compact ink CTA on the right.",
    Header: HeaderVariantC,
  },
] as const;

export default function HeaderPreviewPage() {
  return (
    <div className="min-h-screen bg-card-pure pt-20 pb-24">
      <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
        <div className="mb-12 border-b border-border-ink pb-8">
          <p className="mb-2 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">
            Design exploration
          </p>
          <h1 className="editorial-display text-4xl text-foreground sm:text-5xl">
            Gumroad-inspired headers
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
            Three directions that borrow Gumroad&apos;s clean nav rhythm — pill active states,
            divider before the CTA, flat ink buttons — while staying on SInC paper, teal, and
            brutalist tokens. The fixed header above is your current live nav.
          </p>
          <p className="mt-3 font-mono text-[11px] text-muted">
            Active demo state: <span className="text-foreground">About</span> (like Gumroad&apos;s screenshot)
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex text-sm font-semibold text-foreground underline decoration-brand-teal decoration-2 underline-offset-4"
          >
            ← Back to home
          </Link>
        </div>

        <div className="flex flex-col gap-16">
          {variants.map(({ id, title, description, Header }) => (
            <section key={id} className="overflow-hidden rounded-sm border-2 border-border-ink hard-shadow">
              <div className="border-b border-border-ink bg-foreground px-5 py-4 text-background">
                <h2 className="text-lg font-black tracking-tight">
                  {id}. {title}
                </h2>
                <p className="mt-1 max-w-3xl text-sm text-background/70">{description}</p>
              </div>
              <Header />
              <HeaderPreviewContext variant={id} />
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
