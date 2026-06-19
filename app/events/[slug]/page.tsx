import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Calendar, ExternalLink } from "lucide-react";
import { getEvent, events } from "@/lib/data";
import { PageHeader } from "@/components/sections/cta-page-header";
import { Button } from "@/components/ui/button";
import { ClubEmptyState } from "@/components/ui/club-empty-state";
import { Reveal } from "@/components/motion/reveal";

type Props = { params: Promise<{ slug: string }> };

const categoryLabels = {
  workshop: "Workshop",
  hackathon: "Hackathon",
  networking: "Networking",
  other: "Event",
} as const;

export async function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = getEvent(slug);
  if (!event) return { title: "Event not found" };

  return {
    title: event.title,
    description: event.description,
    openGraph: {
      title: event.title,
      description: event.description,
      type: "article",
    },
  };
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;
  const event = getEvent(slug);
  if (!event) notFound();

  const formattedDate = new Date(event.date).toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <article>
      <PageHeader
        variant="club"
        narrow
        backHref="/events"
        backLabel="Back to events"
        badge={categoryLabels[event.category]}
        title={event.title}
      >
        <Reveal className="mt-6 flex items-center gap-2 text-white/60">
          <Calendar className="h-4 w-4 text-club-gold" />
          <time dateTime={event.date}>{formattedDate}</time>
        </Reveal>
      </PageHeader>

      <section className="py-12 pb-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {event.description.trim() ? (
            <Reveal>
              <p className="text-lg leading-relaxed text-muted">{event.description}</p>
              {event.registrationUrl && (
                <a
                  href={event.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-block"
                >
                  <Button size="lg" className="gap-2">
                    Register now <ExternalLink className="h-4 w-4" />
                  </Button>
                </a>
              )}
            </Reveal>
          ) : (
            <ClubEmptyState
              icon={Calendar}
              title="Details coming soon"
              description="We're still finalizing the details for this event. Check back shortly or follow SInC on social media for updates."
              hint={`Add a description in data/events.json for "${event.title}".`}
              action={{ href: "/contact", label: "Get notified", variant: "outline" }}
            />
          )}
        </div>
      </section>
    </article>
  );
}
