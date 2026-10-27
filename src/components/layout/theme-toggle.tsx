"use client";

import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { useMounted } from "@/hooks/use-mounted";
import { spring } from "@/lib/motion";
import { cn } from "@/lib/utils";

const options = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
] as const;

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();
  const current = mounted ? resolvedTheme : undefined;

  return (
    <div
      role="radiogroup"
      aria-label="Colour theme"
      className="relative flex h-10 items-center gap-0.5 rounded-xl bg-secondary p-1"
    >
      {options.map(({ value, label, icon: Icon }) => {
        const active = current === value;
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={label}
            onClick={() => setTheme(value)}
            className={cn(
              "relative flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-xs font-semibold transition-colors outline-none focus-visible:ring-[3px] focus-visible:ring-ring/30",
              active ? "text-foreground" : "text-subtle-foreground hover:text-foreground",
            )}
          >
            {active ? (
              <motion.span
                layoutId="theme-toggle-thumb"
                transition={spring}
                className="absolute inset-0 rounded-lg bg-card shadow-sm"
                aria-hidden
              />
            ) : null}
            <Icon className="relative size-3.5" />
            <span className="relative hidden sm:inline">{label}</span>
          </button>
        );
      })}
    </div>
  );
}
