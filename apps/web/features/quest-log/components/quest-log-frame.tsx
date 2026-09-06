"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import type { User } from "@repo/types";
import { QuestLoadingScreen } from "@repo/ui/components/quest-loading-screen";
import {
  GoogleSignInButton,
  isGoogleEnabled,
  useAuth,
} from "@/features/auth";
import { Navbar } from "@/features/landing";
import { LogTabs } from "./log-tabs";
import { RaidWindowBrief } from "./raid-window-brief";
import { playerFirstName, playerStats, type LogTab } from "../quest-log-data";

type QuestLogFrameProps = {
  user: User | null;
  children: ReactNode;
};

export function QuestLogFrame({
  user: serverUser,
  children,
}: QuestLogFrameProps) {
  const router = useRouter();
  const { setUser, user: sessionUser, ready } = useAuth();
  const [tab, setTab] = useState<LogTab>("All quests");
  const [showRaidWindow, setShowRaidWindow] = useState(true);

  useEffect(() => {
    if (serverUser) setUser(serverUser);
  }, [setUser, serverUser]);

  const user = sessionUser ?? serverUser;

  useEffect(() => {
    if (!ready || user) return;
    router.replace("/login");
  }, [ready, user, router]);

  if (!user) return <QuestLoadingScreen />;

  const firstName = playerFirstName(user.full_name);

  return (
    <div className="min-h-svh bg-background">
      <div className="relative isolate overflow-hidden bg-hero">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-[radial-gradient(ellipse_at_bottom,color-mix(in_oklch,var(--mint)_18%,transparent),transparent_70%)]" />
        <Navbar tone="hero" user={user} />
        <div aria-hidden className="relative h-20 sm:h-24 lg:h-[6.5rem]" />
      </div>

      <main className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
        <div className="lg:grid lg:grid-cols-[13.5rem_minmax(0,1fr)] lg:gap-14">
          <aside className="flex flex-col gap-6">
            <div>
              <p className="mb-3 text-[10px] font-medium tracking-[0.28em] text-brand uppercase">
                File
              </p>
              <LogTabs active={tab} onChange={setTab} />
            </div>

            {showRaidWindow ? (
              <RaidWindowBrief onDismiss={() => setShowRaidWindow(false)} />
            ) : null}

            {isGoogleEnabled ? (
              <section className="border border-foreground/10 px-3 py-4">
                <p className="text-[10px] font-medium tracking-[0.28em] text-brand uppercase">
                  Connect Google
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Link a Google account that uses the same email.
                </p>
                <div className="mt-3">
                  <GoogleSignInButton mode="link" />
                </div>
              </section>
            ) : null}
          </aside>

          <div className="mt-8 border-l-0 border-foreground/10 pl-0 lg:mt-0 lg:border-l-2 lg:pl-12">
            <header className="flex flex-wrap items-end justify-between gap-4 border-b-2 border-foreground pb-5">
              <div className="min-w-0">
                <p className="text-[10px] font-medium tracking-[0.28em] text-muted-foreground uppercase">
                  Quest log · {playerStats.rank}
                </p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                  {firstName}, nothing filed
                </h1>
                <p className="mt-2 text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
                  {playerStats.xp.toLocaleString()}+ XP
                  <span className="text-foreground/20"> / </span>
                  Streak · {playerStats.streak}
                  <span className="text-foreground/20"> / </span>
                  Cleared · {playerStats.cleared}
                </p>
              </div>
              <p className="font-mono text-5xl leading-none font-bold tracking-tighter text-foreground/15 sm:text-6xl">
                00
              </p>
            </header>

            <div className="mt-8">{children}</div>
          </div>
        </div>
      </main>
    </div>
  );
}
