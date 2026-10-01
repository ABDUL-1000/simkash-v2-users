import { getNetworkColor } from "@/features/bill-payment/utils/networkColors";

export function NetworkBadge({ network }: { network: string }) {
  return <span className={`rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase ${getNetworkColor(network)}`}>{network}</span>;
}
