import { site } from "@/lib/data";
import { HeroShell } from "./hero-shell";
import type { HeroContentProps } from "./hero-content";

const HERO_COPY = {
  eyebrow: "Student Incubation Cell · IIT Delhi",
  title: "We don't just build engineers. We build founders.",
  screenTagline: "cohort 1.0 is live.",
  description:
    "SInC is the starting line for IIT Delhi's most ambitious startups. We back deep-tech builders with term-sheet readiness, R&I lab access, and a network of investors that actually show up.",
  announcements: [
    { text: "Applications open for Cohort 1.0", href: "/cohort" },
    { text: "Meet us at the Biweekly Founder Meet", href: "/events" },
  ],
} satisfies Pick<
  HeroContentProps,
  "eyebrow" | "title" | "screenTagline" | "description" | "announcements"
>;

export function HeroSection() {
  const contentProps: HeroContentProps = {
    ...HERO_COPY,
    socials: site.socials,
  };

  return <HeroShell {...contentProps} />;
}
