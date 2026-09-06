import type { AdminUsersResponse } from "@repo/types";
import { api } from "@/lib/axios";

export const USERS_PAGE_SIZE = 20;

export type UsersListParams = {
  page?: number;
  limit?: number;
  search?: string;
};

export function getUsers(params: UsersListParams = {}) {
  const page = Math.max(1, params.page ?? 1);
  const limit = Math.min(100, Math.max(1, params.limit ?? USERS_PAGE_SIZE));
  const search = params.search?.trim();

  return api
    .get<AdminUsersResponse>("/admin/users", {
      params: {
        page,
        limit,
        ...(search ? { search } : {}),
      },
    })
    .then((response) => response.data);
}
