import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-5 px-6 text-center">
      <p className="font-mono text-xs font-semibold tracking-[0.2em] text-brand uppercase">404</p>
      <h1 className="font-serif text-4xl font-semibold italic">Page not found</h1>
      <p className="max-w-sm text-sm text-muted-foreground">
        This section doesn&apos;t exist in the console, or you don&apos;t have access to it.
      </p>
      <Button asChild>
        <Link href="/overview">Back to overview</Link>
      </Button>
    </main>
  );
}
