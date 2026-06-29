import { animConfig } from "@/config/animation.config";

/** Fade-up animation config for GSAP .from() */
export const fadeUp = {
  y      : 40,
  opacity: 0,
  duration: animConfig.duration.normal,
  ease   : "power3.out",
};

/** Stagger children */
export const staggerFadeUp = (stagger = 0.1) => ({
  ...fadeUp,
  stagger,
});

/** Text reveal — character by character */
export const charReveal = {
  opacity : 0,
  y       : 20,
  duration: 0.05,
  stagger : 0.03,
  ease    : "power2.out",
};

/** Scale + fade for cards */
export const cardReveal = {
  scale  : 0.92,
  opacity: 0,
  duration: animConfig.duration.slow,
  ease   : "expo.out",
};

/** HUD flicker */
export const hudFlicker = {
  opacity : 0.4,
  duration: 0.08,
  repeat  : 3,
  yoyo    : true,
  ease    : "none",
};
