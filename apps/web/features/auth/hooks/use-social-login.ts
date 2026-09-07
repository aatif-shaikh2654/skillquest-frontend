"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "@repo/ui/lib/toast";
import { homePath, useAuth } from "../session";
import { socialLogin } from "../services/auth.service";
import { safeNextPath } from "../utils/next-path";

export function useSocialLogin() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setUser } = useAuth();
  const next = safeNextPath(searchParams.get("next"));

  return useMutation({
    mutationFn: socialLogin,
    onSuccess: (response) => {
      setUser(response.data);
      toast.success("Signed in");
      router.push(next ?? homePath());
    },
  });
}
