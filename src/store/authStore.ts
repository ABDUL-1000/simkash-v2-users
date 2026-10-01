import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface UserState {
  id: number;
  username?: string;
  email: string;
  phone?: string | null;
  status?: string;
  pin?: string | null;
  isProfileComplete: boolean;
  isVerified: boolean;
  isCompany?: boolean;
  source?: string;
  role: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserProfile {
  id: number;
  user_id: number;
  fullname: string;
  gender: string;
  country: string;
  currency: string;
  profile_picture?: string;
  role: string;
}

export interface UserWallet {
  id: number;
  user_id: number;
  balance: number;
  commission_balance: number;
  profit_balance: number;
}

export interface AuthStoreState {
  accessToken: string | null;
  refreshToken: string | null;
  user: UserState | null;
  userProfile: UserProfile | null;
  wallet: UserWallet | null;
  isAuthenticated: boolean;
  setAuth: (payload: {
    accessToken: string;
    refreshToken?: string;
    user: UserState;
    userProfile?: UserProfile;
    wallet?: UserWallet;
  }) => void;
  updateUser: (user: Partial<UserState>) => void;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  updateWallet: (wallet: Partial<UserWallet>) => void;
  clearAuth: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStoreState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      user: null,
      userProfile: null,
      wallet: null,
      isAuthenticated: false,

      setAuth: (payload) =>
        set({
          accessToken: payload.accessToken,
          refreshToken: payload.refreshToken ?? null,
          user: payload.user,
          userProfile: payload.userProfile ?? null,
          wallet: payload.wallet ?? null,
          isAuthenticated: Boolean(payload.accessToken),
        }),

      updateUser: (partialUser) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...partialUser } : null,
        })),

      updateUserProfile: (partialProfile) =>
        set((state) => ({
          userProfile: state.userProfile
            ? { ...state.userProfile, ...partialProfile }
            : null,
        })),

      updateWallet: (partialWallet) =>
        set((state) => ({
          wallet: state.wallet ? { ...state.wallet, ...partialWallet } : null,
        })),

      clearAuth: () =>
        set({
          accessToken: null,
          refreshToken: null,
          user: null,
          userProfile: null,
          wallet: null,
          isAuthenticated: false,
        }),

      logout: () =>
        set({
          accessToken: null,
          refreshToken: null,
          user: null,
          userProfile: null,
          wallet: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: "simkash_auth_storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
