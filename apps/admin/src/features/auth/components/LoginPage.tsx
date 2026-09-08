import { useEffect } from "react";
import { useNavigate } from "react-router";
import { HudCorners } from "@repo/ui/components/hud-corners";
import { QuestLoadingScreen } from "@repo/ui/components/quest-loading-screen";
import { useAuth } from "../context";
import { LoginForm } from "./LoginForm";

export function LoginPage() {
  const navigate = useNavigate();
  const { user, ready, setUser } = useAuth();

  useEffect(() => {
    if (ready && user) {
      navigate("/dashboard", { replace: true });
    }
  }, [ready, user, navigate]);

  if (!ready || user) {
    return <QuestLoadingScreen />;
  }

  return (
    <main className="relative flex min-h-svh items-center justify-center overflow-hidden bg-background px-4">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(to right, color-mix(in oklch, var(--teal) 18%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklch, var(--teal) 18%, transparent) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="relative z-10 w-full max-w-[420px]">
        <h1 className="text-[2rem] leading-tight font-bold tracking-tight text-balance sm:text-[2.35rem]">
          Admin sign in
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
          Sign in with your admin email and password.
        </p>
        <div className="relative mt-8 border border-foreground/10 bg-card px-4 py-5 sm:px-5 sm:py-6">
          <HudCorners size="sm" tone="ink" />
          <LoginForm
            onSuccess={(next) => {
              setUser(next);
              navigate("/dashboard");
            }}
          />
        </div>
      </div>
    </main>
  );
}
