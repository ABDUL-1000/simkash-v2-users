import { APP_COLORS } from "@/constants/colors";
import { Smartphone, Video, MapPin, Wifi, Check } from "lucide-react";
import type { CaSimStockInfo, CaSimType } from "../types/ca-sim-activation.types";

interface CaSimTypeSelectorProps {
  selectedType: CaSimType;
  onSelectType: (type: CaSimType) => void;
  stocks: Record<CaSimType, CaSimStockInfo>;
}

export function CaSimTypeSelector({
  selectedType,
  onSelectType,
  stocks,
}: CaSimTypeSelectorProps) {
  const simTypeCards: Array<{
    type: CaSimType;
    icon: any;
    iconColor: string;
    iconBg: string;
  }> = [
    {
      type: "POS SIM",
      icon: Smartphone,
      iconColor: APP_COLORS.blues.interactiveCta,
      iconBg: APP_COLORS.blues.surfaceLight,
    },
    {
      type: "CCTV SIM",
      icon: Video,
      iconColor: APP_COLORS.greens.green,
      iconBg: APP_COLORS.greens.light,
    },
    {
      type: "GPS SIM",
      icon: MapPin,
      iconColor: "#8B5CF6",
      iconBg: "#F3E8FF",
    },
    {
      type: "Router SIM",
      icon: Wifi,
      iconColor: APP_COLORS.ambers.amber,
      iconBg: APP_COLORS.ambers.light,
    },
  ];

  return (
    <div className="space-y-2.5">
      <label
        className="text-[11px] font-black uppercase tracking-wider block"
        style={{ color: APP_COLORS.texts.slate }}
      >
        SIM TYPE
      </label>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {simTypeCards.map((card) => {
          const isSelected = selectedType === card.type;
          const stock = stocks[card.type] || { inStock: 0, commission: 600, isLowStock: false };
          const isOutOfStock = stock.inStock === 0;
          const Icon = card.icon;

          return (
            <div
              key={card.type}
              onClick={() => onSelectType(card.type)}
              className="p-5 rounded-2xl border transition-all cursor-pointer relative flex flex-col items-center justify-center text-center group"
              style={{
                borderColor: isSelected
                  ? APP_COLORS.blues.interactiveCta
                  : APP_COLORS.greys.stroke,
                borderWidth: isSelected ? "2px" : "1px",
                backgroundColor: isSelected
                  ? "#F8FAFC"
                  : APP_COLORS.backgrounds.background,
              }}
            >
              {/* Selected Checkmark Badge */}
              {isSelected && (
                <div
                  className="absolute right-3.5 top-3.5 size-5 rounded-full flex items-center justify-center text-white shadow-xs"
                  style={{ backgroundColor: APP_COLORS.blues.interactiveCta }}
                >
                  <Check className="size-3 stroke-[3]" />
                </div>
              )}

              {/* Icon Container */}
              <div
                className="size-11 rounded-2xl flex items-center justify-center mb-3 transition-transform group-hover:scale-105"
                style={{
                  backgroundColor: card.iconBg,
                  color: card.iconColor,
                }}
              >
                <Icon className="size-5" />
              </div>

              {/* Name */}
              <h4
                className="text-sm font-black tracking-tight"
                style={{ color: APP_COLORS.texts.primary }}
              >
                {card.type}
              </h4>

              {/* Stock status */}
              <p
                className="text-xs font-bold mt-1"
                style={{
                  color: isOutOfStock
                    ? APP_COLORS.reds.red
                    : stock.isLowStock
                      ? APP_COLORS.ambers.secondary
                      : APP_COLORS.greens.green,
                }}
              >
                {stock.inStock} in stock {stock.isLowStock && !isOutOfStock && "(Low)"}
              </p>

              {/* Commission */}
              <p
                className="text-[11px] font-semibold mt-0.5"
                style={{ color: APP_COLORS.blues.interactiveCta }}
              >
                ₦{stock.commission} commission
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
