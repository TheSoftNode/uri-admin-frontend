"use client";

import { ShieldCheck, ShieldOff } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/features/listening/components/empty-state";
import type { SourcePermission } from "@/features/listening/types";
import { toneSoftBg, toneText } from "@/lib/tone";
import { cn } from "@/lib/utils";

interface SourcesTabProps {
  sources: SourcePermission[];
  onToggle: (source: SourcePermission) => void;
}

export function SourcesTab({ sources, onToggle }: SourcesTabProps) {
  const [busySource, setBusySource] = useState<string | null>(null);

  if (sources.length === 0) {
    return (
      <EmptyState
        icon={ShieldCheck}
        title="No source permission records yet"
        description="Each connector (X, X Pro, …) gets a permission record — terms, allowed use, retention and display rules — approved before it can collect anything."
      />
    );
  }

  const toggle = (s: SourcePermission) => {
    setBusySource(s.source);
    onToggle(s);
    toast.success(
      s.approved
        ? `${s.source} revoked — collection stops on its next run.`
        : `${s.source} approved — collection resumes on its next run.`,
    );
    setBusySource(null);
  };

  return (
    <Stagger className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {sources.map((s) => (
        <StaggerItem key={s.source}>
          <Card>
            <CardContent className="space-y-3 p-4">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-lg",
                      toneSoftBg[s.approved ? "success" : "critical"],
                      toneText[s.approved ? "success" : "critical"],
                    )}
                  >
                    {s.approved ? (
                      <ShieldCheck className="h-4 w-4" />
                    ) : (
                      <ShieldOff className="h-4 w-4" />
                    )}
                  </div>
                  <div className="text-[14px] font-semibold text-foreground">{s.source}</div>
                </div>
                <Badge variant={s.approved ? "default" : "destructive"} className="text-[10px]">
                  {s.approved ? "Approved" : "Revoked"}
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[12px] text-muted-foreground">
                <div>
                  <span className="text-foreground">Retention:</span> {s.retentionDays ?? "—"} days
                </div>
                <div>
                  <span className="text-foreground">Approved by:</span> {s.approvedBy || "—"}
                </div>
                <div className="col-span-2">
                  <span className="text-foreground">Allowed use:</span>{" "}
                  {s.allowedUse.join(", ") || "—"}
                </div>
                {s.displayRules && (
                  <div className="col-span-2">
                    <span className="text-foreground">Display rules:</span> max{" "}
                    {s.displayRules.maxExcerptChars ?? "—"} chars
                    {s.displayRules.requireLink ? ", link required" : ""}
                    {s.displayRules.requireAttribution ? ", attribution required" : ""}
                  </div>
                )}
                {s.notes && (
                  <div className="col-span-2 text-muted-foreground italic">{s.notes}</div>
                )}
              </div>
              <Button
                size="sm"
                variant={s.approved ? "outline" : "default"}
                disabled={busySource === s.source}
                onClick={() => toggle(s)}
              >
                {s.approved ? (
                  <ShieldOff className="h-3.5 w-3.5" />
                ) : (
                  <ShieldCheck className="h-3.5 w-3.5" />
                )}
                {s.approved ? "Revoke" : "Approve"}
              </Button>
            </CardContent>
          </Card>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
