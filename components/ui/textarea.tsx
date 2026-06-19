import * as React from "react";
import { cn } from "@/lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      className={cn(
        "flex min-h-[120px] w-full rounded-none border-2 border-border-ink bg-background px-4 py-3 text-sm transition-all duration-150",
        "placeholder:text-muted focus-visible:outline-none focus-visible:border-foreground focus-visible:shadow-[3px_3px_0_0_#0a0a0a]",
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
