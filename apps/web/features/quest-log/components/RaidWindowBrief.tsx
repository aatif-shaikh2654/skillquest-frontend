"use client";

import { Button } from "@repo/ui/components/button";
import { toast } from "@repo/ui/lib/toast";

type RaidWindowBriefProps = {
  onDismiss: () => void;
};

export function RaidWindowBrief({ onDismiss }: RaidWindowBriefProps) {
  return (
    <section className="border-l-2 border-brand bg-brand/5 px-3 py-4">
      <p className="text-[10px] font-medium tracking-[0.28em] text-brand uppercase">
        Raid window
      </p>
      <h2 className="mt-2 text-sm font-semibold tracking-tight">
        Set a raid window
      </h2>
      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
        Pick a daily slot so the log expects you.
      </p>
      <div className="mt-3 flex flex-col items-start gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => toast.info("Coming online")}
        >
          Set window
        </Button>
        <button
          type="button"
          className="text-xs font-medium text-brand underline-offset-4 hover:underline"
          onClick={onDismiss}
        >
          Dismiss
        </button>
      </div>
    </section>
  );
}
