"use client";

import { useState } from "react";

import { PageToolbar } from "@/components/layout/page-toolbar";
import { AgenciesStatsPanel } from "@/features/agencies/components/agencies-stats";
import { AgenciesTable } from "@/features/agencies/components/agencies-table";
import { AgencyDetailSheet } from "@/features/agencies/components/agency-detail-sheet";
import { CreateAgencySheet } from "@/features/agencies/components/create-agency-sheet";
import type { Agency, AgenciesPageData } from "@/features/agencies/types";

export function AgenciesConsole({ data }: { data: AgenciesPageData }) {
  const [agencies, setAgencies] = useState(data.agencies);
  const [selectedAgencyId, setSelectedAgencyId] = useState<string | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const selectedAgency = agencies.find((a) => a.id === selectedAgencyId) ?? null;

  const updateAgency = (agencyId: string, patch: Partial<Agency>) => {
    setAgencies((prev) => prev.map((a) => (a.id === agencyId ? { ...a, ...patch } : a)));
  };

  return (
    <div className="flex flex-col gap-5">
      <PageToolbar
        actions={
          <CreateAgencySheet onCreate={(agency) => setAgencies((prev) => [agency, ...prev])} />
        }
      />
      <AgenciesStatsPanel stats={data.stats} />
      <AgenciesTable
        agencies={agencies}
        onViewPortfolio={(agency) => {
          setSelectedAgencyId(agency.id);
          setSheetOpen(true);
        }}
      />

      <AgencyDetailSheet
        key={selectedAgencyId ?? "none"}
        agency={selectedAgency}
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        onTopUp={(agencyId, credits) => {
          const agency = agencies.find((a) => a.id === agencyId);
          if (!agency) return;
          updateAgency(agencyId, { walletCredits: agency.walletCredits + credits });
        }}
        onTogglePerBrandCaps={(agencyId, enabled) =>
          updateAgency(agencyId, { perBrandCaps: enabled })
        }
        onRename={(agencyId, name) => updateAgency(agencyId, { name })}
        onSetStatus={(agencyId, status) => updateAgency(agencyId, { status })}
      />
    </div>
  );
}
