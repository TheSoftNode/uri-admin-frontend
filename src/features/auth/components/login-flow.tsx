"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { CredentialsStep } from "@/features/auth/components/credentials-step";
import { TotpStep } from "@/features/auth/components/totp-step";
import type { CredentialsInput } from "@/features/auth/schemas";
import { duration, ease } from "@/lib/motion";

type Step = { name: "credentials" } | { name: "totp"; email: string };

const stepMotion = {
  initial: (direction: number) => ({ opacity: 0, x: 24 * direction }),
  animate: { opacity: 1, x: 0 },
  exit: (direction: number) => ({ opacity: 0, x: -24 * direction }),
};

/**
 * Two-step operator sign-in. Both steps currently resolve locally; they will
 * call the auth API (password check, then TOTP verify) once the backend exists.
 */
export function LoginFlow() {
  const router = useRouter();
  const [step, setStep] = useState<Step>({ name: "credentials" });
  const [direction, setDirection] = useState(1);
  const [lastEmail, setLastEmail] = useState("ops@urisocial.com");

  async function handleCredentials(values: CredentialsInput) {
    // TODO(auth): POST /auth/admin/password → returns a short-lived TOTP challenge.
    await new Promise((resolve) => setTimeout(resolve, 450));
    setLastEmail(values.email);
    setDirection(1);
    setStep({ name: "totp", email: values.email });
  }

  async function handleVerify() {
    // TODO(auth): POST /auth/admin/totp → sets the session cookie.
    await new Promise((resolve) => setTimeout(resolve, 450));
    toast.success("Signed in", { description: "Welcome back." });
    router.push("/overview");
  }

  return (
    <div className="relative">
      <AnimatePresence mode="wait" custom={direction} initial={false}>
        <motion.div
          key={step.name}
          custom={direction}
          variants={stepMotion}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: duration.base, ease: ease.out }}
        >
          {step.name === "credentials" ? (
            <CredentialsStep defaultEmail={lastEmail} onSubmit={handleCredentials} />
          ) : (
            <TotpStep
              email={step.email}
              onBack={() => {
                setDirection(-1);
                setStep({ name: "credentials" });
              }}
              onVerify={handleVerify}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
