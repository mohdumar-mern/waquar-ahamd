"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollProgress } from "@/hooks/useScroll";
import { useUIStore } from "@/store/useUIStore";
import { siteConfig } from "@/config/site.config";
import { navVariants } from "@/lib/gsap/transitions";
import Link from "next/link";

const NAV_LINKS = [
  { label: "WORK",     href: "/work"     },
  { label: "PROJECTS", href: "/projects" },
  { label: "ABOUT",    href: "/about"    },
  { label: "CONTACT",  href: "/contact"  },
];

export default function Navbar() {
  const progress    = useScrollProgress();
  const { isMenuOpen, toggleMenu, closeMenu } = useUIStore();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => { setScrolled(progress > 0.02); }, [progress]);

  return (
    <>
      <motion.header
        variants={navVariants}
        initial="hidden"
        animate="visible"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled ? "bg-black/80 backdrop-blur-md border-b border-white/5" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex flex-col leading-none">
            <span className="text-[10px] tracking-[6px] text-racing-red font-bold">WAQUAR AHMAD</span>
            <span className="text-[8px] tracking-[4px] text-white/30 mt-0.5">3D AUTOMOTIVE ANIMATOR</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="text-[9px] tracking-[4px] text-white/50 hover:text-racing-red transition-colors duration-300"
              >
                {label}
              </Link>
            ))}
            <Link
              href={siteConfig.socials.artstation}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[9px] tracking-[4px] text-racing-red border border-racing-red px-4 py-2 hover:bg-racing-red hover:text-white transition-all duration-300"
            >
              ARTSTATION
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button onClick={toggleMenu} className="md:hidden flex flex-col gap-1.5 p-2" aria-label="Menu">
            <span className={`block w-6 h-px bg-white transition-transform duration-300 ${isMenuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
            <span className={`block w-4 h-px bg-white/60 transition-opacity duration-300 ${isMenuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-px bg-white transition-transform duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
          </button>
        </div>

        {/* Scroll progress bar */}
        <div className="absolute bottom-0 left-0 h-px bg-racing-red/80 transition-all duration-100" style={{ width: `${progress * 100}%` }} />
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center gap-8"
          >
            {NAV_LINKS.map(({ label, href }, i) => (
              <motion.Link
                key={label}
                href={href}
                onClick={closeMenu}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                className="text-2xl tracking-[8px] text-white/70 hover:text-racing-red transition-colors"
              >
                {label}
              </motion.Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
