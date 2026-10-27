import type { ProfilePageData } from "@/features/profile/types";

export const profileFixture: ProfilePageData = {
  totpEnabled: true,
  trustedDeviceDays: 7,
  stepUpDelayMinutes: 15,
  devices: [
    {
      id: "dev_01",
      label: "Chrome on macOS",
      location: "Lagos, NG",
      lastActive: "Active now",
      current: true,
      expiresInDays: 7,
    },
    {
      id: "dev_02",
      label: "Safari on iPhone",
      location: "Lagos, NG",
      lastActive: "2d ago",
      current: false,
      expiresInDays: 5,
    },
    {
      id: "dev_03",
      label: "Chrome on Windows",
      location: "Abuja, NG",
      lastActive: "6d ago",
      current: false,
      expiresInDays: 1,
    },
  ],
};
