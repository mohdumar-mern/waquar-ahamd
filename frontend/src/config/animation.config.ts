// Shared GSAP / Framer Motion animation constants
export const animConfig = {
  // Scroll phases — mirrors scroll progress 0–1
  phases: {
    IDLE        : { start: 0,    end: 0.12 },
    APPROACH    : { start: 0.12, end: 0.25 },
    ENGINE_START: { start: 0.25, end: 0.40 },
    LAUNCH      : { start: 0.40, end: 0.65 },
    CINEMATIC   : { start: 0.65, end: 0.85 },
    MAX_SPEED   : { start: 0.85, end: 1.0  },
  },

  // Durations (seconds)
  duration: {
    fast  : 0.3,
    normal: 0.6,
    slow  : 1.2,
    cinematic: 2.0,
  },

  // Eases
  ease: {
    smooth    : [0.25, 0.1, 0.25, 1],
    explosive : [0.16, 1, 0.3, 1],
    cinematic : [0.77, 0, 0.175, 1],
  },

  // Camera positions per phase
  camera: {
    idle   : { position: [6,  2.5, 8], target: [0, 0.5, 0] },
    approach:{ position: [3,  2.0, 6], target: [0, 0.5, 0] },
    launch : { position: [0,  2.5, 8], target: [0, 0.5, 0] },
    chase  : { position: [0,  1.5, 6], target: [0, 0.5, 0] },
    topDown: { position: [0,  8.0, 3], target: [0, 0,   0] },
    wheel  : { position: [1.5,0.4, 0], target: [1.2,0.3,0] },
  },
} as const;
