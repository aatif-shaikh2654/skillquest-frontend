"use client";

import Link from "next/link";
import type { User } from "@repo/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui/components/dropdown-menu";
import { QuestLoader } from "@repo/ui/components/quest-loader";
import { toast } from "@repo/ui/lib/toast";
import { cn } from "@repo/ui/lib/utils";
import { useLogout } from "@/features/auth";
import { useHudOptional } from "./HudProvider";
import { UserAvatar } from "./UserAvatar";

type PlayerMenuProps = {
  user: User;
  tone: "hero" | "light";
};

const itemClass =
  "relative gap-0 px-3 py-2.5 text-sm font-medium tracking-tight text-foreground focus:bg-accent data-highlighted:before:absolute data-highlighted:before:top-1.5 data-highlighted:before:bottom-1.5 data-highlighted:before:left-0 data-highlighted:before:w-0.5 data-highlighted:before:bg-primary";

export function PlayerMenu({ user, tone }: PlayerMenuProps) {
  const logout = useLogout();
  const hud = useHudOptional();
  const locked = () => toast.info("Coming online");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "rounded-none outline-none focus-visible:ring-2 focus-visible:ring-primary",
          tone === "hero" && "ring-offset-2 ring-offset-transparent",
        )}
        aria-label="Player menu"
      >
        <UserAvatar name={user.full_name} size="md" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={10}
        className="w-auto min-w-72 origin-top p-0"
      >
        <div className="border-b border-foreground/10 px-3 py-3">
          <div className="flex items-center gap-3">
            <UserAvatar name={user.full_name} size="md" />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold tracking-tight">
                {user.full_name}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {user.email}
              </p>
            </div>
          </div>
          <p className="mt-2 inline-flex items-center gap-1.5 text-[10px] font-medium tracking-[0.22em] text-brand uppercase">
            <span className="size-1.5 animate-pulse bg-primary" />
            Rank · Novice
          </p>
        </div>

        <DropdownMenuItem
          className={itemClass}
          render={<Link href="/app" />}
        >
          Quest log
        </DropdownMenuItem>
        <DropdownMenuItem
          className={itemClass}
          render={hud ? undefined : <Link href="/#stash" />}
          onClick={() => locked()}
        >
          Stash
        </DropdownMenuItem>
        <DropdownMenuItem
          className={itemClass}
          render={hud ? undefined : <Link href="/#saved" />}
          onClick={() => locked()}
        >
          Saved quests
        </DropdownMenuItem>

        {user.is_instructor ? (
          <DropdownMenuItem
            className={itemClass}
            render={<Link href="/instructor" />}
          >
            Instructor desk
          </DropdownMenuItem>
        ) : null}

        <DropdownMenuSeparator className="bg-foreground/10" />

        <DropdownMenuItem className={itemClass} onClick={() => locked()}>
          Player settings
        </DropdownMenuItem>
        <DropdownMenuItem className={itemClass} onClick={() => locked()}>
          Edit profile
        </DropdownMenuItem>
        <DropdownMenuItem className={itemClass} onClick={() => locked()}>
          Codex
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-foreground/10" />

        <DropdownMenuItem
          className={cn(itemClass, "text-destructive")}
          disabled={logout.isPending}
          onClick={() => logout.mutate()}
        >
          {logout.isPending ? <QuestLoader size="sm" /> : "Leave the map"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
