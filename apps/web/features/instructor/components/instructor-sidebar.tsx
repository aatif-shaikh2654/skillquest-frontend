"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FileText,
  LayoutDashboard,
  PlusSquare,
  Sparkles,
  Users,
} from "lucide-react";
import { LogoMark } from "@repo/ui/components/logo-mark";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@repo/ui/components/sidebar";
import { toast } from "@repo/ui/lib/toast";

const deskItems = [
  { title: "Desk", href: "/instructor", icon: LayoutDashboard },
  { title: "Create quest", icon: PlusSquare },
  { title: "Learners", icon: Users },
  { title: "XP", icon: Sparkles },
  { title: "Drafts", icon: FileText },
] as const;

export function InstructorSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" className="dark">
      <SidebarHeader className="overflow-hidden px-3 py-4 transition-[padding] duration-200 ease-linear group-data-[collapsible=icon]:px-1.5">
        <Link
          href="/instructor"
          className="flex items-center gap-3 overflow-hidden"
        >
          <LogoMark className="size-9 shrink-0" />
          <div className="min-w-0 overflow-hidden opacity-100 transition-opacity duration-200 ease-linear group-data-[collapsible=icon]:opacity-0">
            <p className="truncate text-[10px] font-medium tracking-[0.28em] text-brand uppercase">
              Instructor
            </p>
            <p className="truncate text-sm font-semibold tracking-tight text-sidebar-foreground">
              SkillQuest
            </p>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-3 text-[10px] tracking-[0.22em] text-sidebar-foreground/70 uppercase">
            Desk
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {deskItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {"href" in item ? (
                    <SidebarMenuButton
                      render={<Link href={item.href} />}
                      isActive={pathname === item.href}
                      tooltip={item.title}
                      className="rounded-none"
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  ) : (
                    <SidebarMenuButton
                      tooltip={item.title}
                      className="rounded-none"
                      onClick={() => toast.info("Coming online")}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
