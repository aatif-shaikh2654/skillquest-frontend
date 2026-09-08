"use client";

import { useAuth } from "@/features/auth";
import { MotionRoot } from "@/features/landing";
import { BecomeInstructorWizard } from "./become-instructor-wizard";
import { InstructorDesk } from "./instructor-desk";

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
