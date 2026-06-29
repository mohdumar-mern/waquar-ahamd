import { create } from "zustand";

type ScrollPhase = "IDLE" | "APPROACH" | "ENGINE_START" | "LAUNCH" | "CINEMATIC" | "MAX_SPEED";

interface ScrollStore {
  progress    : number;
  phase       : ScrollPhase;
  section     : string;
  setProgress : (p: number) => void;
}

function getPhase(p: number): ScrollPhase {
  if (p < 0.12) return "IDLE";
  if (p < 0.25) return "APPROACH";
  if (p < 0.40) return "ENGINE_START";
  if (p < 0.65) return "LAUNCH";
  if (p < 0.85) return "CINEMATIC";
  return "MAX_SPEED";
}

function getSection(p: number): string {
  if (p < 0.45) return "hero";
  if (p < 0.70) return "about";
  if (p < 0.88) return "projects";
  return "contact";
}

export const useScrollStore = create<ScrollStore>((set) => ({
  progress   : 0,
  phase      : "IDLE",
  section    : "hero",
  setProgress: (p) => set({ progress: p, phase: getPhase(p), section: getSection(p) }),
}));
