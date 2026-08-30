import { useContext } from "react";
import { NetworkStatusContext } from "@/providers/network-status-context";
export function useNetworkState() { return { isOnline: useContext(NetworkStatusContext) }; }
