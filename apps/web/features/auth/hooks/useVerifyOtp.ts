"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "@repo/ui/lib/toast";
import { homePath, useAuth } from "../session";
import { verifyOtp } from "../services/auth.service";
import { safeNextPath } from "../utils/next-path";

export function useVerifyOtp() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setUser } = useAuth();
  const next = safeNextPath(searchParams.get("next"));

  return useMutation({
    mutationFn: verifyOtp,
    onSuccess: (response) => {
      setUser(response.data);
      toast.success("Signed in");
      router.replace(next ?? homePath());
    },
  });
}
