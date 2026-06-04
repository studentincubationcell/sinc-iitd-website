import Link from "next/link";
import { ArrowRight, Rocket } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";

export function ApplyCTA() {
  return (
    <section className="section-padding">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="framer-card relative overflow-hidden p-10 sm:p-16 text-center bg-foreground text-background">
            <div className="absolute inset-0 opacity-[0.07] dot-grid pointer-events-none" />
            <Rocket className="h-10 w-10 mx-auto mb-6 opacity-80 relative" />
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight relative">
              Ready to build something real?
            </h2>
            <p className="mt-4 text-lg text-white/65 max-w-xl mx-auto relative">
              Join SInC — mentorship, space, and a community that pushes you from
              idea to funded startup.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3 relative">
              <Link href="/apply">
                <Button
                  size="lg"
                  className="bg-white text-foreground hover:bg-white/90 gap-2 rounded-full px-8"
                >
                  Apply Now <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/programs">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/25 text-white hover:bg-white/10 rounded-full px-8"
                >
                  Learn more
                </Button>
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function PageHeader({
  title,
  description,
  badge,
}: {
  title: string;
  description?: string;
  badge?: string;
}) {
  return (
    <section className="pt-32 pb-14 dot-grid border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label={badge ?? "SInC"}
          title={title}
          description={description}
        />
      </div>
    </section>
  );
}
