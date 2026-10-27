"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2, Lock, Mail } from "lucide-react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { credentialsSchema, type CredentialsInput } from "@/features/auth/schemas";

interface CredentialsStepProps {
  defaultEmail?: string;
  onSubmit: (values: CredentialsInput) => Promise<void>;
}

export function CredentialsStep({ defaultEmail = "", onSubmit }: CredentialsStepProps) {
  const form = useForm<CredentialsInput>({
    resolver: zodResolver(credentialsSchema),
    defaultValues: { email: defaultEmail, password: "" },
  });
  const submitting = form.formState.isSubmitting;

  return (
    <div className="flex flex-col gap-7">
      <header className="flex flex-col gap-3">
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-brand-soft px-2.5 py-1 text-[10.5px] font-bold tracking-[0.08em] text-brand uppercase">
          <Lock className="size-3" />
          Restricted access
        </span>
        <h1 className="font-serif text-3xl font-semibold tracking-tight italic">
          Sign in to the console
        </h1>
        <p className="text-[13.5px] leading-relaxed text-muted-foreground">
          Platform operators only. Every attempt — successful or not — is written to the audit log.
        </p>
      </header>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Work email</FormLabel>
                <div className="relative">
                  <Mail className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-subtle-foreground" />
                  <FormControl>
                    <Input
                      type="email"
                      autoComplete="username"
                      placeholder="you@urisocial.com"
                      className="h-11 pl-10"
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <div className="relative">
                  <Lock className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-subtle-foreground" />
                  <FormControl>
                    <Input
                      type="password"
                      autoComplete="current-password"
                      placeholder="••••••••••••"
                      className="h-11 pl-10"
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" size="lg" className="mt-2 w-full" disabled={submitting}>
            {submitting ? <Loader2 className="animate-spin" /> : null}
            Continue
            {!submitting ? <ArrowRight /> : null}
          </Button>
        </form>
      </Form>
    </div>
  );
}
