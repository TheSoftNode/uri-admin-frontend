"use client";

import { Search } from "lucide-react";

export function GlobalSearch() {
  return (
    <label className="group hidden h-10 w-64 items-center gap-2.5 rounded-xl bg-secondary px-3.5 transition-[box-shadow,background-color] focus-within:bg-card focus-within:ring-[3px] focus-within:ring-ring/15 xl:flex">
      <Search className="size-3.5 shrink-0 text-subtle-foreground" />
      <input
        type="search"
        aria-label="Search the console"
        placeholder="Search users, brands, logs…"
        className="min-w-0 flex-1 bg-transparent text-[13px] text-foreground outline-none placeholder:text-subtle-foreground"
      />
      <kbd className="rounded-md bg-card px-1.5 py-0.5 font-mono text-[10px] text-subtle-foreground shadow-xs">
        ⌘K
      </kbd>
    </label>
  );
}
