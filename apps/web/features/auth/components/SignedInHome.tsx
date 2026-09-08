"use client";

import { HudCorners } from "@repo/ui/components/hud-corners";
import { Navbar } from "@/features/landing";
import { isGoogleEnabled } from "../utils/google";
import { useAuth } from "../session";
import { GoogleSignInButton } from "./google-sign-in-button";

export function SignedInHome() {
  const { user } = useAuth();

  if (!user) return null;

  const isInstructor = user.is_instructor;

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

      <main className="mx-auto w-full max-w-lg px-4 py-10 sm:px-6">
        <div className="relative border border-foreground/10 bg-card px-5 py-6">
          <HudCorners size="sm" tone="ink" />
          <p className="text-[10px] font-medium tracking-[0.28em] text-brand uppercase">
            {isInstructor ? "Instructor desk" : "Student quest"}
          </p>
          <h1 className="mt-3 text-2xl font-bold tracking-tight">
            {user.full_name}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">{user.email}</p>
          <p className="mt-4 text-[10px] font-medium tracking-[0.2em] text-muted-foreground uppercase">
            Role · {user.role}
          </p>
        </div>

        {isGoogleEnabled ? (
          <div className="relative mt-6 flex flex-col gap-4 border border-foreground/10 bg-card px-5 py-6">
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
      </main>
    </div>
  );
}
