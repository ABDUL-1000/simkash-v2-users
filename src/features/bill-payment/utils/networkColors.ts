export const getNetworkColor = (serviceID: string): string => {
  const normalized = serviceID?.toLowerCase() || "";
  if (normalized.includes("mtn")) return "bg-[#FFCC00] text-[#0F152A] border-[#FFCC00]";
  if (normalized.includes("airtel")) return "bg-[#E53333] text-white border-[#E53333]";
  if (normalized.includes("glo")) return "bg-[#10B981] text-white border-[#10B981]";
  if (normalized.includes("etisalat") || normalized.includes("9mobile")) return "bg-[#2563EB] text-white border-[#2563EB]";
  return "bg-slate-100 text-slate-800 border-slate-200";
};
