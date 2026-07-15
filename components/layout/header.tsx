"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { m, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { site } from "@/lib/data";

const mainNav = site.nav.filter((item) => item.href !== "/contact");

const moreNav = [
  { label: "Opportunities", href: "/opportunities" },
  { label: "Resources", href: "/resources" },
  { label: "Programs", href: "/programs" },
  { label: "About", href: "/about" },
  { label: "Team", href: "/team" },
];

function HeaderLogo() {
  return (
    <Link href="/" className="flex min-w-0 shrink-0 items-center gap-3 group">
      <Image
        src="/logo.png"
        alt=""
        width={36}
        height={36}
        aria-hidden
        className="shrink-0 transition-transform duration-300 group-hover:scale-105"
      />
      <span className="text-xl font-black tracking-tight text-foreground sm:text-[1.35rem] leading-none">
        {site.name}
      </span>
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);
  const isHome = pathname === "/";
  const transparent = isHome && !scrolled;
  const moreActive = moreNav.some((item) => item.href === pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMoreOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!moreOpen) return;
    const onClick = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [moreOpen]);

  return (
    <>
      <header
        data-site-header
        className="fixed top-0 left-0 right-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4 text-foreground"
      >
        <div
          className={cn(
            "mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-2xl border px-4 py-2.5 sm:gap-6 sm:px-5 transition-all duration-300",
            transparent
              ? "border-border-ink/10 bg-background/40 backdrop-blur-md"
              : "border-border-ink/25 bg-background/85 backdrop-blur-xl shadow-[0_8px_30px_-12px_rgba(0,0,0,0.15)]"
          )}
        >
          <div className="flex shrink-0 items-center gap-3">
            <HeaderLogo />
            <span className="hidden items-center rounded-full border border-border-ink px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-muted sm:inline-flex">
              IIT Delhi
            </span>
          </div>

          <nav className="hidden items-center gap-0.5 lg:flex">
            {mainNav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-200",
                    active
                      ? "bg-foreground text-background"
                      : "text-muted hover:text-foreground"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}

            <div
              ref={moreRef}
              className="relative"
              onMouseEnter={() => setMoreOpen(true)}
              onMouseLeave={() => setMoreOpen(false)}
            >
              <button
                type="button"
                onClick={() => setMoreOpen((v) => !v)}
                aria-expanded={moreOpen}
                aria-haspopup="true"
                className={cn(
                  "flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-200",
                  moreActive
                    ? "bg-foreground text-background"
                    : "text-muted hover:text-foreground"
                )}
              >
                More
                <ChevronDown
                  className={cn("h-3.5 w-3.5 transition-transform", moreOpen && "rotate-180")}
                />
              </button>

              <AnimatePresence>
                {moreOpen && (
                  <m.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute right-0 top-full w-52 pt-2"
                  >
                    <div className="overflow-hidden rounded-xl border border-border bg-background p-1.5 shadow-lg [background:var(--header-surface)] backdrop-blur-xl">
                      {moreNav.map((item) => {
                        const active = pathname === item.href;
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                              "block rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                              active
                                ? "bg-foreground text-background"
                                : "text-muted hover:bg-foreground/5 hover:text-foreground"
                            )}
                          >
                            {item.label}
                          </Link>
                        );
                      })}
                    </div>
                  </m.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          <div className="flex shrink-0 items-center gap-2 sm:gap-4">
            <div className="hidden items-center gap-4 sm:flex">
              <span className="hidden h-5 w-px bg-border-ink/30 md:block" aria-hidden />
              <Link
                href="/contact"
                className={cn(
                  "hidden text-sm font-medium transition-opacity md:inline",
                  pathname === "/contact"
                    ? "text-foreground font-semibold"
                    : "text-foreground hover:opacity-70"
                )}
              >
                Contact
              </Link>
              <Link
                href="/apply"
                className="inline-flex items-center justify-center rounded-full bg-foreground px-5 py-2 text-sm font-semibold text-background transition-opacity hover:opacity-90"
              >
                Apply now
              </Link>
            </div>
            <button
              type="button"
              className="p-2 text-foreground transition-colors hover:bg-foreground hover:text-background lg:hidden"
              onClick={() => setOpen(!open)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 backdrop-blur-sm lg:hidden [background:var(--overlay-scrim)]"
              onClick={() => setOpen(false)}
            />
            <m.nav
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="fixed right-4 top-[4.5rem] z-50 w-[min(100%-2rem,320px)] overflow-hidden border border-border-ink bg-background hard-shadow-lg lg:hidden"
            >
              <div className="flex flex-col gap-1 p-3">
                {site.nav.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center justify-between rounded-full px-4 py-3 text-sm font-medium transition-colors",
                        active
                          ? "bg-foreground text-background"
                          : "text-muted hover:bg-foreground/5 hover:text-foreground"
                      )}
                    >
                      {item.label}
                    </Link>
                  );
                })}

                <span className="mt-3 px-4 text-[10px] font-semibold uppercase tracking-widest text-muted">
                  More
                </span>
                {moreNav.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center justify-between rounded-full px-4 py-3 text-sm font-medium transition-colors",
                        active
                          ? "bg-foreground text-background"
                          : "text-muted hover:bg-foreground/5 hover:text-foreground"
                      )}
                    >
                      {item.label}
                    </Link>
                  );
                })}

                <Link
                  href="/apply"
                  className="mt-2 inline-flex w-full items-center justify-center bg-foreground px-5 py-3 text-sm font-semibold text-background"
                  onClick={() => setOpen(false)}
                >
                  Apply now
                </Link>
              </div>
            </m.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
