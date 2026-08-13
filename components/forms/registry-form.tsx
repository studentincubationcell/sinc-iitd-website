"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle2, Lock } from "lucide-react";
import {
  REGISTRY_SECTORS,
  REGISTRY_STAGES,
  type RegistryEntry,
} from "@/lib/schemas";
import { cn } from "@/lib/utils";
import {
  managePath,
  readCachedListing,
  writeCachedListing,
  type CachedListing,
} from "@/lib/registry-cache";
import {
  registryAreaClass,
  registryFieldClass,
  registryLabelClass,
  registryPrimaryBtn,
  registrySelectClass,
} from "@/components/forms/registry-styles";

type Tab = "apply" | "registry";

export function RegistryExperience() {
  const router = useRouter();
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
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [entry, setEntry] = useState<RegistryEntry | null>(null);
  const [mailed, setMailed] = useState(false);
  const [cached, setCached] = useState<CachedListing | null>(null);

  const [passcode, setPasscode] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [entries, setEntries] = useState<RegistryEntry[]>([]);
  const [gateError, setGateError] = useState(false);
  const [loadingList, setLoadingList] = useState(false);

  useEffect(() => {
    setCached(readCachedListing());
    try {
      const saved = window.localStorage.getItem("sinc-registry-coord");
      if (saved) setPasscode(saved);
    } catch {
      /* ignore */
    }
  }, []);

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
          phone,
          whatsapp: whatsapp || undefined,
          linkedin: linkedin || undefined,
          link: link || undefined,
          referral: referral || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not save");
      const saved = data.entry as RegistryEntry;
      setEntry(saved);
      setMailed(Boolean(data.mailed));
      if (saved.manageToken) {
        writeCachedListing({
          token: saved.manageToken,
          id: saved.id,
          venture: saved.venture,
        });
        router.push(managePath(saved.manageToken));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save");
    } finally {
      setSubmitting(false);
    }
  }

  async function unlockRegistry(code = passcode) {
    const key = code.trim();
    if (!key) {
      setGateError(true);
      return;
    }
    setLoadingList(true);
    setGateError(false);
    try {
      const res = await fetch("/api/registry", {
        headers: { "x-registry-passcode": key },
      });
      if (!res.ok) {
        setGateError(true);
        setUnlocked(false);
        return;
      }
      const data = await res.json();
      setEntries(data.entries ?? []);
      setUnlocked(true);
      setPasscode(key);
      try {
        window.localStorage.setItem("sinc-registry-coord", key);
      } catch {
        /* ignore */
      }
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
              submissions here. Nothing is published publicly.
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

      {cached && tab === "apply" && !entry ? (
        <p className="mt-6 border border-border px-4 py-3 text-sm text-foreground">
          This browser already has a listing for{" "}
          <span className="font-medium">{cached.venture}</span>
          {" · "}
          <Link
            href={managePath(cached.token)}
            className="underline underline-offset-2"
          >
            Manage listing
          </Link>
        </p>
      ) : null}

      {tab === "apply" && (
        <div className="pt-8">
          {!entry ? (
            <form onSubmit={submitQuick} className="space-y-6">
              <p className="font-mono text-xs text-muted">
                Next entry · №{String(nextId).padStart(3, "0")}
              </p>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <label className={registryLabelClass} htmlFor="reg-name">
                    Full name
                  </label>
                  <input
                    id="reg-name"
                    className={registryFieldClass}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    autoComplete="name"
                  />
                </div>
                <div className="sm:col-span-1">
                  <label className={registryLabelClass} htmlFor="reg-email">
                    IIT Delhi email
                  </label>
                  <input
                    id="reg-email"
                    type="email"
                    className={registryFieldClass}
                    placeholder="entrynumber@iitd.ac.in"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className={registryLabelClass} htmlFor="reg-phone">
                    Phone
                  </label>
                  <input
                    id="reg-phone"
                    type="tel"
                    className={registryFieldClass}
                    placeholder="+91 9XXXXXXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    autoComplete="tel"
                  />
                </div>
                <div>
                  <label className={registryLabelClass} htmlFor="reg-whatsapp">
                    WhatsApp{" "}
                    <span className="font-normal text-muted">(optional)</span>
                  </label>
                  <input
                    id="reg-whatsapp"
                    type="tel"
                    className={registryFieldClass}
                    placeholder="Same as phone if blank"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    autoComplete="tel"
                  />
                </div>
              </div>

              <div>
                <label className={registryLabelClass} htmlFor="reg-linkedin">
                  LinkedIn{" "}
                  <span className="font-normal text-muted">(optional)</span>
                </label>
                <input
                  id="reg-linkedin"
                  type="url"
                  className={registryFieldClass}
                  placeholder="https://www.linkedin.com/in/…"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                />
              </div>

              <div>
                <label className={registryLabelClass} htmlFor="reg-venture">
                  Venture name
                </label>
                <input
                  id="reg-venture"
                  className={registryFieldClass}
                  value={venture}
                  onChange={(e) => setVenture(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className={registryLabelClass} htmlFor="reg-pitch">
                  One-line pitch
                </label>
                <textarea
                  id="reg-pitch"
                  className={registryAreaClass}
                  placeholder="What you build, for whom, and why it matters."
                  value={pitch}
                  onChange={(e) => setPitch(e.target.value)}
                  required
                  minLength={10}
                />
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className={registryLabelClass} htmlFor="reg-stage">
                    Stage
                  </label>
                  <select
                    id="reg-stage"
                    className={registrySelectClass}
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
                  <label className={registryLabelClass} htmlFor="reg-sector">
                    Sector
                  </label>
                  <select
                    id="reg-sector"
                    className={registrySelectClass}
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
                <label className={registryLabelClass} htmlFor="reg-link">
                  Website or deck link{" "}
                  <span className="font-normal text-muted">(optional)</span>
                </label>
                <input
                  id="reg-link"
                  type="url"
                  className={registryFieldClass}
                  placeholder="https://"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                />
              </div>

              <div>
                <label className={registryLabelClass} htmlFor="reg-referral">
                  Refer another founder{" "}
                  <span className="font-normal text-muted">(optional)</span>
                </label>
                <input
                  id="reg-referral"
                  className={registryFieldClass}
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
                <button type="submit" className={registryPrimaryBtn} disabled={submitting}>
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
                    {entry.venture} is saved. Check your email for a manage link
                    {mailed ? ` sent to ${entry.email}` : ""}.
                  </p>
                  {entry.manageToken ? (
                    <Link
                      href={managePath(entry.manageToken)}
                      className={`${registryPrimaryBtn} mt-6`}
                    >
                      Manage listing
                    </Link>
                  ) : null}
                </div>
              </div>
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
              <p className="text-sm text-muted">
                Shared team passcode — not a personal login. Ask a SInC coordinator
                if you don&apos;t have it.
              </p>
              <div>
                <label className={registryLabelClass} htmlFor="reg-pass">
                  Passcode
                </label>
                <input
                  id="reg-pass"
                  type="password"
                  className={registryFieldClass}
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && void unlockRegistry()}
                />
              </div>
              <button
                type="button"
                className={registryPrimaryBtn}
                disabled={loadingList}
                onClick={() => void unlockRegistry()}
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
                    {e.phone ? ` · ${e.phone}` : ""}
                    {e.whatsapp ? ` · WA ${e.whatsapp}` : ""}
                    {e.linkedin ? ` · ${e.linkedin}` : ""}
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
