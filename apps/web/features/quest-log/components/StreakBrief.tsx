import { cn } from "@repo/ui/lib/utils";
import { streakWeek } from "../quest-log-data";

export function StreakBrief() {
  return (
    <section aria-label="Weekly streak">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-[10px] font-medium tracking-[0.28em] text-brand uppercase">
            Week {streakWeek.range}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {streakWeek.stagesDone}/{streakWeek.stagesGoal} stages ·{" "}
            {streakWeek.weeks} weeks lit
          </p>
        </div>
      </div>

      <ol className="mt-4 grid grid-cols-7 border-y border-foreground/15">
        {streakWeek.days.map((day, index) => (
          <li
            key={day.label}
            className={cn(
              "flex flex-col items-center gap-1 px-1 py-3",
              index < streakWeek.days.length - 1 &&
                "border-r border-foreground/15",
            )}
          >
            <span className="text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
              {day.label}
            </span>
            <span
              className={cn(
                "font-mono text-lg font-semibold tabular-nums",
                day.lit ? "text-primary" : "text-foreground",
              )}
            >
              {day.date}
            </span>
            <span
              aria-hidden
              className={cn(
                "size-1.5",
                day.lit ? "bg-primary" : "bg-foreground/15",
              )}
            />
          </li>
        ))}
      </ol>
    </section>
  );
}
