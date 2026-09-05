import type { AuthResponse, LoginRequest, SignupRequest } from "@repo/types";
import { api } from "@/lib/axios";

export function login(body: LoginRequest) {
  return api.post<AuthResponse>("/auth/login", body).then((response) => response.data);
}

export function signup(body: SignupRequest) {
  return api.post<AuthResponse>("/auth/signup", body).then((response) => response.data);
}
