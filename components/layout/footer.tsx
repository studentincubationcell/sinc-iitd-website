import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, ArrowUpRight } from "lucide-react";
import { LinkedInIcon, InstagramIcon, FacebookIcon } from "@/components/icons/social";
import { site } from "@/lib/data";

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  linkedin:  <LinkedInIcon className="h-4 w-4" />,
  instagram: <InstagramIcon className="h-4 w-4" />,
  facebook:  <FacebookIcon className="h-4 w-4" />,
};

const FOOTER_LINKS = [
  { label: "About", href: "/about" },
  { label: "Programs", href: "/programs" },
  { label: "Events", href: "/events" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Team", href: "/team" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border-ink bg-foreground text-background">
      {/* Cross-grid overlay (light lines on ink) */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(244,243,238,1) 1px, transparent 1px), linear-gradient(90deg, rgba(244,243,238,1) 1px, transparent 1px)",
          backgroundSize: "34px 34px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3 group mb-5">
              <Image src="/logo.svg" alt="SInC" width={38} height={38} className="group-hover:scale-105 transition-transform" />
              <div>
                <span className="text-base font-black tracking-tight block">{site.name}</span>
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-background/40 block">IIT Delhi</span>
              </div>
            </Link>
            <p className="text-sm text-background/50 leading-relaxed mb-6 max-w-xs">
              Student Incubation Cell, IIT Delhi — empowering campus founders from idea to impact.
            </p>
            {/* Socials */}
            <div className="flex gap-2">
              {site.socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-none border border-background/20 text-background/60 transition-all hover:bg-accent-lime hover:text-foreground hover:border-accent-lime"
                >
                  {SOCIAL_ICONS[s.name]}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-accent-lime mb-5">Navigation</h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-background/55 hover:text-background transition-colors flex items-center gap-1 group"
                  >
                    {item.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/apply"
                  className="text-sm font-bold text-accent-lime hover:text-background transition-colors flex items-center gap-1 group"
                >
                  Apply now →
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-accent-lime mb-5">Contact</h4>
            <ul className="space-y-4 text-sm text-background/50">
              <li>
                <a href={`mailto:${site.contact.email}`} className="flex items-start gap-2.5 hover:text-background transition-colors">
                  <Mail className="h-4 w-4 mt-0.5 shrink-0 text-accent-lime" />
                  {site.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-accent-lime" />
                <span className="leading-relaxed">{site.contact.address}</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-accent-lime mb-5">Stay in the loop</h4>
            <p className="text-sm text-background/50 mb-4 leading-relaxed">
              Grants, funding, and campus startup news — straight to your inbox.
            </p>
            <form className="flex flex-col gap-2" action="#" method="post">
              <input
                type="email"
                placeholder="you@iitd.ac.in"
                className="rounded-none border border-background/20 bg-transparent px-4 py-2.5 text-sm text-background placeholder:text-background/30 outline-none focus:border-accent-lime transition-all"
                aria-label="Email for newsletter"
              />
              <button
                type="submit"
                className="rounded-none bg-accent-lime text-foreground font-bold text-sm py-2.5 px-4 hover:bg-background transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-background/10 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs uppercase tracking-wide text-background/30">
          <p>© {new Date().getFullYear()} SInC IIT Delhi. All rights reserved.</p>
          <p>Designed by Gagan Tak</p>
        </div>
      </div>
    </footer>
  );
}
