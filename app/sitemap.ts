import type { MetadataRoute } from "next";
import { events, startups } from "@/lib/data";

const base = "https://www.sinciitd.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    { path: "", priority: 1, changeFrequency: "weekly" as const },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/programs", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/events", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/portfolio", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/team", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/apply", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.7, changeFrequency: "monthly" as const },
  ].map(({ path, priority, changeFrequency }) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));

  const eventRoutes = events.map((e) => ({
    url: `${base}/events/${e.slug}`,
    lastModified: new Date(e.date),
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
