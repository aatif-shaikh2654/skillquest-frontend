"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { QuestLoadingScreen } from "@repo/ui/components/quest-loading-screen";
import { homePath, useAuth } from "../Session";
import { loginPath } from "../utils/nextPath";

type RequireAuthProps = {
  instructor?: boolean;
  children: ReactNode;
};

export function RequireAuth({ instructor, children }: RequireAuthProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, ready } = useAuth();

  useEffect(() => {
    if (!ready) return;

    if (!user || user.role !== "USER") {
      router.replace(loginPath(pathname));
      return;
    }

    if (instructor === true && !user.is_instructor) {
      router.replace(homePath());
    }
  }, [ready, user, instructor, pathname, router]);

  if (!ready || !user || user.role !== "USER") {
    return <QuestLoadingScreen />;
  }

  if (instructor === true && !user.is_instructor) {
    return <QuestLoadingScreen />;
  }

  return children;
}
