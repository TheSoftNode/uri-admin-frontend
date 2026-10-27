"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

import { fadeUp, staggerContainer } from "@/lib/motion";

interface StaggerProps extends HTMLMotionProps<"div"> {
  /** Seconds between each child's entrance. */
  stagger?: number;
  delay?: number;
}

/** Reveals its <StaggerItem> children one after another on mount. */
export function Stagger({ stagger = 0.06, delay = 0.04, children, ...props }: StaggerProps) {
  return (
    <motion.div
      variants={staggerContainer(stagger, delay)}
      initial="hidden"
      animate="visible"
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, ...props }: HTMLMotionProps<"div">) {
  return (
    <motion.div variants={fadeUp} {...props}>
      {children}
    </motion.div>
  );
}
