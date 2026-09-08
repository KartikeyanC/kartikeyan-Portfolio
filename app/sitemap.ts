import type { MetadataRoute } from "next";
import { projects } from "@/data/content";

const BASE = "https://karthikeyan.design";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const caseStudies = projects
    .filter((p) => p.link.type === "internal" && p.caseStudy)
    .map((p) => ({
      url: `${BASE}/work/${p.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    }));

  return [
    { url: BASE, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE}/playground`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    ...caseStudies,
  ];
}
