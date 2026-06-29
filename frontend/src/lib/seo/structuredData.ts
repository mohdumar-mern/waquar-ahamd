import { siteConfig } from "@/config/site.config";

export function personSchema() {
  return {
    "@context"   : "https://schema.org",
    "@type"      : "Person",
    name         : siteConfig.name,
    jobTitle     : "3D Automotive Animator",
    url          : siteConfig.url,
    email        : siteConfig.email,
    description  : siteConfig.description,
    knowsAbout   : ["3D Animation","Automotive Visualization","Formula 1","Blender","Unreal Engine","Cinema 4D","Maya"],
    sameAs: Object.values(siteConfig.socials),
  };
}

export function portfolioSchema(projects: { title: string; description: string; url: string; image?: string }[]) {
  return {
    "@context"    : "https://schema.org",
    "@type"       : "CreativeWorkSeries",
    name          : `${siteConfig.name} Portfolio`,
    creator       : { "@type": "Person", name: siteConfig.name },
    hasPart       : projects.map(p => ({
      "@type"     : "CreativeWork",
      name        : p.title,
      description : p.description,
      url         : p.url,
      image       : p.image,
    })),
  };
}
