"use client";

import type { MouseEvent, ReactNode } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Heart, ShoppingCart } from "lucide-react";
import type { User } from "@repo/types";
import { toast } from "@repo/ui/lib/toast";
import { cn } from "@repo/ui/lib/utils";
import { useHudOptional } from "./HudProvider";
import { PlayerMenu } from "./PlayerMenu";

type NavHudProps = {
  user: User;
  tone: "hero" | "light";
};

const slam = { type: "spring", stiffness: 520, damping: 16 } as const;

export function NavHud({ user, tone }: NavHudProps) {
  const hud = useHudOptional();
  const reduced = useReducedMotion();
  const onHero = tone === "hero";

  const iconClass = cn(
    "relative inline-flex size-10 items-center justify-center rounded-none transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none sm:size-11",
    onHero
      ? "text-white/95 hover:bg-white/10"
      : "text-foreground hover:bg-foreground/5",
  );

  return (
    <div className="flex items-center gap-0.5 sm:gap-1">
      <HudIconLink
        href="/#saved"
        label="Saved quests"
        className={iconClass}
        count={hud?.savedCount ?? 0}
        pulse={Boolean(hud?.savedPulse)}
        reduced={Boolean(reduced)}
        onClick={(event) => {
          if (!hud) return;
          event.preventDefault();
          toast.info("Coming online");
        }}
      >
        <Heart className="size-5" strokeWidth={2} />
      </HudIconLink>
      <HudIconLink
        href="/#stash"
        label="Stash"
        className={iconClass}
        count={hud?.stashCount ?? 0}
        pulse={Boolean(hud?.stashPulse)}
        reduced={Boolean(reduced)}
        onClick={(event) => {
          if (!hud) return;
          event.preventDefault();
          toast.info("Coming online");
        }}
      >
        <ShoppingCart className="size-5" strokeWidth={2} />
      </HudIconLink>
      <PlayerMenu user={user} tone={tone} />
    </div>
  );
}

function HudIconLink({
  href,
  label,
  className,
  count,
  pulse,
  reduced,
  onClick,
  children,
}: {
  href: string;
  label: string;
  className: string;
  count: number;
  pulse: boolean;
  reduced: boolean;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
  children: ReactNode;
}) {
  return (
    <Link href={href} aria-label={label} className={className} onClick={onClick}>
      {children}
      {count > 0 ? (
        <motion.span
          aria-hidden
          className="absolute top-1.5 right-1.5 min-w-3.5 bg-primary px-0.5 text-center text-[9px] leading-3.5 font-bold text-foreground"
          animate={reduced || !pulse ? { scale: 1 } : { scale: [1, 1.28, 1] }}
          transition={slam}
        >
          {count}
        </motion.span>
      ) : null}
    </Link>
  );
}
