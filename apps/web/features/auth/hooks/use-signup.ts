"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { signup } from "../services/auth.service";

export function useSignup() {
  const router = useRouter();

  return useMutation({
    mutationFn: signup,
    onSuccess: (_response, variables) => {
      router.push(
        `/verify-otp?email=${encodeURIComponent(variables.email.trim().toLowerCase())}`,
      );
    },
  });
}
