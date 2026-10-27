import type { ReactNode } from "react";

import { PageTransition } from "@/components/motion/page-transition";

/** Re-keyed on every route change, so each page enters with the same motion. */
export default function ConsoleTemplate({ children }: { children: ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
