import Link from "next/link";
import { Calendar, ArrowRight, Sparkles } from "lucide-react";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { SiteEvent } from "@/lib/schemas";

const categoryLabels: Record<SiteEvent["category"], string> = {
  workshop: "Workshop",
  hackathon: "Hackathon",
  networking: "Networking",
  other: "Event",
};

const marqueeItems = [
  "Pitch Nights",
  "Founder Dinners",
  "Demo Days",
  "Hackathons",
  "Mentor Hours",
  "Funding Frenzy",
  "Startup 101",
  "Legal Clinics",
  "Investor Connect",
  "Ideation Sprints",
];

export function EventsMarquee() {
  const items = [...marqueeItems, ...marqueeItems];

  return (
    <section className="section-padding overflow-hidden bg-background border-y border-border">
      <SectionHeading
        label="Community"
        title="Events that build founders."
        align="center"
        className="mb-10 px-4"
      />
      <div className="relative flex overflow-hidden">
        <div className="animate-marquee flex gap-3 whitespace-nowrap">
          {items.map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="inline-flex items-center gap-2 framer-card px-5 py-2.5 text-sm font-medium"
            >
              <Sparkles className="h-4 w-4 text-primary" />
              {item}
            </span>
          ))}
        </div>
      </div>
      <Reveal className="text-center mt-8">
        <Link href="/events">
          <Button variant="outline" className="gap-2 rounded-full bg-card">
            View Events <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </Reveal>
    </section>
  );
}

export function EventsGrid({
  events,
  showEmpty = true,
}: {
  events: SiteEvent[];
  showEmpty?: boolean;
}) {
  if (events.length === 0 && showEmpty) {
    return (
      <div className="framer-card border-dashed p-16 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 mb-6">
          <Calendar className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-xl font-semibold mb-2">No events yet</h3>
        <p className="text-muted max-w-md mx-auto mb-6">
          We&apos;re planning something exciting. Check back soon or follow us on
          social media for updates.
        </p>
        <Link href="/contact">
          <Button variant="outline">Get notified</Button>
        </Link>
      </div>
    );
  }

  return (
    <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <StaggerItem key={event.slug}>
          <Link href={`/events/${event.slug}`} className="group block h-full">
            <article className="framer-card h-full overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-framer-hover)]">
              <div className="h-40 bg-gradient-to-br from-primary/20 via-purple/10 to-accent/20 relative">
                <Badge variant="default" className="absolute top-4 left-4">
                  {categoryLabels[event.category]}
                </Badge>
              </div>
              <div className="p-6">
                <time className="text-xs font-medium text-primary">
                  {new Date(event.date).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </time>
                <h3 className="mt-2 text-lg font-semibold group-hover:text-primary transition-colors">
                  {event.title}
                </h3>
                <p className="mt-2 text-sm text-muted line-clamp-2">
                  {event.description}
                </p>
              </div>
            </article>
          </Link>
        </StaggerItem>
      ))}
    </StaggerContainer>
  );
}
