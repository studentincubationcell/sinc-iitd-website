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
  const onDark = club || dark;

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
          "inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.28em] mb-5",
          onDark ? "text-club-lavender/50" : "text-club-lavender-dim/70"
        )}
      >
        <span className={cn("h-px w-7 inline-block", onDark ? "bg-club-lavender/35" : "bg-club-lavender-dim/40")} />
        {label}
      </span>
      <h2
        className={cn(
          "text-3xl sm:text-4xl lg:text-[2.75rem] font-black tracking-tight leading-[1.08]",
          onDark ? "text-white" : "text-foreground"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-lg leading-relaxed",
            onDark ? "text-white/50" : "text-muted"
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
