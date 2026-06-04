import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";

export function SectionHeading({
  label,
  title,
  description,
  align = "left",
  className,
  dark = false,
}: {
  label: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  dark?: boolean;
}) {
  return (
    <Reveal
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      <p
        className={cn(
          "text-xs font-semibold uppercase tracking-[0.2em] mb-4",
          dark ? "text-white/50" : "text-muted"
        )}
      >
        {label}
      </p>
      <h2
        className={cn(
          "text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight leading-[1.1]",
          dark ? "text-white" : "text-foreground"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-lg leading-relaxed",
            dark ? "text-white/60" : "text-muted"
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
