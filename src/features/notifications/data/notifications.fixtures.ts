import type { Notification } from "@/features/notifications/types";

/** Cross-referenced against the real data already in each owning feature —
 * same entities, same kinds, same ids where one exists (e.g. the alert
 * kind matches a real row on /alerts) rather than inventing parallel data. */
export const notificationsFixture: Notification[] = [
  {
    id: "ntf_01",
    kind: "alert",
    title: "OpenAI account out of credit",
    detail: "182 occurrences in the last 30 minutes — every brand on the shared key is affected.",
    href: "/alerts",
    createdAt: "2026-10-27T13:58:00Z",
    read: false,
  },
  {
    id: "ntf_02",
    kind: "campaign",
    title: "Account-cap breach — Blueprint Digital",
    detail: "Spend exceeded its ₦6,000,000 cap by ₦240,000.",
    href: "/campaigns",
    createdAt: "2026-10-27T13:40:00Z",
    read: false,
  },
  {
    id: "ntf_03",
    kind: "moderation",
    title: "3 mandatory reviews pending",
    detail: "Naija Glow Cosmetics and 2 others are waiting on a quality review.",
    href: "/moderation",
    createdAt: "2026-10-27T12:30:00Z",
    read: false,
  },
  {
    id: "ntf_04",
    kind: "ad-platform",
    title: "Meta Ads token invalid — Volta Energy Drinks",
    detail: "The connection has been down for 2 days. Error rate is 100%.",
    href: "/ad-platforms",
    createdAt: "2026-10-26T09:00:00Z",
    read: true,
  },
  {
    id: "ntf_05",
    kind: "inbox",
    title: "Meta token expiring — Lagos Wigs Co.",
    detail: "Inbox connection expires in 3 days.",
    href: "/inbox",
    createdAt: "2026-10-26T06:00:00Z",
    read: true,
  },
  {
    id: "ntf_06",
    kind: "agency",
    title: "Afrobeats PR Group suspended",
    detail: "Wallet depleted — the agency's content tools are now locked.",
    href: "/agencies",
    createdAt: "2026-10-25T15:00:00Z",
    read: true,
  },
  {
    id: "ntf_07",
    kind: "access-code",
    title: "VIPINVITE roster still pending",
    detail: "3 people invited, 0 redeemed after 3 days.",
    href: "/access-codes",
    createdAt: "2026-10-24T09:00:00Z",
    read: true,
  },
];
