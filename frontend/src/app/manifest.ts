import { MetadataRoute } from "next";
import { siteConfig }    from "@/config/site.config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name            : siteConfig.name,
    short_name      : "Waquar Ahmad",
    description     : siteConfig.description,
    start_url       : "/",
    display         : "standalone",
    background_color: "#000000",
    theme_color     : siteConfig.themeColor,
    icons           : [
      { src: "/icons/icon-192.png",  sizes: "192x192",  type: "image/png" },
      { src: "/icons/icon-512.png",  sizes: "512x512",  type: "image/png" },
    ],
  };
}
