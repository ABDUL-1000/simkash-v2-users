import { APP_COLORS } from "@/constants/colors";
import { CA_NETWORK_CONFIG } from "../data/ca-sim-activation.data";
import type { CaNetworkProvider } from "../types/ca-sim-activation.types";

interface CaNetworkSelectorProps {
  selectedNetwork: CaNetworkProvider;
  onSelectNetwork: (network: CaNetworkProvider) => void;
}

export function CaNetworkSelector({
  selectedNetwork,
  onSelectNetwork,
}: CaNetworkSelectorProps) {
  const networks: CaNetworkProvider[] = ["MTN", "Airtel", "Glo", "2 (9mobile)"];

  return (
    <div className="space-y-2.5">
      <label
        className="text-[11px] font-black uppercase tracking-wider block"
        style={{ color: APP_COLORS.texts.slate }}
      >
        NETWORK PROVIDER
      </label>

      <div className="flex flex-wrap items-center gap-3">
        {networks.map((net) => {
          const isSelected = selectedNetwork === net;
          const config = CA_NETWORK_CONFIG[net];

          return (
            <button
              type="button"
              key={net}
              onClick={() => onSelectNetwork(net)}
              className="px-5 py-2 rounded-xl text-xs font-black transition-all border flex items-center justify-center min-w-[76px] cursor-pointer shadow-2xs hover:scale-[1.02] active:scale-[0.98]"
              style={{
                backgroundColor: isSelected ? config.activeBg : config.bgColor,
                borderColor: isSelected ? config.activeBorder : config.borderColor,
                color: isSelected ? config.activeText : config.textColor,
              }}
            >
              {config.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
