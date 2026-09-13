import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Copy, Download } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

export interface ScTransactionItem {
  reference: string;
  type: string;
  category: string;
  status: "Completed" | "Failed" | "Pending";
  date: string;
  time?: string;
  period?: string;
  amount: number;
  description: string;
  paymentMethod?: string;
  walletBefore?: number;
  walletAfter?: number;
  totalApActs?: number;
  apBreakdown?: { name: string; acts: number; commission: number }[];
}

interface ScTransactionDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  txn?: ScTransactionItem | null;
  transaction?: ScTransactionItem | any | null;
}

export function ScTransactionDetailsModal({
  open,
  onOpenChange,
  txn,
  transaction,
}: ScTransactionDetailsModalProps) {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const defaultTxn: ScTransactionItem = {
    reference: "COM-2026-008472",
    type: "AP Network Commission",
    category: "Commission",
    status: "Completed",
    date: "24 Jun 2026",
    time: "12:00:00 PM",
    period: "Jun 2026 (1-24 Jun)",
    amount: 35395,
    description: "1,847 activations - Jun 2026",
    paymentMethod: "Simkash Commission Engine",
    walletBefore: 0,
    walletAfter: 35395,
    totalApActs: 1847,
    apBreakdown: [
      { name: "Rabiu Sani", acts: 847, commission: 16235 },
      { name: "Chioma Eze", acts: 634, commission: 12150 },
      { name: "Hassan I.", acts: 421, commission: 8071 },
      { name: "Emeka Obi", acts: 412, commission: 7897 },
      { name: "Others (19)", acts: 533, commission: 10222 },
    ],
  };

  const activeTxn = txn || transaction || defaultTxn;
  const isCredit = activeTxn.amount > 0;

  const handleCopyRef = () => {
    navigator.clipboard.writeText(activeTxn.reference);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Transaction Details"
      description={`${activeTxn.reference} · ${activeTxn.type}`}
      size="md"
    >
      <div className="space-y-4 pt-1 text-xs">
        {/* Top Header Display */}
        <div className="text-center space-y-1 py-1">
          <h2
            className={`text-3xl font-black ${
              isCredit ? "text-[#10B981]" : "text-[#EF4444]"
            }`}
          >
            {isCredit ? "+" : ""}₦{Math.abs(activeTxn.amount).toLocaleString()}
          </h2>
          <p className="text-xs font-bold text-[#8C909B]">{activeTxn.type}</p>
          <div className="pt-1">
            <span
              className={`rounded-full px-3 py-0.5 text-[10px] font-extrabold ${
                activeTxn.status === "Completed"
                  ? "bg-[#EBFFF8] text-[#10B981]"
                  : activeTxn.status === "Failed"
                  ? "bg-[#FFF7F8] text-[#EF4444]"
                  : "bg-[#FFFBEB] text-[#D9990D]"
              }`}
            >
              {activeTxn.status}
            </span>
          </div>
        </div>

        {/* Metadata List */}
        <div className="divide-y divide-[#E2ECF6]">
          <div className="flex justify-between py-2 first:pt-0">
            <span className="text-[#8C909B]">Ref</span>
            <div className="flex items-center gap-1.5 font-mono font-bold text-[#0F152A]">
              <span>{activeTxn.reference}</span>
              <button
                type="button"
                onClick={handleCopyRef}
                className="text-[#8C909B] hover:text-[#0F152A]"
              >
                <Copy className="size-3.5" />
              </button>
              {copied && <span className="text-[9px] text-[#10B981]">Copied!</span>}
            </div>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-[#8C909B]">Type</span>
            <span className="font-bold text-[#0F152A]">{activeTxn.type}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-[#8C909B]">Status</span>
            <span
              className={`font-bold ${
                activeTxn.status === "Completed"
                  ? "text-[#10B981]"
                  : activeTxn.status === "Failed"
                  ? "text-[#EF4444]"
                  : "text-[#D9990D]"
              }`}
            >
              {activeTxn.status}
            </span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-[#8C909B]">Date</span>
            <span className="font-bold text-[#0F152A]">{activeTxn.date}</span>
          </div>
          {activeTxn.time && (
            <div className="flex justify-between py-2">
              <span className="text-[#8C909B]">Time</span>
              <span className="font-bold text-[#0F152A]">{activeTxn.time}</span>
            </div>
          )}
          {activeTxn.period && (
            <div className="flex justify-between py-2">
              <span className="text-[#8C909B]">Period</span>
              <span className="font-bold text-[#0F152A]">{activeTxn.period}</span>
            </div>
          )}
        </div>

        {/* AP Network Breakdown Box */}
        {activeTxn.apBreakdown && activeTxn.apBreakdown.length > 0 && (
          <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-4 space-y-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">
              AP NETWORK BREAKDOWN
            </span>

            <div className="flex justify-between text-xs font-bold text-[#0F152A] pb-1 border-b border-[#E2ECF6]">
              <span className="text-[#8C909B]">Total AP Acts</span>
              <span>{activeTxn.totalApActs?.toLocaleString() || "1,847"}</span>
            </div>

            <div className="flex justify-between text-xs font-bold text-[#0F152A] pb-2 border-b border-[#E2ECF6]">
              <span className="text-[#8C909B]">Commission avg</span>
              <span>₦19.16/act</span>
            </div>

            <div className="space-y-1.5 pt-1">
              <span className="text-[9px] font-extrabold uppercase tracking-wider text-[#8C909B]">
                BY AGENCY PARTNER
              </span>
              {activeTxn.apBreakdown.map((ap: any) => (
                <div key={ap.name} className="flex justify-between text-xs">
                  <div>
                    <span className="font-bold text-[#0F152A]">{ap.name}</span>
                    <span className="text-[10px] text-[#8C909B] ml-2">
                      {ap.acts} acts
                    </span>
                  </div>
                  <span className="font-bold text-[#10B981]">
                    +₦{ap.commission.toLocaleString()}
                  </span>
                </div>
              ))}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => {
                    onOpenChange(false);
                    navigate("/distribution/agency-partner");
                  }}
                  className="text-[11px] font-bold text-[#2563EB] hover:underline"
                >
                  View all 23 APs →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Wallet Impact Section */}
        <div className="space-y-1.5">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">
            WALLET IMPACT
          </span>
          <div className="divide-y divide-[#E2ECF6]">
            <div className="flex justify-between py-1.5">
              <span className="text-[#8C909B]">Wallet Before</span>
              <span className="font-mono font-bold text-[#0F152A]">
                ₦{activeTxn.walletBefore?.toLocaleString() || "0"}
              </span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-[#8C909B]">This Credit</span>
              <span className="font-mono font-bold text-[#10B981]">
                +₦{activeTxn.amount.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between py-1.5 font-extrabold">
              <span className="text-[#0F152A]">Wallet After</span>
              <span className="font-mono text-[#0F152A]">
                ₦{activeTxn.walletAfter?.toLocaleString() || activeTxn.amount.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-[#E2ECF6]">
          <button
            type="button"
            onClick={() => alert("Downloading receipt PDF...")}
            className="flex items-center gap-1.5 text-xs font-bold text-[#0F152A] hover:text-[#2563EB]"
          >
            <Download className="size-4" /> Download Receipt
          </button>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="rounded-xl bg-[#10B981] px-6 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-emerald-600"
          >
            Close
          </button>
        </div>
      </div>
    </AppModal>
  );
}
