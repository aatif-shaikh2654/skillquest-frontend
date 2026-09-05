import axios, { isAxiosError } from "axios";

const FALLBACK = "Something went wrong. Try again.";

function apiBaseUrl() {
  const publicUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000";

  if (typeof window === "undefined") {
    return process.env.API_URL ?? publicUrl;
  }

  return publicUrl;
}

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
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

export const api = axios.create({
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
  (error: unknown) => Promise.reject(toApiError(error)),
);
