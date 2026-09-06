import type { Metadata } from "next";
import { AuthShell, LoginForm } from "@/features/auth";
import { MotionRoot } from "@/features/landing";

export const metadata: Metadata = {
  title: "Sign in · SkillQuest",
};

export default function LoginPage() {
  return (
    <MotionRoot>
      <AuthShell
        title="Welcome back"
        description="Enter your email and we’ll send you a message to sign in."
      >
        <LoginForm />
      </AuthShell>
    </MotionRoot>
  );
}
