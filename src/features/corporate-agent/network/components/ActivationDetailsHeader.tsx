import { Download } from "lucide-react";
import type { CaActivationRecord } from "../types/ca-network.types";

interface ActivationDetailsHeaderProps {
  record: CaActivationRecord;
  onDownloadReceipt: () => void;
}

export function ActivationDetailsHeader({
  record,
  onDownloadReceipt,
}: ActivationDetailsHeaderProps) {
  const isCompleted = record.status === "Completed";
  const isFailed = record.status === "Failed";

  return (
    <div className="space-y-4">
      {/* Top 6-Metric Strip */}
      <div className="rounded-2xl border border-[#E2ECF6] bg-white p-4 shadow-xs">
        <div className="grid grid-cols-2 gap-4 text-xs sm:grid-cols-3 lg:grid-cols-6">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">
              SOURCE
            </span>
            <div className="flex items-center gap-1.5 pt-1">
              <span className="size-2 rounded-full bg-[#2563EB]" />
              <span className="font-extrabold text-[#2563EB]">Your Own</span>
            </div>
          </div>

          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">
              STATUS
            </span>
            <div className="flex items-center gap-1.5 pt-1">
              <span
                className={`size-2 rounded-full ${
                  isCompleted
                    ? "bg-[#10B981]"
                    : isFailed
                    ? "bg-[#EF4444]"
                    : "bg-[#F59E0B]"
                }`}
              />
              <span
                className={`font-extrabold ${
                  isCompleted
                    ? "text-[#10B981]"
                    : isFailed
                    ? "text-[#EF4444]"
                    : "text-[#F59E0B]"
                }`}
              >
                {record.status}
              </span>
            </div>
          </div>

          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">
              SIM NUMBER
            </span>
            <p className="pt-1 font-mono text-sm font-black text-[#0F152A]">
              {record.simNumber}
            </p>
          </div>

          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">
              TYPE
            </span>
            <div className="pt-1">
              <span className="block text-xs font-extrabold text-[#0F152A]">
                {record.simType}
              </span>
              <span className="inline-block rounded bg-[#EFF4F8] px-1.5 py-0.2 text-[9px] font-bold text-[#2563EB]">
                {record.simType}
              </span>
            </div>
          </div>

          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">
              NETWORK
            </span>
            <div className="pt-1">
              <span className="block text-xs font-extrabold text-[#0F152A]">
                {record.network}
              </span>
              <span
                className={`inline-block rounded px-1.5 py-0.2 text-[9px] font-black ${
                  record.network === "MTN"
                    ? "bg-[#FFFBEB] text-[#854D0E]"
                    : record.network === "Glo"
                    ? "bg-[#F0FDF4] text-[#065F46]"
                    : "bg-[#FFF1F2] text-[#991B1B]"
                }`}
              >
                {record.network}
              </span>
            </div>
          </div>

          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">
              COMMISSION
            </span>
            <div className="pt-1">
              <span className="block text-sm font-black text-[#0F152A]">
                {record.commission}
              </span>
              <span className="text-[10px] font-medium text-[#8C909B]">
                {record.creditedText || "Instant wallet"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Banner Card */}
      <div className="flex flex-col justify-between gap-4 rounded-3xl border border-[#E2ECF6] bg-white p-6 shadow-xs md:flex-row md:items-center">
        <div className="flex items-center gap-4">
          <div
            className={`flex size-14 items-center justify-center rounded-2xl text-lg font-black ${
              record.network === "MTN"
                ? "border border-[#FDE68A] bg-[#FFFBEB] text-[#D97706]"
                : record.network === "Glo"
                ? "border border-[#A7F3D0] bg-[#F0FDF4] text-[#16A34A]"
                : "border border-[#FECACA] bg-[#FFF1F2] text-[#DC2626]"
            }`}
          >
            {record.network}
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="font-mono text-2xl font-black text-[#0F152A]">
                {record.simNumber}
              </h2>
              <span
                className={`rounded-full px-3 py-0.5 text-xs font-extrabold ${
                  isCompleted
                    ? "bg-[#EBFFF8] text-[#10B981]"
                    : isFailed
                    ? "bg-[#FFF7F8] text-[#EF4444]"
                    : "bg-[#FFFBEB] text-[#F59E0B]"
                }`}
              >
                {record.status}
              </span>
            </div>
            <p className="mt-1 text-xs font-medium text-[#8C909B]">
              {record.simType} · {record.network} · Your Own Activation
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onDownloadReceipt}
          className="flex shrink-0 cursor-pointer items-center gap-2 rounded-xl border border-[#E2ECF6] bg-white px-4 py-2.5 text-xs font-bold text-[#0F152A] shadow-xs transition hover:bg-[#F8FAFC]"
        >
          <Download className="size-4 text-[#0F152A]" />
          <span>Download Receipt</span>
        </button>
      </div>
    </div>
  );
}
