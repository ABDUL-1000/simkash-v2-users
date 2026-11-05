import { useGetAuthUser } from "@/features/auth/api/useGetAuthUser";

/** Main wallet balance from GET /user/auth/me — what agent payouts withdraw from. /me returns it as a string, so coerce. */
export function useMainWalletBalance() {
  const { wallet, isLoading } = useGetAuthUser();
  return { balance: Number(wallet?.balance ?? 0) || 0, isLoading: isLoading && !wallet };
}
