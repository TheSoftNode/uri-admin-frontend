"use client";

import { Check, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import type { ReviewItem } from "@/features/moderation/types";

interface ReviewDetailSheetProps {
  item: ReviewItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApprove: (id: string) => void;
  onReject: (id: string, reason: string) => void;
  onReassign: (id: string, assignee: string) => void;
}

export function ReviewDetailSheet({
  item,
  open,
  onOpenChange,
  onApprove,
  onReject,
  onReassign,
}: ReviewDetailSheetProps) {
  const [reason, setReason] = useState("");
  const [assignee, setAssignee] = useState(item?.assignee ?? "");

  if (!item) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full gap-0 overflow-y-auto sm:max-w-md">
        <SheetHeader className="gap-1 border-b border-border pb-5">
          <SheetTitle>{item.brand}</SheetTitle>
          <SheetDescription>
            Quality score {item.qualityScore.toFixed(2)} · priority P{item.priority}
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-6 p-4">
          <section className="flex flex-col gap-2">
            <p className="text-[11px] font-semibold text-muted-foreground uppercase">
              Detected issues
            </p>
            {item.issues.length ? (
              <div className="flex flex-wrap gap-1.5">
                {item.issues.map((issue) => (
                  <Badge key={issue} variant="neutral" className="font-mono font-medium">
                    {issue}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-[13px] text-subtle-foreground">None detected.</p>
            )}
          </section>

          <Separator />

          <section className="flex flex-col gap-2.5">
            <p className="text-[11px] font-semibold text-muted-foreground uppercase">Reassign</p>
            <div className="flex gap-2">
              <Input
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
                placeholder="Reviewer name"
                className="h-9"
              />
              <Button
                size="sm"
                variant="outline"
                disabled={!assignee.trim() || assignee === item.assignee}
                onClick={() => {
                  onReassign(item.id, assignee.trim());
                  toast.success(`Assigned to ${assignee.trim()}.`);
                }}
              >
                Save
              </Button>
            </div>
          </section>

          {item.status === "pending" ? (
            <>
              <Separator />
              <section className="flex flex-col gap-2.5">
                <p className="text-[11px] font-semibold text-muted-foreground uppercase">
                  Decision
                </p>
                <Textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Reason, required to reject"
                  className="min-h-16 text-[13px]"
                />
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="soft"
                    onClick={() => {
                      onApprove(item.id);
                      toast.success("Approved.");
                      onOpenChange(false);
                    }}
                  >
                    <Check />
                    Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    disabled={!reason.trim()}
                    onClick={() => {
                      onReject(item.id, reason.trim());
                      toast.success("Rejected.");
                      onOpenChange(false);
                    }}
                  >
                    <X />
                    Reject
                  </Button>
                </div>
              </section>
            </>
          ) : null}
        </div>
      </SheetContent>
    </Sheet>
  );
}
