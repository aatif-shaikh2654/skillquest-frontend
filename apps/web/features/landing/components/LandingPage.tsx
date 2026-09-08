"use client";

import { useEffect } from "react";
import type { User } from "@repo/types";
import { useAuth } from "@/features/auth";
import { Hero } from "./Hero";
import { HudProvider } from "./HudProvider";
import { MotionRoot } from "./MotionRoot";
import { Navbar } from "./Navbar";
import { PlayerStatus } from "./PlayerStatus";
import { QuestBoard } from "./QuestBoard";

type LandingPageProps = {
  user: User | null;
};

export function LandingPage({ user: serverUser }: LandingPageProps) {
  const { setUser, user: sessionUser, ready } = useAuth();

  useEffect(() => {
    if (serverUser) setUser(serverUser);
  }, [setUser, serverUser]);

  const user = sessionUser ?? serverUser;

  if (!user) {
    if (!ready && !serverUser) {
      return (
        <MotionRoot>
          <main>
            <Navbar />
          </main>
        </MotionRoot>
      );
    }

    return (
      <MotionRoot>
        <main>
          <Navbar user={null} />
          <Hero />
        </main>
      </MotionRoot>
    );
  }

  return (
    <MotionRoot>
      <HudProvider>
        <main className="min-h-svh bg-background">
          <Navbar tone="hero" user={user} />
          <PlayerStatus user={user} />
          <QuestBoard />
        </main>
      </HudProvider>
    </MotionRoot>
  );
}
