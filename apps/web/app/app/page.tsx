import type { Metadata } from "next";
import { getCurrentUser } from "@/features/auth/server";
import { QuestLogPage } from "@/features/quest-log";

export const metadata: Metadata = {
  title: "Quest log · SkillQuest",
};

export const dynamic = "force-dynamic";

export default async function StudentAppPage() {
  const user = await getCurrentUser();

  return <QuestLogPage user={user} />;
}
