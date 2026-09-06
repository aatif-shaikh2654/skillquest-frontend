import { createBrowserRouter } from "react-router";
import { LoginPage } from "@/features/auth";
import { DashboardPage } from "@/features/dashboard";

export const router = createBrowserRouter([
  { path: "/", Component: LoginPage },
  { path: "/dashboard", Component: DashboardPage },
]);
