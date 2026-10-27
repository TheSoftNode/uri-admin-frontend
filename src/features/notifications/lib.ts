import {
  BellRing,
  Building2,
  Megaphone,
  Plug,
  ShieldAlert,
  Ticket,
  type LucideIcon,
} from "lucide-react";

import type { Notification, NotificationKind } from "@/features/notifications/types";

export const kindMeta: Record<NotificationKind, { icon: LucideIcon; className: string }> = {
  alert: { icon: BellRing, className: "bg-critical-soft text-critical" },
  moderation: { icon: ShieldAlert, className: "bg-warning-soft text-warning" },
  campaign: { icon: Megaphone, className: "bg-brand-soft text-brand" },
  "ad-platform": { icon: Plug, className: "bg-critical-soft text-critical" },
  inbox: { icon: BellRing, className: "bg-info-soft text-info" },
  agency: { icon: Building2, className: "bg-secondary text-muted-foreground" },
  "access-code": { icon: Ticket, className: "bg-info-soft text-info" },
};

export function unreadCount(notifications: Notification[]): number {
  return notifications.filter((n) => !n.read).length;
}
