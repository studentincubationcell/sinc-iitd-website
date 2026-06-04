import Link from "next/link";
import Image from "next/image";
import { Mail } from "lucide-react";
import { LinkedInIcon, InstagramIcon, FacebookIcon } from "@/components/icons/social";
import { site } from "@/lib/data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const socialIcons: Record<string, React.ReactNode> = {
  linkedin: <LinkedInIcon className="h-5 w-5" />,
  instagram: <InstagramIcon className="h-5 w-5" />,
  facebook: <FacebookIcon className="h-5 w-5" />,
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5">
              <Image src="/logo.svg" alt="SInC" width={40} height={40} />
              <span className="text-lg font-bold">{site.name}</span>
            </Link>
            <p className="mt-4 text-sm text-muted leading-relaxed">
              {site.fullName}, IIT Delhi — empowering campus founders from idea
              to impact.
            </p>
            <div className="mt-6 flex gap-2">
              {site.socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-muted transition-all hover:bg-foreground hover:text-background hover:border-foreground"
                  aria-label={s.label}
                >
                  {socialIcons[s.name]}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-muted mb-4">
              Links
            </h4>
            <ul className="space-y-2.5">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-foreground/70 hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/apply"
                  className="text-sm text-primary font-medium hover:underline"
                >
                  Apply Now
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-muted mb-4">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-muted">
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-0.5 shrink-0" />
                <a
                  href={`mailto:${site.contact.email}`}
                  className="hover:text-foreground transition-colors"
                >
                  {site.contact.email}
                </a>
              </li>
              <li>{site.contact.phone}</li>
              <li className="leading-relaxed">{site.contact.address}</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-muted mb-4">
              Newsletter
            </h4>
            <p className="text-sm text-muted mb-4">
              Grants, funding, and campus startup news.
            </p>
            <form className="flex gap-2" action="#" method="post">
              <Input
                type="email"
                placeholder="you@iitd.ac.in"
                className="bg-background rounded-full"
                aria-label="Email for newsletter"
              />
              <Button type="submit" size="sm" className="shrink-0 rounded-full">
                Join
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between gap-4 text-sm text-muted">
          <p>&copy; {new Date().getFullYear()} SInC IIT Delhi. All rights reserved.</p>
          <p>Developed by SInC Tech Team</p>
        </div>
      </div>
    </footer>
  );
}
