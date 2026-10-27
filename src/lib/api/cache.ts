/**
 * Cache tags for server data. Mutations call `updateTag(cacheTags.x)` so every
 * view reading that data refreshes. One tag per backend resource.
 */
export const cacheTags = {
  overview: "overview",
  users: "users",
  billing: "billing",
  agencies: "agencies",
  accessCodes: "access-codes",
  moderation: "moderation",
  playbooks: "playbooks",
  campaigns: "campaigns",
  listening: "listening",
  alerts: "platform-alerts",
  systemHealth: "system-health",
  adPlatforms: "ad-platforms",
  inbox: "inbox",
  auditLog: "audit-log",
  settings: "settings",
} as const;
