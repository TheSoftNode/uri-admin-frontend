"use client";

import { Laptop, LogOut, ShieldCheck, Smartphone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { SectionCard } from "@/components/data-display/section-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { currentOperator } from "@/config/site";
import type { ProfilePageData, TrustedDevice } from "@/features/profile/types";

function DeviceRow({
  device,
  onRevoke,
}: {
  device: TrustedDevice;
  onRevoke: (id: string) => void;
}) {
  const Icon = device.label.toLowerCase().includes("iphone") ? Smartphone : Laptop;

  return (
    <div className="flex items-center gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-muted">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand">
        <Icon className="size-4" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-[13.5px] font-semibold text-foreground">{device.label}</p>
          {device.current ? <Badge variant="brand">this device</Badge> : null}
        </div>
        <p className="text-xs text-subtle-foreground">
          {device.location} · {device.lastActive} · trust expires in {device.expiresInDays}d
        </p>
      </div>
      {device.current ? null : (
        <Button
          variant="ghost"
          size="sm"
          className="text-critical hover:bg-critical-soft"
          onClick={() => {
            onRevoke(device.id);
            toast.success(`Revoked trust for ${device.label}.`);
          }}
        >
          Revoke
        </Button>
      )}
    </div>
  );
}

export function ProfileConsole({ data }: { data: ProfilePageData }) {
  const [devices, setDevices] = useState(data.devices);

  return (
    <div className="flex max-w-2xl flex-col gap-5">
      <SectionCard title="Profile" description="Your own account on this console">
        <div className="flex items-center gap-4">
          <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-brand to-brand-deep text-base font-bold text-white">
            {currentOperator.initials}
          </div>
          <div>
            <p className="text-[15px] font-bold text-foreground">{currentOperator.name}</p>
            <p className="text-sm text-subtle-foreground">{currentOperator.email}</p>
            <Badge variant="brand" className="mt-1.5">
              {currentOperator.role}
            </Badge>
          </div>
        </div>
      </SectionCard>

      <SectionCard
        title="Security & devices"
        description="TOTP and trusted-device policy apply to every admin account"
        className="scroll-mt-20"
      >
        <div id="security" className="flex flex-col gap-5">
          <div className="flex items-center justify-between rounded-xl bg-success-soft px-3.5 py-2.5">
            <span className="flex items-center gap-2 text-[13px] font-medium text-success">
              <ShieldCheck className="size-4" />
              Two-factor authentication enabled
            </span>
          </div>

          <p className="text-xs text-subtle-foreground">
            Trusted devices stay signed in for {data.trustedDeviceDays} days. An unrecognised device
            gets a {data.stepUpDelayMinutes}-minute step-up delay.
          </p>

          <Separator />

          <div className="flex flex-col gap-1">
            <p className="mb-1 text-[11px] font-semibold text-muted-foreground uppercase">
              Trusted devices
            </p>
            {devices.map((device) => (
              <DeviceRow
                key={device.id}
                device={device}
                onRevoke={(id) => setDevices((prev) => prev.filter((d) => d.id !== id))}
              />
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            className="w-fit text-critical hover:bg-critical-soft"
            onClick={() => {
              setDevices((prev) => prev.filter((d) => d.current));
              toast.success("Signed out of all other sessions.");
            }}
          >
            <LogOut />
            Sign out of all other sessions
          </Button>
        </div>
      </SectionCard>
    </div>
  );
}
