import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

export function ClubEmptyState({
  icon: Icon,
  title,
  description,
  hint,
  action,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  hint?: string;
  action?: { href: string; label: string; variant?: "primary" | "outline" };
}) {
  return (
    <Reveal>
      <div className="relative overflow-hidden brutal-block-lg bg-card p-12 sm:p-16 text-center">
        <div className="absolute inset-0 opacity-[0.5] dot-grid pointer-events-none" />
        <div className="relative mx-auto mb-6 flex h-16 w-16 items-center justify-center border-2 border-border-ink bg-accent-lime">
          <Icon className="h-8 w-8 text-foreground" />
        </div>
        <h3 className="relative text-xl font-black tracking-tight text-foreground sm:text-2xl">{title}</h3>
        <p className="relative mx-auto mt-3 max-w-md text-muted">{description}</p>
        {hint && (
          <p className="relative mx-auto mt-2 max-w-md font-mono text-xs text-muted/70">{hint}</p>
        )}
        {action && (
          <Link href={action.href} className="relative mt-8 inline-block">
            <Button variant={action.variant === "outline" ? "outline" : "default"}>
              {action.label}
            </Button>
          </Link>
        )}
      </div>
    </Reveal>
  );
}
