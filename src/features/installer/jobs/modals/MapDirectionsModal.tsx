import { MapPin, Navigation, ExternalLink, Compass } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

interface MapDirectionsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  address?: string;
  clientName?: string;
  landmark?: string;
  distanceKm?: number;
  coordinates?: string;
}

export function MapDirectionsModal({
  open,
  onOpenChange,
  address = "23 Marina Street, Lagos Island",
  clientName = "Zenith Bank HQ",
  landmark = "Opposite CMS Bookshop",
  distanceKm = 4.2,
  coordinates = "6.4521° N, 3.3958° E",
}: MapDirectionsModalProps) {
  const openExternalMaps = (type: "google" | "apple") => {
    const encoded = encodeURIComponent(address);
    const url =
      type === "google"
        ? `https://www.google.com/maps/search/?api=1&query=${encoded}`
        : `https://maps.apple.com/?q=${encoded}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      size="md"
      title="Site Navigation & Map"
      description={`${clientName} · ${distanceKm} km away`}
      footer={
        <div className="flex w-full flex-wrap items-center justify-between gap-2 pt-2">
          <span className="text-[11px] font-semibold text-[#8C909B]">
            GPS Coordinates: <strong className="text-[#0F152A]">{coordinates}</strong>
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="rounded-xl border border-[#E2ECF6] bg-white px-4 py-2 text-xs font-bold text-[#0F152A] hover:bg-[#F8FAFC]"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => openExternalMaps("google")}
              className="flex items-center gap-1.5 rounded-xl bg-[#2563EB] px-4 py-2 text-xs font-bold text-white hover:bg-blue-700"
            >
              <ExternalLink className="size-3.5" />
              <span>Open in Google Maps</span>
            </button>
          </div>
        </div>
      }
    >
      <div className="space-y-4 py-1 text-xs">
        {/* Simulated Map Visual Canvas */}
        <div className="relative flex h-52 w-full flex-col items-center justify-center overflow-hidden rounded-3xl border border-[#CBD5E1] bg-gradient-to-br from-[#E2E8F0] via-[#CBD5E1] to-[#94A3B8] p-4 text-center shadow-inner">
          {/* Street Grid Graphic Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(#64748B_1px,transparent_1px)] [background-size:16px_16px] opacity-30" />

          {/* Center Pin Marker */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="flex size-11 animate-bounce items-center justify-center rounded-full bg-[#EF4444] text-white shadow-lg shadow-red-500/50">
              <MapPin className="size-6" />
            </div>
            <div className="mt-2 rounded-xl border border-white/40 bg-white/90 px-3 py-1 text-xs font-black text-[#0F152A] shadow-md backdrop-blur-xs">
              {clientName}
            </div>
          </div>

          {/* Compass pill */}
          <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold text-[#0F152A] shadow-xs">
            <Compass className="size-3 text-[#2563EB]" />
            <span>North 0°</span>
          </div>
        </div>

        {/* Location Details Card */}
        <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-4">
          <div className="flex items-start gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#EFF6FF] text-[#2563EB]">
              <Navigation className="size-4" />
            </div>
            <div className="flex-1">
              <h4 className="text-xs font-extrabold text-[#0F152A]">{address}</h4>
              <p className="mt-0.5 text-[11px] text-[#66738C]">Landmark: {landmark}</p>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span className="rounded-md bg-[#EFF4F8] px-2 py-0.5 text-[10px] font-bold text-[#2563EB]">
                  Est. Drive: ~18 mins
                </span>
                <span className="rounded-md bg-[#EFF4F8] px-2 py-0.5 text-[10px] font-bold text-[#10B981]">
                  Clear traffic
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppModal>
  );
}
