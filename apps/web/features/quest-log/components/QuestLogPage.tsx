import type { User } from "@repo/types";
import { EmptyLog } from "./EmptyLog";
import { QuestLogFrame } from "./QuestLogFrame";
import { StreakBrief } from "./StreakBrief";

type QuestLogPageProps = {
  user: User | null;
};

export function QuestLogPage({ user }: QuestLogPageProps) {
  return (
    <QuestLogFrame user={user}>
      <StreakBrief />
      <EmptyLog />
    </QuestLogFrame>
  );
}
