"use client";
import { useScrollStore } from "@/store/useScrollStore";

/** Convenient selector hooks for scroll state */
export const useScrollProgress = () => useScrollStore((s) => s.progress);
export const useScrollPhaseVal = () => useScrollStore((s) => s.phase);
export const useScrollSection  = () => useScrollStore((s) => s.section);
