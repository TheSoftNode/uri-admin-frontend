import type { Transition, Variants } from "framer-motion";

/**
 * Motion tokens. Every animation in the console draws from these so timing and
 * easing feel like one system rather than a collection of one-offs.
 */
export const ease = {
  out: [0.22, 1, 0.36, 1],
  inOut: [0.65, 0, 0.35, 1],
} as const;

export const duration = {
  fast: 0.18,
  base: 0.32,
  slow: 0.6,
  chart: 1.1,
} as const;

export const spring: Transition = { type: "spring", stiffness: 380, damping: 32, mass: 0.8 };

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: duration.slow, ease: ease.out } },
};

export const staggerContainer = (stagger = 0.06, delayChildren = 0.04): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren } },
});
