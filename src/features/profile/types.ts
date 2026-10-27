export interface TrustedDevice {
  id: string;
  label: string;
  location: string;
  lastActive: string;
  /** This browser's own session. */
  current: boolean;
  /** Days left before the 7-day trust window expires. */
  expiresInDays: number;
}

export interface ProfilePageData {
  totpEnabled: boolean;
  trustedDeviceDays: number;
  stepUpDelayMinutes: number;
  devices: TrustedDevice[];
}
