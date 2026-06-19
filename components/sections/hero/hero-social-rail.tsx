"use client";

import Link from "next/link";
import {
  LinkedInIcon,
  InstagramIcon,
  FacebookIcon,
} from "@/components/icons/social";

export type SocialLink = {
  name: string;
  href: string;
  label: string;
};

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  linkedin: LinkedInIcon,
  instagram: InstagramIcon,
  facebook: FacebookIcon,
};

export function HeroSocialRail({ socials }: { socials: SocialLink[] }) {
  return (
    <aside
      className="hidden md:flex fixed left-4 lg:left-6 top-1/2 -translate-y-1/2 z-40 flex-col gap-5"
      aria-label="Social links"
    >
      {socials.map((s) => {
        const Icon = iconMap[s.name] ?? LinkedInIcon;
        return (
          <Link
            key={s.name}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            className="text-muted transition-colors hover:text-accent-blue"
          >
            <Icon className="h-5 w-5" />
          </Link>
        );
      })}
    </aside>
  );
}
