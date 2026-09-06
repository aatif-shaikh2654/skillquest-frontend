"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { homePath, useAuth } from "../session";
import { becomeInstructor } from "../services/auth.service";

export function useBecomeInstructor() {
  const router = useRouter();
  const { setUser } = useAuth();

  return useMutation({
    mutationFn: becomeInstructor,
    onSuccess: (response) => {
      setUser(response.data);
      router.replace(homePath(response.data));
    },
  });
}
