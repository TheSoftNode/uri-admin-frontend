"use client";

import { Flag } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import type { Playbook } from "@/features/playbooks/types";

interface PlaybookDetailSheetProps {
  playbook: Playbook | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/** Read-only by design — this page has no moderation step on self-reported
 * brand data (see the page's own Callout). It exists so support can see the
 * full record without a database query, not to edit it. */
export function PlaybookDetailSheet({ playbook, open, onOpenChange }: PlaybookDetailSheetProps) {
  if (!playbook) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full gap-0 overflow-y-auto sm:max-w-md">
        <SheetHeader className="gap-2 border-b border-border pb-5">
          <SheetTitle>{playbook.brand}</SheetTitle>
          <SheetDescription>
            {playbook.industry} · <span className="capitalize">{playbook.stage}</span> stage
          </SheetDescription>
          <div className="flex flex-wrap items-center gap-1.5">
            {playbook.targetPlatforms.map((platform) => (
              <Badge key={platform} variant="neutral" className="font-mono font-medium">
                {platform}
              </Badge>
            ))}
            {playbook.complianceFlagged ? (
              <Badge variant="warning">
                <Flag />
                flagged
              </Badge>
            ) : null}
          </div>
        </SheetHeader>

        <div className="flex flex-col gap-6 p-4">
          <section className="flex flex-col gap-2">
            <p className="text-[11px] font-semibold text-muted-foreground uppercase">
              Content pillars
            </p>
            <div className="flex flex-wrap gap-1.5">
              {playbook.contentPillars.map((pillar) => (
                <Badge key={pillar} variant="brand">
                  {pillar}
                </Badge>
              ))}
            </div>
          </section>

          <Separator />

          <section className="flex flex-col gap-1.5">
            <p className="text-[11px] font-semibold text-muted-foreground uppercase">Brand voice</p>
            <p className="text-[13px] leading-relaxed text-foreground">{playbook.brandVoice}</p>
          </section>

          <Separator />

          <section className="flex flex-col gap-1.5">
            <p className="text-[11px] font-semibold text-muted-foreground uppercase">Guardrails</p>
            <p className="text-[13px] leading-relaxed text-foreground">{playbook.guardrails}</p>
          </section>

          {playbook.complianceNotes ? (
            <>
              <Separator />
              <section className="flex flex-col gap-1.5 rounded-xl bg-warning-soft p-3.5">
                <p className="text-[11px] font-semibold text-warning uppercase">Compliance notes</p>
                <p className="text-[13px] leading-relaxed text-foreground">
                  {playbook.complianceNotes}
                </p>
              </section>
            </>
          ) : null}
        </div>
      </SheetContent>
    </Sheet>
  );
}
