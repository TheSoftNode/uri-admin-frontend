"use client";

import { BellOff, CheckCheck } from "lucide-react";
import { useState } from "react";

import { SectionCard } from "@/components/data-display/section-card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NotificationRow } from "@/features/notifications/components/notification-row";
import { useNotifications } from "@/features/notifications/notifications-provider";

export function NotificationsConsole() {
  const { notifications, unread, markAsRead, markAllAsRead } = useNotifications();
  const [tab, setTab] = useState<"all" | "unread">("all");

  const visible = tab === "unread" ? notifications.filter((n) => !n.read) : notifications;

  return (
    <SectionCard
      title="Notifications"
      action={
        unread > 0 ? (
          <Button variant="ghost" size="sm" onClick={markAllAsRead}>
            <CheckCheck />
            Mark all read
          </Button>
        ) : undefined
      }
    >
      <div className="flex flex-col gap-4">
        <Tabs value={tab} onValueChange={(value) => setTab(value as "all" | "unread")}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">Unread{unread > 0 ? ` (${unread})` : ""}</TabsTrigger>
          </TabsList>
        </Tabs>

        {visible.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-14 text-center">
            <span className="flex size-11 items-center justify-center rounded-full bg-muted text-subtle-foreground">
              <BellOff className="size-4.5" />
            </span>
            <p className="text-sm font-semibold text-foreground">
              {tab === "unread" ? "You're all caught up" : "No notifications"}
            </p>
            <p className="text-xs text-subtle-foreground">
              {tab === "unread" ? "Nothing unread right now." : "Nothing has come through yet."}
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            {visible.map((notification) => (
              <NotificationRow
                key={notification.id}
                notification={notification}
                onOpen={markAsRead}
              />
            ))}
          </div>
        )}
      </div>
    </SectionCard>
  );
}
