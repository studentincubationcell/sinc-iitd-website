import type { RegistryEntry } from "@/lib/schemas";
import { sendMail, siteUrl } from "@/lib/mail";
import { listingStatus, sectorLabel, entryLabel } from "@/lib/registry-status";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function listedAt(iso: string): string {
  try {
    return new Date(iso).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return iso;
  }
}

function manageUrl(entry: RegistryEntry, hash?: "profile"): string {
  const origin = siteUrl();
  const token = entry.manageToken;
  if (!token) return `${origin}/registry`;
  const base = `${origin}/registry/m/${token}`;
  return hash === "profile" ? `${base}#profile` : base;
}

const DEEP_LABELS: { key: keyof NonNullable<RegistryEntry["deep"]>; label: string }[] =
  [
    { key: "problem", label: "Problem" },
    { key: "solution", label: "Solution" },
    { key: "funds", label: "Funds raised" },
    { key: "deck", label: "Deck / demo" },
    { key: "revenue", label: "Revenue / customers" },
    { key: "future", label: "Next 6–12 months" },
  ];

function deepRows(entry: RegistryEntry): { label: string; value: string }[] {
  const deep = entry.deep;
  if (!deep) return [];
  return DEEP_LABELS.flatMap(({ key, label }) => {
    const value = deep[key]?.trim();
    return value ? [{ label, value }] : [];
  });
}

function listingRows(entry: RegistryEntry): { label: string; value: string }[] {
  const rows: { label: string; value: string }[] = [
    { label: "Status", value: listingStatus(entry) },
    { label: "Entry", value: entryLabel(entry.id) },
    { label: "Founder", value: entry.name },
    { label: "Kerberos mail", value: entry.email },
    { label: "Venture", value: entry.venture },
    { label: "Pitch", value: entry.pitch },
    { label: "Stage", value: entry.stage },
    { label: "Sector", value: sectorLabel(entry) },
    { label: "Listed", value: listedAt(entry.timestamp) },
  ];
  if (entry.phone) rows.push({ label: "Phone", value: entry.phone });
  if (entry.whatsapp) rows.push({ label: "WhatsApp", value: entry.whatsapp });
  if (entry.linkedin) rows.push({ label: "LinkedIn", value: entry.linkedin });
  if (entry.link) rows.push({ label: "Website / deck", value: entry.link });
  if (entry.referral) rows.push({ label: "Referral", value: entry.referral });
  return rows;
}

function textBody(entry: RegistryEntry, kind: "listing" | "profile"): string {
  const manage = manageUrl(entry);
  const profile = manageUrl(entry, "profile");
  const lines = [
    `Hello ${entry.name},`,
    "",
    kind === "profile"
      ? `Your SInC Startup Registry listing (${entryLabel(entry.id)}) now includes the full founder profile.`
      : `You're listed in the IIT Delhi SInC Startup Registry as ${entryLabel(entry.id)}.`,
    `Status: ${listingStatus(entry)}`,
    "",
    "— Listing —",
    ...listingRows(entry).map((r) => `${r.label}: ${r.value}`),
  ];

  const deep = deepRows(entry);
  if (deep.length) {
    lines.push("", "— Founder profile —", ...deep.map((r) => `${r.label}: ${r.value}`));
  }

  lines.push(
    "",
    `Manage this listing (no login — keep this link): ${manage}`
  );
  if (!deep.length) {
    lines.push(`Add a full profile (problem, solution, funds, deck, revenue, plans): ${profile}`);
  }
  lines.push(
    "",
    "This listing is private to the SInC team — it is not published on the website.",
    "Questions: studentincubationcell@gmail.com",
    "",
    "— Student Incubation Cell, IIT Delhi"
  );

  return lines.join("\n");
}

function htmlBody(entry: RegistryEntry, kind: "listing" | "profile"): string {
  const manage = manageUrl(entry);
  const profile = manageUrl(entry, "profile");
  const rowsHtml = (rows: { label: string; value: string }[]) =>
    rows
      .map(
        (r) => `<tr>
          <td style="padding:10px 12px;border-bottom:1px solid #e6e4dc;width:34%;font-size:12px;color:#5c6578;vertical-align:top;">${escapeHtml(r.label)}</td>
          <td style="padding:10px 12px;border-bottom:1px solid #e6e4dc;font-size:14px;color:#15243d;vertical-align:top;white-space:pre-wrap;">${escapeHtml(r.value)}</td>
        </tr>`
      )
      .join("");

  const deep = deepRows(entry);
  const headline =
    kind === "profile"
      ? `Full profile saved — ${entryLabel(entry.id)}`
      : `You're listed — ${entryLabel(entry.id)}`;
  const intro =
    kind === "profile"
      ? `Hi ${escapeHtml(entry.name)}, your founder profile is now attached to <strong>${escapeHtml(entry.venture)}</strong>. Status: ${escapeHtml(listingStatus(entry))}.`
      : `Hi ${escapeHtml(entry.name)}, <strong>${escapeHtml(entry.venture)}</strong> is in the IIT Delhi SInC Startup Registry. Status: ${escapeHtml(listingStatus(entry))}. Mentors review listings privately.`;

  const profileBtn = !deep.length
    ? `<a href="${escapeHtml(profile)}" style="display:inline-block;margin:0 8px 8px 0;padding:12px 18px;border:1px solid #15243d;color:#15243d;text-decoration:none;font-size:14px;font-weight:600;">Add full profile</a>`
    : "";

  return `<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f4f3ee;font-family:Georgia, 'Times New Roman', serif;">
  <div style="max-width:560px;margin:0 auto;padding:28px 16px;">
    <p style="margin:0 0 16px;font-family:ui-monospace,Menlo,Consolas,monospace;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#5c6578;">SInC · IIT Delhi</p>
    <h1 style="margin:0 0 12px;font-size:22px;line-height:1.3;color:#15243d;">${escapeHtml(headline)}</h1>
    <p style="margin:0 0 20px;font-size:15px;line-height:1.55;color:#15243d;">${intro}</p>
    <p style="margin:0 0 20px;">
      <a href="${escapeHtml(manage)}" style="display:inline-block;margin:0 8px 8px 0;padding:12px 18px;background:#15243d;color:#ffffff;text-decoration:none;font-size:14px;font-weight:600;">Manage listing</a>
      ${profileBtn}
    </p>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#fff;border:1px solid #e6e4dc;border-collapse:collapse;">
      ${rowsHtml(listingRows(entry))}
    </table>
    ${
      deep.length
        ? `<h2 style="margin:24px 0 10px;font-size:16px;color:#15243d;">Founder profile</h2>
           <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#fff;border:1px solid #e6e4dc;border-collapse:collapse;">
             ${rowsHtml(deep)}
           </table>`
        : ""
    }
    <p style="margin:20px 0 0;font-size:13px;line-height:1.55;color:#5c6578;">No login. Keep the manage link from this email, or reopen it on this browser — we’ll remember this listing. It is not public. Questions: <a href="mailto:studentincubationcell@gmail.com" style="color:#2453c4;">studentincubationcell@gmail.com</a>.</p>
  </div>
</body>
</html>`;
}

export async function sendRegistryConfirmation(
  entry: RegistryEntry,
  kind: "listing" | "profile" = "listing"
): Promise<boolean> {
  const n = entryLabel(entry.id);
  const subject =
    kind === "profile"
      ? `SInC registry — full profile on file (${n})`
      : `You're listed in the SInC Startup Registry — ${n}`;

  return sendMail({
    to: entry.email,
    subject,
    text: textBody(entry, kind),
    html: htmlBody(entry, kind),
  });
}
