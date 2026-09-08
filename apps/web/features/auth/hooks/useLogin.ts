"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { login } from "../services/auth.service";
import { safeNextPath, verifyOtpPath } from "../utils/nextPath";

export function useLogin() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = safeNextPath(searchParams.get("next"));

  return useMutation({
    mutationFn: login,
    onSuccess: (_response, variables) => {
      router.push(
        verifyOtpPath(variables.email.trim().toLowerCase(), next),
      );
    },
  });
}
