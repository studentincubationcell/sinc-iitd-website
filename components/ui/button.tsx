import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/btn inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-none text-sm font-semibold transition-[transform,box-shadow,background-color,color] duration-150 ease-out shadow-[4px_4px_0_0_#0a0a0a] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#0a0a0a] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border-2 border-foreground bg-accent-lime text-foreground font-bold hover:bg-accent-lime-dark",
        accent:
          "border-2 border-foreground bg-pop-pink text-foreground font-bold hover:brightness-95",
        outline:
          "border-2 border-foreground bg-card text-foreground hover:bg-accent-lime",
        ghost: "shadow-none hover:shadow-none active:translate-x-0 active:translate-y-0 text-foreground hover:bg-accent-tint",
        maroon:
          "border-2 border-foreground bg-foreground text-background hover:bg-accent-lime hover:text-foreground",
        club: "border-2 border-foreground bg-accent-lime text-foreground font-bold hover:bg-accent-lime-dark",
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
