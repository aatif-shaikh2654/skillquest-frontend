"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { HudCorners } from "@repo/ui/components/hud-corners";
import { LogoMark } from "@repo/ui/components/logo-mark";

const slam = { type: "spring", stiffness: 420, damping: 22 } as const;

export type AuthShellVariant = "default" | "student";

type AuthShellProps = {
  title: string;
  description: string;
  children: ReactNode;
  variant?: AuthShellVariant;
};

type PanelConfig = {
  map: string;
  status: string;
  eyebrow: string;
  log: string;
  code: string;
  headline: string;
  footnote: string;
  stat: string;
  statLabel: string;
};

const panels: Record<AuthShellVariant, PanelConfig> = {
  default: {
    map: "Map 01",
    status: "Live",
    eyebrow: "Mission",
    log: "Quest log",
    code: "01",
    headline: "Launch Career with Ready Online Courses",
    footnote: "Top Notch Courses",
    stat: "5000+",
    statLabel: "XP",
  },
  student: {
    map: "Map 02",
    status: "Open",
    eyebrow: "Recruit",
    log: "Learner log",
    code: "ST",
    headline: "Earn XP on quests built for real work.",
    footnote: "Pick a course. Clear stages. Rank up.",
    stat: "12k+",
    statLabel: "XP / week",
  },
};

export function AuthShell({
  title,
  description,
  children,
  variant = "default",
}: AuthShellProps) {
  const panel = panels[variant];

  return (
    <main className="grid min-h-svh bg-background lg:h-svh lg:grid-cols-[minmax(280px,1.05fr)_minmax(320px,0.95fr)]">
      <aside className="relative hidden overflow-hidden bg-hero text-white lg:flex lg:flex-col lg:justify-between lg:px-12 lg:py-12 xl:px-16 xl:py-14">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
        <div className="pointer-events-none absolute inset-x-[-12%] bottom-0 h-[42%] rounded-t-[50%] bg-hero-deep" />
        {variant === "student" ? (
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,color-mix(in_oklch,var(--mint)_22%,transparent),transparent_60%)]" />
        ) : null}
        <div className="pointer-events-none absolute inset-5">
          <HudCorners size="lg" tone="white" />
          <span className="absolute top-3 left-4 text-[10px] tracking-[0.28em] text-primary uppercase">
            {panel.map}
          </span>
          <span className="absolute top-3 right-4 flex items-center gap-1.5 text-[10px] tracking-[0.28em] text-white/55 uppercase">
            <span className="size-1.5 bg-primary" />
            {panel.status}
          </span>
        </div>

        <Link
          href="/"
          className="relative z-10 flex items-center gap-2.5 text-white"
        >
          <LogoMark className="size-10" />
          <span className="flex flex-col leading-none">
            <span className="text-[1.35rem] font-semibold tracking-tight">
              SkillQuest
            </span>
            <span className="mt-1 h-0.5 w-8 bg-primary" />
          </span>
        </Link>

        <div className="relative z-10 max-w-md border border-white/20 bg-hero-deep/55 px-4 py-4">
          <HudCorners size="sm" />
          <div className="flex items-center justify-between text-[10px] font-medium tracking-[0.22em] text-primary uppercase">
            <span>{panel.log}</span>
            <span className="text-white/40">{panel.code}</span>
          </div>
          <p className="mt-4 text-3xl leading-[1.1] font-bold tracking-tight text-balance xl:text-4xl">
            {panel.headline}
          </p>
          <div className="mt-8 flex items-end justify-between gap-3 border-t border-white/15 pt-3">
            <p className="text-5xl font-bold tracking-tight">{panel.stat}</p>
            <p className="pb-1 text-[10px] font-medium tracking-[0.2em] text-primary uppercase">
              {panel.statLabel}
            </p>
          </div>
          <p className="mt-3 text-sm text-white/75">{panel.footnote}</p>
        </div>
      </aside>

      <section className="relative flex min-h-0 flex-col overflow-y-auto px-4 py-8 sm:px-8 lg:px-12 lg:py-12">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35] lg:hidden"
          style={{
            backgroundImage:
              "linear-gradient(to right, color-mix(in oklch, var(--teal) 18%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklch, var(--teal) 18%, transparent) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <Link
          href="/"
          className="relative z-10 mb-10 flex items-center gap-2.5 text-foreground lg:hidden"
        >
          <LogoMark className="size-9" />
          <span className="flex flex-col leading-none">
            <span className="text-lg font-semibold tracking-tight">
              SkillQuest
            </span>
            <span className="mt-1 h-0.5 w-8 bg-primary" />
          </span>
        </Link>

        <motion.div
          className="relative z-10 mx-auto flex w-full max-w-[420px] flex-1 flex-col justify-center"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={slam}
        >
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px flex-1 bg-foreground/15" />
            <span className="text-[10px] font-medium tracking-[0.32em] text-brand uppercase">
              {panel.eyebrow}
            </span>
            <span className="h-px flex-1 bg-foreground/15" />
          </div>
          <h1 className="text-[2rem] leading-tight font-bold tracking-tight text-balance sm:text-[2.35rem]">
            {title}
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
            {description}
          </p>
          <div className="relative mt-8 border border-foreground/10 bg-card px-4 py-5 sm:px-5 sm:py-6">
            <HudCorners size="sm" tone="ink" />
            {children}
          </div>
        </motion.div>
      </section>
    </main>
  );
}
