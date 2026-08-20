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
      {label ? (
        <span
          className={cn(
            "mb-5 inline-flex items-center font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-muted",
            align === "center" && "justify-center"
          )}
        >
          {label}
        </span>
      ) : null}
      <h2 className="editorial-display text-3xl text-foreground sm:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-muted">
          {description}
        </p>
      )}
    </Reveal>
  );
}
