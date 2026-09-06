import type { AdminLoginRequest, AdminLoginResponse } from "@repo/types";
import { api } from "@/lib/axios";

export function adminLogin(body: AdminLoginRequest) {
  return api
    .post<AdminLoginResponse>("/auth/admin/login", body)
    .then((response) => response.data);
}

export function getMe() {
  return api
    .get<AdminLoginResponse>("/user/me")
    .then((response) => response.data);
}
