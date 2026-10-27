export type NotificationKind =
  "alert" | "moderation" | "campaign" | "ad-platform" | "inbox" | "agency" | "access-code";

export interface Notification {
  id: string;
  kind: NotificationKind;
  title: string;
  detail: string;
  /** Deep link into the page that owns this notification's data. */
  href: string;
  createdAt: string;
  read: boolean;
}

export interface NotificationsPageData {
  notifications: Notification[];
}
