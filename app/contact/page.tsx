import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Phone, MapPin, GraduationCap, TrendingUp, Handshake } from "lucide-react";
import { PageHeader } from "@/components/sections/cta-page-header";
import { ContactForm } from "@/components/forms/contact-form";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { site } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with SInC — Student Incubation Cell, IIT Delhi.",
};

const STAKEHOLDER_PATHS = [
  {
    icon: GraduationCap,
    title: "Join as a founder",
    description: "Current IIT Delhi student with a startup idea? Apply to Cohort 1.0 or explore SInC programs.",
    href: "/apply",
    cta: "Apply now",
    accent: "bg-accent-lime",
  },
  {
    icon: TrendingUp,
    title: "Alumni & investors",
    description: "Mentor founders, attend Demo Day, or scout IIT Delhi deals. We'll set up the right intro.",
    href: `mailto:${site.contact.email}?subject=SInC%20—%20Investor%20/%20Alumni%20interest`,
    cta: "Email us",
    accent: "bg-pop-pink",
  },
  {
    icon: Handshake,
    title: "Industry partners",
    description: "Host an industrial visit, post bounties for students, or collaborate on campus programs.",
    href: `mailto:${site.contact.email}?subject=SInC%20—%20Partnership%20inquiry`,
    cta: "Partner with us",
    accent: "bg-pop-sky",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        variant="club"
        badge="Contact"
        title="Get in touch"
        description="Questions, partnerships, or just want to say hi — we'd love to hear from you."
      />

      <section className="section-padding border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="How to connect"
            title="Pick your path"
            description="Whether you're a founder, alumni, investor, or industry partner — here's how to reach SInC."
            className="mb-10"
          />
          <div className="grid md:grid-cols-3 gap-6">
            {STAKEHOLDER_PATHS.map((path) => {
              const Icon = path.icon;
              const isExternal = path.href.startsWith("mailto:");
              return (
                <Reveal key={path.title}>
                  <div className="framer-card p-6 h-full flex flex-col bg-card">
                    <span className={`flex h-10 w-10 items-center justify-center border-2 border-border-ink ${path.accent}`}>
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 font-black tracking-tight">{path.title}</h3>
                    <p className="mt-2 text-sm text-muted leading-relaxed flex-1">{path.description}</p>
                    <Link
                      href={path.href}
                      {...(isExternal ? {} : {})}
                      className="mt-4 font-mono text-xs font-bold uppercase tracking-wide hover:text-primary transition-colors"
                    >
                      {path.cta} →
                    </Link>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-4">
              <Reveal>
                <div className="framer-card p-6 flex gap-4 bg-card">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center border-2 border-border-ink bg-accent-lime">
                    <Mail className="h-5 w-5 text-foreground" />
                  </span>
                  <div>
                    <h3 className="font-black tracking-tight">Email</h3>
                    <a
                      href={`mailto:${site.contact.email}`}
                      className="text-muted hover:text-foreground transition-colors"
                    >
                      {site.contact.email}
                    </a>
                  </div>
                </div>
              </Reveal>
              <Reveal>
                <div className="framer-card p-6 flex gap-4 bg-card">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center border-2 border-border-ink bg-pop-pink">
                    <Phone className="h-5 w-5 text-foreground" />
                  </span>
                  <div>
                    <h3 className="font-black tracking-tight">Phone</h3>
                    <p className="text-muted">{site.contact.phone}</p>
                  </div>
                </div>
              </Reveal>
              <Reveal>
                <div className="framer-card p-6 flex gap-4 bg-card">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center border-2 border-border-ink bg-pop-sky">
                    <MapPin className="h-5 w-5 text-foreground" />
                  </span>
                  <div>
                    <h3 className="font-black tracking-tight">Office</h3>
                    <p className="text-muted text-sm leading-relaxed">
                      {site.contact.address}
                    </p>
                  </div>
                </div>
              </Reveal>
              <Reveal className="brutal-block overflow-hidden h-64 p-0">
                <iframe
                  src={site.contact.mapEmbed}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="SInC office location"
                />
              </Reveal>
            </div>
            <Reveal>
              <div className="framer-card p-8 sm:p-10">
                <SectionHeading
                  label="Message"
                  title="Send a note"
                  description="Questions, partnerships, or just want to say hi — we'd love to hear from you."
                  className="mb-8"
                />
                <ContactForm />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
