import { createBrowserRouter } from "react-router";
import { LoginPage } from "@/features/auth";
import { DashboardPage } from "@/features/dashboard";
import { AppLayout } from "@/features/shell";
import { UsersPage } from "@/features/users";

export const router = createBrowserRouter([
  { path: "/", Component: LoginPage },
  {
    Component: AppLayout,
    children: [
      { path: "dashboard", Component: DashboardPage },
      { path: "users", Component: UsersPage },
    ],
  },
]);
