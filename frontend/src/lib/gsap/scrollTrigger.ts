/**
 * ScrollTrigger wrapper helpers.
 * Import gsap + ScrollTrigger in the component since they need to
 * be registered client-side in Next.js.
 *
 * Usage in a component:
 *   import gsap from "gsap";
 *   import { ScrollTrigger } from "gsap/ScrollTrigger";
 *   import { createScrollTrigger } from "@/lib/gsap/scrollTrigger";
 *   gsap.registerPlugin(ScrollTrigger);
 */

export interface STConfig {
  trigger   : string | Element;
  start?    : string;
  end?      : string;
  scrub?    : boolean | number;
  pin?      : boolean;
  markers?  : boolean;
  onEnter?  : () => void;
  onLeave?  : () => void;
}

/** Returns a standard ScrollTrigger config object */
export function createScrollTrigger(config: STConfig) {
  return {
    trigger: config.trigger,
    start  : config.start   ?? "top 80%",
    end    : config.end     ?? "bottom 20%",
    scrub  : config.scrub   ?? false,
    pin    : config.pin     ?? false,
    markers: config.markers ?? false,
    onEnter: config.onEnter,
    onLeave: config.onLeave,
  };
}

/** Section entrance — elements fade up when entering viewport */
export function sectionEntrance(triggerEl: Element, targets: string) {
  return {
    scrollTrigger: createScrollTrigger({ trigger: triggerEl, start: "top 75%" }),
    y       : 50,
    opacity : 0,
    duration: 0.8,
    stagger : 0.12,
    ease    : "power3.out",
  };
}
