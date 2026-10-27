import type { Metadata } from "next";

import { getProfile } from "@/features/profile/api/get-profile";
import { ProfileConsole } from "@/features/profile/components/profile-console";

export const metadata: Metadata = { title: "Profile" };

export default async function ProfilePage() {
  const data = await getProfile();

  return <ProfileConsole data={data} />;
}
