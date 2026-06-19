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
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 text-white",
          transparent
            ? "bg-transparent border-b border-transparent"
            : "bg-[rgba(13,6,24,0.92)] backdrop-blur-xl border-b border-white/[0.07] shadow-[0_1px_0_rgba(167,139,250,0.08)]"
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
              {/* Gold dot indicator */}
              <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-club-gold animate-pulse" />
            </div>
            <div className="hidden sm:block">
              <span className="text-[15px] font-black tracking-tight leading-none">{site.name}</span>
              <span className="block text-[9px] font-bold uppercase tracking-[0.2em] text-white/35 leading-none mt-0.5">IIT Delhi</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-0 lg:flex">
            {site.nav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative px-3 py-2 text-[11px] font-bold uppercase tracking-[0.14em] transition-colors duration-150",
                    active ? "text-club-gold" : "text-white/50 hover:text-white"
                  )}
                >
                  {item.label}
                  {active && (
                    <span className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full bg-club-gold" />
                  )}
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
                className="text-xs font-black normal-case tracking-normal shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] transition-shadow"
              >
                Apply now
              </Button>
            </Link>
            <button
              type="button"
              className="lg:hidden rounded-xl p-2 text-white/70 hover:text-white hover:bg-white/10 transition-all"
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
              className="fixed inset-0 z-40 lg:hidden bg-black/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <m.nav
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="fixed right-4 top-20 z-50 w-[min(100%-2rem,320px)] rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
              style={{ background: "linear-gradient(160deg, #130d2e 0%, #1e1247 100%)" }}
            >
              <div className="p-4 flex flex-col gap-1">
                {site.nav.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center justify-between rounded-xl px-4 py-3 text-sm font-bold uppercase tracking-wider transition-all",
                        active
                          ? "bg-club-gold/15 text-club-gold border border-club-gold/25"
                          : "text-white/60 hover:bg-white/[0.06] hover:text-white"
                      )}
                    >
                      {item.label}
                      {active && <span className="h-1.5 w-1.5 rounded-full bg-club-gold" />}
                    </Link>
                  );
                })}
                <Link href="/apply" className="mt-2" onClick={() => setOpen(false)}>
                  <Button variant="club" className="w-full font-black normal-case tracking-normal">
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
