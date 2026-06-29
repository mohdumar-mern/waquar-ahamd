"use client";
import { useEffect, useRef, useState } from "react";

interface UseThreeOptions {
  onReady?: () => void;
}

/**
 * Returns a ref to attach to a <canvas> and tracks whether
 * WebGL is supported in the current browser.
 */
export function useThree({ onReady }: UseThreeOptions = {}) {
  const canvasRef      = useRef<HTMLCanvasElement>(null);
  const [webglOk, setWebglOk] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      const ctx = canvas.getContext("webgl2") || canvas.getContext("webgl");
      if (!ctx) throw new Error("WebGL not supported");
      onReady?.();
    } catch {
      setWebglOk(false);
      console.warn("WebGL unavailable — falling back to static mode");
    }
  }, [onReady]);

  return { canvasRef, webglOk };
}
