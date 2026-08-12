"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { AnimatePresence, m } from "framer-motion";
import { cn } from "@/lib/utils";

const groups = [
  {
    label: "Discover",
    links: [
      { label: "Events", href: "/events", note: "What is happening next" },
      { label: "Portfolio", href: "/portfolio", note: "Meet campus ventures" },
      { label: "Resources", href: "/resources", note: "Build with better tools" },
    ],
  },
  {
    label: "Participate",
    links: [
      { label: "Programs", href: "/programs", note: "Support for every stage" },
      { label: "Opportunities", href: "/opportunities", note: "Roles, bounties and calls" },
      { label: "Cohort 01", href: "/cohort", note: "The current founder cohort" },
      { label: "Registry", href: "/registry", note: "List your campus venture" },
    ],
  },
  {
    label: "Community",
    links: [
      { label: "Network", href: "/network", note: "Alumni, experts and investors" },
      { label: "About", href: "/about", note: "Why SInC exists" },
      { label: "Team", href: "/team", note: "The people behind SInC" },
      { label: "Contact", href: "/contact", note: "Start a conversation" },
    ],
  },
] as const;

function Brand() {
  return (
    <Link href="/" className="group flex min-w-0 items-center gap-3" aria-label="SInC IIT Delhi, home">
      <Image src="/logo.png" alt="" width={38} height={38} className="shrink-0 transition-transform group-hover:rotate-3" priority />
      <span className="leading-none">
        <span className="block font-display text-xl font-extrabold tracking-tight">SInC</span>
        <span className="mt-1 block font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-muted">IIT Delhi</span>
      </span>
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeGroup, setActiveGroup] = useState<string | null>(null);

  useEffect(() => {
    setMobileOpen(false);
    setActiveGroup(null);
  }, [pathname]);

  return (
    <header data-site-header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/95 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-[90rem] items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Brand />

        <nav className="hidden items-stretch self-stretch lg:flex" aria-label="Primary navigation">
          {groups.map((group) => {
            const isActive = group.links.some(({ href }) => pathname === href || pathname.startsWith(`${href}/`));
            const isOpen = activeGroup === group.label;
            return (
              <div
                key={group.label}
                className="relative flex"
                onMouseEnter={() => setActiveGroup(group.label)}
                onMouseLeave={() => setActiveGroup(null)}
              >
                <button
                  type="button"
                  className={cn("flex items-center gap-1.5 border-b-2 px-5 text-sm font-semibold transition-colors", isActive ? "border-accent text-foreground" : "border-transparent text-muted hover:text-foreground")}
                  aria-expanded={isOpen}
                  onClick={() => setActiveGroup(isOpen ? null : group.label)}
                >
                  {group.label}
                  <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", isOpen && "rotate-180")} />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <m.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} className="absolute left-1/2 top-full w-72 -translate-x-1/2 pt-3">
                      <div className="border border-border bg-card-pure p-2 shadow-xl">
                        {group.links.map((link) => (
                          <Link key={link.href} href={link.href} className={cn("group/link flex items-center justify-between gap-4 p-3 transition-colors hover:bg-accent-tint", pathname === link.href && "bg-accent-tint")}>
                            <span>
                              <span className="block text-sm font-bold">{link.label}</span>
                              <span className="mt-1 block text-xs text-muted">{link.note}</span>
                            </span>
                            <ArrowUpRight className="h-4 w-4 shrink-0 text-muted transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                          </Link>
                        ))}
                      </div>
                    </m.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/registry" className="pill-cta">
            <span className="sm:hidden">Join us</span>
            <span className="hidden sm:inline">Join the registry</span>
          </Link>
          <button type="button" className="flex h-11 w-11 items-center justify-center rounded-full border border-border lg:hidden" onClick={() => setMobileOpen((value) => !value)} aria-expanded={mobileOpen} aria-controls="mobile-navigation" aria-label={mobileOpen ? "Close navigation" : "Open navigation"}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <m.nav id="mobile-navigation" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="max-h-[calc(100svh-5rem)] overflow-y-auto border-t border-border bg-background lg:hidden" aria-label="Mobile navigation">
            <div className="mx-auto grid max-w-[90rem] gap-8 px-4 py-8 sm:grid-cols-3 sm:px-6">
              {groups.map((group) => (
                <div key={group.label}>
                  <p className="mono-label mb-3 text-foreground">{group.label}</p>
                  <div className="flex flex-col">
                    {group.links.map((link) => (
                      <Link key={link.href} href={link.href} className={cn("border-b border-border py-3 text-base font-semibold", pathname === link.href ? "text-accent" : "text-foreground")}>
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </m.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
