"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/data";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 24);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-4 sm:px-6">
        <div
          className={cn(
            "mx-auto flex max-w-5xl items-center justify-between transition-all duration-200",
            scrolled ? "nav-pill px-4 py-2.5" : "px-2 py-2"
          )}
        >
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <Image
              src="/logo.svg"
              alt="SInC logo"
              width={32}
              height={32}
              className="transition-transform group-hover:scale-105"
            />
            <span className="text-lg font-bold tracking-tight hidden sm:inline">
              {site.name}
            </span>
          </Link>

          <nav className="hidden items-center gap-0.5 lg:flex">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-3 py-1.5 text-sm font-medium rounded-full transition-colors",
                  pathname === item.href
                    ? "bg-foreground text-background"
                    : "text-muted hover:text-foreground hover:bg-foreground/5"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/apply" className="hidden sm:block">
              <Button size="sm" className="rounded-full px-5">
                Apply
              </Button>
            </Link>
            <button
              type="button"
              className="lg:hidden rounded-full p-2 hover:bg-foreground/5"
              onClick={() => setOpen(!open)}
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      <div
        className={cn(
          "fixed inset-0 z-40 lg:hidden transition-opacity duration-200",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <div
          className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
        <nav
          className={cn(
            "absolute right-4 top-20 w-[min(100%,300px)] framer-card p-4 shadow-2xl transition-all duration-200",
            open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
          )}
        >
          <div className="flex flex-col gap-1">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-xl px-4 py-2.5 text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "bg-foreground text-background"
                    : "hover:bg-foreground/5"
                )}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/apply" className="mt-2" onClick={() => setOpen(false)}>
              <Button className="w-full rounded-full">Apply Now</Button>
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
