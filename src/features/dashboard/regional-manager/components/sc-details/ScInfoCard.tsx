import type { StateCoordinatorItem } from "../../types/regional-manager.types";

interface ScInfoCardProps {
  sc: StateCoordinatorItem;
}

export function ScInfoCard({ sc }: ScInfoCardProps) {
  return (
    <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-3.5 text-xs">
      <h3 className="text-sm font-black text-[#0F152A]">SC Information</h3>

      <div className="space-y-2.5 divide-y divide-[#F1F5F9]">
        <div className="flex justify-between py-1 first:pt-0">
          <span className="text-[#8C909B]">Full Name</span>
          <span className="font-bold text-[#0F152A]">{sc.name}</span>
        </div>

        <div className="flex justify-between py-1">
          <span className="text-[#8C909B]">Phone</span>
          <span className="font-mono font-bold text-[#0F152A]">{sc.phone}</span>
        </div>

        <div className="flex justify-between py-1">
          <span className="text-[#8C909B]">Email</span>
          <span className="font-medium text-[#0F152A]">{sc.email}</span>
        </div>

        <div className="flex justify-between py-1">
          <span className="text-[#8C909B]">State</span>
          <span className="font-medium text-[#0F152A]">{sc.state}</span>
        </div>

        <div className="flex justify-between py-1">
          <span className="text-[#8C909B]">LGA</span>
          <span className="font-medium text-[#0F152A]">{sc.lga || "Ikeja"}</span>
        </div>

        <div className="flex justify-between py-1">
          <span className="text-[#8C909B]">Address</span>
          <span className="font-medium text-[#0F152A] text-right">{sc.address || "23 Allen Avenue, Ikeja"}</span>
        </div>

        <div className="flex justify-between py-1">
          <span className="text-[#8C909B]">Onboarded By</span>
          <span className="font-medium text-[#0F152A]">{sc.onboardedBy || "Yusuf Adam Baba"}</span>
        </div>

        <div className="flex justify-between py-1">
          <span className="text-[#8C909B]">Onboarded On</span>
          <span className="font-medium text-[#0F152A]">{sc.onboardedOn || "10 Jan 2026"}</span>
        </div>

        <div className="flex justify-between py-1">
          <span className="text-[#8C909B]">KYC Status</span>
          <span className="rounded-full bg-[#EBFFF8] px-2 py-0.5 text-[10px] font-bold text-[#10B981]">
            {sc.kycStatus || "Verified"}
          </span>
        </div>

        <div className="flex justify-between py-1">
          <span className="text-[#8C909B]">Bank</span>
          <span className="font-medium text-[#0F152A]">{sc.bank || "Access Bank - ****0476"}</span>
        </div>
      </div>
    </div>
  );
}

export default ScInfoCard;
