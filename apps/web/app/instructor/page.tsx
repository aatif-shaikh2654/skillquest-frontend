import type { Metadata } from "next";
import { RequireAuth, SignedInHome } from "@/features/auth";

export const metadata: Metadata = {
  title: "Instructor · SkillQuest",
};

export default function InstructorAppPage() {
  return (
    <RequireAuth instructor>
      <SignedInHome />
    </RequireAuth>
  );
}
