"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { signup } from "../services/auth.service";
import { safeNextPath, verifyOtpPath } from "../utils/next-path";

export function useSignup() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = safeNextPath(searchParams.get("next"));

  return useMutation({
    mutationFn: signup,
    onSuccess: (_response, variables) => {
      router.push(
        verifyOtpPath(variables.email.trim().toLowerCase(), next),
      );
    },
  });
}
