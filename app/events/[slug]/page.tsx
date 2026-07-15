import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getEvent, events } from "@/lib/data";
import { EVENT_CATEGORY_LABELS } from "@/lib/schemas";
import { DetailIndexLayout, HairlineGrid } from "@/components/sections/detail-shell";
import { Reveal } from "@/components/motion/reveal";

type Props = { params: Promise<{ slug: string }> };

const categoryLabels = EVENT_CATEGORY_LABELS;

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

  /* Index = events in the same category, chronological */
  const siblings = events
    .filter((e) => e.category === event.category)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 6);

  /* Related = other upcoming events outside this category */
  const related = events
    .filter((e) => e.category !== event.category && e.description.trim())
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 4)
    .map((e) => ({
      href: `/events/${e.slug}`,
      title: e.title,
      description: e.description,
    }));

  const meta = [
    { label: "Date", value: formattedDate },
    { label: "Category", value: categoryLabels[event.category] },
    ...(event.recurring ? [{ label: "Schedule", value: event.recurring }] : []),
    ...(event.cohortOnly
      ? [{ label: "Audience", value: "Cohort 1.0 founders" }]
      : [{ label: "Audience", value: "Open to the IIT Delhi community" }]),
  ];

  return (
    <article className="pb-24 pt-36">
      <div className="mx-auto max-w-[90rem] px-5 sm:px-8 lg:px-12">
        <Link
          href="/events"
          className="mb-12 inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-muted transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to calendar
        </Link>
      </div>

      <DetailIndexLayout
        indexTitle={categoryLabels[event.category]}
        items={siblings.map((e) => ({ href: `/events/${e.slug}`, label: e.title }))}
        activeHref={`/events/${event.slug}`}
        cta={
          event.registrationUrl
            ? { href: event.registrationUrl, label: "Register now", external: true }
            : { href: "/contact", label: "Get notified" }
        }
        meta={meta}
      >
        <Reveal>
          {event.image && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={event.image}
              alt={event.title}
              className="mb-12 aspect-[16/9] w-full object-cover"
            />
          )}

          <h1 className="mega-display text-4xl text-foreground sm:text-5xl lg:text-6xl">
            {event.title}
          </h1>

          <p className="mt-8 max-w-2xl text-pretty text-2xl leading-snug tracking-[-0.01em] text-brand-blue sm:text-3xl">
            <time dateTime={event.date}>{formattedDate}</time>
          </p>

          {event.description.trim() ? (
            <div className="mt-14 max-w-2xl">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                About the event
              </p>
              <p className="mt-5 text-lg leading-relaxed text-foreground">{event.description}</p>
            </div>
          ) : (
            <div className="mt-14 max-w-2xl border-t border-border pt-6">
              <p className="text-lg leading-relaxed text-muted">
                We&apos;re still finalizing the details for this event. Check back shortly or
                follow SInC for updates.
              </p>
            </div>
          )}
        </Reveal>
      </DetailIndexLayout>

      {related.length > 0 && (
        <section className="mx-auto mt-28 max-w-[90rem] border-t border-border px-5 pt-16 sm:px-8 lg:px-12">
          <p className="mb-12 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-muted">
            Also happening
          </p>
          <HairlineGrid items={related} />
        </section>
      )}
    </article>
  );
}
