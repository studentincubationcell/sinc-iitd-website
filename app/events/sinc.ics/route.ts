import { events } from "@/lib/data";

export const dynamic = "force-static";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

// All-day date in ICS basic format: YYYYMMDD
function icsDate(dateStr: string) {
  const d = new Date(dateStr);
  return `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}`;
}

function icsDateNextDay(dateStr: string) {
  const d = new Date(dateStr);
  d.setUTCDate(d.getUTCDate() + 1);
  return `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}`;
}

function escapeText(text: string) {
  return text
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\n/g, "\\n");
}

export function GET() {
  const stamp = "20260101T000000Z";

  const vevents = events
    .map((e) => {
      const lines = [
        "BEGIN:VEVENT",
        `UID:${e.slug}@sinc.iitd.ac.in`,
        `DTSTAMP:${stamp}`,
        `DTSTART;VALUE=DATE:${icsDate(e.date)}`,
        `DTEND;VALUE=DATE:${icsDateNextDay(e.date)}`,
        `SUMMARY:${escapeText(e.cohortOnly ? `[Cohort] ${e.title}` : e.title)}`,
        `DESCRIPTION:${escapeText(e.description)}`,
        "END:VEVENT",
      ];
      return lines.join("\r\n");
    })
    .join("\r\n");

  const body = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//SInC IIT Delhi//Calendar//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "X-WR-CALNAME:SInC IIT Delhi",
    "X-WR-TIMEZONE:Asia/Kolkata",
    vevents,
    "END:VCALENDAR",
  ].join("\r\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'attachment; filename="sinc-iitd.ics"',
    },
  });
}
