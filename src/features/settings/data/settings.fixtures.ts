import type { SettingsPageData } from "@/features/settings/types";

export const settingsFixture: SettingsPageData = {
  admins: [
    { email: "ada.okafor@urisocial.com", role: "super admin" },
    { email: "tunde.bello@urisocial.com", role: "support" },
    { email: "chidi.eze@urisocial.com", role: "support" },
  ],
  security: {
    toggles: [
      { id: "totp", label: "TOTP required for all admin accounts", enabled: true },
      {
        id: "password-only",
        label: "Password-only sign-in",
        description: "Disabled for every admin account class",
        enabled: false,
      },
    ],
    values: [
      { id: "trusted-device", label: "Trusted-device duration", value: "7 days" },
      { id: "step-up", label: "Step-up delay for new devices", value: "15 minutes" },
    ],
  },
  budgets: [
    {
      id: "apify",
      label: "Apify monthly cap",
      capDisplay: "$5,000",
      used: { display: "$2,118", share: 42 },
    },
    {
      id: "openai",
      label: "OpenAI monthly cap",
      capDisplay: "$12,000",
      used: { display: "$9,440", share: 79 },
    },
    { id: "jane-ads", label: "Jane Ads account cap default", capDisplay: "₦5,000,000" },
  ],
  listeningSources: [
    { id: "tiktok", label: "TikTok", enabled: true },
    { id: "reddit", label: "Reddit", enabled: true },
    { id: "news", label: "News / Web", enabled: false },
    { id: "instagram", label: "Instagram", enabled: false },
    { id: "youtube", label: "YouTube", enabled: false },
  ],
};
