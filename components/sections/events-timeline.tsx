import Link from "next/link";
import { ArrowUpRight, Calendar } from "lucide-react";
import { StaggerContainer, StaggerItem } from "@/components/motion/reveal";
import { ClubEmptyState } from "@/components/ui/club-empty-state";
import { EVENT_CATEGORY_LABELS, type SiteEvent } from "@/lib/schemas";

function getCategoryLabel(category: string) {
  return (
    EVENT_CATEGORY_LABELS[category as keyof typeof EVENT_CATEGORY_LABELS] ??
    "Event"
  );
}

export function EventsTimeline({
  events,
  showEmpty = true,
  emptyReason = "all",
}: {
  events: SiteEvent[];
  showEmpty?: boolean;
  emptyReason?: "all" | "filtered";
}) {
  if (events.length === 0 && showEmpty) {
    return (
      <ClubEmptyState
        icon={Calendar}
        title={emptyReason === "filtered" ? "No events in this category" : "No events yet"}
        description={
          emptyReason === "filtered"
            ? "Try another filter or check back soon."
            : "Workshops, hackathons, and founder meetups coming soon. Follow SInC on socials."
        }
        hint={emptyReason === "all" ? "Add events in data/events.json" : undefined}
        action={{ href: "/contact", label: "Get notified", variant: "outline" }}
      />
    );
  }

  return (
    <div className="relative max-w-4xl mx-auto py-8">
      {/* Central brutalist timeline rule */}
      <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1.5 bg-border-ink -translate-x-1/2" />

      <StaggerContainer className="flex flex-col gap-12">
        {events.map((event, i) => {
          const isEven = i % 2 === 0;
          const catLabel = getCategoryLabel(event.category);
          
          return (
            <StaggerItem key={event.slug} className="relative flex items-center md:justify-between w-full">
              
              {/* Desktop alternating spacer */}
              <div className={`hidden md:block w-[45%] ${isEven ? 'order-1' : 'order-3'}`} />
              
              {/* Timeline marker point */}
              <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-6 h-6 border-[3px] border-border-ink bg-accent-lime z-10 rounded-none group-hover:scale-125 transition-transform" />

              {/* Event Card */}
              <div className={`w-full pl-20 md:pl-0 md:w-[45%] ${isEven ? 'md:order-3 md:text-left' : 'md:order-1 md:text-right'}`}>
                <Link href={`/events/${event.slug}`} className="block group">
                  <article className={`relative p-6 border-[3px] border-border-ink bg-card transition-[transform,box-shadow,background-color] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[7px_7px_0_0_var(--shadow-color)] hover:bg-accent-tint group`}>
                    
                    <div className={`flex flex-col gap-3 mb-4 ${isEven ? 'items-start' : 'md:items-end items-start'}`}>
                      <div className="flex flex-wrap gap-2">
                        <span className="inline-flex items-center border-2 border-border-ink bg-brand-teal px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-on-accent transition-colors group-hover:bg-accent-lime">
                          {catLabel}
                        </span>
                        {event.cohortOnly && (
                          <span className="inline-flex border-2 border-border-ink bg-pop-pink px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider">
                            Cohort 1.0
                          </span>
                        )}
                      </div>
                      <time className="font-mono text-sm font-bold text-muted transition-colors group-hover:text-brand-blue">
                        {new Date(event.date).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric" })}
                      </time>
                    </div>

                    <h3 className="text-xl font-black leading-snug tracking-tight text-foreground transition-colors  flex items-start gap-2 justify-between">
                      {event.title}
                      <ArrowUpRight className="h-5 w-5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-accent-lime" />
                    </h3>
                    
                    <p className="mt-3 text-sm leading-relaxed text-muted line-clamp-3 transition-colors group-hover:text-foreground/80">
                      {event.description}
                    </p>
                    
                    {event.recurring && (
                      <p className="mt-4 font-mono text-[11px] font-semibold uppercase tracking-wide text-foreground/50 transition-colors group-hover:text-foreground/60 border-t-2 border-dashed border-border-ink/20 group-hover:border-border-ink/30 pt-3">
                        ↻ {event.recurring}
                      </p>
                    )}
                  </article>
                </Link>
              </div>

            </StaggerItem>
          );
        })}
      </StaggerContainer>
    </div>
  );
}
