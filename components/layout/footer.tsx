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
    <footer
      className="relative border-t border-white/[0.06] text-white overflow-hidden"
      style={{ background: "linear-gradient(180deg, #09051a 0%, #05020e 100%)" }}
    >
      {/* Top ambient glow */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] rounded-full opacity-12"
        style={{ background: "radial-gradient(ellipse, rgba(167,139,250,0.6) 0%, transparent 65%)", filter: "blur(60px)" }}
      />
      <div className="absolute inset-0 cross-grid pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3 group mb-5">
              <Image src="/logo.svg" alt="SInC" width={38} height={38} className="group-hover:scale-105 transition-transform" />
              <div>
                <span className="text-base font-black tracking-tight block">{site.name}</span>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 block">IIT Delhi</span>
              </div>
            </Link>
            <p className="text-sm text-white/40 leading-relaxed mb-6 max-w-xs">
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
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white/50 transition-all hover:bg-club-gold/15 hover:text-club-gold hover:border-club-gold/30"
                >
                  {SOCIAL_ICONS[s.name]}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-white/30 mb-5">Navigation</h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/50 hover:text-club-lavender transition-colors flex items-center gap-1 group"
                  >
                    {item.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/apply"
                  className="text-sm font-bold text-club-gold hover:text-club-gold-bright transition-colors flex items-center gap-1 group"
                >
                  Apply now →
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-white/30 mb-5">Contact</h4>
            <ul className="space-y-4 text-sm text-white/40">
              <li>
                <a href={`mailto:${site.contact.email}`} className="flex items-start gap-2.5 hover:text-club-lavender transition-colors">
                  <Mail className="h-4 w-4 mt-0.5 shrink-0 text-club-lavender/60" />
                  {site.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-club-lavender/60" />
                <span className="leading-relaxed">{site.contact.address}</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-white/30 mb-5">Stay in the loop</h4>
            <p className="text-sm text-white/40 mb-4 leading-relaxed">
              Grants, funding, and campus startup news — straight to your inbox.
            </p>
            <form className="flex flex-col gap-2" action="#" method="post">
              <input
                type="email"
                placeholder="you@iitd.ac.in"
                className="rounded-xl border border-white/10 bg-white/[0.05] px-4 py-2.5 text-sm text-white placeholder:text-white/25 outline-none focus:border-club-lavender/40 focus:bg-white/[0.08] transition-all"
                aria-label="Email for newsletter"
              />
              <button
                type="submit"
                className="rounded-xl bg-club-gold text-club-purple font-black text-sm py-2.5 px-4 hover:bg-club-gold-bright transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/25">
          <p>© {new Date().getFullYear()} SInC IIT Delhi. All rights reserved.</p>
          <p>Built by the SInC Tech Team</p>
        </div>
      </div>
    </footer>
  );
}
