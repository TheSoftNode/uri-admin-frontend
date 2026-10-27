"use client";

import { useState } from "react";

import { Callout, Code } from "@/components/data-display/callout";
import { PageToolbar } from "@/components/layout/page-toolbar";
import { AccessCodesTable } from "@/features/access-codes/components/access-codes-table";
import { CreateCodeSheet } from "@/features/access-codes/components/create-code-sheet";
import { Summary } from "@/features/access-codes/components/summary";
import type { AccessCodesPageData, AccessCodeRedemption } from "@/features/access-codes/types";

export function AccessCodesConsole({ data }: { data: AccessCodesPageData }) {
  const [codes, setCodes] = useState(data.codes);
  const [redemptionsByCode, setRedemptionsByCode] = useState(data.redemptionsByCode);

  const updateRedemption = (code: string, email: string, patch: Partial<AccessCodeRedemption>) => {
    setRedemptionsByCode((prev) => ({
      ...prev,
      [code]: (prev[code] ?? []).map((r) => (r.email === email ? { ...r, ...patch } : r)),
    }));
  };

  return (
    <div className="flex flex-col gap-5">
      <PageToolbar
        actions={<CreateCodeSheet onCreate={(code) => setCodes((prev) => [code, ...prev])} />}
      />
      <Callout tone="info">
        A redeemed code calls the same <Code>setUserSubscription</Code> path a real purchase would —
        it grants the plan tier above for its duration, then lapses back to free on its own.
        It&apos;s a separate mechanism from bonus credits, which <Code>adjustUserCredits</Code> on
        the Users page handles instead.
      </Callout>
      <Summary codes={codes} />
      <AccessCodesTable
        codes={codes}
        redemptionsByCode={redemptionsByCode}
        onRevokeCode={(code) =>
          setCodes((prev) => prev.map((c) => (c.code === code ? { ...c, isActive: false } : c)))
        }
        onDeleteCode={(code) => setCodes((prev) => prev.filter((c) => c.code !== code))}
        onRestoreRedemption={(code, email) =>
          updateRedemption(code, email, {
            effectiveStatus: "active",
            revokedAt: null,
            revocationReason: null,
          })
        }
        onRevokeRedemption={(code, email) =>
          updateRedemption(code, email, {
            effectiveStatus: "revoked",
            revokedAt: new Date().toISOString(),
            revocationReason: "Revoked by admin",
          })
        }
      />
    </div>
  );
}
