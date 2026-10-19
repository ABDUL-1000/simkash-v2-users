import { AlertTriangle, CheckCircle2, Info } from "lucide-react";
import { NETWORK_LABELS, detectNetworkFromPhone, isValidNgPhone, matchNetworkService, normalizeNgPhone } from "../utils/detectNetwork";

interface NetworkDetectionHintProps {
  phone: string;
  /** Currently selected biller serviceID. */
  network: string;
  /** True when the user picked the network themselves. */
  manual: boolean;
  networks: Array<{ serviceID: string; name: string }>;
  /** Switches back to the detected network. */
  onAuto: () => void;
}

/** Shows the prefix-detected network under a phone input, with a reminder that ported numbers must be chosen manually. */
export function NetworkDetectionHint({ phone, network, manual, networks, onAuto }: NetworkDetectionHintProps) {
  const local = normalizeNgPhone(phone);
  if (local.length < 4) return null;
  if (local.length === 11 && !isValidNgPhone(local)) return <p className="flex items-center gap-1.5 text-[11px] font-semibold text-[#EF4444]"><AlertTriangle className="size-3.5" /> Enter a valid 11-digit Nigerian number.</p>;

  const detected = detectNetworkFromPhone(local);
  const detectedService = matchNetworkService(detected, networks);
  if (!detected || !detectedService) return <p className="flex items-center gap-1.5 text-[11px] font-semibold text-[#D9990D]"><Info className="size-3.5" /> Couldn't detect the network for this number — select it above.</p>;

  if (manual && detectedService.serviceID.toLowerCase() !== network.toLowerCase()) {
    return <p className="flex flex-wrap items-center gap-1.5 text-[11px] text-[#66738C]"><Info className="size-3.5" /> Using your selected network · {local.slice(0, 4)} is usually {NETWORK_LABELS[detected]}.
      <button type="button" onClick={onAuto} className="font-bold text-[#2563EB] hover:underline">Use {NETWORK_LABELS[detected]}</button></p>;
  }
  return <p className="flex items-center gap-1.5 text-[11px] text-[#10B981]"><CheckCircle2 className="size-3.5" /><span><strong>{NETWORK_LABELS[detected]}</strong> detected from {local.slice(0, 4)} · Ported number? Pick the network above.</span></p>;
}
