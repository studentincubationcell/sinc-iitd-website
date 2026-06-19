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
                <div className="framer-card p-6 flex gap-4">
                  <Mail className="h-6 w-6 text-primary shrink-0" />
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <a
                      href={`mailto:${site.contact.email}`}
                      className="text-muted hover:text-primary transition-colors"
                    >
                      {site.contact.email}
                    </a>
                  </div>
                </div>
              </Reveal>
              <Reveal>
                <div className="framer-card p-6 flex gap-4">
                  <Phone className="h-6 w-6 text-primary shrink-0" />
                  <div>
                    <h3 className="font-semibold">Phone</h3>
                    <p className="text-muted">{site.contact.phone}</p>
                  </div>
                </div>
              </Reveal>
              <Reveal>
                <div className="framer-card p-6 flex gap-4">
                  <MapPin className="h-6 w-6 text-primary shrink-0" />
                  <div>
                    <h3 className="font-semibold">Office</h3>
                    <p className="text-muted text-sm leading-relaxed">
                      {site.contact.address}
                    </p>
                  </div>
                </div>
              </Reveal>
              <Reveal className="framer-card overflow-hidden h-64 p-0">
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
