"use client";

import { toast } from "@repo/ui/lib/toast";
import { cn } from "@repo/ui/lib/utils";
import { logTabs, type LogTab } from "../quest-log-data";

type LogTabsProps = {
  active: LogTab;
  onChange: (tab: LogTab) => void;
};

export function LogTabs({ active, onChange }: LogTabsProps) {
  return (
    <nav aria-label="Quest log sections">
      <ol className="flex gap-1 overflow-x-auto lg:flex-col lg:overflow-visible">
        {logTabs.map((tab, index) => {
          const selected = tab === active;

          return (
            <li key={tab} className="shrink-0">
              <button
                type="button"
                className={cn(
                  "flex w-full items-baseline gap-3 px-2 py-2 text-left text-sm tracking-tight whitespace-nowrap",
                  selected
                    ? "bg-foreground text-white"
                    : "text-muted-foreground hover:bg-foreground/5 hover:text-foreground",
                )}
                aria-current={selected ? "page" : undefined}
                onClick={() => {
                  if (tab === "All quests") {
                    onChange(tab);
                    return;
                  }

                  toast.info("Coming online");
                }}
              >
                <span className="font-mono text-[10px] tracking-[0.16em]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {tab}
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
