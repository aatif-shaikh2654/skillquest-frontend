const AUTH_PATHS = new Set(["/login", "/signup", "/verify-otp"]);

export function safeNextPath(value: string | null | undefined) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) {
    return null;
  }

  const path = value.split("?")[0] ?? value;
  if (AUTH_PATHS.has(path)) return null;

  return value;
}

function withQuery(path: string, params: Record<string, string | null>) {
  const search = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value) search.set(key, value);
  }

  const query = search.toString();
  return query ? `${path}?${query}` : path;
}

export function loginPath(next?: string | null) {
  return withQuery("/login", { next: safeNextPath(next) });
}

export function signupPath(next?: string | null) {
  return withQuery("/signup", { next: safeNextPath(next) });
}

export function verifyOtpPath(email: string, next?: string | null) {
  return withQuery("/verify-otp", {
    email,
    next: safeNextPath(next),
  });
}
