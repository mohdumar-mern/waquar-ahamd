import { Metadata } from "next";
import { siteConfig } from "@/config/site.config";

interface PageMeta {
  title?      : string;
  description?: string;
  keywords?   : string[];
  image?      : string;
  noIndex?    : boolean;
}

export function generateMetadata({
  title,
  description,
  keywords,
  image,
  noIndex = false,
}: PageMeta = {}): Metadata {
  const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.title;
  const desc      = description || siteConfig.description;
  const img       = image       || siteConfig.ogImage;

  return {
    title: fullTitle,
    description: desc,
    keywords: [...(keywords || []), ...siteConfig.keywords],
    authors: [{ name: siteConfig.author }],
    creator: siteConfig.author,
    robots : noIndex ? "noindex,nofollow" : "index,follow",
    openGraph: {
      title      : fullTitle,
      description: desc,
      url        : siteConfig.url,
      siteName   : siteConfig.name,
      type       : "website",
      locale     : siteConfig.locale,
      images     : [{ url: img, width: 1200, height: 630, alt: fullTitle }],
    },
    twitter: {
      card       : "summary_large_image",
      title      : fullTitle,
      description: desc,
      images     : [img],
      creator    : "@waquarahmad",
    },
    alternates : { canonical: siteConfig.url },
    themeColor : siteConfig.themeColor,
  };
}
