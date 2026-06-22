"use client";

import { useState } from "react";
import { CalendarPlus, Download, Check, Copy } from "lucide-react";

export function CalendarSubscribe() {
  const [copied, setCopied] = useState(false);

  async function copyFeed() {
    const url = `${window.location.origin}/events/sinc.ics`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard blocked — no-op
    }
  }

  return (
    <div className="mb-8 flex flex-col gap-3 rounded-lg border border-border bg-card/50 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-accent-tint/60">
          <CalendarPlus className="h-4 w-4" />
        </span>
        <div>
          <p className="text-sm font-semibold tracking-tight">Never miss a date</p>
          <p className="text-xs text-muted">
            Add the SInC calendar to Google Calendar, Apple Calendar, or Outlook.
          </p>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <a
          href="/events/sinc.ics"
          className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium hover:bg-accent-tint/40 transition-colors"
        >
          <Download className="h-4 w-4" /> Download .ics
        </a>
        <button
          type="button"
          onClick={copyFeed}
          className="inline-flex items-center gap-1.5 rounded-lg border border-foreground bg-foreground px-3 py-2 text-sm font-medium text-background hover:opacity-90 transition-opacity"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4" /> Copied feed URL
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" /> Copy subscribe link
            </>
          )}
        </button>
      </div>
    </div>
  );
}
