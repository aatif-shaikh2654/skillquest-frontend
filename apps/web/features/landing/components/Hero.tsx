"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { HeroDoodles } from "./HeroDoodles";
import { HudCorners } from "@repo/ui/components/hud-corners";
import { SplitAction } from "./SplitAction";
import { XpCounter } from "./XpCounter";

const slam = { type: "spring", stiffness: 480, damping: 18 } as const;
const dock = { type: "spring", stiffness: 300, damping: 22 } as const;

export function Hero() {
  return (
    <section className="relative isolate flex min-h-0 flex-col overflow-hidden bg-hero text-white lg:min-h-svh">
      <motion.div
        className="pointer-events-none absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.14 }}
        transition={{ duration: 0.45 }}
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_42%,color-mix(in_oklch,var(--ink)_38%,transparent)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[58%] bg-[radial-gradient(ellipse_at_bottom,color-mix(in_oklch,var(--mint)_22%,transparent),transparent_68%)]" />

      <motion.div
        className="pointer-events-none absolute inset-x-[-8%] bottom-0 mx-auto h-[min(36vh,280px)] w-[120%] max-w-none rounded-t-[50%] bg-hero-deep sm:h-[min(42vh,400px)] lg:h-[min(48vh,540px)]"
        initial={{ y: "22%" }}
        animate={{ y: "0%" }}
        transition={{ ...dock, delay: 0.05 }}
      />

      <div className="pointer-events-none absolute inset-3 z-[15] hidden lg:block lg:inset-5 lg:top-20">
        <HudCorners size="lg" tone="white" />
        <motion.span
          className="absolute top-3 left-4 text-[10px] tracking-[0.28em] text-primary uppercase"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ ...slam, delay: 0.22 }}
        >
          Map 01
        </motion.span>
        <motion.span
          className="absolute top-3 right-4 flex items-center gap-1.5 text-[10px] tracking-[0.28em] text-white/55 uppercase"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ ...slam, delay: 0.28 }}
        >
          <motion.span
            className="size-1.5 bg-primary"
            animate={{ opacity: [1, 0.15, 1] }}
            transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
          />
          Live
        </motion.span>
      </div>

      <div className="relative z-20 order-1 mx-auto w-full max-w-[1440px] px-4 pt-24 text-center sm:px-6 sm:pt-28 lg:order-none lg:px-10">
        <motion.div
          className="relative mx-auto max-w-3xl px-3 py-5 sm:px-8 sm:py-7"
          initial={{ clipPath: "inset(48% 0 48% 0)", opacity: 0 }}
          animate={{ clipPath: "inset(0% 0 0% 0)", opacity: 1 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
        >
          <HudCorners className="hidden sm:block" size="md" tone="white" />
          <div className="flex items-center justify-center gap-3">
            <motion.span
              className="h-px w-7 bg-white/35 sm:w-10"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ ...slam, delay: 0.16 }}
              style={{ transformOrigin: "right" }}
            />
            <span
              aria-label="Mission"
              className="flex text-[10px] font-medium tracking-[0.32em] text-primary uppercase"
            >
              {"MISSION".split("").map((letter, index) => (
                <motion.span
                  key={`${letter}-${index}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...slam, delay: 0.14 + index * 0.04 }}
                >
                  {letter}
                </motion.span>
              ))}
            </span>
            <motion.span
              className="h-px w-7 bg-white/35 sm:w-10"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ ...slam, delay: 0.16 }}
              style={{ transformOrigin: "left" }}
            />
          </div>
          <motion.p
            className="mx-auto mt-3 flex w-fit items-center gap-2 border border-white/35 bg-hero-deep/40 px-3 py-1.5 text-xs font-medium tracking-wide text-white/95 sm:px-4 sm:text-[13px]"
            initial={{ opacity: 0, scale: 0.8, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ ...slam, delay: 0.32 }}
          >
            <motion.span
              className="size-1.5 rotate-45 bg-primary"
              animate={{ scale: [1, 1.45, 1] }}
              transition={{
                duration: 1.15,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <span className="text-white/70">Season 2026</span>
            <span className="text-white/35">/</span>
            <span>Ranked #1</span>
          </motion.p>
          <motion.h1
            className="mx-auto mt-4 max-w-[16ch] text-[2rem] leading-[1.08] font-bold tracking-tight text-balance sm:mt-5 sm:text-5xl lg:text-[3.85rem] lg:leading-[1.05]"
            initial={{ opacity: 0, scale: 1.16, y: 28 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ ...slam, stiffness: 420, damping: 16, delay: 0.38 }}
          >
            Launch Career with Ready Online Courses
          </motion.h1>
          <motion.p
            className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-white/80 sm:mt-4 sm:text-base"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...dock, delay: 0.5 }}
          >
            Join thousands of learners worldwide accessing cutting-edge courses
            designed for modern minds.
          </motion.p>
          <motion.div
            className="mt-6 flex justify-center sm:mt-7"
            initial={{ opacity: 0, scale: 0.62, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ ...slam, stiffness: 540, damping: 14, delay: 0.58 }}
          >
            <SplitAction
              href="/login"
              label="Start Your Quest"
              tone="mint"
              size="hero"
            />
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="relative z-[5] order-3 mx-auto mt-2 aspect-[4/3] w-full max-w-[480px] sm:mt-6 sm:max-w-[600px] md:max-w-[720px] lg:absolute lg:inset-x-0 lg:-bottom-12 lg:order-none lg:mt-0 lg:aspect-auto lg:h-[64%] lg:max-w-[920px]"
        initial={{ opacity: 0, y: 56, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ ...slam, stiffness: 260, damping: 20, delay: 0.48 }}
      >
        <Image
          src="/hero-students.png"
          alt="Three SkillQuest students smiling together"
          fill
          priority
          className="object-contain object-bottom"
          sizes="(max-width: 1024px) 90vw, 920px"
        />
      </motion.div>

      <div className="relative z-20 order-2 mx-auto mt-8 grid w-full max-w-[1440px] gap-8 px-4 sm:mt-10 sm:grid-cols-2 sm:px-6 lg:order-none lg:contents lg:mt-0 lg:p-0">
        <motion.aside
          className="relative max-w-[250px] border border-white/20 bg-hero-deep/55 px-3.5 py-3.5 lg:absolute lg:top-[46%] lg:left-8 lg:mt-0 xl:left-16"
          initial={{ opacity: 0, x: -72, rotate: -3 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          transition={{ ...dock, delay: 0.7 }}
        >
          <HudCorners size="sm" />
          <div className="flex items-center justify-between text-[10px] font-medium tracking-[0.22em] text-primary uppercase">
            <span>Quest log</span>
            <span className="text-white/40">01</span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-white/85">
            From AI-enhanced lessons to real-world projects, our platform
            empowers you to learn.
          </p>
          <div className="mt-5 border-t border-white/15 pt-3">
            <div className="flex items-end justify-between gap-3">
              <XpCounter
                className="text-4xl font-bold tracking-tight text-white lg:text-5xl"
                delay={0.9}
              />
              <p className="pb-1 text-[10px] font-medium tracking-[0.2em] text-primary uppercase">
                XP
              </p>
            </div>
            <p className="mt-1 text-sm text-white/75">Top Notch Courses</p>
            <div className="mt-3 flex gap-1">
              {[0, 1, 2, 3, 4].map((tick) => (
                <motion.span
                  key={tick}
                  className={
                    tick < 4
                      ? "h-1.5 flex-1 bg-primary"
                      : "h-1.5 flex-1 bg-white/15"
                  }
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={{ scaleY: 1, opacity: 1 }}
                  transition={{ ...slam, delay: 1.05 + tick * 0.08 }}
                  style={{ transformOrigin: "bottom" }}
                />
              ))}
            </div>
          </div>
        </motion.aside>

        <motion.aside
          className="relative max-w-[250px] border border-white/20 bg-hero-deep/55 px-3.5 py-3.5 sm:justify-self-end lg:absolute lg:top-[44%] lg:right-8 lg:mt-0 lg:justify-self-auto xl:right-16"
          initial={{ opacity: 0, x: 72, rotate: 3 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          transition={{ ...dock, delay: 0.82 }}
        >
          <HudCorners size="sm" />
          <div className="flex items-center justify-between text-[10px] font-medium tracking-[0.22em] uppercase">
            <span className="text-primary">Party</span>
            <motion.span
              className="border border-achievement/50 px-1.5 py-0.5 text-achievement"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ ...slam, delay: 1.28 }}
            >
              Verified
            </motion.span>
          </div>
          <p className="mt-2 text-[15px] tracking-[0.2em] text-achievement">
            {"★★★★★".split("").map((star, index) => (
              <motion.span
                key={index}
                className="inline-block"
                initial={{ opacity: 0, scale: 0, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ ...slam, delay: 0.92 + index * 0.08 }}
              >
                {star}
              </motion.span>
            ))}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-white/90">
            Modern, sleek, and focused on real skills. I loved the hands-on
            projects and their system.
          </p>
          <div className="mt-4 flex items-center gap-3 border-t border-white/15 pt-3">
            <div className="relative size-11 shrink-0">
              <HudCorners size="sm" />
              <Image
                src="/testimonial-jason.png"
                alt="Jason Kim"
                width={44}
                height={44}
                className="size-11 object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-medium text-white">Jason Kim</p>
              <p className="text-[11px] tracking-[0.14em] text-white/55 uppercase">
                Rank · Mentor
              </p>
            </div>
          </div>
        </motion.aside>
      </div>

      <HeroDoodles />
    </section>
  );
}
