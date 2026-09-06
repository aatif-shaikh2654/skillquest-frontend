import { createContext, useContext } from "react";
import type { AdminUser } from "@repo/types";

export type AuthContextValue = {
  user: AdminUser | null;
  ready: boolean;
  setUser: (user: AdminUser | null) => void;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
