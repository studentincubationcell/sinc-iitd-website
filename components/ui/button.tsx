import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/btn inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-none text-sm font-semibold transition-[transform,box-shadow,background-color,color] duration-150 ease-out brutal-shadow hover:translate-x-[2px] hover:translate-y-[2px] brutal-shadow-hover active:translate-x-[4px] active:translate-y-[4px] active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border-2 border-foreground bg-brand-teal text-on-accent font-bold hover:bg-brand-blue",
        accent:
          "border-2 border-foreground bg-pop-pink text-on-accent font-bold hover:brightness-95",
        outline:
          "border-2 border-foreground bg-card text-foreground hover:bg-brand-teal hover:text-on-accent",
        ghost: "shadow-none hover:shadow-none active:translate-x-0 active:translate-y-0 text-foreground hover:bg-accent-tint",
        maroon:
          "border-2 border-foreground bg-foreground text-background hover:bg-brand-teal hover:text-on-accent",
        club: "border-2 border-foreground bg-brand-teal text-on-accent font-bold hover:bg-brand-blue",
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
      className={cn(buttonVariants({ variant, size }), className)}
      ref={ref}
      {...props}
    />
  )
);
Button.displayName = "Button";

export { Button, buttonVariants };
