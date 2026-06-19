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
      <div className="relative overflow-hidden rounded-sm border border-dashed border-club-lavender/30 bg-club-purple p-12 sm:p-16 text-center">
        <div className="absolute inset-0 opacity-[0.07] dot-grid pointer-events-none" />
        <div className="relative mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-club-lavender/15">
          <Icon className="h-8 w-8 text-club-gold" />
        </div>
        <h3 className="relative text-xl font-bold text-white sm:text-2xl">{title}</h3>
        <p className="relative mx-auto mt-3 max-w-md text-white/60">{description}</p>
        {hint && (
          <p className="relative mx-auto mt-2 max-w-md text-sm text-white/40">{hint}</p>
        )}
        {action && (
          <Link href={action.href} className="relative mt-8 inline-block">
            <Button
              variant={action.variant === "outline" ? "outline" : undefined}
              className={
                action.variant === "outline"
                  ? "rounded-sm border-club-lavender/50 bg-transparent text-white hover:bg-white/5"
                  : "rounded-sm border-0 bg-club-gold font-bold text-club-purple hover:bg-club-gold/90"
              }
            >
              {action.label}
            </Button>
          </Link>
        )}
      </div>
    </Reveal>
  );
}
