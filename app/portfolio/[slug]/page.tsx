import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { getStartup, startups } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return startups.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const startup = getStartup(slug);
  if (!startup) return { title: "Startup not found" };
  return { title: startup.name, description: startup.tagline };
}

export default async function StartupDetailPage({ params }: Props) {
  const { slug } = await params;
  const startup = getStartup(slug);
  if (!startup) notFound();

  return (
    <article>
      <section className="pt-32 pb-12 mesh-bg">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-primary mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to portfolio
          </Link>
          <Reveal>
            <Badge variant="outline">{startup.sector}</Badge>
            <h1 className="mt-4 text-4xl sm:text-5xl font-bold">{startup.name}</h1>
            <p className="mt-4 text-xl text-muted">{startup.tagline}</p>
            <p className="mt-4 text-sm text-muted">Founder: {startup.founder}</p>
          </Reveal>
        </div>
      </section>
      <section className="py-12 pb-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {startup.website && (
            <Reveal>
              <a
                href={startup.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="gap-2">
                  Visit website <ExternalLink className="h-4 w-4" />
                </Button>
              </a>
            </Reveal>
          )}
        </div>
      </section>
    </article>
  );
}
