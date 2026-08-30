import { create } from "zustand";
import { LOCAL_STORAGE_AUTH_KEY } from "@/constants/local-storage";

type AuthUser = {
  id: string;
  name: string;
  email: string;
  role?: string;
};

type AuthState = {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (payload: { user: AuthUser; token: string }) => void;
  logout: () => void;
};

const getStoredAuth = () => {
  const auth = localStorage.getItem(LOCAL_STORAGE_AUTH_KEY);

  if (!auth) return null;

  try {
    return JSON.parse(auth);
  } catch {
    return null;
  }
};

const storedAuth = getStoredAuth();

export const useAuthStore = create<AuthState>((set) => ({
  user: storedAuth?.user || null,
  token: storedAuth?.token || null,
  isAuthenticated: Boolean(storedAuth?.token),

  setAuth: (payload) => {
    localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, JSON.stringify(payload));

    set({
      user: payload.user,
      token: payload.token,
      isAuthenticated: true,
    });
  },

  logout: () => {
    localStorage.removeItem(LOCAL_STORAGE_AUTH_KEY);

    set({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  },
}));