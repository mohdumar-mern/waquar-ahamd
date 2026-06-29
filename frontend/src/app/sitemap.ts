import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site.config";
import { apiConfig } from "@/config/api.config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url;

  // Fetch project slugs for dynamic pages
  let projectUrls: MetadataRoute.Sitemap = [];
  try {
    const res  = await fetch(`${apiConfig.baseUrl}${apiConfig.endpoints.projects}`, { next: { revalidate: 3600 } });
    const json = await res.json();
    projectUrls = (json.data?.data || []).map((p: { slug: string; updatedAt: string }) => ({
      url        : `${base}/projects/${p.slug}`,
      lastModified: new Date(p.updatedAt),
      changeFrequency: "monthly",
      priority   : 0.7,
    }));
  } catch {}

  return [
    { url: base,                  lastModified: new Date(), changeFrequency: "weekly",  priority: 1.0  },
    { url: `${base}/about`,       lastModified: new Date(), changeFrequency: "monthly", priority: 0.8  },
    { url: `${base}/projects`,    lastModified: new Date(), changeFrequency: "weekly",  priority: 0.9  },
    { url: `${base}/work`,        lastModified: new Date(), changeFrequency: "monthly", priority: 0.7  },
    { url: `${base}/contact`,     lastModified: new Date(), changeFrequency: "yearly",  priority: 0.6  },
    ...projectUrls,
  ];
}
