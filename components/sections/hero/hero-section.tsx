import { site } from "@/lib/data";
import { HeroShell } from "./hero-shell";
import type { HeroContentProps } from "./hero-content";

const HERO_COPY = {
  eyebrow: "Student Incubation Cell · IIT Delhi",
  title: "Every big idea starts with a signal.",
  screenTagline: "The community is listening.",
  description:
    "SInC connects an early spark to the people, labs, programs, and opportunities that help it become something real.",
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
