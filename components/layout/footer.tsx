import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { FacebookIcon, InstagramIcon, LinkedInIcon } from "@/components/icons/social";
import { site } from "@/lib/data";

const socialIcons: Record<string, React.ReactNode> = {
  linkedin: <LinkedInIcon className="h-4 w-4" />,
  instagram: <InstagramIcon className="h-4 w-4" />,
  facebook: <FacebookIcon className="h-4 w-4" />,
};

const directories = [
  { title: "Discover", links: [["Events", "/events"], ["Portfolio", "/portfolio"], ["Resources", "/resources"]] },
  { title: "Participate", links: [["Programs", "/programs"], ["Opportunities", "/opportunities"], ["Cohort 01", "/cohort"], ["Apply", "/apply"]] },
  { title: "SInC", links: [["Network", "/network"], ["About", "/about"], ["Team", "/team"], ["Contact", "/contact"]] },
] as const;

export function Footer() {
  return (
    <footer
      data-site-footer
      className="relative overflow-hidden"
      style={{ background: "var(--inverse)", color: "var(--inverse-foreground)" }}
    >
      <div className="relative mx-auto max-w-[96rem] px-5 pt-20 sm:px-8 lg:px-12 lg:pt-28">
        {/* Top row — invitation + directory columns */}
        <div className="grid gap-14 pb-16 lg:grid-cols-[1.3fr_2fr] lg:pb-20">
          <div className="max-w-xl">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em]" style={{ color: "var(--club-gold)" }}>
              Student Incubation Cell — IIT Delhi
            </p>
            <h2 className="mega-display mt-6 text-balance text-4xl sm:text-5xl">
              The campus is full of ideas. Let&apos;s help the right ones move.
            </h2>
            <Link href="/apply" className="pill-cta pill-cta-inverse mt-10">
              Find your way in <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:justify-items-end">
            {directories.map((directory) => (
              <div key={directory.title}>
                <h3 className="mb-5 font-mono text-[10px] font-semibold uppercase tracking-[0.22em]" style={{ color: "var(--inverse-muted)" }}>
                  {directory.title}
                </h3>
                <ul className="flex flex-col gap-3">
                  {directory.links.map(([label, href]) => (
                    <li key={href}>
                      <Link
                        href={href}
                        className="text-sm transition-opacity hover:opacity-70"
                        style={{ color: "var(--inverse-foreground)" }}
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Contact strip */}
        <div
          className="grid gap-8 border-t py-10 md:grid-cols-2"
          style={{ borderColor: "var(--grid-on-inverse)" }}
        >
          <a href={`mailto:${site.contact.email}`} className="group flex items-start gap-3 text-sm transition-opacity hover:opacity-70" style={{ color: "var(--inverse-muted)" }}>
            <Mail className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "var(--club-gold)" }} />
            <span>
              <span className="mb-1 block font-mono text-[10px] uppercase tracking-widest">Write to us</span>
              <span style={{ color: "var(--inverse-foreground)" }}>{site.contact.email}</span>
            </span>
          </a>
          <div className="flex items-start gap-3 text-sm" style={{ color: "var(--inverse-muted)" }}>
            <MapPin className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "var(--club-gold)" }} />
            <span>
              <span className="mb-1 block font-mono text-[10px] uppercase tracking-widest">Find us</span>
              <span style={{ color: "var(--inverse-foreground)" }}>{site.contact.address}</span>
            </span>
          </div>
        </div>

        {/* Legal + socials */}
        <div
          className="flex flex-col gap-5 border-t py-8 sm:flex-row sm:items-center sm:justify-between"
          style={{ borderColor: "var(--grid-on-inverse)" }}
        >
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="" width={28} height={28} />
            <p className="font-mono text-[10px] uppercase tracking-widest" style={{ color: "var(--inverse-muted)" }}>
              © {new Date().getFullYear()} Student Incubation Cell, IIT Delhi
            </p>
          </div>
          <div className="flex gap-2">
            {site.socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                className="flex h-10 w-10 items-center justify-center rounded-full border transition-opacity hover:opacity-70"
                style={{ borderColor: "var(--grid-on-inverse)", color: "var(--inverse-foreground)" }}
              >
                {socialIcons[social.name]}
              </a>
            ))}
          </div>
        </div>

        {/* Massive Lumena-style wordmark bleeding off the bottom */}
        <div className="relative -mb-4 overflow-hidden pt-6 lg:-mb-6" aria-hidden="true">
          <p
            className="mega-display select-none whitespace-nowrap text-center text-[19vw] leading-[0.78] tracking-[-0.05em] lg:text-[15.5rem]"
            style={{ color: "var(--grid-on-inverse)" }}
          >
            SInC
          </p>
        </div>
      </div>
    </footer>
  );
}
