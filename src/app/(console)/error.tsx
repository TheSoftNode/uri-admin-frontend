"use client";

import { RefreshCw, TriangleAlert } from "lucide-react";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";

export default function ConsoleError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Hook point for error reporting (e.g. Sentry) once observability is wired.
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
      <span className="flex size-12 items-center justify-center rounded-2xl bg-critical-soft text-critical">
        <TriangleAlert className="size-5" />
      </span>
      <div className="flex flex-col gap-1">
        <h2 className="font-serif text-2xl font-semibold italic">This section failed to load</h2>
        <p className="text-sm text-muted-foreground">
          The rest of the console is unaffected.{" "}
          {error.digest ? `Reference ${error.digest}.` : null}
        </p>
      </div>
      <Button onClick={reset} variant="secondary">
        <RefreshCw />
        Try again
      </Button>
    </div>
  );
}
