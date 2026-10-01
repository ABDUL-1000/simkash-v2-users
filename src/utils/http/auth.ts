import axios from "axios";
import { useAuthStore } from "@/store/authStore";
import { appPaths } from "@/app/router/paths";

export const authedHttpClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "",
  timeout: 30000,
});

authedHttpClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

authedHttpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const message =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      "An unexpected error occurred. Please try again.";

    // Handle 401 Unauthorized
    if (status === 401) {
      useAuthStore.getState().clearAuth();
      if (
        typeof window !== "undefined" &&
        !window.location.pathname.startsWith("/auth/")
      ) {
        window.location.href = appPaths.login;
      }
    }

    return Promise.reject(new Error(message));
  }
);
