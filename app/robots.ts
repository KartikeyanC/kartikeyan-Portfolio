import type { MetadataRoute } from "next";

const BASE = "https://karthikeyan.design";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${BASE}/sitemap.xml`,
  };
}
