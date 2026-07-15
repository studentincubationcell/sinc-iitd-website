import { site } from "@/lib/data";
import { HeroShell } from "./hero-shell";
import type { HeroContentProps } from "./hero-content";

const HERO_COPY = {
  eyebrow: "Student Incubation Cell · IIT Delhi",
  title: "Where IIT Delhi comes together to build.",
  screenTagline: "The community is open.",
  description:
    "Discover the founders, collaborators, events, programs, and practical support moving ideas across campus.",
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
