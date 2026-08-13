"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Lock } from "lucide-react";
import {
  REGISTRY_SECTORS,
  REGISTRY_STAGES,
  type RegistryEntry,
} from "@/lib/schemas";
import { cn } from "@/lib/utils";

type Tab = "apply" | "registry";

const fieldClass =
  "mt-1.5 flex h-11 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-foreground";

const areaClass =
  "mt-1.5 flex min-h-[100px] w-full resize-y rounded-md border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-foreground";

const selectClass =
  "mt-1.5 flex h-11 w-full appearance-none rounded-md border border-border bg-background px-3 text-sm text-foreground outline-none transition-colors focus:border-foreground";

const labelClass = "block text-sm font-medium text-foreground";

const primaryBtn =
  "inline-flex h-11 items-center justify-center rounded-md bg-foreground px-5 text-sm font-semibold text-background transition-colors hover:bg-brand-blue disabled:opacity-50";

const secondaryBtn =
  "inline-flex h-11 items-center justify-center rounded-md border border-border bg-background px-5 text-sm font-medium text-foreground transition-colors hover:border-foreground disabled:opacity-50";

export function RegistryExperience() {
  const [tab, setTab] = useState<Tab>("apply");
  const [nextId, setNextId] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [venture, setVenture] = useState("");
  const [pitch, setPitch] = useState("");
  const [stage, setStage] = useState<string>(REGISTRY_STAGES[0]);
  const [sector, setSector] = useState<string>(REGISTRY_SECTORS[0]);
  const [link, setLink] = useState("");
  const [referral, setReferral] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [entry, setEntry] = useState<RegistryEntry | null>(null);
  const [mailed, setMailed] = useState(false);
  const [showDeep, setShowDeep] = useState(false);
  const [deepSaved, setDeepSaved] = useState(false);
  const [deep, setDeep] = useState({
    problem: "",
    solution: "",
    funds: "",
    deck: "",
    revenue: "",
    future: "",
  });

  const [passcode, setPasscode] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [entries, setEntries] = useState<RegistryEntry[]>([]);
  const [gateError, setGateError] = useState(false);
  const [loadingList, setLoadingList] = useState(false);

  useEffect(() => {
    fetch("/api/registry/next")
      .then((r) => r.json())
      .then((d) => setNextId(d.nextId ?? 1))
      .catch(() => {});
  }, [entry]);

  async function submitQuick(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/registry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          venture,
          pitch,
          stage,
          sector,
          link: link || undefined,
          referral: referral || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not save");
      setEntry(data.entry);
      setMailed(Boolean(data.mailed));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save");
    } finally {
      setSubmitting(false);
    }
  }

  async function saveDeep() {
    if (!entry) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`/api/registry/${entry.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(deep),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not save");
      setEntry(data.entry);
      setDeepSaved(true);
      setMailed(Boolean(data.mailed));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save");
    } finally {
      setSubmitting(false);
    }
  }

  async function unlockRegistry() {
    setLoadingList(true);
    setGateError(false);
    try {
      const res = await fetch("/api/registry", {
        headers: { "x-registry-passcode": passcode },
      });
      if (!res.ok) {
        setGateError(true);
        setUnlocked(false);
        return;
      }
      const data = await res.json();
      setEntries(data.entries ?? []);
      setUnlocked(true);
    } catch {
      setGateError(true);
    } finally {
      setLoadingList(false);
    }
  }

  return (
    <div>
      {/* Header */}
      <header className="border-b border-border pb-8">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">
          SInC · IIT Delhi
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {tab === "apply" ? "Startup Registry" : "Registry (internal)"}
        </h1>
        <p className="mt-3 max-w-lg text-base leading-relaxed text-muted">
          {tab === "apply" ? (
            <>
              List your venture in a few minutes. Mentors and coordinators review
              submissions here. Cohort 01 is a separate path on{" "}
              <Link href="/apply" className="text-foreground underline underline-offset-2">
                Apply
              </Link>
              .
            </>
          ) : (
            <>Coordinator view of registry submissions. Passcode required.</>
          )}
        </p>

        <div className="mt-6 flex gap-6 border-b border-transparent text-sm">
          {(
            [
              { id: "apply" as const, label: "List a venture" },
              { id: "registry" as const, label: "View registry" },
            ] as const
          ).map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={cn(
                "-mb-px border-b-2 pb-2 font-medium transition-colors",
                tab === t.id
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted hover:text-foreground"
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      </header>

      {tab === "apply" && (
        <div className="pt-8">
          {!entry ? (
            <form onSubmit={submitQuick} className="space-y-6">
              <p className="font-mono text-xs text-muted">
                Next entry · №{String(nextId).padStart(3, "0")}
              </p>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <label className={labelClass} htmlFor="reg-name">
                    Full name
                  </label>
                  <input
                    id="reg-name"
                    className={fieldClass}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    autoComplete="name"
                  />
                </div>
                <div className="sm:col-span-1">
                  <label className={labelClass} htmlFor="reg-email">
                    IIT Delhi email
                  </label>
                  <input
                    id="reg-email"
                    type="email"
                    className={fieldClass}
                    placeholder="entrynumber@iitd.ac.in"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              <div>
                <label className={labelClass} htmlFor="reg-venture">
                  Venture name
                </label>
                <input
                  id="reg-venture"
                  className={fieldClass}
                  value={venture}
                  onChange={(e) => setVenture(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className={labelClass} htmlFor="reg-pitch">
                  One-line pitch
                </label>
                <textarea
                  id="reg-pitch"
                  className={areaClass}
                  placeholder="What you build, for whom, and why it matters."
                  value={pitch}
                  onChange={(e) => setPitch(e.target.value)}
                  required
                  minLength={10}
                />
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className={labelClass} htmlFor="reg-stage">
                    Stage
                  </label>
                  <select
                    id="reg-stage"
                    className={selectClass}
                    value={stage}
                    onChange={(e) => setStage(e.target.value)}
                    required
                  >
                    {REGISTRY_STAGES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClass} htmlFor="reg-sector">
                    Sector
                  </label>
                  <select
                    id="reg-sector"
                    className={selectClass}
                    value={sector}
                    onChange={(e) => setSector(e.target.value)}
                    required
                  >
                    {REGISTRY_SECTORS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className={labelClass} htmlFor="reg-link">
                  Website or deck link{" "}
                  <span className="font-normal text-muted">(optional)</span>
                </label>
                <input
                  id="reg-link"
                  type="url"
                  className={fieldClass}
                  placeholder="https://"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                />
              </div>

              <div>
                <label className={labelClass} htmlFor="reg-referral">
                  Refer another founder{" "}
                  <span className="font-normal text-muted">(optional)</span>
                </label>
                <input
                  id="reg-referral"
                  className={fieldClass}
                  placeholder="Name or IITD email"
                  value={referral}
                  onChange={(e) => setReferral(e.target.value)}
                />
              </div>

              {error ? <p className="text-sm text-destructive">{error}</p> : null}

              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
                <p className="text-xs text-muted">
                  Submissions are private to the SInC team.
                </p>
                <button type="submit" className={primaryBtn} disabled={submitting}>
                  {submitting ? "Saving…" : "Submit listing"}
                </button>
              </div>
            </form>
          ) : (
            <div className="border border-border px-5 py-8 sm:px-8">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-teal" />
                <div>
                  <h2 className="text-xl font-semibold tracking-tight text-foreground">
                    Listed as entry №{String(entry.id).padStart(3, "0")}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {entry.venture} is saved. The SInC team reviews listings from the
                    internal registry — nothing is published publicly.
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-foreground">
                    {mailed
                      ? deepSaved
                        ? `Updated confirmation with your full profile sent to ${entry.email}.`
                        : `Confirmation sent to ${entry.email} with your listing details.`
                      : `We couldn't send email just now. Keep this page as your record, or write to sinc@iitd.ac.in.`}
                  </p>
                  <dl className="mt-5 space-y-2 text-sm">
                    {(
                      [
                        ["Venture", entry.venture],
                        ["Pitch", entry.pitch],
                        ["Stage", entry.stage],
                        ["Sector", entry.sector],
                        entry.link ? ["Link", entry.link] : null,
                        entry.referral ? ["Referral", entry.referral] : null,
                      ] as ([string, string] | null)[]
                    )
                      .filter((row): row is [string, string] => Boolean(row))
                      .map(([label, value]) => (
                        <div key={label}>
                          <dt className="text-xs text-muted">{label}</dt>
                          <dd className="text-foreground">{value}</dd>
                        </div>
                      ))}
                  </dl>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                {!showDeep && !deepSaved ? (
                  <button
                    type="button"
                    className={primaryBtn}
                    onClick={() => setShowDeep(true)}
                  >
                    Add full profile
                  </button>
                ) : null}
                <Link href="/apply" className={secondaryBtn}>
                  Apply to Cohort
                </Link>
              </div>

              {showDeep && !deepSaved ? (
                <div className="mt-8 space-y-5 border-t border-border pt-6">
                  <p className="text-sm text-muted">
                    Optional detail for mentors — problem, solution, funds, deck,
                    revenue, and next 6–12 months. We email you a copy when you save.
                  </p>
                  {(
                    [
                      ["problem", "What problem are you solving?", true],
                      ["solution", "What's your proposed solution?", true],
                      ["funds", "Funds raised (₹, optional)", false],
                      ["deck", "Pitch deck or demo link", false],
                      ["revenue", "Revenue / customers", false],
                      ["future", "Plans for the next 6–12 months", true],
                    ] as const
                  ).map(([key, label, multiline]) => (
                    <div key={key}>
                      <label className={labelClass} htmlFor={`deep-${key}`}>
                        {label}
                      </label>
                      {multiline ? (
                        <textarea
                          id={`deep-${key}`}
                          className={areaClass}
                          value={deep[key]}
                          onChange={(e) =>
                            setDeep((d) => ({ ...d, [key]: e.target.value }))
                          }
                        />
                      ) : (
                        <input
                          id={`deep-${key}`}
                          className={fieldClass}
                          value={deep[key]}
                          onChange={(e) =>
                            setDeep((d) => ({ ...d, [key]: e.target.value }))
                          }
                        />
                      )}
                    </div>
                  ))}
                  {error ? <p className="text-sm text-destructive">{error}</p> : null}
                  <button
                    type="button"
                    className={primaryBtn}
                    disabled={submitting}
                    onClick={saveDeep}
                  >
                    {submitting ? "Saving…" : "Save full profile"}
                  </button>
                </div>
              ) : null}

              {deepSaved ? (
                <p className="mt-6 text-sm text-foreground">Full profile saved.</p>
              ) : null}
            </div>
          )}
        </div>
      )}

      {tab === "registry" && (
        <div className="pt-8">
          {!unlocked ? (
            <div className="max-w-sm space-y-4 border border-border px-5 py-8">
              <div className="flex items-center gap-2 text-foreground">
                <Lock className="h-4 w-4 text-muted" />
                <h2 className="text-base font-semibold">Coordinator access</h2>
              </div>
              <p className="text-sm text-muted">Enter the passcode to view submissions.</p>
              <div>
                <label className={labelClass} htmlFor="reg-pass">
                  Passcode
                </label>
                <input
                  id="reg-pass"
                  type="password"
                  className={fieldClass}
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && unlockRegistry()}
                />
              </div>
              <button
                type="button"
                className={primaryBtn}
                disabled={loadingList}
                onClick={unlockRegistry}
              >
                {loadingList ? "Unlocking…" : "Unlock"}
              </button>
              {gateError ? (
                <p className="text-sm text-destructive">Wrong passcode — try again.</p>
              ) : null}
            </div>
          ) : entries.length === 0 ? (
            <p className="border border-border px-5 py-10 text-center text-sm text-muted">
              No submissions yet.
            </p>
          ) : (
            <ul className="divide-y divide-border border border-border">
              {[...entries].reverse().map((e) => (
                <li key={e.id} className="px-5 py-4">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="text-base font-semibold text-foreground">{e.venture}</h3>
                    <span className="shrink-0 font-mono text-[11px] text-muted">
                      №{String(e.id).padStart(3, "0")}
                    </span>
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{e.pitch}</p>
                  <p className="mt-2 text-xs text-muted">
                    {e.stage} · {e.sector}
                    {e.deep ? " · Full profile" : ""}
                  </p>
                  <p className="mt-1 font-mono text-[11px] text-muted">
                    {e.name} · {e.email}
                    {e.link ? ` · ${e.link}` : ""}
                    {e.referral ? ` · Referred: ${e.referral}` : ""}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <p className="mt-10 text-center text-xs text-muted">
        Questions?{" "}
        <Link href="/contact" className="underline underline-offset-2">
          Contact
        </Link>
      </p>
    </div>
  );
}
