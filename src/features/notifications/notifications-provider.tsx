"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

import { unreadCount } from "@/features/notifications/lib";
import type { Notification } from "@/features/notifications/types";

interface NotificationsContextValue {
  notifications: Notification[];
  unread: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
}

const NotificationsContext = createContext<NotificationsContextValue | null>(null);

/** Mounted once in the console layout so the topbar's dropdown and the
 * /notifications page read and mutate the same state — read status
 * shouldn't reset just because you navigated between them. */
export function NotificationsProvider({
  initial,
  children,
}: {
  initial: Notification[];
  children: ReactNode;
}) {
  const [notifications, setNotifications] = useState(initial);

  const value = useMemo<NotificationsContextValue>(
    () => ({
      notifications,
      unread: unreadCount(notifications),
      markAsRead: (id) =>
        setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n))),
      markAllAsRead: () => setNotifications((prev) => prev.map((n) => ({ ...n, read: true }))),
    }),
    [notifications],
  );

  return <NotificationsContext.Provider value={value}>{children}</NotificationsContext.Provider>;
}

export function useNotifications(): NotificationsContextValue {
  const context = useContext(NotificationsContext);
  if (!context) {
    throw new Error("useNotifications must be used within a NotificationsProvider");
  }
  return context;
}
