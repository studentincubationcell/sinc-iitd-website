import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ExternalLink, Rocket } from "lucide-react";
import { getStartup, startups } from "@/lib/data";
import { PageHeader } from "@/components/sections/cta-page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ClubEmptyState } from "@/components/ui/club-empty-state";
import { Reveal } from "@/components/motion/reveal";

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

  const hasContent = Boolean(startup.website?.trim() || startup.tagline?.trim());

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
        <Reveal className="mt-4">
          <Badge variant="dark">Founder: {startup.founder}</Badge>
        </Reveal>
      </PageHeader>

      <section className="py-12 pb-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
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
          ) : hasContent ? (
            <ClubEmptyState
              icon={Rocket}
              title="Website coming soon"
              description={`${startup.name} is building in public. Their website will be linked here once it's live.`}
              hint={`Add a website URL in data/startups.json for "${startup.name}".`}
              action={{ href: "/portfolio", label: "Browse portfolio", variant: "outline" }}
            />
          ) : (
            <ClubEmptyState
              icon={Rocket}
              title="Profile in progress"
              description="This startup profile is still being set up. Check back soon for more details."
              hint={`Fill in tagline, founder, and website in data/startups.json.`}
              action={{ href: "/apply", label: "Apply to SInC" }}
            />
          )}
        </div>
      </section>
    </article>
  );
}
