"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/ui/components/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@repo/ui/components/field";
import { Input } from "@repo/ui/components/input";
import { applyApiFieldError, errorMessage } from "../utils/errors";
import { isGoogleEnabled } from "../utils/google";
import { useLogin } from "../hooks/use-login";
import { loginSchema, type LoginValues } from "../utils/schemas";
import { safeNextPath, signupPath } from "../utils/next-path";
import { FormStatus } from "./form-status";
import { GoogleSignInButton } from "./google-sign-in-button";

export function LoginForm() {
  const login = useLogin();
  const next = safeNextPath(useSearchParams().get("next"));
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
    },
  });

  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={form.handleSubmit((values) =>
        login.mutate(values, {
          onError: (error) => applyApiFieldError(error, form.setError),
        }),
      )}
      noValidate
    >
      <FormStatus error={login.error ? errorMessage(login.error) : undefined} />

      <FieldGroup>
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
      </FieldGroup>

      <Button type="submit" size="form" loading={login.isPending}>
        Continue
      </Button>

      {isGoogleEnabled ? (
        <>
          <FieldSeparator>or</FieldSeparator>
          <GoogleSignInButton mode="login" />
        </>
      ) : null}

      <p className="text-center text-sm text-muted-foreground">
        New to SkillQuest?{" "}
        <Link
          href={signupPath(next)}
          className="font-medium text-brand underline-offset-4 hover:underline"
        >
          Create an account
        </Link>
      </p>
    </form>
  );
}
