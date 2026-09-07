import type { Metadata } from "next";
import { RequireAuth } from "@/features/auth";
import { InstructorPage } from "@/features/instructor";

export const metadata: Metadata = {
  title: "Instructor · SkillQuest",
};

export default function InstructorAppPage() {
  return (
    <RequireAuth>
      <InstructorPage />
    </RequireAuth>
  );
}
