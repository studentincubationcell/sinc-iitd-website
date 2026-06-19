import type { Metadata } from "next";
import { Mail, Phone, MapPin } from "lucide-react";
import { PageHeader } from "@/components/sections/cta-page-header";
import { ContactForm } from "@/components/forms/contact-form";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { site } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with SInC — Student Incubation Cell, IIT Delhi.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        variant="club"
        badge="Contact"
        title="Get in touch"
        description="Questions, partnerships, or just want to say hi — we'd love to hear from you."
      />
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
