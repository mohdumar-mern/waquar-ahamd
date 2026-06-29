"use client";
import { useEffect, useRef } from "react";
import { useScrollStore }    from "@/store/useScrollStore";

/**
 * Attaches a scroll listener to the window (or a custom element)
 * and keeps the Zustand scroll store updated.
 * Uses requestAnimationFrame for performance.
 */
export function useScrollPhase(containerRef?: React.RefObject<HTMLElement>) {
  const setProgress = useScrollStore((s) => s.setProgress);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const getEl = () => containerRef?.current ?? document.documentElement;

    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const el       = getEl();
        const scrolled = el.scrollTop || window.scrollY;
        const max      = el.scrollHeight - el.clientHeight;
        setProgress(max > 0 ? Math.min(scrolled / max, 1) : 0);
      });
    };

    const target = containerRef?.current ?? window;
    target.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      target.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [containerRef, setProgress]);
}
