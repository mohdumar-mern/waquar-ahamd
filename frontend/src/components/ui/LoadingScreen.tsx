"use client";
import { useEffect, useState } from "react";
import { useUIStore } from "@/store/useUIStore";

export default function LoadingScreen() {
  const setLoaded = useUIStore((s) => s.setLoaded);
  const [progress, setProgress] = useState(0);
  const [visible,  setVisible]  = useState(true);

  useEffect(() => {
    // Simulate engine initialisation
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => { setVisible(false); setLoaded(true); }, 400);
          return 100;
        }
        return p + Math.random() * 18;
      });
    }, 80);
    return () => clearInterval(interval);
  }, [setLoaded]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black">
      {/* Logo */}
      <div className="mb-10 text-center">
        <p className="text-[10px] tracking-[8px] text-racing-red font-bold mb-1">WAQUAR AHMAD</p>
        <p className="text-[9px] tracking-[5px] text-white/30">3D AUTOMOTIVE ANIMATOR</p>
      </div>

      {/* F1 car ASCII / icon */}
      <div className="text-6xl mb-10 opacity-80">🏎️</div>

      {/* Progress bar */}
      <div className="w-48 h-[2px] bg-white/10 relative overflow-hidden mb-4">
        <div
          className="absolute left-0 top-0 h-full bg-racing-red transition-all duration-100"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>

      <p className="text-[9px] tracking-[6px] text-white/30">
        INITIALIZING ENGINE · {Math.min(Math.round(progress), 100)}%
      </p>
    </div>
  );
}
