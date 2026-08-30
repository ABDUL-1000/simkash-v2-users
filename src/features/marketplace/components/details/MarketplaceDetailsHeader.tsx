type MarketplaceDetailsHeaderProps = {
  title?: string;
  sku?: string;
  category?: string;
  onEdit?: () => void;
  onSuspend?: () => void;
};

export function MarketplaceDetailsHeader({
  title = "Hikvision DS-2CD2143G2 — 4MP Outdoor CCTV Camera",
  sku = "HK-DS2143G2",
  category = "CCTV Cameras",
  onEdit,
  onSuspend,
}: MarketplaceDetailsHeaderProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm">
      <div className="flex items-center gap-4">
        {/* Product Thumbnail */}
        <div className="flex size-16 shrink-0 items-center justify-center rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] font-bold text-[#94A3B8] text-sm">
          IMG
        </div>

        <div>
          <h1 className="text-lg sm:text-xl font-extrabold text-[#0F172A] leading-tight">
            {title}
          </h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            CCTV Camera · SKU: {sku}
          </p>

          <div className="mt-2 flex items-center gap-2 flex-wrap">
            <span className="rounded-md bg-[#ECFDF5] border border-[#A7F3D0] px-2.5 py-0.5 text-xs font-bold text-[#059669]">
              Active
            </span>
            <span className="rounded-md bg-[#FFFBEB] border border-[#FDE68A] px-2.5 py-0.5 text-xs font-bold text-[#D97706]">
              Low Stock
            </span>
            <span className="rounded-md bg-[#EFF6FF] border border-[#BFDBFE] px-2.5 py-0.5 text-xs font-bold text-[#2563EB]">
              {category}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2.5">
        <button
          type="button"
          onClick={onEdit}
          className="rounded-xl border border-[#E2E8F0] bg-white px-4 py-2.5 text-xs sm:text-sm font-bold text-[#0F172A] hover:bg-[#F8FAFC]"
        >
          Edit Product
        </button>
        <button
          type="button"
          onClick={onSuspend}
          className="rounded-xl border border-[#FECACA] bg-[#FFF1F2] px-4 py-2.5 text-xs sm:text-sm font-bold text-[#DC2626] hover:bg-[#FEE2E2]"
        >
          Suspend Product
        </button>
      </div>
    </div>
  );
}
