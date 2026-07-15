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
    <footer data-site-footer className="theme-inverse border-t border-border bg-background text-foreground">
      <div className="mx-auto max-w-[90rem] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-12 border-b border-border pb-14 lg:grid-cols-[1.4fr_2fr]">
          <div className="max-w-xl">
            <Link href="/" className="inline-flex items-center gap-3" aria-label="SInC home">
              <Image src="/logo.png" alt="" width={44} height={44} />
              <span><span className="block font-display text-2xl font-extrabold">SInC</span><span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">IIT Delhi</span></span>
            </Link>
            <h2 className="mt-8 text-balance font-display text-3xl font-semibold leading-tight sm:text-4xl">The campus is full of ideas. Let&apos;s help the right ones move.</h2>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted sm:text-base">Discover people to build with, rooms to learn in, and pathways that turn early ambition into real momentum.</p>
            <Link href="/apply" className="mt-8 inline-flex min-h-12 items-center bg-accent px-6 text-sm font-bold text-on-accent transition-colors hover:bg-foreground">Find your way in <ArrowUpRight className="ml-2 h-4 w-4" /></Link>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {directories.map((directory) => (
              <div key={directory.title}>
                <h3 className="mono-label mb-5 text-foreground">{directory.title}</h3>
                <ul className="flex flex-col gap-3">
                  {directory.links.map(([label, href]) => <li key={href}><Link href={href} className="text-sm text-muted transition-colors hover:text-foreground">{label}</Link></li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-8 border-b border-border py-10 md:grid-cols-2">
          <a href={`mailto:${site.contact.email}`} className="group flex items-start gap-3 text-sm text-muted hover:text-foreground"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" /><span><span className="mb-1 block font-mono text-[10px] uppercase tracking-widest">Write to us</span>{site.contact.email}</span></a>
          <div className="flex items-start gap-3 text-sm text-muted"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" /><span><span className="mb-1 block font-mono text-[10px] uppercase tracking-widest">Find us</span>{site.contact.address}</span></div>
        </div>

        <div className="flex flex-col gap-5 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted">© {new Date().getFullYear()} Student Incubation Cell, IIT Delhi</p>
          <div className="flex gap-2">
            {site.socials.map((social) => <a key={social.name} href={social.href} target="_blank" rel="noreferrer" aria-label={social.label} className="flex h-10 w-10 items-center justify-center border border-border text-muted transition-colors hover:border-accent hover:bg-accent hover:text-on-accent">{socialIcons[social.name]}</a>)}
          </div>
        </div>
      </div>
    </footer>
  );
}
