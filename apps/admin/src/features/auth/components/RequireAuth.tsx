import { useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router";
import { QuestLoadingScreen } from "@repo/ui/components/quest-loading-screen";
import { useAuth } from "../context";

function isAdminRole(role: string) {
  return role === "ADMIN" || role === "SUPER_ADMIN";
}

type RequireAuthProps = {
  children: ReactNode;
};

export function RequireAuth({ children }: RequireAuthProps) {
  const navigate = useNavigate();
  const { user, ready } = useAuth();

  useEffect(() => {
    if (!ready) return;

    if (!user || !isAdminRole(user.role)) {
      navigate("/", { replace: true });
    }
  }, [ready, user, navigate]);

  if (!ready || !user || !isAdminRole(user.role)) {
    return <QuestLoadingScreen />;
  }

  return children;
}
