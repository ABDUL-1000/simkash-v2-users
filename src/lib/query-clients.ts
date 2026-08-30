import { QueryClient } from "@tanstack/react-query";
import { notify } from "@/lib/notify";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60,
    },
    mutations: {
      onError: (error: unknown) => {
        const message =
          error instanceof Error ? error.message : "Something went wrong";

        notify.error(message);
      },
    },
  },
});
