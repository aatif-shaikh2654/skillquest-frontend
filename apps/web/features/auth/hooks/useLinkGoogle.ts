"use client";

import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../Session";
import { linkGoogle } from "../services/auth.service";

export function useLinkGoogle() {
  const { setUser } = useAuth();

  return useMutation({
    mutationFn: linkGoogle,
    onSuccess: (response) => {
      setUser(response.data);
    },
  });
}
