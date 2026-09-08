"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import type { User } from "@repo/types";
import { registerSessionHandlers } from "@/lib/axios";
import { getMe } from "./services/auth.service";

const LOGGED_IN_KEY = "isLoggedIn";

export function homePath() {
  return "/";
}

type AuthContextValue = {
  user: User | null;
  ready: boolean;
  setUser: (user: User | null) => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUserState] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  const setUser = useCallback((next: User | null) => {
    localStorage.setItem(LOGGED_IN_KEY, String(next !== null));
    setUserState(next);
  }, []);

  useEffect(() => {
    registerSessionHandlers({
      onUser: setUser,
      onClear: () => setUser(null),
      onUnauthorized: () => router.replace("/login"),
    });

    const session =
      localStorage.getItem(LOGGED_IN_KEY) === "true"
        ? getMe()
            .then((response) => setUser(response.data))
            .catch(() => setUser(null))
        : Promise.resolve();

    void session.finally(() => setReady(true));

    return () => registerSessionHandlers(null);
  }, [setUser, router]);

  return (
    <AuthContext.Provider value={{ user, ready, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
