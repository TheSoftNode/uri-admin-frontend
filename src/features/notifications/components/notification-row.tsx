import Link from "next/link";

import { kindMeta } from "@/features/notifications/lib";
import type { Notification } from "@/features/notifications/types";
import { formatDateTime } from "@/lib/format";
import { cn } from "@/lib/utils";

export function NotificationRow({
  notification,
  onOpen,
}: {
  notification: Notification;
  onOpen: (id: string) => void;
}) {
  const meta = kindMeta[notification.kind];
  const Icon = meta.icon;

  return (
    <Link
      href={notification.href}
      onClick={() => onOpen(notification.id)}
      className={cn(
        "flex items-start gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-muted",
        !notification.read && "bg-brand-soft/40 hover:bg-brand-soft/60",
      )}
    >
      <span
        className={cn(
          "flex size-8 shrink-0 items-center justify-center rounded-lg",
          meta.className,
        )}
      >
        <Icon className="size-4" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p className="text-[13px] font-semibold text-foreground">{notification.title}</p>
          {!notification.read ? (
            <span className="mt-1 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
          ) : null}
        </div>
        <p className="mt-0.5 line-clamp-2 text-xs text-subtle-foreground">{notification.detail}</p>
        <p className="mt-1 font-mono text-[10.5px] text-subtle-foreground">
          {formatDateTime(notification.createdAt)}
        </p>
      </div>
    </Link>
  );
}
