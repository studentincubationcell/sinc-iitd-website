import Link from "next/link";
import type { ReactNode } from "react";

/* ── Lumena "Selected Themes" master-detail shell ─────────────
   Left: sticky numbered index of sibling pages; the current one
   is a filled navy band with gold text. Below it, a pill CTA and
   hairline meta rows. Right: the selected item's full detail.  */

export type IndexItem = { href: string; label: string };
export type MetaRow = { label: string; value: string };

export function DetailIndexLayout({
  indexTitle,
  items,
  activeHref,
  cta,
  meta,
  children,
}: {
  indexTitle: string;
  items: IndexItem[];
  activeHref: string;
  cta?: { href: string; label: string; external?: boolean };
  meta?: MetaRow[];
  children: ReactNode;
}) {
  return (
    <div className="mx-auto grid max-w-[90rem] gap-14 px-5 sm:px-8 lg:grid-cols-[24rem_1fr] lg:gap-20 lg:px-12">
      {/* Left — sticky index */}
      <aside className="lg:sticky lg:top-28 lg:self-start">
        <h2 className="mega-display text-3xl text-foreground sm:text-4xl">{indexTitle}</h2>

        <nav aria-label={indexTitle} className="mt-6 border-t border-border">
          <ul>
            {items.map((item, i) => {
              const active = item.href === activeHref;
              const number = `(${String(i + 1).padStart(2, "0")})`;
              return (
                <li key={item.href} className="border-b border-border">
                  {active ? (
                    <span
                      aria-current="page"
                      className="flex items-baseline justify-between gap-4 bg-inverse px-4 py-3.5 text-sm font-semibold"
                      style={{ color: "var(--club-gold-bright)" }}
                    >
                      <span className="text-pretty">{item.label}</span>
                      <span className="shrink-0 font-mono text-xs">{number}</span>
                    </span>
                  ) : (
                    <Link
                      href={item.href}
                      className="flex items-baseline justify-between gap-4 px-4 py-3.5 text-sm text-foreground transition-colors hover:bg-[var(--hover-on-canvas)]"
                    >
                      <span className="text-pretty">{item.label}</span>
                      <span className="shrink-0 font-mono text-xs text-muted">{number}</span>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {cta &&
          (cta.external ? (
            <a href={cta.href} target="_blank" rel="noopener noreferrer" className="pill-cta mt-8">
              {cta.label}
            </a>
          ) : (
            <Link href={cta.href} className="pill-cta mt-8">
              {cta.label}
            </Link>
          ))}

        {meta && meta.length > 0 && (
          <dl className="mt-8">
            {meta.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-[8rem_1fr] gap-4 border-t border-border py-4 last:border-b"
              >
                <dt className="text-sm text-muted">{row.label}</dt>
                <dd className="text-sm leading-relaxed text-foreground">{row.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </aside>

      {/* Right — selected detail */}
      <div className="min-w-0">{children}</div>
    </div>
  );
}

/* ── Lumena hairline-rule column grid ─────────────────────────
   Titles on top, generous whitespace, muted description below,
   columns separated by thin vertical rules.                   */

export function HairlineGrid({
  items,
}: {
  items: { href: string; title: string; description: string }[];
}) {
  if (items.length === 0) return null;
  return (
    <ul className="grid gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <li
          key={item.href}
          className="flex flex-col gap-16 border-border px-6 first:pl-0 sm:border-l sm:[&:nth-child(2n+1)]:border-l-0 lg:[&:nth-child(2n+1)]:border-l lg:[&:first-child]:border-l-0"
        >
          <h3 className="text-xl font-semibold leading-snug tracking-tight text-foreground text-pretty">
            <Link href={item.href} className="transition-colors hover:text-brand-blue">
              {item.title}
            </Link>
          </h3>
          <p className="text-sm leading-relaxed text-muted">{item.description}</p>
        </li>
      ))}
    </ul>
  );
}
