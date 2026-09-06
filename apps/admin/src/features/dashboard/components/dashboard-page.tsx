import { HudCorners } from "@repo/ui/components/hud-corners";
import { RequireAuth, useAuth } from "@/features/auth";

function DashboardContent() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <main className="min-h-svh bg-background px-4 py-8 sm:px-8">
      <div className="mx-auto flex w-full max-w-lg flex-col gap-8">
        <div className="relative border border-foreground/10 bg-card px-5 py-6">
          <HudCorners size="sm" tone="ink" />
          <p className="text-[10px] font-medium tracking-[0.28em] text-brand uppercase">
            Dashboard
          </p>
          <h1 className="mt-3 text-2xl font-bold tracking-tight">
            {user.full_name}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">{user.email}</p>
          <p className="mt-4 text-[10px] font-medium tracking-[0.2em] text-muted-foreground uppercase">
            Role · {user.role}
          </p>
        </div>
      </div>
    </main>
  );
}

export function DashboardPage() {
  return (
    <RequireAuth>
      <DashboardContent />
    </RequireAuth>
  );
}
