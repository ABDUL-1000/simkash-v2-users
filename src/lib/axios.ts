import axios from "axios";
import { LOCAL_STORAGE_AUTH_KEY } from "@/constants/local-storage";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 30000,
});

apiClient.interceptors.request.use((config) => {
  const auth = localStorage.getItem(LOCAL_STORAGE_AUTH_KEY);

  if (auth) {
    const parsedAuth = JSON.parse(auth);

    if (parsedAuth?.token) {
      config.headers.Authorization = `Bearer ${parsedAuth.token}`;
    }
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      error?.message ||
      "Request failed";

    return Promise.reject(new Error(message));
  }
);