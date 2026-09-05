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
        title="Start learning"
        description="Create your SkillQuest account and get into courses built for real work."
      >
        <SignupForm />
      </AuthShell>
    </MotionRoot>
  );
}
