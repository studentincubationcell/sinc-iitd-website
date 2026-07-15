import { site } from "@/lib/data";
import { HeroShell } from "./hero-shell";
import type { HeroContentProps } from "./hero-content";

const HERO_COPY = {
  eyebrow: "Student Incubation & Entrepreneurship, IIT Delhi",
  title: "Engineering Ideas. Into Ventures.",
  screenTagline: "The community is listening.",
  description:
    "SInC helps IIT Delhi students turn early sparks into real companies: connecting them with people, labs, capital, and the community that gets ideas built.",
  announcements: [
    { text: "Explore the current founder cohort", href: "/cohort" },
    { text: "See what is happening across the community", href: "/events" },
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
