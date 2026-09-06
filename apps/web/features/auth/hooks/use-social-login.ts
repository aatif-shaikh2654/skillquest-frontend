"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { homePath, useAuth } from "../session";
import { socialLogin } from "../services/auth.service";

export function useSocialLogin() {
  const router = useRouter();
  const { setUser } = useAuth();

  return useMutation({
    mutationFn: socialLogin,
    onSuccess: (response) => {
      setUser(response.data);
      router.push(homePath(response.data));
    },
  });
}
