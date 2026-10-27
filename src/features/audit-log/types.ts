export type AuditCategory = "credit" | "subscription" | "admin" | "auth" | "access-code" | "alert";

export interface AuditEntry {
  id: string;
  actor: string;
  action: string;
  target: string;
  detail: string;
  whenIso: string;
  category: AuditCategory;
}

export interface AuditLogPageData {
  entries: AuditEntry[];
}
