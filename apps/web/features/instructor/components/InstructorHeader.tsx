"use client";

import Link from "next/link";
import type { User } from "@repo/types";
import { SidebarTrigger } from "@repo/ui/components/sidebar";
import { PlayerMenu } from "@/features/landing";

type InstructorHeaderProps = {
  user: User;
};

export function InstructorHeader({ user }: InstructorHeaderProps) {
  return (
    <header className="flex h-14 items-center gap-3 border-b border-foreground/10 bg-background px-4">
      <SidebarTrigger className="-ml-1" />
      <div className="min-w-0">
        <p className="text-[10px] font-medium tracking-[0.28em] text-brand uppercase">
          Instructor
        </p>
        <h1 className="truncate text-sm font-semibold tracking-tight">Desk</h1>
      </div>
      <div className="ml-auto flex items-center gap-2 sm:gap-3">
        <Link
          href="/"
          className="inline-flex h-10 items-center border-2 border-foreground bg-primary px-3 text-sm font-medium tracking-tight text-foreground transition-colors hover:bg-primary-hover sm:px-4"
        >
          Student
        </Link>
        <PlayerMenu user={user} tone="light" />
      </div>
    </header>
  );
}
