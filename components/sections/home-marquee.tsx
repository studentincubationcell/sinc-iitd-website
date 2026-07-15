const WORDS = ["Build", "Ship", "Scale", "Fund", "Repeat"];

function MarqueeRun() {
  return (
    <div className="flex shrink-0 items-center" aria-hidden>
      {WORDS.map((word) => (
        <span key={word} className="flex items-center">
          <span className="editorial-display text-outline whitespace-nowrap px-7 py-1 text-5xl md:px-10 md:text-7xl">
            {word}
          </span>
          <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-brand-teal md:h-3 md:w-3" />
        </span>
      ))}
    </div>
  );
}

export function HomeMarquee() {
  return (
    <section
      aria-label="Build, ship, scale, fund, repeat"
      className="overflow-hidden border-y border-border-ink/10 bg-card py-8 md:py-10"
    >
      <div className="flex w-max animate-marquee">
        <MarqueeRun />
        <MarqueeRun />
      </div>
    </section>
  );
}
