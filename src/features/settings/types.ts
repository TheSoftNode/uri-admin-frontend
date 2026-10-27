export interface AdminAccount {
  email: string;
  role: "super admin" | "support";
}

export interface PolicyToggle {
  id: string;
  label: string;
  description?: string;
  enabled: boolean;
}

export interface PolicyValue {
  id: string;
  label: string;
  value: string;
}

export interface BudgetCap {
  id: string;
  label: string;
  capDisplay: string;
  /** Spend so far, when the cap is metered. */
  used?: { display: string; share: number };
}

export interface SettingsPageData {
  admins: AdminAccount[];
  security: { toggles: PolicyToggle[]; values: PolicyValue[] };
  budgets: BudgetCap[];
  listeningSources: PolicyToggle[];
}
