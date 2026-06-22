import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PrintButton } from "@/components/sections/print-button";
import { cohort, site } from "@/lib/data";

export const metadata: Metadata = {
  title: "Cohort 01 — Investor One-Pager",
  description:
    "A printable one-page brief on SInC Cohort 01 for investors and partners.",
};

export default function CohortBriefPage() {
  return (
    <div className="brief-page mx-auto max-w-3xl px-6 py-10 print:py-0">
      <div className="no-print mb-8 flex items-center justify-between gap-4">
        <Link
          href="/cohort"
          className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Cohort
        </Link>
        <PrintButton />
      </div>

      <header className="border-b border-border pb-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted">
          {site.fullName} · IIT Delhi · Investor brief
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          {cohort.name}
        </h1>
        <p className="mt-2 text-lg font-medium text-foreground/90">
          {cohort.heroStatement}
        </p>
        <p className="mt-2 text-sm text-muted">{cohort.tagline}</p>
      </header>

      <section className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-4 mt-6">
        {[
          { k: "Duration", v: cohort.duration ?? "—" },
          { k: "Ventures", v: cohort.cohortSize ?? "—" },
          { k: "Build budget", v: "₹43k/mo" },
          { k: "Fellowship", v: "₹20k/mo" },
        ].map((s) => (
          <div key={s.k} className="bg-card p-4">
            <p className="text-[10px] uppercase tracking-widest text-muted">{s.k}</p>
            <p className="mt-1 text-sm font-bold">{s.v}</p>
          </div>
        ))}
      </section>

      {cohort.objectives && cohort.objectives.length > 0 && (
        <section className="mt-8">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted">
            Why this cohort exists
          </h2>
          <ul className="mt-3 space-y-2">
            {cohort.objectives.map((o) => (
              <li key={o.title} className="text-sm leading-relaxed">
                <strong>{o.title}.</strong> {o.description}
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-8">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted">
          The plan
        </h2>
        <ol className="mt-3 space-y-2">
          {cohort.plan.map((p) => (
            <li key={p.step} className="text-sm leading-relaxed">
              <strong>{p.step}. {p.title}.</strong> {p.description}
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-8">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted">
          What founders get
        </h2>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {cohort.benefits.map((b) => (
            <li key={b.title} className="rounded-lg border border-border p-3 text-sm leading-relaxed">
              <strong>{b.title}.</strong> {b.description}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8 rounded-lg border border-border bg-card/50 p-5">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted">
          Get involved
        </h2>
        <p className="mt-2 text-sm leading-relaxed">
          Mentor founders, scout deals, or attend Demo Day. Reach us at{" "}
          <a href={`mailto:${site.contact.email}`} className="font-medium underline">
            {site.contact.email}
          </a>
          .
        </p>
        <p className="mt-1 text-xs text-muted">{site.contact.address}</p>
      </section>

      <footer className="mt-8 border-t border-border pt-4 text-xs text-muted">
        {site.fullName}, IIT Delhi · Generated from the live site · sinc.iitd.ac.in
      </footer>
    </div>
  );
}
