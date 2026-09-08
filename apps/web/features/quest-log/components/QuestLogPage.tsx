import type { User } from "@repo/types";
import { EmptyLog } from "./empty-log";
import { QuestLogFrame } from "./quest-log-frame";
import { StreakBrief } from "./streak-brief";

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
