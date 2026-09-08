"use client";

import type { ReactNode } from "react";
import { HudCorners } from "@repo/ui/components/hud-corners";
import { QuestLoader } from "@repo/ui/components/quest-loader";
import { Navbar } from "@/features/landing";
import { STAGES } from "../utils/constants";
import { WizardRange } from "./WizardRange";

type WizardFrameProps = {
  step: number;
  blocked?: boolean;
  children: ReactNode;
};

export function WizardFrame({ step, blocked, children }: WizardFrameProps) {
  const stage = STAGES[step];

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
        <Navbar tone="hero" />
        <div aria-hidden className="relative h-20 sm:h-24 lg:h-[6.5rem]" />
      </div>

      <main className="mx-auto w-full max-w-[1440px] px-4 py-8 sm:px-6 sm:py-10 lg:px-10">
        <WizardRange step={step} />

        <section className="relative mt-4 border border-foreground/10 bg-card px-4 py-5 sm:mt-6 sm:px-6 sm:py-7 lg:px-8">
          <HudCorners size="sm" tone="ink" />
          <div className="mb-4 flex items-center justify-between gap-3 sm:mb-6">
            <p className="text-[10px] font-medium tracking-[0.32em] text-brand uppercase">
              Brief // {stage?.code}
            </p>
            <p className="text-[10px] tracking-[0.22em] text-muted-foreground uppercase">
              {step + 1} of {STAGES.length}
            </p>
          </div>

          {children}

          {blocked ? (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 bg-background/80 text-brand">
              <QuestLoader size="md" />
              <p className="text-[10px] font-medium tracking-[0.28em] uppercase">
                Clearing briefing
              </p>
            </div>
          ) : null}
        </section>
      </main>
    </div>
  );
}
