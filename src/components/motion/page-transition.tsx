"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

import { duration, ease } from "@/lib/motion";

export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: duration.base, ease: ease.out }}
    >
      {children}
    </motion.div>
  );
}
