import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../context";
import { adminLogout } from "../services/auth.service";

export function useAdminLogout() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  return useMutation({
    mutationFn: adminLogout,
    onSettled: () => {
      setUser(null);
      navigate("/", { replace: true });
    },
  });
}
