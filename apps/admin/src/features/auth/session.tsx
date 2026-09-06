import { useCallback, useEffect, useState, type ReactNode } from "react";
import type { AdminUser } from "@repo/types";
import { registerSessionHandlers } from "@/lib/axios";
import { AuthContext } from "./context";
import { getMe } from "./services/auth.service";

const LOGGED_IN_KEY = "isLoggedIn";

let hydrate: Promise<AdminUser | null> | null = null;

function resetHydrate() {
  hydrate = null;
}

function hydrateUser() {
  if (!hydrate) {
    hydrate = getMe()
      .then((response) => response.data)
      .catch(() => {
        resetHydrate();
        return null;
      });
  }

  return hydrate;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<AdminUser | null>(null);
  const [ready, setReady] = useState(false);

  const setUser = useCallback((next: AdminUser | null) => {
    localStorage.setItem(LOGGED_IN_KEY, String(next !== null));
    if (next === null) {
      resetHydrate();
    }
    setUserState(next);
  }, []);

  useEffect(() => {
    registerSessionHandlers({
      onClear: () => setUser(null),
      onUnauthorized: () => {
        if (window.location.pathname !== "/") {
          window.location.assign("/");
        }
      },
    });

    const session =
      localStorage.getItem(LOGGED_IN_KEY) === "true"
        ? hydrateUser().then(setUser)
        : Promise.resolve();

    void session.finally(() => setReady(true));

    return () => registerSessionHandlers(null);
  }, [setUser]);

  return (
    <AuthContext.Provider value={{ user, ready, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
