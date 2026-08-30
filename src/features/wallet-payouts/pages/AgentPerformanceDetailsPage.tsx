import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Award, Send, SlidersHorizontal, Check } from "lucide-react";
import { appPaths } from "@/app/router/paths";

import { SetPlatformTargetModal } from "../Modals/SetPlatformTargetModal";
import { SendCoachingMessageModal } from "../Modals/SendCoachingMessageModal";
import { ConfirmAgentUpgradeModal } from "../Modals/ConfirmAgentUpgradeModal";

export default function AgentPerformanceDetailsPage() {
  const { id } = useParams();
    console.log(id)

  const navigate = useNavigate();

  const [activeModal, setActiveModal] = useState<string | null>(null);

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6 p-4 sm:p-6 lg:p-8 text-xs sm:text-sm">
      {/* Back Button */}
      <div>
        <button
          type="button"
          onClick={() => navigate(appPaths.performance)}
          className="flex items-center gap-1.5 text-xs font-bold text-[#64748B] hover:text-[#0F172A] transition-colors"
        >
          <ArrowLeft className="size-4" />
          <span>Back to Performance</span>
        </button>
      </div>

      {/* Top Banner Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#2563EB] font-bold text-white text-base shadow-sm">
            RS
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-lg sm:text-xl font-extrabold text-[#0F172A]">
                Rabiu Sani
              </h1>
              <span className="rounded-md bg-[#F3E8FF] border border-[#D8B4FE] px-2 py-0.5 text-xs font-bold text-[#9333EA]">
                Exceeded
              </span>
              <span className="rounded-md bg-[#FEF3C7] border border-[#FDE68A] px-2 py-0.5 text-xs font-bold text-[#D97706]">
                #1 Ranked
              </span>
              <span className="rounded-md bg-[#F3E8FF] border border-[#D8B4FE] px-2 py-0.5 text-xs font-bold text-[#9333EA]">
                Upgrade Eligible
              </span>
            </div>
            <p className="text-xs text-[#64748B] mt-0.5">
              08120600542 · Agency Partner · Lagos
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => setActiveModal("set_target_modal")}
            className="flex items-center gap-1.5 rounded-xl border border-[#CBD5E1] bg-white px-4 py-2 text-xs font-bold text-[#0F172A] hover:bg-[#F8FAFC]"
          >
            <SlidersHorizontal className="size-4 text-[#64748B]" />
            <span>Set New Target</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveModal("coaching_modal")}
            className="flex items-center gap-1.5 rounded-xl border border-[#FDE68A] bg-[#FFFBEB] px-4 py-2 text-xs font-bold text-[#D97706] hover:bg-[#FEF3C7]"
          >
            <Send className="size-4 text-[#D97706]" />
            <span>Send Coaching</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveModal("upgrade_modal")}
            className="flex items-center gap-1.5 rounded-xl bg-[#9333EA] px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-[#7E22CE]"
          >
            <Award className="size-4 text-white" />
            <span>Upgrade to Corporate Agent</span>
          </button>
        </div>
      </div>

      {/* Main 3-Column Grid Layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Column 1 */}
        <div className="space-y-6 min-w-0">
          {/* Card 1: Activation Performance */}
          <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4">
            <div>
              <h3 className="text-sm font-bold text-[#0F172A]">Activation Performance</h3>
              <p className="text-[11px] text-[#94A3B8]">Rabiu Sani · This Month</p>
            </div>

            <div className="text-center space-y-2 py-2">
              <strong className="text-4xl font-extrabold text-[#9333EA] block">847</strong>
              <span className="text-xs text-[#64748B]">activations this period</span>
              <div className="space-y-1 pt-1">
                <div className="h-2.5 w-full rounded-full bg-[#F1F5F9] overflow-hidden">
                  <div className="h-full rounded-full bg-[#9333EA] w-full" />
                </div>
                <p className="text-xs font-bold text-[#9333EA]">169% of 500 target — Exceeded</p>
              </div>
            </div>

            <div className="space-y-2.5 divide-y divide-[#F1F5F9] text-xs pt-1">
              <div className="flex justify-between pt-1 text-[#64748B]">
                <span>This Month</span>
                <strong className="font-bold text-[#0F172A]">124 activations</strong>
              </div>
              <div className="flex justify-between pt-2 text-[#64748B]">
                <span>Last Month</span>
                <strong className="font-bold text-[#0F172A]">98 activations</strong>
              </div>
              <div className="flex justify-between pt-2 text-[#64748B]">
                <span>Best Month</span>
                <strong className="font-bold text-[#9333EA]">201 activations</strong>
              </div>
              <div className="flex justify-between pt-2 text-[#64748B]">
                <span>Avg per Month</span>
                <strong className="font-bold text-[#0F172A]">70 activations</strong>
              </div>
            </div>

            <div className="space-y-2.5 pt-2">
              <span className="block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
                BY SIM TYPE
              </span>
              {[
                { type: "POS SIM", count: 412, share: "49%", color: "#2563EB" },
                { type: "CCTV SIM", count: 201, share: "24%", color: "#059669" },
                { type: "GPS SIM", count: 147, share: "17%", color: "#9333EA" },
                { type: "Router SIM", count: 87, share: "10%", color: "#F59E0B" },
              ].map((item) => (
                <div key={item.type} className="space-y-1">
                  <div className="flex justify-between font-bold text-[#0F172A] text-xs">
                    <span>{item.type}</span>
                    <span>{item.count} <span className="text-[#94A3B8] font-normal">({item.share})</span></span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-[#F1F5F9] overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: item.share, backgroundColor: item.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card 2: Network Performance */}
          <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4">
            <div>
              <h3 className="text-sm font-bold text-[#0F172A]">Network Performance</h3>
              <p className="text-[11px] text-[#94A3B8]">63 sub-partners</p>
            </div>

            <div className="space-y-1">
              <strong className="text-3xl font-extrabold text-[#2563EB] block">63</strong>
              <p className="text-xs text-[#64748B]">sub-partners contributing</p>
              <p className="text-[11px] text-[#94A3B8] pt-1">Network total: 2,847 activations (incl. sub-partners)</p>
            </div>

            <div className="space-y-2 pt-2">
              <span className="block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
                SUB-PARTNER STATUS
              </span>

              <div className="flex justify-between items-center p-2 rounded-xl bg-[#F8FAFC]">
                <span className="font-bold text-[#0F172A]">On Target</span>
                <span className="rounded-full bg-[#EFF6FF] px-2.5 py-0.5 text-xs font-bold text-[#2563EB]">41</span>
              </div>

              <div className="flex justify-between items-center p-2 rounded-xl bg-[#F8FAFC]">
                <span className="font-bold text-[#0F172A]">At Risk</span>
                <span className="rounded-full bg-[#FFFBEB] px-2.5 py-0.5 text-xs font-bold text-[#D97706]">15</span>
              </div>

              <div className="flex justify-between items-center p-2 rounded-xl bg-[#F8FAFC]">
                <span className="font-bold text-[#0F172A]">Upgrade Eligible</span>
                <span className="rounded-full bg-[#F3E8FF] px-2.5 py-0.5 text-xs font-bold text-[#9333EA]">3</span>
              </div>
            </div>
          </div>
        </div>

        {/* Column 2 */}
        <div className="space-y-6 min-w-0">
          {/* Card 3: Commission Earned */}
          <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4">
            <div>
              <h3 className="text-sm font-bold text-[#0F172A]">Commission Earned</h3>
              <p className="text-[11px] text-[#94A3B8]">Rabiu Sani · This Period</p>
            </div>

            <div className="space-y-1">
              <strong className="text-3xl font-extrabold text-[#059669] block">₦847,000</strong>
              <p className="text-xs text-[#64748B]">Total commission this period</p>
            </div>

            <div className="space-y-2.5 divide-y divide-[#F1F5F9] text-xs pt-1">
              <div className="flex justify-between pt-1 text-[#64748B]">
                <span>Own activations (847 × ₦1,000)</span>
                <strong className="font-bold text-[#0F172A]">₦847,000</strong>
              </div>
              <div className="flex justify-between pt-2 text-[#64748B]">
                <span>Sub-partner override</span>
                <strong className="font-bold text-[#0F172A]">₦0</strong>
              </div>
              <div className="flex justify-between pt-2 text-[#64748B]">
                <span>Bonus</span>
                <strong className="font-bold text-[#0F172A]">₦0</strong>
              </div>
              <div className="flex justify-between pt-2 text-[#64748B]">
                <span>Referral</span>
                <strong className="font-bold text-[#0F172A]">₦0</strong>
              </div>
              <div className="flex justify-between pt-2 text-[#64748B]">
                <span>Total</span>
                <strong className="font-extrabold text-[#059669]">₦847,000</strong>
              </div>
            </div>

            {/* Visual Monthly Trend Bar Chart */}
            <div className="space-y-2 pt-2 border-t border-[#F1F5F9]">
              <span className="block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
                MONTHLY TREND
              </span>
              <div className="flex items-end justify-between gap-1.5 h-24 pt-4 px-1">
                {[
                  { m: "J", h: "30%" },
                  { m: "F", h: "45%" },
                  { m: "M", h: "100%", peak: "201" },
                  { m: "A", h: "55%" },
                  { m: "M", h: "65%" },
                  { m: "J", h: "75%" },
                  { m: "J", h: "85%" },
                  { m: "A", h: "0%" },
                  { m: "S", h: "0%" },
                  { m: "O", h: "0%" },
                  { m: "N", h: "0%" },
                  { m: "D", h: "0%" },
                ].map((bar, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                    {bar.peak && <span className="text-[9px] font-bold text-[#9333EA]">{bar.peak}</span>}
                    <div
                      className={`w-full rounded-t-xs transition-all ${bar.peak ? "bg-[#9333EA]" : "bg-[#2563EB]"}`}
                      style={{ height: bar.h }}
                    />
                    <span className="text-[9px] font-bold text-[#94A3B8]">{bar.m}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card 4: Activation Timeline */}
          <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4">
            <div>
              <h3 className="text-sm font-bold text-[#0F172A]">Activation Timeline</h3>
              <p className="text-[11px] text-[#94A3B8]">Daily Activations — July 2026</p>
            </div>

            <div className="flex items-end justify-between gap-1 h-28 pt-4 px-1">
              {[4, 8, 12, 6, 9, 14, 18, 10, 15, 22, 30, 16, 20, 12, 14, 8, 10].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-xs bg-gradient-to-t from-[#2563EB] to-[#38BDF8]"
                  style={{ height: `${(h / 30) * 100}%` }}
                />
              ))}
            </div>

            <div className="flex items-center justify-between text-[11px] font-bold text-[#64748B] pt-2 border-t border-[#F1F5F9]">
              <span>avg 4 activations/day</span>
              <span className="text-[#9333EA]">peak: Jul 15 (12)</span>
            </div>
          </div>
        </div>

        {/* Column 3 */}
        <div className="space-y-6 min-w-0">
          {/* Card 5: Target History */}
          <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4">
            <div>
              <h3 className="text-sm font-bold text-[#0F172A]">Target History</h3>
              <p className="text-[11px] text-[#94A3B8]">Progression over time</p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC]">
                <div>
                  <strong className="font-bold text-[#0F172A] block text-xs">Target 1: 200 activations</strong>
                  <span className="text-[11px] text-[#94A3B8]">Jan 2026</span>
                </div>
                <span className="rounded-md bg-[#ECFDF5] border border-[#A7F3D0] px-2 py-0.5 text-[10px] font-bold text-[#059669]">
                  Achieved
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC]">
                <div>
                  <strong className="font-bold text-[#0F172A] block text-xs">Target 2: 350 activations</strong>
                  <span className="text-[11px] text-[#94A3B8]">Mar 2026</span>
                </div>
                <span className="rounded-md bg-[#ECFDF5] border border-[#A7F3D0] px-2 py-0.5 text-[10px] font-bold text-[#059669]">
                  Achieved
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC]">
                <div>
                  <strong className="font-bold text-[#0F172A] block text-xs">Target 3: 500 activations</strong>
                  <span className="text-[11px] text-[#94A3B8]">May 2026</span>
                </div>
                <span className="rounded-md bg-[#F3E8FF] border border-[#D8B4FE] px-2 py-0.5 text-[10px] font-bold text-[#9333EA]">
                  Exceeded
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setActiveModal("set_target_modal")}
              className="font-bold text-[#2563EB] text-xs hover:underline block pt-1"
            >
              + Set new target
            </button>
          </div>

          {/* Card 6: Upgrade Eligibility */}
          <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4">
            <div>
              <h3 className="text-sm font-bold text-[#0F172A]">Upgrade Eligibility</h3>
              <p className="text-[11px] text-[#94A3B8]">Corporate Agent — ready</p>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 font-bold text-[#059669]">
                <Check className="size-4 text-[#059669]" />
                <span>500+ activations met</span>
              </div>
              <div className="flex items-center gap-2 font-bold text-[#059669]">
                <Check className="size-4 text-[#059669]" />
                <span>50+ sub-partners met</span>
              </div>

              <div className="pt-2">
                <p className="font-bold text-[#9333EA] text-xs flex items-center gap-1">
                  <span>⬆ Ready to upgrade</span>
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setActiveModal("upgrade_modal")}
              className="w-full rounded-xl bg-[#9333EA] py-2.5 font-bold text-white text-xs shadow-xs hover:bg-[#7E22CE]"
            >
              Upgrade to Corporate Agent
            </button>
          </div>

          {/* Card 7: Coaching History */}
          <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-3">
            <div>
              <h3 className="text-sm font-bold text-[#0F172A]">Coaching History</h3>
              <p className="text-[11px] text-[#94A3B8]">Messages from supervisors</p>
            </div>

            <div className="space-y-2.5 divide-y divide-[#F1F5F9] text-xs">
              <div className="pt-1">
                <div className="flex justify-between text-[11px] text-[#94A3B8]">
                  <span>Jun 14, 2026</span>
                  <button type="button" className="font-bold text-[#2563EB] hover:underline">View</button>
                </div>
                <p className="font-medium text-[#0F172A] mt-0.5">Great momentum — keep focusing on CCTV SIM...</p>
              </div>

              <div className="pt-2">
                <div className="flex justify-between text-[11px] text-[#94A3B8]">
                  <span>Apr 02, 2026</span>
                  <button type="button" className="font-bold text-[#2563EB] hover:underline">View</button>
                </div>
                <p className="font-medium text-[#0F172A] mt-0.5">Review your GPS SIM pitch. Consider bundling...</p>
              </div>

              <div className="pt-2">
                <div className="flex justify-between text-[11px] text-[#94A3B8]">
                  <span>Feb 18, 2026</span>
                  <button type="button" className="font-bold text-[#2563EB] hover:underline">View</button>
                </div>
                <p className="font-medium text-[#0F172A] mt-0.5">Target set at 350. Focus on Kaduna region...</p>
              </div>
            </div>

            <div className="rounded-xl border border-[#A7F3D0] bg-[#ECFDF5] p-3 text-xs text-[#059669] font-bold text-center">
              No coaching needed — top performer
            </div>
          </div>

          {/* Card 8: Recent Activations */}
          <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-3">
            <div>
              <h3 className="text-sm font-bold text-[#0F172A]">Recent Activations</h3>
              <p className="text-[11px] text-[#94A3B8]">Last 5 activations</p>
            </div>

            <div className="space-y-2.5 divide-y divide-[#F1F5F9] text-xs">
              {[
                { sim: "08120600543", net: "MTN", netBg: "#FEF3C7", netColor: "#D97706", time: "Jul 06, 12:42", amt: "+₦1,000" },
                { sim: "08070450112", net: "Airtel", netBg: "#FFF1F2", netColor: "#DC2626", time: "Jul 06, 11:18", amt: "+₦1,000" },
                { sim: "08033291880", net: "Glo", netBg: "#ECFDF5", netColor: "#059669", time: "Jul 05, 16:33", amt: "+₦1,000" },
                { sim: "09012834561", net: "9mobile", netBg: "#EFF6FF", netColor: "#2563EB", time: "Jul 05, 09:07", amt: "+₦1,000" },
                { sim: "08120600548", net: "MTN", netBg: "#FEF3C7", netColor: "#D97706", time: "Jul 04, 15:50", amt: "+₦1,000" },
              ].map((item, idx) => (
                <div key={idx} className={`flex items-center justify-between ${idx > 0 ? "pt-2" : ""}`}>
                  <div>
                    <strong className="font-bold text-[#0F172A] block">{item.sim}</strong>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="rounded-md px-1.5 py-0.5 text-[9px] font-bold" style={{ backgroundColor: item.netBg, color: item.netColor }}>
                        {item.net}
                      </span>
                      <span className="text-[10px] text-[#94A3B8]">{item.time}</span>
                    </div>
                  </div>

                  <strong className="font-extrabold text-[#059669] text-xs">
                    {item.amt}
                  </strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <SetPlatformTargetModal
        open={activeModal === "set_target_modal"}
        onOpenChange={(open) => !open && setActiveModal(null)}
      />

      <SendCoachingMessageModal
        open={activeModal === "coaching_modal"}
        onOpenChange={(open) => !open && setActiveModal(null)}
        agentName="Rabiu Sani"
      />

      <ConfirmAgentUpgradeModal
        open={activeModal === "upgrade_modal"}
        onOpenChange={(open) => !open && setActiveModal(null)}
        agentName="Rabiu Sani"
      />
    </div>
  );
}
