import { Reveal, StaggerContainer, StaggerItem } from "@/components/motion/reveal";
import type { Connection } from "@/lib/schemas";

const CATEGORY_LABELS: Record<Connection["category"], string> = {
  "alumni-company": "Alumni & companies",
  investor: "Investors",
  institution: "Institutions",
  partner: "Partners",
};

function Tile({ c }: { c: Connection }) {
  const isPlaceholder = c.name.startsWith("[");
  const content = (
    <div
      className={`soft-card flex h-24 items-center justify-center px-4 text-center transition-colors ${
        isPlaceholder ? "border-dashed bg-card/40" : "bg-card hover:bg-accent-tint/30"
      }`}
    >
      {c.logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={c.logo} alt={c.name} className="max-h-12 max-w-[80%] object-contain" loading="lazy" />
      ) : (
        <span
          className={`text-sm font-semibold tracking-tight ${
            isPlaceholder ? "text-muted" : "text-foreground"
          }`}
        >
          {c.name}
        </span>
      )}
    </div>
  );

  if (c.href && !isPlaceholder) {
    return (
      <a href={c.href} target="_blank" rel="noopener noreferrer" className="block">
        {content}
      </a>
    );
  }
  return content;
}

export function ConnectionsWall({ connections }: { connections: Connection[] }) {
  if (!connections || connections.length === 0) return null;

  return (
    <section className="section-padding border-t border-border bg-card/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-10 max-w-2xl">
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-muted">
            Show off our connections
          </span>
          <h2 className="editorial-display text-3xl text-foreground sm:text-4xl">
            Names that{" "}
            <span className="lime-mark">show up for founders.</span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
            Institutions, investors, alumni companies, and partners — even loosely connected. Replace bracketed slots in <code className="text-xs">data/network.json</code> with real names.
          </p>
        </Reveal>

        <StaggerContainer className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {connections.map((c) => (
            <StaggerItem key={c.id}>
              <Tile c={c} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted">
          {(Object.keys(CATEGORY_LABELS) as Connection["category"][]).map((cat) => (
            <span key={cat} className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-accent-lime" />
              {CATEGORY_LABELS[cat]}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
