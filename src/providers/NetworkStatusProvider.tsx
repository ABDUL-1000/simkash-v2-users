import { useEffect, useState, type ReactNode } from "react";
import { NetworkStatusContext } from "./network-status-context";
export function NetworkStatusProvider({ children }: { children: ReactNode }) {
  const [online, setOnline] = useState(() => navigator.onLine);
  useEffect(() => {
    const update = () => setOnline(navigator.onLine);
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
    };
  }, []);
  return (
    <NetworkStatusContext.Provider value={online}>
      {children}
      {!online && (
        <div
          role="status"
          className="fixed inset-x-0 bottom-0 z-[100] bg-destructive px-4 py-2 text-center text-sm text-white"
        >
          You are offline. Some data may be unavailable.
        </div>
      )}
    </NetworkStatusContext.Provider>
  );
}
