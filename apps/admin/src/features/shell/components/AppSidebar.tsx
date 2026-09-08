import { Link, useLocation } from "react-router";
import { LayoutDashboard, LogOut, Users } from "lucide-react";
import { LogoMark } from "@repo/ui/components/logo-mark";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@repo/ui/components/sidebar";
import { useAdminLogout, useAuth } from "@/features/auth";

const navItems = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Users", href: "/users", icon: Users },
] as const;

export function AppSidebar() {
  const { pathname } = useLocation();
  const { user } = useAuth();
  const logout = useAdminLogout();

  return (
    <Sidebar collapsible="icon" className="dark">
      <SidebarHeader className="overflow-hidden px-3 py-4 transition-[padding] duration-200 ease-linear group-data-[collapsible=icon]:px-1.5">
        <div className="flex items-center gap-3 overflow-hidden">
          <LogoMark className="size-9 shrink-0" />
          <div className="min-w-0 overflow-hidden opacity-100 transition-opacity duration-200 ease-linear group-data-[collapsible=icon]:opacity-0">
            <p className="truncate text-[10px] font-medium tracking-[0.28em] text-brand uppercase">
              Staff
            </p>
            <p className="truncate text-sm font-semibold tracking-tight text-sidebar-foreground">
              SkillQuest
            </p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-3 text-[10px] tracking-[0.22em] text-sidebar-foreground/70 uppercase">
            Console
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    render={<Link to={item.href} />}
                    isActive={pathname === item.href}
                    tooltip={item.title}
                    className="rounded-none"
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarSeparator />

      <SidebarFooter className="px-3 py-3">
        {user ? (
          <div className="mb-2 min-w-0 px-1 group-data-[collapsible=icon]:hidden">
            <p className="truncate text-sm font-medium text-sidebar-foreground">
              {user.full_name}
            </p>
            <p className="text-[10px] font-medium tracking-[0.2em] text-sidebar-foreground/70 uppercase">
              Role · {user.role}
            </p>
          </div>
        ) : null}
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => logout.mutate()}
              disabled={logout.isPending}
              tooltip="Sign out"
              className="rounded-none"
            >
              <LogOut />
              <span>{logout.isPending ? "Signing out" : "Sign out"}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
