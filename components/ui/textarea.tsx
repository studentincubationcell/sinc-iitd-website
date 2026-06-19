import * as React from "react";
import { cn } from "@/lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      className={cn(
        "flex min-h-[120px] w-full rounded-xl border border-border bg-card px-4 py-3 text-sm transition-all duration-200",
        "placeholder:text-muted focus-visible:outline-none focus-visible:border-primary/60 focus-visible:ring-4 focus-visible:ring-primary/15 hover:border-club-lavender/40",
        "disabled:cursor-not-allowed disabled:opacity-50 resize-y",
        className
      )}
      ref={ref}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";

export { Textarea };
