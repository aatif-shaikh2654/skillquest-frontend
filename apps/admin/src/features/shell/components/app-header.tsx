import { useLocation } from "react-router";
import { SidebarTrigger } from "@repo/ui/components/sidebar";

const titles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/users": "Users",
};

export function AppHeader() {
  const { pathname } = useLocation();
  const title = titles[pathname] ?? "Staff";

  return (
    <header className="flex h-14 items-center gap-3 border-b border-sidebar-border bg-background px-4">
      <SidebarTrigger className="-ml-1" />
      <div className="min-w-0">
        <p className="text-[10px] font-medium tracking-[0.28em] text-brand uppercase">
          Staff console
        </p>
        <h1 className="truncate text-sm font-semibold tracking-tight">
          {title}
        </h1>
      </div>
    </header>
  );
}
