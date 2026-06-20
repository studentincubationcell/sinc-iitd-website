"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type AccordionContextValue = {
  openItems: string[];
  toggle: (value: string) => void;
};

const AccordionContext = React.createContext<AccordionContextValue | null>(null);

export function Accordion({
  children,
  className,
  type = "single",
}: {
  children: React.ReactNode;
  className?: string;
  type?: "single" | "multiple";
}) {
  const [openItems, setOpenItems] = React.useState<string[]>([]);

  const toggle = React.useCallback(
    (value: string) => {
      setOpenItems((prev) => {
        if (type === "single") {
          return prev.includes(value) ? [] : [value];
        }
        return prev.includes(value)
          ? prev.filter((v) => v !== value)
          : [...prev, value];
      });
    },
    [type]
  );

  return (
    <AccordionContext.Provider value={{ openItems, toggle }}>
      <div className={cn("space-y-2", className)}>{children}</div>
    </AccordionContext.Provider>
  );
}

export function AccordionItem({
  children,
  className,
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-none border-2 border-border-ink bg-card overflow-hidden brutal-shadow",
        className
      )}
    >
      {children}
    </div>
  );
}

export function AccordionTrigger({
  value,
  children,
  className,
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
}) {
  const ctx = React.useContext(AccordionContext);
  if (!ctx) throw new Error("AccordionTrigger must be used within Accordion");
  const isOpen = ctx.openItems.includes(value);

  return (
    <button
      type="button"
      className={cn(
        "flex w-full items-center justify-between p-5 text-left font-bold transition-colors hover:bg-accent-tint",
        isOpen && "bg-accent-lime",
        className
      )}
      onClick={() => ctx.toggle(value)}
      aria-expanded={isOpen}
    >
      {children}
      <ChevronDown
        className={cn(
          "h-5 w-5 shrink-0 text-foreground transition-transform duration-200",
          isOpen && "rotate-180"
        )}
      />
    </button>
  );
}

export function AccordionContent({
  value,
  children,
  className,
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
}) {
  const ctx = React.useContext(AccordionContext);
  if (!ctx) throw new Error("AccordionContent must be used within Accordion");
  const isOpen = ctx.openItems.includes(value);

  if (!isOpen) return null;

  return (
    <div className={cn("px-5 pb-5 text-muted leading-relaxed", className)}>
      {children}
    </div>
  );
}
