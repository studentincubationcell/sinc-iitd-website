import type { MetadataRoute } from "next";
import { events, startups } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.sinciitd.in";

  const staticRoutes = [
    "",
    "/about",
    "/programs",
    "/events",
    "/portfolio",
    "/team",
    "/apply",
    "/contact",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const eventRoutes = events.map((e) => ({
    url: `${base}/events/${e.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const startupRoutes = startups.map((s) => ({
    url: `${base}/portfolio/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...eventRoutes, ...startupRoutes];
}
