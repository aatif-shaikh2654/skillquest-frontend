"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { toast } from "@repo/ui/lib/toast";

type HudContextValue = {
  savedIds: ReadonlySet<string>;
  stashIds: ReadonlySet<string>;
  savedCount: number;
  stashCount: number;
  savedPulse: boolean;
  stashPulse: boolean;
  toggleSaved: (id: string) => void;
  addToStash: (id: string) => void;
};

const HudContext = createContext<HudContextValue | null>(null);

export function HudProvider({ children }: { children: ReactNode }) {
  const [savedIds, setSavedIds] = useState<Set<string>>(() => new Set());
  const [stashIds, setStashIds] = useState<Set<string>>(() => new Set());
  const [savedPulse, setSavedPulse] = useState(false);
  const [stashPulse, setStashPulse] = useState(false);
  const savedPulseTimer = useRef<number>(0);
  const stashPulseTimer = useRef<number>(0);

  const pulse = useCallback((kind: "saved" | "stash") => {
    const setPulse = kind === "saved" ? setSavedPulse : setStashPulse;
    const timer = kind === "saved" ? savedPulseTimer : stashPulseTimer;

    window.clearTimeout(timer.current);
    setPulse(true);
    timer.current = window.setTimeout(() => setPulse(false), 420);
  }, []);

  const toggleSaved = useCallback(
    (id: string) => {
      setSavedIds((current) => {
        const next = new Set(current);
        if (next.has(id)) {
          next.delete(id);
          toast.info("Removed from quests");
        } else {
          next.add(id);
          pulse("saved");
          toast.success("Saved to quests");
        }
        return next;
      });
    },
    [pulse],
  );

  const addToStash = useCallback(
    (id: string) => {
      setStashIds((current) => {
        if (current.has(id)) {
          toast.warning("Already in stash");
          return current;
        }

        const next = new Set(current);
        next.add(id);
        pulse("stash");
        toast.success("Added to stash");
        return next;
      });
    },
    [pulse],
  );

  const value = useMemo<HudContextValue>(
    () => ({
      savedIds,
      stashIds,
      savedCount: savedIds.size,
      stashCount: stashIds.size,
      savedPulse,
      stashPulse,
      toggleSaved,
      addToStash,
    }),
    [savedIds, stashIds, savedPulse, stashPulse, toggleSaved, addToStash],
  );

  return <HudContext.Provider value={value}>{children}</HudContext.Provider>;
}

export function useHud() {
  const context = useContext(HudContext);

  if (!context) {
    throw new Error("useHud must be used within HudProvider");
  }

  return context;
}

export function useHudOptional() {
  return useContext(HudContext);
}
