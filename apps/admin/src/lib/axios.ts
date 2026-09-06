import axios, { isAxiosError } from "axios";

const FALLBACK = "Something went wrong. Try again.";

const SKIP_UNAUTHORIZED_REDIRECT = [
  "/admin/login",
  "/admin/me",
  "/admin/logout",
];

function apiBaseUrl() {
  return import.meta.env.VITE_API_URL ?? "http://localhost:8000";
}

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

type SessionHandlers = {
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

function toApiError(error: unknown) {
  if (error instanceof ApiError) return error;

  if (!isAxiosError(error)) {
    return new ApiError(FALLBACK, 500);
  }

  return new ApiError(
    messageFromPayload(error.response?.data, error.message || FALLBACK),
    error.response?.status ?? 500,
  );
}

function shouldSkipUnauthorizedRedirect(url?: string) {
  if (!url) return false;
  return SKIP_UNAUTHORIZED_REDIRECT.some((path) => url.includes(path));
}

function clearUnauthorizedSession(url?: string) {
  if (shouldSkipUnauthorizedRedirect(url)) return;

  sessionHandlers?.onClear();
  sessionHandlers?.onUnauthorized();
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
      return Promise.reject(
        new ApiError(messageFromPayload(payload, FALLBACK), response.status),
      );
    }

    return response;
  },
  (error: unknown) => {
    if (isAxiosError(error)) {
      const status = error.response?.status;
      if (status === 401 || status === 403) {
        clearUnauthorizedSession(error.config?.url);
      }
    }

    return Promise.reject(toApiError(error));
  },
);
