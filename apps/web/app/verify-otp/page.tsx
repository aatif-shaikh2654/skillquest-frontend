import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell, VerifyOtpForm, loginPath } from "@/features/auth";
import { MotionRoot } from "@/features/landing";

export const metadata: Metadata = {
  title: "Check your email · SkillQuest",
};

type VerifyOtpPageProps = {
  searchParams: Promise<{ email?: string; next?: string }>;
};

export default async function VerifyOtpPage({
  searchParams,
}: VerifyOtpPageProps) {
  const { email, next } = await searchParams;

  return (
    <MotionRoot>
      <AuthShell
        title="Check your email"
        description="Open the message we sent, then enter it below."
      >
        {email ? (
          <Suspense>
            <VerifyOtpForm email={email} />
          </Suspense>
        ) : (
          <p className="text-sm text-muted-foreground">
            Missing email.{" "}
            <Link
              href={loginPath(next)}
              className="font-medium text-brand underline-offset-4 hover:underline"
            >
              Go to login
            </Link>
          </p>
        )}
      </AuthShell>
    </MotionRoot>
  );
}
