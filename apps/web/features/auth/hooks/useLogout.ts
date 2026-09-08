"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../session";
import { logout } from "../services/auth.service";

export function useLogout() {
  const router = useRouter();
  const { setUser } = useAuth();

  return useMutation({
    mutationFn: logout,
    onSettled: () => {
      setUser(null);
      router.push("/login");
    },
  });
}
