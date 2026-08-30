import { apiClient } from "@/lib/axios";
import type { ILoginPayload, ILoginResponse } from "../types/auth.types";

export const loginAdmin = async (payload: ILoginPayload) => {
  const response = await apiClient.post<ILoginResponse>(
    "/api/v1/admin/auth/login",
    payload
  );

  return response.data;
};