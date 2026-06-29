/**
 * Page transition configurations for Framer Motion.
 * Used in PageTransition layout wrapper.
 */

export const pageVariants = {
  initial : { opacity: 0, y: 20 },
  animate : { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
  exit    : { opacity: 0, y: -10, transition: { duration: 0.3 } },
};

export const heroTextVariants = {
  hidden : { opacity: 0, y: 60 },
  visible: (i: number) => ({
    opacity   : 1,
    y         : 0,
    transition: { delay: i * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  }),
};

export const navVariants = {
  hidden : { y: -80, opacity: 0 },
  visible: { y: 0,   opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

export const cardVariants = {
  hidden  : { opacity: 0, scale: 0.94, y: 30 },
  visible : (i: number) => ({
    opacity   : 1,
    scale     : 1,
    y         : 0,
    transition: { delay: i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  }),
  hover: {
    scale    : 1.02,
    transition: { duration: 0.25 },
  },
};
