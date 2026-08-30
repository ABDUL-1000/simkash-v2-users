// src/constants/query-keys.ts
export const QUERY_KEYS = {
  dashboard: {
    overview: ["dashboard", "overview"],
  },
  users: {
    all: ["users"],
    detail: (id: string) => ["users", id],
  },
  transactions: {
    all: ["transactions"],
  },
  wallets: {
    all: ["wallets"],
  },
};