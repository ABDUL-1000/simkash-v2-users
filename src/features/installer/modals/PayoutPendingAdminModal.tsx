import { Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AppModal } from "@/components/common/AppModal";
import { appPaths } from "@/app/router/paths";

interface PayoutPendingAdminModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  amount?: number;
  reference?: string;
}

export function PayoutPendingAdminModal({
  open,
  onOpenChange,
  amount = 960000,
  reference = "PAY-INS-2026-008474",
}: PayoutPendingAdminModalProps) {
  const navigate = useNavigate();

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      size="sm"
      actions={[
        {
          key: "view-wallet",
          label: "View Wallet",
          variant: "secondary",
          onClick: () => {
            onOpenChange(false);
            navigate(appPaths.wallet);
          },
        },
        {
          key: "done",
          label: "Done",
          variant: "primary",
          style: { backgroundColor: "#EA580C", borderColor: "#EA580C", color: "#FFFFFF" },
          onClick: () => onOpenChange(false),
        },
      ]}
    >
      <div className="flex flex-col items-center py-2 text-center">
        {/* Graphic */}
        <div className="flex size-16 items-center justify-center rounded-full bg-[#FFEDD5] text-[#EA580C]">
          <Clock className="size-8" />
        </div>

        <h3 className="mt-4 text-lg font-black text-[#0F152A] sm:text-xl">
          Pending Admin Approval
        </h3>
        <p className="mt-1 text-xs text-[#8C909B]">
          ₦50,000+ requires manual review.
        </p>

        {/* Summary box */}
        <div className="mt-5 w-full rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-4 text-xs divide-y divide-[#E2ECF6]">
          <div className="flex items-center justify-between pb-2.5">
            <span className="text-[#66738C]">Amount</span>
            <span className="text-sm font-black text-[#0F152A]">₦{amount.toLocaleString()}</span>
          </div>

          <div className="flex items-center justify-between py-2.5">
            <span className="text-[#66738C]">Status</span>
            <span className="rounded-full bg-[#FFEDD5] px-2.5 py-0.5 text-[11px] font-bold text-[#EA580C]">
              Pending Approval
            </span>
          </div>

          <div className="flex items-center justify-between py-2.5">
            <span className="text-[#66738C]">Est.</span>
            <span className="font-semibold text-[#0F152A]">Up to 24 hours</span>
          </div>

          <div className="flex items-center justify-between pt-2.5">
            <span className="text-[#66738C]">Ref</span>
            <span className="font-bold text-[#0F152A]">{reference}</span>
          </div>
        </div>

        <p className="mt-4 text-[11px] text-[#8C909B]">
          You'll receive SMS when approved
        </p>
      </div>
    </AppModal>
  );
}
