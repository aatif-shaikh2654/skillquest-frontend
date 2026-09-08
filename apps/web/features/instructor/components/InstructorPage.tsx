"use client";

import { useAuth } from "@/features/auth";
import { MotionRoot } from "@/features/landing";
import { BecomeInstructorWizard } from "./BecomeInstructorWizard";
import { InstructorDesk } from "./InstructorDesk";

export function InstructorPage() {
  const { user } = useAuth();

  if (!user) return null;

  if (user.is_instructor) {
    return <InstructorDesk />;
  }

  return (
    <MotionRoot>
      <BecomeInstructorWizard />
    </MotionRoot>
  );
}
