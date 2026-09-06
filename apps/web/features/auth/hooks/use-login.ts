"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { login } from "../services/auth.service";

export function useLogin() {
  const router = useRouter();

  return useMutation({
    mutationFn: login,
    onSuccess: (_response, variables) => {
      router.push(
        `/verify-otp?email=${encodeURIComponent(variables.email.trim().toLowerCase())}`,
      );
    },
  });
}
