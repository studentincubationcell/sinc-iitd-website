"use client";

import Link from "next/link";
import { ArrowRight, GraduationCap, Handshake, Network } from "lucide-react";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { network } from "@/lib/data";

export function NetworkPreview() {
  const PREVIEW_CARDS = [
    {
      title: "Alumni Founders",
      icon: GraduationCap,
      description: network.alumni[0].bio,
      tint: "bg-accent-tint/50",
    },
    {
      title: "Active Investors",
      icon: Handshake,
      description: network.investors[0].bio,
      tint: "bg-pop-pink/10",
    },
    {
      title: "Industry Experts",
      icon: Network,
      description: network.experts[1].bio,
      tint: "bg-pop-sky/15",
    },
  ];

  return (
    <section className="section-padding border-t border-border bg-background">
      <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal className="max-w-2xl">
            <SectionHeading
              label="Network & Connections"
              title="Show off our connections."
              description="It's not just about what you know. It's who you build with. IITD alumni, investors, and industrial experts who actually show up for founders."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <Link href="/network">
              <Button size="lg" variant="outline" className="w-fit gap-2 bg-card">
                Explore the network <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </Reveal>
        </div>

        <StaggerContainer className="grid gap-5 md:grid-cols-3">
          {PREVIEW_CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <StaggerItem key={card.title}>
                <div className={`soft-card flex h-full flex-col gap-5 p-7 ${card.tint}`}>
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-card text-foreground">
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-bold leading-snug tracking-tight">
                      {card.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted">
                      {card.description}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
