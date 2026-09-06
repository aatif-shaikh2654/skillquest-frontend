export const logTabs = [
  "All quests",
  "Saved",
  "Stash",
  "Cleared",
  "Tools",
] as const;

export type LogTab = (typeof logTabs)[number];

export const playerStats = {
  xp: 2450,
  streak: 4,
  cleared: 3,
  rank: "Novice",
};

export const streakWeek = {
  weeks: 0,
  stagesDone: 0,
  stagesGoal: 5,
  range: "Sep 6 — 12",
  days: [
    { label: "Sun", date: 6, lit: false },
    { label: "Mon", date: 7, lit: false },
    { label: "Tue", date: 8, lit: false },
    { label: "Wed", date: 9, lit: false },
    { label: "Thu", date: 10, lit: false },
    { label: "Fri", date: 11, lit: false },
    { label: "Sat", date: 12, lit: false },
  ],
};

export const enrolledQuests: [] = [];

export function playerFirstName(fullName: string) {
  return fullName.trim().split(/\s+/)[0] ?? fullName;
}
