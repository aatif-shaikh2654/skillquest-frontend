import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getUsers, type UsersListParams } from "../services/users.service";

export function useUsers(params: UsersListParams) {
  return useQuery({
    queryKey: ["admin-users", params],
    queryFn: () => getUsers(params),
    placeholderData: keepPreviousData,
  });
}
