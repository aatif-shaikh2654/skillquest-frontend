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
        description="Sign in to keep building skills with courses made for modern careers."
      >
        <LoginForm />
      </AuthShell>
    </MotionRoot>
  );
}
