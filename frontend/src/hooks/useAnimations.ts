"use client";
import { useEffect } from "react";
import { useScrollProgress } from "./useScroll";

/**
 * Exposes the current scroll progress to GSAP-based animation systems.
 * Import this in section components that need to react to scroll without
 * their own scroll listener.
 */
export function useScrollAnimation(
  callback: (progress: number) => void,
  deps: unknown[] = []
) {
  const progress = useScrollProgress();

  useEffect(() => {
    callback(progress);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress, ...deps]);
}
