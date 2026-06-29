"use client";
import { useEffect, useRef } from "react";

interface CarControlsOptions {
  onDrag?  : (deltaX: number, deltaY: number) => void;
  onZoom?  : (delta: number) => void;
  enabled? : boolean;
}

/**
 * Attaches pointer / touch / wheel listeners to a target element
 * for drag-to-rotate and pinch-to-zoom on the 3D car in the About section.
 */
export function useCarControls(
  targetRef: React.RefObject<HTMLElement>,
  { onDrag, onZoom, enabled = true }: CarControlsOptions = {}
) {
  const isDragging = useRef(false);
  const lastPos    = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!enabled) return;
    const el = targetRef.current;
    if (!el) return;

    const onPointerDown = (e: PointerEvent) => {
      isDragging.current = true;
      lastPos.current = { x: e.clientX, y: e.clientY };
      el.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging.current) return;
      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      lastPos.current = { x: e.clientX, y: e.clientY };
      onDrag?.(dx, dy);
    };

    const onPointerUp = () => { isDragging.current = false; };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      onZoom?.(e.deltaY);
    };

    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup",   onPointerUp);
    el.addEventListener("wheel",       onWheel, { passive: false });

    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup",   onPointerUp);
      el.removeEventListener("wheel",       onWheel);
    };
  }, [enabled, onDrag, onZoom, targetRef]);
}
