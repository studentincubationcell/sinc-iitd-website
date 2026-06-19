import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";

export function SectionHeading({
  label,
  title,
  description,
  align = "left",
  className,
  dark = false,
  club = false,
}: {
  label: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  dark?: boolean;
  club?: boolean;
}) {
  return (
    <Reveal
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      <span
        className={cn(
          "mb-5 inline-flex items-center gap-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-muted",
          align === "center" && "justify-center"
        )}
      >
        <span className="inline-block h-3 w-3 bg-accent-lime" />
        {label}
      </span>
      <h2 className="editorial-display text-4xl text-foreground sm:text-5xl lg:text-[3.5rem]">
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-lg leading-relaxed text-muted">
          {description}
        </p>
      )}
    </Reveal>
  );
}
