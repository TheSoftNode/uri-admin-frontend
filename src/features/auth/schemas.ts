import { z } from "zod";

export const credentialsSchema = z.object({
  email: z.email({ error: "Enter a valid work email." }),
  password: z.string().min(12, { error: "Admin passwords are at least 12 characters." }),
});

export type CredentialsInput = z.infer<typeof credentialsSchema>;

export const TOTP_LENGTH = 6;

export const totpSchema = z.object({
  code: z
    .string()
    .length(TOTP_LENGTH, { error: `Enter all ${TOTP_LENGTH} digits.` })
    .regex(/^\d+$/, { error: "Digits only." }),
});

export type TotpInput = z.infer<typeof totpSchema>;
