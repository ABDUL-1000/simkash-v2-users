import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";
import { APP_COLORS } from "@/constants/colors";
import { QrCode, ScanLine } from "lucide-react";

interface CaScanQrModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onScanSuccess: (scannedSim: string) => void;
}

export function CaScanQrModal({
  open,
  onOpenChange,
  onScanSuccess,
}: CaScanQrModalProps) {
  const [scanning, setScanning] = useState(false);

  const handleSimulateScan = (mockNumber: string) => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      onOpenChange(false);
      onScanSuccess(mockNumber);
    }, 600);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Scan SIM Barcode / QR"
      description="Point your device camera at the SIM card barcode or ICCID number."
      size="md"
    >
      <div className="space-y-4 pt-1 text-xs text-center">
        {/* Scanner Viewport Visual */}
        <div
          className="w-full h-48 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center relative overflow-hidden bg-slate-950 text-white"
          style={{ borderColor: APP_COLORS.blues.interactiveCta }}
        >
          {/* Animated scan laser line */}
          <div className="absolute inset-x-4 top-1/2 h-0.5 bg-red-500 shadow-[0_0_10px_#ef4444] animate-pulse" />

          <ScanLine className="size-12 text-blue-400 mb-2 animate-bounce" />
          <p className="text-xs font-semibold text-slate-300">
            {scanning ? "Reading ICCID barcode..." : "Align SIM barcode inside frame"}
          </p>
          <span className="text-[10px] text-slate-500 mt-1">
            Ensure adequate lighting on the card
          </span>
        </div>

        {/* Quick Test Barcode Picks */}
        <div className="space-y-2 text-left">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
            Or Click to simulate card scan:
          </span>
          <div className="grid grid-cols-2 gap-2">
            {[
              { num: "07022222222", label: "POS SIM 1" },
              { num: "08120600542", label: "POS SIM 2" },
              { num: "08163083409", label: "POS SIM 3" },
              { num: "09078959999", label: "POS SIM 4" },
            ].map((mock) => (
              <button
                key={mock.num}
                type="button"
                onClick={() => handleSimulateScan(mock.num)}
                className="p-2.5 rounded-xl border bg-white hover:bg-blue-50 text-left transition-colors flex items-center justify-between"
                style={{ borderColor: APP_COLORS.greys.stroke }}
              >
                <div>
                  <div className="font-mono font-bold text-slate-900">{mock.num}</div>
                  <div className="text-[10px] text-slate-500">{mock.label}</div>
                </div>
                <QrCode className="size-4 text-blue-600 shrink-0" />
              </button>
            ))}
          </div>
        </div>

        {/* Close */}
        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="px-4 py-2 rounded-xl border text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
            style={{ borderColor: APP_COLORS.greys.stroke }}
          >
            Cancel
          </button>
        </div>
      </div>
    </AppModal>
  );
}
