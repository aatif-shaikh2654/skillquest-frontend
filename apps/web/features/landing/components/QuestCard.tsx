"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { Button } from "@repo/ui/components/button";
import { HudCorners } from "@repo/ui/components/hud-corners";
import { cn } from "@repo/ui/lib/utils";
import { useHud } from "./HudProvider";
import { questTones, type Quest } from "./questData";

type QuestCardProps = {
  quest: Quest;
  index: number;
};

export function QuestCard({ quest, index }: QuestCardProps) {
  const { savedIds, stashIds, toggleSaved, addToStash } = useHud();
  const [flash, setFlash] = useState(false);
  const [locked, setLocked] = useState(false);
  const saved = savedIds.has(quest.id);
  const stashed = stashIds.has(quest.id);
  const mapLabel = String(index + 1).padStart(2, "0");

  function handleStash() {
    if (stashed || locked) return;

    setLocked(true);
    setFlash(true);
    addToStash(quest.id);
    window.setTimeout(() => setFlash(false), 420);
    window.setTimeout(() => setLocked(false), 520);
  }

  return (
    <article className="relative flex h-full flex-col border border-foreground/10 bg-card">
      <HudCorners size="sm" tone="ink" className="opacity-40" />
      {flash ? (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 bg-primary/20"
        />
      ) : null}

      <div className={cn("relative aspect-[16/10]", questTones[quest.tone])}>
        <HudCorners size="sm" tone="white" className="opacity-55" />
        <div
          aria-hidden
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />
        <span className="absolute top-3 left-3 z-[1] border border-white/30 bg-foreground/70 px-2 py-0.5 text-[10px] font-medium tracking-[0.16em] text-white uppercase">
          {quest.badge}
        </span>
        <p className="absolute right-3 bottom-3 z-[1] text-[10px] tracking-[0.16em] text-white/80 uppercase">
          {quest.duration}
        </p>
        <p className="absolute bottom-3 left-3 z-[1] font-mono text-3xl font-bold tracking-tight text-white">
          {mapLabel}
        </p>
      </div>

      <div className="flex flex-1 flex-col px-4 pt-3 pb-4">
        <h3 className="text-[15px] leading-snug font-semibold tracking-tight">
          {quest.title}
        </h3>
        <p className="mt-1 text-xs text-muted-foreground">
          {quest.mentor}
          <span className="text-foreground/15"> · </span>
          {quest.language}
        </p>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {quest.description}
        </p>

        <div className="mt-auto flex items-center justify-between gap-2 pt-4">
          <p className="text-sm font-semibold tracking-tight">{quest.price}</p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className={cn(
                "inline-flex size-8 items-center justify-center border border-foreground/10 transition-colors hover:bg-primary",
                saved && "border-primary bg-primary",
              )}
              aria-pressed={saved}
              aria-label={saved ? "Remove saved quest" : "Save quest"}
              onClick={() => toggleSaved(quest.id)}
            >
              <Heart
                className="size-3.5"
                strokeWidth={2}
                fill={saved ? "currentColor" : "none"}
              />
            </button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={stashed || locked}
              onClick={handleStash}
            >
              {stashed ? "In stash" : "Add to stash"}
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
