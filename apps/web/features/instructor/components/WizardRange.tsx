"use client";

import { motion, useReducedMotion } from "framer-motion";
import { HudCorners } from "@repo/ui/components/hud-corners";
import { cn } from "@repo/ui/lib/utils";
import { slam, STAGES } from "../utils/constants";

const marks = ["Teach", "Tape", "Crowd", "Topic"] as const;

type WizardRangeProps = {
  step: number;
};

export function WizardRange({ step }: WizardRangeProps) {
  const reduced = useReducedMotion();

  return (
    <aside className="relative border border-foreground/10 bg-card px-4 py-4 sm:px-5">
      <HudCorners size="sm" tone="ink" />
      <div className="flex items-center justify-between gap-3 text-[10px] font-medium tracking-[0.28em] uppercase">
        <span className="text-brand">Range</span>
        <span className="flex items-center gap-1.5 text-muted-foreground">
          <motion.span
            className="size-1.5 bg-primary"
            animate={reduced ? undefined : { opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
          />
          Live
        </span>
      </div>

      <ol className="mt-4 flex items-center">
        {STAGES.map((stage, index) => {
          const done = index < step;
          const current = index === step;

          return (
            <li key={stage.field} className="flex min-w-0 flex-1 items-center">
              <div className="flex min-w-0 items-center gap-2 sm:gap-3">
                <motion.span
                  className={cn(
                    "relative flex size-7 shrink-0 items-center justify-center text-[10px] font-bold tracking-tight sm:size-8",
                    current
                      ? "bg-primary text-foreground"
                      : done
                        ? "border border-primary text-brand"
                        : "border border-foreground/15 text-muted-foreground",
                  )}
                  initial={reduced ? false : { scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ ...slam, delay: 0.06 * index }}
                >
                  {stage.code}
                </motion.span>
                <p
                  className={cn(
                    "hidden text-sm font-semibold tracking-tight sm:block",
                    current ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {marks[index]}
                </p>
              </div>
              {index < STAGES.length - 1 ? (
                <span
                  className={cn(
                    "mx-2 h-px flex-1 sm:mx-3",
                    index < step ? "bg-primary" : "bg-foreground/10",
                  )}
                />
              ) : null}
            </li>
          );
        })}
      </ol>
    </aside>
  );
}
