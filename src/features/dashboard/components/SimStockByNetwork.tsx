import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { networkStocks, simStockMetrics } from "../dashboard.data";
import { cn } from "@/lib/utils";

export function SimStockByNetwork() {
  const [selectedNetwork, setSelectedNetwork] = useState("all");
  const visibleStocks =
    selectedNetwork === "all"
      ? networkStocks
      : networkStocks.filter((network) => network.key === selectedNetwork);

  return (
    <Card className="h-full rounded-2xl border-[#E2ECF8] bg-white shadow-none">
      <CardHeader className="flex flex-row items-center justify-between px-5 pb-4 pt-5 sm:px-6">
        <CardTitle className="text-sm font-bold text-[#0F1F36]">
          SIM Stock by Network
        </CardTitle>
        <button type="button" className="text-xs font-bold text-[#2563EB] hover:underline">
          View SIM Hub
        </button>
      </CardHeader>

      <CardContent className="space-y-5 px-5 pb-5 sm:px-6">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter SIM stock by network">
          <button
            type="button"
            aria-pressed={selectedNetwork === "all"}
            onClick={() => setSelectedNetwork("all")}
            className={cn(
              "rounded-lg border px-4 py-2 text-xs font-bold transition-shadow",
              selectedNetwork === "all"
                ? "border-[#BFDBFE] bg-[#DBEAFE] text-[#0F1F36] shadow-sm"
                : "border-[#E2ECF8] bg-white text-[#64748B]",
            )}
          >
            All
          </button>
          {networkStocks.map((network) => (
            <button
              key={network.key}
              type="button"
              aria-pressed={selectedNetwork === network.key}
              onClick={() => setSelectedNetwork(network.key)}
              className="rounded-lg border px-4 py-2 text-xs font-bold transition-shadow aria-pressed:shadow-sm"
              style={{
                backgroundColor: network.tabBackground,
                borderColor: network.tabBorder,
                color: network.tabText,
              }}
            >
              {network.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {simStockMetrics.map((metric) => (
            <article key={metric.key} className="rounded-xl border border-[#DCE8F8] bg-[#F1F6FE] p-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#64748B]">
                {metric.label}
              </p>
              <p className={cn("mt-3 text-2xl font-bold text-[#0F1F36]", metric.highlight && "text-[#F59E0B]")}>
                {metric.value}
              </p>
              <p className="mt-2 text-xs leading-5 text-[#94A3B8]">{metric.description}</p>
            </article>
          ))}
        </div>

        <div className="space-y-4">
          {visibleStocks.map((network) => (
            <div key={network.key}>
              <div className="mb-2 flex items-center justify-between gap-4 text-xs">
                <span className="font-bold text-[#0F1F36]">{network.label}</span>
                <span className="font-bold text-[#0F1F36]">
                  {network.value} <span className="font-medium text-[#94A3B8]">({network.percentage}%)</span>
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-[#E7EFFB]">
                <div
                  className="h-full rounded-full transition-[width] duration-300"
                  style={{ width: `${network.percentage}%`, backgroundColor: network.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
