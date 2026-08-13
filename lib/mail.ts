import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";

let transporter: Transporter | null | undefined;

export function isSmtpConfigured(): boolean {
  return Boolean(
    process.env.SMTP_HOST &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS
  );
}

export function siteUrl(): string {
  const explicit = process.env.SITE_URL?.replace(/\/$/, "");
  if (explicit) return explicit;
  const prod = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (prod) return `https://${prod}`;
  const vercel = process.env.VERCEL_URL;
  if (vercel) return `https://${vercel}`;
  return "https://www.sinciitd.in";
}

function getTransporter(): Transporter | null {
  if (!isSmtpConfigured()) return null;
  if (transporter !== undefined) return transporter;

  const port = Number(process.env.SMTP_PORT || 587);
  const secure =
    process.env.SMTP_SECURE === "true" ||
    process.env.SMTP_SECURE === "1" ||
    port === 465;

  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    connectionTimeout: 8_000,
    greetingTimeout: 8_000,
    socketTimeout: 8_000,
  });

  return transporter;
}

export async function sendMail(opts: {
  to: string;
  subject: string;
  text: string;
  html: string;
  bcc?: string;
}): Promise<boolean> {
  const tx = getTransporter();
  if (!tx) {
    console.warn("SMTP not configured — skipping email to", opts.to);
    return false;
  }

  const from =
    process.env.SMTP_FROM ||
    `"SInC IIT Delhi" <${process.env.SMTP_USER}>`;

  try {
    await tx.sendMail({
      from,
      to: opts.to,
      bcc: opts.bcc || process.env.REGISTRY_NOTIFY_EMAIL || undefined,
      subject: opts.subject,
      text: opts.text,
      html: opts.html,
    });
    return true;
  } catch (err) {
    console.error("SMTP send failed", err);
    return false;
  }
}
