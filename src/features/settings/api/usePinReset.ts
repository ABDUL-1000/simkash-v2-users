import { useMutation } from "@tanstack/react-query";
import { create } from "zustand";
import { authedHttpClient } from "@/utils/http/auth";
import type { ApiResponse } from "@/features/auth/types/api";

async function post<T>(url: string, body?: object): Promise<T> {
  const response = await authedHttpClient.post<ApiResponse<T>>(url, body ?? {});
  if (!response.data?.success) throw new Error(response.data?.message || "Request failed");
  return response.data.data;
}

/** POST /user/pin/reset/request — emails a 6-digit code (also used for Resend). */
export const useRequestPinReset = () =>
  useMutation({ mutationFn: () => post<{ message: string; email: string; expiresIn: number }>("/user/pin/reset/request") });

/** POST /user/pin/reset/verify — returns a single-use reset_token (keep it in memory only). */
export const useVerifyPinResetOtp = () =>
  useMutation({ mutationFn: (otp: string) => post<{ message: string; reset_token: string; expiresIn: number }>("/user/pin/reset/verify", { otp }) });

/** POST /user/pin/reset — sets the new PIN with the reset_token. */
export const useResetPin = () =>
  useMutation({
    mutationFn: (body: { reset_token: string; new_pin: string; confirm_new_pin: string }) => post<{ message: string }>("/user/pin/reset", body),
  });

/** Lets any PIN prompt open the Forgot PIN flow (mounted once in the app layout). */
export const useForgotPinStore = create<{ open: boolean; show: () => void; hide: () => void }>((set) => ({
  open: false,
  show: () => set({ open: true }),
  hide: () => set({ open: false }),
}));
