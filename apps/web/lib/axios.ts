import axios, { isAxiosError } from "axios";
import type { InternalAxiosRequestConfig } from "axios";
import type { User } from "@repo/types";

const FALLBACK = "Something went wrong. Try again.";

const SKIP_REFRESH = [
  "/auth/refresh",
  "/auth/login",
  "/auth/logout",
  "/auth/signup",
  "/auth/social-login",
  "/auth/resend-otp",
  "/auth/verify-otp",
];

const SKIP_UNAUTHORIZED_REDIRECT = ["/user/me"];

function apiBaseUrl() {
  const publicUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

  if (typeof window === "undefined") {
    return process.env.API_URL ?? publicUrl;
  }

  return publicUrl;
}

export class ApiError extends Error {
  status: number;
  field?: string;

  constructor(message: string, status: number, field?: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.field = field;
  }
}

type SessionHandlers = {
  onUser: (user: User) => void;
  onClear: () => void;
  onUnauthorized: () => void;
};

let sessionHandlers: SessionHandlers | null = null;

export function registerSessionHandlers(handlers: SessionHandlers | null) {
  sessionHandlers = handlers;
}

function messageFromPayload(payload: unknown, fallback: string) {
  if (
    typeof payload === "object" &&
    payload &&
    "message" in payload &&
    typeof payload.message === "string" &&
    payload.message.trim()
  ) {
    return payload.message;
  }

  return fallback;
}

function fieldFromMessage(message: string, status: number) {
  if (status !== 422) return undefined;
  const separator = message.indexOf(":");
  if (separator <= 0) return undefined;
  const field = message.slice(0, separator).trim();
  return field || undefined;
}

function toApiError(error: unknown) {
  if (error instanceof ApiError) return error;

  if (!isAxiosError(error)) {
    return new ApiError(FALLBACK, 500);
  }

  const status = error.response?.status ?? 500;
  const message = messageFromPayload(
    error.response?.data,
    error.message || FALLBACK,
  );

  return new ApiError(message, status, fieldFromMessage(message, status));
}

function shouldSkipRefresh(url?: string) {
  if (!url) return true;
  return SKIP_REFRESH.some((path) => url.includes(path));
}

function shouldSkipUnauthorizedRedirect(url?: string) {
  if (!url) return false;
  return SKIP_UNAUTHORIZED_REDIRECT.some((path) => url.includes(path));
}

function isUser(value: unknown): value is User {
  if (typeof value !== "object" || !value) return false;
  return (
    "id" in value &&
    "email" in value &&
    "role" in value &&
    "is_instructor" in value &&
    typeof value.is_instructor === "boolean"
  );
}

type RetryConfig = InternalAxiosRequestConfig & { _retry?: boolean };

let refreshPromise: Promise<boolean> | null = null;

function refreshSession() {
  if (!refreshPromise) {
    refreshPromise = api
      .post("/auth/refresh")
      .then((response) => {
        const payload = response.data;
        if (
          typeof payload === "object" &&
          payload &&
          "data" in payload &&
          isUser(payload.data)
        ) {
          sessionHandlers?.onUser(payload.data);
        }
        return true;
      })
      .catch(() => {
        sessionHandlers?.onClear();
        return false;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
}

export const api = axios.create({
  withCredentials: true,
  headers: {
    accept: "application/json",
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  config.baseURL = apiBaseUrl();
  return config;
});

api.interceptors.response.use(
  (response) => {
    const payload = response.data;
    if (
      typeof payload === "object" &&
      payload &&
      "success" in payload &&
      payload.success === false
    ) {
      const message = messageFromPayload(payload, FALLBACK);
      return Promise.reject(
        new ApiError(
          message,
          response.status,
          fieldFromMessage(message, response.status),
        ),
      );
    }

    return response;
  },
  async (error: unknown) => {
    if (!isAxiosError(error) || error.response?.status !== 401) {
      return Promise.reject(toApiError(error));
    }

    const config = error.config as RetryConfig | undefined;
    if (!config || config._retry || shouldSkipRefresh(config.url)) {
      return Promise.reject(toApiError(error));
    }

    config._retry = true;
    const refreshed = await refreshSession();
    if (!refreshed) {
      if (!shouldSkipUnauthorizedRedirect(config.url)) {
        sessionHandlers?.onUnauthorized();
      }
      return Promise.reject(toApiError(error));
    }

    return api(config);
  },
);
