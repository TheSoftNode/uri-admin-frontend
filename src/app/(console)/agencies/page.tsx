import { Plus } from "lucide-react";
import type { Metadata } from "next";

import { KpiGrid } from "@/components/data-display/kpi-grid";
import { PageToolbar } from "@/components/layout/page-toolbar";
import { Button } from "@/components/ui/button";
import { getAgencies } from "@/features/agencies/api/get-agencies";
import { AgenciesTable } from "@/features/agencies/components/agencies-table";

export const metadata: Metadata = { title: "Agencies" };

export default async function AgenciesPage() {
  const { kpis, agencies } = await getAgencies();

  return (
    <div className="flex flex-col gap-5">
      <PageToolbar
        actions={
          <Button>
            <Plus />
            Create agency
          </Button>
        }
      />
      <KpiGrid items={kpis} />
      <AgenciesTable agencies={agencies} />
    </div>
  );
}
