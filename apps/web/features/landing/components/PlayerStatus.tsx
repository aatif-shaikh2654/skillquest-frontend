"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { User } from "@repo/types";
import { HudCorners } from "@repo/ui/components/hud-corners";
import { toast } from "@repo/ui/lib/toast";
import { SplitAction } from "./SplitAction";
import { UserAvatar, playerFirstName } from "./UserAvatar";
import { XpCounter } from "./XpCounter";

type PlayerStatusProps = {
  user: User;
};

const slam = { type: "spring", stiffness: 420, damping: 18 } as const;

export function PlayerStatus({ user }: PlayerStatusProps) {
  const reduced = useReducedMotion();
  const firstName = playerFirstName(user.full_name);

  return (
    <section className="relative isolate overflow-hidden bg-hero text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-[radial-gradient(ellipse_at_bottom,color-mix(in_oklch,var(--mint)_18%,transparent),transparent_70%)]" />

      <motion.div
        className="relative mx-auto max-w-[1440px] px-4 pt-20 pb-4 sm:px-6 lg:px-10 lg:pt-24"
        initial={reduced ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={slam}
      >
        <div className="relative flex flex-col gap-4 border border-white/15 bg-hero-deep/50 px-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-4">
          <HudCorners size="sm" tone="white" />
          <div className="flex min-w-0 items-center gap-3">
            <div className="relative shrink-0 p-0.5">
              <HudCorners size="sm" tone="mint" />
              <UserAvatar name={user.full_name} size="lg" />
            </div>
            <div className="min-w-0">
              <p className="flex items-center gap-2 text-[10px] font-medium tracking-[0.24em] text-primary uppercase">
                <motion.span
                  className="size-1.5 bg-primary"
                  animate={reduced ? undefined : { opacity: [1, 0.15, 1] }}
                  transition={{
                    duration: 1.1,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                Season 2026
                <span className="text-white/30">/</span>
                Live
              </p>
              <h1 className="truncate text-lg font-bold tracking-tight sm:text-xl">
                {firstName}, the board is open
              </h1>
              <button
                type="button"
                className="text-xs text-primary underline-offset-4 hover:underline"
                onClick={() => toast.info("Coming online")}
              >
                Set class and interests
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <div>
              <div className="flex items-end gap-1.5">
                <XpCounter
                  value={2450}
                  delay={0.15}
                  className="text-2xl font-bold tracking-tight"
                />
                <p className="pb-0.5 text-[10px] font-medium tracking-[0.2em] text-primary uppercase">
                  XP
                </p>
              </div>
              <div className="mt-1.5 flex w-28 gap-0.5">
                {[0, 1, 2, 3, 4].map((tick) => (
                  <motion.span
                    key={tick}
                    className={
                      tick < 3
                        ? "h-1 flex-1 bg-primary"
                        : "h-1 flex-1 bg-white/15"
                    }
                    initial={reduced ? false : { scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ ...slam, delay: 0.2 + tick * 0.06 }}
                    style={{ transformOrigin: "bottom" }}
                  />
                ))}
              </div>
            </div>
            <p className="hidden text-[10px] tracking-[0.16em] text-white/55 uppercase md:block">
              Rank · Novice
              <span className="text-white/25"> / </span>
              Streak · 4<span className="text-white/25"> / </span>
              Cleared · 3
            </p>
            <SplitAction
              href={user.is_instructor ? "/instructor" : "/app"}
              label="Resume"
              tone="mint"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
