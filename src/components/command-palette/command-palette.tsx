"use client";

import { Building2, type LucideIcon, ScrollText, Search, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { navigation } from "@/config/navigation";
import { agenciesFixture } from "@/features/agencies/data/agencies.fixtures";
import { auditLogFixture } from "@/features/audit-log/data/audit-log.fixtures";
import { usersFixture } from "@/features/users/data/users.fixtures";
import { displayName } from "@/features/users/lib";
import { cn } from "@/lib/utils";

interface Result {
  id: string;
  group: "Pages" | "Users" | "Agencies" | "Audit log";
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  href: string;
}

/** Built once at module scope — all source fixtures are plain data modules,
 * not server-only, so this is safe to index directly client-side. */
const ALL_RESULTS: Result[] = [
  ...navigation.flatMap((group) =>
    group.items.map((item): Result => ({
      id: `page:${item.href}`,
      group: "Pages",
      icon: item.icon,
      title: item.title,
      subtitle: item.description,
      href: item.href,
    })),
  ),
  ...usersFixture.map((user): Result => ({
    id: `user:${user.id}`,
    group: "Users",
    icon: Users,
    title: displayName(user),
    subtitle: user.email,
    href: "/users",
  })),
  ...agenciesFixture.map((agency): Result => ({
    id: `agency:${agency.id}`,
    group: "Agencies",
    icon: Building2,
    title: agency.name,
    subtitle: agency.ownerEmail,
    href: "/agencies",
  })),
  ...auditLogFixture.entries.map((entry): Result => ({
    id: `audit:${entry.id}`,
    group: "Audit log",
    icon: ScrollText,
    title: `${entry.actor} ${entry.action} ${entry.target}`,
    subtitle: entry.detail,
    href: "/audit-log",
  })),
];

function matches(result: Result, query: string): boolean {
  const haystack = `${result.title} ${result.subtitle ?? ""}`.toLowerCase();
  return haystack.includes(query);
}

export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (!next) {
      setQuery("");
      setActiveIndex(0);
    }
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        handleOpenChange(!open);
      }
      if (event.key === "Escape") {
        handleOpenChange(false);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const pool = q ? ALL_RESULTS.filter((r) => matches(r, q)) : ALL_RESULTS.slice(0, 8);
    return pool.slice(0, 20);
  }, [query]);

  function go(result: Result) {
    handleOpenChange(false);
    router.push(result.href);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="group hidden h-10 w-64 items-center gap-2.5 rounded-xl bg-secondary px-3.5 transition-[box-shadow,background-color] hover:bg-card focus-visible:bg-card focus-visible:ring-[3px] focus-visible:ring-ring/15 focus-visible:outline-none xl:flex"
        >
          <Search className="size-3.5 shrink-0 text-subtle-foreground" />
          <span className="min-w-0 flex-1 truncate text-left text-[13px] text-subtle-foreground">
            Search users, brands, logs…
          </span>
          <kbd className="rounded-md bg-card px-1.5 py-0.5 font-mono text-[10px] text-subtle-foreground shadow-xs">
            ⌘K
          </kbd>
        </button>
      </DialogTrigger>
      <DialogContent className="top-[16%] max-w-xl p-0" showClose={false}>
        <DialogTitle className="sr-only">Search the console</DialogTitle>
        <DialogDescription className="sr-only">
          Search pages, users, agencies and audit log entries.
        </DialogDescription>

        <div className="flex items-center gap-2.5 border-b border-border px-4 py-3.5">
          <Search className="size-4 shrink-0 text-subtle-foreground" />
          <input
            autoFocus
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIndex(0);
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setActiveIndex((i) => Math.min(i + 1, results.length - 1));
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setActiveIndex((i) => Math.max(i - 1, 0));
              } else if (e.key === "Enter" && results[activeIndex]) {
                go(results[activeIndex]);
              }
            }}
            placeholder="Search users, agencies, pages, logs…"
            aria-label="Search the console"
            className="min-w-0 flex-1 bg-transparent text-[14px] text-foreground outline-none placeholder:text-subtle-foreground"
          />
          <kbd className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[10px] text-subtle-foreground">
            Esc
          </kbd>
        </div>

        <div className="max-h-[360px] overflow-y-auto p-1.5">
          {results.length === 0 ? (
            <p className="px-3 py-8 text-center text-sm text-subtle-foreground">
              No matches for &ldquo;{query}&rdquo;.
            </p>
          ) : (
            results.map((result, index) => {
              const Icon = result.icon;
              return (
                <button
                  key={result.id}
                  type="button"
                  onClick={() => go(result)}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors",
                    index === activeIndex ? "bg-muted" : "hover:bg-muted",
                  )}
                >
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand-soft text-brand">
                    <Icon className="size-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13px] font-semibold text-foreground">
                      {result.title}
                    </p>
                    {result.subtitle ? (
                      <p className="truncate text-xs text-subtle-foreground">{result.subtitle}</p>
                    ) : null}
                  </div>
                  <span className="shrink-0 font-mono text-[10px] text-subtle-foreground uppercase">
                    {result.group}
                  </span>
                </button>
              );
            })
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
