"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/ui/components/button";
import { Checkbox } from "@repo/ui/components/checkbox";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@repo/ui/components/field";
import { Input } from "@repo/ui/components/input";
import {
  applyApiFieldError,
  errorMessage,
  isEmailTakenError,
} from "../utils/errors";
import { isGoogleEnabled } from "../utils/google";
import { useSignup } from "../hooks/useSignup";
import { signupSchema, type SignupValues } from "../utils/schemas";
import { loginPath, safeNextPath } from "../utils/nextPath";
import { FormStatus } from "./FormStatus";
import { GoogleSignInButton } from "./GoogleSignInButton";

export function SignupForm() {
  const router = useRouter();
  const next = safeNextPath(useSearchParams().get("next"));
  const signup = useSignup();
  const form = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      full_name: "",
      email: "",
      acceptTerms: false,
    },
  });

  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={form.handleSubmit((values) =>
        signup.mutate(
          {
            full_name: values.full_name,
            email: values.email,
          },
          {
            onError: (error) => {
              if (isEmailTakenError(error)) {
                router.push(loginPath(next));
                return;
              }
              applyApiFieldError(error, form.setError);
            },
          },
        ),
      )}
      noValidate
    >
      <FormStatus
        error={
          signup.error && !isEmailTakenError(signup.error)
            ? errorMessage(signup.error)
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

      <Button type="submit" size="form" loading={signup.isPending}>
        Create account
      </Button>

      {isGoogleEnabled ? (
        <>
          <FieldSeparator>or</FieldSeparator>
          <GoogleSignInButton mode="login" />
        </>
      ) : null}

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href={loginPath(next)}
          className="font-medium text-brand underline-offset-4 hover:underline"
        >
          Login
        </Link>
      </p>
    </form>
  );
}
