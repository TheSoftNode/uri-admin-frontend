"use client";

import { useState } from "react";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { curationTabs, type CurationTab } from "@/features/listening/types";

/** Section switcher for the curation console; Review is the only tab wired today. */
export function CurationTabs() {
  const [tab, setTab] = useState<CurationTab>("Review");

  return (
    <Tabs value={tab} onValueChange={(value) => setTab(value as CurationTab)}>
      <TabsList>
        {curationTabs.map((item) => (
          <TabsTrigger key={item} value={item}>
            {item}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
