import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getStartup, startups } from "@/lib/data";
import { DetailIndexLayout, HairlineGrid } from "@/components/sections/detail-shell";
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

  const valuation = startup.valuation ?? "Undisclosed";

  /* Index = the full portfolio, current venture highlighted */
  const siblings = startups.slice(0, 8);

  /* Related = other ventures, hairline grid */
  const related = startups
    .filter((s) => s.slug !== startup.slug)
    .slice(0, 4)
    .map((s) => ({
      href: `/portfolio/${s.slug}`,
      title: s.name,
      description: s.tagline,
    }));

  const meta = [
    { label: "Sector", value: startup.sector },
    { label: "Founder", value: startup.founder },
    { label: "Stage", value: valuation },
  ];

  return (
    <article className="pb-24 pt-36">
      <div className="mx-auto max-w-[90rem] px-5 sm:px-8 lg:px-12">
        <Link
          href="/portfolio"
          className="mb-12 inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-muted transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to portfolio
        </Link>
      </div>

      <DetailIndexLayout
        indexTitle="The Portfolio"
        items={siblings.map((s) => ({ href: `/portfolio/${s.slug}`, label: s.name }))}
        activeHref={`/portfolio/${startup.slug}`}
        cta={
          startup.website
            ? { href: startup.website, label: "Visit website", external: true }
            : { href: "/apply", label: "Apply to SInC" }
        }
        meta={meta}
      >
        <Reveal>
          {startup.logo && (
            <Image
              src={startup.logo}
              alt={`${startup.name} logo`}
              width={72}
              height={72}
              className="mb-10"
            />
          )}

          <h1 className="mega-display text-4xl text-foreground sm:text-5xl lg:text-6xl">
            {startup.name}
          </h1>

          <p className="mt-8 max-w-2xl text-pretty text-2xl leading-snug tracking-[-0.01em] text-brand-blue sm:text-3xl">
            {startup.tagline}
          </p>

          {startup.idea && (
            <div className="mt-14 max-w-2xl">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                What they&apos;re building
              </p>
              <p className="mt-5 text-lg leading-relaxed text-foreground">{startup.idea}</p>
            </div>
          )}

          {startup.founderBio && (
            <div className="mt-12 max-w-2xl border-t border-border pt-8">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                Founder — {startup.founder}
              </p>
              <p className="mt-5 leading-relaxed text-foreground">{startup.founderBio}</p>
              {startup.founderLinkedin && (
                <a
                  href={startup.founderLinkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-blue transition-colors hover:text-foreground"
                >
                  LinkedIn →
                </a>
              )}
            </div>
          )}

          {!startup.idea && !startup.founderBio && (
            <div className="mt-14 max-w-2xl border-t border-border pt-6">
              <p className="text-lg leading-relaxed text-muted">
                This venture profile is still being set up. Check back soon for more details.
              </p>
            </div>
          )}
        </Reveal>
      </DetailIndexLayout>

      {related.length > 0 && (
        <section className="mx-auto mt-28 max-w-[90rem] border-t border-border px-5 pt-16 sm:px-8 lg:px-12">
          <p className="mb-12 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-muted">
            More from the portfolio
          </p>
          <HairlineGrid items={related} />
        </section>
      )}
    </article>
  );
}
