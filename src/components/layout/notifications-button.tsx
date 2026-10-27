"use client";

import { Bell, CheckCheck } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { NotificationRow } from "@/features/notifications/components/notification-row";
import { useNotifications } from "@/features/notifications/notifications-provider";

const PREVIEW_COUNT = 5;

export function NotificationsButton() {
  const { notifications, unread, markAsRead, markAllAsRead } = useNotifications();
  const preview = notifications.slice(0, PREVIEW_COUNT);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="secondary"
          size="icon"
          className="relative"
          aria-label={`Notifications, ${unread} unread`}
        >
          <Bell className="size-[17px]" strokeWidth={1.9} />
          {unread > 0 ? (
            <span className="absolute top-2.5 right-2.5 flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-brand" />
            </span>
          ) : null}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="p-0">
        <div className="flex items-center justify-between border-b border-border px-3.5 py-3">
          <p className="text-[13px] font-bold text-foreground">Notifications</p>
          {unread > 0 ? (
            <button
              type="button"
              onClick={markAllAsRead}
              className="inline-flex items-center gap-1 text-[11.5px] font-semibold text-brand hover:underline"
            >
              <CheckCheck className="size-3.5" />
              Mark all read
            </button>
          ) : null}
        </div>

        {preview.length === 0 ? (
          <p className="px-3.5 py-8 text-center text-sm text-subtle-foreground">
            You&apos;re all caught up.
          </p>
        ) : (
          <div className="flex flex-col gap-0.5 p-1.5">
            {preview.map((notification) => (
              <NotificationRow
                key={notification.id}
                notification={notification}
                onOpen={markAsRead}
              />
            ))}
          </div>
        )}

        <Link
          href="/notifications"
          className="block border-t border-border px-3.5 py-2.5 text-center text-[12.5px] font-semibold text-brand hover:bg-muted"
        >
          View all notifications
        </Link>
      </PopoverContent>
    </Popover>
  );
}
