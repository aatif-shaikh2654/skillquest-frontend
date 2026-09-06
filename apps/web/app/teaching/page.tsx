import type { Metadata } from "next";
import { TeachingPage } from "@/features/teaching";

export const metadata: Metadata = {
  title: "Teach on SkillQuest",
  description:
    "Open an instructor desk on SkillQuest. Design staged quests, award XP, and coach learners who want real work skills.",
};

export default function TeachingRoutePage() {
  return <TeachingPage />;
}
