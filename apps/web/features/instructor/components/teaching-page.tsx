"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { HudCorners } from "@repo/ui/components/hud-corners";
import { MotionRoot, Navbar, SplitAction } from "@/features/landing";

const slam = { type: "spring", stiffness: 420, damping: 22 } as const;

const questions = [
  {
    q: "Who can teach on SkillQuest?",
    a: "Anyone with a skill worth shipping. Practitioners, mentors, and working specialists can open a desk and run quests for learners.",
  },
  {
    q: "What do I need before I start?",
    a: "A SkillQuest account and a clear topic. Create your profile first, then apply to teach. Course tools come after you are marked as an instructor.",
  },
  {
    q: "How do learners find my quests?",
    a: "Published quests sit on the SkillQuest map with rank, XP, and stage lists. Learners join, clear stages, and climb — the same loop you already know.",
  },
  {
    q: "Is there a fee to teach?",
    a: "Opening an instructor desk is free. Payouts and course pricing land when you publish. Get started now and set the rest up when you are ready.",
  },
];

export function TeachingPage() {
  return (
    <MotionRoot>
      <main>
        <section className="relative isolate overflow-hidden bg-hero text-white">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.14]"
            style={{
              backgroundImage:
                "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
              backgroundSize: "72px 72px",
            }}
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[48%] bg-[radial-gradient(ellipse_at_bottom,color-mix(in_oklch,var(--mint)_22%,transparent),transparent_68%)]" />
          <Navbar />

          <div className="relative z-10 mx-auto max-w-[1440px] px-4 pt-28 pb-16 sm:px-6 sm:pt-32 sm:pb-20 lg:px-10 lg:pt-36 lg:pb-24">
            <div className="pointer-events-none absolute inset-3 hidden lg:block lg:inset-5 lg:top-20">
              <HudCorners size="lg" tone="white" />
              <span className="absolute top-3 left-4 text-[10px] tracking-[0.28em] text-primary uppercase">
                Map 03
              </span>
              <span className="absolute top-3 right-4 flex items-center gap-1.5 text-[10px] tracking-[0.28em] text-white/55 uppercase">
                <span className="size-1.5 bg-primary" />
                Recruit
              </span>
            </div>

            <motion.div
              className="relative mx-auto max-w-3xl text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={slam}
            >
              <p className="text-[10px] font-medium tracking-[0.32em] text-primary uppercase">
                Teach on SkillQuest
              </p>
              <h1 className="mt-4 text-[2rem] leading-[1.08] font-bold tracking-tight text-balance sm:text-5xl lg:text-[3.4rem]">
                Build quests. Rank up the next wave of talent.
              </h1>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
                SkillQuest is a ranked learning map. Instructors design staged
                quests, award XP, and coach people who want real work skills —
                not another lecture dump.
              </p>
              <div className="mt-8 flex justify-center">
                <SplitAction
                  href="/instructor"
                  label="Get started"
                  tone="mint"
                  size="hero"
                />
              </div>
            </motion.div>
          </div>
        </section>

        <section className="bg-background px-4 py-14 sm:px-6 sm:py-20 lg:px-10">
          <div className="mx-auto max-w-3xl">
            <p className="text-[10px] font-medium tracking-[0.28em] text-brand uppercase">
              Briefing
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
              A few questions before you enlist
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
              Teaching on SkillQuest means you own a desk on the map. Learners
              join your quests, clear stages, and climb. You keep the craft; we
              keep the HUD.
            </p>

            <ul className="mt-10 flex flex-col gap-4">
              {questions.map((item) => (
                <li
                  key={item.q}
                  className="relative border border-foreground/10 bg-card px-5 py-5"
                >
                  <HudCorners size="sm" tone="ink" />
                  <p className="text-sm font-semibold tracking-tight">
                    {item.q}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.a}
                  </p>
                </li>
              ))}
            </ul>

            <div className="relative mt-10 border border-foreground/10 bg-card px-5 py-6">
              <HudCorners size="sm" tone="ink" />
              <p className="text-[10px] font-medium tracking-[0.28em] text-brand uppercase">
                Next stage
              </p>
              <p className="mt-3 text-lg font-bold tracking-tight">
                Ready to open an instructor desk?
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Sign in first. You can enlist to teach after you confirm your
                email.
              </p>
              <div className="mt-6">
                <Link
                  href="/instructor"
                  className="inline-flex h-11 items-center border-2 border-foreground bg-primary px-6 text-sm font-medium tracking-tight text-foreground transition-colors hover:bg-primary-hover"
                >
                  Get started
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </MotionRoot>
  );
}
