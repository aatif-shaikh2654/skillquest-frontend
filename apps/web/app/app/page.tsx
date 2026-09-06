import type { Metadata } from "next";
import { RequireAuth, SignedInHome } from "@/features/auth";

export const metadata: Metadata = {
  title: "Quest · SkillQuest",
};

export default function StudentAppPage() {
  return (
    <RequireAuth>
      <SignedInHome />
    </RequireAuth>
  );
}
