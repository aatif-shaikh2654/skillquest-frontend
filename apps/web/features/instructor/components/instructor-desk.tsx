"use client";

import { HudCorners } from "@repo/ui/components/hud-corners";
import {
  SidebarInset,
  SidebarProvider,
} from "@repo/ui/components/sidebar";
import { toast } from "@repo/ui/lib/toast";
import {
  GoogleSignInButton,
  isGoogleEnabled,
  useAuth,
} from "@/features/auth";
import { MotionRoot, playerFirstName } from "@/features/landing";
import { InstructorHeader } from "./instructor-header";
import { InstructorSidebar } from "./instructor-sidebar";

const tiles = [
  {
    code: "01",
    title: "Create quest",
    blurb: "Open a staged quest and put it on the map.",
  },
  {
    code: "02",
    title: "Learners",
    blurb: "See who enlisted and where they stand.",
  },
  {
    code: "03",
    title: "XP",
    blurb: "Award points when a stage clears.",
  },
  {
    code: "04",
    title: "Drafts",
    blurb: "Pick up a quest that is still on the bench.",
  },
] as const;

export function InstructorDesk() {
  const { user } = useAuth();

  if (!user) return null;

  const firstName = playerFirstName(user.full_name);

  return (
    <MotionRoot>
      <SidebarProvider>
        <InstructorSidebar />
        <SidebarInset>
          <InstructorHeader user={user} />
          <div className="flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
            <p className="text-[10px] font-medium tracking-[0.28em] text-brand uppercase">
              Desk tools
            </p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
              {firstName}, the desk is open
            </h2>
            <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
              Build quests, watch learners, and ship drafts from one board.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {tiles.map((tile) => (
                <button
                  key={tile.code}
                  type="button"
                  onClick={() => toast.info("Coming online")}
                  className="relative flex h-full flex-col border border-foreground/10 bg-card px-4 pt-3 pb-4 text-left transition-colors hover:border-brand"
                >
                  <HudCorners size="sm" tone="ink" className="opacity-40" />
                  <p className="font-mono text-2xl font-bold tracking-tight text-brand">
                    {tile.code}
                  </p>
                  <h3 className="mt-3 text-[15px] leading-snug font-semibold tracking-tight">
                    {tile.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {tile.blurb}
                  </p>
                </button>
              ))}
            </div>

            {isGoogleEnabled ? (
              <div className="relative mt-6 flex max-w-lg flex-col gap-4 border border-foreground/10 bg-card px-5 py-6">
                <HudCorners size="sm" tone="ink" />
                <p className="text-[10px] font-medium tracking-[0.28em] text-brand uppercase">
                  Connect Google
                </p>
                <p className="text-sm text-muted-foreground">
                  Link a Google account that uses the same email.
                </p>
                <GoogleSignInButton mode="link" />
              </div>
            ) : null}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </MotionRoot>
  );
}
