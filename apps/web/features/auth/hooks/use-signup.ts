"use client";

import { useMutation } from "@tanstack/react-query";
import { signup } from "@/features/auth/services/auth.service";

export function useSignup() {
  return useMutation({
    mutationFn: signup,
  });
}
