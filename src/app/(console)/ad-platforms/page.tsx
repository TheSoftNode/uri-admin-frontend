import type { Metadata } from "next";

import { getAdPlatforms } from "@/features/ad-platforms/api/get-ad-platforms";
import { AdPlatformsConsole } from "@/features/ad-platforms/components/ad-platforms-console";

export const metadata: Metadata = { title: "Ad Platforms" };

export default async function AdPlatformsPage() {
  const data = await getAdPlatforms();

  return <AdPlatformsConsole data={data} />;
}
