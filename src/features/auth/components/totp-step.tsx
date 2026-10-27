"use client";

import { ArrowLeft, Loader2, ShieldCheck } from "lucide-react";
import { useState } from "react";

import { Callout } from "@/components/data-display/callout";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { TOTP_LENGTH, totpSchema } from "@/features/auth/schemas";

/** Slots share the row so the code fits any card width. */
const slotClassName = "w-auto min-w-0 flex-1";

interface TotpStepProps {
  email: string;
  onBack: () => void;
  onVerify: (code: string) => Promise<void>;
}

export function TotpStep({ email, onBack, onVerify }: TotpStepProps) {
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(false);

  async function verify(value: string) {
    const parsed = totpSchema.safeParse({ code: value });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Invalid code.");
      return;
    }
    setError(null);
    setVerifying(true);
    try {
      await onVerify(parsed.data.code);
    } finally {
      setVerifying(false);
    }
  }

  return (
    <div className="flex flex-col gap-7">
      <header className="flex flex-col gap-3">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex w-fit items-center gap-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" />
          Back
        </button>
        <h1 className="font-serif text-3xl font-semibold tracking-tight italic">
          Verify it&apos;s you
        </h1>
        <p className="text-[13.5px] leading-relaxed text-muted-foreground">
          Enter the 6-digit code from your authenticator app. Signing in as{" "}
          <span className="font-semibold text-foreground">{email}</span>.
        </p>
      </header>

      <form
        className="flex flex-col gap-5"
        onSubmit={(event) => {
          event.preventDefault();
          void verify(code);
        }}
      >
        <div className="flex flex-col gap-2">
          <InputOTP
            maxLength={TOTP_LENGTH}
            value={code}
            onChange={(value) => {
              setCode(value);
              setError(null);
            }}
            onComplete={(value: string) => void verify(value)}
            autoFocus
            aria-label="Authenticator code"
            aria-invalid={Boolean(error)}
            containerClassName="w-full"
          >
            <InputOTPGroup className="flex-1">
              <InputOTPSlot index={0} className={slotClassName} />
              <InputOTPSlot index={1} className={slotClassName} />
              <InputOTPSlot index={2} className={slotClassName} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup className="flex-1">
              <InputOTPSlot index={3} className={slotClassName} />
              <InputOTPSlot index={4} className={slotClassName} />
              <InputOTPSlot index={5} className={slotClassName} />
            </InputOTPGroup>
          </InputOTP>
          {error ? <p className="text-xs font-medium text-critical">{error}</p> : null}
        </div>

        <Button type="submit" size="lg" className="w-full" disabled={verifying}>
          {verifying ? <Loader2 className="animate-spin" /> : <ShieldCheck />}
          Verify &amp; sign in
        </Button>
      </form>

      <Callout tone="brand">
        This device isn&apos;t recognised. On success it&apos;s remembered for 7 days from Lagos, NG
        — unrecognised devices get a 15-minute step-up delay.
      </Callout>
    </div>
  );
}
