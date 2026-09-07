import { Suspense } from "react";
import type { Metadata } from "next";
import { AuthShell, SignupForm } from "@/features/auth";
import { MotionRoot } from "@/features/landing";

export const metadata: Metadata = {
  title: "Create account · SkillQuest",
};

export default function SignupPage() {
  return (
    <MotionRoot>
      <AuthShell
        variant="student"
        title="Create your account"
        description="Enter your name and email. We’ll send a message so you can confirm and enter the quest."
      >
        <Suspense>
          <SignupForm />
        </Suspense>
      </AuthShell>
    </MotionRoot>
  );
}
