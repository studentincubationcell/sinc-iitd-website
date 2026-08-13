"use client";

import { useMemo, useState } from "react";
import type { RegistryEntry } from "@/lib/schemas";
import {
  listingStatus,
  listedAt,
  padRegistryId,
  sectorLabel,
  REGISTRY_DEEP_LABELS,
} from "@/lib/registry-status";

function isHttp(value: string): boolean {
  return /^https?:\/\//i.test(value);
}

function Detail({
  label,
  value,
  href,
}: {
  label: string;
  value?: string;
  href?: string;
}) {
  if (!value) return null;
  return (
    <div>
      <dt className="text-xs text-muted">{label}</dt>
      <dd className="mt-0.5 text-sm text-foreground whitespace-pre-wrap break-words">
        {href ? (
          <a
            href={href}
            className="underline underline-offset-2"
            {...(href.startsWith("http")
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            {value}
          </a>
        ) : (
          value
        )}
      </dd>
    </div>
  );
}

function CoordinatorCard({
  entry,
  open,
  onToggle,
}: {
  entry: RegistryEntry;
  open: boolean;
  onToggle: () => void;
}) {
  const deepRows = REGISTRY_DEEP_LABELS.flatMap(({ key, label }) => {
    const value = entry.deep?.[key]?.trim();
    return value ? [{ label, value, href: isHttp(value) ? value : undefined }] : [];
  });

  return (
    <li className="border-b border-border last:border-b-0">
      <button
        type="button"
        className="flex w-full items-start justify-between gap-3 px-5 py-4 text-left"
        onClick={onToggle}
        aria-expanded={open}
      >
        <div>
          <h3 className="text-base font-semibold text-foreground">{entry.venture}</h3>
          <p className="mt-1 text-sm text-muted">
            {listingStatus(entry)} · {sectorLabel(entry)} · {entry.name}
          </p>
        </div>
        <span className="shrink-0 font-mono text-[11px] text-muted">
          №{padRegistryId(entry.id)} · {open ? "Hide" : "Open"}
        </span>
      </button>
      {open ? (
        <div className="space-y-6 border-t border-border px-5 py-5">
          <dl className="grid gap-4 sm:grid-cols-2">
            <Detail label="Status" value={listingStatus(entry)} />
            <Detail label="Listed" value={listedAt(entry.timestamp)} />
            <Detail label="Founder" value={entry.name} />
            <Detail
              label="Kerberos mail"
              value={entry.email}
              href={`mailto:${entry.email}`}
            />
            <Detail
              label="Phone"
              value={entry.phone}
              href={entry.phone ? `tel:${entry.phone}` : undefined}
            />
            <Detail
              label="WhatsApp"
              value={entry.whatsapp}
              href={
                entry.whatsapp
                  ? `https://wa.me/${entry.whatsapp.replace(/\D/g, "")}`
                  : undefined
              }
            />
            <Detail
              label="LinkedIn"
              value={entry.linkedin}
              href={
                entry.linkedin && isHttp(entry.linkedin) ? entry.linkedin : undefined
              }
            />
            <Detail label="Stage" value={entry.stage} />
            <Detail label="Sector" value={sectorLabel(entry)} />
            <Detail
              label="Website / deck"
              value={entry.link}
              href={entry.link && isHttp(entry.link) ? entry.link : undefined}
            />
            <Detail label="Referral" value={entry.referral} />
          </dl>
          <div>
            <p className="text-xs text-muted">Pitch</p>
            <p className="mt-1 text-sm leading-relaxed text-foreground">{entry.pitch}</p>
          </div>
          {deepRows.length ? (
            <div>
              <p className="text-sm font-medium text-foreground">Full profile</p>
              <dl className="mt-3 space-y-3">
                {deepRows.map((row) => (
                  <Detail
                    key={row.label}
                    label={row.label}
                    value={row.value}
                    href={row.href}
                  />
                ))}
              </dl>
            </div>
          ) : (
            <p className="text-sm text-muted">No full profile yet.</p>
          )}
        </div>
      ) : null}
    </li>
  );
}

export function RegistryCoordinatorList({ entries }: { entries: RegistryEntry[] }) {
  const ids = useMemo(() => entries.map((e) => e.id), [entries]);
  const [openIds, setOpenIds] = useState<Set<number>>(() => new Set(ids));
  const allOpen = ids.length > 0 && ids.every((id) => openIds.has(id));

  function toggle(id: number) {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="text-sm text-muted">
          {entries.length} listing{entries.length === 1 ? "" : "s"}
        </p>
        <button
          type="button"
          className="text-sm text-foreground underline underline-offset-2"
          onClick={() => setOpenIds(allOpen ? new Set() : new Set(ids))}
        >
          {allOpen ? "Collapse all" : "Open all"}
        </button>
      </div>
      <ul className="border border-border">
        {[...entries].reverse().map((e) => (
          <CoordinatorCard
            key={e.id}
            entry={e}
            open={openIds.has(e.id)}
            onToggle={() => toggle(e.id)}
          />
        ))}
      </ul>
    </div>
  );
}
