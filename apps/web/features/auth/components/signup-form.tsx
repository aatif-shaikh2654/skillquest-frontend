"use client";

import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/ui/components/button";
import { Checkbox } from "@repo/ui/components/checkbox";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@repo/ui/components/field";
import { Input } from "@repo/ui/components/input";
import { PasswordInput } from "@repo/ui/components/password-input";
import { useSignup } from "../hooks/use-signup";
import { signupSchema, type SignupValues } from "../schemas";
import { FormStatus } from "./form-status";

export function SignupForm() {
  const signup = useSignup();
  const form = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      full_name: "",
      email: "",
      phone_number: "",
      password: "",
      acceptTerms: false,
    },
  });

  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={form.handleSubmit((values) =>
        signup.mutate({
          full_name: values.full_name,
          email: values.email,
          phone_number: values.phone_number,
          password: values.password,
        }),
      )}
      noValidate
    >
      <FormStatus
        error={signup.error instanceof Error ? signup.error.message : undefined}
        success={
          signup.isSuccess
            ? "Account created. You can sign in when you're ready."
            : undefined
        }
      />

      <FieldGroup>
        <Controller
          name="full_name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid || undefined}>
              <FieldLabel htmlFor="full_name">Full name</FieldLabel>
              <Input
                {...field}
                id="full_name"
                size="form"
                autoComplete="name"
                placeholder="Your name"
                aria-invalid={fieldState.invalid || undefined}
              />
              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />

        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid || undefined}>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                {...field}
                id="email"
                size="form"
                type="email"
                autoComplete="email"
                placeholder="you@email.com"
                aria-invalid={fieldState.invalid || undefined}
              />
              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />

        <Controller
          name="phone_number"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid || undefined}>
              <FieldLabel htmlFor="phone_number">Phone number</FieldLabel>
              <Input
                {...field}
                id="phone_number"
                size="form"
                type="tel"
                inputMode="numeric"
                autoComplete="tel"
                placeholder="999999999"
                aria-invalid={fieldState.invalid || undefined}
              />
              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />

        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid || undefined}>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <PasswordInput
                {...field}
                id="password"
                size="form"
                autoComplete="new-password"
                placeholder="At least 8 characters"
                aria-invalid={fieldState.invalid || undefined}
              />
              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />

        <Controller
          name="acceptTerms"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid || undefined}>
              <div className="flex items-start gap-3">
                <Checkbox
                  id="acceptTerms"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  onBlur={field.onBlur}
                  aria-invalid={fieldState.invalid || undefined}
                  className="mt-0.5"
                />
                <FieldLabel
                  htmlFor="acceptTerms"
                  className="text-sm leading-relaxed font-normal tracking-normal normal-case"
                >
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    className="font-medium text-brand underline-offset-4 hover:underline"
                  >
                    Terms of Service
                  </Link>
                </FieldLabel>
              </div>
              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />
      </FieldGroup>

      <Button type="submit" size="form" disabled={signup.isPending}>
        {signup.isPending ? "Creating account…" : "Create account"}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-brand underline-offset-4 hover:underline"
        >
          Login
        </Link>
      </p>
    </form>
  );
}
