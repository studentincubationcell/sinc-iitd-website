import { site } from "@/lib/data";
import { HeroShell } from "./hero-shell";
import type { HeroContentProps } from "./hero-content";

const HERO_COPY = {
  eyebrow: "Student Incubation Cell · IIT Delhi",
  title: "Your journey from idea to impact begins here.",
  screenTagline: "together, we build.",
  description:
    "IIT Delhi's pre-incubation home for deep-tech founders — mentorship, lab-to-market support, and a community that ships.",
  announcements: [
    { text: "Applications open for new cohort", href: "/apply" },
    { text: "Follow us on Instagram for updates", href: "https://www.instagram.com/sinciitd/" },
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
