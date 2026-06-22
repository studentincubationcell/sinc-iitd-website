"use client";

import { Printer } from "lucide-react";

export function PrintButton({ label = "Print / Save as PDF" }: { label?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="no-print inline-flex items-center gap-2 rounded-lg border border-foreground bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-90 transition-opacity"
    >
      <Printer className="h-4 w-4" /> {label}
    </button>
  );
}
