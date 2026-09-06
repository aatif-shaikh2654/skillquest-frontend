import { useMutation } from "@tanstack/react-query";
import { adminLogin } from "../services/auth.service";

export function useAdminLogin() {
  return useMutation({
    mutationFn: adminLogin,
  });
}
