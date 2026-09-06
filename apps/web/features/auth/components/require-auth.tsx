"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { QuestLoadingScreen } from "@repo/ui/components/quest-loading-screen";
import { homePath, useAuth } from "../session";

type RequireAuthProps = {
  instructor?: boolean;
  children: ReactNode;
};

export function RequireAuth({ instructor = false, children }: RequireAuthProps) {
  const router = useRouter();
  const { user, ready } = useAuth();

  useEffect(() => {
    if (!ready) return;

    if (!user || user.role !== "USER") {
      router.replace("/login");
      return;
    }

    if (user.is_instructor !== instructor) {
      router.replace(homePath());
    }
  }, [ready, user, instructor, router]);

  if (
    !ready ||
    !user ||
    user.role !== "USER" ||
    user.is_instructor !== instructor
  ) {
    return <QuestLoadingScreen />;
  }

  return children;
}
