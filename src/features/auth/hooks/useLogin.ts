import { useMutation } from "@tanstack/react-query";
import { loginAdmin } from "./auth-api";

export const useLogin = () => {
  return useMutation({
    mutationFn: loginAdmin,
  });
};