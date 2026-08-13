import type { MetadataRoute } from "next";

const base = "https://www.sinciitd.in";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/registry/m/"],
    },
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
