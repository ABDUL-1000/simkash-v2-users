import type { QueryClient } from "@tanstack/react-query";

export function invalidateScOperations(client: QueryClient, userId: number | undefined) {
  return client.invalidateQueries({ predicate: ({ queryKey }) => queryKey[1] === userId &&
    (queryKey[0] === "state-coordinator" || (typeof queryKey[0] === "string" && queryKey[0].startsWith("sc-"))) });
}
