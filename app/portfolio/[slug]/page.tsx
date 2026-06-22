import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Rocket } from "lucide-react";
import { getStartup, startups } from "@/lib/data";
import { PageHeader } from "@/components/sections/cta-page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ClubEmptyState } from "@/components/ui/club-empty-state";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return startups.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const startup = getStartup(slug);
  if (!startup) return { title: "Startup not found" };

  return {
    title: startup.name,
    description: startup.tagline,
    openGraph: {
      title: startup.name,
      description: startup.tagline,
      type: "article",
    },
  };
}

export default async function StartupDetailPage({ params }: Props) {
  const { slug } = await params;
  const startup = getStartup(slug);
  if (!startup) notFound();

  const hasRichContent = Boolean(startup.idea || startup.founderBio);
  const valuation = startup.valuation ?? "Undisclosed";

  return (
    <article>
      <PageHeader
        variant="club"
        narrow
        backHref="/portfolio"
        backLabel="Back to portfolio"
        badge={startup.sector}
        title={startup.name}
        description={startup.tagline}
      >
        <Reveal className="mt-4 flex flex-wrap gap-2">
          <Badge variant="dark">Founder: {startup.founder}</Badge>
          <Badge variant="outline">Valuation: {valuation}</Badge>
        </Reveal>
      </PageHeader>

      <section className="py-12 pb-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-10">
          {startup.logo && (
            <Reveal>
              <Image
                src={startup.logo}
                alt={`${startup.name} logo`}
                width={80}
                height={80}
                className="border-2 border-border-ink"
              />
            </Reveal>
          )}

          {startup.founderBio && (
            <Reveal>
              <SectionHeading label="Founder" title={startup.founder} className="mb-4" />
              <p className="text-muted leading-relaxed">{startup.founderBio}</p>
              {startup.founderLinkedin && (
                <a
                  href={startup.founderLinkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold hover:text-primary transition-colors"
                >
                  LinkedIn →
                </a>
              )}
            </Reveal>
          )}

          {startup.idea && (
            <Reveal>
              <SectionHeading label="The idea" title="What they're building" className="mb-4" />
              <p className="text-lg leading-relaxed text-muted">{startup.idea}</p>
            </Reveal>
          )}

          {startup.website ? (
            <Reveal>
              <a
                href={startup.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Button className="gap-2">
                  Visit website <ExternalLink className="h-4 w-4" />
                </Button>
              </a>
            </Reveal>
          ) : hasRichContent ? (
            <ClubEmptyState
              icon={Rocket}
              title="Website coming soon"
              description={`${startup.name} is building in public. Their website will be linked here once it's live.`}
              action={{ href: "/portfolio", label: "Browse portfolio", variant: "outline" }}
            />
          ) : (
            <ClubEmptyState
              icon={Rocket}
              title="Profile in progress"
              description="This startup profile is still being set up. Check back soon for more details."
              action={{ href: "/apply", label: "Apply to SInC" }}
            />
          )}

          <Reveal className="pt-4 border-t border-border">
            <Link href="/cohort" className="text-sm text-muted hover:text-foreground transition-colors">
              Building something similar? See Cohort 1.0 →
            </Link>
          </Reveal>
        </div>
      </section>
    </article>
  );
}
