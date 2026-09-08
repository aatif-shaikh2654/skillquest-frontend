"use client";

import { motion } from "framer-motion";
import {
  TbArrowWaveRightUp,
  TbClockHour4,
  TbCompass,
  TbTarget,
  TbTrophy,
} from "react-icons/tb";
import { HudCorners } from "@repo/ui/components/hud-corners";

const doodles = [
  {
    Icon: TbArrowWaveRightUp,
    position: "top-[33%] left-[14%] size-11",
    rotate: "-rotate-6",
    delay: 1.05,
    tag: "BOOST",
  },
  {
    Icon: TbTrophy,
    position: "bottom-[20%] left-[22%] size-11",
    rotate: "rotate-3",
    delay: 1.16,
    tag: "WIN",
  },
  {
    Icon: TbCompass,
    position: "top-[31%] right-[14%] size-11",
    rotate: "-rotate-[4deg]",
    delay: 1.24,
    tag: "MAP",
  },
  {
    Icon: TbClockHour4,
    position: "bottom-[14%] right-[14%] size-11",
    rotate: "rotate-6",
    delay: 1.32,
    tag: "TIME",
  },
  {
    Icon: TbTarget,
    position: "bottom-[22%] right-[38%] size-11",
    rotate: "-rotate-3",
    delay: 1.4,
    tag: "AIM",
  },
] as const;

export function HeroDoodles() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-10 hidden lg:block"
      aria-hidden
    >
      {doodles.map(({ Icon, position, rotate, delay, tag }) => (
        <motion.div
          key={tag}
          className={`absolute ${position}`}
          initial={{ opacity: 0, scale: 0, rotate: -28, y: 18 }}
          animate={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 560,
            damping: 14,
            delay,
          }}
        >
          <div className="relative grid size-full place-items-center border border-white/35 bg-hero-deep/55">
            <HudCorners size="sm" />
            <Icon
              className={`size-6 text-white/90 ${rotate}`}
              strokeWidth={1.6}
            />
            <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[9px] font-medium tracking-[0.2em] text-primary uppercase">
              {tag}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
