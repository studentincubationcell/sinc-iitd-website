"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import type { RegistryEntry } from "@/lib/schemas";
import { writeCachedListing } from "@/lib/registry-cache";
import { listingStatus, padRegistryId, sectorLabel } from "@/lib/registry-status";
import {
  registryAreaClass,
  registryFieldClass,
  registryLabelClass,
  registryPrimaryBtn,
} from "@/components/forms/registry-styles";

const DEEP_FIELDS = [
  ["problem", "What problem are you solving?", true],
  ["solution", "What's your proposed solution?", true],
  ["funds", "Funds raised (₹, optional)", false],
  ["deck", "Pitch deck or demo link", false],
  ["revenue", "Revenue / customers", false],
  ["future", "Plans for the next 6–12 months", true],
] as const;

export function RegistryManage({ token }: { token: string }) {
  const [entry, setEntry] = useState<RegistryEntry | null>(null);
  const [missing, setMissing] = useState(false);
  const [showDeep, setShowDeep] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [mailed, setMailed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deep, setDeep] = useState({
    problem: "",
    solution: "",
    funds: "",
    deck: "",
    revenue: "",
    future: "",
  });

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/registry/manage/${encodeURIComponent(token)}`)
      .then(async (res) => {
        if (res.status === 404) {
          if (!cancelled) setMissing(true);
          return;
        }
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Could not load");
        if (cancelled) return;
        const loaded = data.entry as RegistryEntry;
        setEntry(loaded);
        if (loaded.manageToken) {
          writeCachedListing({
            token: loaded.manageToken,
            id: loaded.id,
            venture: loaded.venture,
          });
        }
        if (loaded.deep) {
          setDeep({
            problem: loaded.deep.problem ?? "",
            solution: loaded.deep.solution ?? "",
            funds: loaded.deep.funds ?? "",
            deck: loaded.deep.deck ?? "",
            revenue: loaded.deep.revenue ?? "",
            future: loaded.deep.future ?? "",
          });
        }
        if (typeof window !== "undefined" && window.location.hash === "#profile") {
          setShowDeep(true);
        }
      })
      .catch(() => {
        if (!cancelled) setMissing(true);
      });
    return () => {
      cancelled = true;
    };
  }, [token]);

  async function saveDeep() {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`/api/registry/manage/${encodeURIComponent(token)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(deep),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not save");
      setEntry(data.entry);
      setMailed(Boolean(data.mailed));
      setShowDeep(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save");
    } finally {
      setSubmitting(false);
    }
  }

  if (missing) {
    return (
      <div className="border border-border px-5 py-10 text-center">
        <h1 className="text-xl font-semibold text-foreground">Listing not found</h1>
        <p className="mt-2 text-sm text-muted">
          This manage link is invalid or expired. Use the link in your confirmation
          email, or list again from the registry.
        </p>
        <Link href="/registry" className={`${registryPrimaryBtn} mt-6`}>
          Startup Registry
        </Link>
      </div>
    );
  }

  if (!entry) {
    return <p className="text-sm text-muted">Loading listing…</p>;
  }

  const basics: [string, string][] = [
    ["Status", listingStatus(entry)],
    ["Entry", `№${padRegistryId(entry.id)}`],
    ["Founder", entry.name],
    ["Kerberos mail", entry.email],
    ["Venture", entry.venture],
    ["Pitch", entry.pitch],
    ["Stage", entry.stage],
    ["Sector", sectorLabel(entry)],
  ];
  if (entry.phone) basics.push(["Phone", entry.phone]);
  if (entry.whatsapp) basics.push(["WhatsApp", entry.whatsapp]);
  if (entry.linkedin) basics.push(["LinkedIn", entry.linkedin]);
  if (entry.link) basics.push(["Link", entry.link]);
  if (entry.referral) basics.push(["Referral", entry.referral]);

  return (
    <div>
      <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">
        SInC · IIT Delhi
      </p>
      <div className="mt-3 flex items-start gap-3">
        <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-brand-teal" />
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            {entry.venture}
          </h1>
          <p className="mt-2 text-sm text-muted">{listingStatus(entry)}</p>
        </div>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-muted">
        No login. This browser will remember the listing. Keep the email link if you
        switch devices.
      </p>

      <dl className="mt-8 space-y-3 border border-border px-5 py-6">
        {basics.map(([label, value]) => (
          <div key={label}>
            <dt className="text-xs text-muted">{label}</dt>
            <dd className="mt-0.5 text-sm text-foreground whitespace-pre-wrap">{value}</dd>
          </div>
        ))}
      </dl>

      {entry.deep && !showDeep ? (
        <p className="mt-6 text-sm text-foreground">Full profile is on file.</p>
      ) : null}

      {mailed ? (
        <p className="mt-4 text-sm text-foreground">
          Updated confirmation sent to {entry.email}.
        </p>
      ) : null}

      {!showDeep ? (
        <div className="mt-6">
          <button
            type="button"
            className={registryPrimaryBtn}
            onClick={() => setShowDeep(true)}
          >
            {entry.deep ? "Edit full profile" : "Add full profile"}
          </button>
        </div>
      ) : (
        <div id="profile" className="mt-8 space-y-5 border-t border-border pt-6">
          <p className="text-sm text-muted">
            Optional detail for mentors — saved against this listing only.
          </p>
          {DEEP_FIELDS.map(([key, label, multiline]) => (
            <div key={key}>
              <label className={registryLabelClass} htmlFor={`deep-${key}`}>
                {label}
              </label>
              {multiline ? (
                <textarea
                  id={`deep-${key}`}
                  className={registryAreaClass}
                  value={deep[key]}
                  onChange={(e) => setDeep((d) => ({ ...d, [key]: e.target.value }))}
                />
              ) : (
                <input
                  id={`deep-${key}`}
                  className={registryFieldClass}
                  value={deep[key]}
                  onChange={(e) => setDeep((d) => ({ ...d, [key]: e.target.value }))}
                />
              )}
            </div>
          ))}
          {error ? <p className="text-sm text-destructive">{error}</p> : null}
          <button
            type="button"
            className={registryPrimaryBtn}
            disabled={submitting}
            onClick={saveDeep}
          >
            {submitting ? "Saving…" : "Save full profile"}
          </button>
        </div>
      )}
    </div>
  );
}
