"use client";
import { useScrollProgress } from "@/hooks/useScroll";

export default function ScrollIndicator() {
  const progress = useScrollProgress();

  if (progress > 0.05) return null;

  return (
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-none">
      <p className="text-[9px] tracking-[6px] text-white/30">SCROLL TO EXPERIENCE</p>
      <div className="w-px h-12 bg-gradient-to-b from-racing-red to-transparent animate-pulse" />
    </div>
  );
}
