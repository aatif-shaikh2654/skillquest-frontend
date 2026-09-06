import { cookies } from "next/headers";
import type { User } from "@repo/types";
import { getMe } from "./services/auth.service";

export async function getCurrentUser(): Promise<User | null> {
  const store = await cookies();
  const cookie = store
    .getAll()
    .map((part) => `${part.name}=${part.value}`)
    .join("; ");

  if (!cookie) return null;

  try {
    const response = await getMe({ headers: { Cookie: cookie } });
    return response.data;
  } catch {
    return null;
  }
}
