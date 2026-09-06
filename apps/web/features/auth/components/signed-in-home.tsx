"use client";

import Link from "next/link";
import { Button } from "@repo/ui/components/button";
import { HudCorners } from "@repo/ui/components/hud-corners";
import { LogoMark } from "@repo/ui/components/logo-mark";
import { isGoogleEnabled } from "../utils/google";
import { useLogout } from "../hooks/use-logout";
import { useAuth } from "../session";
import { GoogleSignInButton } from "./google-sign-in-button";

export function SignedInHome() {
  const { user } = useAuth();
  const logout = useLogout();

  if (!user) return null;

  const isInstructor = user.is_instructor;

  return (
    <main className="min-h-svh bg-background px-4 py-8 sm:px-8">
      <div className="mx-auto flex w-full max-w-lg flex-col gap-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 text-foreground"
        >
          <LogoMark className="size-9" />
          <span className="flex flex-col leading-none">
            <span className="text-lg font-semibold tracking-tight">
              SkillQuest
            </span>
            <span className="mt-1 h-0.5 w-8 bg-primary" />
          </span>
        </Link>

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
          <div className="relative flex flex-col gap-4 border border-foreground/10 bg-card px-5 py-6">
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

        <Button
          type="button"
          variant="outline"
          size="form"
          loading={logout.isPending}
          onClick={() => logout.mutate()}
        >
          Logout
        </Button>
      </div>
    </main>
  );
}
