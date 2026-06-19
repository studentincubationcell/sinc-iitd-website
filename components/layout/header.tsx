"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { m, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/data";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isHome = pathname === "/";
  const transparent = isHome && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 text-foreground",
          transparent
            ? "bg-transparent border-b border-transparent"
            : "bg-[rgba(244,243,238,0.88)] backdrop-blur-xl border-b border-border-ink"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="relative">
              <Image
                src="/logo.svg"
                alt="SInC"
                width={34}
                height={34}
                className="transition-transform duration-300 group-hover:scale-105"
              />
              {/* Lime dot indicator */}
              <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 bg-accent-lime ring-1 ring-foreground" />
            </div>
            <div className="hidden sm:block">
              <span className="text-[15px] font-black tracking-tight leading-none">{site.name}</span>
              <span className="block font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-muted leading-none mt-0.5">IIT Delhi</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {site.nav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors duration-200",
                    active ? "text-foreground" : "text-muted hover:text-foreground"
                  )}
                >
                  {active && (
                    <m.span
                      layoutId="nav-active-pill"
                      className="absolute inset-x-2 -bottom-0.5 h-[3px] bg-accent-lime"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-2">
            <Link href="/apply" className="hidden sm:block">
              <Button
                size="sm"
                variant="club"
                className="text-xs font-bold normal-case tracking-normal"
              >
                Apply now
              </Button>
            </Link>
            <button
              type="button"
              className="lg:hidden p-2 text-foreground hover:bg-foreground hover:text-background transition-all"
              onClick={() => setOpen(!open)}
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 lg:hidden bg-foreground/30 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <m.nav
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="fixed right-4 top-20 z-50 w-[min(100%-2rem,320px)] border border-border-ink bg-background hard-shadow-lg overflow-hidden"
            >
              <div className="p-3 flex flex-col gap-1">
                {site.nav.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center justify-between px-4 py-3 font-mono text-xs font-semibold uppercase tracking-wider transition-all",
                        active
                          ? "bg-accent-lime text-foreground"
                          : "text-muted hover:bg-foreground hover:text-background"
                      )}
                    >
                      {item.label}
                      {active && <span className="h-1.5 w-1.5 bg-foreground" />}
                    </Link>
                  );
                })}
                <Link href="/apply" className="mt-2" onClick={() => setOpen(false)}>
                  <Button variant="club" className="w-full font-bold normal-case tracking-normal">
                    Apply now
                  </Button>
                </Link>
              </div>
            </m.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
