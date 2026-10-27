import { Lock } from "lucide-react";

import { BrandMark } from "@/components/layout/brand-mark";
import { Stagger, StaggerItem } from "@/components/motion/stagger";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-background px-4 py-12">
      <Stagger className="flex w-full max-w-[420px] flex-col gap-6">
        <StaggerItem>
          <BrandMark href="/login" />
        </StaggerItem>
        <StaggerItem>
          <div className="rounded-3xl border bg-card p-6 shadow-float sm:p-9">{children}</div>
        </StaggerItem>
        <StaggerItem>
          <p className="text-center text-[11px] leading-relaxed text-balance text-subtle-foreground">
            <Lock className="mr-1 inline size-3 -translate-y-px" />
            Hardware key or TOTP required. Password-only access is disabled for admin accounts.
          </p>
        </StaggerItem>
      </Stagger>
    </main>
  );
}
