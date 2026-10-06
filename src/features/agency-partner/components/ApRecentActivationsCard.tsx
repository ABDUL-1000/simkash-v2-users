import { AppEmptyState } from "@/components/common/AppEmptyState";
import { useGetApRecentActivations } from "../api";
import { colors } from "@/constants/colors";

export function ApRecentActivationsCard() {
  const { activations, isLoading } = useGetApRecentActivations();
  return (
    <section className="overflow-hidden rounded-2xl border border-[#E2ECF6] bg-white shadow-xs">
      <header className="border-b border-[#E2ECF6] p-4 font-bold text-[#0F152A]">
        Recent Activations
      </header>
      {isLoading ? (
        <p className="p-4 text-xs text-[#8C909B]">Loading activations…</p>
      ) : activations.length === 0 ? (
        <AppEmptyState
          title="No recent activations"
          description="Completed activations will appear here."
        />
      ) : (
        <div className="divide-y divide-[#E2ECF6]">
          {activations.map((item) => (
            <div
              key={item.id}
              className="flex flex-wrap items-center justify-between gap-3 p-4 text-xs"
            >
              <div className="min-w-0">
                <p className="font-bold text-[#0F152A]">
                  {item.customer_name} · {item.sim_number}
                </p>
                <p className="mt-1 text-[#66738C]">
                  {item.sim_type} · {item.network} · {item.time_ago}
                </p>
              </div>
              <span className="font-bold" style={{ color: colors.success }}>
                +₦{item.commission.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
