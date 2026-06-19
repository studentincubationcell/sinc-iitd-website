import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-club-gold/50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "sheen bg-club-gold text-club-purple font-bold uppercase tracking-wide hover:bg-club-gold/90",
        accent:
          "sheen bg-accent text-club-purple font-bold hover:bg-accent/90",
        outline:
          "border border-club-lavender/35 bg-transparent hover:bg-club-lavender/10 hover:border-club-lavender/50",
        ghost: "hover:bg-club-lavender/10",
        maroon:
          "bg-maroon text-white hover:bg-maroon/90",
        club: "sheen bg-club-gold text-club-purple font-bold uppercase tracking-wider hover:bg-club-gold/90",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 px-4 text-xs",
        lg: "h-13 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  )
);
Button.displayName = "Button";

export { Button, buttonVariants };
