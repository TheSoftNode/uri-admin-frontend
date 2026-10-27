import type { LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

/** Matches ListeningCurationPage.tsx's EmptyState exactly. */
export function EmptyState({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center gap-2 px-6 py-14 text-center">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-muted text-muted-foreground">
          <Icon className="h-5 w-5" />
        </div>
        <div className="text-sm font-medium text-foreground">{title}</div>
        <div className="max-w-sm text-[13px] text-muted-foreground">{description}</div>
      </CardContent>
    </Card>
  );
}
