"use client";

import { QuestCard } from "./quest-card";
import { quests } from "./quest-data";

const shell = "mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10";

export function QuestBoard() {
  return (
    <section id="courses" className="relative bg-background py-8 sm:py-10">
      <span id="saved" className="sr-only" />
      <span id="stash" className="sr-only" />
      <div className={shell}>
        <div className="mb-6 sm:mb-8">
          <p className="text-[10px] font-medium tracking-[0.28em] text-brand uppercase">
            Next objectives
          </p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
            What to clear next
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
            {quests.length} drops on the board. Save a quest or add it to your
            stash.
          </p>
        </div>

        <div className="grid gap-4 overflow-visible sm:grid-cols-2 xl:grid-cols-4">
          {quests.map((quest, index) => (
            <QuestCard key={quest.id} quest={quest} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
