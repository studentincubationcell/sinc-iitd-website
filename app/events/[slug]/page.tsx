import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar } from "lucide-react";
import { getEvent, events } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = getEvent(slug);
  if (!event) return { title: "Event not found" };
  return { title: event.title, description: event.description };
}

const categoryLabels = {
  workshop: "Workshop",
  hackathon: "Hackathon",
  networking: "Networking",
  other: "Event",
};

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;
  const event = getEvent(slug);
  if (!event) notFound();

  return (
    <article>
      <section className="pt-32 pb-12 mesh-bg">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-primary mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to events
          </Link>
          <Reveal>
            <Badge>{categoryLabels[event.category]}</Badge>
            <h1 className="mt-4 text-4xl sm:text-5xl font-bold">{event.title}</h1>
            <div className="mt-4 flex items-center gap-2 text-muted">
              <Calendar className="h-4 w-4" />
              {new Date(event.date).toLocaleDateString("en-IN", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </div>
          </Reveal>
        </div>
      </section>
      <section className="py-12 pb-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-lg text-muted leading-relaxed">{event.description}</p>
            {event.registrationUrl && (
              <a
                href={event.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-8"
              >
                <Button size="lg">Register now</Button>
              </a>
            )}
          </Reveal>
        </div>
      </section>
    </article>
  );
}
