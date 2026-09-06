import { Outlet } from "react-router";
import { SidebarInset, SidebarProvider } from "@repo/ui/components/sidebar";
import { RequireAuth } from "@/features/auth";
import { AppHeader } from "./app-header";
import { AppSidebar } from "./app-sidebar";

export function AppLayout() {
  return (
    <RequireAuth>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <AppHeader />
          <Outlet />
        </SidebarInset>
      </SidebarProvider>
    </RequireAuth>
  );
}
