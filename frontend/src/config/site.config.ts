export const siteConfig = {
  name       : "Waquar Ahmad",
  title      : "Waquar Ahmad | 3D Automotive Animator",
  description: "Professional 3D Animator specializing in Formula 1, automotive, and cinematic vehicle animations. 6+ years | 120+ projects | Global clients.",
  url        : process.env.NEXT_PUBLIC_SITE_URL || "https://waquarahmad.com",
  keywords   : [
    "3D Automotive Animator","Formula 1 Animation","Vehicle 3D Animation",
    "Blender Automotive","Unreal Engine Vehicle","Cinema 4D Car Render",
    "3D Car Animation","Maya Vehicle Rig","Automotive Visualization",
    "Waquar Ahmad","F1 3D Artist","Racing Game Cinematic",
  ],
  author     : "Waquar Ahmad",
  email      : "waquar@example.com",
  socials    : {
    artstation: "https://artstation.com/waquarahmad",
    linkedin  : "https://linkedin.com/in/waquarahmad",
    youtube   : "https://youtube.com/@waquarahmad",
    instagram : "https://instagram.com/waquarahmad",
  },
  ogImage    : "/og-image.jpg",
  locale     : "en_US",
  themeColor : "#e8000d",
} as const;
