"use client";

import { useEffect, useState } from "react";
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
} from "@repo/ui/components/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@repo/ui/components/input-otp";
import { applyApiFieldError, errorMessage } from "../utils/errors";
import { useResendOtp } from "../hooks/use-resend-otp";
import { useVerifyOtp } from "../hooks/use-verify-otp";
import { loginPath, safeNextPath } from "../utils/next-path";
import { verifyOtpSchema, type VerifyOtpValues } from "../utils/schemas";
import { FormStatus } from "./form-status";

const SLOT_COUNT = 6;
const RESEND_WAIT_SECONDS = 60;

type VerifyOtpFormProps = {
  email: string;
};

export function VerifyOtpForm({ email }: VerifyOtpFormProps) {
  const normalizedEmail = email.trim().toLowerCase();
  const next = safeNextPath(useSearchParams().get("next"));
  const verify = useVerifyOtp();
  const resend = useResendOtp();
  const [submittedCode, setSubmittedCode] = useState<string | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(RESEND_WAIT_SECONDS);
  const form = useForm<VerifyOtpValues>({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: { code: "" },
  });

  useEffect(() => {
    const id = window.setInterval(() => {
      setSecondsLeft((current) => (current <= 0 ? 0 : current - 1));
    }, 1000);

    return () => window.clearInterval(id);
  }, []);

  function submitCode(code: string) {
    if (verify.isPending || submittedCode === code) return;
    setSubmittedCode(code);
    verify.mutate(
      { email: normalizedEmail, code },
      {
        onError: (error) => {
          setSubmittedCode(null);
          applyApiFieldError(error, form.setError);
        },
      },
    );
  }

  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={form.handleSubmit((values) => submitCode(values.code))}
      noValidate
    >
      <p className="text-sm text-muted-foreground">
        Sent to{" "}
        <span className="font-medium text-foreground">{normalizedEmail}</span>
      </p>

      <FormStatus
        error={
          verify.error
            ? errorMessage(verify.error)
            : resend.error
              ? errorMessage(resend.error)
              : undefined
        }
        success={resend.isSuccess ? resend.data.message : undefined}
      />

      <FieldGroup>
        <Controller
          name="code"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid || undefined}>
              <FieldLabel htmlFor="code">From your email</FieldLabel>
              <InputOTP
                id="code"
                maxLength={SLOT_COUNT}
                value={field.value}
                disabled={verify.isPending}
                autoComplete="one-time-code"
                aria-invalid={fieldState.invalid || undefined}
                onChange={field.onChange}
                onComplete={submitCode}
              >
                <InputOTPGroup>
                  {Array.from({ length: SLOT_COUNT }, (_, index) => (
                    <InputOTPSlot key={index} index={index} />
                  ))}
                </InputOTPGroup>
              </InputOTP>
              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />
      </FieldGroup>

      <Button type="submit" size="form" loading={verify.isPending}>
        Verify and enter
      </Button>

      <Button
        type="button"
        variant="outline"
        size="form"
        loading={resend.isPending}
        disabled={secondsLeft > 0}
        onClick={() =>
          resend.mutate(
            { email: normalizedEmail },
            {
              onSuccess: () => setSecondsLeft(RESEND_WAIT_SECONDS),
            },
          )
        }
      >
        {secondsLeft > 0 ? `Resend in ${secondsLeft}s` : "Resend email"}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Wrong email?{" "}
        <Link
          href={loginPath(next)}
          className="font-medium text-brand underline-offset-4 hover:underline"
        >
          Start over
        </Link>
      </p>
    </form>
  );
}
