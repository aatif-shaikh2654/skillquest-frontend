"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "@repo/ui/lib/toast";
import { homePath, useAuth } from "../session";
import { socialLogin } from "../services/auth.service";

export function useSocialLogin() {
  const router = useRouter();
  const { setUser } = useAuth();

  return useMutation({
    mutationFn: socialLogin,
    onSuccess: (response) => {
      setUser(response.data);
      toast.success("Signed in");
      router.push(homePath());
    },
  });
}
