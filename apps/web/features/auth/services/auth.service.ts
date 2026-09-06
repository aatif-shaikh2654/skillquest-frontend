import type { AxiosRequestConfig } from "axios";
import type {
  AuthUserResponse,
  LinkGoogleRequest,
  LoginRequest,
  MessageResponse,
  ResendOtpRequest,
  SignupRequest,
  SocialLoginRequest,
  VerifyOtpRequest,
} from "@repo/types";
import { api } from "@/lib/axios";

export function login(body: LoginRequest) {
  return api
    .post<MessageResponse>("/auth/login", body)
    .then((response) => response.data);
}

export function signup(body: SignupRequest) {
  return api
    .post<AuthUserResponse>("/auth/signup", body)
    .then((response) => response.data);
}

export function resendOtp(body: ResendOtpRequest) {
  return api
    .post<MessageResponse>("/auth/resend-otp", body)
    .then((response) => response.data);
}

export function verifyOtp(body: VerifyOtpRequest) {
  return api
    .post<AuthUserResponse>("/auth/verify-otp", body)
    .then((response) => response.data);
}

export function socialLogin(body: SocialLoginRequest) {
  return api
    .post<AuthUserResponse>("/auth/social-login", body)
    .then((response) => response.data);
}

export function linkGoogle(body: LinkGoogleRequest) {
  return api
    .post<AuthUserResponse>("/auth/link-google", body)
    .then((response) => response.data);
}

export function becomeInstructor() {
  return api
    .post<AuthUserResponse>("/auth/become-instructor")
    .then((response) => response.data);
}

export function getMe(config?: AxiosRequestConfig) {
  return api
    .get<AuthUserResponse>("/user/me", config)
    .then((response) => response.data);
}

export function refresh() {
  return api
    .post<AuthUserResponse>("/auth/refresh")
    .then((response) => response.data);
}

export function logout() {
  return api
    .post<MessageResponse>("/auth/logout")
    .then((response) => response.data);
}
