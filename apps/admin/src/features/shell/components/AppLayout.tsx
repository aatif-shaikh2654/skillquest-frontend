import { Outlet } from "react-router";
import { SidebarInset, SidebarProvider } from "@repo/ui/components/sidebar";
import { RequireAuth } from "@/features/auth";
import { AppHeader } from "./AppHeader";
import { AppSidebar } from "./AppSidebar";

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
