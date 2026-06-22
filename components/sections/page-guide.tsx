import type { ReactNode } from "react";

export function PageGuide({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="soft-card mb-10 border-l-4 border-l-accent-lime px-6 py-5 sm:px-8">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-2">
        What you&apos;ll find here
      </p>
      <h2 className="text-base font-bold tracking-tight mb-3">{title}</h2>
      <div className="text-sm text-muted leading-relaxed space-y-2">{children}</div>
    </div>
  );
}
