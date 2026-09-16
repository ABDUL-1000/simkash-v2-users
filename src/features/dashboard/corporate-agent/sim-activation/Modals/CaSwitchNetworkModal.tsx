import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";
import { APP_COLORS } from "@/constants/colors";
import { Wifi, AlertCircle } from "lucide-react";

interface CaSwitchNetworkModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  simNumber?: string;
  currentNetwork?: string;
  customerName?: string;
  onConfirmSwitch: (newNetwork: string) => void;
}

export function CaSwitchNetworkModal({
  open,
  onOpenChange,
  simNumber = "4719 •••• •••• 1122",
  currentNetwork = "MTN",
  customerName = "Kemi Fashola",
  onConfirmSwitch,
}: CaSwitchNetworkModalProps) {
  const [selectedNetwork, setSelectedNetwork] = useState(currentNetwork);
  const [switching, setSwitching] = useState(false);

  const networks = [
    {
      id: "MTN",
      name: "MTN",
      signal: "Signal: Excellent",
      signalColor: "#10B981", // green
    },
    {
      id: "Glo",
      name: "Glo",
      signal: "Signal: Good",
      signalColor: "#10B981", // green
    },
    {
      id: "Airtel",
      name: "Airtel",
      signal: "Signal: Fair",
      signalColor: "#F59E0B", // amber
    },
    {
      id: "9mobile",
      name: "9mobile",
      signal: "Signal: Weak",
      signalColor: "#EF4444", // red
    },
  ];

  const handleConfirm = () => {
    setSwitching(true);
    setTimeout(() => {
      setSwitching(false);
      onOpenChange(false);
      onConfirmSwitch(selectedNetwork);
    }, 700);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      size="md"
      showCloseButton={true}
    >
      <div className="space-y-4 pt-1 text-xs">
        {/* Header */}
        <div className="text-center space-y-1">
          <h2
            className="text-xl sm:text-2xl font-black tracking-tight"
            style={{ color: APP_COLORS.texts.primary }}
          >
            Switch Network
          </h2>
          <p
            className="text-xs sm:text-sm font-medium"
            style={{ color: APP_COLORS.texts.slate }}
          >
            Change the network operator for this SIM activation.
          </p>
        </div>

        {/* Current SIM Summary Box */}
        <div
          className="rounded-2xl border p-4 space-y-2 divide-y bg-[#F8FAFC]/60"
          style={{ borderColor: APP_COLORS.greys.stroke }}
        >
          <div className="flex items-center justify-between pb-1.5">
            <span className="text-slate-500 font-medium">SIM Number</span>
            <span className="font-mono font-black text-slate-900">{simNumber}</span>
          </div>

          <div className="flex items-center justify-between py-1.5">
            <span className="text-slate-500 font-medium">Current Network</span>
            <span className="font-black text-slate-900">{currentNetwork}</span>
          </div>

          <div className="flex items-center justify-between pt-1.5">
            <span className="text-slate-500 font-medium">Customer</span>
            <span className="font-bold text-slate-900">{customerName}</span>
          </div>
        </div>

        {/* SELECT NEW NETWORK SECTION */}
        <div className="space-y-2 pt-1">
          <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block text-center">
            SELECT NEW NETWORK
          </label>

          <div className="space-y-2.5">
            {networks.map((net) => {
              const isSelected = selectedNetwork === net.id;
              const isCurrent = net.id === currentNetwork;

              return (
                <div
                  key={net.id}
                  onClick={() => setSelectedNetwork(net.id)}
                  className="p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group"
                  style={{
                    borderColor: isSelected
                      ? APP_COLORS.blues.interactiveCta
                      : APP_COLORS.greys.stroke,
                    borderWidth: isSelected ? "2px" : "1px",
                    backgroundColor: isSelected ? "#F8FAFC" : "#FFFFFF",
                  }}
                >
                  <div className="flex items-center gap-3">
                    {/* Radio Button */}
                    <div
                      className="size-5 rounded-full border-2 flex items-center justify-center transition-colors shrink-0"
                      style={{
                        borderColor: isSelected
                          ? APP_COLORS.blues.interactiveCta
                          : APP_COLORS.greys.stroke,
                      }}
                    >
                      {isSelected && (
                        <div
                          className="size-2.5 rounded-full"
                          style={{ backgroundColor: APP_COLORS.blues.interactiveCta }}
                        />
                      )}
                    </div>

                    <div>
                      <div className="font-bold text-slate-900 text-sm">
                        {net.name}
                      </div>
                      <div
                        className="text-[11px] font-semibold flex items-center gap-1 mt-0.5"
                        style={{ color: net.signalColor }}
                      >
                        <Wifi className="size-3" />
                        <span>{net.signal}</span>
                      </div>
                    </div>
                  </div>

                  {isCurrent && (
                    <span className="text-xs font-bold text-slate-500">
                      Current
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Amber Alert Notice */}
        <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-900 text-xs font-semibold flex items-center gap-2">
          <AlertCircle className="size-4 text-amber-600 shrink-0" />
          <span>
            Switching network may require a new plan. The customer will be notified.
          </span>
        </div>

        {/* Action Buttons */}
        <div className="w-full grid grid-cols-2 gap-3 pt-3 border-t" style={{ borderColor: APP_COLORS.greys.stroke }}>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={switching}
            className="w-full py-3 rounded-xl text-xs font-bold text-white shadow-xs transition-opacity hover:opacity-95 disabled:opacity-50 cursor-pointer"
            style={{ backgroundColor: APP_COLORS.blues.interactiveCta }}
          >
            {switching ? "Switching..." : "Confirm Switch"}
          </button>

          <button
            type="button"
            onClick={() => onOpenChange(false)}
            disabled={switching}
            className="w-full py-3 rounded-xl border text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 transition-colors cursor-pointer"
            style={{ borderColor: APP_COLORS.greys.stroke }}
          >
            Cancel
          </button>
        </div>
      </div>
    </AppModal>
  );
}
