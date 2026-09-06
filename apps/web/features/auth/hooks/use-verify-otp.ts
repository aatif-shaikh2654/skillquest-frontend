"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "@repo/ui/lib/toast";
import { homePath, useAuth } from "../session";
import { verifyOtp } from "../services/auth.service";

export function useVerifyOtp() {
  const router = useRouter();
  const { setUser } = useAuth();

  return useMutation({
    mutationFn: verifyOtp,
    onSuccess: (response) => {
      setUser(response.data);
      toast.success("Signed in");
      router.replace(homePath());
    },
  });
}
