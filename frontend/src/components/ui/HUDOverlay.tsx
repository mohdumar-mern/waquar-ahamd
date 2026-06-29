"use client";
import { useScrollStore } from "@/store/useScrollStore";

const PHASE_LABELS = {
  IDLE        : "IDLE",
  APPROACH    : "APPROACH",
  ENGINE_START: "ENGINE START",
  LAUNCH      : "LAUNCH",
  CINEMATIC   : "CINEMATIC",
  MAX_SPEED   : "MAX SPEED",
};

const PHASE_COLORS = {
  IDLE        : "#555555",
  APPROACH    : "#e8000d",
  ENGINE_START: "#ff4400",
  LAUNCH      : "#ff6600",
  CINEMATIC   : "#ff0000",
  MAX_SPEED   : "#ff0000",
};

export default function HUDOverlay() {
  const { phase, progress } = useScrollStore();
  const color = PHASE_COLORS[phase];
  const speed = phase === "LAUNCH" || phase === "CINEMATIC" || phase === "MAX_SPEED"
    ? Math.round(progress * 320)
    : 0;
  const rpm = phase !== "IDLE" && phase !== "APPROACH"
    ? Math.round(3000 + progress * 9000)
    : 0;

  return (
    <div className="pointer-events-none absolute inset-0 z-10">
      {/* Phase pill */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/50 border border-white/10 px-4 py-1.5 rounded-sm">
        <span className="w-1.5 h-1.5 rounded-full animate-pulse-red" style={{ background: color, boxShadow: `0 0 6px ${color}` }} />
        <span className="text-[9px] tracking-[3px] text-white/60">{PHASE_LABELS[phase]}</span>
      </div>

      {/* Bottom telemetry */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-between px-8 py-4 bg-gradient-to-t from-black/80 to-transparent text-[9px] tracking-[3px] text-white/30">
        <span>SPEED: <span className="text-white/60">{speed} KM/H</span></span>
        <span>RPM: <span className="text-white/60">{rpm.toLocaleString()}</span></span>
        <span>GEAR: <span className="text-white/60">{phase === "LAUNCH" ? "3" : phase === "CINEMATIC" ? "6" : phase === "MAX_SPEED" ? "8" : "N"}</span></span>
        <span style={{ color: phase === "CINEMATIC" || phase === "MAX_SPEED" ? "#e8000d" : undefined }}>
          DRS: {phase === "CINEMATIC" || phase === "MAX_SPEED" ? "ACTIVE" : "CLOSED"}
        </span>
      </div>
    </div>
  );
}
