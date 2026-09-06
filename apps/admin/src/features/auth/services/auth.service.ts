import type {
  AdminLoginRequest,
  AdminLoginResponse,
  AdminMeResponse,
  MessageResponse,
} from "@repo/types";
import { api } from "@/lib/axios";

export function adminLogin(body: AdminLoginRequest) {
  return api
    .post<AdminLoginResponse>("/admin/login", body)
    .then((response) => response.data);
}

export function getMe() {
  return api
    .get<AdminMeResponse>("/admin/me")
    .then((response) => response.data);
}

export function adminLogout() {
  return api
    .post<MessageResponse>("/admin/logout")
    .then((response) => response.data);
}
