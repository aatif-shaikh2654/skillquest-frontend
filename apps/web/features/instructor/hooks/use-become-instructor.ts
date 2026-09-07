"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "@repo/ui/lib/toast";
import { useAuth } from "@/features/auth";
import { ApiError } from "@/lib/axios";
import { becomeInstructor } from "../services/instructor.service";

export function useBecomeInstructor() {
  const { user, setUser } = useAuth();

  return useMutation({
    mutationFn: becomeInstructor,
    onSuccess: (response) => {
      setUser(response.data);
      toast.success(response.message);
    },
    onError: (error) => {
      if (error instanceof ApiError && error.status === 409 && user) {
        setUser({ ...user, is_instructor: true });
      }
    },
  });
}
