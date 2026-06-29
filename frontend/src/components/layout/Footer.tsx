import { siteConfig } from "@/config/site.config";
import Link from "next/link";

const SOCIAL_LINKS = [
  { label: "ARTSTATION", href: siteConfig.socials.artstation },
  { label: "LINKEDIN",   href: siteConfig.socials.linkedin   },
  { label: "YOUTUBE",    href: siteConfig.socials.youtube    },
  { label: "INSTAGRAM",  href: siteConfig.socials.instagram  },
];

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/5 py-12 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <div>
          <p className="text-[10px] tracking-[6px] text-racing-red font-bold">WAQUAR AHMAD</p>
          <p className="text-[8px] tracking-[4px] text-white/20 mt-1">3D AUTOMOTIVE ANIMATOR</p>
        </div>

        {/* Socials */}
        <div className="flex gap-6">
          {SOCIAL_LINKS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[8px] tracking-[3px] text-white/30 hover:text-racing-red transition-colors duration-300"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-[8px] tracking-[3px] text-white/20">
          © {new Date().getFullYear()} WAQUAR AHMAD. ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  );
}
